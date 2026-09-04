import mongoose, { Schema, Document } from "mongoose";

// --- User Schema ---
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "OWNER" | "MANAGER" | "STAFF" | "CUSTOMER" | "ADMIN";
  businessId?: mongoose.Types.ObjectId;
  avatarUrl?: string;
  phone?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["OWNER", "MANAGER", "STAFF", "CUSTOMER", "ADMIN"], default: "OWNER" },
  businessId: { type: Schema.Types.ObjectId, ref: "Business" },
  avatarUrl: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>("User", UserSchema);

// --- Business Schema ---
export interface IBusiness extends Document {
  name: string;
  slug: string;
  type: "salon" | "cafe" | "boutique" | "gym" | "photography" | "freelancer" | "coaching" | "repair" | "consultant" | "general";
  ownerName: string;
  tagline: string;
  logoInitial: string;
  location: string;
  phone: string;
  email: string;
  businessHours: string;
  currency: string;
  subscriptionTier: "FREE" | "STARTER" | "PROFESSIONAL" | "BUSINESS";
  accentColor?: string;
  createdAt: Date;
}

const BusinessSchema = new Schema<IBusiness>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  type: { type: String, required: true },
  ownerName: { type: String, required: true },
  tagline: String,
  logoInitial: String,
  location: String,
  phone: String,
  email: String,
  businessHours: { type: String, default: "09:00 AM - 08:00 PM" },
  currency: { type: String, default: "INR" },
  subscriptionTier: { type: String, enum: ["FREE", "STARTER", "PROFESSIONAL", "BUSINESS"], default: "PROFESSIONAL" },
  accentColor: { type: String, default: "#3B82F6" },
  createdAt: { type: Date, default: Date.now }
});

export const Business = mongoose.model<IBusiness>("Business", BusinessSchema);

// --- Customer Schema ---
export interface ICustomer extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  totalSpent: number;
  visits: number;
  lastVisit: string;
  status: "active" | "inactive";
  tags: string[];
  notes?: string;
  createdAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  totalSpent: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  lastVisit: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  tags: [String],
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

// --- Product/Service Schema ---
export interface IProduct extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  sku?: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  type: "product" | "service" | "package";
  description?: string;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  name: { type: String, required: true },
  sku: String,
  category: { type: String, default: "General" },
  price: { type: Number, required: true },
  cost: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 5 },
  type: { type: String, enum: ["product", "service", "package"], default: "product" },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model<IProduct>("Product", ProductSchema);

// --- Booking Schema ---
export interface IBooking extends Document {
  businessId: mongoose.Types.ObjectId;
  customerName: string;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no-show";
  notes?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  customerName: { type: String, required: true },
  serviceName: { type: String, required: true },
  staffName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled", "no-show"], default: "pending" },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

// --- Invoice Schema ---
export interface IInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface IInvoice extends Document {
  businessId: mongoose.Types.ObjectId;
  number: string;
  customerName: string;
  customerEmail?: string;
  items: IInvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  dueDate: string;
  status: "paid" | "pending" | "partial" | "overdue";
  notes?: string;
  createdAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  number: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: String,
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
    amount: Number
  }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, enum: ["paid", "pending", "partial", "overdue"], default: "pending" },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export const Invoice = mongoose.model<IInvoice>("Invoice", InvoiceSchema);

// --- Expense Schema ---
export interface IExpense extends Document {
  businessId: mongoose.Types.ObjectId;
  category: string;
  amount: number;
  date: string;
  description: string;
  paymentMethod?: string;
  createdAt: Date;
}

const ExpenseSchema = new Schema<IExpense>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  description: String,
  paymentMethod: { type: String, default: "UPI" },
  createdAt: { type: Date, default: Date.now }
});

export const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);

// --- Staff Schema ---
export interface IStaff extends Document {
  businessId: mongoose.Types.ObjectId;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  rating: number;
  bookingsCompleted: number;
  revenue: number;
  status: "active" | "inactive";
  createdAt: Date;
}

const StaffSchema = new Schema<IStaff>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: String,
  email: String,
  rating: { type: Number, default: 5.0 },
  bookingsCompleted: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now }
});

export const Staff = mongoose.model<IStaff>("Staff", StaffSchema);

// --- Review Schema ---
export interface IReview extends Document {
  businessId: mongoose.Types.ObjectId;
  customerName: string;
  rating: number;
  comment: string;
  serviceName?: string;
  reply?: string;
  date: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  customerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  serviceName: String,
  reply: String,
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Review = mongoose.model<IReview>("Review", ReviewSchema);

// --- AuditLog Schema ---
export interface IAuditLog extends Document {
  businessId: mongoose.Types.ObjectId;
  actorName: string;
  action: string;
  details: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
  actorName: { type: String, required: true },
  action: { type: String, required: true },
  details: String,
  createdAt: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
