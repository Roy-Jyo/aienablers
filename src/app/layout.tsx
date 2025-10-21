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
      <body className="bg-gray-50 text-gray-900 font-sans">
        <Navbar />
        <main>{children}</main>
        <footer className="py-8 text-center text-sm text-gray-500 bg-gray-100 mt-16">
          © {new Date().getFullYear()} <span className="font-medium text-gray-600">DAPAR Technologies, AIEnablers RaaS.</span> All rights reserved.
        </footer>
      </body>
    </html>
  );
}
