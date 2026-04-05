import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const supplierId = req.nextUrl.searchParams.get("supplierId");
  const where = supplierId ? { supplierId } : {};
  const items = await db.catalogItem.findMany({
    where,
    orderBy: [{ category: "asc" }, { name: "asc" }],
    include: { supplier: { select: { name: true } } },
  });
  return NextResponse.json(items);
}

const createSchema = z.object({
  supplierId: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  basePriceUsd: z.number().min(0),
  unit: z.string().default("each"),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const item = await db.catalogItem.create({ data: parsed.data });
  return NextResponse.json(item, { status: 201 });
}
