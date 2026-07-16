import { NextRequest, NextResponse } from "next/server";

const ADZUNA_BASE_URL = "https://api.adzuna.com/v1/api/jobs/au/search/1";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "after", "am", "be", "for", "i", "im", "in", "is",
  "job", "jobs", "looking", "me", "my", "of", "opportunity", "opportunities",
  "please", "role", "roles", "show", "the", "to", "want", "with", "work"
]);

const CAREER_STAGE_PATTERNS = [
  { label: "internship", regex: /\b(intern|internship|vacation program|placement)\b/i, terms: ["intern", "internship"] },
  { label: "graduate", regex: /\b(graduate|grad program|graduate program)\b/i, terms: ["graduate"] },
  { label: "entry level", regex: /\b(entry[- ]?level|junior|no experience)\b/i, terms: ["entry level", "junior"] },
  { label: "apprenticeship", regex: /\b(apprentice|apprenticeship|trainee|cadet)\b/i, terms: ["apprentice", "trainee"] },
];

type SearchIntent = {
  roleTerms: string;
  careerStage: string | null;
  careerTerms: string[];
  experienceYears: number | null;
  workArrangement: "remote" | "hybrid" | "onsite" | null;
  fullTime: boolean;
  partTime: boolean;
  permanent: boolean;
  contract: boolean;
  casual: boolean;
  salaryMin: number | null;
};

function clean(value: string | null, maxLength: number) {
  return (value ?? "").trim().slice(0, maxLength);
}

function parseSalary(text: string) {
  const match = text.match(/(?:over|above|at least|minimum|min)?\s*\$?\s*(\d{2,4})(?:\s*k)?\s*(?:per year|pa|p\.a\.|salary)?/i);
  if (!match) return null;
  let value = Number(match[1]);
  if (/k/i.test(match[0]) || value < 10000) value *= 1000;
  return value >= 20000 ? value : null;
}

