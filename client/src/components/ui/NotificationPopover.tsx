import React, { useState } from "react";
import { Bell, CheckCircle, AlertTriangle, Calendar, CreditCard, Star, Package } from "lucide-react";

interface Notification {
  id: string;
  type: "booking" | "payment" | "stock" | "review";
  title: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "n1", type: "booking", title: "New appointment booked by Sanjana Reddy", time: "10 mins ago", read: false },
  { id: "n2", type: "payment", title: "Payment of ₹1,800 received from Ananya Sharma", time: "1 hour ago", read: false },
  { id: "n3", type: "stock", title: "Low stock alert: Keratin Shampoo has 2 units left", time: "3 hours ago", read: false },
  { id: "n4", type: "review", title: "New 5⭐ review posted by Ananya Sharma", time: "Yesterday", read: true },
];

export default function NotificationPopover({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [list, setList] = useState<Notification[]>(initialNotifications);

  if (!isOpen) return null;

  const unreadCount = list.filter(n => !n.read).length;

  const markAllRead = () => {
    setList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking": return <Calendar size={16} className="text-[#3B82F6]" />;
      case "payment": return <CreditCard size={16} className="text-[#22D3EE]" />;
      case "stock": return <AlertTriangle size={16} className="text-[#64748B]" />;
      case "review": return <Star size={16} className="text-[#3B82F6]" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-[#F8FAFC] border border-[#64748B]/30 rounded-[14px] shadow-2xl overflow-hidden animate-fadeIn">
      <div className="flex items-center justify-between px-4 py-3 border-b border-bronze/20 bg-white/50">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-charcoal">
          <Bell size={16} className="text-gold" /> Notifications
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-gold text-charcoal font-bold">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-bronze hover:text-charcoal flex items-center gap-1 font-medium">
            <CheckCircle size={12} /> Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-bronze/10">
        {list.map((n) => (
          <div key={n.id} className={`p-3.5 flex items-start gap-3 transition ${!n.read ? "bg-gold/10" : "hover:bg-white/40"}`}>
            <div className="w-8 h-8 rounded-full bg-white/80 border border-bronze/20 flex items-center justify-center shrink-0">
              {getIcon(n.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs ${!n.read ? "font-semibold text-charcoal" : "text-bronze"}`}>{n.title}</p>
              <span className="text-[10px] text-bronze/70">{n.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-bronze/20 bg-white/30 text-center">
        <button onClick={onClose} className="text-xs font-semibold text-espresso hover:text-gold transition">
          Close notifications
        </button>
      </div>
    </div>
  );
}
