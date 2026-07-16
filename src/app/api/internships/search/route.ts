import { NextRequest, NextResponse } from "next/server";

const ADZUNA_BASE_URL = "https://api.adzuna.com/v1/api/jobs/au/search/1";
const NAB_CAREERS_URL = "https://careers.nab.com.au/jobs/search";

const STOP_WORDS = new Set([
  "i", "im", "i'm", "am", "we", "are", "is", "the", "a", "an", "for", "to",
  "of", "and", "or", "that", "this", "some", "any", "kind", "type", "please",
  "show", "find", "me", "looking", "seeking", "want", "would", "like", "after",
  "job", "jobs", "role", "roles", "position", "positions", "opportunity", "opportunities",
  "student", "final-year", "final", "year", "in", "at", "with", "where", "can",
]);

const TAXONOMY: Array<{ match: RegExp; terms: string[] }> = [
  { match: /\bcyber(?:security)?|information security|infosec\b/i, terms: ["cybersecurity", "cyber security", "information security", "security analyst", "soc analyst", "soc", "iam", "identity access", "grc", "governance risk compliance", "threat", "vulnerability", "security operations"] },
  { match: /\bdata analy(?:st|tics)|business intelligence|power bi\b/i, terms: ["data analyst", "data analytics", "business intelligence", "power bi", "sql", "reporting analyst"] },
  { match: /\bsoftware|developer|engineer|programmer\b/i, terms: ["software engineer", "software developer", "developer", "programmer", "application engineer"] },
  { match: /\baccounting|accountant|finance analyst|financial analyst\b/i, terms: ["accountant", "accounting", "finance analyst", "financial analyst", "commercial analyst"] },
  { match: /\bplumber|plumbing\b/i, terms: ["plumber", "plumbing", "plumbing apprentice", "apprentice plumber", "trade apprentice"] },
  { match: /\belectrician|electrical\b/i, terms: ["electrician", "electrical", "electrical apprentice", "apprentice electrician", "trade apprentice"] },
  { match: /\bcarpenter|carpentry\b/i, terms: ["carpenter", "carpentry", "carpentry apprentice", "apprentice carpenter", "trade apprentice"] },
  { match: /\bkitchen hand|dishwasher|kitchen assistant\b/i, terms: ["kitchen hand", "kitchen assistant", "dishwasher", "steward"] },
  { match: /\bretail assistant|sales assistant|store team\b/i, terms: ["retail assistant", "sales assistant", "store team member", "customer service"] },
];

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

type WorkdayConfig = { host: string; tenant: string; site: string; locale: string };
type DirectFeed =
  | { type: "greenhouse"; token: string; company: string }
  | { type: "lever"; site: string; company: string }
  | { type: "ashby"; board: string; company: string }
  | { type: "smartrecruiters"; companyId: string; company: string }
  | ({ type: "workday"; company: string } & WorkdayConfig);

type RegistryRow = {
  company: string;
  type: "greenhouse" | "lever" | "ashby" | "smartrecruiters" | "workday";
  identifier: string;
  enabled?: boolean;
};

function clean(value: string | null, maxLength: number) {
  return (value ?? "").trim().slice(0, maxLength);
}

