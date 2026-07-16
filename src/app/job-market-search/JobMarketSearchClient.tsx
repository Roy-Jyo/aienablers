"use client";

import { FormEvent, useState } from "react";
import {
  Bot,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

type Job = {
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

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(value: string | null) {
  if (!value) return "Date not supplied";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return null;
  const money = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  });
  if (min && max) return `${money.format(min)} – ${money.format(max)}`;
  return money.format(min ?? max ?? 0);
}

const examples = [
  "I'm a final-year IT student looking for a cybersecurity internship",
  "Remote Power BI contract roles",
  "Graduate software engineer positions",
  "Project manager roles with Microsoft 365 experience",
];

export default function JobMarketSearchClient() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Australia");
  const [results, setResults] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [interpretedQuery, setInterpretedQuery] = useState("");
  const [directEmployerCount, setDirectEmployerCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function searchJobs(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setInterpretedQuery("");
    setDirectEmployerCount(0);

    try {
      const params = new URLSearchParams({ keywords: query, location });
      const response = await fetch(`/api/internships/search?${params.toString()}`);
      const contentType = response.headers.get("content-type") ?? "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { error: "The job search service returned an unexpected response." };

      if (!response.ok) throw new Error(data.error || "Search failed.");

      setResults(data.results ?? []);
      setTotal(data.providerCount ?? data.count ?? 0);
      setInterpretedQuery(data.interpretedQuery ?? query);
      setDirectEmployerCount(data.directEmployerCount ?? 0);
      setStatus("done");
    } catch (error) {
      setResults([]);
      setTotal(0);
      setInterpretedQuery("");
      setDirectEmployerCount(0);
      setMessage(error instanceof Error ? error.message : "Search failed.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-slate-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-300">
            <Bot size={17} /> AIEnablers Job Market Search
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Tell me what kind of role you’re after
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Describe the role naturally. Include your skills, experience, preferred work style or career stage, and we’ll search live Australian job-market listings for relevant matches.
          </p>
        </div>

        <form
          onSubmit={searchJobs}
          className="mx-auto mt-10 max-w-5xl rounded-3xl border border-indigo-100 bg-white p-5 shadow-2xl shadow-indigo-100/70 sm:p-7 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
        >
          <label className="block">
            <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Sparkles size={17} className="text-indigo-600 dark:text-indigo-400" /> Describe your ideal role
            </span>
            <div className="rounded-2xl border border-slate-300 bg-slate-50/80 p-3 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 dark:border-slate-600 dark:bg-slate-950 dark:focus-within:border-indigo-400 dark:focus-within:bg-slate-950 dark:focus-within:ring-indigo-950">
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                required
                rows={4}
                placeholder="For example: I'm an experienced business analyst looking for a hybrid role in financial services, or a graduate software engineer role where I can work with cloud technologies."
                className="w-full resize-none bg-transparent px-2 py-2 text-lg leading-7 text-slate-900 caret-indigo-600 outline-none placeholder:text-slate-500 dark:text-white dark:caret-indigo-400 dark:placeholder:text-slate-400"
              />
            </div>
          </label>

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Preferred location</span>
              <div className="flex items-center rounded-xl border border-slate-300 bg-white px-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-slate-600 dark:bg-slate-950 dark:focus-within:border-indigo-400 dark:focus-within:ring-indigo-950">
                <MapPin size={18} className="text-slate-400" />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Australia, Sydney, Melbourne or Brisbane"
                  className="w-full bg-transparent px-3 py-3 text-slate-900 caret-indigo-600 outline-none placeholder:text-slate-500 dark:text-white dark:caret-indigo-400 dark:placeholder:text-slate-400"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="self-end rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Searching</span>
              ) : (
                <span className="flex items-center gap-2"><Search size={18} /> AI Search Jobs</span>
              )}
            </button>
          </div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Don’t worry about perfect keywords. Write naturally, just as you would explain the role to a recruiter.
          </p>
        </form>

        {status === "idle" && (
          <div className="mx-auto mt-8 max-w-5xl">
            <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">Try an example</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setQuery(example)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
            {message}
          </div>
        )}

        {status === "done" && (
          <section className="mx-auto mt-10 max-w-5xl" aria-live="polite">
            <div className="mb-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-800 dark:bg-indigo-950/40">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  <Bot size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">AI understood your request</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                      <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
                      Search terms: {interpretedQuery || query}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                      <MapPin size={15} className="text-indigo-600 dark:text-indigo-400" />
                      Location: {location || "Australia"}
                    </span>
                    {directEmployerCount > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 size={15} /> {directEmployerCount} direct employer {directEmployerCount === 1 ? "listing" : "listings"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {results.length ? `${results.length} relevant jobs shown` : "No matching jobs found"}
              </h2>
              {total > results.length && (
                <p className="text-sm text-slate-500 dark:text-slate-400">{total.toLocaleString()} total market matches</p>
              )}
            </div>

            <div className="grid gap-5">
              {results.map((job) => {
                const salary = formatSalary(job.salaryMin, job.salaryMax);
                return (
                  <article
                    key={job.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{job.company}</p>
                          {job.directEmployer && (
                            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              Direct employer
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1"><MapPin size={15} /> {job.location}</span>
                          <span>Posted {formatDate(job.created)}</span>
                          {salary && <span>{salary}</span>}
                          {job.category && <span>{job.category}</span>}
                        </div>
                      </div>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          job.directEmployer
                            ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                            : "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-indigo-200 px-4 py-2 font-medium text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-950"
                        }
                      >
                        {job.directEmployer ? "Apply on employer site" : "View & Apply"} <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600 dark:text-slate-300">{stripHtml(job.description)}</p>
                    <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                      {job.directEmployer ? "Direct source" : "Market source"}: {job.source}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
