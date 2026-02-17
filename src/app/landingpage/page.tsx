import Link from "next/link";
import styles from "./landingpage.module.css";

export default function LandingPage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={`${styles.container} ${styles.hero}`}>
        <div className={styles.kicker}>
          <span className={styles.badge}>AI Enablers RaaS</span>
          <span className={styles.sep}>•</span>
          <span className={styles.badgeAlt}>Powered by X0PA</span>
        </div>

        <h1 className={styles.h1}>AI-Native Recruitment for TA Teams</h1>

        <p className={styles.sub}>
          Powered by <strong>Generative</strong> and <strong>Agentic AI</strong>. Hire in{" "}
          <strong>days</strong> — not months.
        </p>

        <div className={styles.actions}>
          {/* Redirect to homepage demo section */}
          <Link href="/#demo" className={styles.primary}>
            Book a Demo
          </Link>

          <Link href="/#demo" className={styles.accent}>
            Get in touch to try it out. It is free!
          </Link>

          <a href="#value" className={styles.secondary}>
            Why we’re different
          </a>
        </div>

        <div className={styles.trust}>
          <span>Enterprise-grade security</span>
          <span className={styles.sep}>•</span>
          <span>Ethical AI</span>
          <span className={styles.sep}>•</span>
          <span>PII safeguards</span>
          <span className={styles.sep}>•</span>
          <span>ISO-aligned controls</span>
        </div>
      </section>

      {/* VALUE */}
      <section className={styles.section} id="value">
        <div className={`${styles.sectionInner} ${styles.narrow}`}>
          <h2 className={styles.h2}>Why Traditional ATS Platforms Fall Short</h2>
          <p className={styles.p}>
            Bullhorn and JobAdder are strong ATS systems — but they still rely heavily on manual
            workflows for screening, scheduling and feedback collection.
          </p>
          <p className={styles.p}>
            AIEnablers (powered by X0PA) automates the heavy lifting — from ranking candidates to
            coordinating interviews — so your team can focus on hiring decisions.
          </p>
        </div>

        <div className={styles.sectionInner}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.h3}>Speed</h3>
              <p className={styles.small}>Shortlists generated in days using ML-based ranking.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.h3}>Automation</h3>
              <p className={styles.small}>AI agents coordinate interviews, follow-ups and feedback.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.h3}>AI Interviews</h3>
              <p className={styles.small}>Structured screening before hiring manager time is spent.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.h3}>Ethical AI</h3>
              <p className={styles.small}>Bias mitigation with enterprise-grade data security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.ctaBox}>
            <h2 className={styles.h2}>See the product. Not slides.</h2>
            <p className={styles.p}>
              Experience AI-driven recruitment using your own live role — complimentary.
            </p>
            <div className={styles.actions}>
              <Link href="/#demo" className={styles.accent}>
                Get in touch to try it out. It is free!
              </Link>
              <Link href="/" className={styles.secondary}>
                Go to www.aienablers.io
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} AIEnablers. All rights reserved.
      </footer>
    </main>
  );
}
