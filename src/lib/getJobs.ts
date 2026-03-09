export type Job = {
  jobId: string
  role: string
  location: string
  openings: number
  applyLink: string
  status: string
}

function parseCsvLine(line: string): string[] {
  return line
    .split(",")
    .map((value) => value.trim().replace(/^"|"$/g, ""))
}

export async function getJobs(): Promise<Job[]> {
  const spreadsheetId = "1gjFPbR50dRRi1MoQa65xfn8Jq6MqkEhAeyK-OSwzXdA"

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=Jobs`

  const res = await fetch(sheetUrl, {
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs CSV: ${res.status} ${res.statusText}`)
  }

  const text = await res.text()

  const rows = text
    .split("\n")
    .slice(1)
    .filter((row) => row.trim().length > 0)

  return rows
    .map((row) => {
      const [jobId, role, location, openings, applyLink, status] = parseCsvLine(row)

      return {
        jobId: jobId || "",
        role: role || "",
        location: location || "",
        openings: Number(openings || 0),
        applyLink: applyLink || "",
        status: status || "",
      }
    })
    .filter((job) => job.jobId && job.role && job.status.toLowerCase() === "open")
}