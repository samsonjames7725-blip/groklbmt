import Link from "next/link";

export default function ApprovalsPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-sky-400">
          ← Home
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-white">Communication Approvals</h1>
        <p className="mt-1 text-slate-400">
          AI drafts · Human reviews · Approve & Send or Reject
        </p>
      </header>

      <div className="rounded-xl border border-amber-700/50 bg-amber-950/20 p-6 mb-8">
        <p className="text-amber-200 font-medium">Critical rule enforced server-side</p>
        <p className="mt-1 text-sm text-amber-200/80">
          No external email or WhatsApp message can be sent without human approval.
          Status must be APPROVED before any send function executes.
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center">
        <p className="text-slate-400">No pending approvals.</p>
        <p className="mt-2 text-sm text-slate-500">
          Drafts created by AI analysis will appear here for review.
        </p>
      </div>
    </main>
  );
}
