import type { Metadata } from "next";
import JobMarketSearchClient from "./JobMarketSearchClient";

export const metadata: Metadata = {
  title: "AI Job Market Search Australia | AIEnablers",
  description:
    "Describe the role you are after in natural language and search live Australian job-market opportunities with AIEnablers.",
  alternates: { canonical: "/job-market-search" },
  openGraph: {
    title: "AI Job Market Search Australia | AIEnablers",
    description:
      "Tell AIEnablers what kind of role you are after and discover relevant Australian job opportunities.",
    url: "/job-market-search",
    siteName: "AIEnablers",
    type: "website",
  },
};

export default function JobMarketSearchPage() {
  return <JobMarketSearchClient />;
}
