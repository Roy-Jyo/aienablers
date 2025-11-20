import Link from "next/link";

export default function TransformingAIRecruitmentANZ() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto py-16 px-6">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-2">
          <Link href="/knowledge" className="text-blue-600 hover:underline">
            Knowledge Hub
          </Link>{" "}
          / Transforming AI Recruitment in ANZ
        </p>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Transforming AI Recruitment in ANZ
        </h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          The Australian and New Zealand recruitment landscape is rapidly shifting
          as organisations adopt AI-enabled sourcing, CV screening, scheduling and 
          early-stage interviews. This article explores how AI is reshaping talent 
          acquisition across ANZ, including compliance considerations, productivity 
          boosts and market expectations.
        </p>

        {/* Storyboard Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              1. ANZ talent shortages accelerate AI adoption
            </h2>
            <p className="text-gray-700 text-sm">
              With ongoing skill shortages in IT, healthcare, engineering and 
              financial services, ANZ organisations are turning to AI to reduce 
              time-to-hire and remove bottlenecks in volume recruitment.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              2. AI-powered CV screening for better accuracy
            </h2>
            <p className="text-gray-700 text-sm">
              AI tools read CVs using NLP, allowing deeper context understanding 
              beyond keyword matching — a major improvement for ANZ employers 
              dealing with diverse applicant pools and non-standard CV formats.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              3. Automated scheduling aligned with ANZ working patterns
            </h2>
            <p className="text-gray-700 text-sm">
              Automated calendar matching accounts for flexible work, remote 
              roles and cross-state or cross-Tasman time zone differences, 
              improving candidate experience and reducing back-and-forth emails.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              4. AI-led initial interviews becoming mainstream
            </h2>
            <p className="text-gray-700 text-sm">
              Many ANZ organisations now use AI-led interviews to evaluate 
              communication skills, behavioural patterns and role fit — especially 
              for high-volume frontline roles or offshore talent pipelines.
            </p>
          </div>
        </div>

        {/* Summary Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            The impact on ANZ recruiters
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            AI recruitment tools help ANZ businesses reduce time-to-hire, improve 
            candidate quality and lower operational costs — while supporting 
            compliance with local privacy and hiring standards.
          </p>
          <p className="text-gray-700 text-sm">
            The shift is clear: recruitment teams are spending less time on 
            manual triage and more time on stakeholder engagement and final hiring 
            decisions.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Want to transform your ANZ hiring process?
            </h2>
            <p className="text-gray-700 text-sm">
              Book a demo to see how AIEnablers supports ANZ recruitment workflows.
            </p>
          </div>
          <Link
            href="/#demo"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md"
          >
            Book a demo
          </Link>
        </section>
      </section>
    </main>
  );
}
