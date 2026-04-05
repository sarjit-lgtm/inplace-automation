"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, BookOpen, Truck, Eye } from "lucide-react";
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

type Stats = {
  total: number;
  draft: number;
  sent: number;
  approved: number;
};

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  sent: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quotes")
      .then((r) => r.json())
      .then((data: Quote[]) => {
        setQuotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats: Stats = {
    total: quotes.length,
    draft: quotes.filter((q) => q.status === "draft").length,
    sent: quotes.filter((q) => q.status === "sent").length,
    approved: quotes.filter((q) => q.status === "approved").length,
  };

  const recentQuotes = quotes.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Inplace Studio Quote Builder</h1>
        <p className="text-gray-500 mt-1">Manage your quotes, catalog, and suppliers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500 mb-1">Total Quotes</p>
          <p className="text-3xl font-bold">{loading ? "—" : stats.total}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500 mb-1">Draft</p>
          <p className="text-3xl font-bold text-gray-600">{loading ? "—" : stats.draft}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500 mb-1">Sent</p>
          <p className="text-3xl font-bold text-blue-600">{loading ? "—" : stats.sent}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500 mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">{loading ? "—" : stats.approved}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Link
          href="/quotes/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={16} /> New Quote
        </Link>
        <Link
          href="/catalog"
          className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
        >
          <BookOpen size={16} /> Manage Catalog
        </Link>
        <Link
          href="/suppliers"
          className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
        >
          <Truck size={16} /> Manage Suppliers
        </Link>
      </div>

      {/* Recent quotes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Quotes</h2>
          <Link href="/quotes" className="text-sm text-gray-500 hover:text-black">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : recentQuotes.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-lg p-10 text-center text-gray-400">
            No quotes yet.{" "}
            <Link href="/quotes/new" className="text-black underline">
              Create your first quote
            </Link>
            .
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3 px-4 text-sm font-medium text-gray-500">Client</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500">Address</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {recentQuotes.map((q) => (
                <tr key={q.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{q.clientName}</td>
                  <td className="py-3 px-4 text-gray-600">{q.projectAddress}</td>
                  <td className="py-3 px-4">
                    ${calculateQuoteTotal(q.lines, q.installationCost).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-sm ${statusColors[q.status] ?? ""}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
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
        )}
      </div>
    </div>
  );
}
