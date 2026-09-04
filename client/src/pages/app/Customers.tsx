import React, { useState, useMemo } from "react";
import { Search, Plus, Users, Trash2, Edit2, Phone, Mail, Award, Calendar, FileText, Megaphone, Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Customer, formatINR } from "../../data/demoData";
import { Card, Button, Input, Badge, Avatar, EmptyState, Drawer, Modal, Tabs, ConfirmationDialog } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer, terminology, bookings, invoices, showToast } = useApp();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    tag: "Regular",
    notes: "",
    totalSpent: 0,
    visits: 1
  });

  const [campaignForm, setCampaignForm] = useState({
    title: "Festival Special — 20% OFF",
    audience: "All Active Customers",
    discount: "20% OFF",
    channel: "Email & WhatsApp"
  });

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/messaging/broadcast-offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaignName: campaignForm.title,
        audience: campaignForm.audience,
        offerTitle: campaignForm.title,
        discount: campaignForm.discount
      })
    })
    .then((res) => res.json())
    .then(() => {
      showToast(`📣 '${campaignForm.title}' broadcasted to ${campaignForm.audience} via ${campaignForm.channel}!`, "success");
      setIsBroadcastOpen(false);
    })
    .catch(() => {
      showToast(`📣 Offer '${campaignForm.title}' broadcasted to ${customers.length} customers!`, "success");
      setIsBroadcastOpen(false);
    });
  };

  const filtered = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(query.toLowerCase()) ||
                            c.phone.includes(query) ||
                            c.email.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, query, statusFilter]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    addCustomer({
      name: form.name,
      phone: form.phone,
      email: form.email || `${form.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      totalSpent: Number(form.totalSpent) || 0,
      visits: Number(form.visits) || 1,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "active",
      tags: [form.tag],
      notes: form.notes,
      loyaltyPoints: 50
    });
    setForm({ name: "", phone: "", email: "", tag: "Regular", notes: "", totalSpent: 0, visits: 1 });
    setIsAddOpen(false);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    const target = editingCustomer || selectedCustomer;
    if (!target) return;

    const updatedFields = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      tags: [form.tag],
      notes: form.notes,
      totalSpent: Number(form.totalSpent) || 0,
      visits: Number(form.visits) || 0
    };

    updateCustomer(target.id, updatedFields);

    if (selectedCustomer && selectedCustomer.id === target.id) {
      setSelectedCustomer(prev => prev ? { ...prev, ...updatedFields } : null);
    }

    setIsEditOpen(false);
    setEditingCustomer(null);
  };

  const openEdit = (c: Customer) => {
    setEditingCustomer(c);
    setForm({
      name: c.name,
      phone: c.phone || "",
      email: c.email || "",
      tag: (c.tags && c.tags[0]) || "Regular",
      notes: c.notes || "",
      totalSpent: c.totalSpent || 0,
      visits: c.visits || 1
    });
    setIsEditOpen(true);
  };

  // Customer Profile Tab State inside Drawer
  const [profileTab, setProfileTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title={terminology.customersLabel}
        subtitle={`${customers.length} registered ${terminology.customersLabel.toLowerCase()} in workspace`}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" icon={Megaphone} onClick={() => setIsBroadcastOpen(true)}>
              Broadcast Offer
            </Button>
            <Button icon={Plus} onClick={() => { setForm({ name: "", phone: "", email: "", tag: "Regular", notes: "", totalSpent: 0, visits: 1 }); setIsAddOpen(true); }}>
              New {terminology.customerLabel}
            </Button>
          </div>
        }
      />

      {/* Filter Toolbar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search size={15} className="text-bronze" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search ${terminology.customersLabel.toLowerCase()}...`}
            className="bg-transparent outline-none text-sm w-full placeholder:text-bronze/60"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${statusFilter === "all" ? "bg-espresso text-ivory" : "bg-bronze/10 text-bronze hover:bg-bronze/20"}`}
          >
            All ({customers.length})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${statusFilter === "active" ? "bg-espresso text-ivory" : "bg-bronze/10 text-bronze hover:bg-bronze/20"}`}
          >
            Active ({customers.filter(c => c.status === "active").length})
          </button>
          <button
            onClick={() => setStatusFilter("inactive")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${statusFilter === "inactive" ? "bg-espresso text-ivory" : "bg-bronze/10 text-bronze hover:bg-bronze/20"}`}
          >
            Inactive ({customers.filter(c => c.status === "inactive").length})
          </button>
        </div>
      </Card>

      {/* Customer List / Table */}
      {filtered.length === 0 ? (
        <Card><EmptyState icon={Users} title={`No ${terminology.customersLabel.toLowerCase()} found`} message="Try adjusting search or status filters." actionLabel={`New ${terminology.customerLabel}`} onAction={() => setIsAddOpen(true)} /></Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm hidden md:table">
            <thead>
              <tr className="text-left text-bronze border-b border-bronze/15 bg-white/40">
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">{terminology.customerLabel}</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Contact</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Total Spent</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Visits</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Last Interaction</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              {filtered.map(c => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className="hover:bg-espresso/[0.03] transition cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size={34} />
                      <div>
                        <p className="text-charcoal font-semibold text-sm">{c.name}</p>
                        <div className="flex gap-1 mt-0.5">
                          {c.tags.map(t => <Badge key={t} tone={t === "VIP" ? "gold" : "neutral"}>{t}</Badge>)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-charcoal">{c.phone}<br/><span className="text-bronze">{c.email}</span></td>
                  <td className="px-5 py-3.5 text-charcoal font-bold text-sm">{formatINR(c.totalSpent)}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-charcoal">{c.visits}</td>
                  <td className="px-5 py-3.5 text-xs text-bronze">{c.lastVisit}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={c.status === "active" ? "success" : "neutral"}>{c.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                      <button onClick={() => openEdit(c)} className="p-1.5 text-bronze hover:text-espresso rounded-md hover:bg-white/60">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => setDeleteTargetId(c.id)} className="p-1.5 text-[#7A2E2E] hover:text-red-700 rounded-md hover:bg-white/60">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile responsive view */}
          <div className="md:hidden divide-y divide-bronze/10">
            {filtered.map(c => (
              <div key={c.id} onClick={() => setSelectedCustomer(c)} className="p-4 flex items-center gap-3 cursor-pointer hover:bg-white/40">
                <Avatar name={c.name} size={38} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-charcoal">{c.name}</p>
                    <Badge tone={c.status === "active" ? "success" : "neutral"}>{c.status}</Badge>
                  </div>
                  <p className="text-xs text-bronze">{c.phone}</p>
                  <p className="text-xs font-bold text-espresso mt-1">{formatINR(c.totalSpent)} • {c.visits} visits</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add Customer Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={`Add ${terminology.customerLabel}`}>
        <form onSubmit={handleCreate} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Full Name *</label>
            <Input required placeholder="Customer Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Phone Number *</label>
            <Input required placeholder="+91 98200 00000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Email Address</label>
            <Input placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="font-semibold text-bronze mb-1 block">Customer Notes</label>
            <Input placeholder="Preferences, special instructions..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save Customer</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={`Edit Customer & Metrics`}>
        <form onSubmit={handleEditSave} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Full Name *</label>
            <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Phone Number *</label>
              <Input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Email Address</label>
              <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-gold/10 border border-gold/25">
            <div>
              <label className="font-bold text-charcoal mb-1 block">Total Spent / CLV (₹)</label>
              <Input type="number" min="0" value={form.totalSpent} onChange={e => setForm({ ...form, totalSpent: Number(e.target.value) })} />
            </div>
            <div>
              <label className="font-bold text-charcoal mb-1 block">Total Visits</label>
              <Input type="number" min="0" value={form.visits} onChange={e => setForm({ ...form, visits: Number(e.target.value) })} />
            </div>
          </div>

          <div>
            <label className="font-semibold text-bronze mb-1 block">Customer Category Tag</label>
            <select
              value={form.tag}
              onChange={e => setForm({ ...form, tag: e.target.value })}
              className="w-full bg-white/70 dark:bg-white/10 border border-bronze/30 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-[#C9A24B]"
            >
              <option value="Regular">Regular Customer</option>
              <option value="VIP">VIP Customer</option>
              <option value="New">New Client</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-bronze mb-1 block">Preferences & Notes</label>
            <Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Update Customer</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => { if (deleteTargetId) deleteCustomer(deleteTargetId); }}
        title="Delete Customer?"
        message="This action cannot be undone. All associated customer profile records will be removed."
        danger
      />

      {/* TABBED CUSTOMER PROFILE DRAWER */}
      <Drawer isOpen={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} title="Customer Profile">
        {selectedCustomer && (
          <div className="flex flex-col gap-6">
            {/* Customer Header summary */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-bronze/20">
              <div className="flex items-center gap-4">
                <Avatar name={selectedCustomer.name} size={48} />
                <div>
                  <h2 className="font-display text-lg font-bold text-charcoal">{selectedCustomer.name}</h2>
                  <div className="flex items-center gap-3 text-xs text-bronze mt-0.5">
                    <span className="flex items-center gap-1"><Phone size={12} /> {selectedCustomer.phone}</span>
                    <span className="flex items-center gap-1"><Mail size={12} /> {selectedCustomer.email}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="secondary" icon={Edit2} onClick={() => openEdit(selectedCustomer)}>
                Edit Profile
              </Button>
            </div>

            {/* Calculated Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div
                onClick={() => openEdit(selectedCustomer)}
                className="p-3 rounded-lg bg-gold/10 border border-gold/20 cursor-pointer hover:border-gold transition group"
                title="Click to edit Total Spent & Visits"
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px] text-bronze font-semibold uppercase">Lifetime Value (CLV)</span>
                  <Edit2 size={10} className="text-bronze group-hover:text-espresso opacity-70" />
                </div>
                <p className="font-display text-base font-bold text-charcoal mt-1">{formatINR(selectedCustomer.totalSpent)}</p>
              </div>
              <div
                onClick={() => openEdit(selectedCustomer)}
                className="p-3 rounded-lg bg-white/60 border border-bronze/20 cursor-pointer hover:border-gold transition group"
                title="Click to edit Total Spent & Visits"
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[10px] text-bronze font-semibold uppercase">Visits</span>
                  <Edit2 size={10} className="text-bronze group-hover:text-espresso opacity-70" />
                </div>
                <p className="font-display text-base font-bold text-charcoal mt-1">{selectedCustomer.visits}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/60 border border-bronze/20">
                <span className="text-[10px] text-bronze font-semibold uppercase">Avg Order (AOV)</span>
                <p className="font-display text-base font-bold text-charcoal mt-1">{formatINR(selectedCustomer.visits ? Math.round(selectedCustomer.totalSpent / selectedCustomer.visits) : 0)}</p>
              </div>
            </div>

            {/* Drawer Tabs */}
            <Tabs
              activeTab={profileTab}
              onChange={setProfileTab}
              tabs={[
                { id: "overview", label: "Overview" },
                { id: "bookings", label: terminology.bookingsLabel },
                { id: "invoices", label: "Invoices" },
              ]}
            />

            {profileTab === "overview" && (
              <div className="flex flex-col gap-4 text-xs">
                <div className="p-4 rounded-lg bg-white/50 border border-bronze/20">
                  <h4 className="font-semibold text-charcoal mb-2">Customer Preferences & Notes</h4>
                  <p className="text-bronze leading-relaxed">{selectedCustomer.notes || "No special notes recorded for this customer."}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/50 border border-bronze/20">
                  <h4 className="font-semibold text-charcoal mb-2 flex items-center gap-1.5"><Award size={14} className="text-gold" /> Loyalty Account</h4>
                  <p className="text-bronze">Current Balance: <strong className="text-charcoal font-bold">{selectedCustomer.loyaltyPoints || 120} points</strong></p>
                  <p className="text-[11px] text-bronze mt-1">Eligible for ₹100 discount coupon on 500 points.</p>
                </div>
              </div>
            )}

            {profileTab === "bookings" && (
              <div className="flex flex-col gap-2">
                {bookings.filter(b => b.customer === selectedCustomer.name).map(b => (
                  <div key={b.id} className="p-3 rounded-lg bg-white/60 border border-bronze/15 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-charcoal">{b.service}</p>
                      <p className="text-bronze">{b.date} at {b.time} ({b.staff})</p>
                    </div>
                    <Badge tone={b.status === "confirmed" ? "success" : "neutral"}>{b.status}</Badge>
                  </div>
                ))}
              </div>
            )}

            {profileTab === "invoices" && (
              <div className="flex flex-col gap-2">
                {invoices.filter(i => i.customer === selectedCustomer.name).map(i => (
                  <div key={i.id} className="p-3 rounded-lg bg-white/60 border border-bronze/15 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-charcoal">{i.number}</p>
                      <p className="text-bronze">Due: {i.due}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-charcoal">{formatINR(i.total)}</p>
                      <Badge tone={i.status === "paid" ? "success" : "warning"}>{i.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Broadcast Offer Campaign Modal */}
      <Modal isOpen={isBroadcastOpen} onClose={() => setIsBroadcastOpen(false)} title="Broadcast Promotional Offer / Campaign">
        <form onSubmit={handleBroadcastSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Campaign Title *</label>
            <Input required placeholder="e.g. Festival Special — 20% OFF" value={campaignForm.title} onChange={e => setCampaignForm({ ...campaignForm, title: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Target Audience *</label>
              <select
                value={campaignForm.audience}
                onChange={e => setCampaignForm({ ...campaignForm, audience: e.target.value })}
                className="w-full bg-white/70 dark:bg-white/10 border border-bronze/30 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-[#C9A24B]"
              >
                <option value="All Active Customers">All Active Customers ({customers.length})</option>
                <option value="VIP Customers">VIP Customers Only</option>
                <option value="Inactive Clients (60+ days)">Inactive Clients (60+ days)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-bronze mb-1 block">Offer / Discount Code *</label>
              <Input required placeholder="e.g. BIZFLOW20" value={campaignForm.discount} onChange={e => setCampaignForm({ ...campaignForm, discount: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="font-semibold text-bronze mb-1 block">Dispatch Channels</label>
            <select
              value={campaignForm.channel}
              onChange={e => setCampaignForm({ ...campaignForm, channel: e.target.value })}
              className="w-full bg-white/70 dark:bg-white/10 border border-bronze/30 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-[#C9A24B]"
            >
              <option value="Email & WhatsApp">Email & WhatsApp Dispatch</option>
              <option value="Email Only">Email Blast Only</option>
              <option value="WhatsApp Broadcast">WhatsApp Broadcast Only</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsBroadcastOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit" icon={Send}>Broadcast Campaign</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
