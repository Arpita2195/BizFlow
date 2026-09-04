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
  { id: "b1", name: "Glow Studio", slug: "glow-studio", type: "salon", ownerName: "Priya Nair", tagline: "Luxury hair, skin & body spa", logoInitial: "G", location: "Vadodara, Gujarat", phone: "+91 98765 43210", email: "hello@glowstudio.in", businessHours: "10:00 AM - 08:00 PM", currency: "INR", subscriptionTier: "BUSINESS", accentColor: "#3B82F6" },
  { id: "b2", name: "Brew & Bean Café", slug: "brew-and-bean", type: "cafe", ownerName: "Arjun Mehta", tagline: "Artisanal coffee & fresh bakery", logoInitial: "B", location: "Ahmedabad, Gujarat", phone: "+91 91234 56789", email: "hi@brewbean.in", businessHours: "08:00 AM - 10:00 PM", currency: "INR", subscriptionTier: "PROFESSIONAL", accentColor: "#3B82F6" },
  { id: "b3", name: "Lens by Aisha", slug: "lens-by-aisha", type: "photography", ownerName: "Aisha Khan", tagline: "High-end weddings & portraits", logoInitial: "L", location: "Mumbai, Maharashtra", phone: "+91 99887 66554", email: "studio@lensbyaisha.com", businessHours: "09:00 AM - 07:00 PM", currency: "INR", subscriptionTier: "BUSINESS", accentColor: "#3B82F6" },
  { id: "b4", name: "FitHaus Club", slug: "fithaus", type: "gym", ownerName: "Rohan Verma", tagline: "Strength. Conditioning. Discipline.", logoInitial: "F", location: "Pune, Maharashtra", phone: "+91 90000 11223", email: "team@fithaus.fit", businessHours: "06:00 AM - 10:00 PM", currency: "INR", subscriptionTier: "PROFESSIONAL", accentColor: "#3B82F6" },
  { id: "b5", name: "BrightPath Academy", slug: "brightpath", type: "coaching", ownerName: "Kavita Rao", tagline: "Excellence in tuition & test prep", logoInitial: "P", location: "Vadodara, Gujarat", phone: "+91 98111 22334", email: "office@brightpath.edu", businessHours: "08:00 AM - 06:00 PM", currency: "INR", subscriptionTier: "STARTER", accentColor: "#3B82F6" },
];

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled" | "no-show";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalSpent: number;
  visits: number;
  lastVisit: string;
  status: "active" | "inactive";
  tags: string[];
  notes?: string;
  loyaltyPoints?: number;
}

export interface Booking {
  id: string;
  customer: string;
  service: string;
  staff: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  type: "product" | "service";
  description?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  customer: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  due: string;
  date: string;
  status: "paid" | "pending" | "overdue" | "draft" | "partial";
  notes?: string;
}

export interface Quotation {
  id: string;
  number: string;
  customer: string;
  items: InvoiceItem[];
  total: number;
  validityDate: string;
  date: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "converted";
}

export interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  paymentMethod: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  rating: number;
  bookingsCompleted: number;
  revenue: number;
  workingHours: string;
  status: "active" | "on_leave" | "inactive";
}

export interface ReviewItem {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  reply?: string;
}

export const revenueTrend = [
  { month: "Apr", revenue: 160000, expenses: 95000 },
  { month: "May", revenue: 172000, expenses: 98000 },
  { month: "Jun", revenue: 176000, expenses: 105000 },
  { month: "Jul", revenue: 210000, expenses: 110000 },
  { month: "Aug", revenue: 235000, expenses: 115000 },
  { month: "Sep", revenue: 248000, expenses: 122000 },
];

export interface DemoDataset {
  customers: Customer[];
  bookings: Booking[];
  products: Product[];
  invoices: Invoice[];
  quotations: Quotation[];
  expenses: ExpenseItem[];
  staff: StaffMember[];
  reviews: ReviewItem[];
  topServicesChart: { name: string; value: number }[];
}

