import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/db";
import { calculateQuoteTotal } from "@/lib/pricing";
import { ProposalDocument } from "@/lib/proposal-pdf";
import React from "react";

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

  const buffer = await renderToBuffer(
    React.createElement(ProposalDocument, {
      data: {
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
      },
    })
  );

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Inplace-Studio-Proposal-${quote.clientName.replace(/\s+/g, "-")}.pdf"`,
    },
  });
}
