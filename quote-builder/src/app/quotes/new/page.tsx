"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Supplier = { id: string; name: string; markupPct: number };

export default function NewQuotePage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectAddress: "",
    supplierId: "",
    installationCost: 0,
    timelineEstimate: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/suppliers").then((r) => r.json()).then((data: Supplier[]) => {
      setSuppliers(data);
      if (data.length > 0) setForm((f) => ({ ...f, supplierId: data[0].id }));
    });
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const quote = await res.json();
    router.push(`/quotes/${quote.id}`);
  };

  const update = (field: string, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">New Quote</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client Name</label>
          <input
            type="text"
            value={form.clientName}
            onChange={(e) => update("clientName", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.clientEmail}
              onChange={(e) => update("clientEmail", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={form.clientPhone}
              onChange={(e) => update("clientPhone", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Project Address</label>
          <input
            type="text"
            value={form.projectAddress}
            onChange={(e) => update("projectAddress", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Supplier</label>
          <select
            value={form.supplierId}
            onChange={(e) => update("supplierId", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.markupPct}% markup)</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Installation Cost ($)</label>
            <input
              type="number"
              value={form.installationCost}
              onChange={(e) => update("installationCost", Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timeline Estimate</label>
            <input
              type="text"
              value={form.timelineEstimate}
              onChange={(e) => update("timelineEstimate", e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., 8-12 weeks"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Create Quote & Add Line Items
        </button>
      </div>
    </div>
  );
}
