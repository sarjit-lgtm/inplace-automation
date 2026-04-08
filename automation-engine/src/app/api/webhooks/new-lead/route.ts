/**
 * POST /api/webhooks/new-lead
 *
 * Main entry point for all new leads.
 * - Creates / updates the contact in GHL
 * - Calculates and stores lead score
 * - Sends high-score alert SMS to Sarjit if score > 70
 * - Starts the speed-to-lead follow-up sequence
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as ghl from "@/lib/ghl-client";
import { calculateLeadScore, getScoreTier } from "@/lib/lead-scoring";
import { startSequence } from "@/lib/sequences/speed-to-lead";
import { highScoreAlertSMS } from "@/lib/templates";
import { CONFIG } from "@/lib/config";

// ─── Validation schema ────────────────────────────────────────────────────────

const NewLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional().default(""),
  email: z.string().email().optional().default(""),
  phone: z.string().min(7),
  source: z.string().optional().default(""),
  budgetRange: z.string().optional().default("Not Disclosed"),
  timeline: z.string().optional().default(""),
  kitchenType: z.string().optional().default(""),
  stylePref: z.string().optional().default(""),
  utmSource: z.string().optional().default(""),
  utmMedium: z.string().optional().default(""),
  utmCampaign: z.string().optional().default(""),
  utmTerm: z.string().optional().default(""),
});

type NewLeadPayload = z.infer<typeof NewLeadSchema>;

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = NewLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const payload: NewLeadPayload = parsed.data;
  const {
    firstName,
    lastName,
    email,
    phone,
    source,
    budgetRange,
    timeline,
    kitchenType,
    stylePref,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
  } = payload;

  const contactName = [firstName, lastName].filter(Boolean).join(" ");

  try {
    // ── 1. Calculate lead score ─────────────────────────────────────────────
    const score = calculateLeadScore({
      source,
      budgetRange,
      timeline,
      kitchenType,
    });
    const tier = getScoreTier(score);

    // ── 2. Build GHL custom fields array ────────────────────────────────────
    // GHL custom field IDs (from La Jolla location)
    const customFields: ghl.GHLCustomField[] = [
      { id: "2r3AfpvpA3UFUjUO2gXS", value: String(score) }, // Lead Score
    ];
    if (source) customFields.push({ id: "bSN8XOeQMV1RPFk13Qqo", value: source }); // Lead Source
    if (budgetRange) customFields.push({ id: "4Dobr8ss8rOuKYn2nT3k", value: budgetRange }); // Budget Range
    if (timeline) customFields.push({ id: "0JFlSaPD3vxkQmkEGwr6", value: timeline }); // Timeline
    if (kitchenType) customFields.push({ id: "Zl1g1Zjf9YstXOqwtYOH", value: kitchenType }); // Kitchen Type
    if (stylePref) customFields.push({ id: "u7ZrfrKeZrUdCD5v3VbX", value: stylePref }); // Style Preference
    if (utmSource) customFields.push({ id: "ktq3PM2KELVBRW96sy7Z", value: utmSource }); // UTM Source
    if (utmMedium) customFields.push({ id: "bcwPKiL9E46oNy36oEKC", value: utmMedium }); // UTM Medium
    if (utmCampaign) customFields.push({ id: "zfpT3pIGWW1zsbb6m7gS", value: utmCampaign }); // UTM Campaign
    if (utmTerm) customFields.push({ id: "S6UR32OUp4fPwQreox2M", value: utmTerm }); // UTM Term

    // ── 3. Build source tag ──────────────────────────────────────────────────
    const tags: string[] = [];
    if (source) tags.push(`${source} Lead`);
    if (tier === "High") tags.push("High Score Lead");

    // ── 4. Create or update contact in GHL ──────────────────────────────────
    let contactId: string;

    // Try to find existing contact by phone first
    const existing = await ghl.findContactByPhone(phone);

    if (existing) {
      contactId = existing.id;
      await ghl.updateContact(contactId, { firstName, lastName, email, customFields, tags });
      console.log(`[new-lead] Updated existing contact ${contactId}`);
    } else {
      const created = await ghl.createContact({
        firstName,
        lastName,
        email,
        phone,
        source,
        tags,
        customFields,
      });
      contactId = created.id;
      console.log(`[new-lead] Created new contact ${contactId}`);
    }

    // ── 5. High-score alert to Sarjit ────────────────────────────────────────
    // Send alert for ALL new leads (full info)
    try {
      const sarjitContact = await ghl.findContactByPhone(CONFIG.sarjitPhone);
      if (sarjitContact) {
        const alertMsg = highScoreAlertSMS(
          contactName,
          phone,
          email,
          source || "Unknown",
          budgetRange || "Not Disclosed",
          timeline || "Unknown",
          kitchenType || "",
          stylePref || "",
          score
        );
        await ghl.sendSMS(sarjitContact.id, alertMsg);
      }
    } catch (alertErr) {
      console.error("[new-lead] Failed to send lead alert:", alertErr);
    }

    // ── 6. Create opportunity in Homeowner pipeline ────────────────────────
    try {
      const HOMEOWNER_PIPELINE_ID = "CKgx1Mzfj5CdVK6M25uh";
      const NEW_LEAD_STAGE_ID = "8152f0aa-b510-452b-8a21-24d1b4660054";
      await ghl.createOpportunity(
        contactId,
        `${contactName} - Kitchen Design`,
        HOMEOWNER_PIPELINE_ID,
        NEW_LEAD_STAGE_ID
      );
      console.log(`[new-lead] Created opportunity for ${contactName}`);
    } catch (oppErr) {
      console.error("[new-lead] Failed to create opportunity:", oppErr);
    }

    // ── 7. Send client welcome SMS + email immediately ────────────────────
    try {
      const { instantLeadSMS, welcomeEmail } = await import("@/lib/templates");

      // Send welcome SMS to the lead
      await ghl.sendSMS(contactId, instantLeadSMS(firstName, CONFIG.bookingLink));
      console.log(`[new-lead] Sent welcome SMS to ${contactName}`);

      // Send welcome email to the lead
      const email_tpl = welcomeEmail(firstName, CONFIG.bookingLink);
      await ghl.sendEmail(contactId, email_tpl.subject, email_tpl.html);
      console.log(`[new-lead] Sent welcome email to ${contactName}`);
    } catch (seqErr) {
      console.error("[new-lead] Failed to send welcome messages:", seqErr);
    }

    return NextResponse.json({ success: true, contactId, score, tier }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[new-lead] Unhandled error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
