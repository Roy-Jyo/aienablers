import type { Metadata } from "next";
import JobMarketSearchClient from "./JobMarketSearchClient";

export const metadata: Metadata = {
  title: "Career Intelligence Australia | AIEnablers",
  description:
    "Describe the role you are after in natural language and let AIEnablers Career Intelligence search live Australian job-market and direct-employer opportunities.",
  alternates: { canonical: "/job-market-search" },
  openGraph: {
    title: "AIEnablers Career Intelligence",
    description:
      "Tell AIEnablers what kind of role you are after and discover relevant opportunities across job-market and direct-employer sources.",
    url: "/job-market-search",
    siteName: "AIEnablers",
    type: "website",
  },
};

export default function JobMarketSearchPage() {
  return <JobMarketSearchClient />;
}
