import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee, Clock, Users, TrendingUp, Plus,
  AlertTriangle, ArrowRight, Wallet
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Card, StatCard, Badge, Button, Modal, Input, Select } from "../../components/ui/Primitives";
import { revenueTrend, formatINR, getDemoDataForBusiness } from "../../data/demoData";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar
} from "recharts";

export default function Dashboard() {
  const {
    activeBusiness,
    terminology,
    user,
    customers,
    addCustomer,
    bookings,
    addBooking,
    products,
    addProduct,
    invoices,
    addInvoice,
    expenses,
    addExpense,
    showToast
  } = useApp();

  // Quick Action Modal States
  const [activeModal, setActiveModal] = useState<"customer" | "booking" | "invoice" | "product" | "expense" | null>(null);

  // Form States
  const [custForm, setCustForm] = useState({ name: "", phone: "", email: "", tags: "Regular" });
  const [bookForm, setBookForm] = useState({ customer: "", service: "", staff: "Neha Joshi", date: "2026-09-04", time: "11:00 AM", price: "1800" });
  const [invForm, setInvForm] = useState({ customer: "", number: `INV-2026-${Math.floor(100 + Math.random() * 900)}`, desc: "Service & Consultation", amount: "2500", due: "2026-09-15" });
  const [prodForm, setProdForm] = useState({ name: "", category: "General", price: "500", cost: "250", stock: "10", minStock: "5" });
  const [expForm, setExpForm] = useState({ category: "Rent", amount: "5000", description: "Operational Expense", date: "2026-09-04", paymentMethod: "UPI" });

  const lowStock = products.filter(p => p.stock <= p.minStock);
  const pendingInvoices = invoices.filter(i => i.status === "pending" || i.status === "overdue");
  const todayBookings = bookings.filter(b => b.date === "2026-09-04");

  const totalRevenue = invoices.reduce((sum, i) => sum + (i.status === "paid" ? i.total : 0), 0);
  const totalPending = pendingInvoices.reduce((sum, i) => sum + i.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = Math.max(0, totalRevenue - totalExpenses);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custForm.name || !custForm.phone) return;
    addCustomer({
      name: custForm.name,
      phone: custForm.phone,
      email: custForm.email || `${custForm.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      totalSpent: 0,
      visits: 1,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "active",
      tags: [custForm.tags]
    });
    setCustForm({ name: "", phone: "", email: "", tags: "Regular" });
    setActiveModal(null);
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.customer || !bookForm.service) return;
    addBooking({
      customer: bookForm.customer,
      service: bookForm.service,
      staff: bookForm.staff,
      date: bookForm.date,
      time: bookForm.time,
      price: Number(bookForm.price) || 1500,
      status: "confirmed"
    });
    setBookForm({ customer: "", service: "", staff: "Neha Joshi", date: "2026-09-04", time: "11:00 AM", price: "1800" });
    setActiveModal(null);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invForm.customer) return;
    const amt = Number(invForm.amount) || 2000;
    addInvoice({
      number: invForm.number,
      customer: invForm.customer,
      items: [{ description: invForm.desc, quantity: 1, unitPrice: amt, amount: amt }],
      subtotal: amt,
      tax: amt * 0.05,
      discount: 0,
      total: amt * 1.05,
      due: invForm.due,
      date: new Date().toISOString().split("T")[0],
      status: "pending"
    });
    setActiveModal(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name) return;
    addProduct({
      name: prodForm.name,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: prodForm.category,
      price: Number(prodForm.price),
      cost: Number(prodForm.cost),
      stock: Number(prodForm.stock),
      minStock: Number(prodForm.minStock),
      type: "product"
    });
    setActiveModal(null);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.amount) return;
    addExpense({
      category: expForm.category,
      amount: Number(expForm.amount),
      date: expForm.date,
      description: expForm.description,
      paymentMethod: expForm.paymentMethod
    });
    setActiveModal(null);
  };

  const sessionType = localStorage.getItem("bizflow_session_type");
  const currentDemoData = getDemoDataForBusiness(activeBusiness.id);
  const currentTopServices = currentDemoData.topServicesChart;
  const hasFinancialData = sessionType === "demo" || invoices.length > 0 || expenses.length > 0;
  const hasServicesData = sessionType === "demo" || bookings.length > 0 || invoices.length > 0;

  // Calculate dynamic monthly revenue trend if transactions exist
  const activeChartData = sessionType === "demo"
    ? revenueTrend
    : invoices.length > 0 || expenses.length > 0
      ? [
          { month: "Jan", revenue: 0, expenses: 0 },
          { month: "Feb", revenue: 0, expenses: 0 },
          { month: "Mar", revenue: totalRevenue * 0.2, expenses: totalExpenses * 0.3 },
          { month: "Apr", revenue: totalRevenue * 0.5, expenses: totalExpenses * 0.4 },
          { month: "May", revenue: totalRevenue, expenses: totalExpenses }
        ]
      : [];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Top Banner Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">
            Good morning, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-xs text-bronze mt-1">
            Here's how <span className="font-semibold text-espresso">{activeBusiness.name}</span> ({activeBusiness.type.toUpperCase()}) is performing today.
          </p>
        </div>

        {/* Quick Action Button Toolbar */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" icon={Plus} onClick={() => setActiveModal("customer")}>
            + Customer
          </Button>
          <Button size="sm" variant="secondary" icon={Plus} onClick={() => setActiveModal("booking")}>
            {terminology.actionBooking}
          </Button>
          <Button size="sm" variant="primary" icon={Plus} onClick={() => setActiveModal("invoice")}>
            + Create Invoice
          </Button>
        </div>
      </div>

      {/* KPI Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={formatINR(totalRevenue)} delta={invoices.length > 0 ? "+14.2%" : "0%"} icon={IndianRupee} />
        <StatCard label="Pending Payments" value={formatINR(totalPending)} delta={pendingInvoices.length > 0 ? "-4.1%" : "0%"} icon={Clock} />
        <StatCard label={terminology.kpiStatLabel} value={String(todayBookings.length)} delta={todayBookings.length > 0 ? `+${todayBookings.length}` : "0"} icon={Users} />
        <StatCard label="Net Profit Margin" value={formatINR(netProfit)} delta={totalRevenue > 0 ? "+100%" : "0%"} icon={TrendingUp} />
      </div>

      {/* Sales Overview Chart & Today's Schedule Timeline */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-charcoal">Financial Performance</h2>
              <p className="text-xs text-bronze">Monthly Revenue vs Expenses trend</p>
            </div>
            <Badge tone={hasFinancialData ? "gold" : "neutral"}>
              {hasFinancialData ? "Updated Live" : "No Data Yet"}
            </Badge>
          </div>

          {hasFinancialData ? (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={activeChartData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#64748B22" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} width={48} />
                <Tooltip formatter={(v: any) => formatINR(Number(v))} contentStyle={{ borderRadius: 8, border: "1px solid #64748B33", fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#0F172A" strokeWidth={2.5} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="expenses" stroke="#3B82F6" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex flex-col items-center justify-center text-center p-6 border border-dashed border-bronze/20 rounded-xl bg-white/30 dark:bg-white/5">
              <Wallet size={36} className="text-bronze/40 mb-2" />
              <p className="font-display text-sm font-bold text-charcoal">No Financial Trend Data</p>
              <p className="text-xs text-bronze max-w-xs mt-1 leading-relaxed">
                Issue your first invoice or log operating expenses to visualize real-time monthly revenue trends.
              </p>
              <button onClick={() => setActiveModal("invoice")} className="mt-3 text-xs font-bold text-gold hover:underline cursor-pointer">
                + Issue First Invoice
              </button>
            </div>
          )}
        </Card>

        {/* Schedule List */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-charcoal">{terminology.bookingsLabel} Today</h2>
              <Badge tone="neutral">{todayBookings.length}</Badge>
            </div>
            <div className="flex flex-col gap-3">
              {todayBookings.length > 0 ? (
                todayBookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-2.5 rounded-lg border border-bronze/15 bg-white/40">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-charcoal truncate">{b.customer}</p>
                      <p className="text-[11px] text-bronze truncate">{b.service} • {b.staff}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-semibold text-charcoal block">{b.time}</span>
                      <Badge tone={b.status === "confirmed" ? "success" : "warning"}>{b.status}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-bronze flex flex-col items-center justify-center gap-1.5 border border-dashed border-bronze/20 rounded-xl p-4">
                  <p className="font-semibold text-charcoal">No bookings scheduled today</p>
                  <button onClick={() => setActiveModal("booking")} className="text-gold font-bold hover:underline text-xs cursor-pointer">
                    + Schedule first appointment
                  </button>
                </div>
              )}
            </div>
          </div>
          <Link to="/app/bookings" className="text-xs font-semibold text-espresso inline-flex items-center gap-1 mt-4 hover:text-gold transition">
            View full calendar schedule <ArrowRight size={13} />
          </Link>
        </Card>
      </div>

      {/* Secondary Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Services Bar Chart */}
        <Card className="p-5">
          <h2 className="font-display text-lg font-semibold text-charcoal mb-4">Top Revenue Services</h2>
          {hasServicesData ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={sessionType === "demo" ? currentTopServices : []} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={90} stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v: any) => formatINR(Number(v))} contentStyle={{ borderRadius: 8, border: "1px solid #64748B33", fontSize: 12 }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-44 flex flex-col items-center justify-center text-center p-4 border border-dashed border-bronze/20 rounded-xl bg-white/30 dark:bg-white/5">
              <p className="font-display text-xs font-bold text-charcoal">No Sales Data Recorded</p>
              <p className="text-[11px] text-bronze mt-1">Top performing services will appear here automatically.</p>
            </div>
          )}
        </Card>

        {/* Low Stock Alerts */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#64748B]" />
              <h2 className="font-display text-lg font-semibold text-charcoal">Low Stock Alerts</h2>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setActiveModal("product")}>+ Item</Button>
          </div>
          <div className="flex flex-col gap-2.5">
            {lowStock.length === 0 && <p className="text-xs text-bronze">All products are healthy in stock.</p>}
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded-md bg-white/40 border border-bronze/15">
                <span className="text-xs font-medium text-charcoal">{p.name}</span>
                <Badge tone="danger">{p.stock} units remaining</Badge>
              </div>
            ))}
          </div>
          <Link to="/app/products" className="text-xs font-semibold text-espresso inline-flex items-center gap-1 mt-4 hover:text-gold transition">
            Manage inventory <ArrowRight size={13} />
          </Link>
        </Card>

        {/* Pending Invoices */}
        <Card className="p-5">
          <h2 className="font-display text-lg font-semibold text-charcoal mb-4">Pending Payments</h2>
          <div className="flex flex-col gap-2.5">
            {pendingInvoices.length === 0 && <p className="text-xs text-bronze">No pending invoice payments.</p>}
            {pendingInvoices.map((i) => (
              <div key={i.id} className="flex items-center justify-between p-2 rounded-md bg-white/40 border border-bronze/15">
                <div>
                  <p className="text-xs font-bold text-charcoal">{i.customer}</p>
                  <p className="text-[10px] text-bronze">{i.number}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-charcoal">{formatINR(i.total)}</p>
                  <Badge tone={i.status === "overdue" ? "danger" : "warning"}>{i.status}</Badge>
                </div>
              </div>
            ))}
          </div>
          <Link to="/app/invoices" className="text-xs font-semibold text-espresso inline-flex items-center gap-1 mt-4 hover:text-gold transition">
            View all invoices <ArrowRight size={13} />
          </Link>
        </Card>
      </div>

      {/* --- QUICK ACTION MODALS --- */}
      {/* 1. Add Customer Modal */}
      <Modal isOpen={activeModal === "customer"} onClose={() => setActiveModal(null)} title="Create New Customer">
        <form onSubmit={handleCreateCustomer} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Full Name *</label>
            <Input required placeholder="e.g. Sanjana Reddy" value={custForm.name} onChange={e => setCustForm({ ...custForm, name: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Phone Number *</label>
            <Input required placeholder="+91 98200 11111" value={custForm.phone} onChange={e => setCustForm({ ...custForm, phone: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Email Address</label>
            <Input placeholder="customer@example.com" value={custForm.email} onChange={e => setCustForm({ ...custForm, email: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save Customer</Button>
          </div>
        </form>
      </Modal>

      {/* 2. Add Booking Modal */}
      <Modal isOpen={activeModal === "booking"} onClose={() => setActiveModal(null)} title={`New ${terminology.bookingLabel}`}>
        <form onSubmit={handleCreateBooking} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">{terminology.customerLabel} Name *</label>
            <Input required placeholder="Select or type customer name" value={bookForm.customer} onChange={e => setBookForm({ ...bookForm, customer: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Service Required *</label>
            <Input required placeholder="e.g. Hair Spa / Consultation" value={bookForm.service} onChange={e => setBookForm({ ...bookForm, service: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Date</label>
              <Input type="date" value={bookForm.date} onChange={e => setBookForm({ ...bookForm, date: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Time</label>
              <Input placeholder="11:00 AM" value={bookForm.time} onChange={e => setBookForm({ ...bookForm, time: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Confirm Booking</Button>
          </div>
        </form>
      </Modal>

      {/* 3. Create Invoice Modal */}
      <Modal isOpen={activeModal === "invoice"} onClose={() => setActiveModal(null)} title="Generate Invoice">
        <form onSubmit={handleCreateInvoice} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Customer Name *</label>
            <Input required placeholder="Billed to customer" value={invForm.customer} onChange={e => setInvForm({ ...invForm, customer: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Line Item Description *</label>
            <Input required value={invForm.desc} onChange={e => setInvForm({ ...invForm, desc: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Amount (₹)</label>
              <Input type="number" value={invForm.amount} onChange={e => setInvForm({ ...invForm, amount: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Due Date</label>
              <Input type="date" value={invForm.due} onChange={e => setInvForm({ ...invForm, due: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Generate Invoice</Button>
          </div>
        </form>
      </Modal>

      {/* 4. Add Product Modal */}
      <Modal isOpen={activeModal === "product"} onClose={() => setActiveModal(null)} title="Add Product / Service">
        <form onSubmit={handleCreateProduct} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Item Name *</label>
            <Input required placeholder="Product name" value={prodForm.name} onChange={e => setProdForm({ ...prodForm, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Price (₹)</label>
              <Input type="number" value={prodForm.price} onChange={e => setProdForm({ ...prodForm, price: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Stock Quantity</label>
              <Input type="number" value={prodForm.stock} onChange={e => setProdForm({ ...prodForm, stock: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save Product</Button>
          </div>
        </form>
      </Modal>

      {/* 5. Add Expense Modal */}
      <Modal isOpen={activeModal === "expense"} onClose={() => setActiveModal(null)} title="Log Business Expense">
        <form onSubmit={handleCreateExpense} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Expense Category</label>
            <Select value={expForm.category} onChange={e => setExpForm({ ...expForm, category: e.target.value })}>
              <option value="Rent">Rent</option>
              <option value="Salary">Staff Salary</option>
              <option value="Inventory">Inventory Restock</option>
              <option value="Marketing">Marketing / Ads</option>
              <option value="Utilities">Electricity & Water</option>
            </Select>
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Amount (₹) *</label>
            <Input required type="number" value={expForm.amount} onChange={e => setExpForm({ ...expForm, amount: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Description</label>
            <Input value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Log Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
