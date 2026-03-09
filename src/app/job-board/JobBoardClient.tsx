"use client"

import { useMemo, useState } from "react"
import type { Job } from "@/lib/getJobs"

type Props = {
  jobs: Job[]
}

const JOBS_PER_PAGE = 6

export default function JobBoardClient({ jobs }: Props) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  const locations = useMemo(() => {
    return ["All", ...Array.from(new Set(jobs.map((job) => job.location))).sort()]
  }, [jobs])

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const q = search.toLowerCase().trim()

      const matchesSearch =
        q === "" ||
        job.role.toLowerCase().includes(q) ||
        job.jobId.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q)

      const matchesLocation =
        location === "All" || job.location === location

      return matchesSearch && matchesLocation
    })

    return filtered
  }, [jobs, search, location])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE))

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE
    return filteredJobs.slice(start, start + JOBS_PER_PAGE)
  }, [filteredJobs, currentPage])

  const handleLocationChange = (loc: string) => {
    setLocation(loc)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            AIEnablers Careers
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Find your next opportunity
          </h1>

          <p className="mt-4 max-w-3xl text-base md:text-lg text-slate-600">
            Explore curated roles across technology, digital, consulting, recruitment,
            and transformation. Search by role, job ID, or location and apply directly.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <label htmlFor="job-search" className="sr-only">
                Search jobs
              </label>
              <input
                id="job-search"
                type="text"
                placeholder="Search by role, Job ID, or location"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="text-sm text-slate-500">
              {filteredJobs.length} role{filteredJobs.length === 1 ? "" : "s"} found
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {locations.map((loc) => {
              const active = location === loc

              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLocationChange(loc)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {loc}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <article
                key={job.jobId}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-blue-600">
                      Job ID: {job.jobId}
                    </div>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                      {job.role}
                    </h2>
                  </div>

                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 whitespace-nowrap">
                    {job.openings} opening{job.openings === 1 ? "" : "s"}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {job.location}
                  </span>

                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    Open role
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-600">
                  Join a high-impact opportunity sourced through AIEnablers. Apply now to
                  be considered for this role.
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Location: <span className="font-medium text-slate-700">{job.location}</span>
                  </div>

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Apply for ${job.role} in ${job.location}`}
                    className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Apply now
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">No matching jobs found</h2>
              <p className="mt-2 text-slate-600">
                Try a different keyword or choose another location filter.
              </p>
            </div>
          )}
        </div>

        {filteredJobs.length > JOBS_PER_PAGE && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}