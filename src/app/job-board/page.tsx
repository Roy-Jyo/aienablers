import { getJobs } from "@/lib/getJobs"
import JobBoardClient from "./JobBoardClient"

export default async function JobBoardPage() {

  const jobs = await getJobs()

  return <JobBoardClient jobs={jobs} />

}