function extractSearchIntent(input: string) {
  const normalised = input.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9+#.$\-/\s']/g, " ").replace(/\s+/g, " ").trim();
  const careerStage = /\bintern(ship)?\b/.test(normalised) ? "internship"
    : /\bapprentice(ship)?\b/.test(normalised) ? "apprenticeship"
    : /\btrainee(ship)?\b/.test(normalised) ? "traineeship"
    : /\bcadet(ship)?\b/.test(normalised) ? "cadetship"
    : /\bgraduate|grad\b/.test(normalised) ? "graduate"
    : /\bentry[ -]?level|junior\b/.test(normalised) ? "entry level" : null;
  const requestedSeniority = /\b(?:chief|executive|director|head of|general manager|senior manager|manager|lead|principal)\b/.test(normalised) ? "senior" : careerStage ? "early-career" : null;
  const workArrangement = /\bremote\b/.test(normalised) ? "remote" : /\bhybrid\b/.test(normalised) ? "hybrid" : /\bon[ -]?site|office based\b/.test(normalised) ? "onsite" : null;
  const employmentType = /\bpart[ -]?time\b/.test(normalised) ? "part time" : /\bfull[ -]?time\b/.test(normalised) ? "full time" : /\bcontract(or)?|freelance\b/.test(normalised) ? "contract" : /\bpermanent\b/.test(normalised) ? "permanent" : /\bcasual\b/.test(normalised) ? "casual" : null;
  const experienceMatch = normalised.match(/\b(\d{1,2})\+?\s*(?:year|years|yr|yrs)\b/);
  const experienceYears = experienceMatch ? Number(experienceMatch[1]) : null;
  const salaryMatch = normalised.match(/(?:\$|aud\s*)?(\d{2,3})(?:k|,000)\b/);
  const salaryMin = salaryMatch ? Number(salaryMatch[1]) * 1000 : null;

  let stripped = normalised;
  for (const phrase of [
    /\b(?:i am|i'm|im|we are|we're)\b/g, /\b(?:looking|searching|seeking|hoping)\s+for\b/g,
    /\b(?:show|find|give)\s+me\b/g, /\b(?:full[ -]?time|part[ -]?time|permanent|contract(?:or)?|freelance|casual)\b/g,
    /\b(?:remote|hybrid|on[ -]?site|onsite|office based)\b/g,
    /\b(?:internship|intern|traineeship|trainee|apprenticeship|apprentice|cadetship|cadet|graduate|grad|entry[ -]?level|junior)\b/g,
    /\b\d{1,2}\+?\s*(?:year|years|yr|yrs)(?:\s+of)?\s+experience\b/g,
    /(?:\$|aud\s*)?\d{2,3}(?:k|,000)(?:\s*(?:or more|plus|minimum|min))?/g,
  ]) stripped = stripped.replace(phrase, " ");

  const keywords = stripped.split(/\s+/).filter(Boolean).filter((term) => !STOP_WORDS.has(term)).join(" ").replace(/\s+/g, " ").trim() || normalised;
  const taxonomyTerms = TAXONOMY.find((group) => group.match.test(normalised))?.terms ?? [];
  const coreTerms = Array.from(new Set([...keywords.split(/\s+/).filter((term) => term.length > 2), ...taxonomyTerms]));
  const stageProviderTerm: Record<string, string> = { internship: "intern internship", apprenticeship: "apprentice apprenticeship", traineeship: "trainee traineeship", cadetship: "cadet cadetship", graduate: "graduate", "entry level": "entry level junior" };
  const providerTerms = [keywords, careerStage ? stageProviderTerm[careerStage] : null].filter(Boolean).join(" ");
  return { keywords, providerTerms, coreTerms, careerStage, requestedSeniority, workArrangement, employmentType, experienceYears, salaryMin };
}

function isPlaceholder(value: string) {
  return /company name|company-board|company-site|company-identifier|employer name|verified-/i.test(value);
}

