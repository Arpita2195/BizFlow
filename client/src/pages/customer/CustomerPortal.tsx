import React from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, Gift, Star, ArrowLeft, Download, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatINR } from "../../data/demoData";
import { Card, Button, Badge, Avatar } from "../../components/ui/Primitives";

export default function CustomerPortal() {
  const { activeBusiness, user, bookings, invoices, showToast } = useApp();

  const myBookings = bookings.slice(0, 3);
  const myInvoices = invoices.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Header Bar */}
      <header className="bg-[#0F172A] text-[#F8FAFC] border-b border-[#64748B]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/app" className="p-2 text-[#64748B] hover:text-white rounded-lg transition">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <span className="font-display font-bold text-lg text-white">BizFlow Customer Portal</span>
            <p className="text-xs text-[#3B82F6]">{activeBusiness.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size={36} />
          <span className="text-xs font-semibold text-white hidden sm:block">{user.name}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 flex-1 w-full flex flex-col gap-6 animate-fadeIn">
        {/* Welcome Card */}
        <div className="p-6 bg-[#0F172A] text-[#F8FAFC] border border-[#3B82F6]/30 rounded-[16px] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#3B82F6] font-bold uppercase tracking-wider">Customer Portal</span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">Welcome back, {user.name}</h1>
            <p className="text-xs text-[#F8FAFC]/80 mt-1">Manage your appointments, past invoices, and loyalty rewards points.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-center shrink-0 min-w-[120px]">
            <span className="text-[10px] text-[#3B82F6] font-bold uppercase tracking-wider">Loyalty Balance</span>
            <p className="font-display text-2xl font-bold text-[#3B82F6] mt-0.5">340 Pts</p>
          </div>
        </div>

        {/* My Appointments */}
        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-charcoal flex items-center gap-2">
              <Calendar size={18} className="text-gold" /> My Scheduled Appointments
            </h2>
            <a
              href={`/business/${activeBusiness.slug}`}
              className="px-3 py-1.5 rounded-lg bg-espresso text-ivory text-xs font-semibold inline-flex items-center gap-1"
            >
              <Plus size={14} /> Book New Service
            </a>
          </div>
          <div className="flex flex-col gap-3">
            {myBookings.map((b) => (
              <div key={b.id} className="p-3.5 rounded-xl border border-bronze/15 bg-white/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-charcoal text-sm">{b.service}</h4>
                  <p className="text-xs text-bronze">{b.date} at {b.time} ({b.staff})</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-charcoal block">{formatINR(b.price)}</span>
                  <Badge tone={b.status === "confirmed" ? "success" : "warning"}>{b.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* My Invoices */}
        <Card className="p-5 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-charcoal flex items-center gap-2">
            <FileText size={18} className="text-gold" /> My Invoices & Receipts
          </h2>
          <div className="flex flex-col gap-3">
            {myInvoices.map((i) => (
              <div key={i.id} className="p-3.5 rounded-xl border border-bronze/15 bg-white/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-charcoal text-sm">{i.number}</h4>
                  <p className="text-xs text-bronze">Due: {i.due}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-charcoal">{formatINR(i.total)}</span>
                  <Button size="sm" variant="secondary" icon={Download} onClick={() => showToast(`Downloading Invoice ${i.number}`)}>PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
