"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { calculateLineTotal } from "@/lib/pricing";

type CatalogItem = {
  id: string;
  name: string;
  category: string;
  basePriceUsd: number;
  unit: string;
};

type LineData = {
  catalogItemId?: string;
  description: string;
  dimensions: string;
  doorStyle: string;
  finish: string;
  hardware: string;
  quantity: number;
  unitCost: number;
  markupPct: number;
};

type Props = {
  quoteId: string;
  lines: LineData[];
  catalog: CatalogItem[];
  defaultMarkupPct: number;
  onUpdate: () => void;
};

const emptyLine = (markupPct: number): LineData => ({
  description: "",
  dimensions: "",
  doorStyle: "",
  finish: "",
  hardware: "",
  quantity: 1,
  unitCost: 0,
  markupPct,
});

export function QuoteLineEditor({ quoteId, lines: initialLines, catalog, defaultMarkupPct, onUpdate }: Props) {
  const [lines, setLines] = useState<LineData[]>(
    initialLines.length > 0 ? initialLines.map((l) => ({
      catalogItemId: (l as Record<string, unknown>).catalogItemId as string | undefined,
      description: l.description,
      dimensions: (l as Record<string, unknown>).dimensions as string ?? "",
      doorStyle: (l as Record<string, unknown>).doorStyle as string ?? "",
      finish: (l as Record<string, unknown>).finish as string ?? "",
      hardware: (l as Record<string, unknown>).hardware as string ?? "",
      quantity: l.quantity,
      unitCost: l.unitCost,
      markupPct: l.markupPct,
    })) : [emptyLine(defaultMarkupPct)]
  );

  const updateLine = (index: number, field: string, value: string | number) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  const addFromCatalog = (item: CatalogItem) => {
    setLines((prev) => [
      ...prev,
      {
        catalogItemId: item.id,
        description: item.name,
        dimensions: "",
        doorStyle: "",
        finish: "",
        hardware: "",
        quantity: 1,
        unitCost: item.basePriceUsd,
        markupPct: defaultMarkupPct,
      },
    ]);
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const saveAll = async () => {
    await fetch(`/api/quotes/${quoteId}/lines`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lines),
    });
    onUpdate();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Line Items</h2>
        <div className="flex gap-2">
          <select
            onChange={(e) => {
              const item = catalog.find((c) => c.id === e.target.value);
              if (item) addFromCatalog(item);
              e.target.value = "";
            }}
            className="border rounded px-3 py-2"
            defaultValue=""
          >
            <option value="" disabled>Add from catalog...</option>
            {catalog.map((item) => (
              <option key={item.id} value={item.id}>
                {item.category} - {item.name} (${item.basePriceUsd})
              </option>
            ))}
          </select>
          <button
            onClick={() => setLines((prev) => [...prev, emptyLine(defaultMarkupPct)])}
            className="flex items-center gap-1 border px-3 py-2 rounded hover:bg-gray-100"
          >
            <Plus size={16} /> Custom Line
          </button>
        </div>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 px-2">Description</th>
            <th className="py-2 px-2">Dimensions</th>
            <th className="py-2 px-2">Door Style</th>
            <th className="py-2 px-2">Finish</th>
            <th className="py-2 px-2">Hardware</th>
            <th className="py-2 px-2 w-16">Qty</th>
            <th className="py-2 px-2 w-24">Unit Cost</th>
            <th className="py-2 px-2 w-20">Markup%</th>
            <th className="py-2 px-2 w-24">Line Total</th>
            <th className="py-2 px-2 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="border-b">
              <td className="py-2 px-2">
                <input type="text" value={line.description} onChange={(e) => updateLine(i, "description", e.target.value)} className="w-full border rounded px-2 py-1" />
              </td>
              <td className="py-2 px-2">
                <input type="text" value={line.dimensions} onChange={(e) => updateLine(i, "dimensions", e.target.value)} className="w-full border rounded px-2 py-1" placeholder="24x34.5x24" />
              </td>
              <td className="py-2 px-2">
                <input type="text" value={line.doorStyle} onChange={(e) => updateLine(i, "doorStyle", e.target.value)} className="w-full border rounded px-2 py-1" />
              </td>
              <td className="py-2 px-2">
                <input type="text" value={line.finish} onChange={(e) => updateLine(i, "finish", e.target.value)} className="w-full border rounded px-2 py-1" />
              </td>
              <td className="py-2 px-2">
                <input type="text" value={line.hardware} onChange={(e) => updateLine(i, "hardware", e.target.value)} className="w-full border rounded px-2 py-1" />
              </td>
              <td className="py-2 px-2">
                <input type="number" value={line.quantity} onChange={(e) => updateLine(i, "quantity", Number(e.target.value))} className="w-full border rounded px-2 py-1" min={1} />
              </td>
              <td className="py-2 px-2">
                <input type="number" value={line.unitCost} onChange={(e) => updateLine(i, "unitCost", Number(e.target.value))} className="w-full border rounded px-2 py-1" min={0} step={0.01} />
              </td>
              <td className="py-2 px-2">
                <input type="number" value={line.markupPct} onChange={(e) => updateLine(i, "markupPct", Number(e.target.value))} className="w-full border rounded px-2 py-1" min={0} max={100} />
              </td>
              <td className="py-2 px-2 font-medium">
                ${calculateLineTotal(line.unitCost, line.quantity, line.markupPct).toLocaleString()}
              </td>
              <td className="py-2 px-2">
                <button onClick={() => removeLine(i)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button onClick={saveAll} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Save Line Items
        </button>
      </div>
    </div>
  );
}
