import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Business,
  demoBusinesses,
  Customer,
  initialCustomers,
  Booking,
  initialBookings,
  Product,
  initialProducts,
  Invoice,
  initialInvoices,
  Quotation,
  initialQuotations,
  ExpenseItem,
  initialExpenses,
  StaffMember,
  initialStaff,
  ReviewItem,
  initialReviews,
  terminologyMap,
  BusinessTerminology,
  formatINR,
  BusinessType,
  getDemoDataForBusiness
} from "../data/demoData";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "MANAGER" | "STAFF" | "CUSTOMER" | "ADMIN";
}

export interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "info" | "warning" | "error";
}

interface AppContextType {
  // Business & Multi-Tenant State
  activeBusiness: Business;
  setActiveBusiness: (b: Business) => void;
  switchDemoBusiness: (businessId: string) => void;
  createFreshAccountWorkspace: (data: {
    ownerName: string;
    email: string;
    businessName: string;
    type: BusinessType;
    location?: string;
    phone?: string;
    businessHours?: string;
    logoUrl?: string;
  }) => void;
  loginUserSession: (email: string, name?: string) => void;
  registerUserSession: (name: string, email: string) => void;
  logoutUserSession: () => void;
  terminology: BusinessTerminology;
  
  // Auth Session
  user: UserSession;
  setUser: (u: UserSession) => void;
  userRole: UserSession["role"];
  setUserRole: (role: UserSession["role"]) => void;

