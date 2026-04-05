/**
 * POST /api/webhooks/reply-received
 *
 * Triggered when a contact replies to any message.
 * Marks the contact as replied in the sequence store, which stops
 * all future automated follow-ups.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { markReplied, getSequence } from "@/lib/sequence-store";
import * as ghl from "@/lib/ghl-client";

// ─── Validation schema ────────────────────────────────────────────────────────

const ReplyReceivedSchema = z.object({
  contactId: z.string().min(1),
});

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ReplyReceivedSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { contactId } = parsed.data;

  try {
    const entry = getSequence(contactId);
    if (!entry) {
      // Contact is not in any active sequence — that's fine, still tag them
      console.log(`[reply-received] No active sequence for ${contactId}`);
    } else {
      const stopped = markReplied(contactId);
      console.log(
        `[reply-received] Marked replied for ${contactId}: ${stopped}`
      );
    }

    // Tag the contact as having replied so we can track engagement in GHL
    await ghl.addContactTag(contactId, ["Replied"]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[reply-received] Unhandled error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
