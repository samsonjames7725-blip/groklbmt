import Link from "next/link";

const cards = [
  { title: "New Leads", href: "/intelligence/leads", color: "bg-sky-600" },
  { title: "New Tenders", href: "/intelligence/tenders", color: "bg-indigo-600" },
  { title: "New Enquiries", href: "/intelligence/enquiries", color: "bg-violet-600" },
  { title: "Hot Opportunities", href: "/intelligence/leads?priority=HOT", color: "bg-rose-600" },
  { title: "Needs Verification", href: "/intelligence/leads?status=UNVERIFIED", color: "bg-amber-600" },
  { title: "Closing Soon", href: "/intelligence/tenders?closing=7d", color: "bg-orange-600" },
  { title: "Pending Follow-ups", href: "/intelligence/leads?followup=1", color: "bg-teal-600" },
  { title: "Pending Approvals", href: "/approvals", color: "bg-emerald-600" },
];

export default function IntelligenceDashboard() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-10">
        <Link href="/" className="text-sm text-slate-500 hover:text-sky-400">
          ← Home
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-white">Intelligence Dashboard</h1>
        <p className="mt-1 text-slate-400">
          Discover → Research → Verify → Score → Qualify → CRM / Tender
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className={`${c.color} rounded-xl p-6 text-white shadow-lg hover:opacity-90 transition`}
          >
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="mt-2 text-3xl font-bold opacity-90">—</p>
            <p className="mt-1 text-xs opacity-70">Connect DB for live counts</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 rounded-xl border border-slate-700 bg-slate-900/50 p-6">
        <h2 className="text-xl font-semibold text-white">Status</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>✓ Explainable scoring engine (0–100)</li>
          <li>✓ Human approval gate (no auto-send)</li>
          <li>✓ Source evidence model</li>
          <li>✓ SearchProvider adapter (NOT_CONFIGURED safe)</li>
          <li>⚠ External search APIs require configuration</li>
          <li>⚠ Database not yet connected (set DATABASE_URL)</li>
        </ul>
      </section>
    </main>
  );
}
