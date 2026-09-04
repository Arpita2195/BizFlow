import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check, Building2, Sparkles, Image as ImageIcon, MapPin, Phone,
  Clock, Package, Users, PartyPopper, Upload, CheckCircle, User as UserIcon
} from "lucide-react";
import { Input, Button, Select } from "../../components/ui/Primitives";
import { businessTypeLabels, BusinessType } from "../../data/demoData";
import { useApp } from "../../context/AppContext";
import OperatingHoursEditor from "../../components/ui/OperatingHoursEditor";

const steps = [
  { key: "name", label: "Business Name", icon: Building2 },
  { key: "type", label: "Business Vertical", icon: Sparkles },
  { key: "logo", label: "Logo & Branding", icon: ImageIcon },
  { key: "location", label: "Location", icon: MapPin },
  { key: "contact", label: "Phone & Email", icon: Phone },
  { key: "hours", label: "Working Hours", icon: Clock },
  { key: "offerings", label: "Services / Products", icon: Package },
  { key: "staff", label: "Team Members", icon: Users },
  { key: "finish", label: "Workspace Ready", icon: PartyPopper },
];

export default function Onboarding() {
  const { user, createFreshAccountWorkspace, showToast } = useApp();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState(user.name !== "Priya Nair" ? user.name : "Arpita Shah");
  const [name, setName] = useState("My Business");
  const [type, setType] = useState<BusinessType>("salon");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [location, setLocation] = useState("Vadodara, Gujarat");
  const [phone, setPhone] = useState("+91 98765 00000");
  const [email, setEmail] = useState(user.email !== "priya@glowstudio.in" ? user.email : "owner@business.com");

  // Editable Operating Hours state
  const [businessHours, setBusinessHours] = useState("Mon-Sat: 10:00 AM - 08:00 PM | Sun: 11:00 AM - 06:00 PM");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isLast = step === steps.length - 1;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoUrl(result);
        showToast("Business logo uploaded successfully!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const next = () => {
    if (isLast) {
      createFreshAccountWorkspace({
        ownerName: ownerName || "Business Owner",
        email: email || "owner@business.com",
        businessName: name || "My Business",
        type: type,
        location: location || "Vadodara, Gujarat",
        phone: phone || "+91 98765 00000",
        businessHours: businessHours,
        logoUrl: logoUrl || undefined
      });
      showToast(`Welcome ${ownerName}! Your workspace for ${name} is ready.`, "success");
      navigate("/app");
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1A1512] flex flex-col">
      <header className="px-6 lg:px-12 h-16 flex items-center justify-between border-b border-bronze/15 bg-white/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[7px] bg-[#C9A24B] flex items-center justify-center font-display text-[#1A1512] font-bold text-base">B</div>
          <span className="font-display text-lg font-bold text-charcoal">BizFlow Onboarding</span>
        </div>
        <span className="text-xs font-semibold text-bronze">Guided 9-Step Business Setup</span>
      </header>

      <div className="flex-1 grid lg:grid-cols-[280px,1fr]">
        {/* Progress rail */}
        <aside className="hidden lg:block border-r border-bronze/15 p-8 bg-white/20">
          <div className="flex flex-col gap-1">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3 py-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  i < step ? "bg-espresso text-ivory" : i === step ? "bg-gold text-charcoal" : "bg-bronze/15 text-bronze"
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-xs ${i === step ? "text-charcoal font-bold" : "text-bronze font-medium"}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile progress bar */}
        <div className="lg:hidden px-6 pt-6">
          <div className="h-2 bg-bronze/15 rounded-full overflow-hidden">
            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <p className="text-xs text-bronze font-semibold mt-2">Step {step + 1} of {steps.length} — {steps[step].label}</p>
        </div>

        {/* Step content */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md bg-white/70 p-8 rounded-2xl border border-bronze/20 shadow-card">
            <StepBody
              stepKey={steps[step].key}
              ownerName={ownerName} setOwnerName={setOwnerName}
              name={name} setName={setName}
              type={type} setType={setType}
              logoUrl={logoUrl} setLogoUrl={setLogoUrl}
              location={location} setLocation={setLocation}
              phone={phone} setPhone={setPhone}
              email={email} setEmail={setEmail}
              businessHours={businessHours} setBusinessHours={setBusinessHours}
              fileInputRef={fileInputRef}
              handleLogoUpload={handleLogoUpload}
            />
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-bronze/15">
              <Button variant="ghost" onClick={back} disabled={step === 0}>Back</Button>
              <Button onClick={next}>{isLast ? "Launch Workspace 🚀" : "Continue →"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepBody({
  stepKey, ownerName, setOwnerName, name, setName, type, setType, logoUrl, location, setLocation, phone, setPhone, email, setEmail,
  businessHours, setBusinessHours, fileInputRef, handleLogoUpload
}: any) {
  const heading: Record<string, [string, string]> = {
    name: ["What's your business called?", "Provide your owner name and business title."],
    type: ["Which business vertical matches best?", "We'll dynamically tailor stats, terminology, and modules."],
    logo: ["Upload logo & branding", "Upload your official brand logo or use an auto-generated monogram."],
    location: ["Where is your business located?", "Displayed on your invoices and online booking page."],
    contact: ["Phone & Email contacts", "Used for booking notifications and client communication."],
    hours: ["Operating Hours", "Clients will book within these available operational hours. Turn days open/closed and pick custom hours."],
    offerings: ["Initial services or products", "Add your main offerings to start accepting bookings immediately."],
    staff: ["Team & staff members", "Assign specialists and stylists to client appointments."],
    finish: ["Your workspace is ready!", "Click below to open your personalized BizFlow SaaS dashboard."],
  };
  const [title, sub] = heading[stepKey];

  return (
    <div className="animate-fadeIn">
      <h1 className="font-display text-2xl font-bold text-charcoal mb-1.5">{title}</h1>
      <p className="text-xs text-bronze mb-6 leading-relaxed">{sub}</p>

      {stepKey === "name" && (
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-charcoal">Your Full Name (Owner)</span>
            <Input placeholder="e.g. Arpita Shah" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-charcoal">Business Name</span>
            <Input placeholder="e.g. Glow Studio / Brew & Bean" value={name} onChange={e => setName(e.target.value)} />
          </label>
        </div>
      )}

      {stepKey === "type" && (
        <Select value={type} onChange={e => setType(e.target.value as any)}>
          {Object.entries(businessTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </Select>
      )}

      {stepKey === "logo" && (
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
          
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-bronze/30 hover:border-[#C9A24B] rounded-2xl h-44 flex flex-col items-center justify-center gap-2 text-bronze cursor-pointer bg-white/40 transition p-4 text-center group"
          >
            {logoUrl ? (
              <div className="flex flex-col items-center gap-2">
                <img src={logoUrl} alt="Uploaded logo preview" className="w-20 h-20 object-cover rounded-xl border border-bronze/30 shadow-md" />
                <span className="text-xs font-bold text-[#3E5C3A] flex items-center gap-1">
                  <CheckCircle size={14} /> Logo Uploaded Successfully (Click to Change)
                </span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-[#C9A24B]/20 flex items-center justify-center text-[#3D2B1F] group-hover:bg-[#C9A24B]/30 transition">
                  <Upload size={22} />
                </div>
                <span className="text-xs font-bold text-charcoal">Click to select business logo image</span>
                <span className="text-[10px] text-bronze">Supports PNG, JPG, WEBP, or SVG</span>
              </>
            )}
          </div>
        </div>
      )}

      {stepKey === "location" && (
        <Input placeholder="City, State" value={location} onChange={e => setLocation(e.target.value)} />
      )}

      {stepKey === "contact" && (
        <div className="flex flex-col gap-3">
          <Input placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
          <Input type="email" placeholder="Business Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      )}

      {/* FULLY EDITABLE OPERATING HOURS EDITOR */}
      {stepKey === "hours" && (
        <OperatingHoursEditor
          initialHoursString={businessHours}
          onChange={(str) => setBusinessHours(str)}
        />
      )}

      {stepKey === "offerings" && (
        <div className="flex flex-col gap-3">
          <Input placeholder="First service or product name" defaultValue="Premium Service Package" />
          <Input placeholder="Price (₹)" defaultValue="1800" />
        </div>
      )}

      {stepKey === "staff" && (
        <div className="flex flex-col gap-3">
          <Input placeholder="Staff member name" defaultValue={ownerName} />
          <Input placeholder="Role / Designation" defaultValue="Specialist / Owner" />
        </div>
      )}

      {stepKey === "finish" && (
        <div className="bg-gold/15 border border-gold/30 rounded-xl p-5 text-xs text-charcoal flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-12 h-12 object-cover rounded-xl border border-bronze/30 shadow-sm" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-espresso text-gold font-bold text-xl flex items-center justify-center">
                {(name || "B").charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-bold text-sm text-charcoal">{name || "Your Business"}</p>
              <p className="text-bronze text-xs">Owner: <strong>{ownerName}</strong> • {type.toUpperCase()} • {location}</p>
              <p className="text-[10px] text-espresso font-semibold mt-0.5 font-mono">Hours: {businessHours}</p>
            </div>
          </div>
          <p className="text-bronze">Your clean multi-tenant workspace is configured. No sample data attached.</p>
        </div>
      )}
    </div>
  );
}
