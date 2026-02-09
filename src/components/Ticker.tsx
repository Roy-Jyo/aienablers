import Link from 'next/link';

export default function Ticker() {
  return (
    <div className="w-full bg-blue-600 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 overflow-hidden">
        <div className="ticker-track">
          <span className="font-semibold">Fill a role from as low as $250.</span>
          <span className="opacity-70">•</span>
          <Link
            href="https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions"
            className="underline underline-offset-4 hover:text-blue-100 transition"
            target="_blank"
            rel="noreferrer"
          >
            Press release: AIEnablers &amp; X0PA AI partnership announcement.
          </Link>
          <span className="opacity-70">•</span>
          <span className="font-semibold">Fill a role from as low as $250.</span>
          <span className="opacity-70">•</span>
          <Link
            href="https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions"
            className="underline underline-offset-4 hover:text-blue-100 transition"
            target="_blank"
            rel="noreferrer"
          >
            Press release: AIEnablers &amp; X0PA AI partnership announcement.
          </Link>
        </div>
      </div>
    </div>
  );
}
