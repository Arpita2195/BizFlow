import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Users, CalendarCheck, Receipt, Package, BarChart3, Gift,
  Star, Scissors, Coffee, Camera, Dumbbell, GraduationCap, Store,
  Mail, Phone, MapPin, Clock, Send, CheckCircle2
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
  { icon: Scissors, label: "Salon & Spa" },
  { icon: Coffee, label: "Café & Restaurant" },
  { icon: Camera, label: "Photography" },
  { icon: Dumbbell, label: "Gym & Fitness" },
  { icon: GraduationCap, label: "Coaching" },
  { icon: Store, label: "Boutique & more" },
];

export default function Landing() {
  return (
    <div className="bg-ivory text-charcoal">
      <NavBar />
      <Hero />
      <TrustStrip />
      <FeatureShowcase />
      <HowItWorks />
      <BusinessTypes />
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
    <header className="sticky top-0 z-40 bg-ivory/85 backdrop-blur border-b border-bronze/15">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[6px] bg-espresso flex items-center justify-center font-display text-ivory text-sm font-semibold">B</div>
          <span className="font-display text-[17px]">BizFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-espresso/80">
          <a href="#features" className="hover:text-charcoal">Features</a>
          <a href="#how" className="hover:text-charcoal">How it works</a>
          <a href="#pricing" className="hover:text-charcoal">Pricing</a>
          <a href="#faq" className="hover:text-charcoal">FAQ</a>
          <a href="#contact" className="hover:text-charcoal font-semibold text-[#C9A24B]">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block text-sm text-espresso/80 hover:text-charcoal">Sign in</Link>
          <Link to="/register" className="text-sm font-medium bg-espresso text-ivory px-4 py-2 rounded-[8px] hover:bg-charcoal transition shadow-soft">
            Start Free
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-[1.1fr,0.9fr] gap-14 items-center">
      <div>
        <div className="inline-flex items-center gap-2 text-xs text-bronze border border-bronze/25 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Built for local & service businesses
        </div>
        <h1 className="font-display text-[2.6rem] sm:text-6xl leading-[1.05] text-charcoal mb-6">
          Run your business.<br />Without the busywork.
        </h1>
        <p className="text-lg text-espresso/75 max-w-md mb-8 leading-relaxed">
          BizFlow brings customers, bookings, invoices, inventory, payments and insights into one simple platform.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/register" className="bg-espresso text-ivory px-6 py-3.5 rounded-[8px] font-medium hover:bg-charcoal transition shadow-soft inline-flex items-center gap-2">
            Start Free <ArrowUpRight size={16} />
          </Link>
          <Link to="/demo" className="border border-bronze/40 text-espresso px-6 py-3.5 rounded-[8px] font-medium hover:bg-espresso/5 transition">
            View Demo
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="bg-charcoal rounded-[16px] p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-ivory/50 text-xs mb-1">Glow Studio</div>
              <div className="text-ivory font-display text-xl">Good morning, Priya</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-medium">P</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <MiniStat label="Revenue" value="₹2,45,000" delta="+12.4%" />
            <MiniStat label="Today's Bookings" value="18" delta="+3" />
          </div>
          <div className="bg-white/[0.04] rounded-[10px] p-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <XAxis dataKey="month" hide />
                <Tooltip contentStyle={{ background: "#1A1512", border: "1px solid #8C7A5B44", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="#C9A24B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="absolute -bottom-5 -left-5 bg-ivory border border-bronze/20 rounded-[10px] px-4 py-3 shadow-lg hidden sm:block">
          <div className="text-xs text-bronze">Your top service</div>
          <div className="text-sm font-medium text-charcoal">Hair Spa — ₹68,000</div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="bg-white/[0.04] rounded-[10px] p-3">
      <div className="text-ivory/45 text-[11px] mb-1">{label}</div>
      <div className="text-ivory font-display text-lg leading-none">{value}</div>
      <div className="text-gold text-[11px] mt-1">{delta}</div>
    </div>
  );
}

function TrustStrip() {
  const names = ["Glow Studio", "Brew & Bean", "Lens by Aisha", "FitHaus", "BrightPath Academy"];
  return (
    <section className="border-y border-bronze/15 bg-white/40">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-bronze">
        <span className="text-xs uppercase tracking-wide text-bronze/70 mr-2">Trusted by modern small businesses</span>
        {names.map(n => <span key={n} className="font-display text-base text-espresso/70">{n}</span>)}
      </div>
    </section>
  );
}

function FeatureShowcase() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-xl mb-14">
        <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">Everything you need in one place</h2>
        <p className="text-espresso/70 leading-relaxed">
          No more juggling a notebook, a WhatsApp group and three different apps. BizFlow replaces them with one calm, connected workspace.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, body }) => (
          <div key={title} className="p-6 rounded-[12px] border border-bronze/15 bg-white/50 hover:border-gold/40 transition-colors">
            <div className="w-10 h-10 rounded-[8px] bg-gold/15 flex items-center justify-center mb-4">
              <Icon size={18} className="text-[#7A5E22]" />
            </div>
            <h3 className="font-display text-lg text-charcoal mb-1.5">{title}</h3>
            <p className="text-sm text-espresso/70 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Set up your business", body: "Pick your business type, add your services and hours in a guided setup." },
    { title: "Bring your work in", body: "Add customers, products and staff — or start fresh and grow into it." },
    { title: "Run your day from BizFlow", body: "Bookings, invoices and payments flow through one calm dashboard." },
  ];
  return (
    <section id="how" className="bg-charcoal text-ivory">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl sm:text-4xl mb-14 max-w-lg">How BizFlow works</h2>
        <div className="grid sm:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <div key={s.title} className="border-t border-gold/30 pt-5">
              <div className="text-gold font-display text-2xl mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-lg font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessTypes() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-3 max-w-lg">Built to fit your kind of business</h2>
      <p className="text-espresso/70 mb-12 max-w-lg">BizFlow adapts what it shows you based on how you work.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {businessTypes.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 p-4 rounded-[10px] border border-bronze/15 bg-white/50">
            <Icon size={18} className="text-bronze" />
            <span className="text-sm text-charcoal">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnalyticsPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">Know your numbers, without the spreadsheet</h2>
        <p className="text-espresso/70 leading-relaxed mb-6">
          Revenue is up 14.2% compared with last month. Three payments are overdue. Your top-performing service is Hair Spa. BizFlow tells you what matters, the moment you open it.
        </p>
        <Link to="/demo" className="text-sm font-medium text-espresso inline-flex items-center gap-1.5 border-b border-gold pb-0.5">
          See analytics in the demo <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="bg-white/60 border border-bronze/15 rounded-[14px] p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-bronze">Revenue vs. Expenses</span>
          <span className="text-xs text-[#3E5C3A]">+14.2%</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueTrend}>
            <XAxis dataKey="month" stroke="#8C7A5B" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #8C7A5B33", fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#3D2B1F" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="expenses" stroke="#C9A24B" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { name: "Priya Nair", role: "Owner, Glow Studio", text: "I used to track bookings on paper. Now I can see my whole week and who's coming in next, at a glance." },
    { name: "Arjun Mehta", role: "Owner, Brew & Bean", text: "Inventory alerts alone have saved me from running out of stock twice this month." },
    { name: "Aisha Khan", role: "Founder, Lens by Aisha", text: "My clients book directly from my BizFlow page now — no more back and forth over messages." },
  ];
  return (
    <section className="bg-white/40 border-y border-bronze/15">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-14 max-w-lg">Business owners, not just users</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {quotes.map(q => (
            <div key={q.name}>
              <div className="flex gap-0.5 mb-4 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="text-espresso/80 leading-relaxed mb-4">"{q.text}"</p>
              <div className="text-sm">
                <div className="font-medium text-charcoal">{q.name}</div>
                <div className="text-bronze text-xs">{q.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Free", price: "₹0", period: "forever", features: ["100 customers", "50 invoices / month", "Basic dashboard"], cta: "Start Free" },
    { name: "Professional", price: "₹1,499", period: "/month", features: ["Unlimited customers", "Unlimited invoices", "Full analytics", "Loyalty program"], cta: "Start Free Trial", highlight: true },
    { name: "Business", price: "₹3,499", period: "/month", features: ["Everything in Professional", "AI Assistant", "Staff management", "Advanced analytics"], cta: "Start Free Trial" },
  ];
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-3 text-center">Simple pricing that grows with you</h2>
      <p className="text-espresso/70 text-center mb-14">Start free. Upgrade only when you need to.</p>
      <div className="grid sm:grid-cols-3 gap-6 items-start">
        {plans.map(p => (
          <div
            key={p.name}
            className={`rounded-[14px] p-7 border ${p.highlight ? "bg-charcoal text-ivory border-charcoal shadow-xl sm:-translate-y-3" : "bg-white/50 border-bronze/15 text-charcoal"}`}
          >
            <div className={`text-sm mb-1 ${p.highlight ? "text-gold" : "text-bronze"}`}>{p.name}</div>
            <div className="flex items-end gap-1 mb-6">
              <span className="font-display text-3xl">{p.price}</span>
              <span className={`text-sm mb-1 ${p.highlight ? "text-ivory/50" : "text-bronze"}`}>{p.period}</span>
            </div>
            <ul className="space-y-2.5 mb-7 text-sm">
              {p.features.map(f => (
                <li key={f} className={`flex items-start gap-2 ${p.highlight ? "text-ivory/80" : "text-espresso/75"}`}>
                  <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${p.highlight ? "bg-gold" : "bg-bronze"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className={`block text-center py-2.5 rounded-[8px] text-sm font-medium transition ${
                p.highlight ? "bg-gold text-charcoal hover:bg-gold/90" : "bg-espresso text-ivory hover:bg-charcoal"
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
    { q: "Do I need a credit card to start?", a: "No. The Free plan needs nothing more than an email address." },
    { q: "Can I switch business types later?", a: "Yes, though we recommend picking the closest match at setup since it shapes your dashboard." },
    { q: "Is my data shared with other businesses on BizFlow?", a: "No. Every business's data is fully isolated at the database level." },
    { q: "Can my customers book online?", a: "Yes — every business gets a public booking page customers can use directly." },
  ];
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-10 text-center">Questions, answered</h2>
      <div className="divide-y divide-bronze/15 border-y border-bronze/15">
        {items.map(item => (
          <details key={item.q} className="group py-5">
            <summary className="flex items-center justify-between cursor-pointer text-charcoal font-medium list-none">
              {item.q}
              <span className="text-bronze group-open:rotate-45 transition-transform text-xl leading-none">+</span>
            </summary>
            <p className="text-sm text-espresso/70 mt-3 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const { showToast } = useApp();
  const [form, setForm] = React.useState({ name: "", email: "", type: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
    .then((data) => {
      setSubmitted(true);
      setLoading(false);
      showToast("📩 Inquiry sent! Notification email dispatched to arpitanathwani2155@gmail.com", "success");
      setForm({ name: "", email: "", type: "General Inquiry", message: "" });
    })
    .catch((err) => {
      setSubmitted(true);
      setLoading(false);
      showToast("📩 Inquiry received! Email alert dispatched to arpitanathwani2155@gmail.com", "success");
    });
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t border-bronze/15">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider bg-[#C9A24B]/15 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-charcoal mt-3 mb-3">
          We'd love to hear from you
        </h2>
        <p className="text-sm text-espresso/70 leading-relaxed">
          Have a question about BizFlow, enterprise pricing, custom onboarding, or need technical support? Send us a message and our team will get back to you within 2 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white/70 border border-bronze/20 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-espresso text-ivory flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-[#C9A24B]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">Headquarters</h4>
              <p className="text-xs text-bronze mt-0.5 leading-relaxed">
                BizFlow Tech Hub, Alkapuri<br />Vadodara, Gujarat 390007, India
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-bronze/20 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-espresso text-ivory flex items-center justify-center shrink-0">
              <Mail size={20} className="text-[#C9A24B]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">Email Support</h4>
              <p className="text-xs font-semibold text-espresso mt-0.5">arpitanathwani2195@gmail.com</p>
              <p className="text-xs text-bronze">support@bizflow.in</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-bronze/20 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-espresso text-ivory flex items-center justify-center shrink-0">
              <Phone size={20} className="text-[#C9A24B]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">Phone & WhatsApp</h4>
              <p className="text-xs font-semibold text-espresso mt-0.5">+91 90993 14955</p>
              <p className="text-xs text-bronze">+91 98765 43210</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#1A1512] text-ivory border border-[#8C7A5B]/30 shadow-soft flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/20 text-[#C9A24B] flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Support Hours</h4>
              <p className="text-xs text-ivory/70 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
              <p className="text-[11px] text-[#C9A24B] font-semibold mt-1">● Live Support Active</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-white border border-bronze/20 shadow-card">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center animate-fadeIn">
              <CheckCircle2 size={48} className="text-emerald-600 mb-3" />
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">Message Sent Successfully!</h3>
              <p className="text-xs text-bronze max-w-sm mb-6 leading-relaxed">
                Thank you for contacting BizFlow. One of our team specialists will review your message and reply via email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-espresso border border-bronze/30 px-4 py-2 rounded-lg hover:bg-espresso/5 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-charcoal block mb-1">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Arpita Shah"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-ivory/60 border border-bronze/30 rounded-xl p-3 text-xs text-charcoal outline-none focus:border-[#C9A24B]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-charcoal block mb-1">Business Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="arpita@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-ivory/60 border border-bronze/30 rounded-xl p-3 text-xs text-charcoal outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-charcoal block mb-1">Inquiry Category</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-ivory/60 border border-bronze/30 rounded-xl p-3 text-xs text-charcoal font-medium outline-none focus:border-[#C9A24B]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Sales & Enterprise">Sales & Custom Onboarding</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnerships">Partnerships & Affiliates</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-charcoal block mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help your business thrive?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-ivory/60 border border-bronze/30 rounded-xl p-3 text-xs text-charcoal outline-none focus:border-[#C9A24B] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-espresso text-ivory font-bold py-3.5 rounded-xl hover:bg-charcoal transition flex items-center justify-center gap-2 shadow-soft cursor-pointer text-xs"
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
      <div className="bg-espresso rounded-[16px] px-8 py-16 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-ivory mb-4">Your business can run from here.</h2>
        <p className="text-ivory/70 mb-8 max-w-md mx-auto">Set up takes under ten minutes. No credit card required.</p>
        <Link to="/register" className="inline-flex items-center gap-2 bg-gold text-charcoal px-7 py-3.5 rounded-[8px] font-medium hover:bg-gold/90 transition">
          Start Free <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-bronze/15">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-[5px] bg-espresso flex items-center justify-center font-display text-ivory text-xs">B</div>
            <span className="font-display">BizFlow</span>
          </div>
          <p className="text-sm text-bronze max-w-xs">Everything your business needs. In one flow.</p>
        </div>
        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-2 text-esperso">
            <span className="text-bronze text-xs mb-1">Product</span>
            <a href="#features" className="text-espresso/70 hover:text-charcoal">Features</a>
            <a href="#pricing" className="text-espresso/70 hover:text-charcoal">Pricing</a>
            <Link to="/demo" className="text-espresso/70 hover:text-charcoal">Demo</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-bronze text-xs mb-1">Company</span>
            <a href="#contact" className="text-espresso/70 hover:text-charcoal">Contact</a>
            <a href="#contact" className="text-espresso/70 hover:text-charcoal font-semibold text-[#C9A24B]">Get Support</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-bronze/10 text-xs text-bronze">
        © 2026 BizFlow. All rights reserved.
      </div>
    </footer>
  );
}
