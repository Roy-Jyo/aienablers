import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#0f172a",
        minHeight: "100vh",
        width: "100%",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "100px 24px 80px 24px",
        }}
      >
        {/* HERO */}
        <section style={{ marginBottom: 100 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#64748b",
              marginBottom: 16,
            }}
          >
            AI Enablers RaaS • Powered by X0PA
          </div>

          <h1
            style={{
              fontSize: 40,
              lineHeight: 1.2,
              fontWeight: 600,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            AI-Native Recruitment for TA Teams
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#475569",
              maxWidth: 700,
              lineHeight: 1.6,
              marginBottom: 30,
            }}
          >
            Powered by <strong>Generative</strong> and{" "}
            <strong>Agentic AI</strong>.  
            Hire in <strong>days</strong> — not months.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="/#demo"
              style={{
                backgroundColor: "#0f172a",
                color: "#ffffff",
                padding: "14px 20px",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Book a Demo
            </Link>

            <Link
              href="/#demo"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "14px 20px",
                borderRadius: 8,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Get in touch to try it out. It is free!
            </Link>
          </div>
        </section>

        {/* VALUE SECTION */}
        <section style={{ marginBottom: 100 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Why Traditional ATS Platforms Fall Short
          </h2>

          <p
            style={{
              fontSize: 16,
              color: "#334155",
              maxWidth: 750,
              lineHeight: 1.7,
              marginBottom: 12,
            }}
          >
            Bullhorn and JobAdder are strong ATS systems — but they rely
            heavily on manual workflows for screening, scheduling and feedback.
          </p>

          <p
            style={{
              fontSize: 16,
              color: "#334155",
              maxWidth: 750,
              lineHeight: 1.7,
            }}
          >
            AIEnablers (powered by X0PA) automates the heavy lifting — from
            ranking candidates to coordinating interviews — so your team can
            focus on hiring decisions.
          </p>
        </section>

        {/* FEATURES GRID */}
        <section style={{ marginBottom: 100 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 40,
            }}
          >
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>Speed</h3>
              <p style={{ color: "#475569", lineHeight: 1.6 }}>
                Shortlists generated in days using ML-based ranking.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>Automation</h3>
              <p style={{ color: "#475569", lineHeight: 1.6 }}>
                AI agents coordinate interviews, follow-ups and feedback.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>AI Interviews</h3>
              <p style={{ color: "#475569", lineHeight: 1.6 }}>
                Structured AI screening before hiring manager time is spent.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>Ethical AI</h3>
              <p style={{ color: "#475569", lineHeight: 1.6 }}>
                Bias mitigation with enterprise-grade data security.
              </p>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          style={{
            backgroundColor: "#f8fafc",
            padding: 40,
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 26,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            See the product. Not slides.
          </h2>

          <p
            style={{
              color: "#475569",
              marginBottom: 24,
            }}
          >
            Experience AI-driven recruitment using your own live role —
            complimentary.
          </p>

          <Link
            href="/#demo"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "14px 22px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Get in touch to try it out. It is free!
          </Link>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 80,
            fontSize: 13,
            color: "#64748b",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} AIEnablers. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
