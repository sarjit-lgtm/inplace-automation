import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET() {
  const suppliers = await db.supplier.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { catalogItems: true } } },
  });
  return NextResponse.json(suppliers);
}

const createSchema = z.object({
  name: z.string().min(1),
  markupPct: z.number().min(0).max(100),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supplier = await db.supplier.create({ data: parsed.data });
  return NextResponse.json(supplier, { status: 201 });
}
