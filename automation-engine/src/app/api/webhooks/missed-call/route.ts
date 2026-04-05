/**
 * POST /api/webhooks/missed-call
 *
 * Triggered when a call to Inplace Studio is missed.
 * - Looks up contact by phone (creates if new)
 * - Sends instant text-back SMS
 * - If it's a new contact, starts the speed-to-lead sequence
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as ghl from "@/lib/ghl-client";
import { missedCallSMS } from "@/lib/templates";
import { startSequence } from "@/lib/sequences/speed-to-lead";
import { getSequence } from "@/lib/sequence-store";
import { CONFIG } from "@/lib/config";

// ─── Validation schema ────────────────────────────────────────────────────────

const MissedCallSchema = z.object({
  phone: z.string().min(7),
  callerName: z.string().optional().default(""),
});

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = MissedCallSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { phone, callerName } = parsed.data;

  try {
    let contactId: string;
    let isNew = false;

    // ── 1. Find or create contact ────────────────────────────────────────────
    const existing = await ghl.findContactByPhone(phone);

    if (existing) {
      contactId = existing.id;
      console.log(`[missed-call] Found existing contact ${contactId}`);
    } else {
      // Parse first/last from callerName if provided
      const nameParts = callerName.trim().split(/\s+/);
      const firstName = nameParts[0] || "Unknown";
      const lastName = nameParts.slice(1).join(" ") || "";

      const created = await ghl.createContact({
        firstName,
        lastName,
        phone,
        tags: ["Missed Call"],
      });
      contactId = created.id;
      isNew = true;
      console.log(`[missed-call] Created new contact ${contactId}`);
    }

    // ── 2. Send missed call text-back ────────────────────────────────────────
    const sms = missedCallSMS(CONFIG.bookingLink);
    await ghl.sendSMS(contactId, sms);
    console.log(`[missed-call] Sent text-back to ${contactId}`);

    // ── 3. Tag the contact ────────────────────────────────────────────────────
    await ghl.addContactTag(contactId, ["Missed Call"]);

    // ── 4. Start sequence only for new contacts (existing ones may already be in a sequence) ──
    if (isNew) {
      const contactName = callerName || "Unknown";
      await startSequence({
        contactId,
        contactName,
        phone,
        email: "",
        leadSource: "Phone Call",
        score: 25, // Phone Call source default score
      });
    } else {
      // Check if they already have an active sequence before starting a new one
      const activeSeq = getSequence(contactId);
      if (!activeSeq || activeSeq.completedAt || activeSeq.replied) {
        const contact = await ghl.getContact(contactId);
        const contactName =
          [contact.firstName, contact.lastName].filter(Boolean).join(" ") ||
          callerName ||
          "Unknown";

        await startSequence({
          contactId,
          contactName,
          phone,
          email: contact.email || "",
          leadSource: "Phone Call",
          score: 25,
        });
      }
    }

    return NextResponse.json({ success: true, contactId }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[missed-call] Unhandled error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
