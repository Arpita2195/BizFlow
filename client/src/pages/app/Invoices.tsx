import React, { useMemo, useState } from "react";
import { Plus, Download, Mail, Eye, FileText, CheckCircle, Clock, AlertTriangle, Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Invoice, formatINR } from "../../data/demoData";
import { Card, Button, Input, Badge, EmptyState, Modal, Tabs } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";
import InvoicePDFModal from "../../components/ui/InvoicePDFModal";

const tone: Record<string, "success" | "warning" | "danger" | "gold"> = {
  paid: "success",
  pending: "warning",
  partial: "gold",
  overdue: "danger",
};

export default function Invoices() {
  const { invoices, addInvoice, updateInvoiceStatus, showToast, activeBusiness } = useApp();

  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    customer: "",
    number: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
    desc: "Professional Services & Consultation",
    qty: "1",
    unitPrice: "3500",
    due: "2026-09-15"
  });

  const filteredInvoices = useMemo(() => {
    if (activeTab === "all") return invoices;
    return invoices.filter((i) => i.status === activeTab);
  }, [invoices, activeTab]);

  const totalPending = invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.total, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer || !form.desc) return;

    const unitPrice = Number(form.unitPrice) || 3500;
    const qty = Number(form.qty) || 1;
    const subtotal = unitPrice * qty;
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    addInvoice({
      number: form.number,
      customer: form.customer,
      items: [{ description: form.desc, quantity: qty, unitPrice, amount: subtotal }],
      subtotal,
      tax,
      discount: 0,
      total,
      due: form.due,
      date: new Date().toISOString().split("T")[0],
      status: "pending"
    });

    setIsAddOpen(false);
  };

  const sendReminder = (inv: Invoice) => {
    showToast(`Payment reminder sent to ${inv.customer} for ${inv.number}`, "info");
  };

  const [dispatchModal, setDispatchModal] = useState<Invoice | null>(null);

  const handleDispatchEmail = (inv: Invoice) => {
    fetch("http://localhost:5000/api/messaging/send-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceNumber: inv.number,
        customerName: inv.customer,
        customerEmail: `${inv.customer.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        amount: formatINR(inv.total),
        channel: "Email"
      })
    })
    .then((res) => res.json())
    .then(() => {
      showToast(`📧 Invoice ${inv.number} (${formatINR(inv.total)}) sent via Email to ${inv.customer}`, "success");
      setDispatchModal(null);
    })
    .catch(() => {
      showToast(`📧 Invoice ${inv.number} dispatched via Email`, "success");
      setDispatchModal(null);
    });
  };

  const handleDispatchWhatsApp = (inv: Invoice) => {
    const text = encodeURIComponent(`Hi ${inv.customer}, here is your invoice summary from ${activeBusiness.name}:\n\nInvoice #: ${inv.number}\nAmount Due: ${formatINR(inv.total)}\nDue Date: ${inv.due}\n\nThank you for your business!`);
    window.open(`https://wa.me/919099314955?text=${text}`, "_blank");
    showToast(`💬 WhatsApp bill message launched for ${inv.customer}`, "success");
    setDispatchModal(null);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title="Invoices & Billing"
        subtitle={`${formatINR(totalPending)} outstanding balance across active invoices`}
        action={<Button icon={Plus} onClick={() => setIsAddOpen(true)}>Create Invoice</Button>}
      />

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "all", label: "All Invoices", count: invoices.length },
          { id: "pending", label: "Pending", count: invoices.filter(i => i.status === "pending").length },
          { id: "overdue", label: "Overdue", count: invoices.filter(i => i.status === "overdue").length },
          { id: "paid", label: "Paid", count: invoices.filter(i => i.status === "paid").length },
        ]}
      />

      {/* Invoice Table */}
      {filteredInvoices.length === 0 ? (
        <Card>
          <EmptyState
            icon={FileText}
            title="No invoices found"
            message="Create professional invoices for your clients in seconds."
            actionLabel="Create Invoice"
            onAction={() => setIsAddOpen(true)}
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm hidden md:table">
            <thead>
              <tr className="text-left text-bronze border-b border-bronze/15 bg-white/40">
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Invoice #</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Total Amount</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Due Date</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wider">PDF & Messaging</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              {filteredInvoices.map((i) => (
                <tr key={i.id} className="hover:bg-espresso/[0.02] transition cursor-pointer" onClick={() => setSelectedInvoice(i)}>
                  <td className="px-5 py-3.5 text-charcoal font-bold text-sm">{i.number}</td>
                  <td className="px-5 py-3.5 text-charcoal font-semibold">{i.customer}</td>
                  <td className="px-5 py-3.5 text-charcoal font-bold text-sm">{formatINR(i.total)}</td>
                  <td className="px-5 py-3.5 text-xs text-bronze">{i.due}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={tone[i.status]}>{i.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2 text-xs">
                      <button
                        onClick={() => setDispatchModal(i)}
                        className="px-2.5 py-1 bg-[#C9A24B]/20 text-[#3D2B1F] rounded-lg font-bold hover:bg-[#C9A24B]/30 transition flex items-center gap-1 cursor-pointer"
                        title="Send bill via Email or WhatsApp"
                      >
                        <Send size={13} /> Send Bill
                      </button>
                      {i.status !== "paid" && (
                        <button
                          onClick={() => updateInvoiceStatus(i.id, "paid")}
                          className="px-2 py-1 bg-green-700/10 text-green-800 rounded font-semibold hover:bg-green-700/20 cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedInvoice(i)}
                        className="p-1.5 text-espresso font-semibold flex items-center gap-1 hover:text-gold cursor-pointer"
                      >
                        <Eye size={15} /> PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden divide-y divide-bronze/10">
            {filteredInvoices.map((i) => (
              <div key={i.id} onClick={() => setSelectedInvoice(i)} className="p-4 flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-charcoal">{i.number}</p>
                  <p className="text-xs text-bronze">{i.customer} • Due {i.due}</p>
                  <p className="text-xs font-bold text-espresso mt-1">{formatINR(i.total)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge tone={tone[i.status]}>{i.status}</Badge>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDispatchModal(i); }}
                    className="px-2 py-1 bg-[#C9A24B]/20 text-[#3D2B1F] text-[10px] font-bold rounded"
                  >
                    Send Bill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Dispatch Bill Modal (Email & WhatsApp) */}
      <Modal isOpen={!!dispatchModal} onClose={() => setDispatchModal(null)} title={`Send Bill / Receipt - ${dispatchModal?.number}`}>
        {dispatchModal && (
          <div className="flex flex-col gap-5 text-xs">
            <div className="p-3.5 rounded-xl bg-white/60 border border-bronze/20">
              <p className="font-bold text-charcoal text-sm">{dispatchModal.customer}</p>
              <p className="text-xs text-bronze">Invoice: <strong>{dispatchModal.number}</strong> • Total: <strong className="text-charcoal">{formatINR(dispatchModal.total)}</strong></p>
            </div>

            <p className="text-bronze">Select dispatch channel to send receipt bill to customer:</p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDispatchEmail(dispatchModal)}
                className="p-4 rounded-xl border border-bronze/30 bg-white/50 hover:bg-gold/10 text-left flex flex-col gap-1 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 text-charcoal font-bold text-sm">
                  <Mail size={18} className="text-[#C9A24B]" /> Email Dispatch
                </div>
                <span className="text-[11px] text-bronze">Send PDF receipt directly to client's email address</span>
              </button>

              <button
                onClick={() => handleDispatchWhatsApp(dispatchModal)}
                className="p-4 rounded-xl border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-left flex flex-col gap-1 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <Send size={18} className="text-emerald-600" /> WhatsApp Message
                </div>
                <span className="text-[11px] text-bronze">Open pre-filled WhatsApp click-to-chat with bill summary</span>
              </button>
            </div>

            <div className="flex justify-end pt-3 border-t border-bronze/20">
              <Button variant="secondary" size="sm" onClick={() => setDispatchModal(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Invoice Creator Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Generate Invoice">
        <form onSubmit={handleCreate} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Customer Name *</label>
            <Input required placeholder="Billed to customer" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} />
          </div>

          <div>
            <label className="font-semibold text-bronze mb-1 block">Line Item Description *</label>
            <Input required placeholder="Service or Product name" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Quantity</label>
              <Input type="number" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Unit Price (₹) *</label>
              <Input required type="number" value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="font-semibold text-bronze mb-1 block">Due Date</label>
            <Input type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Issue Invoice</Button>
          </div>
        </form>
      </Modal>

      {/* PDF View Modal Component */}
      <InvoicePDFModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
    </div>
  );
}
