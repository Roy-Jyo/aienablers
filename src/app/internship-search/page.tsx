import type { Metadata } from "next";
import InternshipSearchClient from "./InternshipSearchClient";

export const metadata: Metadata = {
  title: "Internship Search Australia | AIEnablers",
  description:
    "Search current Australian internships and student opportunities by skill, field and location with AIEnablers.",
  alternates: { canonical: "/internship-search" },
  openGraph: {
    title: "Internship Search Australia | AIEnablers",
    description:
      "Find current internships and student opportunities across Australia.",
    url: "/internship-search",
    siteName: "AIEnablers",
    type: "website",
  },
};

export default function InternshipSearchPage() {
  return <InternshipSearchClient />;
}
