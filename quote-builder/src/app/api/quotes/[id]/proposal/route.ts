import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateQuoteTotal } from "@/lib/pricing";
import { generateProposalHTML } from "@/lib/proposal-template";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quote = await db.quote.findUnique({
    where: { id },
    include: {
      supplier: true,
      lines: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!quote) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const total = calculateQuoteTotal(quote.lines, quote.installationCost);

  // Derive a human-readable proposal number from the cuid (last 8 chars, uppercased)
  const proposalNumber = `IS-${id.slice(-8).toUpperCase()}`;

  const html = generateProposalHTML({
    proposalNumber,
    clientName: quote.clientName,
    clientEmail: quote.clientEmail,
    clientPhone: quote.clientPhone,
    projectAddress: quote.projectAddress,
    supplierName: quote.supplier.name,
    lines: quote.lines,
    installationCost: quote.installationCost,
    timelineEstimate: quote.timelineEstimate,
    termsAndConditions: quote.termsAndConditions,
    total,
    createdAt: quote.createdAt.toISOString(),
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
