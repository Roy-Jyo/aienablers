// src/app/knowledge/ai-in-recruitment/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI in Recruitment: ChatGPT, Automation & the Future of Hiring | AIEnablers",
  description:
    "AI is transforming recruitment with ChatGPT-style assistants, automated screening, faster shortlists and better governance. Learn benefits, risks and practical steps.",
  alternates: {
    canonical: "/knowledge/ai-in-recruitment",
  },
  openGraph: {
    title: "AI in Recruitment: ChatGPT, Automation & the Future of Hiring",
    description:
      "AI is transforming recruitment with ChatGPT-style assistants, automated screening, faster shortlists and better governance. Learn benefits, risks and practical steps.",
    url: "/knowledge/ai-in-recruitment",
    type: "article",
  },
};

export default function KnowledgeArticleAIRecruitment() {
  const lastUpdated = "March 2026";

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link className="hover:underline" href="/knowledge">
          Knowledge Base
        </Link>{" "}
        <span className="mx-2">/</span>
        <span className="text-gray-900">AI in Recruitment</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-medium text-blue-700">AI &amp; Recruitment</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          AI in Recruitment: Redefining Hiring in the Digital Age
        </h1>
        <p className="mt-3 text-base leading-relaxed text-gray-700">
          AI is increasingly shaping end-to-end hiring workflows—from sourcing and
          screening to scheduling and decision support. This article summarises
          key industry themes and practical considerations, including how
          ChatGPT-style assistants are being applied in recruitment operations.
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-600">
          <span className="rounded-full bg-gray-100 px-3 py-1">
            Last updated: {lastUpdated}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            Reading time: ~6–8 min
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            Keywords: AI recruitment, ChatGPT hiring
          </span>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-none text-[15px] leading-7 text-gray-800 space-y-10">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            The Shift: From Manual Hiring to Intelligent Systems
          </h2>
          <p>
            Traditional recruitment processes often rely on manual screening,
            fragmented communication and subjective decision-making. AI-enabled
            recruitment introduces structured automation and data-informed
            evaluation across the hiring lifecycle.
          </p>
          <p>
            Modern AI recruitment systems support faster processing, consistent
            scoring and operational efficiency without removing human oversight.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            The Role of ChatGPT-Style Assistants in Hiring
          </h2>
          <p>
            Generative AI tools, commonly referred to as ChatGPT-style
            assistants, can assist with drafting job descriptions, summarising
            candidate profiles, generating structured interview questions and
            improving communication consistency.
          </p>
          <p>
            When deployed responsibly, these tools reduce administrative
            overhead while maintaining accountability in final hiring decisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Operational Benefits of AI Recruitment
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Faster time-to-hire:</strong> Automated screening and
              scheduling reduce bottlenecks.
            </p>
            <p>
              <strong>Improved shortlist consistency:</strong> Data-driven
              evaluation supports more structured assessment.
            </p>
            <p>
              <strong>Scalability:</strong> Organisations can manage higher
              hiring volumes without proportional HR expansion.
            </p>
            <p>
              <strong>Enhanced candidate experience:</strong> Faster
              communication improves engagement and perception.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Governance and Risk Considerations
          </h2>
          <p>
            Adoption of AI in hiring must be accompanied by clear governance
            frameworks. Organisations should implement:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Bias monitoring and fairness testing</li>
            <li>Transparent documentation of AI usage</li>
            <li>Human oversight for high-impact decisions</li>
            <li>Data protection and retention controls</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Implementation Considerations
          </h2>
          <p>
            Effective AI integration begins with clearly defined objectives.
            Organisations should align technology adoption with measurable hiring
            outcomes, stakeholder engagement and compliance requirements.
          </p>
          <p>
            AI works best when introduced strategically—enhancing recruitment
            capability rather than replacing human judgement.
          </p>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Source Acknowledgement
          </h2>
          <p className="text-sm text-gray-600">
            This article draws thematic inspiration from Keith Ferrazzi, “The AI
            Recruitment Takeover: Redefining Hiring in the Digital Age,” Forbes
            (March 27, 2025). Commentary above represents independent analysis.
          </p>
          <p className="text-sm text-gray-600">
            Note: This content is general information and not legal advice. For
            compliance requirements, consult appropriate legal and policy
            guidance.
          </p>
        </section>
      </article>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Want to reduce hiring time and cost?
        </h3>
        <p className="mt-2 text-gray-700">
          If you’re exploring AI-assisted recruitment workflows (including
          ChatGPT-style automation), we can help you design a practical,
          governed approach.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
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
    </main>
  );
}