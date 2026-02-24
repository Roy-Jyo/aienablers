// src/app/recruitment-as-a-service/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.aienablers.io";
const slug = "/recruitment-as-a-service";
const url = `${SITE}${slug}`;

export const metadata: Metadata = {
  title: "Recruitment as a Service (RaaS) Australia | AI-Enablers Recruitment",
  description:
    "Recruitment as a Service (RaaS) in Australia, powered by AI. Reduce cost-per-hire, accelerate shortlisting, and scale hiring with transparent, governed workflows.",
  alternates: { canonical: slug },
  openGraph: {
    title: "Recruitment as a Service (RaaS) in Australia | AIEnablers",
    description:
      "AI-powered RaaS for Australian organisations: predictable costs, faster time-to-hire, and structured screening with human oversight.",
    url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment as a Service (RaaS) in Australia | AIEnablers",
    description:
      "AI-powered RaaS for Australian organisations: predictable costs, faster time-to-hire, and structured screening with human oversight.",
  },
};

export default function RecruitmentAsAServicePage() {
  const dateModified = "2026-02-25";

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Recruitment as a Service (RaaS)",
    description:
      "AI-powered Recruitment as a Service (RaaS) for Australian organisations seeking predictable hiring costs, faster time-to-hire and scalable talent acquisition with governance.",
    provider: {
      "@type": "Organization",
      name: "AIEnablers",
      url: SITE,
    },
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "AdministrativeArea", name: "New South Wales" },
    ],
    serviceType: "Recruitment as a Service",
    url,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Recruitment as a Service (RaaS)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recruitment as a Service (RaaS) is an ongoing, subscription-style recruitment model where hiring support is delivered continuously, rather than charging a commission per placement.",
        },
      },
      {
        "@type": "Question",
        name: "How is RaaS different from traditional recruitment agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Traditional agencies often charge a percentage of salary per hire. RaaS provides predictable pricing and a repeatable hiring process focused on reducing time-to-hire and cost-per-hire.",
        },
      },
      {
        "@type": "Question",
        name: "Is RaaS cost-effective for Australian organisations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For organisations hiring multiple roles per year, RaaS can reduce cost-per-hire compared with commission-based agency models, while improving hiring consistency and reporting.",
        },
      },
      {
        "@type": "Question",
        name: "How does AI improve Recruitment as a Service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI supports faster screening, structured shortlisting, scheduling automation and consistent evaluation. Final decisions remain with hiring managers, with governance controls in place.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can we start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Timelines vary by role volume and workflow needs, but most organisations can begin with a scoped pilot and expand once the process and metrics are proven.",
        },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Recruitment as a Service",
        item: url,
      },
    ],
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero */}
        <section className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-700">
            Recruitment as a Service (RaaS) • Australia
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Recruitment as a Service (RaaS) in Australia
          </h1>
          <p className="mt-5 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A predictable, AI-powered recruitment model designed to reduce{" "}
            <strong>cost-per-hire</strong>, accelerate shortlisting, and scale
            hiring—while maintaining <strong>human oversight</strong> and
            governance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/cost-saving"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Calculate Cost Saving
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              Book a Consultation
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Last updated: {dateModified}
          </p>
        </section>

        {/* Value blocks */}
        <section className="grid gap-6 md:grid-cols-3 mb-12">
          {[
            {
              title: "Predictable costs",
              desc: "Subscription-style model that reduces reliance on agency commissions.",
            },
            {
              title: "Faster time-to-hire",
              desc: "AI-enabled screening and structured shortlisting to reduce bottlenecks.",
            },
            {
              title: "Governed workflow",
              desc: "Clear decision points, transparency and reporting for stakeholder confidence.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h2 className="text-base font-semibold text-gray-900">{b.title}</h2>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Main sections */}
        <section className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">
            What is Recruitment as a Service (RaaS)?
          </h2>
          <div className="space-y-4 text-[15px] leading-7 text-gray-800">
            <p>
              Recruitment as a Service (RaaS) is an ongoing hiring model where
              recruitment delivery is provided continuously—rather than paying a
              placement fee each time you hire.
            </p>
            <p>
              It’s ideal for organisations with recurring hiring needs, or
              teams that want a more efficient, repeatable process with better
              visibility into pipeline and outcomes.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">
            RaaS vs traditional recruitment agencies
          </h2>
          <div className="space-y-4 text-[15px] leading-7 text-gray-800">
            <p>
              Traditional agencies often charge a percentage of salary per hire.
              RaaS focuses on predictable pricing, process consistency, and
              measurable improvements (time-to-hire, cost-per-hire, shortlist
              quality).
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>More predictable budgeting</li>
              <li>Better process control and reporting</li>
              <li>Less reliance on one-off placements</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">
            How AI improves Recruitment as a Service
          </h2>
          <div className="space-y-4 text-[15px] leading-7 text-gray-800">
            <p>
              AI can support screening and coordination while keeping human
              accountability in place. Common improvements include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Faster CV triage and skills matching</li>
              <li>Structured shortlisting and consistent evaluation criteria</li>
              <li>Reduced admin through scheduling automation</li>
              <li>Improved reporting and auditability</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently asked questions
          </h2>

          <div className="space-y-6 text-[15px] leading-7 text-gray-800">
            <div>
              <h3 className="font-semibold text-gray-900">
                What is Recruitment as a Service (RaaS)?
              </h3>
              <p className="mt-2 text-gray-700">
                RaaS is a subscription-style recruitment model providing ongoing
                hiring support, rather than charging a per-placement commission.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Is RaaS cheaper than agencies?
              </h3>
              <p className="mt-2 text-gray-700">
                For organisations hiring multiple roles per year, RaaS commonly
                lowers cost-per-hire versus commission-based fees and provides
                more predictable budgeting.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Does AI replace recruiters?
              </h3>
              <p className="mt-2 text-gray-700">
                No. AI supports speed and consistency (screening, scheduling,
                summaries). Hiring decisions remain with people, with governance
                controls to maintain accountability.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/knowledge"
              className="text-sm font-medium text-blue-700 hover:underline"
            >
              Browse the Knowledge Hub →
            </Link>
            <Link
              href="/knowledge/ai-in-recruitment"
              className="text-sm font-medium text-blue-700 hover:underline"
            >
              Read: AI in Recruitment →
            </Link>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="rounded-2xl bg-blue-600 p-12 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Get a predictable, scalable hiring model
          </h2>
          <p className="max-w-2xl mx-auto mb-7 text-white/90">
            If you want Recruitment as a Service (RaaS) that reduces cost-per-hire
            and improves speed-to-hire—with clear governance—let’s talk.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-gray-100 transition"
            >
              Book a Consultation
            </Link>
            <Link
              href="/cost-saving"
              className="rounded-lg border border-white/70 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Calculate Cost Saving
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}