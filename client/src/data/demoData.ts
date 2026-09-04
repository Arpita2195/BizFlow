// Central demo data store & multi-tenant business type configuration for BizFlow.

export type BusinessType =
  | "salon" | "cafe" | "boutique" | "gym" | "photography"
  | "freelancer" | "coaching" | "repair" | "consultant" | "general";

export interface Business {
  id: string;
  name: string;
  slug: string;
  type: BusinessType;
  ownerName: string;
  tagline: string;
  logoInitial: string;
  logoUrl?: string;
  location: string;
  phone: string;
  email: string;
  businessHours: string;
  currency: string;
  subscriptionTier: "FREE" | "STARTER" | "PROFESSIONAL" | "BUSINESS";
  accentColor: string;
}

export const businessTypeLabels: Record<BusinessType, string> = {
  salon: "Salon / Spa",
  cafe: "Café / Restaurant",
  boutique: "Boutique",
  gym: "Gym / Fitness Studio",
  photography: "Photography Studio",
  freelancer: "Freelancer",
  coaching: "Coaching / Tuition",
  repair: "Repair / Service Shop",
  consultant: "Consultant",
  general: "General Small Business",
};

export interface BusinessTerminology {
  customerLabel: string;
  customersLabel: string;
  bookingLabel: string;
  bookingsLabel: string;
  productLabel: string;
  productsLabel: string;
  staffLabel: string;
  staffsLabel: string;
  actionBooking: string;
  kpiStatLabel: string;
}

export const terminologyMap: Record<BusinessType, BusinessTerminology> = {
  salon: {
    customerLabel: "Customer", customersLabel: "Customers",
    bookingLabel: "Appointment", bookingsLabel: "Appointments",
    productLabel: "Service & Product", productsLabel: "Services & Products",
    staffLabel: "Stylist / Specialist", staffsLabel: "Staff & Stylists",
    actionBooking: "+ New Appointment", kpiStatLabel: "Bookings Today"
  },
  cafe: {
    customerLabel: "Diner", customersLabel: "Customers",
    bookingLabel: "Table Order", bookingsLabel: "Orders & Tables",
    productLabel: "Menu Item", productsLabel: "Menu & Inventory",
    staffLabel: "Chef / Server", staffsLabel: "Kitchen & Staff",
    actionBooking: "+ New Order", kpiStatLabel: "Orders Today"
  },
  boutique: {
    customerLabel: "Buyer", customersLabel: "Customers",
    bookingLabel: "Sale / Order", bookingsLabel: "Orders",
    productLabel: "Apparel Item", productsLabel: "Catalog & Stock",
    staffLabel: "Sales Executive", staffsLabel: "Store Staff",
    actionBooking: "+ New Sale", kpiStatLabel: "Sales Today"
  },
  gym: {
    customerLabel: "Member", customersLabel: "Members",
    bookingLabel: "Training Session", bookingsLabel: "Class Sessions",
    productLabel: "Membership / Plan", productsLabel: "Plans & Gear",
    staffLabel: "Trainer / Coach", staffsLabel: "Trainers",
    actionBooking: "+ Check-In / Session", kpiStatLabel: "Attendance Today"
  },
  photography: {
    customerLabel: "Client", customersLabel: "Clients",
    bookingLabel: "Shoot / Event", bookingsLabel: "Booked Events",
    productLabel: "Package", productsLabel: "Packages & Addons",
    staffLabel: "Photographer / Crew", staffsLabel: "Team & Crew",
    actionBooking: "+ New Shoot", kpiStatLabel: "Shoots Today"
  },
  freelancer: {
    customerLabel: "Client", customersLabel: "Clients",
    bookingLabel: "Milestone", bookingsLabel: "Projects",
    productLabel: "Service Rate", productsLabel: "Services",
    staffLabel: "Collaborator", staffsLabel: "Team",
    actionBooking: "+ New Project", kpiStatLabel: "Active Projects"
  },
  coaching: {
    customerLabel: "Student", customersLabel: "Students",
    bookingLabel: "Class Batch", bookingsLabel: "Classes & Batches",
    productLabel: "Course Fee", productsLabel: "Courses & Books",
    staffLabel: "Tutor / Faculty", staffsLabel: "Faculty",
    actionBooking: "+ Schedule Class", kpiStatLabel: "Classes Today"
  },
  repair: {
    customerLabel: "Customer", customersLabel: "Customers",
    bookingLabel: "Job Sheet", bookingsLabel: "Repair Jobs",
    productLabel: "Spare Part", productsLabel: "Parts & Services",
    staffLabel: "Technician", staffsLabel: "Technicians",
    actionBooking: "+ New Repair Job", kpiStatLabel: "Jobs Today"
  },
  consultant: {
    customerLabel: "Client", customersLabel: "Clients",
    bookingLabel: "Advisory Session", bookingsLabel: "Sessions",
    productLabel: "Retainer Package", productsLabel: "Services",
    staffLabel: "Consultant", staffsLabel: "Consultants",
    actionBooking: "+ Schedule Session", kpiStatLabel: "Sessions Today"
  },
  general: {
    customerLabel: "Customer", customersLabel: "Customers",
    bookingLabel: "Booking", bookingsLabel: "Bookings",
    productLabel: "Item / Service", productsLabel: "Products & Services",
    staffLabel: "Staff Member", staffsLabel: "Staff",
    actionBooking: "+ New Booking", kpiStatLabel: "Bookings Today"
  }
};

