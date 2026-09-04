import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function AuthShell({
  title, subtitle, children, footer, wide,
}: { title: string; subtitle: string; children: React.ReactNode; footer?: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ivory">
      <div className="hidden lg:flex flex-col justify-between bg-charcoal text-ivory p-12">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[6px] bg-gold flex items-center justify-center font-display text-charcoal text-sm font-semibold">B</div>
          <span className="font-display text-lg">BizFlow</span>
        </Link>
        <div>
          <Sparkles className="text-gold mb-6" size={28} />
          <p className="font-display text-3xl leading-snug mb-4 max-w-md">
            "I used to track bookings on paper. Now I see my whole week at a glance."
          </p>
          <div className="text-sm text-ivory/60">Priya Nair, Owner — Glow Studio</div>
        </div>
        <div className="text-xs text-ivory/40">© 2026 BizFlow</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className={`w-full ${wide ? "max-w-xl" : "max-w-sm"}`}>
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-[6px] bg-espresso flex items-center justify-center font-display text-ivory text-sm">B</div>
            <span className="font-display text-lg text-charcoal">BizFlow</span>
          </Link>
          <h1 className="font-display text-2xl text-charcoal mb-1.5">{title}</h1>
          <p className="text-sm text-bronze mb-8">{subtitle}</p>
          {children}
          {footer && <p className="text-sm text-bronze mt-6 text-center">{footer}</p>}
        </div>
      </div>
    </div>
  );
}
