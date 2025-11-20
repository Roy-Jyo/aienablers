export default function Knowledge() {
  const topics = [
    //{ title: "AI in Recruitment", desc: "Learn how RecruitAI helps transform your hiring process through AI-powered insights.", link: "#" },
    //{ title: "ROI of Automation", desc: "Where AI Acts, and Humans Decide.", link: "#" },
    { title: "Reshaping the future of Hiring", 
      desc: "Explore fairness, transparency and responsible use of AI in recruitment.", 
      link: "https://x0pa.com/blog/autonomous-hiring-ai-humans-decide/" },
    // new topics
    {
      title: "Transforming AI Recruitment in ANZ",
      desc: "A deep dive into how AI is reshaping recruitment practices across the Australian & New Zealand talent market.",
      link: "https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions",
    },
    {
      title: "Autonomous Hiring",
      desc: "How AI-driven workflows enable self-operating hiring pipelines from role creation to shortlist.",
      link: "/knowledge/autonomous-hiring",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto py-24 px-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Knowledge Hub
      </h1>
      <p className="text-gray-600 mb-12 text-center">
        Explore insights, AI recruitment trends, and guides from the RecruitAI team.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topics.map((topic, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-blue-700 mb-2">
              {topic.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {topic.desc}
            </p>
            <a
              href={topic.link}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

