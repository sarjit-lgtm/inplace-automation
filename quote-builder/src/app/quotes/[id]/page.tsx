"use client";

import { useEffect, useState, use } from "react";
import { QuoteLineEditor } from "@/components/quote-line-editor";
import { calculateQuoteTotal } from "@/lib/pricing";

type Supplier = { id: string; name: string; markupPct: number };
type QuoteLine = {
  id: string;
  description: string;
  dimensions: string | null;
  doorStyle: string | null;
  finish: string | null;
  hardware: string | null;
  quantity: number;
  unitCost: number;
  markupPct: number;
  lineTotal: number;
  catalogItemId: string | null;
};
type Quote = {
  id: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  projectAddress: string;
  supplier: Supplier;
  supplierId: string;
  installationCost: number;
  timelineEstimate: string | null;
  notes: string | null;
  status: string;
  lines: QuoteLine[];
};
type CatalogItem = {
  id: string;
  name: string;
  category: string;
  basePriceUsd: number;
  unit: string;
};

export default function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  const load = async () => {
    const res = await fetch(`/api/quotes/${id}`);
    const q = await res.json();
    setQuote(q);
    const catRes = await fetch(`/api/catalog?supplierId=${q.supplierId}`);
    setCatalog(await catRes.json());
  };

  useEffect(() => { load(); }, [id]);

  if (!quote) return <div className="p-8">Loading...</div>;

  const total = calculateQuoteTotal(quote.lines, quote.installationCost);

  const handleSendProposal = async () => {
    await fetch(`/api/quotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sent" }),
    });
    load();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{quote.clientName}</h1>
          <p className="text-gray-600">{quote.projectAddress}</p>
          <p className="text-gray-600">Supplier: {quote.supplier.name} ({quote.supplier.markupPct}% markup)</p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/api/quotes/${id}/pdf`}
            target="_blank"
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Download PDF
          </a>
          {quote.status === "draft" && (
            <button
              onClick={handleSendProposal}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Send Proposal
            </button>
          )}
        </div>
      </div>

      <QuoteLineEditor
        quoteId={id}
        lines={quote.lines}
        catalog={catalog}
        defaultMarkupPct={quote.supplier.markupPct}
        onUpdate={load}
      />

      <div className="mt-6 border-t pt-4 text-right space-y-1">
        <p className="text-gray-600">
          Cabinets Subtotal: $
          {quote.lines.reduce((s, l) => s + l.lineTotal, 0).toLocaleString()}
        </p>
        <p className="text-gray-600">
          Installation: ${quote.installationCost.toLocaleString()}
        </p>
        <p className="text-xl font-bold">
          Total Investment: ${total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
