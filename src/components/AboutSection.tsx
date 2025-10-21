'use client';

export default function AboutSection() {
  return (
    <section className="max-w-5xl mx-auto py-20 px-6 text-center bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-sm">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        About AI Enablers RaaS
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        <strong>AI Enablers RaaS (Recruitment-as-a-Service)</strong> is redefining
        how organisations attract, assess, and hire talent. We combine automation,
        analytics, and adaptive AI to simplify every step of the recruitment
        process — cutting time-to-fill, improving candidate quality, and reducing
        cost-per-hire.
      </p>

      {/* Core Info */}
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Our platform leverages advanced <strong>Natural Language Processing (NLP)</strong> and
        machine learning to interpret resumes, match skills contextually, and
        deliver high-quality shortlists that go beyond keyword filtering.
        Adaptive models continuously learn from every placement, ensuring growing
        accuracy and ROI with each hire.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Headquartered in Sydney and backed by Anstelglobal (www.https://www.anstelglobal.com/) operating across Australia, we empower
        employers and agencies alike to achieve recruitment efficiency through
        intelligent automation — enabling faster, fairer, and more scalable
        hiring decisions.
      </p>

      {/* Mission */}
      <h2 className="text-2xl font-semibold text-blue-600 mt-12 mb-4">
        Our Mission
      </h2>
      <p className="text-gray-700 leading-relaxed mb-8">
        To empower organisations with AI-driven, adaptive recruitment solutions
        that transform hiring into a measurable business advantage.
      </p>

      {/* Values */}
      <h2 className="text-2xl font-semibold text-blue-600 mt-12 mb-4">
        Our Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-8">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold text-blue-700 mb-2">
            💡 Innovation & Automation
          </h3>
          <p>We harness AI to transform recruitment, enabling scalable, data-driven outcomes.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold text-blue-700 mb-2">
            🔍 Transparency & Efficiency
          </h3>
          <p>We measure success through efficiency gains, cost savings, and improved hiring quality.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold text-blue-700 mb-2">
            📈 Continuous Learning
          </h3>
          <p>Our algorithms evolve with every hire, learning from data to refine decision-making accuracy.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold text-blue-700 mb-2">
            🤝 Human Centricity
          </h3>
          <p>Technology enhances — not replaces — the human insight that drives meaningful recruitment.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="/book-demo"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Book a Demo
        </a>
      </div>

      {/* Contact */}
      <h2 className="text-2xl font-semibold text-blue-600 mt-16 mb-4">
        Contact Us
      </h2>
      <p className="text-gray-700">
        📧 info@aienablers.io &nbsp;|&nbsp; 🌐 www.aienablers.io &nbsp;|&nbsp; 📍 Sydney, Australia
      </p>
    </section>
  );
}
