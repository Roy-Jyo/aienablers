// /src/app/contact/page.tsx
export default function ContactCard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-800 text-white px-6 py-12">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-white/20">
        <img
          src="/contact/jyotirmoy-roy-card.png"
          alt="Jyotirmoy Roy"
          className="rounded-full w-36 h-36 mx-auto mb-6 object-cover border-4 border-white/30"
        />
        <h1 className="text-3xl font-bold">Jyotirmoy Roy</h1>
        <p className="text-lg mt-1 text-indigo-100">
          Client Success Manager | Co-Founder, AIEnablers.io
        </p>

        <p className="mt-6 text-sm text-indigo-50 italic">
          “AI-Driven Recruitment Made Human.”
        </p>

        <div className="flex flex-col mt-8 space-y-3">
          <a
            href="mailto:j.roy@aienablers.io"
            className="bg-white/20 hover:bg-white/30 py-3 rounded-lg transition"
          >
            📧 Email: j.roy@aienablers.io
          </a>
          <a
            href="tel:+61401701003"
            className="bg-white/20 hover:bg-white/30 py-3 rounded-lg transition"
          >
            📱 Call: +61 401 701 003
          </a>
          <a
            href="https://linkedin.com/in/royjyotirmoy"
            target="_blank"
            className="bg-white/20 hover:bg-white/30 py-3 rounded-lg transition"
          >
            🔗 LinkedIn: linkedin.com/in/royjyotirmoy
          </a>
          <a
            href="/contact/jyotirmoy-roy.vcf"
            className="bg-white/20 hover:bg-white/30 py-3 rounded-lg transition"
          >
            📇 Save Contact (vCard)
          </a>
        </div>

        <div className="mt-8">
          <img
            src="/contact/aienablers-logo.png"
            alt="AIEnablers.io Logo"
            className="w-32 mx-auto opacity-80"
          />
        </div>
      </div>

      <footer className="mt-6 text-sm text-indigo-100">
        © {new Date().getFullYear()} AIEnablers.io | Designed by Jyotirmoy Roy
      </footer>
    </main>
  );
}
