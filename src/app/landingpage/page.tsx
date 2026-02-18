"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

/* ------------------ MICRO INTERACTION HOOK ------------------ */

function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------ MINI ROW ------------------ */

function RowMini({
  name,
  tag,
  accent,
}: {
  name: string;
  tag: string;
  accent?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
      <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{name}</div>
      <div
        style={{
          fontSize: 12,
          color: accent ?? "#64748b",
          fontWeight: 700,
          padding: "6px 10px",
          borderRadius: 999,
          background: accent ? "rgba(37,99,235,0.10)" : "rgba(148,163,184,0.12)",
          border: "1px solid rgba(226,232,240,0.8)",
          whiteSpace: "nowrap",
        }}
      >
        {tag}
      </div>
    </div>
  );
}

/* ------------------ MAIN PAGE ------------------ */

export default function LandingPage() {
  useRevealOnScroll();

  const [asideHover, setAsideHover] = useState(false);

  const revealBase: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(10px)",
    transition: "opacity 520ms ease, transform 520ms ease",
  };

  const buttonBase: React.CSSProperties = {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "14px 22px",
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block",
    transform: "translateY(0)",
    transition: "transform 140ms ease, box-shadow 140ms ease",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    width: "fit-content",
  };

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
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 80px 24px" }}>
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
          <div data-reveal style={revealBase}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b", marginBottom: 16 }}>
              AI Enablers RaaS • Powered by X0PA
            </div>

            <h1 style={{ fontSize: 40, fontWeight: 600, marginBottom: 14, letterSpacing: "-0.02em" }}>
              AI-Native Recruitment for TA Teams
            </h1>

            <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.6, marginBottom: 22, maxWidth: 720 }}>
              Powered by <strong>Generative</strong> and <strong>Agentic AI</strong>. Hire in{" "}
              <strong>days</strong> — not months.
            </p>

            {/* Primary CTA only (Book a Demo removed) */}
            <Link
              href="/#demo"
              style={buttonBase}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 10px 24px rgba(37,99,235,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 0 rgba(0,0,0,0)";
              }}
            >
              Get in touch to try it out. It is free!
            </Link>

            {/* Subtle Cost Information (thin blue accent line, VC tone) */}
            <div
              style={{
                borderLeft: "3px solid #2563eb",
                paddingLeft: 18,
                marginTop: 18,
                maxWidth: 580,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>
                Blue-collar role fulfilment from $500*
              </div>

              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 10 }}>
                Specialised and technical roles from $2,000*
              </div>

              <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                Designed to reduce time-to-hire by <strong>50%+</strong> compared to traditional recruitment
                benchmarks.
              </div>

              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>
                *Subject to scope and hiring complexity.
              </div>
            </div>
          </div>

          {/* Minimal Floating Comparison Card */}
          <aside
            data-reveal
            style={{
              ...revealBase,
              background: "rgba(248,250,252,0.85)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: 16,
              padding: 16,
              border: "1px solid rgba(226,232,240,0.75)",
              boxShadow: asideHover
                ? "0 14px 40px rgba(15, 23, 42, 0.12)"
                : "0 10px 30px rgba(15, 23, 42, 0.06)",
              transform: asideHover ? "translateY(-2px)" : "translateY(10px)",
              transition:
                "opacity 520ms ease, transform 520ms ease, box-shadow 160ms ease, background 160ms ease",
            }}
            onMouseEnter={() => setAsideHover(true)}
            onMouseLeave={() => setAsideHover(false)}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: 10,
              }}
            >
              At a glance
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <RowMini name="AIEnablers" tag="AI-native" accent="#2563eb" />
              <RowMini name="Bullhorn" tag="CRM + ATS" />
              <RowMini name="JobAdder" tag="ATS + workflow" />
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: "#94a3b8", lineHeight: 1.4 }}>
              Minimal view — details below.
            </div>
          </aside>
        </section>

        {/* WHY ATS SECTION */}
        <section data-reveal style={{ ...revealBase, marginBottom: 90 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>
            Why Traditional ATS Platforms Fall Short
          </h2>

          <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
            AIEnablers (Powered by X0PA) automates the heavy lifting.{" "}
            <Link href="#comparison" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
              Find out how →
            </Link>
          </p>
        </section>

        {/* TABULAR COMPARISON */}
        <section id="comparison" data-reveal style={{ ...revealBase, marginBottom: 90 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 24 }}>Platform Comparison</h2>

          <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid rgba(226,232,240,0.7)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 860 }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", textAlign: "left" }}>
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

          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 12, lineHeight: 1.4 }}>
            Note: Summary reflects typical positioning; capabilities may vary by configuration and add-ons.
          </div>
        </section>

        {/* CTA */}
        <section
          data-reveal
          style={{
            ...revealBase,
            backgroundColor: "#f8fafc",
            padding: 40,
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 14 }}>See the product. Not slides.</h2>

          <p style={{ color: "#475569", marginBottom: 22 }}>
            Experience AI-driven recruitment using your own live role — complimentary.
          </p>

          <Link
            href="/#demo"
            style={{
              ...buttonBase,
              margin: "0 auto",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 10px 24px rgba(37,99,235,0.22)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 0 rgba(0,0,0,0)";
            }}
          >
            Get in touch to try it out. It is free!
          </Link>
        </section>

        <footer style={{ marginTop: 80, fontSize: 13, color: "#94a3b8", textAlign: "center" }}>
          © {new Date().getFullYear()} AIEnablers
        </footer>
      </div>
    </div>
  );
}