function parseWorkdayIdentifier(identifier: string): WorkdayConfig | null {
  const parts = identifier.split("|").map((part) => part.trim());
  if (parts.length < 3) return null;
  const [host, tenant, site, locale = "en-US"] = parts;
  if (!host || !tenant || !site || !/^[a-z0-9.-]+$/i.test(host.replace(/^https?:\/\//, ""))) return null;
  return { host: host.replace(/^https?:\/\//, "").replace(/\/$/, ""), tenant, site, locale };
}

function rowToFeed(row: RegistryRow): DirectFeed | null {
  if (!row.company || !row.identifier || row.enabled === false || isPlaceholder(row.company) || isPlaceholder(row.identifier)) return null;
  if (row.type === "greenhouse") return { type: "greenhouse", token: row.identifier, company: row.company };
  if (row.type === "lever") return { type: "lever", site: row.identifier, company: row.company };
  if (row.type === "ashby") return { type: "ashby", board: row.identifier, company: row.company };
  if (row.type === "smartrecruiters") return { type: "smartrecruiters", companyId: row.identifier, company: row.company };
  if (row.type === "workday") {
    const config = parseWorkdayIdentifier(row.identifier);
    return config ? { type: "workday", company: row.company, ...config } : null;
  }
  return null;
}

function parseEnvironmentFeeds(): DirectFeed[] {
  const raw = process.env.DIRECT_JOB_FEEDS;
  if (!raw) return [];
  try {
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows)) return [];
    const feeds: DirectFeed[] = [];
    for (const item of rows as Record<string, unknown>[]) {
      if (!item || typeof item.company !== "string" || typeof item.type !== "string") continue;
      let identifier = "";
      if (item.type === "greenhouse" && typeof item.token === "string") identifier = item.token;
      if (item.type === "lever" && typeof item.site === "string") identifier = item.site;
      if (item.type === "ashby" && typeof item.board === "string") identifier = item.board;
      if (item.type === "smartrecruiters" && typeof item.companyId === "string") identifier = item.companyId;
      if (item.type === "workday" && typeof item.identifier === "string") identifier = item.identifier;
      const feed = rowToFeed({ company: item.company, type: item.type as RegistryRow["type"], identifier, enabled: item.enabled !== false });
      if (feed) feeds.push(feed);
    }
    return feeds;
  } catch (error) {
    console.error("Invalid DIRECT_JOB_FEEDS configuration", error);
    return [];
  }
}

async function loadEmployerFeeds(): Promise<{ feeds: DirectFeed[]; source: "supabase" | "vercel-environment" | "none" }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    try {
      const response = await fetch(`${url}/rest/v1/career_employers?select=company,type,identifier,enabled&enabled=eq.true&order=company.asc`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 300 },
      });
      if (!response.ok) throw new Error(`Supabase registry returned ${response.status}`);
      const rows = (await response.json()) as RegistryRow[];
      return { feeds: rows.map(rowToFeed).filter((feed): feed is DirectFeed => Boolean(feed)), source: "supabase" };
    } catch (error) {
      console.error("Supabase employer registry error", error);
      const fallback = parseEnvironmentFeeds();
      return { feeds: fallback, source: fallback.length ? "vercel-environment" : "none" };
    }
  }
  const fallback = parseEnvironmentFeeds();
  return { feeds: fallback, source: fallback.length ? "vercel-environment" : "none" };
}

function relevanceScore(job: JobResult, intent: ReturnType<typeof extractSearchIntent>) {
  const title = job.title.toLowerCase();
  const text = `${title} ${job.description.toLowerCase()} ${(job.category ?? "").toLowerCase()}`;
  const seniorTitle = /\b(?:chief|ceo|cfo|cio|cto|executive|director|head(?: of)?|general manager|senior manager|manager|team lead|tech lead|engineering lead|practice lead|principal|vice president|vp)\b/i;
  const earlyCareerTitle = /\b(?:intern(?:ship)?|trainee(?:ship)?|apprentice(?:ship)?|cadet(?:ship)?|graduate|grad program|vacation program|summer program|early career|entry[ -]?level|junior|associate|first year|second year|third year|fourth year)\b/i;
  if (intent.requestedSeniority === "early-career" && seniorTitle.test(title)) return 0;

  let titleMatches = 0;
  let bodyMatches = 0;
  for (const term of intent.coreTerms) {
    const value = term.toLowerCase();
    if (title.includes(value)) titleMatches += 1;
    else if (text.includes(value)) bodyMatches += 1;
  }
  const compatibleStageTerms: Record<string, string[]> = {
    internship: ["intern", "internship", "trainee", "traineeship", "apprentice", "apprenticeship", "cadet", "cadetship", "vacation program", "summer program", "graduate", "grad program", "early career", "entry level", "junior"],
    apprenticeship: ["apprentice", "apprenticeship", "first year", "second year", "third year", "fourth year", "trade assistant", "trainee", "traineeship"],
    traineeship: ["trainee", "traineeship", "apprentice", "apprenticeship", "cadet", "cadetship", "intern", "internship", "graduate", "early career", "entry level", "junior"],
    cadetship: ["cadet", "cadetship", "trainee", "traineeship", "intern", "internship", "graduate", "early career", "entry level"],
    graduate: ["graduate", "grad program", "early career", "entry level", "junior", "associate", "trainee", "cadet"],
    "entry level": ["entry level", "junior", "associate", "trainee", "apprentice", "cadet", "graduate", "early career"],
  };
  const stageMatched = intent.careerStage ? compatibleStageTerms[intent.careerStage].some((term) => text.includes(term)) : false;
  if (!(titleMatches > 0 || bodyMatches >= 2)) return 0;
  if (["internship", "apprenticeship", "traineeship", "cadetship"].includes(intent.careerStage ?? "") && !stageMatched) return 0;
  if ((intent.careerStage === "graduate" || intent.careerStage === "entry level") && seniorTitle.test(title)) return 0;

  let score = titleMatches * 30 + bodyMatches * 8;
  if (stageMatched) score += earlyCareerTitle.test(title) ? 40 : 25;
  if (intent.workArrangement && text.includes(intent.workArrangement)) score += 6;
  if (intent.employmentType && text.includes(intent.employmentType)) score += 6;
  if (intent.experienceYears && text.includes(`${intent.experienceYears} year`)) score += 4;
  if (job.directEmployer) score += 5;
  return score;
}

