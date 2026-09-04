import React, { useState } from "react";
import { Gift, Award } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatINR } from "../../data/demoData";
import { Card, Button, Badge, Modal, Input, EmptyState } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

export default function Loyalty() {
  const { customers, showToast } = useApp();

  const [pointsPerINR, setPointsPerINR] = useState(100);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [selectedCustName, setSelectedCustName] = useState("");
  const [redeemPts, setRedeemPts] = useState(500);

  const topLoyal = [...customers].sort((a, b) => b.totalSpent - a.totalSpent);

  const totalPointsIssued = customers.reduce((sum, c) => sum + Math.floor(c.totalSpent / pointsPerINR) + (c.loyaltyPoints || 0), 0);
  const totalPointsRedeemed = 0;

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustName) return;
    showToast(`Voucher of ₹100 issued to ${selectedCustName}!`, "success");
    setIsRedeemOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title="Customer Loyalty & Rewards"
        subtitle={`Rule: ₹${pointsPerINR} spent = 1 Loyalty Point`}
        action={<Button icon={Gift} onClick={() => setIsRedeemOpen(true)}>Redeem Rewards</Button>}
      />

      {/* Stats Header */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-bronze font-semibold uppercase">Total Points Issued</span>
          <p className="font-display text-2xl font-bold text-charcoal">{totalPointsIssued.toLocaleString()}</p>
        </Card>
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-bronze font-semibold uppercase">Points Redeemed</span>
          <p className="font-display text-2xl font-bold text-[#C9A24B]">{totalPointsRedeemed.toLocaleString()}</p>
        </Card>
        <Card className="p-5 flex flex-col gap-1">
          <span className="text-xs text-bronze font-semibold uppercase">Enrolled Members</span>
          <p className="font-display text-2xl font-bold text-charcoal">{customers.length}</p>
        </Card>
      </div>

      {/* Tiered Rewards Card */}
      <Card className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Award size={20} className="text-[#C9A24B]" />
          <h2 className="font-display text-lg font-bold text-charcoal">Active Loyalty Tiers</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="border border-[#C9A24B]/30 bg-gold/10 rounded-[12px] p-4 flex flex-col justify-between">
            <div>
              <Badge tone="gold">Silver Tier</Badge>
              <h3 className="font-bold text-charcoal text-base mt-2">500 Points</h3>
              <p className="text-xs text-bronze">→ ₹100 Flat Discount Voucher</p>
            </div>
          </div>
          <div className="border border-[#C9A24B]/30 bg-gold/10 rounded-[12px] p-4 flex flex-col justify-between">
            <div>
              <Badge tone="gold">Gold Tier</Badge>
              <h3 className="font-bold text-charcoal text-base mt-2">1,000 Points</h3>
              <p className="text-xs text-bronze">→ Free Signature Service Upgrade</p>
            </div>
          </div>
          <div className="border border-[#C9A24B]/30 bg-gold/10 rounded-[12px] p-4 flex flex-col justify-between">
            <div>
              <Badge tone="gold">Platinum VIP</Badge>
              <h3 className="font-bold text-charcoal text-base mt-2">2,500 Points</h3>
              <p className="text-xs text-bronze">→ ₹1,000 Cash Credit + VIP Priority</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Most Loyal Customers Table */}
      <Card className="p-5 flex flex-col gap-4">
        <h2 className="font-display text-lg font-bold text-charcoal">Customer Points Ledger</h2>
        {topLoyal.length > 0 ? (
          <div className="flex flex-col gap-2">
            {topLoyal.map((c) => {
              const pts = Math.floor(c.totalSpent / pointsPerINR) + (c.loyaltyPoints || 0);
              return (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg border border-bronze/15 bg-white/40">
                  <div>
                    <h4 className="text-sm font-bold text-charcoal">{c.name}</h4>
                    <p className="text-xs text-bronze">{c.visits} visits • {formatINR(c.totalSpent)} spent</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone="gold">{pts} pts</Badge>
                    <Button size="sm" variant="secondary" onClick={() => { setSelectedCustName(c.name); setIsRedeemOpen(true); }}>Redeem</Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Gift}
            title="No Loyalty Members Yet"
            message="Add customers to your workspace to automatically track loyalty points and issue reward vouchers."
          />
        )}
      </Card>

      {/* Redeem Voucher Modal */}
      <Modal isOpen={isRedeemOpen} onClose={() => setIsRedeemOpen(false)} title="Issue Loyalty Discount Voucher">
        <form onSubmit={handleRedeem} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Customer Name *</label>
            <Input required placeholder="Select customer" value={selectedCustName} onChange={e => setSelectedCustName(e.target.value)} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Points to Deduct</label>
            <Input type="number" value={redeemPts} onChange={e => setRedeemPts(Number(e.target.value))} />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsRedeemOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Issue Discount Voucher</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
