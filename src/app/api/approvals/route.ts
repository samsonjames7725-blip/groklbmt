import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assertCanSend, createPendingDraft } from "@/lib/intelligence/approvalRules";

const CreateDraftSchema = z.object({
  channel: z.enum(["EMAIL", "WHATSAPP", "OTHER"]),
  recipient: z.string().min(1),
  content: z.string().min(1),
  entityType: z.string().optional(),
  entityId: z.string().optional(),
});

const ActionSchema = z.object({
  draftId: z.string(),
  action: z.enum(["APPROVE", "REJECT", "SEND"]),
  rejectionReason: z.string().optional(),
});

export async function GET() {
  return NextResponse.json({
    data: [],
    meta: { message: "No pending approvals (scaffold)" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Create draft path
    if (body.content) {
      const parsed = CreateDraftSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "VALIDATION_ERROR", details: parsed.error.flatten() },
          { status: 400 }
        );
      }
      const draft = createPendingDraft(
        parsed.data.channel,
        parsed.data.recipient,
        parsed.data.content
      );
      return NextResponse.json(
        {
          message: "Draft created as PENDING. Human approval required before send.",
          draft: { ...draft, id: "scaffold-" + Date.now() },
        },
        { status: 201 }
      );
    }

    // Action path (approve / reject / send)
    const actionParsed = ActionSchema.safeParse(body);
    if (!actionParsed.success) {
      return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 });
    }

    const { action, draftId } = actionParsed.data;

    if (action === "SEND") {
      // Demonstrate the hard guard
      try {
        assertCanSend({
          id: draftId,
          status: "PENDING", // In real code load from DB
          channel: "EMAIL",
          recipient: "",
          content: "",
        });
      } catch (e) {
        return NextResponse.json(
          {
            error: "SEND_BLOCKED",
            message: e instanceof Error ? e.message : "Human approval required",
          },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      message: `Action ${action} recorded (scaffold). Real implementation updates ApprovalRequest status.`,
      draftId,
    });
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
