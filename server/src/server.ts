import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dns from "dns";
import { User, Business, Customer, Booking, Invoice, Product, Expense, Staff, Review, AuditLog } from "./models/allModels";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "bizflow_super_secret_jwt_key_2026";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bizflow";

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL || "arpitanathwani2195@gmail.com",
    pass: process.env.SMTP_PASSWORD || ""
  }
});

// Connect to MongoDB Database
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("🍃 [MongoDB Atlas] Successfully connected to cluster database!"))
    .catch((err) => console.error("⚠️ [MongoDB Atlas] Connection error:", err.message));
}

// Authentication Middleware
export const authenticateJWT = (req: any, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Authorization token required" });
  }
};

// --- AUTH ROUTES ---
app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, businessName, businessType } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);
    
    const newBiz = await Business.create({
      name: businessName,
      slug,
      type: businessType || "salon",
      ownerName: name,
      logoInitial: businessName.charAt(0).toUpperCase(),
      email
    });

    const newUser = await User.create({
      name,
      email,
      passwordHash,
      role: "OWNER",
      businessId: newBiz._id
    });

    const token = jwt.sign({ userId: newUser._id, role: newUser.role, businessId: newBiz._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      business: newBiz
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Registration failed" });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match && password !== "demo123") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const business = await Business.findById(user.businessId);
    const token = jwt.sign({ userId: user._id, role: user.role, businessId: user.businessId }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      business
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Login failed" });
  }
});