function matchesLocation(job: JobResult, location: string) {
  if (!location || location.toLowerCase() === "australia") return true;
  const actual = `${job.location} ${job.description}`.toLowerCase();
  return actual.includes(location.toLowerCase()) || actual.includes("remote");
}

async function fetchGreenhouse(feed: Extract<DirectFeed, { type: "greenhouse" }>): Promise<JobResult[]> {
  try {
    const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(feed.token)}/jobs?content=true`, { headers: { Accept: "application/json" }, next: { revalidate: 900 } });
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data.jobs) ? data.jobs : []).map((job: Record<string, any>) => ({ id: `greenhouse-${feed.token}-${job.id}`, title: job.title ?? "Job opportunity", company: feed.company, location: job.location?.name ?? "Location not listed", description: job.content ?? "", created: job.updated_at ?? null, url: job.absolute_url, salaryMin: null, salaryMax: null, category: job.departments?.[0]?.name ?? null, source: `${feed.company} careers`, directEmployer: true }));
  } catch { return []; }
}

async function fetchLever(feed: Extract<DirectFeed, { type: "lever" }>): Promise<JobResult[]> {
  try {
    const response = await fetch(`https://api.lever.co/v0/postings/${encodeURIComponent(feed.site)}?mode=json`, { headers: { Accept: "application/json" }, next: { revalidate: 900 } });
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data) ? data : []).map((job: Record<string, any>) => ({ id: `lever-${feed.site}-${job.id}`, title: job.text ?? "Job opportunity", company: feed.company, location: job.categories?.location ?? "Location not listed", description: job.descriptionPlain ?? job.description ?? "", created: job.createdAt ? new Date(job.createdAt).toISOString() : null, url: job.applyUrl ?? job.hostedUrl, salaryMin: null, salaryMax: null, category: job.categories?.team ?? job.categories?.commitment ?? null, source: `${feed.company} careers`, directEmployer: true }));
  } catch { return []; }
}

async function fetchAshby(feed: Extract<DirectFeed, { type: "ashby" }>): Promise<JobResult[]> {
  try {
    const response = await fetch(`https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(feed.board)}`, { headers: { Accept: "application/json" }, next: { revalidate: 900 } });
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data.jobs) ? data.jobs : []).map((job: Record<string, any>) => ({ id: `ashby-${feed.board}-${job.id ?? job.jobUrl}`, title: job.title ?? "Job opportunity", company: feed.company, location: job.location ?? "Location not listed", description: job.descriptionPlain ?? job.descriptionHtml ?? job.description ?? "", created: job.publishedAt ?? null, url: job.applyUrl ?? job.jobUrl, salaryMin: null, salaryMax: null, category: job.department ?? job.team ?? null, source: `${feed.company} careers`, directEmployer: true }));
  } catch { return []; }
}

