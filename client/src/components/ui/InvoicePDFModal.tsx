import React from "react";
import { Printer, Download, Mail, CheckCircle, FileText } from "lucide-react";
import { Modal, Button, Badge } from "./Primitives";
import { Invoice, formatINR } from "../../data/demoData";
import { useApp } from "../../context/AppContext";

export default function InvoicePDFModal({
  isOpen, onClose, invoice
}: {
  isOpen: boolean; onClose: () => void; invoice: Invoice | null;
}) {
  const { activeBusiness, showToast } = useApp();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Invoice ${invoice.number} downloaded as PDF`, "success");
  };

  const handleSendEmail = () => {
    showToast(`Invoice ${invoice.number} sent to ${invoice.customer}`, "info");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Invoice Preview — ${invoice.number}`} maxWidth="max-w-3xl">
      {/* Top Action Toolbar */}
      <div className="flex items-center justify-between p-3 mb-6 bg-white/70 border border-bronze/20 rounded-lg">
        <div className="flex items-center gap-2">
          <Badge tone={invoice.status === "paid" ? "success" : invoice.status === "overdue" ? "danger" : "warning"}>
            {invoice.status.toUpperCase()}
          </Badge>
          <span className="text-xs text-bronze font-medium">Due: {invoice.due}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" icon={Printer} onClick={handlePrint}>Print</Button>
          <Button size="sm" variant="secondary" icon={Download} onClick={handleDownload}>Download PDF</Button>
          <Button size="sm" variant="primary" icon={Mail} onClick={handleSendEmail}>Send to Customer</Button>
        </div>
      </div>

      {/* Printable Paper Document Container */}
      <div id="printable-invoice" className="bg-white p-8 rounded-lg border border-bronze/30 shadow-card text-charcoal flex flex-col gap-8">
        {/* Header Branding & Invoice Details */}
        <div className="flex items-start justify-between border-b border-bronze/20 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-9 h-9 rounded-lg bg-espresso text-gold flex items-center justify-center font-display font-bold text-lg">
                {activeBusiness.logoInitial}
              </div>
              <h2 className="font-display text-2xl font-bold text-charcoal">{activeBusiness.name}</h2>
            </div>
            <p className="text-xs text-bronze">{activeBusiness.tagline}</p>
            <p className="text-xs text-bronze">{activeBusiness.location} • {activeBusiness.phone}</p>
          </div>

          <div className="text-right">
            <h1 className="font-display text-2xl font-bold text-espresso">INVOICE</h1>
            <p className="text-sm font-semibold text-charcoal">{invoice.number}</p>
            <p className="text-xs text-bronze">Date: {invoice.date || "2026-09-01"}</p>
            <p className="text-xs text-bronze">Due Date: {invoice.due}</p>
          </div>
        </div>

        {/* Bill To Info */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-semibold text-bronze uppercase tracking-wider block mb-1">Billed To</span>
            <p className="font-semibold text-sm text-charcoal">{invoice.customer}</p>
            <p className="text-bronze">Registered Business Customer</p>
          </div>
          <div className="text-right">
            <span className="font-semibold text-bronze uppercase tracking-wider block mb-1">Payment Method</span>
            <p className="font-semibold text-sm text-charcoal">UPI / Direct Bank Transfer</p>
            <p className="text-bronze">Currency: INR (₹)</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-bronze/30 text-bronze uppercase font-semibold">
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Price</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              {invoice.items.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="py-3 px-3 font-medium text-charcoal">{item.description}</td>
                  <td className="py-3 px-3 text-center">{item.quantity}</td>
                  <td className="py-3 px-3 text-right">{formatINR(item.unitPrice)}</td>
                  <td className="py-3 px-3 text-right font-semibold">{formatINR(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex justify-end pt-4 border-t border-bronze/20">
          <div className="w-64 flex flex-col gap-2 text-xs">
            <div className="flex justify-between text-bronze">
              <span>Subtotal:</span>
              <span className="font-semibold text-charcoal">{formatINR(invoice.subtotal)}</span>
            </div>
            {invoice.tax > 0 && (
              <div className="flex justify-between text-bronze">
                <span>Tax / GST (5%):</span>
                <span className="font-semibold text-charcoal">{formatINR(invoice.tax)}</span>
              </div>
            )}
            {invoice.discount > 0 && (
              <div className="flex justify-between text-bronze">
                <span>Discount:</span>
                <span className="font-semibold text-[#0891B2]">- {formatINR(invoice.discount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-bronze/30 font-display text-base font-bold text-espresso">
              <span>Total Amount:</span>
              <span>{formatINR(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Notes & Footer */}
        <div className="pt-6 border-t border-bronze/15 text-center text-xs text-bronze">
          <p className="font-medium text-charcoal">Thank you for your business with {activeBusiness.name}!</p>
          <p className="mt-1">Powered by BizFlow Small Business Management Platform • www.bizflow.in</p>
        </div>
      </div>
    </Modal>
  );
}
