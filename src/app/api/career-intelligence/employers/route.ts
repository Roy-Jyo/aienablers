import { NextRequest, NextResponse } from "next/server";

type EmployerFeed = {
  id?: string;
  company: string;
  industry?: string;
  type: "greenhouse" | "lever" | "ashby" | "smartrecruiters" | "workday" | "erecruit";
  identifier: string;
  enabled?: boolean;
};

const PLACEHOLDER_VALUES = new Set([
  "company name", "company-board-token", "company-site-name", "company-board-name",
  "company-identifier", "employer name", "employer-board-token", "employer-site-name",
]);

function isPlaceholder(company: string, identifier: string) {
  return PLACEHOLDER_VALUES.has(company.trim().toLowerCase()) || PLACEHOLDER_VALUES.has(identifier.trim().toLowerCase());
}

function parseWorkdayIdentifier(identifier: string) {
  const parts = identifier.split("|").map((part) => part.trim());
  if (parts.length < 3) return null;
  const [host, tenant, site, locale = "en-US"] = parts;
  if (!host || !tenant || !site || !/^[a-z0-9.-]+$/i.test(host.replace(/^https?:\/\//, ""))) return null;
  return { host: host.replace(/^https?:\/\//, "").replace(/\/$/, ""), tenant, site, locale };
}

function parseERecruitIdentifier(identifier: string) {
  try {
    const value = /^https?:\/\//i.test(identifier.trim()) ? identifier.trim() : `https://${identifier.trim()}`;
    const url = new URL(value);
    if (!/^https:$/.test(url.protocol) || !url.hostname) return null;
    return `${url.origin}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return null;
  }
}

function authorised(request: NextRequest) {
  const configured = process.env.CAREER_ADMIN_KEY?.trim();
  const supplied = request.headers.get("x-admin-key")?.trim();
  return Boolean(configured && supplied && supplied === configured);
}

function envFeeds(): EmployerFeed[] {
  const raw = process.env.DIRECT_JOB_FEEDS;
  if (!raw) return [];
  try {
    const feeds = JSON.parse(raw);
    if (!Array.isArray(feeds)) return [];
    const parsed: EmployerFeed[] = [];
    for (const feed of feeds as Record<string, unknown>[]) {
      const company = typeof feed.company === "string" ? feed.company : "";
      const industry = typeof feed.industry === "string" ? feed.industry : "";
      if (!company || typeof feed.type !== "string") continue;
      let employer: EmployerFeed | null = null;
      if (feed.type === "greenhouse" && typeof feed.token === "string") employer = { company, industry, type: "greenhouse", identifier: feed.token, enabled: true };
      if (feed.type === "lever" && typeof feed.site === "string") employer = { company, industry, type: "lever", identifier: feed.site, enabled: true };
      if (feed.type === "ashby" && typeof feed.board === "string") employer = { company, industry, type: "ashby", identifier: feed.board, enabled: true };
      if (feed.type === "smartrecruiters" && typeof feed.companyId === "string") employer = { company, industry, type: "smartrecruiters", identifier: feed.companyId, enabled: true };
      if (feed.type === "workday" && typeof feed.identifier === "string") employer = { company, industry, type: "workday", identifier: feed.identifier, enabled: true };
      if (feed.type === "erecruit" && typeof feed.identifier === "string") employer = { company, industry, type: "erecruit", identifier: feed.identifier, enabled: true };
      if (employer && !isPlaceholder(employer.company, employer.identifier)) parsed.push(employer);
    }
    return parsed;
  } catch { return []; }
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return url && key ? { url, key } : null;
}

function supabaseHeaders(key: string, extra: Record<string, string> = {}) {
  const headers: Record<string, string> = { apikey: key, ...extra };
  if (!key.startsWith("sb_secret_")) headers.Authorization = `Bearer ${key}`;
  return headers;
}

async function readRegistry(): Promise<EmployerFeed[]> {
  const config = supabaseConfig();
  if (!config) return envFeeds();
  const response = await fetch(`${config.url}/rest/v1/career_employers?select=id,company,industry,type,identifier,enabled&order=company.asc`, {
    headers: supabaseHeaders(config.key), cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Registry read failed (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`);
  }
  const feeds = (await response.json()) as EmployerFeed[];
  return feeds.filter((feed) => !isPlaceholder(feed.company, feed.identifier));
}

function decodeHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

async function testERecruit(baseUrl: string) {
  const browseUrl = `${baseUrl}/candidateapp/jobs/browse`;
  const response = await fetch(browseUrl, {
    headers: { Accept: "text/html,application/xhtml+xml", "User-Agent": "AIEnablers-Career-Intelligence/1.0" },
    cache: "no-store",
    redirect: "follow",
  });
  if (!response.ok) return { status: "error", httpStatus: response.status, jobs: 0 };
  const html = await response.text();
  const links = new Set<string>();
  const patterns = [
    /href=["']([^"']*\/candidateapp\/jobs\/(?:view|detail|details)[^"']*)["']/gi,
    /href=["']([^"']*\/candidateapp\/jobs\/[^"']*(?:job|vacancy)[^"']*)["']/gi,
  ];
  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html)) !== null) links.add(match[1]);
  }
  const visibleText = decodeHtml(html);
  const countMatch = visibleText.match(/(?:showing\s+\d+\s*(?:-|to)\s*\d+\s+of|total\s+jobs?\s*:?|jobs?\s*:?)[^\d]{0,10}(\d{1,6})/i);
  const jobs = countMatch ? Number(countMatch[1]) : links.size;
  if (!jobs && !/jobs|vacanc|career/i.test(visibleText)) return { status: "error", httpStatus: response.status, jobs: 0, message: "The page responded, but no public job listing markup was detected." };
  return { status: "ok", httpStatus: response.status, jobs };
}

async function testFeed(feed: EmployerFeed) {
  try {
    if (feed.type === "workday") {
      const config = parseWorkdayIdentifier(feed.identifier);
      if (!config) return { status: "error", httpStatus: 0, jobs: 0, message: "Use host|tenant|career-site|locale" };
      const url = `https://${config.host}/wday/cxs/${encodeURIComponent(config.tenant)}/${encodeURIComponent(config.site)}/jobs`;
      const response = await fetch(url, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ appliedFacets: {}, limit: 20, offset: 0, searchText: "" }), cache: "no-store" });
      if (!response.ok) return { status: "error", httpStatus: response.status, jobs: 0 };
      const data = await response.json();
      return { status: "ok", httpStatus: response.status, jobs: Number(data.total ?? data.jobPostings?.length ?? 0) };
    }
    if (feed.type === "erecruit") {
      const baseUrl = parseERecruitIdentifier(feed.identifier);
      if (!baseUrl) return { status: "error", httpStatus: 0, jobs: 0, message: "Enter a valid HTTPS eRecruit base URL." };
      return testERecruit(baseUrl);
    }

    let url = "";
    if (feed.type === "greenhouse") url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(feed.identifier)}/jobs`;
    if (feed.type === "lever") url = `https://api.lever.co/v0/postings/${encodeURIComponent(feed.identifier)}?mode=json`;
    if (feed.type === "ashby") url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(feed.identifier)}`;
    if (feed.type === "smartrecruiters") url = `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(feed.identifier)}/postings?limit=100`;
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) return { status: "error", httpStatus: response.status, jobs: 0 };
    const data = await response.json();
    const jobs = Array.isArray(data) ? data.length : Array.isArray(data.jobs) ? data.jobs.length : Array.isArray(data.content) ? data.content.length : 0;
    return { status: "ok", httpStatus: response.status, jobs };
  } catch (error) {
    return { status: "error", httpStatus: 0, jobs: 0, message: error instanceof Error ? error.message : "Feed test failed" };
  }
}

export async function GET(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised. Check CAREER_ADMIN_KEY and redeploy Production." }, { status: 401 });
  try {
    const feeds = await readRegistry();
    const diagnostics = await Promise.all(feeds.map(async (feed) => ({ ...feed, diagnostic: await testFeed(feed) })));
    return NextResponse.json({ storage: supabaseConfig() ? "supabase" : "vercel-environment", feeds: diagnostics });
  } catch (error) {
    console.error("Employer registry load error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load employer registry" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ error: "Supabase is not configured. The current Vercel environment registry is read-only." }, { status: 503 });
  const body = (await request.json()) as EmployerFeed;
  if (!body.company || !body.type || !body.identifier) return NextResponse.json({ error: "Company, provider type and identifier are required." }, { status: 400 });
  if (isPlaceholder(body.company, body.identifier)) return NextResponse.json({ error: "Replace the example company and identifier with a real employer feed." }, { status: 400 });
  if (body.type === "workday" && !parseWorkdayIdentifier(body.identifier)) return NextResponse.json({ error: "Workday identifier must use host|tenant|career-site|locale." }, { status: 400 });
  if (body.type === "erecruit" && !parseERecruitIdentifier(body.identifier)) return NextResponse.json({ error: "eRecruit identifier must be a valid public base URL." }, { status: 400 });
  const response = await fetch(`${config.url}/rest/v1/career_employers`, { method: "POST", headers: supabaseHeaders(config.key, { "Content-Type": "application/json", Prefer: "return=representation" }), body: JSON.stringify({ company: body.company.trim(), industry: body.industry?.trim() || null, type: body.type, identifier: body.identifier.trim(), enabled: body.enabled ?? true }) });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Could not add employer" }, { status: response.status });
  return NextResponse.json({ employer: Array.isArray(data) ? data[0] : data }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ error: "Supabase is required to update employers." }, { status: 503 });
  const body = (await request.json()) as EmployerFeed;
  if (!body.id) return NextResponse.json({ error: "Employer ID is required." }, { status: 400 });
  if (isPlaceholder(body.company, body.identifier)) return NextResponse.json({ error: "Replace the example company and identifier with a real employer feed." }, { status: 400 });
  if (body.type === "workday" && !parseWorkdayIdentifier(body.identifier)) return NextResponse.json({ error: "Workday identifier must use host|tenant|career-site|locale." }, { status: 400 });
  if (body.type === "erecruit" && !parseERecruitIdentifier(body.identifier)) return NextResponse.json({ error: "eRecruit identifier must be a valid public base URL." }, { status: 400 });
  const response = await fetch(`${config.url}/rest/v1/career_employers?id=eq.${encodeURIComponent(body.id)}`, { method: "PATCH", headers: supabaseHeaders(config.key, { "Content-Type": "application/json", Prefer: "return=representation" }), body: JSON.stringify({ company: body.company, industry: body.industry || null, type: body.type, identifier: body.identifier, enabled: body.enabled ?? true }) });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Could not update employer" }, { status: response.status });
  return NextResponse.json({ employer: Array.isArray(data) ? data[0] : data });
}

export async function DELETE(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const config = supabaseConfig();
  if (!config) return NextResponse.json({ error: "Supabase is required to delete employers." }, { status: 503 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Employer ID is required." }, { status: 400 });
  const response = await fetch(`${config.url}/rest/v1/career_employers?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: supabaseHeaders(config.key) });
  if (!response.ok) return NextResponse.json({ error: "Could not delete employer" }, { status: response.status });
  return NextResponse.json({ deleted: true });
}
