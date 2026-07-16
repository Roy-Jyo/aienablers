import { NextRequest, NextResponse } from "next/server";

const ADZUNA_BASE_URL = "https://api.adzuna.com/v1/api/jobs/au/search/1";
const OPPORTUNITY_TERMS = [
  "intern",
  "internship",
  "graduate",
  "student",
  "trainee",
  "cadet",
  "apprentice",
  "placement",
  "vacation program",
];

function clean(value: string | null, maxLength: number) {
  return (value ?? "").trim().slice(0, maxLength);
}

function relevanceScore(job: Record<string, any>, keywords: string) {
  const title = String(job.title ?? "").toLowerCase();
  const description = String(job.description ?? "").toLowerCase();
  const text = `${title} ${description}`;
  const keywordTerms = keywords.toLowerCase().split(/\s+/).filter(Boolean);

  let score = 0;
  for (const term of OPPORTUNITY_TERMS) {
    if (title.includes(term)) score += 10;
    else if (description.includes(term)) score += 3;
  }
  for (const term of keywordTerms) {
    if (title.includes(term)) score += 4;
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
        error: "Internship search is being configured. Please try again shortly.",
        code: "ADZUNA_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const keywords = clean(request.nextUrl.searchParams.get("keywords"), 100);
  const location = clean(request.nextUrl.searchParams.get("location"), 100) || "Australia";

  if (!keywords) {
    return NextResponse.json(
      { error: "Please enter an internship area or skill." },
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
          error: "The internship provider rejected the search request.",
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

    const results = rankedResults.map(({ job, score }: { job: Record<string, any>; score: number }) => ({
      id: String(job.id ?? job.redirect_url),
      title: job.title ?? "Opportunity",
      company: job.company?.display_name ?? "Company not listed",
      location: job.location?.display_name ?? location,
      description: job.description ?? "",
      created: job.created ?? null,
      url: job.redirect_url,
      salaryMin: job.salary_min ?? null,
      salaryMax: job.salary_max ?? null,
      category: job.category?.label ?? null,
      source: "Adzuna",
      opportunityMatch: score > 0,
    }));

    return NextResponse.json({
      count: rawResults.length,
      providerCount: data.count ?? rawResults.length,
      results,
    });
  } catch (error) {
    console.error("Internship search error", error);
    return NextResponse.json(
      { error: "We could not complete the search. Please try again." },
      { status: 500 },
    );
  }
}
