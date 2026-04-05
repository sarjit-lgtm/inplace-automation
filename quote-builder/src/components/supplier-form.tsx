"use client";

import { useState } from "react";

type Props = {
  initial: { name: string; markupPct: number } | null;
  onSave: (data: { name: string; markupPct: number }) => void;
  onCancel: () => void;
};

export function SupplierForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [markupPct, setMarkupPct] = useState(initial?.markupPct ?? 25);

  return (
    <div className="bg-gray-50 border rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {initial ? "Edit Supplier" : "Add Supplier"}
      </h2>
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Supplier Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., SieMatic"
          />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium mb-1">Markup %</label>
          <input
            type="number"
            value={markupPct}
            onChange={(e) => setMarkupPct(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            max={100}
          />
        </div>
        <button
          onClick={() => onSave({ name, markupPct })}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
