import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scissors, Coffee, Camera, Dumbbell, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { demoBusinesses } from "../../data/demoData";
import { useApp } from "../../context/AppContext";

const icons: Record<string, any> = {
  salon: Scissors,
  cafe: Coffee,
  photography: Camera,
  gym: Dumbbell,
  coaching: GraduationCap,
};

export default function DemoPicker() {
  const { switchDemoBusiness } = useApp();
  const navigate = useNavigate();

  const handleLaunchDemo = (bId: string) => {
    switchDemoBusiness(bId);
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <header className="px-6 lg:px-12 h-16 flex items-center justify-between border-b border-bronze/15 bg-white/40">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[7px] bg-[#3B82F6] flex items-center justify-center font-display text-white font-bold text-base shadow-soft">
            B
          </div>
          <span className="font-display text-lg font-bold text-charcoal">BIZFLOW</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#3B82F6] bg-[#3B82F6]/15 px-3 py-1 rounded-full border border-[#3B82F6]/30 flex items-center gap-1">
            <Sparkles size={12} /> Client Portfolio Mode
          </span>
          <Link to="/" className="text-xs font-semibold text-bronze hover:text-espresso">
            Exit Demo
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest">Interactive Freelance Showcase</span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-charcoal mt-1 mb-3">
              Explore Live Business Workspaces
            </h1>
            <p className="text-sm text-bronze max-w-lg mx-auto">
              Select any vertical below to immediately test a real-world populated dashboard with live stats, calendar bookings, invoices, and AI assistant queries.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {demoBusinesses.map((b) => {
              const Icon = icons[b.type] || Scissors;
              return (
                <button
                  key={b.id}
                  onClick={() => handleLaunchDemo(b.id)}
                  className="text-left p-6 rounded-2xl border border-bronze/20 bg-white/70 hover:bg-white hover:border-[#3B82F6] hover:shadow-2xl transition-all duration-200 group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-[#0F172A]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">{b.type} Vertical</span>
                    <h3 className="font-display text-xl font-bold text-charcoal mt-0.5 mb-1">{b.name}</h3>
                    <p className="text-xs text-bronze mb-6 leading-relaxed">{b.tagline}</p>
                  </div>

                  <span className="text-xs font-bold text-espresso inline-flex items-center gap-1.5 pt-3 border-t border-bronze/15 w-full">
                    Launch Interactive Workspace
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#3B82F6]" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