export const demoBusinesses: Business[] = [
  { id: "b1", name: "Glow Studio", slug: "glow-studio", type: "salon", ownerName: "Priya Nair", tagline: "Luxury hair, skin & body spa", logoInitial: "G", location: "Vadodara, Gujarat", phone: "+91 98765 43210", email: "hello@glowstudio.in", businessHours: "10:00 AM - 08:00 PM", currency: "INR", subscriptionTier: "BUSINESS", accentColor: "#C9A24B" },
  { id: "b2", name: "Brew & Bean Café", slug: "brew-and-bean", type: "cafe", ownerName: "Arjun Mehta", tagline: "Artisanal coffee & fresh bakery", logoInitial: "B", location: "Ahmedabad, Gujarat", phone: "+91 91234 56789", email: "hi@brewbean.in", businessHours: "08:00 AM - 10:00 PM", currency: "INR", subscriptionTier: "PROFESSIONAL", accentColor: "#C9A24B" },
  { id: "b3", name: "Lens by Aisha", slug: "lens-by-aisha", type: "photography", ownerName: "Aisha Khan", tagline: "High-end weddings & portraits", logoInitial: "L", location: "Mumbai, Maharashtra", phone: "+91 99887 66554", email: "studio@lensbyaisha.com", businessHours: "09:00 AM - 07:00 PM", currency: "INR", subscriptionTier: "BUSINESS", accentColor: "#C9A24B" },
  { id: "b4", name: "FitHaus Club", slug: "fithaus", type: "gym", ownerName: "Rohan Verma", tagline: "Strength. Conditioning. Discipline.", logoInitial: "F", location: "Pune, Maharashtra", phone: "+91 90000 11223", email: "team@fithaus.fit", businessHours: "06:00 AM - 10:00 PM", currency: "INR", subscriptionTier: "PROFESSIONAL", accentColor: "#C9A24B" },
  { id: "b5", name: "BrightPath Academy", slug: "brightpath", type: "coaching", ownerName: "Kavita Rao", tagline: "Excellence in tuition & test prep", logoInitial: "P", location: "Vadodara, Gujarat", phone: "+91 98111 22334", email: "office@brightpath.edu", businessHours: "08:00 AM - 06:00 PM", currency: "INR", subscriptionTier: "STARTER", accentColor: "#C9A24B" },
];

export interface Customer {
  id: string; name: string; phone: string; email: string;
  totalSpent: number; visits: number; lastVisit: string; status: "active" | "inactive";
  tags: string[]; notes?: string; loyaltyPoints?: number;
}

