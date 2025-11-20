import Link from "next/link";

export default function AutonomousHiringPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto py-16 px-6">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-2">
          <Link href="/knowledge" className="text-blue-600 hover:underline">
            Knowledge Hub
          </Link>{" "}
          / Autonomous Hiring
        </p>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Autonomous Hiring
        </h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Autonomous hiring is the next evolution of talent acquisition — where 
          AI-driven workflows operate independently to source, assess, shortlist 
          and schedule candidates, while humans oversee governance and final 
          decisions.
        </p>

        {/* Storyboard tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              1. Always-on role pipelines
            </h2>
            <p className="text-gray-700 text-sm">
              Instead of starting from zero when a role opens, autonomous systems 
              maintain a constantly updated pool of candidates, scored and ready  
              based on your ongoing talent needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              2. Automated candidate scoring & routing
            </h2>
            <p className="text-gray-700 text-sm">
              CVs are screened continuously with AI, and candidates are routed 
              automatically to interview invitations, assessments or nurture 
              pipelines depending on their score.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              3. Self-operating interview scheduling
            </h2>
            <p className="text-gray-700 text-sm">
              The system detects availability from integrated calendars and lets 
              candidates choose times instantly — eliminating delays caused by 
              manual scheduling.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              4. AI-led preliminary interviews
            </h2>
            <p className="text-gray-700 text-sm">
              AI interviewers conduct structured first-round sessions, evaluate 
              candidate responses and provide summaries for hiring teams.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              5. Human oversight at key decision points
            </h2>
            <p className="text-gray-700 text-sm">
              Humans stay in control: reviewing summaries, making final selections 
              and validating that candidates align to team culture and expectations.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              6. Scalable, repeatable hiring engine
            </h2>
            <p className="text-gray-700 text-sm">
              Autonomous hiring enables consistent outcomes across locations, 
              roles and seasons — especially valuable for large organisations or 
              distributed hiring teams.
            </p>
          </div>
        </div>

        {/* Summary */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            What organisations gain from autonomous hiring
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            Faster hiring cycles, more consistent screening, fewer manual 
            operations, improved candidate experience and a scalable hiring 
            engine that grows with the business.
          </p>
          <p className="text-gray-700 text-sm">
            Autonomous doesn’t mean uncontrolled — it means **structured,
            rules-based workflows** that handle repetitive tasks so humans
            can focus on judgement, culture and final decisions.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Ready to explore autonomous hiring?
            </h2>
            <p className="text-gray-700 text-sm">
              Book a demo to see how AIEnablers can run your early-stage hiring 
              autonomously while you stay in full control.
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
