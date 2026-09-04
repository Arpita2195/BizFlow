import React, { useState } from "react";
import { Plus, Receipt, ArrowRight, CheckCircle, FileText, Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatINR } from "../../data/demoData";
import { Card, Button, Input, Badge, EmptyState, Modal } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

const tone: Record<string, "success" | "warning" | "danger" | "gold"> = {
  draft: "warning",
  sent: "gold",
  accepted: "success",
  converted: "gold",
};

export default function Quotations() {
  const { quotations, addQuotation, convertQuoteToInvoice } = useApp();

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    customer: "",
    number: `QT-2026-${Math.floor(100 + Math.random() * 900)}`,
    desc: "Comprehensive Package Estimate",
    total: "15500",
    validityDate: "2026-09-20"
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer || !form.desc) return;

    const total = Number(form.total) || 15500;
    addQuotation({
      number: form.number,
      customer: form.customer,
      items: [{ description: form.desc, quantity: 1, unitPrice: total, amount: total }],
      total,
      validityDate: form.validityDate,
      date: new Date().toISOString().split("T")[0],
      status: "sent"
    });

    setIsAddOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title="Quotations & Proposals"
        subtitle="Send formal cost estimates and convert accepted quotes into invoices with 1 click"
        action={<Button icon={Plus} onClick={() => setIsAddOpen(true)}>New Quotation</Button>}
      />

      {quotations.length === 0 ? (
        <Card>
          <EmptyState
            icon={Receipt}
            title="No quotations yet"
            message="Create a quotation to send formal price estimates to prospective clients."
            actionLabel="New Quotation"
            onAction={() => setIsAddOpen(true)}
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm hidden md:table">
            <thead>
              <tr className="text-left text-bronze border-b border-bronze/15 bg-white/40">
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Quotation #</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Estimated Total</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Valid Until</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              {quotations.map((q) => (
                <tr key={q.id} className="hover:bg-espresso/[0.02] transition">
                  <td className="px-5 py-3.5 text-charcoal font-bold text-sm">{q.number}</td>
                  <td className="px-5 py-3.5 text-charcoal font-semibold">{q.customer}</td>
                  <td className="px-5 py-3.5 text-charcoal font-bold text-sm">{formatINR(q.total)}</td>
                  <td className="px-5 py-3.5 text-xs text-bronze">{q.validityDate}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={tone[q.status] || "gold"}>{q.status.toUpperCase()}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {q.status !== "converted" ? (
                      <Button
                        size="sm"
                        variant="primary"
                        icon={ArrowRight}
                        onClick={() => convertQuoteToInvoice(q.id)}
                      >
                        Convert to Invoice
                      </Button>
                    ) : (
                      <span className="text-xs text-[#0891B2] font-semibold flex items-center justify-end gap-1">
                        <CheckCircle size={14} /> Converted to Invoice
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden divide-y divide-bronze/10">
            {quotations.map((q) => (
              <div key={q.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-charcoal">{q.number}</p>
                  <p className="text-xs text-bronze">{q.customer} • Valid {q.validityDate}</p>
                  <p className="text-xs font-bold text-espresso mt-1">{formatINR(q.total)}</p>
                </div>
                {q.status !== "converted" ? (
                  <Button size="sm" onClick={() => convertQuoteToInvoice(q.id)}>Convert</Button>
                ) : (
                  <Badge tone="success">Converted</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* New Quotation Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create Proposal Quotation">
        <form onSubmit={handleCreate} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Customer Name *</label>
            <Input required placeholder="Client name" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Package / Proposal Scope *</label>
            <Input required placeholder="Package details" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Estimated Total (₹) *</label>
              <Input required type="number" value={form.total} onChange={e => setForm({ ...form, total: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Valid Until Date</label>
              <Input type="date" value={form.validityDate} onChange={e => setForm({ ...form, validityDate: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Issue Quotation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
