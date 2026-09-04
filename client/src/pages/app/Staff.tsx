import React, { useState } from "react";
import { Plus, Star, Clock, Users, Shield, Check, X as XIcon, Info } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatINR } from "../../data/demoData";
import { Card, Button, Avatar, Badge, Modal, Input, EmptyState } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

export default function Staff() {
  const { staff, addStaff, terminology } = useApp();

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Senior Specialist",
    rbacRole: "STAFF" as "ADMIN" | "MANAGER" | "STAFF",
    phone: "+91 98980 00000",
    email: "staff@example.com",
    workingHours: "10:00 AM - 07:00 PM"
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) return;

    addStaff({
      name: form.name,
      role: `${form.role} (${form.rbacRole})`,
      phone: form.phone,
      email: form.email,
      rating: 5.0,
      bookingsCompleted: 0,
      revenue: 0,
      workingHours: form.workingHours,
      status: "active"
    });

    setForm({
      name: "",
      role: "Senior Specialist",
      rbacRole: "STAFF",
      phone: "+91 98980 00000",
      email: "staff@example.com",
      workingHours: "10:00 AM - 07:00 PM"
    });
    setIsAddOpen(false);
  };

  const matrixData = [
    { feature: "Dashboard & Overview", owner: true, admin: true, manager: true, staff: true },
    { feature: "Customer Directory", owner: true, admin: true, manager: true, staff: true },
    { feature: "Schedule & Bookings", owner: true, admin: true, manager: true, staff: true },
    { feature: "Product & Inventory Catalog", owner: true, admin: true, manager: true, staff: true },
    { feature: "Invoices & Quotations", owner: true, admin: true, manager: true, staff: false },
    { feature: "Expense Records", owner: true, admin: true, manager: true, staff: false },
    { feature: "Customer Reviews & Loyalty", owner: true, admin: true, manager: true, staff: false },
    { feature: "AI Business Assistant", owner: true, admin: true, manager: true, staff: false },
    { feature: "Analytics & Financial Reports", owner: true, admin: true, manager: false, staff: false },
    { feature: "Staff Management & RBAC Roles", owner: true, admin: true, manager: false, staff: false },
    { feature: "Core Workspace Settings", owner: true, admin: true, manager: false, staff: false },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title={terminology.staffsLabel}
        subtitle={`${staff.length} active team members in workspace with RBAC access control`}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" icon={Info} onClick={() => setShowMatrix(true)}>
              RBAC Permissions Matrix
            </Button>
            <Button icon={Plus} onClick={() => setIsAddOpen(true)}>
              Add {terminology.staffLabel}
            </Button>
          </div>
        }
      />

      {/* RBAC Matrix Overview Modal */}
      <Modal isOpen={showMatrix} onClose={() => setShowMatrix(false)} title="Role-Based Access Control (RBAC) Policy Matrix">
        <div className="flex flex-col gap-4 text-xs">
          <p className="text-bronze">
            Review workspace feature permissions enforced for each active role across the application:
          </p>

          <div className="overflow-x-auto border border-bronze/20 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bronze/10 text-charcoal font-bold text-[11px] uppercase border-b border-bronze/20">
                  <th className="p-2.5">Feature / Route</th>
                  <th className="p-2.5 text-center text-[#C9A24B]">Owner</th>
                  <th className="p-2.5 text-center text-blue-600 dark:text-blue-400">Admin</th>
                  <th className="p-2.5 text-center text-emerald-600 dark:text-emerald-400">Manager</th>
                  <th className="p-2.5 text-center text-amber-600 dark:text-amber-400">Staff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bronze/10 text-charcoal">
                {matrixData.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/40 dark:hover:bg-white/5">
                    <td className="p-2.5 font-medium">{row.feature}</td>
                    <td className="p-2.5 text-center">{row.owner ? <Check size={16} className="inline text-emerald-600" /> : <XIcon size={16} className="inline text-rose-500" />}</td>
                    <td className="p-2.5 text-center">{row.admin ? <Check size={16} className="inline text-emerald-600" /> : <XIcon size={16} className="inline text-rose-500" />}</td>
                    <td className="p-2.5 text-center">{row.manager ? <Check size={16} className="inline text-emerald-600" /> : <XIcon size={16} className="inline text-rose-500" />}</td>
                    <td className="p-2.5 text-center">{row.staff ? <Check size={16} className="inline text-emerald-600" /> : <XIcon size={16} className="inline text-rose-500" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" onClick={() => setShowMatrix(false)}>Got It</Button>
          </div>
        </div>
      </Modal>

      {/* Staff Roster Grid */}
      {staff.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {staff.map((s, index) => (
            <Card key={s.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={s.name} size={48} />
                    <div>
                      <h3 className="font-display text-base font-bold text-charcoal">{s.name}</h3>
                      <p className="text-xs text-bronze font-medium">{s.role}</p>
                    </div>
                  </div>
                  {index === 0 && (
                    <Badge tone="gold">Top Performer</Badge>
                  )}
                </div>

                {/* Rating & Shift Hours */}
                <div className="flex items-center justify-between py-2 border-y border-bronze/15 mb-4 text-xs">
                  <div className="flex items-center gap-1 text-[#C9A24B] font-bold">
                    <Star size={14} fill="currentColor" strokeWidth={0} />
                    <span>{s.rating} Customer Rating</span>
                  </div>
                  <span className="text-bronze flex items-center gap-1 font-medium">
                    <Clock size={12} /> {s.workingHours || "10 AM - 7 PM"}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/50 border border-bronze/15">
                  <span className="text-bronze text-[10px] uppercase font-semibold">Completed Jobs</span>
                  <p className="text-sm font-bold text-charcoal mt-0.5">{s.bookingsCompleted}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-gold/10 border border-gold/20">
                  <span className="text-bronze text-[10px] uppercase font-semibold">Revenue Generated</span>
                  <p className="text-sm font-bold text-charcoal mt-0.5">{formatINR(s.revenue)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title={`No ${terminology.staffsLabel} Added Yet`}
          message={`Add your specialists, stylists, or team members to assign appointments and track sales output.`}
          actionLabel={`+ Add ${terminology.staffLabel}`}
          onAction={() => setIsAddOpen(true)}
        />
      )}

      {/* Add Staff Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={`Add New ${terminology.staffLabel}`}>
        <form onSubmit={handleCreate} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-semibold text-bronze mb-1 block">Full Name *</label>
            <Input required placeholder="Staff Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Job Title / Designation *</label>
              <Input required placeholder="e.g. Specialist / Senior Stylist" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
            </div>

            <div>
              <label className="font-semibold text-bronze mb-1 block">RBAC System Role *</label>
              <select
                value={form.rbacRole}
                onChange={e => setForm({ ...form, rbacRole: e.target.value as any })}
                className="w-full bg-white/70 dark:bg-white/10 border border-bronze/30 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-[#C9A24B]"
              >
                <option value="STAFF">STAFF (Operations & Schedule only)</option>
                <option value="MANAGER">MANAGER (Operations + Invoices)</option>
                <option value="ADMIN">ADMIN (Full Administrative Access)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Phone</label>
              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Working Hours</label>
              <Input value={form.workingHours} onChange={e => setForm({ ...form, workingHours: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Save Staff Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
