// app/x0pa-vs-bullhorn-jobadder/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIEnablers | AI-Native Recruitment (X0PA) vs Bullhorn vs JobAdder",
  description:
    "Compare AIEnablers (powered by X0PA) with Bullhorn and JobAdder. See how Generative AI + Agentic AI reduces time-to-hire, improves shortlist quality, and automates TA workflows.",
  alternates: { canonical: "/x0pa-vs-bullhorn-jobadder" },
  openGraph: {
    title: "AIEnablers | X0PA vs Bullhorn vs JobAdder",
    description:
      "AI-native recruiting for TA teams. Faster shortlists, better candidate experience, bias mitigation, AI interviews, and automated workflows.",
    url: "/x0pa-vs-bullhorn-jobadder",
    type: "website",
  },
};

const features = [
  {
    title: "Recruit in Days — Not Months",
    desc: "Machine learning + NLP ranking compresses time-to-shortlist and accelerates hiring decisions.",
  },
  {
    title: "Rich Candidate Experience",
    desc: "Faster turnaround and consistent communications driven by AI-assisted workflows.",
  },
  {
    title: "Bias Mitigation Built In",
    desc: "Profanity detection and bias-reduction models support fairer, more consistent evaluation.",
  },
  {
    title: "JD Creation + One-Touch Posting",
    desc: "Generate role-ready JDs from bullet points and publish quickly, including self-sourcing via LinkedIn.",
  },
  {
    title: "7 Agentic AI Bots Automate the Workflow",
    desc: "Auto scheduling, follow-ups, feedback consolidation, and recommendations based on traits + experience.",
  },
  {
    title: "AI Interviews (Optional)",
    desc: "Use structured AI interviews (MCQ/technical/behavioural) to further refine shortlists before manager time.",
  },
  {
    title: "Ethical AI + Data Security",
    desc: "PII safeguards, strong governance controls, and enterprise-grade security posture.",
  },
  {
    title: "Lower Cost per Hire",
    desc: "Reduce admin overhead and improve TA productivity — at a fraction of traditional recruitment cost.",
  },
];

