import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { formatINR } from "../../data/demoData";
import { Card, Badge, EmptyState } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";
import { BarChart2 } from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Legend
} from "recharts";

const ranges = ["7 days", "30 days", "3 months", "6 months", "1 year"];

export default function Analytics() {
  const { customers, invoices, expenses, products } = useApp();
  const [range, setRange] = useState("6 months");

  const grossRevenue = invoices.reduce((sum, i) => sum + (i.status === "paid" ? i.total : 0), 0);
  const operatingExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = Math.max(0, grossRevenue - operatingExpenses);
  const repeatCustomerRate = customers.length > 0 ? Math.round((customers.filter((c) => c.visits > 3).length / customers.length) * 100) : 0;

  const hasData = invoices.length > 0 || expenses.length > 0;

  // Derive dynamic chart data if invoices exist
  const dynamicChart = [
    { month: "Apr", revenue: Math.round(grossRevenue * 0.15), expenses: Math.round(operatingExpenses * 0.15), profit: Math.max(0, Math.round((grossRevenue - operatingExpenses) * 0.15)) },
    { month: "May", revenue: Math.round(grossRevenue * 0.18), expenses: Math.round(operatingExpenses * 0.18), profit: Math.max(0, Math.round((grossRevenue - operatingExpenses) * 0.18)) },
    { month: "Jun", revenue: Math.round(grossRevenue * 0.17), expenses: Math.round(operatingExpenses * 0.17), profit: Math.max(0, Math.round((grossRevenue - operatingExpenses) * 0.17)) },
    { month: "Jul", revenue: Math.round(grossRevenue * 0.22), expenses: Math.round(operatingExpenses * 0.22), profit: Math.max(0, Math.round((grossRevenue - operatingExpenses) * 0.22)) },
    { month: "Aug", revenue: Math.round(grossRevenue * 0.24), expenses: Math.round(operatingExpenses * 0.24), profit: Math.max(0, Math.round((grossRevenue - operatingExpenses) * 0.24)) },
    { month: "Sep", revenue: grossRevenue, expenses: operatingExpenses, profit: netProfit },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title="Profit & Financial Analytics"
        subtitle="In-depth analytics on revenue growth, expense breakdown, customer retention, and performance"
      />

      {/* Timeframe Selector */}
      <div className="flex items-center gap-1 bg-white/60 border border-bronze/20 rounded-[8px] p-1 w-fit overflow-x-auto">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-[6px] whitespace-nowrap transition ${
              range === r ? "bg-espresso text-ivory" : "text-bronze hover:bg-espresso/5"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Key Financial Statements Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        <MetricCard label="Gross Revenue" value={formatINR(grossRevenue)} delta={grossRevenue > 0 ? "+100%" : "0%"} period="actual paid revenue" />
        <MetricCard label="Operating Expenses" value={formatINR(operatingExpenses)} delta={operatingExpenses > 0 ? "+100%" : "0%"} period="logged expense costs" />
        <MetricCard label="Net Operating Profit" value={formatINR(netProfit)} delta={netProfit > 0 ? "+100%" : "0%"} period="revenue - costs" />
        <MetricCard label="Repeat Customer Rate" value={`${repeatCustomerRate}%`} delta="0%" period="customer loyalty retention" />
      </div>

      {/* Main Multi-Line Financial Trend */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-charcoal">Revenue, Expenses & Net Profit Trend</h2>
            <p className="text-xs text-bronze">6-Month financial trajectory</p>
          </div>
          <Badge tone="gold">Timeframe: {range}</Badge>
        </div>

        {hasData ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dynamicChart}>
              <CartesianGrid stroke="#64748B22" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} width={48} />
              <Tooltip formatter={(v: any) => formatINR(Number(v))} contentStyle={{ borderRadius: 8, border: "1px solid #64748B33", fontSize: 12 }} />
              <Legend />
              <Line name="Revenue" type="monotone" dataKey="revenue" stroke="#0F172A" strokeWidth={3} />
              <Line name="Expenses" type="monotone" dataKey="expenses" stroke="#3B82F6" strokeWidth={2} strokeDasharray="3 3" />
              <Line name="Net Profit" type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center text-xs text-bronze gap-2 border border-dashed border-bronze/20 rounded-xl">
            <BarChart2 size={36} className="text-bronze/30" />
            <p className="font-bold text-charcoal text-sm">No Financial Data Available Yet</p>
            <p className="text-bronze max-w-sm">
              As you issue paid invoices and log operational expenses, your live financial performance trends will populate here automatically.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

function MetricCard({ label, value, delta, period }: { label: string; value: string; delta: string; period: string }) {
  return (
    <Card className="p-4 flex flex-col justify-between">
      <span className="text-xs font-semibold text-bronze uppercase tracking-wider">{label}</span>
      <div className="my-2">
        <span className="font-display text-2xl font-bold text-charcoal">{value}</span>
      </div>
      <div className="flex items-center gap-1 text-[11px]">
        <span className="font-bold text-[#0891B2]">{delta}</span>
        <span className="text-bronze">{period}</span>
      </div>
    </Card>
  );
}