export const initialCustomers: Customer[] = [
  { id: "c1", name: "Ananya Sharma", phone: "+91 98200 11111", email: "ananya.s@gmail.com", totalSpent: 18400, visits: 12, lastVisit: "2026-08-29", status: "active", tags: ["VIP", "Regular"], notes: "Prefers organic hair products only.", loyaltyPoints: 340 },
  { id: "c2", name: "Rhea Kapoor", phone: "+91 98200 22222", email: "rhea.k@gmail.com", totalSpent: 9600, visits: 6, lastVisit: "2026-08-20", status: "active", tags: ["Regular"], notes: "Books facial every 3 weeks.", loyaltyPoints: 120 },
  { id: "c3", name: "Meera Iyer", phone: "+91 98200 33333", email: "meera.iyer@gmail.com", totalSpent: 4200, visits: 3, lastVisit: "2026-07-02", status: "inactive", tags: ["New"], notes: "Inquired about bridal packages.", loyaltyPoints: 40 },
  { id: "c4", name: "Sanjana Reddy", phone: "+91 98200 44444", email: "sanjana.r@gmail.com", totalSpent: 27800, visits: 19, lastVisit: "2026-09-01", status: "active", tags: ["VIP", "Loyal"], notes: "Always requests Neha Joshi.", loyaltyPoints: 580 },
  { id: "c5", name: "Ishita Bose", phone: "+91 98200 55555", email: "ishita.b@gmail.com", totalSpent: 2100, visits: 2, lastVisit: "2026-06-15", status: "inactive", tags: [], notes: "", loyaltyPoints: 20 },
  { id: "c6", name: "Kabir Malhotra", phone: "+91 98200 66666", email: "kabir.m@gmail.com", totalSpent: 13500, visits: 8, lastVisit: "2026-08-27", status: "active", tags: ["Regular"], notes: "Prefers weekend appointments.", loyaltyPoints: 210 },
  { id: "c7", name: "Naina Desai", phone: "+91 98200 77777", email: "naina.d@gmail.com", totalSpent: 6700, visits: 5, lastVisit: "2026-08-11", status: "active", tags: ["New"], notes: "", loyaltyPoints: 90 },
];

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no-show";
export interface Booking {
  id: string; customer: string; service: string; staff: string;
  date: string; time: string; price: number; status: BookingStatus; notes?: string;
}

export const initialBookings: Booking[] = [
  { id: "bk1", customer: "Ananya Sharma", service: "Hair Spa & Scalp Detox", staff: "Neha Joshi", date: "2026-09-04", time: "10:00 AM", price: 1800, status: "confirmed", notes: "Use extra conditioner" },
  { id: "bk2", customer: "Sanjana Reddy", service: "Luxury Bridal Makeup", staff: "Farah Sheikh", date: "2026-09-04", time: "11:30 AM", price: 12000, status: "confirmed", notes: "Bridal trial complete" },
  { id: "bk3", customer: "Rhea Kapoor", service: "HydraGlow Classic Facial", staff: "Diya Kulkarni", date: "2026-09-04", time: "01:00 PM", price: 1500, status: "pending", notes: "First facial with us" },
  { id: "bk4", customer: "Kabir Malhotra", service: "Keratin Hair Treatment", staff: "Neha Joshi", date: "2026-09-04", time: "03:00 PM", price: 3200, status: "confirmed" },
  { id: "bk5", customer: "Naina Desai", service: "Spa Manicure & Pedicure", staff: "Diya Kulkarni", date: "2026-09-03", time: "12:00 PM", price: 900, status: "completed" },
  { id: "bk6", customer: "Meera Iyer", service: "Hair Spa", staff: "Neha Joshi", date: "2026-09-02", time: "04:00 PM", price: 1800, status: "no-show" },
];

export interface Product {
  id: string; name: string; sku: string; category: string; price: number; cost: number; stock: number; minStock: number; type: "product" | "service"; description?: string;
}

