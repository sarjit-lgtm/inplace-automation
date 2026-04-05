import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const where = status ? { status } : {};
  const quotes = await db.quote.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      supplier: { select: { name: true } },
      lines: { orderBy: { sortOrder: "asc" } },
    },
  });
  return NextResponse.json(quotes);
}

const createSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  projectAddress: z.string().min(1),
  supplierId: z.string().min(1),
  installationCost: z.number().min(0).default(0),
  timelineEstimate: z.string().optional(),
  termsAndConditions: z.string().optional(),
  notes: z.string().optional(),
  ghlContactId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const quote = await db.quote.create({ data: parsed.data });
  return NextResponse.json(quote, { status: 201 });
}
