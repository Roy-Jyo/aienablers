import { NextRequest, NextResponse } from "next/server";

const ADZUNA_BASE_URL = "https://api.adzuna.com/v1/api/jobs/au/search/1";

function clean(value: string | null, maxLength: number) {
  return (value ?? "").trim().slice(0, maxLength);
}

function relevanceScore(job: Record<string, any>, keywords: string) {
  const title = String(job.title ?? "").toLowerCase();
  const description = String(job.description ?? "").toLowerCase();
  const text = `${title} ${description}`;
  const terms = keywords.toLowerCase().split(/\s+/).filter((term) => term.length > 2);

  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 5;
    else if (text.includes(term)) score += 1;
  }
  return score;
}

export async function GET(request: NextRequest) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    return NextResponse.json(
      {
        error: "Job Market Search is being configured. Please try again shortly.",
        code: "ADZUNA_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const keywords = clean(request.nextUrl.searchParams.get("keywords"), 250);
  const location = clean(request.nextUrl.searchParams.get("location"), 100) || "Australia";

  if (!keywords) {
    return NextResponse.json(
      { error: "Please describe the kind of role you are after." },
      { status: 400 },
    );
  }

  const query = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: "50",
    what: keywords,
    where: location,
    sort_by: "date",
  });

  try {
    const response = await fetch(`${ADZUNA_BASE_URL}?${query.toString()}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      const upstreamBody = await response.text();
      console.error("Adzuna search failed", response.status, upstreamBody);
      return NextResponse.json(
        {
          error: "The job-market provider rejected the search request.",
          providerStatus: response.status,
        },
        { status: 502 },
      );
    }

    const data = await response.json();
    const rawResults = Array.isArray(data.results) ? data.results : [];
    const rankedResults = rawResults
      .map((job: Record<string, any>) => ({ job, score: relevanceScore(job, keywords) }))
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
      results,
    });
  } catch (error) {
    console.error("Job market search error", error);
    return NextResponse.json(
      { error: "We could not complete the search. Please try again." },
      { status: 500 },
    );
  }
}
