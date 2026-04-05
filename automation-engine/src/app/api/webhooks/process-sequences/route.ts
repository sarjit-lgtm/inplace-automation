/**
 * GET /api/webhooks/process-sequences
 *
 * Cron endpoint — call this on a schedule (e.g., every minute via cron-job.org
 * or Pebble Connect) to advance any pending sequence steps.
 *
 * For each active sequence it checks whether the next step's delay has elapsed
 * and, if so, executes and records it.
 *
 * TODO: Add auth (e.g., a shared secret header) before going to production.
 */

import { NextRequest, NextResponse } from "next/server";
import { getActiveSequences } from "@/lib/sequence-store";
import { executeStep, getDueStep } from "@/lib/sequences/speed-to-lead";

export async function GET(_req: NextRequest) {
  const sequences = getActiveSequences();
  let processed = 0;
  const allActions: { contactId: string; step: number; actions: string[] }[] =
    [];

  for (const entry of sequences) {
    const dueStep = getDueStep(entry);
    if (dueStep === null) continue;

    const result = await executeStep(entry, dueStep);
    if (result.sent) {
      processed++;
    }
    allActions.push({
      contactId: entry.contactId,
      step: dueStep,
      actions: result.actions,
    });
  }

  console.log(
    `[process-sequences] Checked ${sequences.length} active sequences, processed ${processed} steps`
  );

  return NextResponse.json(
    {
      checkedSequences: sequences.length,
      processed,
      actions: allActions,
    },
    { status: 200 }
  );
}
