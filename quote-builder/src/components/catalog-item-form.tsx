"use client";

import { useState } from "react";

type Supplier = { id: string; name: string };

type Props = {
  initial: {
    name: string;
    category: string;
    basePriceUsd: number;
    unit: string;
    description: string | null;
    supplierId: string;
  } | null;
  suppliers: Supplier[];
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
};

export function CatalogItemForm({ initial, suppliers, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [basePriceUsd, setBasePriceUsd] = useState(initial?.basePriceUsd ?? 0);
  const [unit, setUnit] = useState(initial?.unit ?? "each");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [supplierId, setSupplierId] = useState(initial?.supplierId ?? suppliers[0]?.id ?? "");

  const categories = [
    "Base Cabinets", "Wall Cabinets", "Tall Cabinets", "Corner Cabinets",
    "Drawer Units", "Islands", "Pantry", "Hardware", "Accessories", "Other"
  ];

  return (
    <div className="bg-gray-50 border rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {initial ? "Edit Catalog Item" : "Add Catalog Item"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Supplier</label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Base Cabinet 24in"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Base Price (USD)</label>
          <input
            type="number"
            value={basePriceUsd}
            onChange={(e) => setBasePriceUsd(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            step={0.01}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="each">Each</option>
            <option value="linear_ft">Linear Foot</option>
            <option value="sq_ft">Square Foot</option>
            <option value="set">Set</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Optional description"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSave({ name, category, basePriceUsd, unit, description, supplierId })}
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
