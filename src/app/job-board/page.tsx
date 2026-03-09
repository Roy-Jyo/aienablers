import type { Metadata } from "next"
import { getJobs } from "@/lib/getJobs"
import JobBoardClient from "./JobBoardClient"

export const metadata: Metadata = {
  title: "Job Board | AIEnablers",
  description:
    "Explore open roles from AIEnablers and partner organisations. Search jobs by role, location, and job ID, then apply directly online.",
  alternates: {
    canonical: "/job-board",
  },
  openGraph: {
    title: "AIEnablers Job Board",
    description:
      "Search current openings from AIEnablers and partner organisations.",
    url: "/job-board",
    siteName: "AIEnablers",
    type: "website",
  },
}

export default async function JobBoardPage() {
  const jobs = await getJobs()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AIEnablers Job Board",
    description:
      "Browse open roles from AIEnablers and partner organisations.",
    url: "https://www.aienablers.io/job-board",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobBoardClient jobs={jobs} />
    </>
  )
}