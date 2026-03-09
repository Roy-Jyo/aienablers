export type Job = {
  jobId: string
  role: string
  location: string
  openings: number
  applyLink: string
  status: string
}

export async function getJobs(): Promise<Job[]> {

  const sheetUrl =
    "1gjFPbR50dRRi1MoQa65xfn8Jq6MqkEhAeyK-OSwzXdA"

  const res = await fetch(sheetUrl, {
    next: { revalidate: 300 }
  })

  const text = await res.text()

  const rows = text.split("\n").slice(1)

  return rows
    .map((row) => {
      const [jobId, role, location, openings, applyLink, status] = row.split(",")

      return {
        jobId,
        role,
        location,
        openings: Number(openings),
        applyLink,
        status
      }
    })
    .filter((job) => job.status?.trim() === "Open")
}