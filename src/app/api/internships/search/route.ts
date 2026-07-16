import { NextRequest, NextResponse } from "next/server";

const ADZUNA_BASE_URL = "https://api.adzuna.com/v1/api/jobs/au/search/1";
const NAB_CAREERS_URL = "https://careers.nab.com.au/jobs/search";

const STOP_WORDS = new Set([
  "i", "im", "i'm", "am", "we", "are", "is", "the", "a", "an", "for", "to",
  "of", "and", "or", "that", "this", "some", "any", "kind", "type", "please",
  "show", "find", "me", "looking", "seeking", "want", "would", "like", "after",
  "job", "jobs", "role", "roles", "position", "positions", "opportunity", "opportunities",
]);

type JobResult = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  created: string | null;
  url: string;
  salaryMin: number | null;
  salaryMax: number | null;
  category: string | null;
  source: string;
  directEmployer: boolean;
};

type DirectFeed =
  | { type: "greenhouse"; token: string; company: string }
  | { type: "lever"; site: string; company: string }
  | { type: "ashby"; board: string; company: string }
  | { type: "smartrecruiters"; companyId: string; company: string };

function clean(value: string | null, maxLength: number) {
  return (value ?? "").trim().slice(0, maxLength);
}

function extractSearchIntent(input: string) {
  const normalised = input
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9+#.$\-/\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const careerStage = /\bintern(ship)?\b/.test(normalised)
    ? "internship"
    : /\bgraduate|grad\b/.test(normalised)
      ? "graduate"
      : /\bentry[ -]?level|junior\b/.test(normalised)
        ? "entry level"
        : null;

  const workArrangement = /\bremote\b/.test(normalised)
    ? "remote"
    : /\bhybrid\b/.test(normalised)
      ? "hybrid"
      : /\bon[ -]?site|office based\b/.test(normalised)
        ? "onsite"
        : null;

  const employmentType = /\bpart[ -]?time\b/.test(normalised)
    ? "part time"
    : /\bfull[ -]?time\b/.test(normalised)
      ? "full time"
      : /\bcontract(or)?|freelance\b/.test(normalised)
        ? "contract"
        : /\bpermanent\b/.test(normalised)
          ? "permanent"
          : /\bcasual\b/.test(normalised)
            ? "casual"
            : null;

  const experienceMatch = normalised.match(/\b(\d{1,2})\+?\s*(?:year|years|yr|yrs)\b/);
  const experienceYears = experienceMatch ? Number(experienceMatch[1]) : null;

  const salaryMatch = normalised.match(/(?:\$|aud\s*)?(\d{2,3})(?:k|,000)\b/);
  const salaryMin = salaryMatch ? Number(salaryMatch[1]) * 1000 : null;

  const removablePhrases = [
    /\b(?:i am|i'm|im|we are|we're)\b/g,
    /\b(?:looking|searching|seeking|hoping)\s+for\b/g,
    /\b(?:show|find|give)\s+me\b/g,
    /\b(?:full[ -]?time|part[ -]?time|permanent|contract(?:or)?|freelance|casual)\b/g,
    /\b(?:remote|hybrid|on[ -]?site|onsite|office based)\b/g,
    /\b(?:internship|intern|graduate|grad|entry[ -]?level|junior)\b/g,
    /\b\d{1,2}\+?\s*(?:year|years|yr|yrs)(?:\s+of)?\s+experience\b/g,
    /(?:\$|aud\s*)?\d{2,3}(?:k|,000)(?:\s*(?:or more|plus|minimum|min))?/g,
  ];

  let stripped = normalised;
  for (const phrase of removablePhrases) stripped = stripped.replace(phrase, " ");

  const terms = stripped
    .split(/\s+/)
    .filter(Boolean)
    .filter((term) => !STOP_WORDS.has(term));

  const keywords = terms.join(" ").replace(/\s+/g, " ").trim() || normalised;
  const providerTerms = [keywords, careerStage, workArrangement].filter(Boolean).join(" ");

  return {
    keywords,
    providerTerms,
    careerStage,
    workArrangement,
    employmentType,
    experienceYears,
    salaryMin,
  };
}

