"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, Building2, CheckCircle2, Loader2, Save } from "lucide-react";

type Provider = "greenhouse" | "lever" | "ashby" | "smartrecruiters";

const providerHelp: Record<Provider, string> = {
  greenhouse: "Enter the board token used in boards.greenhouse.io/{token}.",
  lever: "Enter the site name used in jobs.lever.co/{site}.",
  ashby: "Enter the board name used in jobs.ashbyhq.com/{board}.",
  smartrecruiters: "Enter the company identifier used in jobs.smartrecruiters.com/{companyId}.",
};

export default function AddEmployerPage() {
  const [adminKey, setAdminKey] = useState("");
  const [form, setForm] = useState({ company: "", industry: "hospitality", type: "greenhouse" as Provider, identifier: "", enabled: true });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => setAdminKey(sessionStorage.getItem("career-admin-key") ?? ""), []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const response = await fetch("/api/career-intelligence/employers", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Could not add employer.");
      return;
    }
    setStatus("success");
    setMessage(`${form.company} was added to the employer registry.`);
    setForm({ company: "", industry: "hospitality", type: "greenhouse", identifier: "", enabled: true });
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-4xl">
        <Link href="/career-intelligence/admin" className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200"><ArrowLeft size={17}/> Back to employers</Link>
        <div className="mt-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Career Intelligence</p><h1 className="mt-2 text-4xl font-bold">Add a direct employer</h1><p className="mt-3 text-slate-400">Connect an employer career board and classify it for hospitality, retail, business and finance, technology or another industry.</p></div>

        <form onSubmit={submit} className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-indigo-950 p-3 text-indigo-300"><Building2/></div><div><h2 className="text-xl font-semibold">Employer details</h2><p className="text-sm text-slate-400">Only verified public ATS identifiers should be added.</p></div></div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block"><span className="mb-2 block text-sm font-medium text-slate-300">Company name</span><input required value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500" placeholder="e.g. Accor"/></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-slate-300">Industry</span><select value={form.industry} onChange={(e)=>setForm({...form,industry:e.target.value})} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"><option value="hospitality">Hospitality</option><option value="business-finance">Business & finance</option><option value="retail">Retail</option><option value="technology">Technology</option><option value="healthcare">Healthcare</option><option value="government">Government</option><option value="education">Education</option><option value="other">Other</option></select></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-slate-300">ATS provider</span><select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value as Provider})} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"><option value="greenhouse">Greenhouse</option><option value="lever">Lever</option><option value="ashby">Ashby</option><option value="smartrecruiters">SmartRecruiters</option></select></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-slate-300">Board identifier</span><input required value={form.identifier} onChange={(e)=>setForm({...form,identifier:e.target.value.trim()})} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500" placeholder="Board token / site / company ID"/><span className="mt-2 block text-xs text-slate-500">{providerHelp[form.type]}</span></label>
          </div>

          <label className="mt-5 flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={form.enabled} onChange={(e)=>setForm({...form,enabled:e.target.checked})} className="h-4 w-4"/> Enable this employer immediately</label>

          {!adminKey&&<div className="mt-5 rounded-xl border border-amber-800 bg-amber-950/30 p-4 text-sm text-amber-200">Open the main admin console and enter your admin key first. The key is retained only for this browser session.</div>}
          {message&&<div className={`mt-5 rounded-xl border p-4 text-sm ${status==="success"?"border-emerald-800 bg-emerald-950/30 text-emerald-200":"border-rose-800 bg-rose-950/30 text-rose-200"}`}>{status==="success"&&<CheckCircle2 size={17} className="mr-2 inline"/>}{message}</div>}

          <button disabled={!adminKey||status==="saving"} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">{status==="saving"?<><Loader2 size={18} className="animate-spin"/> Saving</>:<><Save size={18}/> Add employer</>}</button>
        </form>
      </section>
    </main>
  );
}