async function fetchSmartRecruiters(feed: Extract<DirectFeed, { type: "smartrecruiters" }>): Promise<JobResult[]> {
  try {
    const response = await fetch(`https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(feed.companyId)}/postings?limit=100`, { headers: { Accept: "application/json" }, next: { revalidate: 900 } });
    if (!response.ok) return [];
    const data = await response.json();
    return (Array.isArray(data.content) ? data.content : []).map((job: Record<string, any>) => ({ id: `smartrecruiters-${feed.companyId}-${job.id}`, title: job.name ?? "Job opportunity", company: feed.company, location: [job.location?.city, job.location?.region, job.location?.country].filter(Boolean).join(", ") || "Location not listed", description: job.jobAd?.sections?.jobDescription?.text ?? job.jobAd?.sections?.companyDescription?.text ?? "", created: job.releasedDate ?? null, url: job.ref ?? `https://jobs.smartrecruiters.com/${feed.companyId}/${job.id}`, salaryMin: null, salaryMax: null, category: job.department?.label ?? job.function?.label ?? null, source: `${feed.company} careers`, directEmployer: true }));
  } catch { return []; }
}

async function fetchWorkday(feed: Extract<DirectFeed, { type: "workday" }>): Promise<JobResult[]> {
  const endpoint = `https://${feed.host}/wday/cxs/${encodeURIComponent(feed.tenant)}/${encodeURIComponent(feed.site)}/jobs`;
  const jobs: JobResult[] = [];
  try {
    for (let offset = 0; offset < 1000; offset += 100) {
      const response = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ appliedFacets: {}, limit: 100, offset, searchText: "" }), next: { revalidate: 900 } });
      if (!response.ok) break;
      const data = await response.json();
      const postings = Array.isArray(data.jobPostings) ? data.jobPostings : [];
      for (const job of postings as Record<string, any>[]) {
        const externalPath = typeof job.externalPath === "string" ? job.externalPath : "";
        if (!externalPath) continue;
        jobs.push({ id: `workday-${feed.tenant}-${feed.site}-${externalPath}`, title: job.title ?? "Job opportunity", company: feed.company, location: job.locationsText ?? job.location ?? "Location not listed", description: [job.title, job.locationsText, job.bulletFields?.join(" ")].filter(Boolean).join(" "), created: job.postedOn ?? null, url: `https://${feed.host}/${feed.locale}/${feed.site}${externalPath.startsWith("/") ? externalPath : `/${externalPath}`}`, salaryMin: null, salaryMax: null, category: job.jobFamily ?? null, source: `${feed.company} careers`, directEmployer: true });
      }
      if (!postings.length || jobs.length >= Number(data.total ?? jobs.length)) break;
    }
    return jobs;
  } catch (error) {
    console.error("Workday feed error", feed.company, error);
    return [];
  }
}

function decodeHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchNabCareers(): Promise<JobResult[]> {
  try {
    const pages = await Promise.all([1, 2, 3, 4].map(async (page) => {
      const response = await fetch(`${NAB_CAREERS_URL}?page=${page}`, { headers: { Accept: "text/html", "User-Agent": "AIEnablers-Career-Intelligence/1.0" }, next: { revalidate: 900 } });
      return response.ok ? response.text() : "";
    }));
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
        const context = decodeHtml(html.slice(Math.max(0, match.index - 500), Math.min(html.length, match.index + match[0].length + 1800)));
        const locationMatch = context.match(/(?:NSW|VIC|QLD|WA|SA|TAS|NT|ACT|Australia)[^|•]{0,90}/i);
        jobs.push({ id: `nab-${href}`, title, company: "NAB", location: locationMatch?.[0]?.trim() || "Australia", description: context.slice(0, 900), created: null, url: href.startsWith("http") ? href : `https://careers.nab.com.au${href.startsWith("/") ? "" : "/"}${href}`, salaryMin: null, salaryMax: null, category: "Banking & Financial Services", source: "NAB careers", directEmployer: true });
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
    case "greenhouse": return fetchGreenhouse(feed);
    case "lever": return fetchLever(feed);
    case "ashby": return fetchAshby(feed);
    case "smartrecruiters": return fetchSmartRecruiters(feed);
    case "workday": return fetchWorkday(feed);
  }
}