export const initialProducts: Product[] = [
  { id: "p1", name: "Argan Hair Renewal Serum 100ml", sku: "GS-HS-001", category: "Hair Care", price: 650, cost: 320, stock: 4, minStock: 10, type: "product", description: "Deep nourishing argan oil for shiny hair." },
  { id: "p2", name: "Vitamin C Radiance Face Wash", sku: "GS-FW-002", category: "Skin Care", price: 480, cost: 210, stock: 22, minStock: 8, type: "product", description: "Brightening gentle cleanser." },
  { id: "p3", name: "Keratin Smooth Shampoo 250ml", sku: "GS-SH-003", category: "Hair Care", price: 720, cost: 340, stock: 2, minStock: 10, type: "product", description: "Sulfate-free keratin daily shampoo." },
  { id: "p4", name: "Luxury Gel Polish Trio Set", sku: "GS-NP-004", category: "Nails", price: 990, cost: 450, stock: 15, minStock: 5, type: "product", description: "Long-lasting gel nail polishes." },
  { id: "p5", name: "Hair Spa & Scalp Detox", sku: "GS-SRV-001", category: "Services", price: 1800, cost: 400, stock: 999, minStock: 0, type: "service", description: "60-min deep hair repair spa." },
  { id: "p6", name: "Luxury Bridal Makeup", sku: "GS-SRV-002", category: "Services", price: 12000, cost: 2500, stock: 999, minStock: 0, type: "service", description: "Complete HD bridal makeup package." },
];

export interface InvoiceItem { description: string; quantity: number; unitPrice: number; amount: number; }
export interface Invoice {
  id: string; number: string; customer: string; items: InvoiceItem[]; subtotal: number; tax: number; discount: number; total: number; due: string; date: string; status: "paid" | "pending" | "partial" | "overdue"; notes?: string;
}

export const initialInvoices: Invoice[] = [
  { id: "in1", number: "INV-2026-041", customer: "Sanjana Reddy", items: [{ description: "Luxury Bridal Makeup Package", quantity: 1, unitPrice: 12000, amount: 12000 }], subtotal: 12000, tax: 600, discount: 600, total: 12000, due: "2026-09-08", date: "2026-09-01", status: "pending", notes: "Balance due on event day." },
  { id: "in2", number: "INV-2026-040", customer: "Ananya Sharma", items: [{ description: "Hair Spa & Scalp Detox", quantity: 1, unitPrice: 1800, amount: 1800 }], subtotal: 1800, tax: 90, discount: 0, total: 1890, due: "2026-09-01", date: "2026-08-29", status: "paid", notes: "Paid via UPI." },
  { id: "in3", number: "INV-2026-039", customer: "Kabir Malhotra", items: [{ description: "Keratin Hair Treatment", quantity: 1, unitPrice: 3200, amount: 3200 }], subtotal: 3200, tax: 160, discount: 160, total: 3200, due: "2026-08-25", date: "2026-08-20", status: "overdue", notes: "Reminder sent." },
  { id: "in4", number: "INV-2026-038", customer: "Rhea Kapoor", items: [{ description: "HydraGlow Classic Facial", quantity: 1, unitPrice: 1500, amount: 1500 }], subtotal: 1500, tax: 75, discount: 75, total: 1500, due: "2026-09-05", date: "2026-08-28", status: "partial", notes: "Advance ₹500 received." },
];

export interface Quotation {
  id: string; number: string; customer: string; items: InvoiceItem[]; total: number; validityDate: string; date: string; status: "draft" | "sent" | "accepted" | "converted";
}

export const initialQuotations: Quotation[] = [
  { id: "q1", number: "QT-2026-012", customer: "Meera Iyer", items: [{ description: "Bridal Hair & Makeup Combo (3 Functions)", quantity: 1, unitPrice: 28000, amount: 28000 }], total: 28000, validityDate: "2026-09-15", date: "2026-09-02", status: "sent" },
  { id: "q2", number: "QT-2026-011", customer: "Naina Desai", items: [{ description: "Monthly Spa Membership Package", quantity: 1, unitPrice: 5500, amount: 5500 }], total: 5500, validityDate: "2026-09-20", date: "2026-08-30", status: "accepted" },
];

