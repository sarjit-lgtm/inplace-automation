export function calculateLineTotal(
  unitCost: number,
  quantity: number,
  markupPct: number
): number {
  const subtotal = unitCost * quantity;
  const markup = subtotal * (markupPct / 100);
  return Math.round((subtotal + markup) * 100) / 100;
}

export function calculateQuoteTotal(
  lines: { lineTotal: number }[],
  installationCost: number
): number {
  const linesTotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  return Math.round((linesTotal + installationCost) * 100) / 100;
}
