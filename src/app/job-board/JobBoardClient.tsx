"use client"

import { useState } from "react"
import type { Job } from "@/lib/getJobs"

type JobBoardClientProps = {
  jobs: Job[]
}

export default function JobBoardClient({ jobs }: JobBoardClientProps) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("All")

  const locations = ["All", ...new Set(jobs.map((j) => j.location))]

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.jobId.toLowerCase().includes(search.toLowerCase())

    const matchesLocation =
      location === "All" || job.location === location

    return matchesSearch && matchesLocation
  })

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">AIEnablers Job Board</h1>

      <div className="flex gap-4 mb-8">
        <input
          placeholder="Search jobs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">JobId</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Openings</th>
            <th className="p-3 text-left">Apply</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((job) => (
            <tr key={job.jobId} className="border-t">
              <td className="p-3">{job.jobId}</td>
              <td className="p-3">{job.role}</td>
              <td className="p-3">{job.location}</td>
              <td className="p-3">{job.openings}</td>
              <td className="p-3">
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Apply
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}