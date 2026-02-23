// src/app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AIEnablers",
  description:
    "AIEnablers (DAPAR Technologies Pty Ltd) Privacy Policy — how we collect, use, store, and protect personal information.",
};

export default function PrivacyPage() {
  const lastUpdated = "24 February 2026";

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-medium">AIEnablers</span> (DAPAR Technologies
            Pty Ltd) • Last updated: {lastUpdated}
          </p>
        </header>

        <section className="space-y-8 text-gray-800">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              1. Who we are
            </h2>
            <p className="mt-3 leading-relaxed">
              AIEnablers (“we”, “our”, “us”) is operated by{" "}
              <span className="font-medium">DAPAR Technologies Pty Ltd</span>.
              We provide recruitment and talent acquisition services and related
              technology solutions. This Privacy Policy explains how we collect,
              use, disclose, and protect personal information.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              2. Personal information we collect
            </h2>
            <p className="mt-3 leading-relaxed">
              We may collect personal information including (but not limited to):
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Name, email address, phone number</li>
              <li>Company name, job title, location</li>
              <li>Enquiry details submitted via forms or bookings</li>
              <li>
                Website usage data (e.g., pages viewed, device/browser, approximate
                location) via cookies and similar technologies
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              If you submit candidate information (e.g., CV/resume) through our
              services, we may process that information for recruitment purposes
              in accordance with applicable law and contractual arrangements.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              3. How we collect information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Directly from you (forms, demo bookings, email, phone)</li>
              <li>
                Automatically via our website (cookies, analytics, and similar tools)
              </li>
              <li>
                From trusted third parties where appropriate (e.g., professional platforms
                or business contact databases) in line with their terms and applicable law
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              4. How we use your information
            </h2>
            <p className="mt-3 leading-relaxed">
              We may use personal information to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Respond to enquiries and provide requested information</li>
              <li>Schedule and deliver demos and services</li>
              <li>Provide recruitment and talent acquisition services</li>
              <li>Operate, maintain, and improve our website and services</li>
              <li>Send relevant communications (where permitted by law)</li>
              <li>Meet legal, regulatory, and contractual obligations</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              5. Cookies, analytics, and advertising
            </h2>
            <p className="mt-3 leading-relaxed">
              We may use cookies and similar technologies to understand website usage
              and improve marketing effectiveness. This may include tools such as:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Google Analytics</li>
              <li>Google Tag Manager</li>
              <li>LinkedIn Insight Tag (for advertising measurement)</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              You can manage cookies through your browser settings. Note that disabling
              certain cookies may affect site functionality.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              6. Disclosure to third parties
            </h2>
            <p className="mt-3 leading-relaxed">
              We may disclose personal information to trusted third-party service
              providers who help us operate our business (for example, website hosting,
              analytics, communications, and scheduling tools). We take reasonable steps
              to ensure these providers handle information appropriately.
            </p>
            <p className="mt-4 leading-relaxed">
              We may also disclose information if required by law, regulation, court order,
              or to protect our rights and users.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              7. Overseas disclosures
            </h2>
            <p className="mt-3 leading-relaxed">
              Some of our service providers may store or process information outside Australia.
              Where this occurs, we take reasonable steps to ensure appropriate safeguards
              are in place consistent with applicable privacy requirements.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              8. Security and retention
            </h2>
            <p className="mt-3 leading-relaxed">
              We take reasonable steps to protect personal information from misuse,
              interference, loss, unauthorised access, modification, or disclosure.
              We retain personal information only for as long as needed for legitimate
              business purposes and legal requirements.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              9. Access, correction, and complaints
            </h2>
            <p className="mt-3 leading-relaxed">
              You may request access to, or correction of, personal information we hold
              about you. You can also make a privacy complaint. We will respond within a
              reasonable time.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              10. Contact us
            </h2>
            <p className="mt-3 leading-relaxed">
              <span className="font-medium">DAPAR Technologies Pty Ltd</span>
              <br />
              19 Yarrabung Avenue, Thornleigh NSW 2120
              <br />
              Email:{" "}
              <a
                className="text-blue-700 underline underline-offset-2"
                href="mailto:royj@aienablers.io"
              >
                royj@aienablers.io
              </a>
            </p>
          </div>

          <p className="text-sm text-gray-600">
            This Privacy Policy is provided for general information and does not constitute legal advice.
          </p>
        </section>
      </main>
    </div>
  );
}