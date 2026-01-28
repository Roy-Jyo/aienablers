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
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17911983430"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17911983430');
            `,
          }}
        />
        {/* End Google tag (gtag.js) */}
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
