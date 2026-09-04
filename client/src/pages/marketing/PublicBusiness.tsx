import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone, Star, Clock, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatINR, demoBusinesses, getDemoDataForBusiness } from "../../data/demoData";
import { Modal, Input, Button, Select } from "../../components/ui/Primitives";

export default function PublicBusiness() {
  const { slug } = useParams<{ slug: string }>();
  const { activeBusiness, products, staff, reviews, addBooking, showToast } = useApp();

  const business = demoBusinesses.find((b) => b.slug === slug) || activeBusiness;
  const businessDemoData = getDemoDataForBusiness(business.id);
  const activeProducts = business.id === activeBusiness.id ? products : businessDemoData.products;
  const activeStaff = business.id === activeBusiness.id ? staff : businessDemoData.staff;
  const activeReviews = business.id === activeBusiness.id ? reviews : businessDemoData.reviews;

  // Booking Flow Widget State
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(activeProducts[0] || null);
  const [selectedStaff, setSelectedStaff] = useState(activeStaff[0]?.name || "Staff Member");
  const [bookDate, setBookDate] = useState("2026-09-05");
  const [bookTime, setBookTime] = useState("11:30 AM");
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const services = activeProducts.filter((p) => p.type === "service" || p.category === "Services" || p.price > 500);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;

    addBooking({
      customer: custName,
      service: selectedService?.name || "Service Consultation",
      staff: selectedStaff,
      date: bookDate,
      time: bookTime,
      price: selectedService?.price || 1500,
      status: "confirmed"
    });

    setBookingConfirmed(true);
    showToast(`Appointment confirmed at ${business.name}!`, "success");
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#0F172A] text-[#F8FAFC] border-b border-[#64748B]/20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3B82F6] text-white flex items-center justify-center font-display text-3xl font-bold mx-auto mb-5 shadow-2xl">
            {business.logoInitial}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-2">{business.name}</h1>
          <p className="text-sm text-[#F8FAFC]/70 max-w-md mx-auto">{business.tagline}</p>
          <div className="flex items-center justify-center gap-1 mt-4 text-[#3B82F6]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
            <span className="text-[#F8FAFC]/70 text-xs font-semibold ml-1.5">4.9 (312 verified reviews)</span>
          </div>
        </div>
      </div>

      {/* Main Storefront Layout */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr,320px] gap-10">
        <div className="flex flex-col gap-10">
          {/* Services Menu Catalog */}
          <section>
            <h2 className="font-display text-2xl font-bold text-charcoal mb-5">Services & Offerings</h2>
            <div className="flex flex-col gap-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-bronze/15 bg-white/60 hover:border-[#3B82F6]/50 transition cursor-pointer"
                  onClick={() => { setSelectedService(s); setIsBookOpen(true); }}
                >
                  <div>
                    <h3 className="text-sm font-bold text-charcoal">{s.name}</h3>
                    <p className="text-xs text-bronze">{s.description || "60 mins duration"}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-charcoal block">{formatINR(s.price)}</span>
                    <button className="text-xs font-bold text-[#3B82F6] hover:underline">Select & Book →</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section>
            <h2 className="font-display text-2xl font-bold text-charcoal mb-5">Verified Reviews</h2>
            <div className="flex flex-col gap-4">
              {activeReviews.map((r) => (
                <div key={r.id} className="p-4 rounded-xl border border-bronze/15 bg-white/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-charcoal">{r.customer}</span>
                    <div className="flex text-[#3B82F6]">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-bronze leading-relaxed">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info Card */}
        <aside className="flex flex-col gap-5">
          <div className="p-6 rounded-2xl border border-bronze/20 bg-white/80 shadow-card flex flex-col gap-5 sticky top-20">
            <Button size="lg" variant="primary" onClick={() => { setBookingConfirmed(false); setIsBookOpen(true); }}>
              ⚡ Book Online Now
            </Button>

            <div className="flex items-start gap-3 text-xs text-charcoal">
              <MapPin size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Location</span>
                <span className="text-bronze">{business.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-charcoal">
              <Phone size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Phone</span>
                <span className="text-bronze">{business.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-charcoal">
              <Clock size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Business Hours</span>
                <span className="text-bronze">{business.businessHours}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Online Booking Flow Modal */}
      <Modal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} title={`Book Appointment — ${business.name}`}>
        {!bookingConfirmed ? (
          <form onSubmit={handleConfirmBooking} className="flex flex-col gap-4 text-xs">
            <div>
              <label className="font-bold text-bronze mb-1 block">Selected Service</label>
              <div className="p-3 rounded-lg bg-gold/10 border border-gold/30 font-bold text-charcoal flex justify-between">
                <span>{selectedService?.name || "General Consultation"}</span>
                <span>{formatINR(selectedService?.price || 1500)}</span>
              </div>
            </div>

            <div>
              <label className="font-bold text-bronze mb-1 block">Select Specialist / Staff</label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-bronze/25 bg-white text-xs outline-none"
              >
                {staff.map((st) => (
                  <option key={st.id} value={st.name}>{st.name} ({st.role})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-bronze mb-1 block">Date</label>
                <Input type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)} />
              </div>
              <div>
                <label className="font-bold text-bronze mb-1 block">Time Slot</label>
                <Select value={bookTime} onChange={(e) => setBookTime(e.target.value)}>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="font-bold text-bronze mb-1 block">Your Name *</label>
              <Input required placeholder="Full Name" value={custName} onChange={(e) => setCustName(e.target.value)} />
            </div>

            <div>
              <label className="font-bold text-bronze mb-1 block">Mobile Number *</label>
              <Input required placeholder="+91 98200 00000" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-bronze/20">
              <Button variant="secondary" size="sm" type="button" onClick={() => setIsBookOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">Confirm Online Booking</Button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-green-100 border border-green-300 text-green-700 flex items-center justify-center">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-display text-xl font-bold text-charcoal">Booking Confirmed!</h3>
            <p className="text-xs text-bronze max-w-xs">
              Thank you {custName}! Your appointment for <strong>{selectedService?.name}</strong> on {bookDate} at {bookTime} with {selectedStaff} has been confirmed.
            </p>
            <Button size="sm" onClick={() => setIsBookOpen(false)}>Done</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
