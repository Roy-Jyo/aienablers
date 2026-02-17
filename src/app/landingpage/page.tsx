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
        <section
          style={{
            marginBottom: 90,
            display: "grid",
            gridTemplateColumns: "1.35fr 0.65fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* Left: main message */}
          <div>
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
                marginBottom: 18,
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
                marginBottom: 26,
              }}
            >
              Powered by <strong>Generative</strong> and <strong>Agentic AI</strong>. Hire in{" "}
              <strong>days</strong> — not months.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                href="/#demo"
                style={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  padding: "14px 20px",
                  borderRadius: 10,
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
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Get in touch to try it out. It is free!
              </Link>
            </div>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                fontSize: 13,
                color: "#94a3b8",
              }}
            >
              <span>Enterprise-grade security</span>
              <span>•</span>
              <span>Ethical AI</span>
              <span>•</span>
              <span>PII safeguards</span>
              <span>•</span>
              <span>ISO-aligned controls</span>
            </div>
          </div>

          {/* Right: floating comparison (subtle) */}
          <aside
            style={{
              position: "relative",
              background: "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
              borderRadius: 16,
              padding: 18,
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              border: "1px solid rgba(226,232,240,0.7)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: 12,
              }}
            >
              Quick comparison
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {/* X0PA */}
              <div style={{ display: "grid", gap: 4 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 700 }}>
                    AIEnablers (X0PA)
                  </div>
                  <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 700 }}>
                    AI-native
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
                  ML + NLP ranking, agentic workflow automation, optional AI interviews.
                </div>
              </div>

              <div
                style={{
                  height: 1,
                  background: "rgba(226,232,240,0.9)",
                  margin: "4px 0",
                }}
              />

              {/* Bullhorn */}
              <div style={{ display: "grid", gap: 4 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>
                    Bullhorn
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>
                    CRM + ATS
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
                  Strong recruiter CRM and pipeline management; typically task-based automation.
                </div>
              </div>

              <div
                style={{
                  height: 1,
                  background: "rgba(226,232,240,0.9)",
                  margin: "4px 0",
                }}
              />

              {/* JobAdder */}
              <div style={{ display: "grid", gap: 4 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>
                    JobAdder
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>
                    ATS + workflow
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
                  Flexible ATS and job board workflows; typically rules/triggers vs agentic AI.
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                fontSize: 12,
                color: "#94a3b8",
                lineHeight: 1.4,
              }}
            >
              Designed to be subtle: a quick “at a glance” view for stakeholders.
            </div>
          </aside>
        </section>

        {/* VALUE SECTION */}
        <section style={{ marginBottom: 90 }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 18 }}>
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
            Bullhorn and JobAdder are strong ATS systems — but they rely heavily on manual workflows for
            screening, scheduling and feedback.
          </p>

          <p
            style={{
              fontSize: 16,
              color: "#334155",
              maxWidth: 750,
              lineHeight: 1.7,
            }}
          >
            AIEnablers (powered by X0PA) automates the heavy lifting — from ranking candidates to coordinating
            interviews — so your team can focus on hiring decisions.
          </p>
        </section>

        {/* FEATURES GRID */}
        <section style={{ marginBottom: 90 }}>
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
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 14 }}>
            See the product. Not slides.
          </h2>

          <p style={{ color: "#475569", marginBottom: 22 }}>
            Experience AI-driven recruitment using your own live role — complimentary.
          </p>

          <Link
            href="/#demo"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "14px 22px",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
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
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} AIEnablers. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
