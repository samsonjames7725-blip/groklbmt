import Link from "next/link";

export default function EnquiryCenterPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-8">
        <Link href="/intelligence" className="text-sm text-slate-500 hover:text-sky-400">
          ← Intelligence
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-white">Enquiry Center</h1>
        <p className="mt-1 text-slate-400">RFQ · Product · Service · AMC · Tender · Draft ready · Approval required</p>
      </header>

      <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center">
        <p className="text-slate-400">No enquiries yet.</p>
        <p className="mt-2 text-sm text-slate-500">
          Incoming website / email / WhatsApp enquiries will be classified here.
        </p>
        <p className="mt-4 text-xs text-slate-600">
          AI can draft responses. Sending requires human APPROVE.
        </p>
      </div>
    </main>
  );
}
