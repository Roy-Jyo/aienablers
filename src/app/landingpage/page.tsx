import Link from "next/link";
import { useState } from "react";

/* ------------------ TABLE STYLES ------------------ */

const thStyle: React.CSSProperties = {
  padding: "14px 18px",
  fontWeight: 600,
  color: "#0f172a",
  fontSize: 13,
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "14px 18px",
  color: "#475569",
  lineHeight: 1.6,
  verticalAlign: "top",
};

const tdFeature: React.CSSProperties = {
  padding: "14px 18px",
  fontWeight: 600,
  color: "#0f172a",
  width: "28%",
  minWidth: 220,
  verticalAlign: "top",
};

const tdHighlight: React.CSSProperties = {
  padding: "14px 18px",
  fontWeight: 600,
  color: "#2563eb",
  verticalAlign: "top",
};

const rowDivider: React.CSSProperties = {
  borderTop: "1px solid rgba(226,232,240,0.7)",
};

/* ------------------ HOVER EXPAND COMPONENT ------------------ */

function HoverExpandText({
  preview,
  full,
}: {
  preview: string;
  full: string;
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        maxWidth: 760,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <p
        style={{
          fontSize: 15,
          color: "#334155",
          lineHeight: 1.7,
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as any,
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {preview}
      </p>

      {isHovering && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "calc(100% + 10px)",
            width: "min(760px, 92vw)",
            background: "#ffffff",
            border: "1px solid rgba(226,232,240,0.9)",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 14px 38px rgba(15, 23, 42, 0.12)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#94a3b8",
              marginBottom: 8,
            }}
          >
            More detail
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.7,
              color: "#334155",
            }}
          >
            {full}
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------ MAIN PAGE ------------------ */

export default function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#0f172a",
        minHeight: "100vh",
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
          }}
        >
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
                lineHeight: 1.6,
                marginBottom: 26,
              }}
            >
              Powered by <strong>Generative</strong> and{" "}
              <strong>Agentic AI</strong>. Hire in{" "}
              <strong>days</strong> — not months.
            </p>

            <div style={{ display: "flex", gap: 14 }}>
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
          </div>

          {/* Floating Comparison Card */}
          <aside
            style={{
              background: "#f8fafc",
              borderRadius: 16,
              padding: 18,
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
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

            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <strong style={{ color: "#2563eb" }}>AIEnablers</strong>: AI-native
              ranking, agentic automation, AI interviews.
            </div>

            <div style={{ fontSize: 13, color: "#475569", marginTop: 8 }}>
              <strong>Bullhorn</strong>: CRM + ATS workflow.
            </div>

            <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
              <strong>JobAdder</strong>: ATS + rules automation.
            </div>
          </aside>
        </section>

        {/* WHY ATS SECTION */}
        <section style={{ marginBottom: 90 }}>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Why Traditional ATS Platforms Fall Short
          </h2>

          <HoverExpandText
            preview="Bullhorn and JobAdder are strong ATS systems — but they rely heavily on manual workflows for screening and coordination. AIEnablers automates the heavy lifting."
            full="Bullhorn and JobAdder are strong ATS systems — but they often rely on manual workflows for screening, scheduling, candidate follow-ups and feedback consolidation. AIEnablers (powered by X0PA) is AI-native: ML + NLP ranking accelerates shortlisting, agentic AI bots automate coordination, and AI interviews reduce hiring manager effort while supporting fairness and governance."
          />
        </section>

        {/* TABULAR COMPARISON */}
        <section style={{ marginBottom: 90 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 24 }}>
            Platform Comparison
          </h2>

          <div
            style={{
              overflowX: "auto",
              borderRadius: 14,
              border: "1px solid rgba(226,232,240,0.7)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  <th style={thStyle}></th>
                  <th style={thStyle}>AIEnablers</th>
                  <th style={thStyle}>Bullhorn</th>
                  <th style={thStyle}>JobAdder</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdFeature}>AI Ranking</td>
                  <td style={tdHighlight}>ML + NLP scoring</td>
                  <td style={td}>Manual filtering</td>
                  <td style={td}>Keyword filters</td>
                </tr>
                <tr style={rowDivider}>
                  <td style={tdFeature}>Workflow</td>
                  <td style={tdHighlight}>7 agentic AI bots</td>
                  <td style={td}>Task automation</td>
                  <td style={td}>Rules/triggers</td>
                </tr>
                <tr style={rowDivider}>
                  <td style={tdFeature}>AI Interviews</td>
                  <td style={tdHighlight}>Built-in</td>
                  <td style={td}>Not native</td>
                  <td style={td}>Not native</td>
                </tr>
                <tr style={rowDivider}>
                  <td style={tdFeature}>Bias Mitigation</td>
                  <td style={tdHighlight}>Integrated models</td>
                  <td style={td}>Process-based</td>
                  <td style={td}>Process-based</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            backgroundColor: "#f8fafc",
            padding: 40,
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 14 }}>
            See the product. Not slides.
          </h2>

          <Link
            href="/#demo"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "14px 22px",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Get in touch to try it out. It is free!
          </Link>
        </section>

        <footer
          style={{
            marginTop: 80,
            fontSize: 13,
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} AIEnablers
        </footer>
      </div>
    </div>
  );
}
