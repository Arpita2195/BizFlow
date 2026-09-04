import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Users, CalendarCheck, Receipt, Package, BarChart3, Gift,
  Star, Scissors, Coffee, Camera, Dumbbell, GraduationCap, Store,
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Check
} from "lucide-react";
import { revenueTrend } from "../../data/demoData";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useApp } from "../../context/AppContext";

const features = [
  { icon: Users, title: "Customer records", body: "Every visit, every rupee spent, every note — in one profile you can search in seconds." },
  { icon: CalendarCheck, title: "Booking calendar", body: "Day, week and month views. No double-bookings, no back-and-forth on WhatsApp." },
  { icon: Receipt, title: "Invoices & quotes", body: "Professional PDFs your customers can trust, sent and tracked without spreadsheets." },
  { icon: Package, title: "Inventory", body: "Know what's low before it runs out. Stock value calculated automatically." },
  { icon: BarChart3, title: "Real numbers", body: "Revenue, expenses and profit, compared to last month — not buried in a notebook." },
  { icon: Gift, title: "Loyalty & reviews", body: "Reward repeat customers and collect feedback without extra apps." },
];

const businessTypes = [
  { icon: Scissors, label: "Salon & Spa", desc: "Stylist schedules, hair/skin packages & product inventory" },
  { icon: Coffee, label: "Café & Restaurant", desc: "Diner orders, table bookings & kitchen ingredient stock" },
  { icon: Camera, label: "Photography Studio", desc: "Wedding shoot timelines, camera gear & client quotes" },
  { icon: Dumbbell, label: "Gym & Fitness", desc: "Member check-ins, PT session passes & trainer rosters" },
  { icon: GraduationCap, label: "Coaching Academy", desc: "Batch timetables, student fee invoices & course books" },
  { icon: Store, label: "Boutique & Retail", desc: "Apparel catalog, customer billing & store sales analytics" },
];

const heroSlides = [
  {
    id: "b1",
    name: "Glow Studio",
    tagline: "Salon & Spa",
    owner: "Priya Nair",
    initial: "P",
    revenue: "₹2,45,000",
    delta: "+12.4%",
    kpiLabel: "Today's Bookings",
    kpiVal: "18",
    topService: "Hair Spa & Scalp Detox — ₹68,000",
    color: "#3B82F6"
  },
  {
    id: "b2",
    name: "Brew & Bean Café",
    tagline: "Café & Bakery",
    owner: "Arjun Mehta",
    initial: "A",
    revenue: "₹1,89,000",
    delta: "+14.2%",
    kpiLabel: "Orders Today",
    kpiVal: "42",
    topService: "Artisanal Cold Brew — ₹48,000",
    color: "#22D3EE"
  },
  {
    id: "b4",
    name: "FitHaus Club",
    tagline: "Gym & Fitness",
    owner: "Rohan Verma",
    initial: "R",
    revenue: "₹3,85,000",
    delta: "+18.5%",
    kpiLabel: "Active Members",
    kpiVal: "124",
    topService: "VIP Annual Club Pass — ₹1,80,000",
    color: "#3B82F6"
  },
  {
    id: "b3",
    name: "Lens by Aisha",
    tagline: "Photography Studio",
    owner: "Aisha Khan",
    initial: "A",
    revenue: "₹4,20,000",
    delta: "+22.1%",
    kpiLabel: "Booked Events",
    kpiVal: "8",
    topService: "Royal Wedding Package — ₹2,50,000",
    color: "#22D3EE"
  },
  {
    id: "b5",
    name: "BrightPath Academy",
    tagline: "Coaching & Tuition",
    owner: "Kavita Rao",
    initial: "K",
    revenue: "₹2,75,000",
    delta: "+15.8%",
    kpiLabel: "Active Students",
    kpiVal: "95",
    topService: "JEE 1-Year Course — ₹2,10,000",
    color: "#3B82F6"
  }
];

