"use client";

import React, { useState } from "react";
import { actionSendDemo } from "../actions/sendDemo"; // ✅ correct relative path

React.useEffect(() => {
  if (typeof window !== "undefined") {
    document.documentElement.style.scrollBehavior = "smooth";
  }
}, []);

export default function DemoPage() {
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "error">("idle");
  const siteName = process.env.SITE_NAME || "Recruitment as a Service";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");

    try {
      const formData = new FormData(e.currentTarget);
      const res = await actionSendDemo(formData); // ✅ calls server action
      if (res?.ok) setStatus("ok");
      else setStatus("error");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              AI-powered Recruitment as a Service (RaaS)
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Fill roles faster with one touch posting to multiple job sites, Resume screening using AI Natural Language Processing & AI interviews
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Automate job posting, shortlist the right talent with natural-language scoring,
              and coordinate interviews without need of human interaction. Our AI assistants handle the
              heavy lifting so your team focuses on critical success factor for your business with the right hire.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#demo"
                className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Request a demo
              </a>
              <a
                href="#how"
                className="rounded-2xl border px-6 py-3 font-medium hover:bg-slate-50"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-md rounded-3xl border bg-white p-6 shadow-xl">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "Time-to-fill", v: "↓ 35%" },
                  { k: "Recruiter hours", v: "↓ 40%" },
                  { k: "Cost per hire", v: "↓ 30%" },
                ].map((m) => (
                  <div key={m.k} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-2xl font-semibold">{m.v}</div>
                    <div className="mt-1 text-xs text-slate-500">{m.k}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Typical savings from automation benchmarks (ANZ average).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="demo" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Book a demo</h2>
            <p className="mt-2 text-slate-600">
              Tell us about your role(s) and we’ll show you how {siteName} reduces
              time-to-hire and cost per hire.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm font-medium">Company</label>
                <input
                  name="company"
                  required
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium">Your name</label>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    name="phone"
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Role(s) you’re hiring</label>
                  <input
                    name="roles"
                    placeholder="e.g., Delivery Lead, Data Engineer"
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Headcount, timelines, locations, constraints…"
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                disabled={status === "pending"}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white shadow hover:bg-blue-700 disabled:opacity-50"
              >
                {status === "pending" ? "Sending…" : "Request demo"}
              </button>

              {status === "ok" && (
                <p className="text-sm text-green-600">
                  Thanks! We’ve received your request and will be in touch.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Sorry, something went wrong sending your request. Please try again or email us.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
        <section id="how" className="mx-auto max-w-7xl px-6 py-16 bg-slate-50">
        <h2 className="text-2xl font-semibold text-center">How It Works</h2>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
            Our Recruitment-as-a-Service (RaaS) platform automates every step — from job posting to AI-driven
            interviews — helping you reduce time-to-hire and recruiter effort dramatically.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">1. Post Everywhere</h3>
            <p className="text-slate-600 text-sm">
                Publish your job once and let AI distribute it across multiple job boards automatically.
            </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">2. Smart Screening</h3>
            <p className="text-slate-600 text-sm">
                Our NLP engine reads and ranks CVs instantly, filtering only the best matches to your inbox.
            </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">3. AI Interviews</h3>
            <p className="text-slate-600 text-sm">
                Schedule or conduct AI-driven interviews automatically — saving your team hours per role.
            </p>
            </div>
        </div>
        </section>

      {/* FOOTER */}
      <footer className="border-t bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-500">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
