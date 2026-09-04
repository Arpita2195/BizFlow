import React, { useState, useEffect } from "react";
import { Button } from "./Primitives";

export interface DaySchedule {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

const defaultSchedule: DaySchedule[] = [
  { day: "Monday", isOpen: true, openTime: "10:00 AM", closeTime: "08:00 PM" },
  { day: "Tuesday", isOpen: true, openTime: "10:00 AM", closeTime: "08:00 PM" },
  { day: "Wednesday", isOpen: true, openTime: "10:00 AM", closeTime: "08:00 PM" },
  { day: "Thursday", isOpen: true, openTime: "10:00 AM", closeTime: "08:00 PM" },
  { day: "Friday", isOpen: true, openTime: "10:00 AM", closeTime: "08:00 PM" },
  { day: "Saturday", isOpen: true, openTime: "10:00 AM", closeTime: "08:00 PM" },
  { day: "Sunday", isOpen: true, openTime: "11:00 AM", closeTime: "06:00 PM" },
];

const timeOptions = [
  "06:00 AM", "07:00 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
  "10:00 PM", "11:00 PM", "12:00 AM"
];

export function formatScheduleToString(schedule: DaySchedule[]): string {
  // If all open and same hours
  const openDays = schedule.filter(s => s.isOpen);
  if (openDays.length === 0) return "Closed All Week";

  const parts: string[] = [];
  schedule.forEach(s => {
    const dayAbbrev = s.day.slice(0, 3);
    if (!s.isOpen) {
      parts.push(`${dayAbbrev}: Closed`);
    } else {
      parts.push(`${dayAbbrev}: ${s.openTime} - ${s.closeTime}`);
    }
  });

  // Group adjacent identical days for cleaner output
  // Mon-Fri: 10:00 AM - 08:00 PM | Sat: 10:00 AM - 08:00 PM | Sun: Closed
  const grouped: { days: string[]; text: string }[] = [];
  schedule.forEach(s => {
    const text = s.isOpen ? `${s.openTime} - ${s.closeTime}` : "Closed";
    const dayAbbr = s.day.slice(0, 3);
    if (grouped.length > 0 && grouped[grouped.length - 1].text === text) {
      grouped[grouped.length - 1].days.push(dayAbbr);
    } else {
      grouped.push({ days: [dayAbbr], text });
    }
  });

  return grouped.map(g => {
    if (g.days.length === 1) {
      return `${g.days[0]}: ${g.text}`;
    }
    return `${g.days[0]}-${g.days[g.days.length - 1]}: ${g.text}`;
  }).join(" | ");
}

interface OperatingHoursEditorProps {
  initialHoursString?: string;
  onChange?: (formattedString: string, schedule: DaySchedule[]) => void;
}

export default function OperatingHoursEditor({ initialHoursString, onChange }: OperatingHoursEditorProps) {
  const [schedule, setSchedule] = useState<DaySchedule[]>(defaultSchedule);

  useEffect(() => {
    if (onChange) {
      onChange(formatScheduleToString(schedule), schedule);
    }
  }, [schedule]);

  const toggleDay = (index: number) => {
    const updated = [...schedule];
    updated[index].isOpen = !updated[index].isOpen;
    setSchedule(updated);
  };

  const updateTime = (index: number, field: "openTime" | "closeTime", val: string) => {
    const updated = [...schedule];
    updated[index][field] = val;
    setSchedule(updated);
  };

  const applyPreset = (type: "standard" | "weekdays" | "always_open") => {
    if (type === "standard") {
      setSchedule([
        { day: "Monday", isOpen: true, openTime: "09:00 AM", closeTime: "08:00 PM" },
        { day: "Tuesday", isOpen: true, openTime: "09:00 AM", closeTime: "08:00 PM" },
        { day: "Wednesday", isOpen: true, openTime: "09:00 AM", closeTime: "08:00 PM" },
        { day: "Thursday", isOpen: true, openTime: "09:00 AM", closeTime: "08:00 PM" },
        { day: "Friday", isOpen: true, openTime: "09:00 AM", closeTime: "08:00 PM" },
        { day: "Saturday", isOpen: true, openTime: "10:00 AM", closeTime: "06:00 PM" },
        { day: "Sunday", isOpen: false, openTime: "10:00 AM", closeTime: "06:00 PM" },
      ]);
    } else if (type === "weekdays") {
      setSchedule([
        { day: "Monday", isOpen: true, openTime: "10:00 AM", closeTime: "07:00 PM" },
        { day: "Tuesday", isOpen: true, openTime: "10:00 AM", closeTime: "07:00 PM" },
        { day: "Wednesday", isOpen: true, openTime: "10:00 AM", closeTime: "07:00 PM" },
        { day: "Thursday", isOpen: true, openTime: "10:00 AM", closeTime: "07:00 PM" },
        { day: "Friday", isOpen: true, openTime: "10:00 AM", closeTime: "07:00 PM" },
        { day: "Saturday", isOpen: false, openTime: "10:00 AM", closeTime: "07:00 PM" },
        { day: "Sunday", isOpen: false, openTime: "10:00 AM", closeTime: "07:00 PM" },
      ]);
    } else if (type === "always_open") {
      setSchedule(
        defaultSchedule.map(d => ({ ...d, isOpen: true, openTime: "09:00 AM", closeTime: "09:00 PM" }))
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 text-xs">
      {/* Preset Quick Actions */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-bronze/15">
        <span className="text-[11px] font-bold text-bronze uppercase tracking-wider">Quick Presets:</span>
        <button
          type="button"
          onClick={() => applyPreset("standard")}
          className="px-2.5 py-1 rounded-md bg-espresso/5 hover:bg-gold/20 text-charcoal font-semibold text-[11px] border border-bronze/20 transition"
        >
          Mon-Sat 9am-8pm
        </button>
        <button
          type="button"
          onClick={() => applyPreset("weekdays")}
          className="px-2.5 py-1 rounded-md bg-espresso/5 hover:bg-gold/20 text-charcoal font-semibold text-[11px] border border-bronze/20 transition"
        >
          Mon-Fri Only
        </button>
        <button
          type="button"
          onClick={() => applyPreset("always_open")}
          className="px-2.5 py-1 rounded-md bg-espresso/5 hover:bg-gold/20 text-charcoal font-semibold text-[11px] border border-bronze/20 transition"
        >
          Open 7 Days
        </button>
      </div>

      {/* Day by Day List */}
      <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
        {schedule.map((item, idx) => (
          <div
            key={item.day}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
              item.isOpen ? "bg-white/80 border-bronze/20 shadow-xs" : "bg-gray-100/60 border-gray-200 opacity-70"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Custom Toggle Switch */}
              <button
                type="button"
                onClick={() => toggleDay(idx)}
                className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                  item.isOpen ? "bg-[#0F172A]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    item.isOpen ? "translate-x-4 bg-[#3B82F6]" : "translate-x-0"
                  }`}
                />
              </button>

              <span className={`font-bold text-xs ${item.isOpen ? "text-charcoal" : "text-gray-400"}`}>
                {item.day}
              </span>
            </div>

            {item.isOpen ? (
              <div className="flex items-center gap-1.5 text-xs">
                <select
                  value={item.openTime}
                  onChange={(e) => updateTime(idx, "openTime", e.target.value)}
                  className="px-2 py-1 rounded-lg border border-bronze/25 bg-white text-charcoal font-medium text-[11px] outline-none focus:border-gold"
                >
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="text-bronze font-bold text-[11px]">to</span>
                <select
                  value={item.closeTime}
                  onChange={(e) => updateTime(idx, "closeTime", e.target.value)}
                  className="px-2 py-1 rounded-lg border border-bronze/25 bg-white text-charcoal font-medium text-[11px] outline-none focus:border-gold"
                >
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-600 font-bold text-[10px] uppercase tracking-wider">
                Closed
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-xs text-charcoal">
        <span className="font-bold text-espresso block mb-0.5">Configured Hours Preview:</span>
        <p className="text-[11px] text-bronze font-mono leading-relaxed">{formatScheduleToString(schedule)}</p>
      </div>
    </div>
  );
}
