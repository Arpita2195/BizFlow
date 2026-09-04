import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShieldAlert, ArrowLeft, RefreshCw } from "lucide-react";
import { useApp, UserSession } from "../../context/AppContext";

const rolePermissions: Record<UserSession["role"], string[]> = {
  OWNER: [
    "/app", "/app/customers", "/app/bookings", "/app/products",
    "/app/invoices", "/app/quotations", "/app/expenses", "/app/analytics",
    "/app/staff", "/app/reviews", "/app/loyalty", "/app/assistant", "/app/settings"
  ],
  ADMIN: [
    "/app", "/app/customers", "/app/bookings", "/app/products",
    "/app/invoices", "/app/quotations", "/app/expenses", "/app/analytics",
    "/app/staff", "/app/reviews", "/app/loyalty", "/app/assistant", "/app/settings"
  ],
  MANAGER: [
    "/app", "/app/customers", "/app/bookings", "/app/products",
    "/app/invoices", "/app/quotations", "/app/expenses",
    "/app/reviews", "/app/loyalty", "/app/assistant"
  ],
  STAFF: [
    "/app", "/app/customers", "/app/bookings", "/app/products"
  ],
  CUSTOMER: [
    "/portal"
  ]
};

interface RBACGuardProps {
  children: React.ReactNode;
  requiredRoles?: Array<UserSession["role"]>;
}

export default function RBACGuard({ children, requiredRoles }: RBACGuardProps) {
  const { userRole, setUserRole } = useApp();
  const location = useLocation();

  // If role is CUSTOMER, redirect to client portal immediately
  if (userRole === "CUSTOMER") {
    return <Navigate to="/portal" replace />;
  }

  const currentPath = location.pathname;
  const userAllowedPaths = rolePermissions[userRole || "OWNER"] || rolePermissions.OWNER;

  const isAllowedByPath = userAllowedPaths.includes(currentPath);
  const isAllowedByRole = !requiredRoles || requiredRoles.includes(userRole);

  if (isAllowedByPath && isAllowedByRole) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] mb-5 shadow-lg">
        <ShieldAlert size={32} />
      </div>

      <span className="px-3 py-1 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] text-[11px] font-bold uppercase tracking-wider mb-3">
        RBAC Restricted Feature
      </span>

      <h2 className="font-display text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2">
        Access Restricted by Role Policy
      </h2>

      <p className="text-sm text-[#64748B] max-w-md mb-6 leading-relaxed">
        Your active role (<strong className="text-[#0F172A] dark:text-white uppercase">{userRole}</strong>) does not have permission to view <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-[#3B82F6]">{currentPath}</code>.
      </p>

      {requiredRoles && requiredRoles.length > 0 && (
        <div className="p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-[#64748B]/20 mb-6 flex items-center gap-2 text-xs text-[#64748B]">
          <span>Required Minimum Role:</span>
          <div className="flex gap-1">
            {requiredRoles.map((r) => (
              <span key={r} className="px-2 py-0.5 rounded bg-[#3B82F6]/20 text-[#0F172A] dark:text-white font-bold uppercase text-[10px]">
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#64748B]/30 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:bg-white/10 transition cursor-pointer"
        >
          <ArrowLeft size={14} /> Go Back
        </button>

        <button
          onClick={() => setUserRole("OWNER")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B82F6] text-white text-xs font-bold shadow-md hover:brightness-110 transition cursor-pointer"
        >
          <RefreshCw size={14} /> Switch to Owner Role (Demo)
        </button>
      </div>
    </div>
  );
}
