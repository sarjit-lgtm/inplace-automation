import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { calculateLineTotal } from "@/lib/pricing";

const lineSchema = z.object({
  catalogItemId: z.string().optional(),
  description: z.string().min(1),
  dimensions: z.string().optional(),
  doorStyle: z.string().optional(),
  finish: z.string().optional(),
  hardware: z.string().optional(),
  quantity: z.number().int().min(1).default(1),
  unitCost: z.number().min(0),
  markupPct: z.number().min(0).max(100),
  sortOrder: z.number().int().default(0),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: quoteId } = await params;
  const body = await req.json();
  const parsed = lineSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const lineTotal = calculateLineTotal(
    parsed.data.unitCost,
    parsed.data.quantity,
    parsed.data.markupPct
  );

  const line = await db.quoteLine.create({
    data: { ...parsed.data, quoteId, lineTotal },
  });

  return NextResponse.json(line, { status: 201 });
}

const bulkSchema = z.array(lineSchema);

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: quoteId } = await params;
  const body = await req.json();
  const parsed = bulkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await db.quoteLine.deleteMany({ where: { quoteId } });

  const lines = await Promise.all(
    parsed.data.map((line, index) => {
      const lineTotal = calculateLineTotal(line.unitCost, line.quantity, line.markupPct);
      return db.quoteLine.create({
        data: { ...line, quoteId, lineTotal, sortOrder: index },
      });
    })
  );

  return NextResponse.json(lines);
}
