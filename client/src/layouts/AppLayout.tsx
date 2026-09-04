import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutGrid, Users, CalendarCheck, Package, FileText, Receipt,
  Wallet, BarChart3, UserCog, Star, Gift, Bell, Search, Settings,
  Menu, X, LogOut, Sparkles, ChevronDown, Moon, Sun, Shield, ExternalLink
} from "lucide-react";
import { useApp, UserSession } from "../context/AppContext";
import { Avatar, ToastContainer } from "../components/ui/Primitives";
import NotificationPopover from "../components/ui/NotificationPopover";
import GlobalSearchModal from "../components/ui/GlobalSearchModal";

const rolePermissions: Record<UserSession["role"], string[]> = {
  OWNER: ["/app", "/app/customers", "/app/bookings", "/app/products", "/app/invoices", "/app/quotations", "/app/expenses", "/app/analytics", "/app/staff", "/app/reviews", "/app/loyalty", "/app/assistant", "/app/settings"],
  ADMIN: ["/app", "/app/customers", "/app/bookings", "/app/products", "/app/invoices", "/app/quotations", "/app/expenses", "/app/analytics", "/app/staff", "/app/reviews", "/app/loyalty", "/app/assistant", "/app/settings"],
  MANAGER: ["/app", "/app/customers", "/app/bookings", "/app/products", "/app/invoices", "/app/quotations", "/app/expenses", "/app/reviews", "/app/loyalty", "/app/assistant"],
  STAFF: ["/app", "/app/customers", "/app/bookings", "/app/products"],
  CUSTOMER: ["/portal"]
};