  // Dark Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Entities & State
  customers: Customer[];
  addCustomer: (c: Omit<Customer, "id">) => void;
  updateCustomer: (id: string, c: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id">) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;

  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  adjustStock: (id: string, delta: number) => void;

  invoices: Invoice[];
  addInvoice: (inv: Omit<Invoice, "id">) => void;
  updateInvoiceStatus: (id: string, status: Invoice["status"]) => void;

  quotations: Quotation[];
  addQuotation: (q: Omit<Quotation, "id">) => void;
  convertQuoteToInvoice: (quoteId: string) => void;

  expenses: ExpenseItem[];
  addExpense: (e: Omit<ExpenseItem, "id">) => void;

  staff: StaffMember[];
  addStaff: (s: Omit<StaffMember, "id">) => void;

  reviews: ReviewItem[];
  addReviewReply: (reviewId: string, replyText: string) => void;

  // Search & Global UI Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Toast System
  toasts: ToastMessage[];
  showToast: (text: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeBusiness, setActiveBusiness] = useState<Business>(demoBusinesses[0]);
  const [user, setUser] = useState<UserSession>({
    id: "u1",
    name: "Priya Nair",
    email: "priya@glowstudio.in",
    role: "OWNER"
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Entities state
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Restore saved custom session on mount if present
  useEffect(() => {
    try {
      const sessionType = localStorage.getItem("bizflow_session_type");
      const savedUser = localStorage.getItem("bizflow_user");
      const savedBusiness = localStorage.getItem("bizflow_business");
      if (sessionType === "custom" && savedUser && savedBusiness) {
        setUser(JSON.parse(savedUser));
        setActiveBusiness(JSON.parse(savedBusiness));
        // Clear demo data for custom saved account
        setCustomers([]);
        setBookings([]);
        setInvoices([]);
        setQuotations([]);
        setExpenses([]);
        setReviews([]);
        setProducts([]);
        setStaff([]);
      } else if (sessionType === "demo" && savedBusiness) {
        const bus = JSON.parse(savedBusiness) as Business;
        const found = demoBusinesses.find((b) => b.id === bus.id);
        if (found) {
          setActiveBusiness(found);
          setUser({
            id: "u_demo_" + found.id,
            name: found.ownerName,
            email: found.email,
            role: "OWNER"
          });
          const dataset = getDemoDataForBusiness(found.id);
          setCustomers(dataset.customers);
          setBookings(dataset.bookings);
          setProducts(dataset.products);
          setInvoices(dataset.invoices);
          setQuotations(dataset.quotations);
          setExpenses(dataset.expenses);
          setStaff(dataset.staff);
          setReviews(dataset.reviews);
        }
      }
    } catch (e) {
      console.error("Error restoring session:", e);
    }
  }, []);

  const showToast = (text: string, type: ToastMessage["type"] = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const registerUserSession = (name: string, email: string) => {
    const newUser: UserSession = {
      id: "u_" + Date.now(),
      name: name || "Business Owner",
      email: email,
      role: "OWNER"
    };
    setUser(newUser);
    localStorage.setItem("bizflow_user", JSON.stringify(newUser));
  };

  const API_URL = import.meta.env.VITE_API_URL || "/api";

  const createFreshAccountWorkspace = (data: {
    ownerName: string;
    email: string;
    businessName: string;
    type: BusinessType;
    location?: string;
    phone?: string;
    businessHours?: string;
    logoUrl?: string;
  }) => {
    const newUser: UserSession = {
      id: "u_" + Date.now(),
      name: data.ownerName || "Business Owner",
      email: data.email || "owner@business.com",
      role: "OWNER"
    };

    const newBusiness: Business = {
      id: "b_" + Date.now(),
      name: data.businessName || "My Business",
      slug: (data.businessName || "my-business").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      type: data.type || "salon",
      ownerName: data.ownerName || "Business Owner",
      tagline: "Quality Services & Care",
      logoInitial: (data.businessName || "B").charAt(0).toUpperCase(),
      logoUrl: data.logoUrl,
      location: data.location || "Vadodara, Gujarat",
      phone: data.phone || "+91 98765 00000",
      email: data.email || "owner@business.com",
      businessHours: data.businessHours || "Mon-Sat: 10:00 AM - 08:00 PM | Sun: Closed",
      currency: "INR",
      subscriptionTier: "BUSINESS",
      accentColor: "#3B82F6"
    };

    setUser(newUser);
    setActiveBusiness(newBusiness);

    // Clear all demo data for new account
    setCustomers([]);
    setBookings([]);
    setInvoices([]);
    setQuotations([]);
    setExpenses([]);
    setReviews([]);
    setProducts([]);
    setStaff([]);

    localStorage.setItem("bizflow_session_type", "custom");
    localStorage.setItem("bizflow_user", JSON.stringify(newUser));
    localStorage.setItem("bizflow_business", JSON.stringify(newBusiness));

    // Save Account & Business directly to MongoDB Atlas cluster
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.ownerName || "Business Owner",
        email: data.email || "owner@business.com",
        password: "password123",
        businessName: data.businessName || "My Business",
        businessType: data.type || "salon"
      })
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.token) {
        localStorage.setItem("bizflow_token", json.token);
        showToast("🍃 Account & Workspace saved to MongoDB Atlas database!", "success");
      }
    })
    .catch((err) => {
      console.warn("MongoDB Atlas sync fallback:", err);
    });
  };

  const loginUserSession = (email: string, name?: string) => {
    const inferredName = name || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const newUser: UserSession = {
      id: "u_" + Date.now(),
      name: inferredName,
      email: email,
      role: "OWNER"
    };
    const newBusiness: Business = {
      id: "b_" + Date.now(),
      name: `${inferredName}'s Business`,
      slug: (inferredName || "my-business").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      type: "general",
      ownerName: inferredName,
      tagline: "Quality Services & Care",
      logoInitial: inferredName.charAt(0).toUpperCase(),
      location: "Vadodara, Gujarat",
      phone: "+91 98000 00000",
      email: email,
      businessHours: "Mon-Sat: 10:00 AM - 08:00 PM | Sun: Closed",
      currency: "INR",
      subscriptionTier: "BUSINESS",
      accentColor: "#3B82F6"
    };

    setUser(newUser);
    setActiveBusiness(newBusiness);

    // Clear demo data for logged in custom user account
    setCustomers([]);
    setBookings([]);
    setInvoices([]);
    setQuotations([]);
    setExpenses([]);
    setReviews([]);
    setProducts([]);
    setStaff([]);

    localStorage.setItem("bizflow_session_type", "custom");
    localStorage.setItem("bizflow_user", JSON.stringify(newUser));
    localStorage.setItem("bizflow_business", JSON.stringify(newBusiness));

    // Try authenticating with MongoDB Atlas
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "password123" })
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.token) {
        localStorage.setItem("bizflow_token", json.token);
        if (json.user && json.business) {
          setUser({ id: json.user.id, name: json.user.name, email: json.user.email, role: json.user.role });
        }
        showToast("🍃 Logged in via MongoDB Atlas database!", "success");
      }
    })
    .catch((err) => {
      console.warn("MongoDB Atlas login fallback:", err);
    });
  };

  const logoutUserSession = () => {
    localStorage.removeItem("bizflow_session_type");
    localStorage.removeItem("bizflow_user");
    localStorage.removeItem("bizflow_business");
  };

  const switchDemoBusiness = (businessId: string) => {
    const target = demoBusinesses.find((b) => b.id === businessId) || demoBusinesses[0];
    setActiveBusiness(target);
    setUser({
      id: "u_demo_" + target.id,
      name: target.ownerName,
      email: target.email,
      role: "OWNER"
    });
    // Restore demo data for exploring demo Hub with business-specific niche data
    const dataset = getDemoDataForBusiness(target.id);
    setCustomers(dataset.customers);
    setBookings(dataset.bookings);
    setProducts(dataset.products);
    setInvoices(dataset.invoices);
    setQuotations(dataset.quotations);
    setExpenses(dataset.expenses);
    setStaff(dataset.staff);
    setReviews(dataset.reviews);

    localStorage.setItem("bizflow_session_type", "demo");
    localStorage.setItem("bizflow_business", JSON.stringify(target));
    localStorage.setItem("bizflow_user", JSON.stringify({
      id: "u_demo_" + target.id,
      name: target.ownerName,
      email: target.email,
      role: "OWNER"
    }));
    showToast(`Switched workspace to ${target.name} (${target.type.toUpperCase()})`, "info");
  };

  const setUserRole = (role: UserSession["role"]) => {
    setUser((prev) => ({ ...prev, role }));
    showToast(`Role switched to ${role}`, "info");
  };

  // Terminology helper based on business type
  const terminology = terminologyMap[activeBusiness.type] || terminologyMap.general;

  // --- CRUD Handlers ---
  const addCustomer = (c: Omit<Customer, "id">) => {
    const newCust: Customer = { ...c, id: "c_" + Date.now() };
    setCustomers((prev) => [newCust, ...prev]);
    showToast(`Customer '${c.name}' added successfully`);
  };

  const updateCustomer = (id: string, updated: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    showToast(`Customer details updated`);
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    showToast("Customer removed from system", "warning");
  };

  const addBooking = (b: Omit<Booking, "id">) => {
    const newB: Booking = { ...b, id: "bk_" + Date.now() };
    setBookings((prev) => [newB, ...prev]);
    showToast(`Booking confirmed for ${b.customer}`);
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    showToast(`Booking status changed to '${status.toUpperCase()}'`);
  };

  const addProduct = (p: Omit<Product, "id">) => {
    const newP: Product = { ...p, id: "p_" + Date.now() };
    setProducts((prev) => [newP, ...prev]);
    showToast(`Item '${p.name}' added to inventory`);
  };

  const adjustStock = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
    showToast(`Stock updated`);
  };

  const addInvoice = (inv: Omit<Invoice, "id">) => {
    const newInv: Invoice = { ...inv, id: "in_" + Date.now() };
    setInvoices((prev) => [newInv, ...prev]);
    showToast(`Invoice ${inv.number} generated`);
  };

  const updateInvoiceStatus = (id: string, status: Invoice["status"]) => {
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    showToast(`Invoice status marked as ${status.toUpperCase()}`);
  };

  const addQuotation = (q: Omit<Quotation, "id">) => {
    const newQ: Quotation = { ...q, id: "q_" + Date.now() };
    setQuotations((prev) => [newQ, ...prev]);
    showToast(`Quotation ${q.number} created`);
  };

  const convertQuoteToInvoice = (quoteId: string) => {
    const quote = quotations.find((q) => q.id === quoteId);
    if (!quote) return;

    const newInvoice: Invoice = {
      id: "in_" + Date.now(),
      number: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customer: quote.customer,
      items: quote.items,
      subtotal: quote.total,
      tax: quote.total * 0.05,
      discount: 0,
      total: quote.total * 1.05,
      due: "2026-09-30",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      notes: `Converted from Quotation ${quote.number}`
    };

    setQuotations((prev) => prev.map((q) => (q.id === quoteId ? { ...q, status: "converted" } : q)));
    setInvoices((prev) => [newInvoice, ...prev]);
    showToast(`Quotation ${quote.number} successfully converted to Invoice ${newInvoice.number}!`);
  };

  const addExpense = (e: Omit<ExpenseItem, "id">) => {
    const newE: ExpenseItem = { ...e, id: "e_" + Date.now() };
    setExpenses((prev) => [newE, ...prev]);
    showToast(`Expense of ${formatINR(e.amount)} logged under ${e.category}`);
  };

  const addStaff = (s: Omit<StaffMember, "id">) => {
    const newS: StaffMember = { ...s, id: "st_" + Date.now() };
    setStaff((prev) => [newS, ...prev]);
    showToast(`Staff member '${s.name}' added`);
  };

  const addReviewReply = (reviewId: string, replyText: string) => {
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, reply: replyText } : r)));
    showToast("Response posted to review");
  };

  return (
    <AppContext.Provider
      value={{
        activeBusiness,
        setActiveBusiness,
        switchDemoBusiness,
        createFreshAccountWorkspace,
        loginUserSession,
        registerUserSession,
        logoutUserSession,
        terminology,
        user,
        setUser,
        userRole: user.role,
        setUserRole,
        isDarkMode,
        toggleDarkMode,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        bookings,
        addBooking,
        updateBookingStatus,
        products,
        addProduct,
        adjustStock,
        invoices,
        addInvoice,
        updateInvoiceStatus,
        quotations,
        addQuotation,
        convertQuoteToInvoice,
        expenses,
        addExpense,
        staff,
        addStaff,
        reviews,
        addReviewReply,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