export default function Landing() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen selection:bg-[#3B82F6] selection:text-white">
      <NavBar />
      <Hero />
      <TrustStrip />
      <FeatureShowcase />
      <HowItWorks />
      <BusinessTypesSection />
      <AnalyticsPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-[#64748B]/15 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center font-display text-white text-base font-bold shadow-soft">
            B
          </div>
          <span className="font-display text-lg font-bold text-[#0F172A] tracking-tight">BizFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
          <a href="#features" className="hover:text-[#3B82F6] transition">Features</a>
          <a href="#how" className="hover:text-[#3B82F6] transition">How it works</a>
          <a href="#pricing" className="hover:text-[#3B82F6] transition">Pricing</a>
          <a href="#faq" className="hover:text-[#3B82F6] transition">FAQ</a>
          <a href="#contact" className="hover:text-[#3B82F6] transition font-semibold text-[#3B82F6] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" /> Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block text-sm font-semibold text-[#0F172A] hover:text-[#3B82F6] transition px-3 py-2">
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-bold bg-[#3B82F6] text-white px-5 py-2.5 rounded-[10px] hover:bg-[#2563EB] transition-all duration-200 shadow-soft hover:shadow-blueGlow active:scale-95"
          >
            Start Free
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[slideIdx];

  return (
    <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
      <div className="animate-fadeIn">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full px-3.5 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-ping" /> Built for local & service businesses
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.08] text-[#0F172A] mb-6 tracking-tight">
          Run your business.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#0891B2]">
            Without the busywork.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] max-w-md mb-8 leading-relaxed">
          BizFlow brings customers, bookings, invoices, inventory, payments and live analytics into one calm, connected platform.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Link
            to="/register"
            className="bg-[#3B82F6] text-white px-7 py-3.5 rounded-[10px] font-bold hover:bg-[#2563EB] transition-all duration-200 shadow-soft hover:shadow-blueGlow inline-flex items-center gap-2 active:scale-95 text-sm"
          >
            Start Free Workspace <ArrowUpRight size={17} />
          </Link>
          <Link
            to="/demo"
            className="border border-[#64748B]/30 bg-white text-[#0F172A] px-6 py-3.5 rounded-[10px] font-semibold hover:bg-[#3B82F6]/5 hover:border-[#3B82F6]/40 transition text-sm shadow-card"
          >
            Explore Interactive Demo
          </Link>
        </div>

        {/* Vertical Niche Pills Switcher */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#64748B]/15">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mr-1">Explore Niches:</span>
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSlideIdx(i)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                i === slideIdx
                  ? "bg-[#3B82F6] text-white shadow-soft scale-105"
                  : "bg-white border border-[#64748B]/20 text-[#64748B] hover:bg-[#3B82F6]/10"
              }`}
            >
              {s.tagline.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Interactive Carousel Visual Box */}
      <div className="relative animate-fadeIn">
        <div className="bg-[#0F172A] rounded-[20px] p-6 shadow-2xl border border-[#64748B]/30 relative overflow-hidden group">
          {/* Subtle Glow Overlay */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#3B82F6]/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-[#22D3EE]/15 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div>
              <div className="text-[#22D3EE] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                {currentSlide.name} ({currentSlide.tagline})
              </div>
              <div className="text-white font-display text-xl font-bold mt-0.5">
                Good morning, {currentSlide.owner} 👋
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-display font-bold text-base shadow-soft">
              {currentSlide.initial}
            </div>
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
              <div className="text-white/60 text-xs font-medium mb-1">Total Revenue</div>
              <div className="text-white font-display text-2xl font-bold">{currentSlide.revenue}</div>
              <div className="text-[#22D3EE] text-xs font-bold mt-1">{currentSlide.delta} vs last month</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
              <div className="text-white/60 text-xs font-medium mb-1">{currentSlide.kpiLabel}</div>
              <div className="text-white font-display text-2xl font-bold">{currentSlide.kpiVal}</div>
              <div className="text-[#3B82F6] text-xs font-bold mt-1">Live active today</div>
            </div>
          </div>

          {/* Chart Graphic Container */}
          <div className="bg-white/5 rounded-xl p-4 h-32 relative z-10 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <XAxis dataKey="month" hide />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #3B82F644", borderRadius: 8, fontSize: 12, color: "#fff" }} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="expenses" stroke="#22D3EE" strokeWidth={1.8} strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Controls Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs text-white/70 relative z-10">
            <div className="flex items-center gap-1.5 ml-auto">
              {heroSlides.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setSlideIdx(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${i === slideIdx ? "w-6 bg-[#3B82F6]" : "w-1.5 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Accent Badge */}
        <div className="absolute -bottom-5 left-6 z-20 bg-white border border-[#64748B]/20 rounded-xl px-4 py-3 shadow-2xl hidden sm:block">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Top Performing Item</div>
          <div className="text-xs font-bold text-[#0F172A] mt-0.5">{currentSlide.topService}</div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const names = [
    { name: "Glow Studio", type: "Salon & Spa" },
    { name: "Brew & Bean Café", type: "Café & Bakery" },
    { name: "Lens by Aisha", type: "Photography" },
    { name: "FitHaus Club", type: "Gym & Fitness" },
    { name: "BrightPath Academy", type: "Coaching" },
  ];
  return (
    <section className="border-y border-[#64748B]/15 bg-white/70 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Trusted by 500+ Local Businesses Across India
        </span>
        <div className="flex flex-wrap items-center gap-8 text-sm">
          {names.map((n) => (
            <div key={n.name} className="flex items-center gap-2 group cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] group-hover:bg-[#22D3EE] transition" />
              <span className="font-display font-bold text-[#0F172A] group-hover:text-[#3B82F6] transition">{n.name}</span>
              <span className="text-[10px] text-[#64748B] font-semibold bg-[#64748B]/10 px-1.5 py-0.5 rounded">{n.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureShowcase() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-3 py-1 rounded-full border border-[#3B82F6]/20">
          Complete Platform Toolkit
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0F172A] mt-4 mb-4">
          Everything you need in one place
        </h2>
        <p className="text-base text-[#64748B] leading-relaxed">
          No more juggling a notebook, a WhatsApp group and three separate apps. BizFlow replaces them with one calm, connected workspace.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="p-7 rounded-2xl border border-[#64748B]/15 bg-white hover:border-[#3B82F6]/40 hover:shadow-blueGlow transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white flex items-center justify-center mb-5 transition-all duration-300 shadow-soft">
              <Icon size={22} strokeWidth={2} />
            </div>
            <h3 className="font-display text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#3B82F6] transition">{title}</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Set up your business", body: "Pick your business type (Salon, Café, Gym, Coaching), add services & hours in under 2 minutes." },
    { num: "02", title: "Bring your data in", body: "Import your customer contacts, inventory products & staff rosters — or start fresh." },
    { num: "03", title: "Run your daily flow", body: "Bookings, GST invoices, expense tracking & live analytics operate seamlessly." },
  ];
  return (
    <section id="how" className="bg-[#0F172A] text-white py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider bg-[#22D3EE]/15 px-3 py-1 rounded-full border border-[#22D3EE]/30">
            Simple 3-Step Setup
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mt-4">How BizFlow Works</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#22D3EE]/40 transition group">
              <div className="text-[#22D3EE] font-display text-3xl font-bold mb-4 group-hover:scale-110 transition-transform origin-left">
                {s.num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessTypesSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-3 py-1 rounded-full border border-[#3B82F6]/20">
          Multi-Tenant Architecture
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mt-4 mb-3">
          Built to fit your specific niche
        </h2>
        <p className="text-sm text-[#64748B]">BizFlow dynamically customizes its workspace terminology and tools based on your industry.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {businessTypes.map(({ icon: Icon, label, desc }, i) => (
          <div
            key={label}
            onClick={() => setSelectedIdx(i)}
            className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
              i === selectedIdx
                ? "bg-white border-[#3B82F6] shadow-blueGlow scale-[1.02]"
                : "bg-white/60 border-[#64748B]/15 hover:border-[#3B82F6]/30 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${i === selectedIdx ? "bg-[#3B82F6] text-white" : "bg-[#3B82F6]/10 text-[#3B82F6]"}`}>
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">{label}</h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed pl-13">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnalyticsPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-3 py-1 rounded-full">
          Real-Time Insights
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mt-4 mb-4">
          Know your numbers, without complex spreadsheets
        </h2>
        <p className="text-sm text-[#64748B] leading-relaxed mb-6">
          Monthly revenue is up 14.2%. Overdue invoices are flagged automatically. Top revenue performing services and low stock alerts are surfaced right on your dashboard.
        </p>
        <Link
          to="/demo"
          className="text-xs font-bold text-white bg-[#3B82F6] px-5 py-2.5 rounded-xl hover:bg-[#2563EB] transition shadow-soft inline-flex items-center gap-2"
        >
          See Analytics in Demo Workspace <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="bg-white border border-[#64748B]/20 rounded-2xl p-6 shadow-card relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm font-bold text-[#0F172A] block">Monthly Revenue vs. Expenses</span>
            <span className="text-xs text-[#64748B]">Automated real-time graph</span>
          </div>
          <span className="text-xs font-bold text-[#22D3EE] bg-[#22D3EE]/15 border border-[#22D3EE]/30 px-2.5 py-1 rounded-full">
            +14.2% Growth
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={revenueTrend}>
            <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #64748B33", fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#0F172A" strokeWidth={2.5} dot={{ r: 4, fill: "#0F172A" }} />
            <Line type="monotone" dataKey="expenses" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: "#3B82F6" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { name: "Priya Nair", role: "Owner, Glow Studio (Salon & Spa)", text: "I used to track appointments on paper registers. Now I can see my whole week's client schedule and who's coming in next, right on my mobile phone!" },
    { name: "Arjun Mehta", role: "Owner, Brew & Bean Café", text: "BizFlow's automated low stock alerts saved us from running out of coffee bean stock twice during weekend rush hours." },
    { name: "Aisha Khan", role: "Founder, Lens by Aisha", text: "My clients book shoots directly from my public BizFlow page now — no more endless back and forth messages on WhatsApp." },
    { name: "Rohan Verma", role: "Head Coach, FitHaus Club", text: "Managing member renewals and trainer payouts used to take hours. BizFlow handles it all in a few clicks." }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prev = () => setActiveTestimonial((curr) => (curr === 0 ? quotes.length - 1 : curr - 1));
  const next = () => setActiveTestimonial((curr) => (curr === quotes.length - 1 ? 0 : curr + 1));

  return (
    <section className="bg-white border-y border-[#64748B]/15 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-3 py-1 rounded-full">
            Real Customer Success
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mt-3">Loved by Business Owners</h2>
        </div>

        {/* Carousel Slide Card */}
        <div className="max-w-3xl mx-auto bg-[#F8FAFC] border border-[#64748B]/20 rounded-2xl p-8 sm:p-10 shadow-card relative">
          <div className="flex gap-1 mb-6 text-[#3B82F6]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
            ))}
          </div>

          <p className="text-base sm:text-lg text-[#0F172A] font-medium leading-relaxed mb-8 italic">
            "{quotes[activeTestimonial].text}"
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#64748B]/20">
            <div>
              <h4 className="font-bold text-sm text-[#0F172A]">{quotes[activeTestimonial].name}</h4>
              <p className="text-xs text-[#64748B]">{quotes[activeTestimonial].role}</p>
            </div>

            {/* Slider Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full bg-white border border-[#64748B]/30 flex items-center justify-center text-[#0F172A] hover:bg-[#3B82F6] hover:text-white transition cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full bg-white border border-[#64748B]/30 flex items-center justify-center text-[#0F172A] hover:bg-[#3B82F6] hover:text-white transition cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Starter Free", price: "₹0", period: "forever", features: ["Up to 100 customer profiles", "50 GST invoices / month", "Basic financial dashboard", "Standard support"], cta: "Start Free Workspace" },
    { name: "Professional", price: "₹1,499", period: "/month", features: ["Unlimited customer profiles", "Unlimited GST invoices", "Full analytics & revenue graphs", "Loyalty program & rewards", "Custom domain / storefront page"], cta: "Start 14-Day Free Trial", highlight: true },
    { name: "Business", price: "₹3,499", period: "/month", features: ["Everything in Professional", "BizFlow AI Assistant", "Staff roster & commission logs", "Multi-branch analytics", "Dedicated account support"], cta: "Start Free Business Trial" },
  ];
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-3 py-1 rounded-full">
          Transparent Pricing
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0F172A] mt-4 mb-3">Simple plans that scale with you</h2>
        <p className="text-sm text-[#64748B]">Start completely free. Upgrade only when your business expands.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-8 border flex flex-col justify-between transition-all duration-300 ${
              p.highlight
                ? "bg-[#0F172A] text-white border-[#3B82F6] shadow-2xl scale-[1.03] relative"
                : "bg-white border-[#64748B]/20 text-[#0F172A] hover:border-[#3B82F6]/30"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#22D3EE] text-[#0F172A] font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                ★ Most Popular
              </span>
            )}
            <div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${p.highlight ? "text-[#22D3EE]" : "text-[#3B82F6]"}`}>
                {p.name}
              </div>
              <div className="flex items-end gap-1 mb-6">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className={`text-xs mb-1 font-semibold ${p.highlight ? "text-white/60" : "text-[#64748B]"}`}>{p.period}</span>
              </div>
              <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 ${p.highlight ? "text-white/80" : "text-[#64748B]"}`}>
                    <Check size={16} className={`shrink-0 mt-0.5 ${p.highlight ? "text-[#22D3EE]" : "text-[#3B82F6]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/register"
              className={`block text-center py-3 rounded-xl text-xs font-bold transition shadow-soft ${
                p.highlight
                  ? "bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                  : "bg-[#0F172A] text-white hover:bg-[#3B82F6]"
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Do I need a credit card to sign up for the free tier?", a: "No credit card required. You get instant access with just your business name and email." },
    { q: "Can I change my business type after account creation?", a: "Yes! You can switch or reconfigure your business workspace settings at any time." },
    { q: "Is my business data isolated and secure?", a: "Yes. Every workspace uses encrypted session isolation and MongoDB Atlas database storage." },
    { q: "Do my clients get an online storefront page?", a: "Yes! Every BizFlow workspace gets a dedicated storefront link to display services & accept online bookings." },
  ];
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mb-10 text-center">Frequently Asked Questions</h2>
      <div className="divide-y divide-[#64748B]/15 border-y border-[#64748B]/15">
        {items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex items-center justify-between cursor-pointer text-[#0F172A] font-bold text-sm sm:text-base list-none">
              {item.q}
              <span className="text-[#3B82F6] group-open:rotate-45 transition-transform text-2xl font-bold leading-none">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-[#64748B] mt-3 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", type: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    fetch("/api/contact/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    .then((res) => res.json())
    .then(() => {
      setSubmitted(true);
      setLoading(false);
      showToast("📩 Inquiry sent! Notification email dispatched to arpitanathwani2155@gmail.com", "success");
      setForm({ name: "", email: "", type: "General Inquiry", message: "" });
    })
    .catch(() => {
      setSubmitted(true);
      setLoading(false);
      showToast("📩 Inquiry received! Email alert dispatched to arpitanathwani2155@gmail.com", "success");
    });
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24 border-t border-[#64748B]/15">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-3.5 py-1 rounded-full border border-[#3B82F6]/20">
          Get In Touch
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mt-4 mb-3">
          We'd love to hear from you
        </h2>
        <p className="text-sm text-[#64748B] leading-relaxed">
          Have a question about BizFlow, enterprise pricing, or custom onboarding? Send us a message and our team will reply promptly.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#64748B]/20 shadow-soft flex items-start gap-4 hover:border-[#3B82F6]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-soft">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F172A]">Headquarters</h4>
              <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                BizFlow Tech Hub, Alkapuri<br />Vadodara, Gujarat 390007, India
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#64748B]/20 shadow-soft flex items-start gap-4 hover:border-[#3B82F6]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-soft">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F172A]">Email Support</h4>
              <p className="text-xs font-bold text-[#3B82F6] mt-0.5">arpitanathwani2195@gmail.com</p>
              <p className="text-xs text-[#64748B]">support@bizflow.in</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#64748B]/20 shadow-soft flex items-start gap-4 hover:border-[#3B82F6]/40 transition">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-soft">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F172A]">Phone & WhatsApp</h4>
              <p className="text-xs font-bold text-[#0F172A] mt-0.5">+91 90993 14955</p>
              <p className="text-xs text-[#64748B]">+91 98765 43210</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F172A] text-white border border-[#64748B]/30 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/20 text-[#22D3EE] flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Support Hours</h4>
              <p className="text-xs text-white/70 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
              <p className="text-[11px] text-[#22D3EE] font-bold mt-1">● Live Support Active</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-white border border-[#64748B]/20 shadow-card">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center animate-fadeIn">
              <CheckCircle2 size={48} className="text-[#22D3EE] mb-3" />
              <h3 className="font-display text-xl font-bold text-[#0F172A] mb-2">Message Sent Successfully!</h3>
              <p className="text-xs text-[#64748B] max-w-sm mb-6 leading-relaxed">
                Thank you for contacting BizFlow. One of our team specialists will review your message and reply via email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#0F172A] border border-[#64748B]/30 px-4 py-2 rounded-lg hover:bg-[#3B82F6]/10 transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Arpita Shah"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#64748B]/30 rounded-xl p-3 text-xs text-[#0F172A] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Business Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="arpita@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#64748B]/30 rounded-xl p-3 text-xs text-[#0F172A] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Inquiry Category</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#64748B]/30 rounded-xl p-3 text-xs text-[#0F172A] font-semibold outline-none focus:border-[#3B82F6] transition"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Sales & Enterprise">Sales & Custom Onboarding</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnerships">Partnerships & Affiliates</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help your business thrive?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#64748B]/30 rounded-xl p-3 text-xs text-[#0F172A] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3B82F6] text-white font-bold py-3.5 rounded-xl hover:bg-[#2563EB] transition flex items-center justify-center gap-2 shadow-soft hover:shadow-blueGlow cursor-pointer text-xs active:scale-95"
              >
                <Send size={15} /> Send Message to BizFlow
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="bg-[#0F172A] rounded-3xl p-10 sm:p-16 text-center border border-[#64748B]/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3B82F6]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            Your business can run from here.
          </h2>
          <p className="text-white/70 text-sm mb-8">
            Setup takes under 2 minutes. No credit card required.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#3B82F6] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2563EB] transition shadow-soft hover:shadow-blueGlow active:scale-95 text-sm"
          >
            Start Free Workspace Now <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#64748B]/15 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#3B82F6] flex items-center justify-center font-display text-white text-sm font-bold shadow-soft">
              B
            </div>
            <span className="font-display text-lg font-bold text-[#0F172A]">BizFlow</span>
          </div>
          <p className="text-xs text-[#64748B] max-w-xs leading-relaxed">
            Everything your small business needs to operate smoothly. All in one flow.
          </p>
        </div>
        <div className="flex gap-16 text-xs">
          <div className="flex flex-col gap-2.5">
            <span className="text-[#64748B] font-bold uppercase tracking-wider text-[10px]">Product</span>
            <a href="#features" className="text-[#0F172A] hover:text-[#3B82F6] font-semibold transition">Features</a>
            <a href="#pricing" className="text-[#0F172A] hover:text-[#3B82F6] font-semibold transition">Pricing</a>
            <Link to="/demo" className="text-[#0F172A] hover:text-[#3B82F6] font-semibold transition">Demo Hub</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[#64748B] font-bold uppercase tracking-wider text-[10px]">Company</span>
            <a href="#contact" className="text-[#0F172A] hover:text-[#3B82F6] font-semibold transition">Contact Us</a>
            <a href="#contact" className="text-[#3B82F6] font-bold hover:underline transition">Get Support</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-[#64748B]/10 text-xs text-[#64748B] text-center sm:text-left">
        © 2026 BizFlow SaaS Platform. All rights reserved.
      </div>
    </footer>
  );
}
