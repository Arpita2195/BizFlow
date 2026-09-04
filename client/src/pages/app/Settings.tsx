import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Card, Input, Button, Select } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";
import OperatingHoursEditor from "../../components/ui/OperatingHoursEditor";

const tabs = ["Business Profile", "Business Hours", "Invoice Settings", "Notifications", "Public Website"];

export default function Settings() {
  const { activeBusiness, setActiveBusiness, showToast } = useApp();
  const [tab, setTab] = useState(tabs[0]);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    name: activeBusiness.name,
    tagline: activeBusiness.tagline,
    location: activeBusiness.location,
    phone: activeBusiness.phone,
    email: activeBusiness.email,
    businessHours: activeBusiness.businessHours,
    taxRate: "5",
    invoicePrefix: "INV-2026-"
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const logoUrl = reader.result as string;
        setActiveBusiness({
          ...activeBusiness,
          logoUrl
        });
        showToast("New business logo updated!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setActiveBusiness({
      ...activeBusiness,
      name: form.name,
      tagline: form.tagline,
      location: form.location,
      phone: form.phone,
      email: form.email,
      businessHours: form.businessHours
    });
    showToast("Business profile updated successfully!", "success");
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader title="Business Settings" subtitle="Configure business profile, tax rules, invoice templates, and branding" />

      <div className="grid lg:grid-cols-[220px,1fr] gap-6">
        <div className="flex lg:flex-col gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-left px-3.5 py-2.5 rounded-[8px] text-xs font-semibold whitespace-nowrap transition ${
                tab === t ? "bg-espresso text-ivory" : "text-bronze hover:bg-espresso/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <Card className="p-6">
          {tab === "Business Profile" && (
            <div className="flex flex-col gap-4 max-w-lg text-xs">
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />

              <div className="flex items-center gap-4 mb-2">
                {activeBusiness.logoUrl ? (
                  <img
                    src={activeBusiness.logoUrl}
                    alt={activeBusiness.name}
                    className="w-16 h-16 rounded-[12px] object-cover border border-bronze/30 shadow-soft"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-[12px] bg-espresso text-gold flex items-center justify-center font-display text-2xl font-bold shadow-soft">
                    {activeBusiness.logoInitial}
                  </div>
                )}
                <div>
                  <Button size="sm" variant="secondary" onClick={() => logoInputRef.current?.click()}>
                    Change Logo
                  </Button>
                  <p className="text-[10px] text-bronze mt-1">Supports PNG, JPG, WEBP, or SVG</p>
                </div>
              </div>

              <Labeled label="Business Name">
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </Labeled>

              <Labeled label="Tagline / Slogan">
                <Input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
              </Labeled>

              <Labeled label="Physical Location">
                <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </Labeled>

              <div className="grid grid-cols-2 gap-4">
                <Labeled label="Business Phone">
                  <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </Labeled>
                <Labeled label="Support Email">
                  <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </Labeled>
              </div>

              <Button className="w-fit mt-2" onClick={handleSave}>Save Changes</Button>
            </div>
          )}

          {tab === "Business Hours" && (
            <div className="flex flex-col gap-4 max-w-lg text-xs">
              <OperatingHoursEditor
                initialHoursString={form.businessHours}
                onChange={(str) => setForm((prev) => ({ ...prev, businessHours: str }))}
              />
              <Button className="w-fit mt-2" onClick={handleSave}>Save Operating Hours Schedule</Button>
            </div>
          )}

          {tab === "Invoice Settings" && (
            <div className="flex flex-col gap-4 max-w-lg text-xs">
              <Labeled label="Invoice Prefix Format">
                <Input value={form.invoicePrefix} onChange={e => setForm({ ...form, invoicePrefix: e.target.value })} />
              </Labeled>
              <Labeled label="Default GST / Tax Rate (%)">
                <Input value={form.taxRate} onChange={e => setForm({ ...form, taxRate: e.target.value })} />
              </Labeled>
              <Labeled label="Standard Payment Terms">
                <Select defaultValue="7">
                  <option value="0">Due on receipt</option>
                  <option value="7">Net 7 days</option>
                  <option value="15">Net 15 days</option>
                  <option value="30">Net 30 days</option>
                </Select>
              </Labeled>
              <Button className="w-fit mt-2" onClick={handleSave}>Save Invoice Rules</Button>
            </div>
          )}

          {tab === "Notifications" && (
            <div className="flex flex-col gap-3 max-w-lg text-xs">
              {["New booking alerts", "Payment receipt notifications", "Invoice overdue warnings", "Low stock alerts", "Customer review notices"].map((n) => (
                <div key={n} className="flex items-center justify-between border border-bronze/15 rounded-[8px] px-4 py-3 bg-white/40">
                  <span className="font-bold text-charcoal">{n}</span>
                  <input type="checkbox" defaultChecked className="accent-gold w-4 h-4 cursor-pointer" />
                </div>
              ))}
            </div>
          )}

          {tab === "Public Website" && (
            <div className="flex flex-col gap-4 max-w-lg text-xs">
              <Labeled label="Public Storefront URL">
                <Input value={`http://localhost:5173/business/${activeBusiness.slug}`} disabled />
              </Labeled>
              <Labeled label="Primary Brand Accent Color">
                <div className="flex gap-3 items-center">
                  {["#3B82F6", "#22D3EE", "#0F172A"].map((c) => (
                    <button key={c} className="w-9 h-9 rounded-full border-2 border-white shadow-soft" style={{ background: c }} />
                  ))}
                </div>
              </Labeled>
              <Link
                to={`/business/${activeBusiness.slug}`}
                className="w-fit inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-espresso text-ivory text-xs font-semibold hover:bg-charcoal transition"
              >
                Preview Public Storefront
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold text-charcoal">{label}</span>
      {children}
    </label>
  );
}
