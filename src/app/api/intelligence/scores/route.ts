import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateOpportunityScore } from "@/lib/scoring/opportunityScore";

const ScoreSchema = z.object({
  sourceCredibility: z.number().min(0).max(20).optional(),
  healthcareRelevance: z.number().min(0).max(15).optional(),
  businessFit: z.number().min(0).max(15).optional(),
  opportunityValue: z.number().min(0).max(15).optional(),
  deadlineUrgency: z.number().min(0).max(10).optional(),
  organizationConfidence: z.number().min(0).max(10).optional(),
  contactAvailability: z.number().min(0).max(5).optional(),
  dataCompleteness: z.number().min(0).max(5).optional(),
  crossSourceConfirmation: z.number().min(0).max(5).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ScoreSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const result = calculateOpportunityScore(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