function parseDirectFeeds(): DirectFeed[] {
  const raw = process.env.DIRECT_JOB_FEEDS;
  if (!raw) return [];

  try {
    const feeds = JSON.parse(raw);
    if (!Array.isArray(feeds)) return [];

    return feeds.filter((feed): feed is DirectFeed => {
      if (!feed || typeof feed !== "object" || typeof feed.company !== "string") return false;
      return (
        (feed.type === "greenhouse" && typeof feed.token === "string") ||
        (feed.type === "lever" && typeof feed.site === "string") ||
        (feed.type === "ashby" && typeof feed.board === "string") ||
        (feed.type === "smartrecruiters" && typeof feed.companyId === "string")
      );
    });
  } catch (error) {
    console.error("Invalid DIRECT_JOB_FEEDS configuration", error);
    return [];
  }
}

function relevanceScore(job: JobResult, intent: ReturnType<typeof extractSearchIntent>) {
  const title = job.title.toLowerCase();
  const description = job.description.toLowerCase();
  const text = `${title} ${description} ${job.location.toLowerCase()}`;
  const terms = intent.keywords.split(/\s+/).filter((term) => term.length > 2);

  let score = job.directEmployer ? 8 : 0;
  for (const term of terms) {
    if (title.includes(term)) score += 6;
    else if (text.includes(term)) score += 2;
  }
  if (intent.careerStage && text.includes(intent.careerStage)) score += 8;
  if (intent.workArrangement && text.includes(intent.workArrangement)) score += 4;
  if (intent.employmentType && text.includes(intent.employmentType)) score += 4;
  if (intent.experienceYears && text.includes(`${intent.experienceYears} year`)) score += 3;
  return score;
}

function matchesLocation(job: JobResult, location: string) {
  if (!location || location.toLowerCase() === "australia") return true;
  const wanted = location.toLowerCase();
  const actual = `${job.location} ${job.description}`.toLowerCase();
  return actual.includes(wanted) || actual.includes("remote");
}

async function fetchGreenhouse(feed: Extract<DirectFeed, { type: "greenhouse" }>): Promise<JobResult[]> {
  try {
    const response = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(feed.token)}/jobs?content=true`,
      { headers: { Accept: "application/json" }, next: { revalidate: 900 } },
    );
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data.jobs) ? data.jobs : []).map((job: Record<string, any>) => ({
      id: `greenhouse-${feed.token}-${job.id}`,
      title: job.title ?? "Job opportunity",
      company: feed.company,
      location: job.location?.name ?? "Location not listed",
      description: job.content ?? "",
      created: job.updated_at ?? null,
      url: job.absolute_url,
      salaryMin: null,
      salaryMax: null,
      category: job.departments?.[0]?.name ?? null,
      source: `${feed.company} careers`,
      directEmployer: true,
    }));
  } catch (error) {
    console.error("Greenhouse feed error", feed.company, error);
    return [];
  }
}

async function fetchLever(feed: Extract<DirectFeed, { type: "lever" }>): Promise<JobResult[]> {
  try {
    const response = await fetch(
      `https://api.lever.co/v0/postings/${encodeURIComponent(feed.site)}?mode=json`,
      { headers: { Accept: "application/json" }, next: { revalidate: 900 } },
    );
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data) ? data : []).map((job: Record<string, any>) => ({
      id: `lever-${feed.site}-${job.id}`,
      title: job.text ?? "Job opportunity",
      company: feed.company,
      location: job.categories?.location ?? "Location not listed",
      description: job.descriptionPlain ?? job.description ?? "",
      created: job.createdAt ? new Date(job.createdAt).toISOString() : null,
      url: job.applyUrl ?? job.hostedUrl,
      salaryMin: null,
      salaryMax: null,
      category: job.categories?.team ?? job.categories?.commitment ?? null,
      source: `${feed.company} careers`,
      directEmployer: true,
    }));
  } catch (error) {
    console.error("Lever feed error", feed.company, error);
    return [];
  }
}

