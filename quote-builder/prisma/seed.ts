import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const suppliers = [
    { name: "SieMatic", markupPct: 30 },
    { name: "Woodmode", markupPct: 25 },
    { name: "Renzo Restelli", markupPct: 35 },
    { name: "Signature Custom Cabinetry", markupPct: 28 },
    { name: "Local Custom", markupPct: 20 },
  ];

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: { markupPct: supplier.markupPct },
      create: supplier,
    });
  }

  console.log("Seeded suppliers:", suppliers.map((s) => s.name).join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