export default function AppLayout() {
  const {
    activeBusiness,
    switchDemoBusiness,
    terminology,
    user,
    userRole,
    setUserRole,
    isDarkMode,
    toggleDarkMode,
    setIsSearchOpen,
    toasts,
    removeToast,
    logoutUserSession
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "/app", label: "Dashboard", icon: LayoutGrid, end: true },
    { to: "/app/customers", label: terminology.customersLabel, icon: Users },
    { to: "/app/bookings", label: terminology.bookingsLabel, icon: CalendarCheck },
    { to: "/app/products", label: terminology.productsLabel, icon: Package },
    { to: "/app/invoices", label: "Invoices", icon: FileText },
    { to: "/app/quotations", label: "Quotations", icon: Receipt },
    { to: "/app/expenses", label: "Expenses", icon: Wallet },
    { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/app/staff", label: terminology.staffsLabel, icon: UserCog },
    { to: "/app/reviews", label: "Reviews", icon: Star },
    { to: "/app/loyalty", label: "Loyalty Program", icon: Gift },
    { to: "/app/assistant", label: "AI Assistant", icon: Sparkles },
    { to: "/app/settings", label: "Settings", icon: Settings },
  ];

  // RBAC permissions filter for navigation
  const allowedPaths = rolePermissions[userRole || "OWNER"] || rolePermissions.OWNER;
  const filteredNavItems = navItems.filter((item) => allowedPaths.includes(item.to));

  const handleSignOut = () => {
    logoutUserSession();
    navigate("/login");
  };

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const availableRoles: Array<{ role: UserSession["role"]; label: string; desc: string }> = [
    { role: "OWNER", label: "👑 Owner", desc: "Full workspace & settings control" },
    { role: "ADMIN", label: "⚡ Admin", desc: "Full administrative & financial access" },
    { role: "MANAGER", label: "📊 Manager", desc: "Operations, invoices & customer care" },
    { role: "STAFF", label: "👤 Staff", desc: "Daily schedule, bookings & customers" },
    { role: "CUSTOMER", label: "🛍️ Customer", desc: "Client Portal access strictly" },
  ];

  const handleRoleChange = (newRole: UserSession["role"]) => {
    setUserRole(newRole);
    setRoleMenuOpen(false);
    if (newRole === "CUSTOMER") {
      navigate("/portal");
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "bg-[#0B1120] text-[#F8FAFC]" : "bg-[#F8FAFC] text-[#0F172A]"}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0F172A] text-[#F8FAFC] h-screen sticky top-0 border-r border-[#64748B]/20">
        <SidebarContent
          activeBusiness={activeBusiness}
          userRole={userRole}
          navItems={filteredNavItems}
          onNavigate={() => {}}
          navigate={navigate}
          handleSignOut={handleSignOut}
        />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#0F172A] text-[#F8FAFC] flex flex-col animate-fadeIn border-r border-[#64748B]/20">
            <div className="flex justify-end p-3">
              <button onClick={() => setMobileOpen(false)} className="p-2 text-[#64748B] hover:text-white">
                <X size={20} />
              </button>
            </div>
            <SidebarContent
              activeBusiness={activeBusiness}
              userRole={userRole}
              navItems={filteredNavItems}
              onNavigate={() => setMobileOpen(false)}
              navigate={navigate}
              handleSignOut={handleSignOut}
            />
          </aside>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header Navigation */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur px-4 lg:px-8 h-16 flex items-center justify-between gap-4 transition ${
          isDarkMode ? "bg-[#0F172A]/90 border-[#64748B]/20" : "bg-[#F8FAFC]/90 border-[#64748B]/15"
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <button className="lg:hidden p-2 -ml-2 text-[#0F172A]" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>

            {/* Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-[8px] border text-sm transition max-w-xs w-72 ${
                isDarkMode ? "bg-[#0F172A]/40 border-[#64748B]/30 text-[#64748B]" : "bg-white/60 border-[#64748B]/20 text-[#64748B]"
              }`}
            >
              <Search size={15} />
              <span className="truncate">Search records...</span>
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-[#64748B]/30">⌘K</kbd>
            </button>

            {/* Business Public Storefront Shortcut */}
            <Link
              to={`/business/${activeBusiness.slug}`}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3B82F6]/40 text-xs font-semibold text-[#3B82F6] hover:bg-[#3B82F6]/10 transition cursor-pointer"
            >
              <ExternalLink size={13} /> View Storefront
            </Link>
          </div>

          {/* Right Header Toolbar */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[#0F172A]/5 text-[#0F172A] transition cursor-pointer"
              title="Toggle theme mode"
            >
              {isDarkMode ? <Sun size={19} className="text-[#3B82F6]" /> : <Moon size={19} className="text-[#0F172A]" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-full hover:bg-espresso/5 text-espresso transition cursor-pointer"
              >
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3B82F6]" />
              </button>
              <NotificationPopover isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-espresso/5 transition cursor-pointer"
              >
                <Avatar name={user.name} size={32} />
                <ChevronDown size={14} className="text-[#64748B] hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 bg-[#F8FAFC] border border-[#64748B]/30 rounded-[12px] shadow-2xl p-2.5 text-xs flex flex-col gap-1.5 animate-fadeIn">
                  <div className="p-2 border-b border-[#64748B]/20">
                    <p className="font-bold text-[#0F172A] text-sm">{user.name}</p>
                    <p className="text-[#64748B]">{user.email}</p>
                    
                    <div className="mt-2 pt-2 border-t border-[#64748B]/15">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Active Role:</span>
                        <button
                          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                          className="text-[10px] text-[#3B82F6] font-bold underline cursor-pointer hover:text-[#0F172A]"
                        >
                          {roleMenuOpen ? "Close Switcher" : "Test Role →"}
                        </button>
                      </div>

                      <span className="inline-block px-2 py-0.5 rounded bg-[#3B82F6]/20 text-[#0F172A] font-bold text-[10px] uppercase">
                        {userRole}
                      </span>

                      {roleMenuOpen && (
                        <div className="mt-2 p-1.5 bg-[#0F172A] rounded-lg text-white flex flex-col gap-1 border border-[#3B82F6]/30 animate-fadeIn">
                          <span className="text-[9px] text-[#3B82F6] font-bold uppercase tracking-wider px-1">Switch RBAC Role (Testing):</span>
                          {availableRoles.map((item) => (
                            <button
                              key={item.role}
                              onClick={() => { handleRoleChange(item.role); setProfileOpen(false); }}
                              className={`w-full text-left px-2 py-1 rounded text-[11px] font-semibold transition cursor-pointer ${
                                userRole === item.role
                                  ? "bg-[#3B82F6] text-white"
                                  : "hover:bg-white/15 text-white/80"
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {(userRole === "OWNER" || userRole === "ADMIN") && (
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/app/settings"); }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 text-[#1A1512] font-medium cursor-pointer"
                    >
                      Business Settings
                    </button>
                  )}
                  <button
                    onClick={() => { setProfileOpen(false); handleSignOut(); }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-white/60 text-[#0F172A] font-medium cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Toasts */}
      <GlobalSearchModal />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

function SidebarContent({
  activeBusiness,
  userRole,
  navItems,
  onNavigate,
  navigate,
  handleSignOut
}: {
  activeBusiness: any;
  userRole: UserSession["role"];
  navItems: any[];
  onNavigate: () => void;
  navigate: ReturnType<typeof useNavigate>;
  handleSignOut: () => void;
}) {
  return (
    <>
      {/* Brand Header & Active Business Workspace Card */}
      <div className="px-5 pt-6 pb-4 border-b border-white/10 flex flex-col gap-3">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 rounded-[7px] bg-[#3B82F6] flex items-center justify-center font-display text-white font-bold text-base shadow-soft">
            B
          </div>
          <div>
            <div className="font-display text-[16px] font-bold leading-none tracking-tight text-white">BIZFLOW</div>
            <div className="text-[10px] text-[#3B82F6] font-semibold uppercase tracking-wider mt-0.5">SaaS Platform</div>
          </div>
        </div>

        {/* Clean Active Business Workspace Display Card */}
        <div className="mt-1 bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center justify-between text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">
            <span>Workspace</span>
            <span className="flex items-center gap-1 text-[#10B981] font-bold text-[9px] bg-[#10B981]/20 px-1.5 py-0.5 rounded">
              ● Live
            </span>
          </div>

          <div className="flex items-center gap-2.5 mt-0.5">
            {activeBusiness.logoUrl ? (
              <img src={activeBusiness.logoUrl} alt={activeBusiness.name} className="w-8 h-8 rounded-lg object-cover border border-white/20 shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-sm">
                {activeBusiness.logoInitial || (activeBusiness.name || "B").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{activeBusiness.name}</p>
              <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider truncate">
                {activeBusiness.type} • {userRole || "Owner"}
              </p>
            </div>
          </div>

          {(userRole === "OWNER" || userRole === "ADMIN") && (
            <div className="mt-1 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-[#3B82F6]">
              <span className="font-semibold text-white/70">Workspace Settings</span>
              <button
                onClick={() => { onNavigate(); navigate("/app/settings"); }}
                className="hover:underline font-bold cursor-pointer"
              >
                Configure →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Role-filtered Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#3B82F6]/20 text-[#22D3EE] border-l-2 border-[#22D3EE] font-semibold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer Navigation Actions */}
      <div className="p-3 border-t border-white/10 flex flex-col gap-1">
        <button
          onClick={() => navigate("/demo")}
          className="flex items-center gap-2 px-3 py-2 rounded-[8px] text-xs text-[#3B82F6] hover:bg-[#3B82F6]/10 font-semibold w-full transition"
        >
          <Sparkles size={14} /> Freelance Demo Hub
        </button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-xs text-white/60 hover:bg-white/5 hover:text-white w-full transition"
        >
          <LogOut size={16} strokeWidth={1.8} />
          Sign out
        </button>
      </div>
    </>
  );
}
