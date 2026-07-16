import { NextRequest, NextResponse } from "next/server";

type EmployerFeed = {
  id?: string;
  company: string;
  industry?: string;
  type: "greenhouse" | "lever" | "ashby" | "smartrecruiters";
  identifier: string;
  enabled?: boolean;
};

function authorised(request: NextRequest) {
  const configured = process.env.CAREER_ADMIN_KEY;
  const supplied = request.headers.get("x-admin-key");
  return Boolean(configured && supplied && supplied === configured);
}

function envFeeds(): EmployerFeed[] {
  const raw = process.env.DIRECT_JOB_FEEDS;
  if (!raw) return [];
  try {
    const feeds = JSON.parse(raw);
    if (!Array.isArray(feeds)) return [];
    return feeds.flatMap((feed: Record<string, unknown>) => {
      const company = typeof feed.company === "string" ? feed.company : "";
      const industry = typeof feed.industry === "string" ? feed.industry : "";
      if (!company || typeof feed.type !== "string") return [];
      if (feed.type === "greenhouse" && typeof feed.token === "string") {
        return [{ company, industry, type: "greenhouse" as const, identifier: feed.token, enabled: true }];
      }
      if (feed.type === "lever" && typeof feed.site === "string") {
        return [{ company, industry, type: "lever" as const, identifier: feed.site, enabled: true }];
      }
      if (feed.type === "ashby" && typeof feed.board === "string") {
        return [{ company, industry, type: "ashby" as const, identifier: feed.board, enabled: true }];
      }
      if (feed.type === "smartrecruiters" && typeof feed.companyId === "string") {
        return [{ company, industry, type: "smartrecruiters" as const, identifier: feed.companyId, enabled: true }];
      }
      return [];
    });
  } catch {
    return [];
  }
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

async function readRegistry(): Promise<EmployerFeed[]> {
  const config = supabaseConfig();
  if (!config) return envFeeds();
  const response = await fetch(
    `${config.url}/rest/v1/career_employers?select=id,company,industry,type,identifier,enabled&order=company.asc`,
    {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
      cache: "no-store",
    },
  );
  if (!response.ok) throw new Error(`Registry read failed: ${response.status}`);
  return response.json();
}

async function testFeed(feed: EmployerFeed) {
  let url = "";
  if (feed.type === "greenhouse") url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(feed.identifier)}/jobs`;
  if (feed.type === "lever") url = `https://api.lever.co/v0/postings/${encodeURIComponent(feed.identifier)}?mode=json`;
  if (feed.type === "ashby") url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(feed.identifier)}`;
  if (feed.type === "smartrecruiters") url = `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(feed.identifier)}/postings?limit=100`;

  try {
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) return { status: "error", httpStatus: response.status, jobs: 0 };
    const data = await response.json();
    const jobs = Array.isArray(data)
      ? data.length
      : Array.isArray(data.jobs)
        ? data.jobs.length
        : Array.isArray(data.content)
          ? data.content.length
          : 0;
    return { status: "ok", httpStatus: response.status, jobs };
  } catch (error) {
    return { status: "error", httpStatus: 0, jobs: 0, message: error instanceof Error ? error.message : "Feed test failed" };
  }
}

export async function GET(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  try {
    const feeds = await readRegistry();
    const diagnostics = await Promise.all(
      feeds.map(async (feed) => ({ ...feed, diagnostic: await testFeed(feed) })),
    );
    return NextResponse.json({
      storage: supabaseConfig() ? "supabase" : "vercel-environment",
      feeds: diagnostics,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load employer registry" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const config = supabaseConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Supabase is not configured. The current Vercel environment registry is read-only." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as EmployerFeed;
  if (!body.company || !body.type || !body.identifier) {
    return NextResponse.json({ error: "Company, provider type and identifier are required." }, { status: 400 });
  }

  const response = await fetch(`${config.url}/rest/v1/career_employers`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      company: body.company.trim(),
      industry: body.industry?.trim() || null,
      type: body.type,
      identifier: body.identifier.trim(),
      enabled: body.enabled ?? true,
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Could not add employer" }, { status: response.status });
  return NextResponse.json({ employer: Array.isArray(data) ? data[0] : data }, { status: 201 });
}
