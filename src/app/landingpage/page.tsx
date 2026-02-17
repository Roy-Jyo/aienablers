// app/landingpage/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing">
      <section className="hero">
        <div className="container">
          <h1>
            AI-Native Recruitment
          </h1>

          <p className="subtitle">
            Powered by Generative and Agentic AI.  
            Hire in days — not months.
          </p>

          <div className="cta">
            <Link href="/#demo" className="primary">
              Get in touch to try it out. It is free!
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2>Why Traditional ATS Platforms Fall Short</h2>
          <p>
            Bullhorn and JobAdder are strong ATS systems.  
            But they rely heavily on manual workflows.
          </p>
          <p>
            AIEnablers, powered by X0PA, automates the heavy lifting —
            from ranking candidates to scheduling interviews.
          </p>
        </div>
      </section>

      <section className="section light">
        <div className="container grid">
          <div>
            <h3>Speed</h3>
            <p>Shortlists generated in days using ML-based ranking.</p>
          </div>

          <div>
            <h3>Automation</h3>
            <p>7 AI agents coordinate interviews, follow-ups and feedback.</p>
          </div>

          <div>
            <h3>AI Interviews</h3>
            <p>Structured AI screening before hiring manager time is spent.</p>
          </div>

          <div>
            <h3>Ethical AI</h3>
            <p>Bias mitigation models with enterprise-grade data security.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow center">
          <h2>See the Product. Not Slides.</h2>
          <p>
            Experience AI-driven recruitment using your own live role.
          </p>

          <Link href="/#demo" className="primary large">
            Book a Complimentary Demo
          </Link>
        </div>
      </section>
    </main>
  );
}