export default function Page() {
  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 20px" }}>
      {/* HERO */}
      <section style={{ display: "grid", gap: 18 }}>
        <p style={{ fontWeight: 600, opacity: 0.8 }}>
          AIEnablers RaaS • Powered by X0PA
        </p>

        <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: 0 }}>
          AI-Native Recruiting for TA Teams — Faster Shortlists. Better Hires. Lower Cost.
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, maxWidth: 860 }}>
          Compare <strong>X0PA</strong> with <strong>Bullhorn</strong> and{" "}
          <strong>JobAdder</strong>. AIEnablers uses <strong>Generative AI</strong> +{" "}
          <strong>Agentic AI</strong> to automate screening, scheduling, and first-round evaluation — so
          your team hires in <strong>days</strong>, not weeks.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
          <a
            href="#demo"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Book a Demo
          </a>
          <a
            href="#how"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "transparent",
              color: "#111",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            See How It Works
          </a>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 6,
            fontSize: 14,
            opacity: 0.85,
          }}
        >
          <span>Enterprise-grade security</span> • <span>Ethical AI</span> •{" "}
          <span>PII safeguards</span> • <span>ISO-aligned controls</span>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>Manual recruiting doesn’t scale. Hiring demand did.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 900 }}>
          Most TA teams lose time in repetitive work — CV screening, scheduling, follow-ups and feedback
          chasing — creating slow time-to-hire, inconsistent shortlists and rising cost-per-hire.
        </p>

        <ul style={{ lineHeight: 1.9, marginTop: 10 }}>
          <li>CV screening and ranking</li>
          <li>Interview scheduling and coordination</li>
          <li>Candidate follow-ups and comms</li>
          <li>Feedback consolidation across panels</li>
          <li>Inconsistent shortlisting and hidden bias risks</li>
        </ul>
      </section>

      {/* SOLUTION */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>Meet AIEnablers RaaS — powered by X0PA</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 900 }}>
          This is not “just another ATS” or “just another CRM.” It’s an AI-native recruitment approach
          that automates the heavy lifting end-to-end, while keeping your recruiters in control of the
          final decision.
        </p>
      </section>

      {/* OUTCOMES GRID */}
      <section style={{ marginTop: 28 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 16,
                padding: 16,
                background: "#fff",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{f.title}</h3>
              <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.9 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>How it works</h2>
        <ol style={{ lineHeight: 1.9, maxWidth: 980 }}>
          <li>
            <strong>Create the role (minutes):</strong> Generate a role-ready JD from bullet points and
            approve in one place.
          </li>
          <li>
            <strong>Source + ingest candidates:</strong> Publish to the market and self-source via
            LinkedIn.
          </li>
          <li>
            <strong>AI ranks and shortlists:</strong> NLP matching scores every profile against your job
            requirements.
          </li>
          <li>
            <strong>7 Agentic AI bots run the workflow:</strong> Interview scheduling, reminders,
            follow-ups and feedback consolidation.
          </li>
          <li>
            <strong>AI interviews (optional):</strong> Structured screening (MCQ/technical/behavioural)
            to refine shortlists before hiring manager time.
          </li>
          <li>
            <strong>Confident decision:</strong> Explainable recommendations based on experience and
            inherent traits alignment.
          </li>
        </ol>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 28, marginBottom: 10 }}>X0PA vs Bullhorn vs JobAdder — what’s different?</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 900 }}>
          Bullhorn and JobAdder are strong ATS/CRM platforms for tracking candidates and managing
          workflows. AIEnablers (powered by X0PA) is built to <strong>automate the heavy lifting</strong>{" "}
          using Generative + Agentic AI.
        </p>

        <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th style={th}>Capability</th>
                <th style={th}>AIEnablers (X0PA)</th>
                <th style={th}>Bullhorn</th>
                <th style={th}>JobAdder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>AI-native candidate ranking (ML + NLP)</td>
                <td style={td}>✅ Advanced</td>
                <td style={td}>❌</td>
                <td style={td}>❌</td>
              </tr>
              <tr>
                <td style={td}>Generative AI job description creation</td>
                <td style={td}>✅</td>
                <td style={td}>❌</td>
                <td style={td}>❌</td>
              </tr>
              <tr>
                <td style={td}>Agentic workflow automation (bots)</td>
                <td style={td}>✅ 7 AI bots</td>
                <td style={td}>⚠️ Task automation</td>
                <td style={td}>⚠️ Rules/triggers</td>
              </tr>
              <tr>
                <td style={td}>AI interviews / AI-led screening</td>
                <td style={td}>✅</td>
                <td style={td}>❌</td>
                <td style={td}>❌</td>
              </tr>
              <tr>
                <td style={td}>Bias mitigation models</td>
                <td style={td}>✅ Built-in</td>
                <td style={td}>❌</td>
                <td style={td}>❌</td>
              </tr>
              <tr>
                <td style={td}>Best fit</td>
                <td style={td}>TA speed + scale</td>
                <td style={td}>Agency CRM + ATS</td>
                <td style={td}>ATS + job board workflows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section
        id="demo"
        style={{
          marginTop: 64,
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 22,
          background: "#fcfcfc",
        }}
      >
        <h2 style={{ fontSize: 26, margin: "0 0 10px 0" }}>See the product — not slides</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 14px 0", maxWidth: 900 }}>
          We’ll keep it practical and focus on how the platform works end-to-end, using your real roles.
          The comparison pack is there for reference — the demo will be the nuts and bolts.
        </p>

        {/* Replace with your form or /book-demo route */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="/book-demo"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Book a Demo
          </a>
          <a
            href="mailto:royj@aienablers.io?subject=AIEnablers%20Demo%20Request"
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "transparent",
              color: "#111",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Email us
          </a>
        </div>
      </section>

      <footer style={{ marginTop: 40, fontSize: 13, opacity: 0.75 }}>
        © {new Date().getFullYear()} AIEnablers. All rights reserved.
      </footer>
    </main>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 14px",
  borderBottom: "1px solid #eee",
  fontSize: 14,
};

const td: React.CSSProperties = {
  padding: "12px 14px",
  borderBottom: "1px solid #f1f1f1",
  fontSize: 14,
  verticalAlign: "top",
};
