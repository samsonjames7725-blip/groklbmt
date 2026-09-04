# LIFEBridge Business Intelligence Agent

**Repository:** `samsonjames7725-blip/groklbmt`  
**Module of:** LIFEBridge MedTech Business OS  
**Status:** Working scaffold — production-oriented foundation

---

## Quick Start

```bash
git clone https://github.com/samsonjames7725-blip/groklbmt.git
cd groklbmt
cp .env.example .env
# Edit .env — set DATABASE_URL (MySQL)
npm install
npx prisma generate
npx prisma db push   # or migrate
npm run dev
```

Open http://localhost:3000

---

## What is implemented

| Area | Status | Notes |
|------|--------|-------|
| Next.js 15 + TypeScript + Tailwind | **IMPLEMENTED** | App router |
| Prisma schema (SourceRegistry, IntelligenceLead, LeadEvidence, LeadScore, WebResearchRun, ApprovalRequest, Watchlist, MarketSignal) | **IMPLEMENTED** | Ready for MySQL |
| Explainable opportunity score (0–100) | **IMPLEMENTED** | `/api/intelligence/scores` |
| Human approval gate (no auto-send) | **IMPLEMENTED** | Server-side `assertCanSend` |
| SearchProvider adapter | **SCAFFOLDED** | Returns `NOT_CONFIGURED` without keys |
| Intelligence Dashboard UI | **IMPLEMENTED** | `/intelligence` |
| Lead / Tender / Enquiry radar pages | **IMPLEMENTED** | Empty states |
| Approvals UI | **IMPLEMENTED** | `/approvals` |
| API routes (leads, scores, approvals) | **PARTIALLY IMPLEMENTED** | Validation + guards; DB write pending |
| Real discovery from GeM / CPPP | **REQUIRES EXTERNAL PROVIDER** | No official free API |
| Email / WhatsApp send | **REQUIRES EXTERNAL PROVIDER** | Blocked until human APPROVE |
| Full CRM / Tender Management link | **SCAFFOLDED** | Designed for integration with lifebridge-business-mos |
| Multi-tenant RBAC | **SCAFFOLDED** | CompanyId on all models |

---

## Critical rules enforced

1. **No automatic external send** — `assertCanSend()` throws unless status is `APPROVED`.
2. **No fake results** — SearchProvider returns empty when not configured.
3. **Source evidence required** — `LeadEvidence` model + original URL.
4. **Explainable scores** — factor breakdown always returned.
5. **Company isolation** — all intelligence models carry `companyId`.

---

## Government procurement APIs (investigation summary)

- GeM & CPPP do **not** publish public developer APIs.
- Practical path: commercial providers (BidAssist, Tenderbook) or carefully rate-limited public-page access.
- State portals (mahatenders.gov.in etc.) also lack public APIs.
- See `src/lib/providers/searchProvider.ts` for the adapter pattern.

---

## Next implementation priorities

1. Connect MySQL + seed sample SourceRegistry entries.
2. Wire real BidAssist / Tenderbook credentials behind env flags.
3. Async discovery job (Vercel-compatible).
4. Deduplication by tender number + content hash.
5. Link to existing CRM / Tender modules in core MOS.
6. Full RBAC + audit log integration.

---

## Scripts

- `npm run dev` — development server
- `npm run build` — production build (prisma generate + next build)
- `npm run typecheck` — TypeScript check
- `npm run db:push` — push schema to DB

---

**Human approval is mandatory for all external communication.**
