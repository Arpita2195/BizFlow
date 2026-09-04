import React, { useState } from "react";
import { Plus, Wallet, PieChart as PieIcon, ArrowDownRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatINR } from "../../data/demoData";
import { Card, Button, Input, Badge, EmptyState, Modal, Select } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const categoryColors: Record<string, string> = {
  Rent: "#0F172A",
  Salary: "#3B82F6",
  Inventory: "#64748B",
  Marketing: "#22D3EE",
  Utilities: "#22D3EE",
  Software: "#0F172A",
};

export default function Expenses() {
  const { expenses, addExpense } = useApp();

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    category: "Rent",
    amount: "45000",
    description: "Monthly Workspace Operational Cost",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "UPI"
  });

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

  const byCategory = Object.values(
    expenses.reduce((acc: Record<string, { name: string; value: number }>, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 };
      acc[e.category].value += e.amount;
      return acc;
    }, {})
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount) return;

    addExpense({
      category: form.category,
      amount: Number(form.amount) || 1000,
      date: form.date,
      description: form.description,
      paymentMethod: form.paymentMethod
    });

    setIsAddOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title="Expense Tracker"
        subtitle={`${formatINR(totalExpense)} total business outflow recorded`}
        action={<Button icon={Plus} onClick={() => setIsAddOpen(true)}>Log Expense</Button>}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Expense List Table */}
        <Card className="lg:col-span-2 overflow-hidden">
          {expenses.length > 0 ? (
            <table className="w-full text-sm hidden md:table">
              <thead>
                <tr className="text-left text-bronze border-b border-bronze/15 bg-white/40">
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Description</th>
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Method</th>
                  <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bronze/10">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-espresso/[0.02] transition">
                    <td className="px-5 py-3.5 text-charcoal font-bold text-sm">{e.description}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone="gold">{e.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-bronze">{e.paymentMethod || "UPI"}</td>
                    <td className="px-5 py-3.5 text-xs text-bronze">{e.date}</td>
                    <td className="px-5 py-3.5 text-right font-bold text-sm text-[#0F172A]">{formatINR(e.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              icon={Wallet}
              title="No Expenses Logged"
              message="Record operational costs and expenses to calculate exact net profit margin."
              actionLabel="+ Log Expense"
              onAction={() => setIsAddOpen(true)}
            />
          )}

          {/* Mobile view */}
          <div className="md:hidden divide-y divide-bronze/10">
            {expenses.map((e) => (
              <div key={e.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-charcoal">{e.description}</p>
                  <p className="text-xs text-bronze">{e.category} • {e.date}</p>
                </div>
                <p className="text-sm font-bold text-[#0F172A]">{formatINR(e.amount)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Breakdown Chart */}
        <Card className="p-5 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-charcoal flex items-center gap-2">
            <PieIcon size={18} className="text-gold" /> Category Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {byCategory.map((c, i) => (
                  <Cell key={i} fill={categoryColors[c.name] || "#8C7A5B"} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => formatINR(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {byCategory.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs border-b border-bronze/10 pb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: categoryColors[c.name] || "#8C7A5B" }} />
                  <span className="text-charcoal font-medium">{c.name}</span>
                </div>
                <span className="text-charcoal font-bold">{formatINR(c.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Log Expense Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Log New Expense">
        <form onSubmit={handleCreate} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Expense Category *</label>
            <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="Rent">Rent</option>
              <option value="Salary">Staff Payouts</option>
              <option value="Inventory">Inventory Restock</option>
              <option value="Marketing">Marketing / Meta Ads</option>
              <option value="Utilities">Electricity & Utilities</option>
              <option value="Software">Software & Cloud</option>
            </Select>
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Amount (₹) *</label>
            <Input required type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Description *</label>
            <Input required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Payment Method</label>
            <Select value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })}>
              <option value="UPI">UPI Payment</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="Cash">Cash</option>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Log Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
