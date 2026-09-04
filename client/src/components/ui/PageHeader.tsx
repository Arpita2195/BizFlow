import React from "react";

export default function PageHeader({
  title, subtitle, action,
}: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl text-charcoal">{title}</h1>
        {subtitle && <p className="text-sm text-bronze mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
