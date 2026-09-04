import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-sky-400">
          LIFEBridge Business Intelligence
        </h1>
        <p className="text-lg text-slate-300">
          Lead Acquisition · Tender Discovery · Enquiry Intelligence
        </p>
        <p className="text-sm text-slate-500">
          Integrated module of the LIFEBridge MedTech Business OS
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link
            href="/intelligence"
            className="rounded-lg bg-sky-600 px-6 py-3 font-medium text-white hover:bg-sky-500 transition"
          >
            Intelligence Dashboard
          </Link>
          <Link
            href="/approvals"
            className="rounded-lg border border-slate-600 px-6 py-3 font-medium text-slate-200 hover:bg-slate-800 transition"
          >
            Approvals
          </Link>
        </div>
        <div className="pt-8 text-xs text-slate-600 space-y-1">
          <p>Human approval required for all external communication.</p>
          <p>No automatic email / WhatsApp sending.</p>
        </div>
      </div>
    </main>
  );
}
