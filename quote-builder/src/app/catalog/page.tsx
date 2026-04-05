"use client";

import { useEffect, useState } from "react";
import { CatalogItemForm } from "@/components/catalog-item-form";
import { Pencil, Trash2, Plus } from "lucide-react";

type Supplier = { id: string; name: string };
type CatalogItem = {
  id: string;
  name: string;
  category: string;
  basePriceUsd: number;
  unit: string;
  description: string | null;
  supplierId: string;
  supplier: { name: string };
};

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filterSupplier, setFilterSupplier] = useState("");
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadItems = async () => {
    const url = filterSupplier
      ? `/api/catalog?supplierId=${filterSupplier}`
      : "/api/catalog";
    const res = await fetch(url);
    setItems(await res.json());
  };

  const loadSuppliers = async () => {
    const res = await fetch("/api/suppliers");
    setSuppliers(await res.json());
  };

  useEffect(() => { loadSuppliers(); }, []);
  useEffect(() => { loadItems(); }, [filterSupplier]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this catalog item?")) return;
    await fetch(`/api/catalog/${id}`, { method: "DELETE" });
    loadItems();
  };

  const handleSave = async (data: Record<string, unknown>) => {
    if (editing) {
      await fetch(`/api/catalog/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setEditing(null);
    setShowForm(false);
    loadItems();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catalog</h1>
        <div className="flex gap-4">
          <select
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Suppliers</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      {showForm && (
        <CatalogItemForm
          initial={editing}
          suppliers={suppliers}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setShowForm(false); }}
        />
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Supplier</th>
            <th className="py-3 px-4">Base Price</th>
            <th className="py-3 px-4">Unit</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{item.name}</td>
              <td className="py-3 px-4">{item.category}</td>
              <td className="py-3 px-4">{item.supplier.name}</td>
              <td className="py-3 px-4">${item.basePriceUsd.toLocaleString()}</td>
              <td className="py-3 px-4">{item.unit}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => { setEditing(item); setShowForm(true); }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
