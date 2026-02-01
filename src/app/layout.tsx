import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'AI Enablers RaaS | AI-Enabled Recruitment',
  description:
    'Revolutionising recruitment with AI automation and data-driven insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MKW78ZBX');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>

      <body className="bg-gray-50 text-gray-900 font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MKW78ZBX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <div className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">
              Announcement
            </span>
            <div className="relative flex-1 overflow-hidden">
              <div className="ticker-track flex w-max items-center gap-8">
                {[
                  {
                    label: "Press release: AIEnablers + X0PA partnership",
                    href: "https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions",
                  },
                  { label: "Fill open roles faster from $500" },
                  { label: "Calculate cost savings", href: "/cost-saving" },
                ]
                  .concat([
                    {
                      label: "Press release: AIEnablers + X0PA partnership",
                      href: "https://www.einpresswire.com/article/865201131/aienablers-and-x0pa-ai-partner-to-transform-recruitment-across-oceania-with-ai-solutions",
                    },
                    { label: "Fill open roles faster from $500" },
                    { label: "Calculate cost savings", href: "/cost-saving" },
                  ])
                  .map((item, index) => {
                    const content = item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-blue-600 focus:outline-none focus-visible:underline"
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    );

                    return (
                      <span key={`${item.label}-${index}`} className="ticker-item flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {content}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <Navbar />
        <main>{children}</main>
        <footer className="py-8 text-center text-sm text-gray-500 bg-gray-100 mt-16">
          © {new Date().getFullYear()}{' '}
          <span className="font-medium text-gray-600">
            DAPAR Technologies, AIEnablers RaaS.
          </span>{' '}
          All rights reserved.
        </footer>
      </body>
    </html>
  );
}
