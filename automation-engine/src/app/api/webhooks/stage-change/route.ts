/**
 * POST /api/webhooks/stage-change
 *
 * Triggered when a contact moves to a new pipeline stage.
 * Fires stage-specific automations (SMS/email/tags).
 *
 * Supported stages:
 *   2 — Consultation Booked
 *   3 — Site Measurement
 *   4 — Design Phase
 *   5 — Proposal / Quote Presented
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as ghl from "@/lib/ghl-client";
import {
  consultationConfirmationEmail,
  siteMeasurementEmail,
  designPhaseEmail,
  proposalEmail,
} from "@/lib/templates";
import { CONFIG } from "@/lib/config";

// ─── Validation schema ────────────────────────────────────────────────────────

const StageChangeSchema = z.object({
  contactId: z.string().min(1),
  newStage: z.union([z.string(), z.number()]),
  oldStage: z.union([z.string(), z.number()]).optional(),
});

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = StageChangeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { contactId, newStage } = parsed.data;
  const stageNum =
    typeof newStage === "number" ? newStage : parseInt(String(newStage), 10);

  const actions: string[] = [];

  try {
    // Fetch the contact to get their name/email for templates
    const contact = await ghl.getContact(contactId);
    const firstName = contact.firstName || "there";

    switch (stageNum) {
      case 2: {
        // ── Consultation Booked ──────────────────────────────────────────────
        const sms = `Hi ${firstName}, your consultation with Inplace Studio is confirmed! We're excited to discuss your kitchen project. We'll be in touch with details shortly.`;
        await ghl.sendSMS(contactId, sms);
        actions.push("Sent consultation confirmation SMS");

        const { subject, html } = consultationConfirmationEmail(firstName);
        await ghl.sendEmail(contactId, subject, html);
        actions.push("Sent consultation confirmation email");

        await ghl.addContactTag(contactId, ["Consultation Booked"]);
        actions.push("Added tag: Consultation Booked");
        break;
      }

      case 3: {
        // ── Site Measurement ─────────────────────────────────────────────────
        const sms = `Hi ${firstName}, it's time to schedule your site measurement! Our team will visit to take precise measurements and assess your space. Reply to pick a time that works for you.`;
        await ghl.sendSMS(contactId, sms);
        actions.push("Sent site measurement scheduling SMS");

        const { subject, html } = siteMeasurementEmail(firstName);
        await ghl.sendEmail(contactId, subject, html);
        actions.push("Sent site measurement prep email");

        await ghl.addContactTag(contactId, ["Site Measurement Scheduled"]);
        actions.push("Added tag: Site Measurement Scheduled");
        break;
      }

      case 4: {
        // ── Design Phase ─────────────────────────────────────────────────────
        const sms = `Hi ${firstName}, exciting news — our designers have started working on your custom kitchen design! We'll be in touch soon with initial concepts. Stay tuned 🎨`;
        await ghl.sendSMS(contactId, sms);
        actions.push("Sent design phase started SMS");

        const { subject, html } = designPhaseEmail(firstName);
        await ghl.sendEmail(contactId, subject, html);
        actions.push("Sent design phase email");

        await ghl.addContactTag(contactId, ["Design Phase"]);
        actions.push("Added tag: Design Phase");
        break;
      }

      case 5: {
        // ── Proposal / Quote Presented ────────────────────────────────────────
        const sms = `Hi ${firstName}, your custom kitchen proposal is ready! We've put together a detailed design and pricing plan just for you. Check your email and let us know if you have questions.`;
        await ghl.sendSMS(contactId, sms);
        actions.push("Sent proposal notification SMS");

        const { subject, html } = proposalEmail(firstName);
        await ghl.sendEmail(contactId, subject, html);
        actions.push("Sent proposal email");

        await ghl.addContactTag(contactId, ["Proposal Presented"]);
        actions.push("Added tag: Proposal Presented");
        break;
      }

      default: {
        console.log(
          `[stage-change] No automation defined for stage ${stageNum} (contact ${contactId})`
        );
        actions.push(`No automation for stage ${stageNum}`);
        break;
      }
    }

    return NextResponse.json({ success: true, actions }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[stage-change] Unhandled error:", message);
    return NextResponse.json({ error: message, actions }, { status: 500 });
  }
}
