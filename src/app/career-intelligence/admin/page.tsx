"use client";

import { FormEvent, useState } from "react";
import { Activity, Building2, CheckCircle2, Database, Loader2, LockKeyhole, Plus, RefreshCw, XCircle } from "lucide-react";

type Feed = {
  id?: string;
  company: string;
  industry?: string;
  type: "greenhouse" | "lever" | "ashby" | "smartrecruiters";
  identifier: string;
  enabled?: boolean;
  diagnostic: { status: "ok" | "error"; httpStatus: number; jobs: number; message?: string };
};

export default function CareerIntelligenceAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [storage, setStorage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ company: "", industry: "hospitality", type: "greenhouse", identifier: "" });

  async function loadFeeds() {
    setStatus("loading");
    setMessage("");
    const response = await fetch("/api/career-intelligence/employers", {
      headers: { "x-admin-key": adminKey },
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Could not load employer feeds.");
      return;
    }
    setFeeds(data.feeds ?? []);
    setStorage(data.storage ?? "");
    setStatus("ready");
  }

  async function addEmployer(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/career-intelligence/employers", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ ...form, enabled: true }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Could not add employer.");
      return;
    }
    setForm({ company: "", industry: "hospitality", type: "greenhouse", identifier: "" });
    await loadFeeds();
  }

  const liveFeeds = feeds.filter((feed) => feed.diagnostic.status === "ok").length;
  const totalJobs = feeds.reduce((sum, feed) => sum + feed.diagnostic.jobs, 0);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AIEnablers</p>
            <h1 className="mt-2 text-4xl font-bold">Career Intelligence Admin</h1>
            <p className="mt-3 max-w-3xl text-slate-400">Test employer feeds, see live job counts and manage the direct-employer registry.</p>
          </div>
          {status === "ready" && (
            <button onClick={loadFeeds} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 font-medium hover:bg-slate-900">
              <RefreshCw size={17} /> Retest feeds
            </button>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <label className="block text-sm font-medium text-slate-300">Admin access key</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center rounded-xl border border-slate-700 bg-slate-950 px-3">
              <LockKeyhole size={18} className="text-slate-500" />
              <input type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} className="w-full bg-transparent px-3 py-3 text-white outline-none" placeholder="Enter CAREER_ADMIN_KEY" />
            </div>
            <button onClick={loadFeeds} disabled={!adminKey || status === "loading"} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50">
              {status === "loading" ? <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Loading</span> : "Open console"}
            </button>
          </div>
          {message && <p className="mt-3 text-sm text-amber-300">{message}</p>}
        </div>

        {status === "ready" && (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Activity className="text-emerald-400" /><p className="mt-4 text-3xl font-bold">{liveFeeds}/{feeds.length}</p><p className="text-slate-400">Feeds responding</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Building2 className="text-indigo-400" /><p className="mt-4 text-3xl font-bold">{totalJobs}</p><p className="text-slate-400">Direct jobs indexed now</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Database className="text-cyan-400" /><p className="mt-4 text-lg font-bold capitalize">{storage.replace("-", " ")}</p><p className="text-slate-400">Registry storage</p></div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
              <div className="border-b border-slate-800 px-5 py-4"><h2 className="text-xl font-semibold">Employer feed diagnostics</h2></div>
              <div className="divide-y divide-slate-800">
                {feeds.map((feed) => (
                  <div key={`${feed.type}-${feed.identifier}`} className="grid gap-4 px-5 py-4 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr] md:items-center">
                    <div><p className="font-semibold">{feed.company}</p><p className="text-sm text-slate-500">{feed.identifier}</p></div>
                    <div><p className="text-sm capitalize text-slate-300">{feed.type}</p><p className="text-xs text-slate-500">{feed.industry || "Unclassified"}</p></div>
                    <div className="flex items-center gap-2">{feed.diagnostic.status === "ok" ? <CheckCircle2 className="text-emerald-400" size={19} /> : <XCircle className="text-rose-400" size={19} />}<span>{feed.diagnostic.status === "ok" ? "Connected" : `Error ${feed.diagnostic.httpStatus || ""}`}</span></div>
                    <p className="font-semibold">{feed.diagnostic.jobs} jobs</p>
                  </div>
                ))}
                {!feeds.length && <p className="px-5 py-8 text-slate-400">No direct employer feeds are configured.</p>}
              </div>
            </div>

            <form onSubmit={addEmployer} className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2"><Plus className="text-indigo-400" /><h2 className="text-xl font-semibold">Add employer</h2></div>
              <p className="mt-2 text-sm text-slate-400">Adding employers is available when Supabase registry storage is configured.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500" />
                <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"><option value="hospitality">Hospitality</option><option value="business-finance">Business & finance</option><option value="retail">Retail</option><option value="technology">Technology</option><option value="other">Other</option></select>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"><option value="greenhouse">Greenhouse</option><option value="lever">Lever</option><option value="ashby">Ashby</option><option value="smartrecruiters">SmartRecruiters</option></select>
                <input required value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} placeholder="Board token / site / company ID" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500" />
              </div>
              <button className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-500">Add and test employer</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