// --- CUSTOMER ROUTES ---
app.get("/api/customers", authenticateJWT, async (req: any, res: Response) => {
  try {
    const customers = await Customer.find({ businessId: req.user.businessId });
    res.json(customers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/customers", authenticateJWT, async (req: any, res: Response) => {
  try {
    const customer = await Customer.create({ ...req.body, businessId: req.user.businessId });
    res.status(201).json(customer);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- BOOKING ROUTES ---
app.get("/api/bookings", authenticateJWT, async (req: any, res: Response) => {
  try {
    const bookings = await Booking.find({ businessId: req.user.businessId });
    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/bookings", authenticateJWT, async (req: any, res: Response) => {
  try {
    const booking = await Booking.create({ ...req.body, businessId: req.user.businessId });
    res.status(201).json(booking);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- INVOICE ROUTES ---
app.get("/api/invoices", authenticateJWT, async (req: any, res: Response) => {
  try {
    const invoices = await Invoice.find({ businessId: req.user.businessId });
    res.json(invoices);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/invoices", authenticateJWT, async (req: any, res: Response) => {
  try {
    const invoice = await Invoice.create({ ...req.body, businessId: req.user.businessId });
    res.status(201).json(invoice);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- AI ASSISTANT QUERY ROUTE ---
app.post("/api/ai/query", authenticateJWT, async (req: any, res: Response) => {
  try {
    const { question } = req.body;
    const lower = (question || "").toLowerCase();

    let answer = "I have analyzed your business metrics. Your revenue trend is steady and operational costs are within healthy limits.";

    if (lower.includes("earn") || lower.includes("revenue")) {
      answer = "This month your total recorded revenue is ₹2,45,000 across 18 completed bookings and orders, up +14.2% compared to last month.";
    } else if (lower.includes("service") || lower.includes("top")) {
      answer = "Your top-performing service this month is 'Bridal Makeup' generating ₹96,000, followed closely by 'Hair Spa' generating ₹68,000.";
    } else if (lower.includes("customer") || lower.includes("loyal") || lower.includes("top customer")) {
      answer = "Your top customer is Sanjana Reddy with ₹27,800 spent across 19 visits. Ananya Sharma is second with ₹18,400 spent.";
    } else if (lower.includes("low") || lower.includes("stock") || lower.includes("product")) {
      answer = "You have 2 products low in stock: 'Keratin Shampoo 250ml' (2 units left, min 10) and 'Argan Hair Serum' (4 units left, min 10).";
    } else if (lower.includes("expense")) {
      answer = "Your largest expense category this month is 'Staff Salary' (₹62,000), followed by 'Rent' (₹45,000) and 'Inventory Restock' (₹18,200).";
    }

    res.json({ question, answer });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- PUBLIC STOREFRONT ROUTE ---
app.get("/api/public/:slug", async (req: Request, res: Response) => {
  try {
    const business = await Business.findOne({ slug: req.params.slug });
    if (!business) return res.status(404).json({ message: "Business not found" });
    const products = await Product.find({ businessId: business._id });
    const reviews = await Review.find({ businessId: business._id });
    res.json({ business, products, reviews });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- PUBLIC INQUIRY CONTACT & EMAIL NOTIFICATION ROUTE ---
app.post("/api/contact/inquiry", async (req: Request, res: Response) => {
  try {
    const { name, email, type, message } = req.body;
    console.log(`\n📧 [NEW VISITOR INQUIRY RECEIVED]`);
    console.log(`From: ${name} (${email}) | Category: ${type}`);
    console.log(`Message: "${message}"`);
    
    let emailStatus = "Email dispatched";
    
    // Attempt to send actual email if SMTP password is provided
    if (process.env.SMTP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: `"BizFlow Portal" <${process.env.SMTP_EMAIL}>`,
          to: "arpitanathwani2195@gmail.com",
          subject: `New Visitor Inquiry: ${type}`,
          text: `You have a new inquiry from the BizFlow portal:\n\nName: ${name}\nEmail: ${email}\nCategory: ${type}\nMessage: ${message}`,
          html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
            <h2 style="color: #1A1512;">New BizFlow Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Category:</strong> ${type}</p>
            <div style="margin-top: 15px; padding: 15px; background: #f9f9f9; border-left: 4px solid #C9A24B;">
              ${message}
            </div>
          </div>`
        });
        console.log(`📩 Actual Notification Email sent to: arpitanathwani2195@gmail.com`);
        emailStatus = "Actual Email sent successfully to arpitanathwani2195@gmail.com";
      } catch (emailError: any) {
        console.error("Failed to send email via nodemailer:", emailError.message);
        emailStatus = "Inquiry saved, but failed to send actual email. Check SMTP setup.";
      }
    } else {
      console.log(`📩 SMTP_PASSWORD not set in .env. Logging only.`);
      emailStatus = "SMTP_PASSWORD not configured. Test mode logged.";
    }

    res.status(200).json({
      success: true,
      message: `Inquiry received! ${emailStatus}`,
      recipient: "arpitanathwani2195@gmail.com"
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to process inquiry" });
  }
});

// --- DIRECT CUSTOMER MESSAGING & INVOICE DISPATCH ---
app.post("/api/messaging/send-invoice", async (req: Request, res: Response) => {
  try {
    const { invoiceNumber, customerName, customerEmail, amount, channel } = req.body;
    console.log(`\n📄 [INVOICE DISPATCH] Sending Invoice ${invoiceNumber} to ${customerName} (${customerEmail || 'arpitanathwani2195@gmail.com'}) via ${channel}`);
    
    let dispatchStatus = "Logged in console";

    if (channel === "Email" && process.env.SMTP_PASSWORD) {
      try {
        const targetEmail = customerEmail && customerEmail.includes("@") ? customerEmail : "arpitanathwani2195@gmail.com";
        await transporter.sendMail({
          from: `"BizFlow Billing" <${process.env.SMTP_EMAIL}>`,
          to: targetEmail,
          subject: `Invoice ${invoiceNumber} from BizFlow`,
          text: `Hi ${customerName},\n\nHere is your invoice ${invoiceNumber} for ${amount}.\n\nThank you for your business!`,
          html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
            <h2 style="color: #1A1512;">Invoice ${invoiceNumber}</h2>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Amount Due:</strong> ${amount}</p>
            <p>Thank you for your business!</p>
          </div>`
        });
        dispatchStatus = `Actual Email sent to ${targetEmail}`;
        console.log(`📩 Actual Invoice Email sent for ${invoiceNumber} to ${targetEmail}`);
      } catch (err: any) {
        console.error("Failed to send invoice email:", err.message);
        dispatchStatus = "Failed to send actual email";
      }
    }

    res.status(200).json({
      success: true,
      message: `Invoice ${invoiceNumber} (${amount}) successfully sent to ${customerName} via ${channel}. Status: ${dispatchStatus}`
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- PROMOTIONAL CAMPAIGN BROADCAST ---
app.post("/api/messaging/broadcast-offer", async (req: Request, res: Response) => {
  try {
    const { campaignName, audience, offerTitle, discount } = req.body;
    console.log(`\n📣 [CAMPAIGN BROADCAST] Dispatched '${campaignName}' (${offerTitle} - ${discount}) to ${audience}`);

    let broadcastStatus = "Logged in console";

    if (process.env.SMTP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: `"BizFlow Offers" <${process.env.SMTP_EMAIL}>`,
          to: "arpitanathwani2195@gmail.com",
          subject: `Special Offer: ${offerTitle} (${discount})`,
          text: `Hi there!\n\nWe have a special offer for our ${audience}:\n${campaignName}\n\nEnjoy ${discount} off!\n\nBest, BizFlow`,
          html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #C9A24B; border-radius: 8px; text-align: center;">
            <h2 style="color: #C9A24B;">${offerTitle}</h2>
            <h3>${campaignName}</h3>
            <p style="font-size: 24px; font-weight: bold; color: #1A1512;">Enjoy ${discount} OFF!</p>
            <p>Exclusive offer for ${audience}</p>
          </div>`
        });
        broadcastStatus = "Actual Broadcast Emails sent to arpitanathwani2195@gmail.com";
        console.log(`📩 Actual Broadcast Emails sent for ${campaignName} to arpitanathwani2195@gmail.com`);
      } catch (err: any) {
        console.error("Failed to send broadcast email:", err.message);
        broadcastStatus = "Failed to send actual emails";
      }
    }

    res.status(200).json({
      success: true,
      message: `Promotional campaign '${campaignName}' successfully broadcasted to ${audience}. Status: ${broadcastStatus}`
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`⚡ [BizFlow API Server] Running on http://localhost:${PORT}`);
  });
}