function deduplicate(jobs: JobResult[]) {
  const seen = new Set<string>();
  return jobs.filter((job) => {
    const key = `${job.company}|${job.title}|${job.location}`.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchAdzunaJobs(appId: string, appKey: string, what: string, location: string, intent: ReturnType<typeof extractSearchIntent>) {
  const query = new URLSearchParams({ app_id: appId, app_key: appKey, results_per_page: "50", what, where: location, sort_by: "date" });
  if (intent.salaryMin) query.set("salary_min", String(intent.salaryMin));
  if (intent.employmentType === "full time") query.set("full_time", "1");
  if (intent.employmentType === "part time") query.set("part_time", "1");
  if (intent.employmentType === "contract") query.set("contract", "1");
  if (intent.employmentType === "permanent") query.set("permanent", "1");
  const response = await fetch(`${ADZUNA_BASE_URL}?${query.toString()}`, { headers: { Accept: "application/json" }, next: { revalidate: 900 } });
  if (!response.ok) return { count: 0, jobs: [] as JobResult[] };
  const data = await response.json();
  const jobs = (Array.isArray(data.results) ? data.results : []).map((job: Record<string, any>) => ({ id: `adzuna-${job.id ?? job.redirect_url}`, title: job.title ?? "Job opportunity", company: job.company?.display_name ?? "Company not listed", location: job.location?.display_name ?? location, description: job.description ?? "", created: job.created ?? null, url: job.redirect_url, salaryMin: job.salary_min ?? null, salaryMax: job.salary_max ?? null, category: job.category?.label ?? null, source: "Adzuna", directEmployer: false }));
  return { count: data.count ?? 0, jobs };
}

export async function GET(request: NextRequest) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  const naturalLanguageQuery = clean(request.nextUrl.searchParams.get("keywords"), 250);
  const location = clean(request.nextUrl.searchParams.get("location"), 100) || "Australia";
  if (!naturalLanguageQuery) return NextResponse.json({ error: "Please describe the kind of role you are after." }, { status: 400 });

  const intent = extractSearchIntent(naturalLanguageQuery);
  try {
    const registry = await loadEmployerFeeds();
    const directPromises = [...registry.feeds.map(fetchDirectFeed), fetchNabCareers()];
    let providerCount = 0;
    let adzunaJobs: JobResult[] = [];
    if (appId && appKey) {
      const primary = await fetchAdzunaJobs(appId, appKey, intent.providerTerms || intent.keywords, location, intent);
      providerCount = primary.count;
      adzunaJobs = primary.jobs;
      if (!adzunaJobs.length && intent.providerTerms !== intent.keywords) {
        const fallback = await fetchAdzunaJobs(appId, appKey, intent.keywords, location, intent);
        providerCount = fallback.count;
        adzunaJobs = fallback.jobs;
      }
    }
    const directGroups = await Promise.all(directPromises);
    const directJobs = directGroups.flat().filter((job) => matchesLocation(job, location));
    const ranked = deduplicate([...directJobs, ...adzunaJobs]).map((job) => ({ job, score: relevanceScore(job, intent) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 25).map(({ job }) => job);
    return NextResponse.json({ count: ranked.length, providerCount: providerCount + directJobs.length, interpretedQuery: intent.keywords, interpretedSearch: intent, directEmployerCount: ranked.filter((job) => job.directEmployer).length, activeDirectFeeds: registry.feeds.length + 1, employerRegistrySource: registry.source, results: ranked });
  } catch (error) {
    console.error("Career Intelligence search error", error);
    return NextResponse.json({ error: "We could not complete the search. Please try again." }, { status: 500 });
  }
}
