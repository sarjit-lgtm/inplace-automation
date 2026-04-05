/**
 * GET /api/health
 *
 * Health check endpoint.
 * Returns 200 if the server is running and env vars are configured.
 */

import { NextResponse } from "next/server";
import { getAllSequences } from "@/lib/sequence-store";

export async function GET() {
  const sequences = getAllSequences();
  const activeSequences = sequences.filter((s) => !s.replied && !s.completedAt);

  const checks = {
    ghlApiKey: !!process.env.GHL_API_KEY,
    ghlLocationId: !!process.env.GHL_LOCATION_ID,
    bookingLink: !!process.env.BOOKING_LINK,
    vapiWebhookUrl: !!process.env.VAPI_WEBHOOK_URL,
    pebbleConnectWebhookUrl: !!process.env.PEBBLE_CONNECT_WEBHOOK_URL,
  };

  const allConfigured = checks.ghlApiKey && checks.ghlLocationId;

  return NextResponse.json(
    {
      status: allConfigured ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      checks,
      sequences: {
        total: sequences.length,
        active: activeSequences.length,
        completed: sequences.filter((s) => !!s.completedAt).length,
        replied: sequences.filter((s) => s.replied).length,
      },
    },
    { status: allConfigured ? 200 : 503 }
  );
}