function parseIntent(input: string): SearchIntent {
  const lower = input.toLowerCase().replace(/[’']/g, "'");

  const career = CAREER_STAGE_PATTERNS.find((item) => item.regex.test(lower));
  const experienceMatch = lower.match(/\b(\d{1,2})\+?\s*(?:year|years|yr|yrs)\s+(?:of\s+)?experience\b/i);

  const workArrangement = /\bremote\b/i.test(lower)
    ? "remote"
    : /\bhybrid\b/i.test(lower)
    ? "hybrid"
    : /\b(on[- ]?site|onsite|in office)\b/i.test(lower)
    ? "onsite"
    : null;

  const fullTime = /\bfull[- ]?time\b/i.test(lower);
  const partTime = /\bpart[- ]?time\b/i.test(lower);
  const permanent = /\bpermanent\b/i.test(lower);
  const contract = /\b(contract|contractor|freelance)\b/i.test(lower);
  const casual = /\bcasual\b/i.test(lower);
  const salaryMin = parseSalary(lower);

  let stripped = lower
    .replace(/\b(i am|i'm|im|we are|we're)\b/g, " ")
    .replace(/\b(looking for|searching for|interested in|seeking|want|would like|show me|find me)\b/g, " ")
    .replace(/\b(full[- ]?time|part[- ]?time|permanent|contract|contractor|freelance|casual|remote|hybrid|on[- ]?site|onsite|in office)\b/g, " ")
    .replace(/\b\d{1,2}\+?\s*(?:year|years|yr|yrs)\s+(?:of\s+)?experience\b/g, " ")
    .replace(/(?:over|above|at least|minimum|min)?\s*\$?\s*\d{2,4}(?:\s*k)?\s*(?:per year|pa|p\.a\.|salary)?/g, " ");

  for (const item of CAREER_STAGE_PATTERNS) stripped = stripped.replace(item.regex, " ");

  const roleTerms = stripped
    .replace(/[^a-z0-9+#.\-\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term))
    .join(" ")
    .trim();

  return {
    roleTerms,
    careerStage: career?.label ?? null,
    careerTerms: career?.terms ?? [],
    experienceYears: experienceMatch ? Number(experienceMatch[1]) : null,
    workArrangement,
    fullTime,
    partTime,
    permanent,
    contract,
    casual,
    salaryMin,
  };
}

function relevanceScore(job: Record<string, any>, intent: SearchIntent) {
  const title = String(job.title ?? "").toLowerCase();
  const description = String(job.description ?? "").toLowerCase();
  const text = `${title} ${description}`;
  const terms = intent.roleTerms.split(/\s+/).filter((term) => term.length > 2);

  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 6;
    else if (text.includes(term)) score += 2;
  }

  for (const term of intent.careerTerms) {
    if (title.includes(term)) score += 8;
    else if (text.includes(term)) score += 3;
  }

  if (intent.experienceYears !== null) {
    const years = intent.experienceYears;
    if (new RegExp(`\\b${years}\\+?\\s*(?:year|years|yr|yrs)`, "i").test(text)) score += 6;
    if (years <= 2 && /\b(entry[- ]?level|junior|graduate)\b/i.test(text)) score += 5;
    if (years >= 5 && /\b(senior|lead|principal)\b/i.test(title)) score += 4;
  }

  if (intent.workArrangement && text.includes(intent.workArrangement)) score += 4;
  if (intent.casual && /\bcasual\b/i.test(text)) score += 4;

  return score;
}

function buildQuery(appId: string, appKey: string, intent: SearchIntent, location: string, includeCareerStage: boolean) {
  const what = [intent.roleTerms, includeCareerStage ? intent.careerTerms[0] : "", intent.workArrangement ?? "", intent.casual ? "casual" : ""]
    .filter(Boolean)
    .join(" ");

  const query = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: "50",
    what,
    where: location,
    sort_by: "date",
  });

  if (intent.fullTime) query.set("full_time", "1");
  if (intent.partTime) query.set("part_time", "1");
  if (intent.permanent) query.set("permanent", "1");
  if (intent.contract) query.set("contract", "1");
  if (intent.salaryMin) query.set("salary_min", String(intent.salaryMin));

  return query;
}

async function fetchAdzuna(query: URLSearchParams) {
  const response = await fetch(`${ADZUNA_BASE_URL}?${query.toString()}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    const upstreamBody = await response.text();
    console.error("Adzuna search failed", response.status, upstreamBody);
    throw new Error(`ADZUNA_${response.status}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    return NextResponse.json(
      { error: "Job Market Search is being configured. Please try again shortly.", code: "ADZUNA_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  const naturalLanguage = clean(request.nextUrl.searchParams.get("keywords"), 300);
  const location = clean(request.nextUrl.searchParams.get("location"), 100) || "Australia";

  if (!naturalLanguage) {
    return NextResponse.json({ error: "Please describe the kind of role you are after." }, { status: 400 });
  }

  const intent = parseIntent(naturalLanguage);
  if (!intent.roleTerms) {
    return NextResponse.json(
      { error: "Please include a job title, skill or field, such as data analytics or project management." },
      { status: 400 },
    );
  }

  try {
    let data = await fetchAdzuna(buildQuery(appId, appKey, intent, location, true));
    let rawResults = Array.isArray(data.results) ? data.results : [];

    // A career-stage term can make provider matching too narrow. Fall back to the core role search.
    if (rawResults.length === 0 && intent.careerTerms.length > 0) {
      data = await fetchAdzuna(buildQuery(appId, appKey, intent, location, false));
      rawResults = Array.isArray(data.results) ? data.results : [];
    }

    const rankedResults = rawResults
      .map((job: Record<string, any>) => ({ job, score: relevanceScore(job, intent) }))
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
      .slice(0, 20);

    const results = rankedResults.map(({ job }: { job: Record<string, any> }) => ({
      id: String(job.id ?? job.redirect_url),
      title: job.title ?? "Job opportunity",
      company: job.company?.display_name ?? "Company not listed",
      location: job.location?.display_name ?? location,
      description: job.description ?? "",
      created: job.created ?? null,
      url: job.redirect_url,
      salaryMin: job.salary_min ?? null,
      salaryMax: job.salary_max ?? null,
      category: job.category?.label ?? null,
      source: "Adzuna",
    }));

    return NextResponse.json({
      count: rawResults.length,
      providerCount: data.count ?? rawResults.length,
      interpretedSearch: {
        roleTerms: intent.roleTerms,
        careerStage: intent.careerStage,
        experienceYears: intent.experienceYears,
        workArrangement: intent.workArrangement,
        employmentType: {
          fullTime: intent.fullTime,
          partTime: intent.partTime,
          permanent: intent.permanent,
          contract: intent.contract,
          casual: intent.casual,
        },
        salaryMin: intent.salaryMin,
        location,
      },
      results,
    });
  } catch (error) {
    console.error("Job market search error", error);
    return NextResponse.json(
      { error: "We could not complete the search. Please try again." },
      { status: 502 },
    );
  }
}