async function fetchAshby(feed: Extract<DirectFeed, { type: "ashby" }>): Promise<JobResult[]> {
  try {
    const response = await fetch(
      `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(feed.board)}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 900 } },
    );
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data.jobs) ? data.jobs : []).map((job: Record<string, any>) => ({
      id: `ashby-${feed.board}-${job.id ?? job.jobUrl}`,
      title: job.title ?? "Job opportunity",
      company: feed.company,
      location: job.location ?? "Location not listed",
      description: job.descriptionPlain ?? job.descriptionHtml ?? job.description ?? "",
      created: job.publishedAt ?? null,
      url: job.applyUrl ?? job.jobUrl,
      salaryMin: null,
      salaryMax: null,
      category: job.department ?? job.team ?? null,
      source: `${feed.company} careers`,
      directEmployer: true,
    }));
  } catch (error) {
    console.error("Ashby feed error", feed.company, error);
    return [];
  }
}

async function fetchSmartRecruiters(
  feed: Extract<DirectFeed, { type: "smartrecruiters" }>,
): Promise<JobResult[]> {
  try {
    const response = await fetch(
      `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(feed.companyId)}/postings?limit=100`,
      { headers: { Accept: "application/json" }, next: { revalidate: 900 } },
    );
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data.content) ? data.content : []).map((job: Record<string, any>) => ({
      id: `smartrecruiters-${feed.companyId}-${job.id}`,
      title: job.name ?? "Job opportunity",
      company: feed.company,
      location: [job.location?.city, job.location?.region, job.location?.country]
        .filter(Boolean)
        .join(", ") || "Location not listed",
      description: job.jobAd?.sections?.jobDescription?.text ?? job.jobAd?.sections?.companyDescription?.text ?? "",
      created: job.releasedDate ?? null,
      url: job.ref ?? `https://jobs.smartrecruiters.com/${feed.companyId}/${job.id}`,
      salaryMin: null,
      salaryMax: null,
      category: job.department?.label ?? job.function?.label ?? null,
      source: `${feed.company} careers`,
      directEmployer: true,
    }));
  } catch (error) {
    console.error("SmartRecruiters feed error", feed.company, error);
    return [];
  }
}

function decodeHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchNabCareers(): Promise<JobResult[]> {
  try {
    const pages = await Promise.all(
      [1, 2, 3, 4].map(async (page) => {
        const response = await fetch(`${NAB_CAREERS_URL}?page=${page}`, {
          headers: { Accept: "text/html", "User-Agent": "AIEnablers-Career-Intelligence/1.0" },
          next: { revalidate: 900 },
        });
        return response.ok ? response.text() : "";
      }),
    );

    const jobs: JobResult[] = [];
    const seen = new Set<string>();
    const anchorPattern = /<a[^>]+href=["']([^"']*\/jobs\/[^"'#?]+)["'][^>]*>([\s\S]*?)<\/a>/gi;

    for (const html of pages) {
      let match: RegExpExecArray | null;
      while ((match = anchorPattern.exec(html)) !== null) {
        const href = match[1];
        const title = decodeHtml(match[2]);
        if (!title || /^read more$/i.test(title) || seen.has(href)) continue;
        seen.add(href);

        const contextStart = Math.max(0, match.index - 500);
        const contextEnd = Math.min(html.length, match.index + match[0].length + 1800);
        const context = decodeHtml(html.slice(contextStart, contextEnd));
        const absoluteUrl = href.startsWith("http") ? href : `https://careers.nab.com.au${href.startsWith("/") ? "" : "/"}${href}`;
        const locationMatch = context.match(/(?:NSW|VIC|QLD|WA|SA|TAS|NT|ACT|Australia)[^|•]{0,90}/i);

        jobs.push({
          id: `nab-${href}`,
          title,
          company: "NAB",
          location: locationMatch?.[0]?.trim() || "Australia",
          description: context.slice(0, 900),
          created: null,
          url: absoluteUrl,
          salaryMin: null,
          salaryMax: null,
          category: "Banking & Financial Services",
          source: "NAB careers",
          directEmployer: true,
        });
      }
    }

    return jobs;
  } catch (error) {
    console.error("NAB careers feed error", error);
    return [];
  }
}

function fetchDirectFeed(feed: DirectFeed): Promise<JobResult[]> {
  switch (feed.type) {
    case "greenhouse":
      return fetchGreenhouse(feed);
    case "lever":
      return fetchLever(feed);
    case "ashby":
      return fetchAshby(feed);
    case "smartrecruiters":
      return fetchSmartRecruiters(feed);
  }
}

function deduplicate(jobs: JobResult[]) {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    const key = `${job.company}|${job.title}|${job.location}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET(request: NextRequest) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  const naturalLanguageQuery = clean(request.nextUrl.searchParams.get("keywords"), 250);
  const location = clean(request.nextUrl.searchParams.get("location"), 100) || "Australia";

  if (!naturalLanguageQuery) {
    return NextResponse.json(
      { error: "Please describe the kind of role you are after." },
      { status: 400 },
    );
  }

  const intent = extractSearchIntent(naturalLanguageQuery);
  const directFeeds = parseDirectFeeds();
  const directPromises = [...directFeeds.map(fetchDirectFeed), fetchNabCareers()];

  let adzunaPromise: Promise<JobResult[]> = Promise.resolve([]);
  let providerCount = 0;

  if (appId && appKey) {
    const query = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      results_per_page: "50",
      what: intent.providerTerms || intent.keywords,
      where: location,
      sort_by: "date",
    });
    if (intent.salaryMin) query.set("salary_min", String(intent.salaryMin));
    if (intent.employmentType === "full time") query.set("full_time", "1");
    if (intent.employmentType === "part time") query.set("part_time", "1");
    if (intent.employmentType === "contract") query.set("contract", "1");
    if (intent.employmentType === "permanent") query.set("permanent", "1");

    adzunaPromise = fetch(`${ADZUNA_BASE_URL}?${query.toString()}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    })
      .then(async (response) => {
        if (!response.ok) return [];
        const data = await response.json();
        providerCount = data.count ?? 0;
        return (Array.isArray(data.results) ? data.results : []).map((job: Record<string, any>) => ({
          id: `adzuna-${job.id ?? job.redirect_url}`,
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
          directEmployer: false,
        }));
      })
      .catch((error) => {
        console.error("Adzuna search error", error);
        return [];
      });
  }

  try {
    const [adzunaJobs, ...directGroups] = await Promise.all([adzunaPromise, ...directPromises]);
    const directJobs = directGroups.flat().filter((job) => matchesLocation(job, location));
    const combined = deduplicate([...directJobs, ...adzunaJobs]);
    const ranked = combined
      .map((job) => ({ job, score: relevanceScore(job, intent) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 25)
      .map(({ job }) => job);

    return NextResponse.json({
      count: ranked.length,
      providerCount: providerCount + directJobs.length,
      interpretedQuery: intent.keywords,
      interpretedSearch: intent,
      directEmployerCount: ranked.filter((job) => job.directEmployer).length,
      activeDirectFeeds: directFeeds.length + 1,
      results: ranked,
    });
  } catch (error) {
    console.error("Career Intelligence search error", error);
    return NextResponse.json(
      { error: "We could not complete the search. Please try again." },
      { status: 500 },
    );
  }
}
