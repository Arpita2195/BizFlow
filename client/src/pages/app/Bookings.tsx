import React, { useState } from "react";
import { Plus, CalendarCheck, CheckCircle, XCircle, Clock, AlertTriangle, UserCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { BookingStatus, formatINR } from "../../data/demoData";
import { Card, Button, Badge, EmptyState, Modal, Input, Select } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

const statusTone: Record<BookingStatus, "neutral" | "gold" | "success" | "warning" | "danger"> = {
  pending: "warning",
  confirmed: "gold",
  completed: "success",
  cancelled: "danger",
  "no-show": "neutral",
};

export default function Bookings() {
  const { bookings, addBooking, updateBookingStatus, terminology, staff } = useApp();

  const [view, setView] = useState<"List" | "Day" | "Week">("List");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    customer: "",
    service: "",
    staff: staff[0]?.name || "Neha Joshi",
    date: "2026-09-04",
    time: "10:00 AM",
    price: "1800",
    notes: ""
  });

  const filteredBookings = bookings.filter((b) => filterStatus === "all" || b.status === filterStatus);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer || !form.service) return;

    // Check collision / double booking logic
    const conflict = bookings.find(
      (b) => b.staff === form.staff && b.date === form.date && b.time === form.time && b.status !== "cancelled"
    );

    if (conflict) {
      setConflictWarning(`Collision Alert: ${form.staff} is already booked at ${form.time} on ${form.date} for ${conflict.customer}. Please pick another time or staff member.`);
      return;
    }

    addBooking({
      customer: form.customer,
      service: form.service,
      staff: form.staff,
      date: form.date,
      time: form.time,
      price: Number(form.price) || 1800,
      status: "confirmed",
      notes: form.notes
    });

    setConflictWarning(null);
    setIsAddOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title={terminology.bookingsLabel}
        subtitle={`Schedule and availability manager for ${terminology.bookingsLabel.toLowerCase()}`}
        action={<Button icon={Plus} onClick={() => { setConflictWarning(null); setIsAddOpen(true); }}>{terminology.actionBooking}</Button>}
      />

      {/* Control Bar: Views & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-white/60 border border-bronze/20 rounded-[8px] p-1">
          {(["List", "Day", "Week"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-[6px] transition ${
                view === v ? "bg-espresso text-ivory" : "text-bronze hover:bg-espresso/5"
              }`}
            >
              {v} View
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["all", "pending", "confirmed", "completed", "cancelled", "no-show"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border transition ${
                filterStatus === st
                  ? "bg-espresso text-ivory border-espresso"
                  : "bg-white/40 text-bronze border-bronze/20 hover:bg-white/80"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {filteredBookings.length === 0 ? (
        <Card>
          <EmptyState
            icon={CalendarCheck}
            title={`No ${terminology.bookingsLabel.toLowerCase()} found`}
            message="No matching schedule records found for the selected view filter."
            actionLabel={terminology.actionBooking}
            onAction={() => setIsAddOpen(true)}
          />
        </Card>
      ) : view === "List" ? (
        <Card className="overflow-hidden">
          <table className="w-full text-sm hidden md:table">
            <thead>
              <tr className="text-left text-bronze border-b border-bronze/15 bg-white/40">
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Date & Time</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">{terminology.customerLabel}</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Service / Event</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">{terminology.staffLabel}</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Price</th>
                <th className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wider">Manage Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze/10">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-espresso/[0.02] transition">
                  <td className="px-5 py-3.5 text-charcoal font-bold text-xs">
                    {b.date}<br /><span className="text-bronze font-normal">{b.time}</span>
                  </td>
                  <td className="px-5 py-3.5 text-charcoal font-semibold text-sm">{b.customer}</td>
                  <td className="px-5 py-3.5 text-bronze text-xs font-medium">{b.service}</td>
                  <td className="px-5 py-3.5 text-charcoal text-xs">{b.staff}</td>
                  <td className="px-5 py-3.5 text-charcoal font-bold text-sm">{formatINR(b.price)}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1 text-xs">
                      {b.status === "pending" && (
                        <button
                          onClick={() => updateBookingStatus(b.id, "confirmed")}
                          className="px-2 py-1 bg-gold/15 text-[#7A5E22] rounded hover:bg-gold/30 font-semibold"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status === "confirmed" && (
                        <button
                          onClick={() => updateBookingStatus(b.id, "completed")}
                          className="px-2 py-1 bg-green-700/10 text-green-800 rounded hover:bg-green-700/20 font-semibold"
                        >
                          Complete
                        </button>
                      )}
                      {b.status !== "cancelled" && b.status !== "completed" && (
                        <button
                          onClick={() => updateBookingStatus(b.id, "cancelled")}
                          className="px-2 py-1 bg-red-700/10 text-red-800 rounded hover:bg-red-700/20 font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden divide-y divide-bronze/10">
            {filteredBookings.map((b) => (
              <div key={b.id} className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-charcoal">{b.customer}</span>
                  <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                </div>
                <p className="text-xs text-bronze">{b.service} with {b.staff}</p>
                <div className="flex items-center justify-between text-xs text-charcoal mt-1">
                  <span>{b.date} at {b.time}</span>
                  <span className="font-bold">{formatINR(b.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        /* Calendar Day / Week Timeline View */
        <Card className="p-5 flex flex-col gap-4">
          <h3 className="font-display text-base font-bold text-charcoal">Schedule Timeline ({view} View)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredBookings.map((b) => (
              <div key={b.id} className="p-4 rounded-xl border border-bronze/20 bg-white/70 shadow-card flex flex-col justify-between gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-bronze uppercase font-bold tracking-wider">{b.time}</span>
                    <h4 className="font-bold text-charcoal text-sm">{b.customer}</h4>
                    <p className="text-xs text-bronze">{b.service}</p>
                  </div>
                  <Badge tone={statusTone[b.status]}>{b.status}</Badge>
                </div>
                <div className="pt-2 border-t border-bronze/15 flex items-center justify-between text-xs text-bronze">
                  <span>Staff: <strong className="text-charcoal">{b.staff}</strong></span>
                  <span className="font-bold text-charcoal">{formatINR(b.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Interactive Booking Creator Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={`Create ${terminology.bookingLabel}`}>
        <form onSubmit={handleCreate} className="flex flex-col gap-4 text-xs">
          {conflictWarning && (
            <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 flex items-start gap-2">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <span>{conflictWarning}</span>
            </div>
          )}

          <div>
            <label className="font-semibold text-bronze mb-1 block">{terminology.customerLabel} Name *</label>
            <Input required placeholder="Customer Name" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} />
          </div>

          <div>
            <label className="font-semibold text-bronze mb-1 block">Service / Session Name *</label>
            <Input required placeholder="e.g. Hair Spa & Scalp Treatment" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Assigned Staff *</label>
              <Select value={form.staff} onChange={e => setForm({ ...form, staff: e.target.value })}>
                {staff.map(s => <option key={s.id} value={s.name}>{s.name} ({s.role})</option>)}
              </Select>
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Price (₹) *</label>
              <Input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-bronze mb-1 block">Date *</label>
              <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold text-bronze mb-1 block">Time Slot *</label>
              <Select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" type="submit">Schedule Booking</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
