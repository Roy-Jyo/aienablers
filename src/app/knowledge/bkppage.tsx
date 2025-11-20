export default function Knowledge() {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Knowledge Hub
      </h1>
      <p className="text-gray-600 mb-12 text-center">
        Explore insights, AI recruitment trends, and guides from the RecruitAI team.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['AI in Recruitment', 'ROI of Automation', 'Ethical AI Hiring'].map((topic, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-blue-700 mb-2">{topic}</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn how RecruitAI helps transform your hiring process through AI-powered insights.
            </p>
            <a
              href="#"
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
