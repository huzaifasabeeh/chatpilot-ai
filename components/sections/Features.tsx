import { Bot, BookOpenText, PlugZap, ArrowUpRight } from "lucide-react";

const features = [
  { icon: Bot, eyebrow: "01 / INTELLIGENCE", title: "Business-aware assistance", detail: "Shape responses around your products, policies and frequently asked questions." },
  { icon: BookOpenText, eyebrow: "02 / KNOWLEDGE", title: "One place for your knowledge", detail: "Organize business information now, with document and website ingestion planned for the rebuild." },
  { icon: PlugZap, eyebrow: "03 / INTEGRATION", title: "Support where customers are", detail: "A customizable website widget, with secure cross-site integration under development." },
];
export default function Features() {
  return (
    <section id="features" className="bg-slate-50 px-6 py-24 text-slate-950 dark:bg-[#0a1221] dark:text-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">Built for growing teams</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Everything connected.<br/>Nothing complicated.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-500 dark:text-slate-400">A focused workspace for teams creating better customer support experiences with AI.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map(({icon: Icon,eyebrow,title,detail})=>(
            <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[.04]">
              <div className="flex items-start justify-between"><span className="rounded-2xl bg-cyan-50 p-4 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300"><Icon size={25}/></span><ArrowUpRight className="text-slate-300 transition group-hover:text-cyan-500" size={20}/></div>
              <p className="mt-9 text-[11px] font-bold tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{eyebrow}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}