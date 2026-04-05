/**
 * Speed-to-Lead Sequence
 *
 * Manages the multi-step follow-up cadence after a new lead comes in.
 * Steps are advanced by the /api/webhooks/process-sequences cron endpoint.
 *
 * Step | Delay      | Action
 * -----|------------|-----------------------------------------------------
 *   0  | immediate  | SMS: Instant Lead Response + Email: Welcome Email
 *   1  | 5 min      | If no reply → Vapi callback (Pebble Connect webhook)
 *   2  | 1 hour     | If no reply → Email: Portfolio Email
 *   3  | 24 hours   | If no reply → SMS: 24-Hour Follow-Up
 *   4  | 3 days     | If no reply → SMS: 3-Day Follow-Up
 *   5  | 7 days     | If no reply → Remove from sequence, add "Nurture" tag
 */

import * as ghl from "@/lib/ghl-client";
import {
  SequenceEntry,
  advanceStep,
  markCompleted,
  createSequenceEntry,
  upsertSequence,
} from "@/lib/sequence-store";
import {
  instantLeadSMS,
  fiveMinNoReplySMS,
  twentyFourHourSMS,
  threeDaySMS,
  welcomeEmail,
  portfolioEmail,
} from "@/lib/templates";
import { CONFIG } from "@/lib/config";

// ─── Step delay definitions (in milliseconds) ────────────────────────────────

const STEP_DELAYS_MS: Record<number, number> = {
  0: 0,
  1: 5 * 60 * 1000, // 5 minutes
  2: 60 * 60 * 1000, // 1 hour
  3: 24 * 60 * 60 * 1000, // 24 hours
  4: 3 * 24 * 60 * 60 * 1000, // 3 days
  5: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const TOTAL_STEPS = 6;

/** Return the delay in ms from sequence start for a given step */
export function stepDelayMs(step: number): number {
  return STEP_DELAYS_MS[step] ?? 0;
}

/**
 * Start a speed-to-lead sequence for a new contact.
 * Immediately sends Step 0 (SMS + Email) and saves the entry to the store.
 */
export async function startSequence(params: {
  contactId: string;
  contactName: string;
  phone: string;
  email: string;
  leadSource: string;
  score: number;
  stylePref?: string;
}): Promise<SequenceEntry> {
  const {
    contactId,
    contactName,
    phone,
    email,
    leadSource,
    score,
    stylePref = "",
  } = params;

  const firstName = contactName.split(" ")[0] || contactName;

  // Create and persist the sequence entry
  const entry = createSequenceEntry(
    contactId,
    contactName,
    phone,
    email,
    leadSource,
    score,
    stylePref
  );
  upsertSequence(entry);

  // ── Step 0: Send immediately ──────────────────────────────────────────────
  await executeStep(entry, 0);

  return entry;
}

/**
 * Execute a specific sequence step for a contact.
 * Called by process-sequences cron endpoint.
 */
export async function executeStep(
  entry: SequenceEntry,
  step: number
): Promise<{ sent: boolean; actions: string[] }> {
  if (entry.replied || entry.completedAt) {
    return { sent: false, actions: ["Sequence already stopped"] };
  }

  const firstName = entry.contactName.split(" ")[0] || entry.contactName;
  const actions: string[] = [];

  try {
    switch (step) {
      case 0: {
        // Instant SMS + Welcome Email
        const sms = instantLeadSMS(firstName, CONFIG.bookingLink);
        await ghl.sendSMS(entry.contactId, sms);
        actions.push("Sent instant lead SMS");

        const { subject, html } = welcomeEmail(firstName, CONFIG.bookingLink);
        await ghl.sendEmail(entry.contactId, subject, html);
        actions.push("Sent welcome email");
        break;
      }

      case 1: {
        // Trigger Vapi/Pebble Connect callback for AI voice call
        if (CONFIG.pebbleConnectWebhookUrl) {
          const response = await fetch(CONFIG.pebbleConnectWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contactId: entry.contactId,
              contactName: entry.contactName,
              phone: entry.phone,
              action: "initiate_call",
            }),
          });
          if (response.ok) {
            actions.push("Triggered Pebble Connect Vapi callback");
          } else {
            actions.push(
              `Pebble Connect webhook failed: ${response.status}`
            );
          }
        } else if (CONFIG.vapiWebhookUrl) {
          const response = await fetch(CONFIG.vapiWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contactId: entry.contactId,
              contactName: entry.contactName,
              phone: entry.phone,
              action: "initiate_call",
            }),
          });
          actions.push(
            response.ok ? "Triggered Vapi callback" : `Vapi webhook failed: ${response.status}`
          );
        } else {
          // Fallback: send an SMS instead of the voice call
          const sms = fiveMinNoReplySMS(firstName, CONFIG.bookingLink);
          await ghl.sendSMS(entry.contactId, sms);
          actions.push("No Vapi/Pebble URL configured — sent 5-min follow-up SMS instead");
        }
        break;
      }

      case 2: {
        // 1-hour portfolio email
        const { subject, html } = portfolioEmail(
          firstName,
          entry.stylePref,
          CONFIG.bookingLink
        );
        await ghl.sendEmail(entry.contactId, subject, html);
        actions.push("Sent 1-hour portfolio email");
        break;
      }

      case 3: {
        // 24-hour SMS
        const sms = twentyFourHourSMS(firstName, CONFIG.bookingLink);
        await ghl.sendSMS(entry.contactId, sms);
        actions.push("Sent 24-hour follow-up SMS");
        break;
      }

      case 4: {
        // 3-day SMS
        const sms = threeDaySMS(firstName, CONFIG.bookingLink);
        await ghl.sendSMS(entry.contactId, sms);
        actions.push("Sent 3-day follow-up SMS");
        break;
      }

      case 5: {
        // 7-day — add Nurture tag, mark sequence complete
        await ghl.addContactTag(entry.contactId, ["Nurture"]);
        markCompleted(entry.contactId);
        actions.push("Added Nurture tag and completed sequence");
        break;
      }

      default:
        return { sent: false, actions: [`Unknown step: ${step}`] };
    }

    advanceStep(entry.contactId, step);
    return { sent: true, actions };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Sequence] Step ${step} error for ${entry.contactId}:`, msg);
    return { sent: false, actions: [`Step ${step} error: ${msg}`] };
  }
}

/**
 * Determine which step (if any) should be sent for a given sequence entry
 * based on the current time vs. when the sequence started.
 * Returns the next step number, or null if nothing is due.
 */
export function getDueStep(entry: SequenceEntry): number | null {
  if (entry.replied || entry.completedAt) return null;

  const startMs = new Date(entry.startedAt).getTime();
  const nowMs = Date.now();
  const elapsedMs = nowMs - startMs;

  // Walk through steps in order to find the next un-sent, due step
  for (let step = entry.currentStep + 1; step < TOTAL_STEPS; step++) {
    if (entry.stepsSentAt[step]) continue; // already sent
    const requiredDelay = STEP_DELAYS_MS[step] ?? Infinity;
    if (elapsedMs >= requiredDelay) {
      return step;
    }
    break; // Steps are sequential — no point checking further
  }
  return null;
}
