// src/app/knowledge/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Hub | AIEnablers",
  description:
    "Explore AI recruitment insights, ChatGPT hiring strategies, automation trends and governance guides from AIEnablers.",
  alternates: {
    canonical: "/knowledge",
  },
};

export default function Knowledge() {
  const topics = [
    {
      title: "AI in Recruitment: Redefining Hiring in the Digital Age",
      desc: "How AI and ChatGPT-style assistants are transforming screening, scheduling and governance in modern hiring.",
      link: "/knowledge/ai-in-recruitment",
      internal: true,
    },
    {
      title: "Autonomous Hiring",
      desc: "How AI-driven workflows enable self-operating hiring pipelines from role creation to shortlist.",
      link: "/knowledge/autonomous-hiring",
      internal: true,
    },
    {
      title: "Reshaping the Future of Hiring",
      desc: "Explore fairness, transparency and responsible use of AI in recruitment.",
      link: "https://x0pa.com/blog/autonomous-hiring-ai-humans-decide/",
      internal: false,
    },
    {
      title: "Transforming AI Recruitment in ANZ",
      desc: "A deep dive into how AI is reshaping recruitment practices across the Australian & New Zealand talent market.",
      link: "https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions",
      internal: false,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-24 px-6">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Knowledge Hub
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Insights, AI recruitment trends, ChatGPT hiring strategies and
          governance guides from the AIEnablers team.
        </p>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-gray-100"
          >
            <h3 className="font-semibold text-lg text-blue-700 mb-3">
              {topic.title}
            </h3>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {topic.desc}
            </p>

            {topic.internal ? (
              <Link
                href={topic.link}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Read more →
              </Link>
            ) : (
              <a
                href={topic.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Read more →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}