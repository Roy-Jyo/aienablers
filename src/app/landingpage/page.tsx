// app/x0pa-vs-bullhorn-jobadder/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

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
    desc: "PII safeguards, strong governance controls, and enterprise-grade security posture (ISO-aligned).",
  },
  {
    title: "Lower Cost per Hire",
    desc: "Reduce admin overhead and improve TA productivity — at a fraction of traditional recruitment cost.",
  },
];

export default function Page() {
  return (
    <main style={styles.main}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.badgeRow}>
          <span style={styles.badge}>AIEnablers RaaS</span>
          <span style={styles.dot}>•</span>
          <span style={styles.badgeMuted}>Powered by X0PA</span>
        </div>

        <h1 style={styles.h1}>
          AI-Native Recruiting for TA Teams — Faster Shortlists. Better Hires. Lower Cost.
        </h1>

        <p style={styles.lead}>
          Compare <strong>X0PA</strong> with <strong>Bullhorn</strong> and{" "}
          <strong>JobAdder</strong>. AIEnablers uses <strong>Generative AI</strong> +{" "}
          <strong>Agentic AI</strong> to automate screening, scheduling, and first-round evaluation — so
          your team hires in <strong>days</strong>, not weeks.
        </p>

        <div style={styles.ctaRow}>
          <a href="#demo" style={styles.primaryBtn}>
            Book a Demo
          </a>
          <a href="#how" style={styles.secondaryBtn}>
            See How It Works
          </a>

          {/* Transition back to www.aienablers.io (homepage) */}
          <Link href="/#demo" style={styles.accentBtn}>
            Get in touch to try it out. It is free!
          </Link>
        </div>

        <div style={styles.trustRow}>
          <span>Enterprise-grade security</span>
          <span style={styles.sep}>•</span>
          <span>Ethical AI</span>
          <span style={styles.sep}>•</span>
          <span>PII safeguards</span>
          <span style={styles.sep}>•</span>
          <span>ISO-aligned controls</span>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Manual recruiting doesn’t scale. Hiring demand did.</h2>
        <p style={styles.p}>
          Most TA teams lose time in repetitive work — CV screening, scheduling, follow-ups and feedback
          chasing — creating slow time-to-hire, inconsistent shortlists and rising cost-per-hire.
        </p>

        <ul style={styles.ul}>
          <li>CV screening and ranking</li>
          <li>Interview scheduling and coordination</li>
          <li>Candidate follow-ups and comms</li>
          <li>Feedback consolidation across panels</li>
          <li>Inconsistent shortlisting and hidden bias risks</li>
        </ul>
      </section>

      {/* SOLUTION */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Meet AIEnablers RaaS — powered by X0PA</h2>
        <p style={styles.p}>
          This is not “just another ATS” or “just another CRM.” It’s an AI-native recruitment approach
          that automates the heavy lifting end-to-end, while keeping your recruiters in control of the
          final decision.
        </p>
      </section>

      {/* OUTCOMES GRID */}
      <section style={{ ...styles.section, marginTop: 18 }}>
        <div style={styles.grid}>
          {features.map((f) => (
            <div key={f.title} style={styles.card}>
              <h3 style={styles.h3}>{f.title}</h3>
              <p style={styles.cardP}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={styles.section}>
        <h2 style={styles.h2}>How it works</h2>
        <ol style={styles.ol}>
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
      <section style={styles.section}>
        <h2 style={styles.h2}>X0PA vs Bullhorn vs JobAdder — what’s different?</h2>
        <p style={styles.p}>
          Bullhorn and JobAdder are strong ATS/CRM platforms for tracking candidates and managing
          workflows. AIEnablers (powered by X0PA) is built to{" "}
          <strong>automate the heavy lifting</strong> using Generative + Agentic AI.
        </p>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Capability</th>
                <th style={styles.th}>AIEnablers (X0PA)</th>
                <th style={styles.th}>Bullhorn</th>
                <th style={styles.th}>JobAdder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>AI-native candidate ranking (ML + NLP)</td>
                <td style={styles.td}>✅ Advanced</td>
                <td style={styles.td}>❌</td>
                <td style={styles.td}>❌</td>
              </tr>
              <tr>
                <td style={styles.td}>Generative AI job description creation</td>
                <td style={styles.td}>✅</td>
                <td style={styles.td}>❌</td>
                <td style={styles.td}>❌</td>
              </tr>
              <tr>
                <td style={styles.td}>Agentic workflow automation (bots)</td>
                <td style={styles.td}>✅ 7 AI bots</td>
                <td style={styles.td}>⚠️ Task automation</td>
                <td style={styles.td}>⚠️ Rules/triggers</td>
              </tr>
              <tr>
                <td style={styles.td}>AI interviews / AI-led screening</td>
                <td style={styles.td}>✅</td>
                <td style={styles.td}>❌</td>
                <td style={styles.td}>❌</td>
              </tr>
              <tr>
                <td style={styles.td}>Bias mitigation models</td>
                <td style={styles.td}>✅ Built-in</td>
                <td style={styles.td}>❌</td>
                <td style={styles.td}>❌</td>
              </tr>
              <tr>
                <td style={styles.td}>Best fit</td>
                <td style={styles.td}>TA speed + scale</td>
                <td style={styles.td}>Agency CRM + ATS</td>
                <td style={styles.td}>ATS + job board workflows</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 12, fontSize: 13, opacity: 0.75 }}>
          Note: Bullhorn and JobAdder capabilities can vary by configuration and add-ons. This page
          highlights typical positioning and core platform strengths.
        </div>
      </section>

      {/* CTA */}
      <section id="demo" style={styles.ctaBox}>
        <h2 style={{ ...styles.h2, marginTop: 0 }}>Try AIEnablers on a Live Role — Complimentary</h2>
        <p style={{ ...styles.p, marginBottom: 14 }}>
          See the platform in action with your own role. No commitment. No obligation. Just real
          results.
        </p>

        <div style={styles.ctaRow}>
          <Link href="/#demo" style={styles.primaryBtn}>
            Get in touch to try it out. It is free!
          </Link>
          <a
            href="mailto:royj@aienablers.io?subject=AIEnablers%20Demo%20Request"
            style={styles.secondaryBtn}
          >
            Email us
          </a>
          <Link href="/" style={styles.ghostLink}>
            Go to www.aienablers.io
          </Link>
        </div>
      </section>

      <footer style={styles.footer}>© {new Date().getFullYear()} AIEnablers. All rights reserved.</footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    //maxWidth: 1120,
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 20px",
    background: "#ffffff",
    minHeight: "100vh",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    color: "#111",
  },
  hero: {
    display: "grid",
    gap: 16,
    paddingBottom: 26,
    borderBottom: "1px solid #eee",
  },
  badgeRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  badge: {
    fontSize: 13,
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
  },
  badgeMuted: {
    fontSize: 13,
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: "#fff",
    color: "#111",
  },
  dot: { opacity: 0.6 },
  h1: { fontSize: 36, lineHeight: 1.12, margin: 0 },
  h2: { fontSize: 28, margin: "0 0 10px 0" },
  h3: { margin: "0 0 8px 0", fontSize: 16 },
  //lead: { fontSize: 18, lineHeight: 1.65, margin: 0, maxWidth: 900 },
  lead: { fontSize: 18, lineHeight: 1.65, margin: 0, maxWidth: 720 },
  p: { fontSize: 16, lineHeight: 1.75, margin: 0, maxWidth: 720 },
  ul: { lineHeight: 1.9, marginTop: 12 },
  ol: { lineHeight: 1.9, maxWidth: 720, marginTop: 10 },
  section: { marginTop: 80 },
  ctaRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10, alignItems: "center" },
  primaryBtn: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block",
  },
  secondaryBtn: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "transparent",
    color: "#111",
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block",
  },
  accentBtn: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #0a66c2",
    background: "#0a66c2",
    color: "#fff",
    fontWeight: 800,
    textDecoration: "none",
    display: "inline-block",
  },
  ghostLink: {
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    borderBottom: "1px solid transparent",
    color: "#111",
    padding: "6px 2px",
  },
  trustRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4, fontSize: 14, opacity: 0.85 },
  sep: { opacity: 0.5 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
  },
  card: {
    border: "1px solid #e6e6e6",
    borderRadius: 16,
    padding: 16,
    background: "#fff",
  },
  cardP: { margin: 0, lineHeight: 1.6, opacity: 0.9 },
  tableWrap: { overflowX: "auto", border: "1px solid #eee", borderRadius: 16, marginTop: 10 },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 760 },
  th: {
    textAlign: "left",
    padding: "12px 14px",
    borderBottom: "1px solid #eee",
    background: "#fafafa",
    fontSize: 14,
  },
  td: {
    padding: "12px 14px",
    borderBottom: "1px solid #f1f1f1",
    fontSize: 14,
    verticalAlign: "top",
  },
  ctaBox: {
    marginTop: 64,
    border: "1px solid #eee",
    borderRadius: 18,
    padding: 22,
    background: "#fcfcfc",
  },
  footer: { marginTop: 40, fontSize: 13, opacity: 0.75 },
};
