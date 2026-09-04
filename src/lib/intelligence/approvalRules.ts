/**
 * CRITICAL RULE — HUMAN APPROVAL
 * AI MUST NEVER automatically send external email or WhatsApp.
 * Server-side enforcement only.
 */

export type ApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "SENT"
  | "FAILED";

export interface MessageDraft {
  id: string;
  status: ApprovalStatus;
  channel: "EMAIL" | "WHATSAPP" | "OTHER";
  recipient: string;
  content: string;
}

/**
 * Returns true only when a human has explicitly approved and the message
 * has not already been sent or rejected.
 */
export function canSendMessage(draft: MessageDraft): boolean {
  // Hard rule: only APPROVED status allows send
  if (draft.status !== "APPROVED") {
    return false;
  }
  // Already sent or failed — do not re-send automatically
  if (draft.status === "SENT" || draft.status === "FAILED") {
    return false;
  }
  return true;
}

/**
 * Create a new draft. Always starts as PENDING.
 * Never transitions to SENT without human approval.
 */
export function createPendingDraft(
  channel: MessageDraft["channel"],
  recipient: string,
  content: string
): Omit<MessageDraft, "id"> {
  return {
    status: "PENDING",
    channel,
    recipient,
    content,
  };
}

/**
 * Guard used by any send function. Throws if rule violated.
 */
export function assertCanSend(draft: MessageDraft): void {
  if (!canSendMessage(draft)) {
    throw new Error(
      `SEND_BLOCKED: Message status is ${draft.status}. Human approval required before external send.`
    );
  }
}
