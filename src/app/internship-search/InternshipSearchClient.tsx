"use client";

import { FormEvent, useState } from "react";
import { BriefcaseBusiness, ExternalLink, Loader2, MapPin, Search } from "lucide-react";

type Internship = {
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

export default function InternshipSearchClient() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("Sydney");
  const [results, setResults] = useState<Internship[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function searchInternships(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const params = new URLSearchParams({ keywords, location });
      const response = await fetch(`/api/internships/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Search failed.");

      setResults(data.results ?? []);
      setTotal(data.count ?? 0);
      setStatus("done");
    } catch (error) {
      setResults([]);
      setTotal(0);
      setMessage(error instanceof Error ? error.message : "Search failed.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <BriefcaseBusiness size={16} /> AIEnablers Student Opportunity Search
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find internships that match your skills
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Search current Australian internship and student opportunities by field, skill and location. More employer feeds will be added progressively.
          </p>
        </div>

        <form
          onSubmit={searchInternships}
          className="mx-auto mt-10 grid max-w-4xl gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 md:grid-cols-[1fr_0.7fr_auto]"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Internship area or skill</span>
            <div className="flex items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Search size={18} className="text-slate-400" />
              <input
                value={keywords}
                onChange={(event) => setKeywords(event.target.value)}
                required
                placeholder="e.g. data analyst, marketing, software"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Location</span>
            <div className="flex items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <MapPin size={18} className="text-slate-400" />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Sydney or Australia"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="self-end rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Searching</span>
            ) : (
              "Search internships"
            )}
          </button>
        </form>

        {status === "error" && (
          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            {message}
          </div>
        )}

        {status === "done" && (
          <section className="mx-auto mt-12 max-w-5xl" aria-live="polite">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold text-slate-900">
                {results.length ? `${results.length} opportunities shown` : "No matching opportunities found"}
              </h2>
              {total > results.length && <p className="text-sm text-slate-500">{total.toLocaleString()} total provider matches</p>}
            </div>

            <div className="grid gap-5">
              {results.map((job) => {
                const salary = formatSalary(job.salaryMin, job.salaryMax);
                return (
                  <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">{job.company}</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900">{job.title}</h3>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
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
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-2 font-medium text-blue-700 hover:bg-blue-50"
                      >
                        View opportunity <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600">{stripHtml(job.description)}</p>
                    <p className="mt-4 text-xs text-slate-400">Source: {job.source}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {status === "idle" && (
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              ["Search broadly", "Try a field such as cybersecurity, accounting, business analysis or engineering."],
              ["Use your location", "Search a city, region, remote roles or all of Australia."],
              ["Apply at the source", "Each result links to the original listing so you can review and apply directly."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
