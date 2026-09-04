import React from "react";
import { Link } from "react-router-dom";
import { Shield, Building, Users, Activity, CheckCircle, ArrowLeft, Power } from "lucide-react";
import { demoBusinesses, formatINR } from "../../data/demoData";
import { Card, Button, Badge, Avatar } from "../../components/ui/Primitives";
import { useApp } from "../../context/AppContext";

export default function AdminDashboard() {
  const { showToast } = useApp();

  const handleToggleStatus = (bName: string) => {
    showToast(`Updated status for workspace '${bName}'`, "info");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Platform Admin Navigation Header */}
      <header className="bg-[#0F172A] text-[#F8FAFC] border-b border-[#64748B]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/app" className="p-2 text-[#64748B] hover:text-white rounded-lg transition">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[#3B82F6]" />
              <span className="font-display font-bold text-lg text-white">BizFlow Platform Admin</span>
            </div>
            <p className="text-xs text-[#64748B]">Multi-tenant system monitoring dashboard</p>
          </div>
        </div>
        <Badge tone="gold">Super Admin Access</Badge>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full flex flex-col gap-6 animate-fadeIn">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex flex-col gap-1">
            <span className="text-xs text-bronze font-semibold uppercase">Total Businesses</span>
            <p className="font-display text-2xl font-bold text-charcoal">1,420</p>
          </Card>
          <Card className="p-5 flex flex-col gap-1">
            <span className="text-xs text-bronze font-semibold uppercase">Active Users</span>
            <p className="font-display text-2xl font-bold text-charcoal">8,650</p>
          </Card>
          <Card className="p-5 flex flex-col gap-1">
            <span className="text-xs text-bronze font-semibold uppercase">Platform MRR</span>
            <p className="font-display text-2xl font-bold text-[#0891B2]">₹18,45,000</p>
          </Card>
          <Card className="p-5 flex flex-col gap-1">
            <span className="text-xs text-bronze font-semibold uppercase">System Uptime</span>
            <p className="font-display text-2xl font-bold text-[#3B82F6]">99.98%</p>
          </Card>
        </div>

        {/* Registered Businesses Directory */}
        <Card className="p-5 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-charcoal flex items-center gap-2">
            <Building size={18} className="text-gold" /> Registered Business Accounts
          </h2>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-bronze/15 text-bronze uppercase font-bold">
                <th className="py-2.5 px-3">Business Name</th>
                <th className="py-2.5 px-3">Vertical Type</th>
                <th className="py-2.5 px-3">Owner</th>
                <th className="py-2.5 px-3">Subscription</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              {demoBusinesses.map((b) => (
                <tr key={b.id} className="hover:bg-white/40">
                  <td className="py-3 px-3 font-bold text-charcoal">{b.name}</td>
                  <td className="py-3 px-3 uppercase text-bronze font-semibold">{b.type}</td>
                  <td className="py-3 px-3 text-charcoal">{b.ownerName}</td>
                  <td className="py-3 px-3"><Badge tone="gold">{b.subscriptionTier}</Badge></td>
                  <td className="py-3 px-3 text-right">
                    <Button size="sm" variant="secondary" onClick={() => handleToggleStatus(b.name)}>
                      Manage Account
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
