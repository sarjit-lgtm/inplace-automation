"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye } from "lucide-react";
import { calculateQuoteTotal } from "@/lib/pricing";

type Quote = {
  id: string;
  clientName: string;
  projectAddress: string;
  supplier: { name: string };
  status: string;
  installationCost: number;
  createdAt: string;
  lines: { lineTotal: number }[];
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch("/api/quotes").then((r) => r.json()).then(setQuotes);
  }, []);

  const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    sent: "bg-blue-100 text-blue-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <Link
          href="/quotes/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={16} /> New Quote
        </Link>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3 px-4">Client</th>
            <th className="py-3 px-4">Address</th>
            <th className="py-3 px-4">Supplier</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{q.clientName}</td>
              <td className="py-3 px-4">{q.projectAddress}</td>
              <td className="py-3 px-4">{q.supplier.name}</td>
              <td className="py-3 px-4">
                ${calculateQuoteTotal(q.lines, q.installationCost).toLocaleString()}
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-sm ${statusColors[q.status] ?? ""}`}>
                  {q.status}
                </span>
              </td>
              <td className="py-3 px-4">
                {new Date(q.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <Link href={`/quotes/${q.id}`} className="text-blue-600 hover:text-blue-800">
                  <Eye size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
