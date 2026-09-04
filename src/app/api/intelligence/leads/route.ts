import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateLeadSchema = z.object({
  organizationName: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  tenderNumber: z.string().optional(),
  estimatedValue: z.number().optional(),
  deadline: z.string().datetime().optional(),
});

export async function GET() {
  // Scaffold: return empty until DB connected
  return NextResponse.json({
    data: [],
    meta: { total: 0, message: "DATABASE_NOT_CONNECTED — set DATABASE_URL and run prisma db push" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    // Scaffold — real implementation writes to IntelligenceLead + LeadEvidence
    return NextResponse.json(
      {
        message: "Lead creation scaffolded. Connect Prisma + company scope to persist.",
        received: parsed.data,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
