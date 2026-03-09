"use client"

import { useState } from "react"
import type { Job } from "@/lib/getJobs"

type Props = {
  jobs: Job[]
}

export default function JobBoardClient({ jobs }: Props) {

  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("All")

  const locations = ["All", ...new Set(jobs.map(j => j.location))]

  const filtered = jobs.filter((job) => {

    const matchesSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.jobId.toLowerCase().includes(search.toLowerCase())

    const matchesLocation =
      location === "All" || job.location === location

    return matchesSearch && matchesLocation

  })

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        AIEnablers Job Board
      </h1>

      {/* Filters */}

      <div className="flex flex-col md:flex-row gap-4 mb-10">

        <input
          placeholder="Search jobs..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
        >
          {locations.map((loc)=>(
            <option key={loc}>{loc}</option>
          ))}
        </select>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">

        <table className="w-full bg-white">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">

            <tr>
              <th className="p-4 text-left">Job ID</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Openings</th>
              <th className="p-4 text-left">Apply</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((job)=>(
              <tr key={job.jobId} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium text-gray-700">
                  {job.jobId}
                </td>

                <td className="p-4 text-gray-900">
                  {job.role}
                </td>

                <td className="p-4 text-gray-600">
                  {job.location}
                </td>

                <td className="p-4 text-gray-600">
                  {job.openings}
                </td>

                <td className="p-4">

                  <a
                    href={job.applyLink}
                    target="_blank"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Apply
                  </a>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}