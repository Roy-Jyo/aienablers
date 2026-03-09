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
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdX8eGWgCp8k2f_zkvgGP121d3ukQKz0uMPI5T_RY6F1Wc9rN9DLqIFWMcCVuRPOboUc2bQ6R36EFg/pub?gid=0&single=true&output=csv"

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