export const demoDataByBusinessId: Record<string, DemoDataset> = {
  b1: {
    customers: [
      { id: "c1", name: "Ananya Sharma", phone: "+91 98200 11111", email: "ananya.s@gmail.com", totalSpent: 18400, visits: 12, lastVisit: "2026-08-29", status: "active", tags: ["VIP", "Regular"], notes: "Prefers organic hair products only.", loyaltyPoints: 340 },
      { id: "c2", name: "Rhea Kapoor", phone: "+91 98200 22222", email: "rhea.k@gmail.com", totalSpent: 9600, visits: 6, lastVisit: "2026-08-20", status: "active", tags: ["Regular"], notes: "Books facial every 3 weeks.", loyaltyPoints: 120 },
      { id: "c3", name: "Meera Iyer", phone: "+91 98200 33333", email: "meera.iyer@gmail.com", totalSpent: 4200, visits: 3, lastVisit: "2026-07-02", status: "inactive", tags: ["New"], notes: "Inquired about bridal packages.", loyaltyPoints: 40 },
      { id: "c4", name: "Sanjana Reddy", phone: "+91 98200 44444", email: "sanjana.r@gmail.com", totalSpent: 27800, visits: 19, lastVisit: "2026-09-01", status: "active", tags: ["VIP", "Loyal"], notes: "Always requests Neha Joshi.", loyaltyPoints: 580 },
      { id: "c5", name: "Ishita Bose", phone: "+91 98200 55555", email: "ishita.b@gmail.com", totalSpent: 2100, visits: 2, lastVisit: "2026-06-15", status: "inactive", tags: [], notes: "", loyaltyPoints: 20 },
      { id: "c6", name: "Kabir Malhotra", phone: "+91 98200 66666", email: "kabir.m@gmail.com", totalSpent: 13500, visits: 8, lastVisit: "2026-08-27", status: "active", tags: ["Regular"], notes: "Prefers weekend appointments.", loyaltyPoints: 210 },
      { id: "c7", name: "Naina Desai", phone: "+91 98200 77777", email: "naina.d@gmail.com", totalSpent: 6700, visits: 5, lastVisit: "2026-08-11", status: "active", tags: ["New"], notes: "", loyaltyPoints: 90 },
    ],
    bookings: [
      { id: "bk1", customer: "Ananya Sharma", service: "Hair Spa & Scalp Detox", staff: "Neha Joshi", date: "2026-09-04", time: "10:00 AM", price: 1800, status: "confirmed", notes: "Use extra conditioner" },
      { id: "bk2", customer: "Sanjana Reddy", service: "Luxury Bridal Makeup", staff: "Farah Sheikh", date: "2026-09-04", time: "11:30 AM", price: 12000, status: "confirmed", notes: "Bridal trial complete" },
      { id: "bk3", customer: "Rhea Kapoor", service: "HydraGlow Classic Facial", staff: "Diya Kulkarni", date: "2026-09-04", time: "01:00 PM", price: 1500, status: "pending", notes: "First facial with us" },
      { id: "bk4", customer: "Kabir Malhotra", service: "Keratin Hair Treatment", staff: "Neha Joshi", date: "2026-09-04", time: "03:00 PM", price: 3200, status: "confirmed" },
      { id: "bk5", customer: "Naina Desai", service: "Spa Manicure & Pedicure", staff: "Diya Kulkarni", date: "2026-09-03", time: "12:00 PM", price: 900, status: "completed" },
      { id: "bk6", customer: "Meera Iyer", service: "Hair Spa", staff: "Neha Joshi", date: "2026-09-02", time: "04:00 PM", price: 1800, status: "no-show" },
    ],
    products: [
      { id: "p1", name: "Argan Hair Renewal Serum 100ml", sku: "GS-HS-001", category: "Hair Care", price: 650, cost: 320, stock: 4, minStock: 10, type: "product", description: "Deep nourishing argan oil for shiny hair." },
      { id: "p2", name: "Vitamin C Radiance Face Wash", sku: "GS-FW-002", category: "Skin Care", price: 480, cost: 210, stock: 22, minStock: 8, type: "product", description: "Brightening gentle cleanser." },
      { id: "p3", name: "Keratin Smooth Shampoo 250ml", sku: "GS-SH-003", category: "Hair Care", price: 720, cost: 340, stock: 2, minStock: 10, type: "product", description: "Sulfate-free keratin daily shampoo." },
      { id: "p4", name: "Luxury Gel Polish Trio Set", sku: "GS-NP-004", category: "Nails", price: 990, cost: 450, stock: 15, minStock: 5, type: "product", description: "Long-lasting gel nail polishes." },
      { id: "p5", name: "Hair Spa & Scalp Detox", sku: "GS-SRV-001", category: "Services", price: 1800, cost: 400, stock: 999, minStock: 0, type: "service", description: "60-min deep hair repair spa." },
      { id: "p6", name: "Luxury Bridal Makeup", sku: "GS-SRV-002", category: "Services", price: 12000, cost: 2500, stock: 999, minStock: 0, type: "service", description: "Complete HD bridal makeup package." },
    ],
    invoices: [
      { id: "in1", number: "INV-2026-041", customer: "Sanjana Reddy", items: [{ description: "Luxury Bridal Makeup Package", quantity: 1, unitPrice: 12000, amount: 12000 }], subtotal: 12000, tax: 600, discount: 600, total: 12000, due: "2026-09-08", date: "2026-09-01", status: "pending", notes: "Balance due on event day." },
      { id: "in2", number: "INV-2026-040", customer: "Ananya Sharma", items: [{ description: "Hair Spa & Scalp Detox", quantity: 1, unitPrice: 1800, amount: 1800 }], subtotal: 1800, tax: 90, discount: 0, total: 1890, due: "2026-09-01", date: "2026-08-29", status: "paid", notes: "Paid via UPI." },
      { id: "in3", number: "INV-2026-039", customer: "Kabir Malhotra", items: [{ description: "Keratin Hair Treatment", quantity: 1, unitPrice: 3200, amount: 3200 }], subtotal: 3200, tax: 160, discount: 160, total: 3200, due: "2026-08-25", date: "2026-08-20", status: "overdue", notes: "Reminder sent." },
      { id: "in4", number: "INV-2026-038", customer: "Rhea Kapoor", items: [{ description: "HydraGlow Classic Facial", quantity: 1, unitPrice: 1500, amount: 1500 }], subtotal: 1500, tax: 75, discount: 75, total: 1500, due: "2026-09-05", date: "2026-08-28", status: "partial", notes: "Advance ₹500 received." },
    ],
    quotations: [
      { id: "q1", number: "QT-2026-012", customer: "Meera Iyer", items: [{ description: "Bridal Hair & Makeup Combo (3 Functions)", quantity: 1, unitPrice: 28000, amount: 28000 }], total: 28000, validityDate: "2026-09-15", date: "2026-09-02", status: "sent" },
      { id: "q2", number: "QT-2026-011", customer: "Naina Desai", items: [{ description: "Monthly Spa Membership Package", quantity: 1, unitPrice: 5500, amount: 5500 }], total: 5500, validityDate: "2026-09-20", date: "2026-08-30", status: "accepted" },
    ],
    expenses: [
      { id: "e1", category: "Rent", amount: 45000, date: "2026-09-01", description: "Studio space September rent", paymentMethod: "Bank Transfer" },
      { id: "e2", category: "Inventory", amount: 18200, date: "2026-08-28", description: "Olaplex & Argan product restock", paymentMethod: "Card" },
      { id: "e3", category: "Salary", amount: 62000, date: "2026-08-31", description: "Staff monthly payout", paymentMethod: "Bank Transfer" },
      { id: "e4", category: "Marketing", amount: 7000, date: "2026-08-22", description: "Instagram & Meta ad campaign", paymentMethod: "UPI" },
      { id: "e5", category: "Electricity & Utilities", amount: 6400, date: "2026-08-25", description: "Monthly power & water bill", paymentMethod: "UPI" },
    ],
    staff: [
      { id: "st1", name: "Neha Joshi", role: "Senior Hair Stylist", phone: "+91 98980 11223", email: "neha@glowstudio.in", rating: 4.9, bookingsCompleted: 142, revenue: 286000, workingHours: "10:00 AM - 07:00 PM", status: "active" },
      { id: "st2", name: "Farah Sheikh", role: "Master Makeup Artist", phone: "+91 98980 33445", email: "farah@glowstudio.in", rating: 4.8, bookingsCompleted: 88, revenue: 412000, workingHours: "11:00 AM - 08:00 PM", status: "active" },
      { id: "st3", name: "Diya Kulkarni", role: "Beautician & Therapist", phone: "+91 98980 55667", email: "diya@glowstudio.in", rating: 4.7, bookingsCompleted: 121, revenue: 198000, workingHours: "10:00 AM - 06:00 PM", status: "active" },
    ],
    reviews: [
      { id: "r1", customer: "Ananya Sharma", rating: 5, comment: "Neha is amazing with hair spa treatments! Leaves my hair shiny and healthy every time.", service: "Hair Spa", date: "2026-08-29", reply: "Thank you Ananya! Always a pleasure serving you!" },
      { id: "r2", customer: "Sanjana Reddy", rating: 5, comment: "Farah did my sister's bridal makeup, everyone was asking who did it. Absolutely breathtaking!", service: "Bridal Makeup", date: "2026-07-14", reply: "So grateful for your kind words Sanjana!" },
      { id: "r3", customer: "Meera Iyer", rating: 4, comment: "Good facial, skin feels super clean. Slightly busy on Saturday afternoon.", service: "Classic Facial", date: "2026-07-02" },
    ],
    topServicesChart: [
      { name: "Hair Spa", value: 68000 },
      { name: "Bridal Makeup", value: 96000 },
      { name: "Facial", value: 41000 },
      { name: "Hair Colour", value: 52000 },
      { name: "Nails", value: 23000 },
    ]
  },
  b2: {
    customers: [
      { id: "c201", name: "Vikram Patel", phone: "+91 98201 11111", email: "vikram.patel@gmail.com", totalSpent: 12400, visits: 18, lastVisit: "2026-09-04", status: "active", tags: ["Coffee Aficionado", "Regular"], notes: "Enjoys oat milk hazelnut lattes.", loyaltyPoints: 240 },
      { id: "c202", name: "Pooja Shah", phone: "+91 98201 22222", email: "pooja.s@gmail.com", totalSpent: 28500, visits: 24, lastVisit: "2026-09-03", status: "active", tags: ["VIP", "Brunch Club"], notes: "Reserves Table 7 every weekend.", loyaltyPoints: 560 },
      { id: "c203", name: "Aman Verma", phone: "+91 98201 33333", email: "aman.v@gmail.com", totalSpent: 6200, visits: 11, lastVisit: "2026-09-02", status: "active", tags: ["Daily Takeaway"], notes: "Morning espresso takeaway at 8:30 AM.", loyaltyPoints: 110 },
      { id: "c204", name: "Devang Trivedi", phone: "+91 98201 44444", email: "devang.t@gmail.com", totalSpent: 16800, visits: 15, lastVisit: "2026-09-01", status: "active", tags: ["Remote Worker"], notes: "Requires laptop table with power outlet.", loyaltyPoints: 310 },
      { id: "c205", name: "Simran Malhotra", phone: "+91 98201 55555", email: "simran.m@gmail.com", totalSpent: 3500, visits: 4, lastVisit: "2026-08-28", status: "active", tags: ["New"], notes: "Organizes corporate high tea events.", loyaltyPoints: 70 },
      { id: "c206", name: "Rohan Kapadia", phone: "+91 98201 66666", email: "rohan.k@gmail.com", totalSpent: 9100, visits: 9, lastVisit: "2026-08-20", status: "active", tags: ["Regular"], notes: "Loves fresh blueberry muffins.", loyaltyPoints: 180 },
    ],
    bookings: [
      { id: "bk201", customer: "Vikram Patel", service: "Hazelnut Cappuccino & Avocado Toast", staff: "Chef Rohan", date: "2026-09-04", time: "10:00 AM", price: 850, status: "confirmed", notes: "Table 4 reserved" },
      { id: "bk202", customer: "Pooja Shah", service: "Artisanal Cold Brew & Cheese Croissant", staff: "Simran Kaur", date: "2026-09-04", time: "11:15 AM", price: 620, status: "confirmed", notes: "Table 7 reserved" },
      { id: "bk203", customer: "Aman Verma", service: "Blueberry Muffin & Vanilla Latte", staff: "Chef Rohan", date: "2026-09-04", time: "01:30 PM", price: 490, status: "pending", notes: "Takeaway order" },
      { id: "bk204", customer: "Devang Trivedi", service: "Double Espresso & Truffle Pasta", staff: "Simran Kaur", date: "2026-09-04", time: "03:45 PM", price: 1250, status: "confirmed" },
      { id: "bk205", customer: "Simran Malhotra", service: "Gourmet Coffee Beans Pack (500g)", staff: "Simran Kaur", date: "2026-09-03", time: "12:00 PM", price: 1100, status: "completed" },
    ],
    products: [
      { id: "p201", name: "Single-Origin Arabica Beans 250g", sku: "BB-CB-001", category: "Retail Coffee", price: 550, cost: 240, stock: 18, minStock: 5, type: "product", description: "Direct trade roasted Arabica coffee beans." },
      { id: "p202", name: "Gourmet Dark Roast Beans 500g", sku: "BB-CB-002", category: "Retail Coffee", price: 980, cost: 410, stock: 12, minStock: 5, type: "product", description: "Rich cocoa notes dark roast coffee." },
      { id: "p203", name: "Artisanal House Cold Brew", sku: "BB-DRK-001", category: "Beverages", price: 280, cost: 60, stock: 999, minStock: 0, type: "service", description: "Steeped 18 hours cold brew coffee." },
      { id: "p204", name: "Truffle Mushroom Wild Pasta", sku: "BB-FOD-001", category: "Kitchen Menu", price: 480, cost: 140, stock: 999, minStock: 0, type: "service", description: "Handmade fettuccine with truffle oil." },
      { id: "p205", name: "Avocado Sourdough Toast", sku: "BB-FOD-002", category: "Kitchen Menu", price: 380, cost: 95, stock: 999, minStock: 0, type: "service", description: "Fresh Haas avocado on sourdough." },
      { id: "p206", name: "Hazelnut Cappuccino", sku: "BB-DRK-002", category: "Beverages", price: 240, cost: 45, stock: 999, minStock: 0, type: "service", description: "Double shot espresso with hazelnut syrup." },
    ],
    invoices: [
      { id: "in201", number: "ORD-2026-104", customer: "Pooja Shah", items: [{ description: "Gourmet Brunch & Coffee Catering Party", quantity: 1, unitPrice: 4800, amount: 4800 }], subtotal: 4800, tax: 240, discount: 240, total: 4800, due: "2026-09-05", date: "2026-09-03", status: "pending", notes: "Weekend table reservation deposit." },
      { id: "in202", number: "ORD-2026-103", customer: "Vikram Patel", items: [{ description: "Hazelnut Cappuccino & Avocado Toast", quantity: 1, unitPrice: 850, amount: 850 }], subtotal: 850, tax: 40, discount: 0, total: 890, due: "2026-09-04", date: "2026-09-04", status: "paid", notes: "Paid via UPI." },
      { id: "in203", number: "ORD-2026-102", customer: "Devang Trivedi", items: [{ description: "Double Espresso & Truffle Pasta", quantity: 1, unitPrice: 1250, amount: 1250 }], subtotal: 1250, tax: 60, discount: 60, total: 1250, due: "2026-09-01", date: "2026-09-01", status: "paid", notes: "Paid via Card." },
      { id: "in204", number: "ORD-2026-101", customer: "Aman Verma", items: [{ description: "Coffee Beans 500g Pack", quantity: 1, unitPrice: 1100, amount: 1100 }], subtotal: 1100, tax: 55, discount: 0, total: 1155, due: "2026-08-28", date: "2026-08-25", status: "overdue", notes: "Monthly office coffee tab." },
    ],
    quotations: [
      { id: "q201", number: "QT-CAFE-001", customer: "Simran Malhotra", items: [{ description: "Corporate Office Coffee & Pastry Catering (30 Pax)", quantity: 1, unitPrice: 18500, amount: 18500 }], total: 18500, validityDate: "2026-09-15", date: "2026-09-02", status: "sent" },
      { id: "q202", number: "QT-CAFE-002", customer: "Rohan Kapadia", items: [{ description: "Birthday High Tea Party & Bakery Buffet", quantity: 1, unitPrice: 12000, amount: 12000 }], total: 12000, validityDate: "2026-09-20", date: "2026-08-30", status: "accepted" },
    ],
    expenses: [
      { id: "e201", category: "Rent", amount: 65000, date: "2026-09-01", description: "Café commercial space September rent", paymentMethod: "Bank Transfer" },
      { id: "e202", category: "Inventory", amount: 32000, date: "2026-08-28", description: "Arabica beans, organic milk & bakery stock", paymentMethod: "Card" },
      { id: "e203", category: "Salary", amount: 58000, date: "2026-08-31", description: "Baristas & kitchen staff payroll", paymentMethod: "Bank Transfer" },
      { id: "e204", category: "Utilities", amount: 14500, date: "2026-08-25", description: "Commercial espresso machine electricity & power", paymentMethod: "UPI" },
      { id: "e205", category: "Marketing", amount: 8000, date: "2026-08-22", description: "Food blogger tasting & Instagram promo", paymentMethod: "UPI" },
    ],
    staff: [
      { id: "st201", name: "Chef Rohan", role: "Head Barista & Baker", phone: "+91 98981 11223", email: "rohan@brewbean.in", rating: 4.9, bookingsCompleted: 310, revenue: 345000, workingHours: "08:00 AM - 04:00 PM", status: "active" },
      { id: "st202", name: "Simran Kaur", role: "Senior Floor Manager", phone: "+91 98981 33445", email: "simran@brewbean.in", rating: 4.9, bookingsCompleted: 280, revenue: 290000, workingHours: "01:00 PM - 09:00 PM", status: "active" },
      { id: "st203", name: "Chef Amit", role: "Pastry Specialist", phone: "+91 98981 55667", email: "amit@brewbean.in", rating: 4.8, bookingsCompleted: 195, revenue: 215000, workingHours: "07:00 AM - 03:00 PM", status: "active" },
    ],
    reviews: [
      { id: "r201", customer: "Vikram Patel", rating: 5, comment: "Best cold brew in Vadodara! The avocado sourdough toast is crisp perfection.", service: "Cold Brew & Toast", date: "2026-09-03", reply: "Thanks Vikram! Glad you enjoyed the single-origin roast!" },
      { id: "r202", customer: "Pooja Shah", rating: 5, comment: "Aesthetic ambiance, warm service, and the truffle pasta is heavenly.", service: "Truffle Pasta", date: "2026-08-29", reply: "Thank you Pooja! Looking forward to hosting your next brunch!" },
      { id: "r203", customer: "Aman Verma", rating: 4, comment: "Great daily coffee spot. Quick service for morning takeaway vanilla lattes!", service: "Vanilla Latte", date: "2026-08-15" },
    ],
    topServicesChart: [
      { name: "Truffle Pasta", value: 74000 },
      { name: "Cold Brew", value: 58000 },
      { name: "Avocado Toast", value: 48000 },
      { name: "Hazelnut Latte", value: 36000 },
      { name: "Cheese Croissant", value: 29000 },
    ]
  },
  b3: {
    customers: [
      { id: "c301", name: "Kunal & Riya Mehta", phone: "+91 98202 11111", email: "kunal.mehta@gmail.com", totalSpent: 175000, visits: 4, lastVisit: "2026-09-01", status: "active", tags: ["Wedding Client", "VIP"], notes: "Udaipur Destination Wedding in November.", loyaltyPoints: 1750 },
      { id: "c302", name: "Zenith Tech Inc.", phone: "+91 98202 22222", email: "hr@zenithtech.com", totalSpent: 90000, visits: 6, lastVisit: "2026-08-25", status: "active", tags: ["Corporate Client"], notes: "Annual executive headshots & campus tour.", loyaltyPoints: 900 },
      { id: "c303", name: "Tara Malhotra", phone: "+91 98202 33333", email: "tara.m@gmail.com", totalSpent: 35000, visits: 3, lastVisit: "2026-08-18", status: "active", tags: ["Maternity Client"], notes: "Prefers natural outdoor golden hour lighting.", loyaltyPoints: 350 },
      { id: "c304", name: "Urban Style Co.", phone: "+91 98202 44444", email: "fashion@urbanstyle.in", totalSpent: 120000, visits: 8, lastVisit: "2026-08-29", status: "active", tags: ["Fashion Label"], notes: "Requires studio backdrop & high-fashion color grading.", loyaltyPoints: 1200 },
      { id: "c305", name: "Kabir & Sneha Roy", phone: "+91 98202 55555", email: "kabir.roy@gmail.com", totalSpent: 28000, visits: 2, lastVisit: "2026-07-20", status: "inactive", tags: [], notes: "", loyaltyPoints: 280 },
    ],
    bookings: [
      { id: "bk301", customer: "Kunal & Riya Mehta", service: "Destination Wedding Coverage", staff: "Aisha Khan", date: "2026-09-04", time: "09:00 AM", price: 75000, status: "confirmed", notes: "Udaipur Pre-Wedding Shoot" },
      { id: "bk302", customer: "Zenith Tech Inc.", service: "Corporate Executive Headshots", staff: "Sameer Merchant", date: "2026-09-04", time: "01:30 PM", price: 45000, status: "confirmed", notes: "20 Leadership profiles" },
      { id: "bk303", customer: "Tara Malhotra", service: "Maternity & Newborn Fine-Art Shoot", staff: "Aisha Khan", date: "2026-09-04", time: "04:00 PM", price: 25000, status: "pending" },
      { id: "bk304", customer: "Urban Style Co.", service: "Autumn Lookbook Fashion Shoot", staff: "Sameer Merchant", date: "2026-09-04", time: "06:00 PM", price: 55000, status: "confirmed" },
    ],
    products: [
      { id: "p301", name: "Custom Engraved Leather Album 30p", sku: "LA-ALB-001", category: "Albums & Prints", price: 14500, cost: 5200, stock: 10, minStock: 2, type: "product", description: "Italian leather album with lay-flat silk pages." },
      { id: "p302", name: "Cinematic Drone 4K Reel Addon", sku: "LA-DRN-002", category: "Addons", price: 18000, cost: 4000, stock: 999, minStock: 0, type: "service", description: "Aerial 4K cinematic video coverage." },
      { id: "p303", name: "Destination Wedding Deluxe Package", sku: "LA-SRV-001", category: "Packages", price: 150000, cost: 35000, stock: 999, minStock: 0, type: "service", description: "Full 3-day wedding photography & film." },
      { id: "p304", name: "Corporate Executive Portrait Package", sku: "LA-SRV-002", category: "Packages", price: 45000, cost: 10000, stock: 999, minStock: 0, type: "service", description: "Studio headshots & retouched portraits." },
    ],
    invoices: [
      { id: "in301", number: "PHO-2026-088", customer: "Kunal & Riya Mehta", items: [{ description: "Destination Wedding Advance Retainer", quantity: 1, unitPrice: 75000, amount: 75000 }], subtotal: 75000, tax: 3750, discount: 0, total: 75000, due: "2026-09-10", date: "2026-09-01", status: "pending", notes: "Balance due before event." },
      { id: "in302", number: "PHO-2026-087", customer: "Zenith Tech Inc.", items: [{ description: "Corporate Executive Headshots", quantity: 1, unitPrice: 45000, amount: 45000 }], subtotal: 45000, tax: 2250, discount: 0, total: 47250, due: "2026-08-30", date: "2026-08-25", status: "paid", notes: "Paid via Bank Transfer." },
      { id: "in303", number: "PHO-2026-086", customer: "Urban Style Co.", items: [{ description: "Fashion Lookbook Shoot", quantity: 1, unitPrice: 55000, amount: 55000 }], subtotal: 55000, tax: 2750, discount: 2750, total: 55000, due: "2026-08-20", date: "2026-08-15", status: "paid", notes: "Paid via NEFT." },
    ],
    quotations: [
      { id: "q301", number: "QT-PHO-001", customer: "Kabir & Sneha Roy", items: [{ description: "25th Anniversary Royal Portrait Gala", quantity: 1, unitPrice: 65000, amount: 65000 }], total: 65000, validityDate: "2026-09-15", date: "2026-09-02", status: "sent" },
      { id: "q302", number: "QT-PHO-002", customer: "Tara Malhotra", items: [{ description: "Baby Shower & Infant Milestone Package", quantity: 1, unitPrice: 35000, amount: 35000 }], total: 35000, validityDate: "2026-09-20", date: "2026-08-30", status: "accepted" },
    ],
    expenses: [
      { id: "e301", category: "Rent", amount: 50000, date: "2026-09-01", description: "Studio space & editing darkroom September rent", paymentMethod: "Bank Transfer" },
      { id: "e302", category: "Equipment", amount: 28000, date: "2026-08-28", description: "Sony Alpha Lens & Profoto lighting lease", paymentMethod: "Card" },
      { id: "e303", category: "Salary", amount: 48000, date: "2026-08-31", description: "Second shooters & video editor stipends", paymentMethod: "Bank Transfer" },
      { id: "e304", category: "Software", amount: 6500, date: "2026-08-25", description: "Adobe Creative Cloud & Capture One subscriptions", paymentMethod: "Card" },
    ],
    staff: [
      { id: "st301", name: "Aisha Khan", role: "Lead Photographer & Creative Director", phone: "+91 98982 11223", email: "aisha@lensbyaisha.com", rating: 5.0, bookingsCompleted: 95, revenue: 580000, workingHours: "09:00 AM - 07:00 PM", status: "active" },
      { id: "st302", name: "Sameer Merchant", role: "Senior Cinematographer", phone: "+91 98982 33445", email: "sameer@lensbyaisha.com", rating: 4.9, bookingsCompleted: 72, revenue: 390000, workingHours: "10:00 AM - 07:00 PM", status: "active" },
      { id: "st303", name: "Rahul Varma", role: "Colorist & Post-Production Lead", phone: "+91 98982 55667", email: "rahul@lensbyaisha.com", rating: 4.8, bookingsCompleted: 110, revenue: 240000, workingHours: "10:00 AM - 06:00 PM", status: "active" },
    ],
    reviews: [
      { id: "r301", customer: "Kunal Mehta", rating: 5, comment: "Aisha captured our wedding moments like a dream. Every photograph is a masterpiece!", service: "Destination Wedding", date: "2026-09-01", reply: "Thank you Kunal! Wish you both a lifetime of happiness!" },
      { id: "r302", customer: "Zenith Tech Inc.", rating: 5, comment: "Extremely professional headshot session for our 40-member leadership team.", service: "Corporate Headshots", date: "2026-08-25" },
    ],
    topServicesChart: [
      { name: "Wedding Coverage", value: 240000 },
      { name: "Fashion Lookbook", value: 85000 },
      { name: "Event Coverage", value: 62000 },
      { name: "Corporate Headshots", value: 45000 },
      { name: "Maternity Shoot", value: 38000 },
    ]
  },
  b4: {
    customers: [
      { id: "c401", name: "Aditya Roy", phone: "+91 98203 11111", email: "aditya.roy@gmail.com", totalSpent: 42400, visits: 36, lastVisit: "2026-09-04", status: "active", tags: ["VIP", "PT Client"], notes: "Preparing for powerlifting meet.", loyaltyPoints: 840 },
      { id: "c402", name: "Natasha Parikh", phone: "+91 98203 22222", email: "natasha.p@gmail.com", totalSpent: 28800, visits: 22, lastVisit: "2026-09-03", status: "active", tags: ["Pilates Regular"], notes: "Attends 10:30 AM Pilates batch.", loyaltyPoints: 570 },
      { id: "c403", name: "Rahul Singhania", phone: "+91 98203 33333", email: "rahul.s@gmail.com", totalSpent: 19000, visits: 18, lastVisit: "2026-09-02", status: "active", tags: ["Heavy Lifter"], notes: "Focuses on squat and bench progression.", loyaltyPoints: 380 },
      { id: "c404", name: "Dr. Meenal Joshi", phone: "+91 98203 44444", email: "meenal.j@gmail.com", totalSpent: 12500, visits: 14, lastVisit: "2026-08-30", status: "active", tags: ["HIIT Batch"], notes: "Enrolled in morning HIIT group.", loyaltyPoints: 250 },
      { id: "c405", name: "Varun Kapoor", phone: "+91 98203 55555", email: "varun.k@gmail.com", totalSpent: 4500, visits: 5, lastVisit: "2026-08-22", status: "active", tags: ["New Member"], notes: "Goal: 10kg fat loss in 3 months.", loyaltyPoints: 90 },
    ],
    bookings: [
      { id: "bk401", customer: "Aditya Roy", service: "1-on-1 Personal Strength PT", staff: "Coach Vikram", date: "2026-09-04", time: "06:30 AM", price: 1500, status: "confirmed", notes: "Heavy Deadlift Day" },
      { id: "bk402", customer: "Morning HIIT Batch", service: "Group Conditioning HIIT Session", staff: "Coach Sneha", date: "2026-09-04", time: "08:00 AM", price: 800, status: "confirmed", notes: "12 Members checked in" },
      { id: "bk403", customer: "Natasha Parikh", service: "Pilates & Core Mobility Session", staff: "Coach Sneha", date: "2026-09-04", time: "10:30 AM", price: 1200, status: "pending" },
      { id: "bk404", customer: "Rahul Singhania", service: "Powerlifting Bench Press Coaching", staff: "Coach Vikram", date: "2026-09-04", time: "06:00 PM", price: 1500, status: "confirmed" },
    ],
    products: [
      { id: "p401", name: "Whey Isolate Protein Powder 2kg", sku: "FH-SUP-001", category: "Supplements", price: 4800, cost: 2600, stock: 15, minStock: 5, type: "product", description: "Pure 100% whey isolate protein." },
      { id: "p402", name: "FitHaus Leather Lifting Straps", sku: "FH-GER-002", category: "Fitness Gear", price: 1200, cost: 450, stock: 25, minStock: 10, type: "product", description: "Heavy duty padded leather straps." },
      { id: "p403", name: "Annual All-Access VIP Membership", sku: "FH-MEM-001", category: "Memberships", price: 18000, cost: 3000, stock: 999, minStock: 0, type: "service", description: "365 Days gym access + locker." },
      { id: "p404", name: "12-Session Personal PT Package", sku: "FH-SRV-001", category: "Personal Training", price: 14400, cost: 3600, stock: 999, minStock: 0, type: "service", description: "1-on-1 dedicated coach training." },
    ],
    invoices: [
      { id: "in401", number: "FIT-2026-202", customer: "Aditya Roy", items: [{ description: "Annual VIP Membership & PT Pass", quantity: 1, unitPrice: 28000, amount: 28000 }], subtotal: 28000, tax: 1400, discount: 1400, total: 28000, due: "2026-09-10", date: "2026-09-01", status: "pending", notes: "2nd installment due." },
      { id: "in402", number: "FIT-2026-201", customer: "Natasha Parikh", items: [{ description: "Pilates 12-Session Pass", quantity: 1, unitPrice: 14400, amount: 14400 }], subtotal: 14400, tax: 720, discount: 0, total: 15120, due: "2026-08-30", date: "2026-08-25", status: "paid", notes: "Paid via GPay." },
      { id: "in403", number: "FIT-2026-200", customer: "Rahul Singhania", items: [{ description: "Quarterly Strength Pass", quantity: 1, unitPrice: 9000, amount: 9000 }], subtotal: 9000, tax: 450, discount: 450, total: 9000, due: "2026-08-20", date: "2026-08-15", status: "paid", notes: "Paid via Card." },
    ],
    quotations: [
      { id: "q401", number: "QT-FIT-001", customer: "Dr. Meenal Joshi", items: [{ description: "Corporate Wellness Program (25 Employees)", quantity: 1, unitPrice: 48000, amount: 48000 }], total: 48000, validityDate: "2026-09-15", date: "2026-09-02", status: "sent" },
      { id: "q402", number: "QT-FIT-002", customer: "Varun Kapoor", items: [{ description: "Personal Transformation 6-Month Plan", quantity: 1, unitPrice: 32000, amount: 32000 }], total: 32000, validityDate: "2026-09-20", date: "2026-08-30", status: "accepted" },
    ],
    expenses: [
      { id: "e401", category: "Rent", amount: 85000, date: "2026-09-01", description: "4000 sq.ft. Gym facility September rent", paymentMethod: "Bank Transfer" },
      { id: "e402", category: "Equipment", amount: 18000, date: "2026-08-28", description: "Rogue fitness cable & pulley maintenance", paymentMethod: "Card" },
      { id: "e403", category: "Salary", amount: 75000, date: "2026-08-31", description: "Personal trainers & front desk payroll", paymentMethod: "Bank Transfer" },
      { id: "e404", category: "Utilities", amount: 22000, date: "2026-08-25", description: "Heavy duty AC power & water bill", paymentMethod: "UPI" },
    ],
    staff: [
      { id: "st401", name: "Coach Vikram", role: "Head Strength & Powerlifting Coach", phone: "+91 98983 11223", email: "vikram@fithaus.fit", rating: 4.9, bookingsCompleted: 220, revenue: 380000, workingHours: "06:00 AM - 02:00 PM", status: "active" },
      { id: "st402", name: "Coach Sneha", role: "Pilates & HIIT Specialist", phone: "+91 98983 33445", email: "sneha@fithaus.fit", rating: 4.9, bookingsCompleted: 180, revenue: 290000, workingHours: "08:00 AM - 04:00 PM", status: "active" },
      { id: "st403", name: "Coach Tariq", role: "Functional Nutrition & Conditioning", phone: "+91 98983 55667", email: "tariq@fithaus.fit", rating: 4.8, bookingsCompleted: 140, revenue: 210000, workingHours: "02:00 PM - 10:00 PM", status: "active" },
    ],
    reviews: [
      { id: "r401", customer: "Aditya Roy", rating: 5, comment: "Coach Vikram's personal training helped me add 20kg to my deadlift safely. Top gym!", service: "Personal Training", date: "2026-09-04", reply: "Boom! Hard work pays off Aditya!" },
      { id: "r402", customer: "Natasha Parikh", rating: 5, comment: "Super clean studio, great AC, and Coach Sneha's Pilates classes are fantastic.", service: "Pilates Session", date: "2026-08-30" },
    ],
    topServicesChart: [
      { name: "VIP Membership", value: 180000 },
      { name: "Personal Training", value: 120000 },
      { name: "HIIT Group Pass", value: 65000 },
      { name: "Protein & Gear", value: 42000 },
      { name: "Pilates Pass", value: 35000 },
    ]
  },
  b5: {
    customers: [
      { id: "c501", name: "Pritesh Shah", phone: "+91 98204 11111", email: "pritesh.shah@gmail.com", totalSpent: 55000, visits: 42, lastVisit: "2026-09-04", status: "active", tags: ["JEE Batch", "VIP"], notes: "Class 12 Top Ranker batch.", loyaltyPoints: 1100 },
      { id: "c502", name: "Kavya Joshi", phone: "+91 98204 22222", email: "kavya.j@gmail.com", totalSpent: 34500, visits: 28, lastVisit: "2026-09-03", status: "active", tags: ["Class 10 Foundation"], notes: "Preparing for Board exams.", loyaltyPoints: 690 },
      { id: "c503", name: "Siddharth Nair", phone: "+91 98204 33333", email: "siddharth.n@gmail.com", totalSpent: 42000, visits: 35, lastVisit: "2026-09-02", status: "active", tags: ["NEET Sprint"], notes: "Enrolled in 6-month NEET Biology intensive.", loyaltyPoints: 840 },
      { id: "c504", name: "Riya Patel", phone: "+91 98204 44444", email: "riya.p@gmail.com", totalSpent: 22000, visits: 19, lastVisit: "2026-08-28", status: "active", tags: ["Class 11 Science"], notes: "Enquired about 2-year combo.", loyaltyPoints: 440 },
      { id: "c505", name: "Harsh Varma", phone: "+91 98204 55555", email: "harsh.v@gmail.com", totalSpent: 14000, visits: 12, lastVisit: "2026-08-20", status: "active", tags: ["Test Series Pack"], notes: "Appears for weekly Sunday mocks.", loyaltyPoints: 280 },
    ],
    bookings: [
      { id: "bk501", customer: "Class 12 Batch A", service: "Physics Electromagnetism Lecture", staff: "Prof. Suresh Iyer", date: "2026-09-04", time: "08:00 AM", price: 2500, status: "confirmed", notes: "Room 101 Lecture Hall" },
      { id: "bk502", customer: "JEE Advanced Sprint", service: "Mathematics Calculus Practice", staff: "Prof. Harsh Vardhan", date: "2026-09-04", time: "10:30 AM", price: 3000, status: "confirmed", notes: "Formula drill session" },
      { id: "bk503", customer: "Kavya Joshi", service: "Class 10 Chemistry Chemical Bonding", staff: "Prof. Anjali Rao", date: "2026-09-04", time: "03:00 PM", price: 1800, status: "pending" },
      { id: "bk504", customer: "Siddharth Nair", service: "NEET Biology Human Physiology", staff: "Prof. Anjali Rao", date: "2026-09-04", time: "05:00 PM", price: 2800, status: "confirmed" },
    ],
    products: [
      { id: "p501", name: "JEE Advanced Physics Formula Book", sku: "BP-BK-001", category: "Books & Material", price: 850, cost: 280, stock: 40, minStock: 10, type: "product", description: "Comprehensive physics formula handbook." },
      { id: "p502", name: "NEET Biology 10-Yr Solved Question Bank", sku: "BP-BK-002", category: "Books & Material", price: 650, cost: 210, stock: 55, minStock: 10, type: "product", description: "Topicwise solved NEET past papers." },
      { id: "p503", name: "Class 12 JEE Advanced 1-Year Course", sku: "BP-CRS-001", category: "Courses", price: 45000, cost: 8000, stock: 999, minStock: 0, type: "service", description: "Complete Class 12 Physics, Chem & Math." },
      { id: "p504", name: "NEET Biology Sprint 6-Month Course", sku: "BP-CRS-002", category: "Courses", price: 32000, cost: 6000, stock: 999, minStock: 0, type: "service", description: "Intensive biology test prep batch." },
    ],
    invoices: [
      { id: "in501", number: "EDU-2026-310", customer: "Pritesh Shah", items: [{ description: "JEE Advanced Full Year Term 2 Fee", quantity: 1, unitPrice: 25000, amount: 25000 }], subtotal: 25000, tax: 0, discount: 1000, total: 24000, due: "2026-09-10", date: "2026-09-01", status: "pending", notes: "Scholarship discount applied." },
      { id: "in502", number: "EDU-2026-309", customer: "Kavya Joshi", items: [{ description: "Class 10 Foundation Course Fee", quantity: 1, unitPrice: 12500, amount: 12500 }], subtotal: 12500, tax: 0, discount: 0, total: 12500, due: "2026-08-30", date: "2026-08-25", status: "paid", notes: "Paid via Net Banking." },
      { id: "in503", number: "EDU-2026-308", customer: "Siddharth Nair", items: [{ description: "NEET Biology Crash Course", quantity: 1, unitPrice: 16000, amount: 16000 }], subtotal: 16000, tax: 0, discount: 1000, total: 15000, due: "2026-08-20", date: "2026-08-15", status: "paid", notes: "Paid via Cheque." },
    ],
    quotations: [
      { id: "q501", number: "QT-EDU-001", customer: "Riya Patel", items: [{ description: "Two-Year Integrated Science Combo Package", quantity: 1, unitPrice: 78000, amount: 78000 }], total: 78000, validityDate: "2026-09-15", date: "2026-09-02", status: "sent" },
      { id: "q502", number: "QT-EDU-002", customer: "Harsh Varma", items: [{ description: "All-India Test Series + Doubt Pack", quantity: 1, unitPrice: 14000, amount: 14000 }], total: 14000, validityDate: "2026-09-20", date: "2026-08-30", status: "accepted" },
    ],
    expenses: [
      { id: "e501", category: "Rent", amount: 55000, date: "2026-09-01", description: "Academy building & classroom September rent", paymentMethod: "Bank Transfer" },
      { id: "e502", category: "Printing & Materials", amount: 14500, date: "2026-08-28", description: "Study modules, mock papers & workbooks printing", paymentMethod: "Card" },
      { id: "e503", category: "Salary", amount: 82000, date: "2026-08-31", description: "Faculty & teaching assistant monthly payroll", paymentMethod: "Bank Transfer" },
      { id: "e504", category: "Utilities", amount: 7500, date: "2026-08-25", description: "High-speed Wi-Fi & classroom projector power", paymentMethod: "UPI" },
    ],
    staff: [
      { id: "st501", name: "Prof. Suresh Iyer", role: "Senior Physics Faculty", phone: "+91 98984 11223", email: "suresh@brightpath.edu", rating: 4.9, bookingsCompleted: 340, revenue: 420000, workingHours: "08:00 AM - 04:00 PM", status: "active" },
      { id: "st502", name: "Prof. Anjali Rao", role: "Chemistry & NEET Specialist", phone: "+91 98984 33445", email: "anjali@brightpath.edu", rating: 4.9, bookingsCompleted: 290, revenue: 380000, workingHours: "09:00 AM - 05:00 PM", status: "active" },
      { id: "st503", name: "Prof. Harsh Vardhan", role: "Mathematics & JEE Lead", phone: "+91 98984 55667", email: "harsh@brightpath.edu", rating: 4.8, bookingsCompleted: 260, revenue: 350000, workingHours: "10:00 AM - 06:00 PM", status: "active" },
    ],
    reviews: [
      { id: "r501", customer: "Pritesh Shah", rating: 5, comment: "Prof. Suresh Iyer makes tough physics concepts so easy to grasp. Scored 98% in mock tests!", service: "Class 12 Physics", date: "2026-09-04", reply: "Proud of your dedication Pritesh!" },
      { id: "r502", customer: "Kavya Joshi", rating: 5, comment: "BrightPath's test series and doubt resolution sessions helped me top my school pre-boards.", service: "Class 10 Foundation", date: "2026-08-30" },
    ],
    topServicesChart: [
      { name: "JEE 1-Yr Course", value: 210000 },
      { name: "NEET Bio Sprint", value: 145000 },
      { name: "Class 10 Course", value: 85000 },
      { name: "Class 12 Physics", value: 62000 },
      { name: "Test Series Pack", value: 38000 },
    ]
  }
};

export function getDemoDataForBusiness(businessId: string): DemoDataset {
  return demoDataByBusinessId[businessId] || demoDataByBusinessId["b1"];
}

export const initialCustomers = demoDataByBusinessId["b1"].customers;
export const initialBookings = demoDataByBusinessId["b1"].bookings;
export const initialProducts = demoDataByBusinessId["b1"].products;
export const initialInvoices = demoDataByBusinessId["b1"].invoices;
export const initialQuotations = demoDataByBusinessId["b1"].quotations;
export const initialExpenses = demoDataByBusinessId["b1"].expenses;
export const initialStaff = demoDataByBusinessId["b1"].staff;
export const initialReviews = demoDataByBusinessId["b1"].reviews;
export const topServicesChart = demoDataByBusinessId["b1"].topServicesChart;

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
