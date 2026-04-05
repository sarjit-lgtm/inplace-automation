import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

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
  return NextResponse.json(quote);
}

const updateSchema = z.object({
  clientName: z.string().min(1).optional(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  projectAddress: z.string().min(1).optional(),
  supplierId: z.string().min(1).optional(),
  installationCost: z.number().min(0).optional(),
  timelineEstimate: z.string().optional(),
  termsAndConditions: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["draft", "sent", "approved", "rejected"]).optional(),
  ghlContactId: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const quote = await db.quote.update({ where: { id }, data: parsed.data });

  // After the quote is updated, if status changed to "sent":
  if (parsed.data.status === "sent") {
    try {
      const fullQuote = await db.quote.findUnique({
        where: { id },
        include: { supplier: true, lines: true },
      });
      if (fullQuote?.ghlContactId) {
        const { sendEmail, updateContactCustomField } = await import("@/lib/ghl");
        const { calculateQuoteTotal } = await import("@/lib/pricing");
        const total = calculateQuoteTotal(fullQuote.lines, fullQuote.installationCost);

        await updateContactCustomField(fullQuote.ghlContactId, {
          quote_amount: total,
        });

        const proposalUrl = `${process.env.NEXTAUTH_URL}/api/quotes/${id}/pdf`;
        await sendEmail(
          fullQuote.ghlContactId,
          `Your Kitchen Design Proposal from Inplace Studio`,
          `<p>Hi ${fullQuote.clientName},</p>
           <p>Thank you for choosing Inplace Studio! Please find your kitchen design proposal below:</p>
           <p><a href="${proposalUrl}" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;">View Your Proposal</a></p>
           <p>If you have any questions, don't hesitate to reach out.</p>
           <p>Warm regards,<br>The Inplace Studio Team</p>`
        );
      }
    } catch (err) {
      console.error("GHL integration error:", err);
    }
  }

  return NextResponse.json(quote);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.quote.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
