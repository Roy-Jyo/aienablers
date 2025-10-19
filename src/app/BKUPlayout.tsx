// src/app/layout.tsx
import "./../styles/globals.css"; // one level up into styles
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment as a Service",
  description: "AI-powered job multi-posting, NLP CV ranking, and AI interviews",
};



/* old code
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} */


  export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        {/* Navigation Bar */}
        <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AIEnablers.io
            </Link>
            <div className="flex space-x-6">
              <Link href="/submit-cv" className="hover:text-blue-600 font-medium">
                Submit CV
              </Link>
              <Link href="/cost-saving" className="hover:text-blue-600 font-medium">
                Calculate Cost Saving
              </Link>
              <Link href="/knowledge" className="hover:text-blue-600 font-medium">
                Knowledge
              </Link> 
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="py-8 text-center text-sm text-gray-500 bg-gray-100 mt-16">
          © {new Date().getFullYear()} Aienablers RaaS. All rights reserved.
        </footer>
      </body>
    </html>
  );
}