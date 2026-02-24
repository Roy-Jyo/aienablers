// src/app/knowledge/ai-in-recruitment/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.aienablers.io";
const slug = "/knowledge/ai-in-recruitment";
const url = `${SITE}${slug}`;

export const metadata: Metadata = {
  title: "AI in Recruitment: ChatGPT, Automation & the Future of Hiring | AIEnablers",
  description:
    "AI is transforming recruitment with ChatGPT-style assistants, automated screening, faster shortlists and responsible governance. Learn benefits, risks and implementation steps.",
  alternates: {
    canonical: slug,
  },
  openGraph: {
    title:
      "AI in Recruitment: ChatGPT, Automation & the Future of Hiring",
    description:
      "AI is reshaping hiring workflows through automation, screening intelligence and governed decision support.",
    url,
    type: "article",
  },
};

export default function KnowledgeArticleAIRecruitment() {
  const lastUpdated = "2026-02-24";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "AI in Recruitment: ChatGPT, Automation & the Future of Hiring",
    description:
      "AI is transforming recruitment with ChatGPT-style assistants, automated screening, faster shortlists and responsible governance.",
    author: {
      "@type": "Organization",
      name: "AIEnablers",
    },
    publisher: {
      "@type": "Organization",
      name: "AIEnablers",
    },
    dateModified: lastUpdated,
    mainEntityOfPage: url,
    url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Knowledge Hub",
        item: `${SITE}/knowledge`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI in Recruitment",
        item: url,
      },
    ],
  };

  return (
    <main className="bg-gray-50 min-h-screen">
    <div className="mx-auto max-w-4xl px-6 py-16">

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/knowledge" className="hover:underline">
          Knowledge Hub
        </Link>{" "}
        <span className="mx-2">/</span>
        <span className="text-gray-900">AI in Recruitment</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          AI in Recruitment: Redefining Hiring in the Digital Age
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          AI is increasingly shaping end-to-end hiring workflows—from sourcing
          and screening to scheduling and decision support. This article
          summarises practical considerations, governance requirements and how
          ChatGPT-style assistants are being applied in recruitment operations.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          Last updated: {lastUpdated}
        </p>
      </header>

      {/* Content */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-[15px] leading-7 text-gray-800 space-y-10">
        
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            The Shift: From Manual Hiring to Intelligent Systems
          </h2>
          <p>
            Traditional recruitment processes often rely on manual screening,
            fragmented communication and subjective shortlisting decisions.
            AI-enabled recruitment introduces structured automation and
            data-informed evaluation across the hiring lifecycle.
          </p>
          <p>
            Modern AI systems can assist with resume parsing, skills matching,
            candidate ranking and automated coordination—while maintaining
            human oversight in final decision-making.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            The Role of ChatGPT-Style Assistants
          </h2>
          <p>
            Generative AI tools can support recruiters by drafting job
            descriptions, summarising candidate profiles, generating structured
            interview questions and improving communication consistency.
          </p>
          <p>
            When deployed responsibly, these tools reduce administrative load
            while preserving transparency and accountability.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Operational Benefits
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Faster time-to-hire</strong> through automated screening and scheduling.</li>
            <li><strong>Improved shortlist consistency</strong> using structured evaluation criteria.</li>
            <li><strong>Scalability</strong> without proportional HR expansion.</li>
            <li><strong>Enhanced candidate experience</strong> via faster communication cycles.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Governance and Risk Considerations
          </h2>
          <p>
            AI adoption in hiring must be accompanied by clear governance.
            Organisations should implement bias monitoring, transparent
            documentation, human oversight and robust data protection controls.
          </p>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Related Articles
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <Link href="/knowledge/autonomous-hiring" className="text-blue-600 hover:underline">
                Autonomous Hiring
              </Link>
            </li>
            <li>
              <Link href="/knowledge" className="text-blue-600 hover:underline">
                Back to Knowledge Hub
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Source Acknowledgement
          </h2>
          <p className="text-sm text-gray-600">
            This article draws thematic inspiration from Keith Ferrazzi,
            “The AI Recruitment Takeover: Redefining Hiring in the Digital Age,”
            Forbes (March 27, 2025). Commentary above represents independent analysis.
          </p>
        </section>

      </article>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Looking to modernise your hiring process?
        </h3>
        <p className="mt-2 text-gray-700">
          Explore structured, governed AI-enabled recruitment workflows designed
          to improve efficiency and decision consistency.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/cost-saving"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Calculate Cost Saving
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
          >
            Book a Demo
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}