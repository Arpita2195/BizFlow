import React from "react";
import { Sparkles, Bot, Clock, Bell, ShieldCheck, Zap } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Card, Button, Input } from "../../components/ui/Primitives";
import PageHeader from "../../components/ui/PageHeader";

export default function Assistant() {
  const { activeBusiness, showToast } = useApp();
  const [email, setEmail] = React.useState("");

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast("You've been added to the AI Copilot early access waitlist!", "success");
    setEmail("");
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <PageHeader
        title="AI Assistant"
        subtitle={`Intelligent Business Copilot for ${activeBusiness.name}`}
      />

      {/* Main Coming Soon Banner */}
      <Card className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 sm:p-12 border-dashed border-bronze/30 relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A24B]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-lg">
          {/* Animated Icon */}
          <div className="w-20 h-20 rounded-3xl bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] mb-6 shadow-xl relative">
            <Sparkles size={36} className="animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A24B] animate-ping" />
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B]/40 text-[#C9A24B] text-[11px] font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Clock size={12} />
            <span>Coming Soon in v2.0</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl font-bold text-charcoal mb-3 leading-tight">
            AI Copilot is Under Development
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-bronze mb-8 leading-relaxed">
            We are engineering an advanced multi-tenant AI copilot for <strong className="text-charcoal">{activeBusiness.name}</strong>. Real-time revenue insights, automated client messaging, and smart scheduling will be available soon.
          </p>

          {/* Waitlist Form */}
          <form onSubmit={handleNotifyMe} className="w-full flex flex-col sm:flex-row gap-2 mb-8">
            <Input
              type="email"
              placeholder="Enter your email for early access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button variant="primary" type="submit" icon={Bell} className="shrink-0">
              Notify Me
            </Button>
          </form>

          {/* Upcoming Capabilities Preview */}
          <div className="w-full grid grid-cols-3 gap-3 text-left pt-6 border-t border-bronze/15 text-xs text-bronze">
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-bronze/10">
              <Zap size={16} className="text-[#C9A24B] mb-1" />
              <span className="font-bold text-charcoal">Revenue Analytics</span>
              <span className="text-[10px] leading-tight text-bronze">Instant financial queries & forecasting</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-bronze/10">
              <Bot size={16} className="text-[#C9A24B] mb-1" />
              <span className="font-bold text-charcoal">Auto Scheduling</span>
              <span className="text-[10px] leading-tight text-bronze">Smart slot optimization & reminders</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-bronze/10">
              <ShieldCheck size={16} className="text-[#C9A24B] mb-1" />
              <span className="font-bold text-charcoal">Inventory Alerts</span>
              <span className="text-[10px] leading-tight text-bronze">Automated stock reorder triggers</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
