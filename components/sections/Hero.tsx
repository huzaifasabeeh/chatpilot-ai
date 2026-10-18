"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Bot, ShieldCheck, Sparkles, MessagesSquare, BookOpen, Globe2 } from "lucide-react";

const capabilities = [
  { icon: BookOpen, title: "Knowledge-aware", detail: "Ground answers in business information." },
  { icon: MessagesSquare, title: "Real conversations", detail: "Design a consistent support experience." },
  { icon: Globe2, title: "Website-ready", detail: "Embeddable chat integration in development." },
];

export default function Hero() {
  const { isSignedIn } = useUser();
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#070e1d] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(14,165,233,0.20),transparent_38%),radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.16),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.06fr_.94fr] lg:items-center lg:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-cyan-200 uppercase"><Sparkles size={15}/> The future of customer conversations</span>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.08] tracking-[-.05em] sm:text-6xl xl:text-7xl">Your business.<br/><span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Smarter support.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Meet ChatPilot AI — a workspace for building an assistant around your business knowledge. Manage conversations, refine responses, and prepare support for your website.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300">{isSignedIn ? "Open dashboard" : "Explore ChatPilot"}<ArrowRight size={18}/></Link>
            <a href="#features" className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">Explore capabilities</a>
          </div>
          <p className="mt-6 text-xs text-slate-400">Product rebuild in progress • Some integrations are not yet available</p>
        </div>
        <div className="relative rounded-[28px] border border-white/15 bg-white/[.06] p-4 shadow-2xl shadow-black/50 backdrop-blur">
          <div className="rounded-2xl border border-white/10 bg-[#0c172a] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3"><span className="rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-3"><Bot size={23}/></span><div><p className="font-semibold">ChatPilot workspace</p><p className="text-xs text-slate-400">Product interface concept</p></div></div>
              <ShieldCheck className="text-cyan-300" size={23}/>
            </div>
            <div className="space-y-4 pt-6">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/10 p-4 text-sm leading-6 text-slate-200">Hi there! How can I help you today?</div>
              <div className="ml-auto max-w-[83%] rounded-2xl rounded-tr-sm bg-sky-500/20 p-4 text-sm leading-6 text-sky-100">Can you tell me about your business hours?</div>
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-cyan-400/15 bg-cyan-400/10 p-4 text-sm leading-6 text-slate-200">I can help using the information provided by the business.</div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-400"><span>Ask a question…</span><span className="rounded-lg bg-cyan-400 px-3 py-2 text-slate-900">Send</span></div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">{capabilities.map(({icon:Icon,title})=><div key={title} className="flex flex-col items-center gap-2 rounded-xl bg-white/[.06] p-3 text-center text-[11px] text-slate-300"><Icon size={19} className="text-cyan-300"/>{title}</div>)}</div>
        </div>
      </div>
    </section>
  );
}