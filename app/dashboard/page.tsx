import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, BookOpen, MessageSquareText, Sparkles, Code2, Activity } from "lucide-react";
import { db } from "@/lib/prisma";
import { createOrUpdateUser } from "@/lib/user";
import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chatbot/ChatWindow";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ chatId?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const { chatId } = await searchParams;
  const user = await currentUser();

  if (user) {
    await createOrUpdateUser({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      imageUrl: user.imageUrl,
    });
  }
  const dbUser = await db.user.findUnique({
    where: { clerkId: userId },
    include: { _count: { select: { chats: true } } },
  });
  const totalChats = dbUser?._count.chats ?? 0;
  const knowledgeReady = Boolean(dbUser?.businessName?.trim() && dbUser?.knowledge?.trim());

  return (
    <main className="flex min-h-screen bg-[#f5f7fb] text-slate-900 dark:bg-[#080f1e] dark:text-slate-100">
      <Sidebar />
      <section className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                <Sparkles size={14} /> Your AI workspace
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back, {user?.firstName || "there"} <span aria-hidden="true">👋</span></h1>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Configure your assistant, manage knowledge and test customer conversations.</p>
            </div>
            <Link href="/dashboard/widget" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">Customize widget <ArrowUpRight size={16}/></Link>
          </header>

          <nav aria-label="Mobile dashboard navigation" className="flex flex-wrap gap-2 md:hidden">
            <Link href="/dashboard" className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">Dashboard</Link>
            <Link href="/dashboard/knowledge" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs dark:border-white/10 dark:bg-white/10">Knowledge</Link>
            <Link href="/dashboard/widget" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs dark:border-white/10 dark:bg-white/10">Widget</Link>
          </nav>

          <div className="relative overflow-hidden rounded-[28px] bg-[#0d1b35] p-7 text-white shadow-xl shadow-slate-900/10 sm:p-9">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_25%,rgba(34,211,238,.22),transparent_35%),radial-gradient(circle_at_32%_100%,rgba(99,102,241,.17),transparent_48%)]"/>
            <div className="relative max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-cyan-300"><Activity size={16}/> Workspace overview</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Make every customer conversation count.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">Start with accurate business information, then test how your assistant responds. Advanced knowledge ingestion and public widget deployment are still in development.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111d31]">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400"><span className="text-sm font-medium">Saved conversations</span><MessageSquareText size={19}/></div>
              <p className="mt-5 text-4xl font-semibold tracking-tight">{totalChats}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Chats stored in your workspace</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111d31]">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400"><span className="text-sm font-medium">Knowledge setup</span><BookOpen size={19}/></div>
              <p className={`mt-5 text-2xl font-semibold ${knowledgeReady ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>{knowledgeReady ? "Configured" : "Needs setup"}</p>
              <Link href="/dashboard/knowledge" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-cyan-700 hover:underline dark:text-cyan-300">Manage knowledge <ArrowUpRight size={13}/></Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 xl:col-span-1 dark:border-white/10 dark:bg-[#111d31]">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400"><span className="text-sm font-medium">Widget integration</span><Code2 size={19}/></div>
              <p className="mt-5 text-2xl font-semibold">In development</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Public deployment is not yet verified</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111d31]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-6 py-5 dark:border-white/10">
              <div><h2 className="text-lg font-semibold">AI chat playground</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Test responses using your configured business information</p></div>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">Prototype</span>
            </div>
            <div className="p-5 sm:p-7"><ChatWindow chatId={chatId ?? null}/></div>
          </div>
        </div>
      </section>
    </main>
  );
}
