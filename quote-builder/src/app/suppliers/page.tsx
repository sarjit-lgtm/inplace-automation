"use client";

import { useEffect, useState } from "react";
import { SupplierForm } from "@/components/supplier-form";
import { Pencil, Trash2, Plus } from "lucide-react";

type Supplier = {
  id: string;
  name: string;
  markupPct: number;
  _count: { catalogItems: number };
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const res = await fetch("/api/suppliers");
    setSuppliers(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this supplier and all its catalog items?")) return;
    await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async (data: { name: string; markupPct: number }) => {
    if (editing) {
      await fetch(`/api/suppliers/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setEditing(null);
    setShowForm(false);
    load();
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={16} /> Add Supplier
        </button>
      </div>

      {showForm && (
        <SupplierForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setShowForm(false); }}
        />
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Markup %</th>
            <th className="py-3 px-4">Catalog Items</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{s.name}</td>
              <td className="py-3 px-4">{s.markupPct}%</td>
              <td className="py-3 px-4">{s._count.catalogItems}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => { setEditing(s); setShowForm(true); }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