export interface ExpenseItem { id: string; category: string; amount: number; date: string; description: string; paymentMethod: string; }
export const initialExpenses: ExpenseItem[] = [
  { id: "e1", category: "Rent", amount: 45000, date: "2026-09-01", description: "Studio space September rent", paymentMethod: "Bank Transfer" },
  { id: "e2", category: "Inventory", amount: 18200, date: "2026-08-28", description: "Olaplex & Argan product restock", paymentMethod: "Card" },
  { id: "e3", category: "Salary", amount: 62000, date: "2026-08-31", description: "Staff monthly payout", paymentMethod: "Bank Transfer" },
  { id: "e4", category: "Marketing", amount: 7000, date: "2026-08-22", description: "Instagram & Meta ad campaign", paymentMethod: "UPI" },
  { id: "e5", category: "Electricity & Utilities", amount: 6400, date: "2026-08-25", description: "Monthly power & water bill", paymentMethod: "UPI" },
];

export interface StaffMember {
  id: string; name: string; role: string; phone: string; email: string; rating: number; bookingsCompleted: number; revenue: number; workingHours: string; status: "active" | "inactive";
}
export const initialStaff: StaffMember[] = [
  { id: "st1", name: "Neha Joshi", role: "Senior Hair Stylist", phone: "+91 98980 11223", email: "neha@glowstudio.in", rating: 4.9, bookingsCompleted: 142, revenue: 286000, workingHours: "10:00 AM - 07:00 PM", status: "active" },
  { id: "st2", name: "Farah Sheikh", role: "Master Makeup Artist", phone: "+91 98980 33445", email: "farah@glowstudio.in", rating: 4.8, bookingsCompleted: 88, revenue: 412000, workingHours: "11:00 AM - 08:00 PM", status: "active" },
  { id: "st3", name: "Diya Kulkarni", role: "Beautician & Therapist", phone: "+91 98980 55667", email: "diya@glowstudio.in", rating: 4.7, bookingsCompleted: 121, revenue: 198000, workingHours: "10:00 AM - 06:00 PM", status: "active" },
];

export interface ReviewItem { id: string; customer: string; rating: number; comment: string; service: string; date: string; reply?: string; }
export const initialReviews: ReviewItem[] = [
  { id: "r1", customer: "Ananya Sharma", rating: 5, comment: "Neha is amazing with hair spa treatments! Leaves my hair shiny and healthy every time.", service: "Hair Spa", date: "2026-08-29", reply: "Thank you Ananya! Always a pleasure serving you!" },
  { id: "r2", customer: "Sanjana Reddy", rating: 5, comment: "Farah did my sister's bridal makeup, everyone was asking who did it. Absolutely breathtaking!", service: "Bridal Makeup", date: "2026-07-14", reply: "So grateful for your kind words Sanjana!" },
  { id: "r3", customer: "Meera Iyer", rating: 4, comment: "Good facial, skin feels super clean. Slightly busy on Saturday afternoon.", service: "Classic Facial", date: "2026-07-02" },
];

export const revenueTrend = [
  { month: "Apr", revenue: 168000, expenses: 98000, profit: 70000 },
  { month: "May", revenue: 182000, expenses: 101000, profit: 81000 },
  { month: "Jun", revenue: 176000, expenses: 105000, profit: 71000 },
  { month: "Jul", revenue: 205000, expenses: 112000, profit: 93000 },
  { month: "Aug", revenue: 224000, expenses: 118000, profit: 106000 },
  { month: "Sep", revenue: 245000, expenses: 132000, profit: 113000 },
];

export const topServicesChart = [
  { name: "Hair Spa", value: 68000 },
  { name: "Bridal Makeup", value: 96000 },
  { name: "Facial", value: 41000 },
  { name: "Hair Colour", value: 52000 },
  { name: "Nails", value: 23000 },
];

export const ratingDistribution = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
