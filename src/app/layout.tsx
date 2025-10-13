// src/app/layout.tsx
import "./../styles/globals.css"; // one level up into styles
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment as a Service",
  description: "AI-powered job multi-posting, NLP CV ranking, and AI interviews",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
