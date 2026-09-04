import React from "react";
import { LucideIcon } from "lucide-react";

export function Button({
  children, variant = "primary", size = "md", icon: Icon, className = "", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-[8px] transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none";
  const sizes = { sm: "text-sm px-3 py-1.5", md: "text-sm px-4 py-2.5", lg: "text-base px-6 py-3" };
  const variants = {
    primary: "bg-espresso text-ivory hover:bg-charcoal shadow-soft",
    secondary: "bg-transparent text-espresso border border-bronze/40 hover:bg-espresso/5",
    ghost: "bg-transparent text-espresso hover:bg-espresso/5",
    danger: "bg-[#7A2E2E] text-ivory hover:bg-[#611F1F]",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/60 border border-bronze/15 rounded-[12px] shadow-card ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "gold" | "success" | "warning" | "danger" }) {
  const tones: Record<string, string> = {
    neutral: "bg-bronze/10 text-espresso border-bronze/20",
    gold: "bg-gold/15 text-[#7A5E22] border-gold/30",
    success: "bg-[#3E5C3A]/10 text-[#3E5C3A] border-[#3E5C3A]/25",
    warning: "bg-[#8A5A2A]/10 text-[#8A5A2A] border-[#8A5A2A]/25",
    danger: "bg-[#7A2E2E]/10 text-[#7A2E2E] border-[#7A2E2E]/25",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function StatCard({
  label, value, delta, icon: Icon,
}: { label: string; value: string; delta?: string; icon: LucideIcon }) {
  const positive = delta?.startsWith("+");
  return (
    <Card className="p-5 flex flex-col gap-3 animate-fadeIn">
      <div className="flex items-center justify-between">
        <span className="text-sm text-bronze">{label}</span>
        <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
          <Icon size={16} className="text-[#7A5E22]" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-2xl text-charcoal">{value}</span>
        {delta && (
          <span className={`text-xs font-medium ${positive ? "text-[#3E5C3A]" : "text-[#7A2E2E]"}`}>{delta}</span>
        )}
      </div>
    </Card>
  );
}

export function EmptyState({
  icon: Icon, title, message, actionLabel, onAction,
}: { icon: LucideIcon; title: string; message: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
        <Icon size={24} className="text-bronze" />
      </div>
      <h3 className="font-display text-lg text-charcoal mb-1">{title}</h3>
      <p className="text-sm text-bronze max-w-sm mb-5">{message}</p>
      {actionLabel && <Button onClick={onAction} size="sm">{actionLabel}</Button>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-[8px] border border-bronze/25 bg-white/70 text-sm text-charcoal placeholder:text-bronze/60 focus:border-gold focus:ring-1 focus:ring-gold/40 outline-none transition ${props.className || ""}`}
    />
  );
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-[8px] border border-bronze/25 bg-white/70 text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/40 outline-none transition ${props.className || ""}`}
    >
      {children}
    </select>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-bronze/15 rounded-md ${className}`} />;
}

export function Modal({
  isOpen, onClose, title, children, maxWidth = "max-w-md"
}: {
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; maxWidth?: string;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-fadeIn">
      <div className={`w-full ${maxWidth} bg-[#F4EFE6] border border-bronze/30 rounded-[14px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-bronze/20 bg-white/40">
          <h3 className="font-display text-lg font-semibold text-charcoal">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md text-bronze hover:text-charcoal hover:bg-espresso/5">
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export function Drawer({
  isOpen, onClose, title, children
}: {
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-[#F4EFE6] border-l border-bronze/30 h-full shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-bronze/20 bg-white/50">
          <h3 className="font-display text-lg font-semibold text-charcoal">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md text-bronze hover:text-charcoal hover:bg-espresso/5">
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

export function Tabs({
  tabs, activeTab, onChange
}: {
  tabs: { id: string; label: string; count?: number }[]; activeTab: string; onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-bronze/20 mb-6 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              isActive
                ? "border-gold text-charcoal font-semibold"
                : "border-transparent text-bronze hover:text-charcoal hover:border-bronze/30"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${isActive ? "bg-gold/20 text-charcoal" : "bg-bronze/10 text-bronze"}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function ConfirmationDialog({
  isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", danger = false
}: {
  isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmText?: string; danger?: boolean;
}) {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-bronze mb-6 leading-relaxed">{message}</p>
      <div className="flex items-center justify-end gap-3">
        <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
        <Button
          variant={danger ? "danger" : "primary"}
          size="sm"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}

export function ToastContainer({ toasts, onRemove }: { toasts: { id: string; text: string; type: string }[]; onRemove: (id: string) => void }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between p-4 rounded-[10px] bg-charcoal text-ivory border border-gold/30 shadow-2xl text-sm animate-fadeIn"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
            <span>{toast.text}</span>
          </div>
          <button onClick={() => onRemove(toast.id)} className="ml-3 text-bronze hover:text-ivory">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-espresso text-ivory flex items-center justify-center font-medium shrink-0"
    >
      <span style={{ fontSize: size * 0.38 }}>{initials}</span>
    </div>
  );
}

