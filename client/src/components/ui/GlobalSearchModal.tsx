import React, { useState } from "react";
import { Search, User, Calendar, FileText, Package, Users, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, customers, bookings, invoices, products, staff } = useApp();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedCustomers = q ? customers.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q)) : [];
  const matchedBookings = q ? bookings.filter(b => b.customer.toLowerCase().includes(q) || b.service.toLowerCase().includes(q)) : [];
  const matchedInvoices = q ? invoices.filter(i => i.number.toLowerCase().includes(q) || i.customer.toLowerCase().includes(q)) : [];
  const matchedProducts = q ? products.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)) : [];
  const matchedStaff = q ? staff.filter(s => s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q)) : [];

  const hasResults = matchedCustomers.length || matchedBookings.length || matchedInvoices.length || matchedProducts.length || matchedStaff.length;

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    setQuery("");
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-charcoal/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#F4EFE6] border border-bronze/30 rounded-[14px] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-bronze/20 bg-white/60">
          <Search size={20} className="text-bronze mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search customers, bookings, invoices, products, staff... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-charcoal font-medium placeholder:text-bronze/60 outline-none text-base"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-bronze/15 text-bronze font-semibold px-2 py-1 rounded-md hover:bg-bronze/25"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-4">
          {!query && (
            <div className="py-8 text-center text-sm text-bronze">
              Type anything to search across your workspace...
            </div>
          )}

          {query && !hasResults && (
            <div className="py-8 text-center text-sm text-bronze">
              No matching records found for "{query}".
            </div>
          )}

          {matchedCustomers.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-bronze uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User size={14} /> Customers ({matchedCustomers.length})
              </div>
              <div className="flex flex-col gap-1">
                {matchedCustomers.slice(0, 3).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/app/customers`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/80 transition text-left group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-charcoal">{c.name}</div>
                      <div className="text-xs text-bronze">{c.phone} • {c.email}</div>
                    </div>
                    <ArrowRight size={16} className="text-bronze group-hover:text-gold transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedBookings.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-bronze uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={14} /> Bookings ({matchedBookings.length})
              </div>
              <div className="flex flex-col gap-1">
                {matchedBookings.slice(0, 3).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect(`/app/bookings`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/80 transition text-left group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-charcoal">{b.customer} — {b.service}</div>
                      <div className="text-xs text-bronze">{b.date} at {b.time} ({b.status})</div>
                    </div>
                    <ArrowRight size={16} className="text-bronze group-hover:text-gold transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedInvoices.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-bronze uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText size={14} /> Invoices ({matchedInvoices.length})
              </div>
              <div className="flex flex-col gap-1">
                {matchedInvoices.slice(0, 3).map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => handleSelect(`/app/invoices`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/80 transition text-left group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-charcoal">{inv.number} — {inv.customer}</div>
                      <div className="text-xs text-bronze">Total: ₹{inv.total.toLocaleString()} • Status: {inv.status}</div>
                    </div>
                    <ArrowRight size={16} className="text-bronze group-hover:text-gold transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedProducts.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-bronze uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package size={14} /> Products / Services ({matchedProducts.length})
              </div>
              <div className="flex flex-col gap-1">
                {matchedProducts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/app/products`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/80 transition text-left group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-charcoal">{p.name} ({p.sku})</div>
                      <div className="text-xs text-bronze">₹{p.price} • Stock: {p.stock} units</div>
                    </div>
                    <ArrowRight size={16} className="text-bronze group-hover:text-gold transition" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
