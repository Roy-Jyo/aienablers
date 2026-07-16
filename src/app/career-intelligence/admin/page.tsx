"use client";

import Link from "next/link";
import { useState } from "react";
import { Activity, Building2, CheckCircle2, Database, Loader2, LockKeyhole, Plus, RefreshCw, Trash2, XCircle } from "lucide-react";

type Feed = {
  id?: string;
  company: string;
  industry?: string;
  type: "greenhouse" | "lever" | "ashby" | "smartrecruiters" | "workday" | "erecruit";
  identifier: string;
  enabled?: boolean;
  diagnostic: { status: "ok" | "error"; httpStatus: number; jobs: number; message?: string };
};

async function readApiResponse(response: Response) {
  const text = await response.text();
  if (!text) return {} as Record<string, unknown>;
  try {
    return JSON.parse(text) as Record<string, any>;
  } catch {
    return { error: `Server returned ${response.status}: ${text.slice(0, 250)}` };
  }
}

export default function CareerIntelligenceAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [storage, setStorage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [message, setMessage] = useState("");

  async function loadFeeds() {
    setStatus("loading");
    setMessage("");
    const key = adminKey.trim();
    sessionStorage.setItem("career-admin-key", key);
    try {
      const response = await fetch("/api/career-intelligence/employers", {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });
      const data = await readApiResponse(response);
      if (!response.ok) {
        setStatus("error");
        setMessage(String(data.error ?? `Admin API failed with status ${response.status}.`));
        return;
      }
      setFeeds(Array.isArray(data.feeds) ? data.feeds : []);
      setStorage(typeof data.storage === "string" ? data.storage : "");
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? `Could not reach the admin API: ${error.message}` : "Could not reach the admin API.");
    }
  }

  async function setEnabled(feed: Feed, enabled: boolean) {
    if (!feed.id) return;
    try {
      const response = await fetch("/api/career-intelligence/employers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey.trim() },
        body: JSON.stringify({ ...feed, enabled }),
      });
      const data = await readApiResponse(response);
      if (!response.ok) return setMessage(String(data.error ?? "Could not update employer."));
      await loadFeeds();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update employer.");
    }
  }

  async function removeEmployer(feed: Feed) {
    if (!feed.id || !confirm(`Delete ${feed.company} from the registry?`)) return;
    try {
      const response = await fetch(`/api/career-intelligence/employers?id=${encodeURIComponent(feed.id)}`, {
        method: "DELETE", headers: { "x-admin-key": adminKey.trim() },
      });
      const data = await readApiResponse(response);
      if (!response.ok) return setMessage(String(data.error ?? "Could not delete employer."));
      await loadFeeds();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete employer.");
    }
  }

  const liveFeeds = feeds.filter((feed) => feed.diagnostic.status === "ok").length;
  const totalJobs = feeds.reduce((sum, feed) => sum + feed.diagnostic.jobs, 0);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">AIEnablers</p><h1 className="mt-2 text-4xl font-bold">Career Intelligence Admin</h1><p className="mt-3 max-w-3xl text-slate-400">Manage employers, validate direct feeds and scale your opportunity network.</p></div>
          <div className="flex gap-3">
            {status === "ready" && <button onClick={loadFeeds} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 font-medium hover:bg-slate-900"><RefreshCw size={17}/> Retest feeds</button>}
            <Link href="/career-intelligence/admin/employers/new" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500"><Plus size={17}/> Add employer</Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <label className="block text-sm font-medium text-slate-300">Admin access key</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center rounded-xl border border-slate-700 bg-slate-950 px-3"><LockKeyhole size={18} className="text-slate-500"/><input type="password" value={adminKey} onChange={(e)=>setAdminKey(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"&&adminKey.trim()) void loadFeeds();}} className="w-full bg-transparent px-3 py-3 text-white outline-none" placeholder="Enter CAREER_ADMIN_KEY"/></div><button onClick={loadFeeds} disabled={!adminKey.trim()||status==="loading"} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50">{status==="loading"?<span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin"/> Loading</span>:"Open console"}</button></div>
          {message&&<p className="mt-3 break-words text-sm text-amber-300">{message}</p>}
        </div>

        {status === "ready" && <>
          <div className="mt-8 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Activity className="text-emerald-400"/><p className="mt-4 text-3xl font-bold">{liveFeeds}/{feeds.length}</p><p className="text-slate-400">Feeds responding</p></div><div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Building2 className="text-indigo-400"/><p className="mt-4 text-3xl font-bold">{totalJobs}</p><p className="text-slate-400">Direct jobs available</p></div><div className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Database className="text-cyan-400"/><p className="mt-4 text-lg font-bold capitalize">{storage.replace("-"," ")}</p><p className="text-slate-400">Registry storage</p></div></div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"><div className="border-b border-slate-800 px-5 py-4"><h2 className="text-xl font-semibold">Employers</h2><p className="mt-1 text-sm text-slate-400">Direct feeds are tested live whenever this page is refreshed.</p></div><div className="divide-y divide-slate-800">{feeds.map((feed)=><div key={`${feed.type}-${feed.identifier}`} className="grid gap-4 px-5 py-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.5fr_auto] lg:items-center"><div><p className="font-semibold">{feed.company}</p><p className="break-all text-sm text-slate-500">{feed.identifier}</p></div><div><p className="text-sm capitalize text-slate-300">{feed.type}</p><p className="text-xs text-slate-500">{feed.industry||"Unclassified"}</p></div><div className="flex items-center gap-2">{feed.diagnostic.status==="ok"?<CheckCircle2 className="text-emerald-400" size={19}/>:<XCircle className="text-rose-400" size={19}/>}<span>{feed.diagnostic.status==="ok"?"Connected":feed.diagnostic.message||`Error ${feed.diagnostic.httpStatus||""}`}</span></div><p className="font-semibold">{feed.diagnostic.jobs} jobs</p><div className="flex items-center gap-2"><button disabled={!feed.id||storage!=="supabase"} onClick={()=>setEnabled(feed,!feed.enabled)} className="rounded-lg border border-slate-700 px-3 py-2 text-sm disabled:opacity-40">{feed.enabled===false?"Enable":"Disable"}</button><button disabled={!feed.id||storage!=="supabase"} onClick={()=>removeEmployer(feed)} className="rounded-lg border border-rose-900 px-3 py-2 text-rose-300 disabled:opacity-40"><Trash2 size={16}/></button></div></div>)}{!feeds.length&&<p className="px-5 py-8 text-slate-400">No direct employer feeds are configured.</p>}</div></div>
          {storage!=="supabase"&&<div className="mt-6 rounded-2xl border border-amber-800 bg-amber-950/30 p-5 text-amber-200">The registry is currently read-only. Configure Supabase to add, disable and delete employers through this portal.</div>}
        </>}
      </section>
    </main>
  );
}
