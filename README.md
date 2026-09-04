# ⚡ BizFlow — All-in-One Business Management Platform

> **BizFlow** is a premium, full-stack business operating system tailored for service-based businesses, salons, studios, clinics, and freelancers. It combines a high-conversion public marketing storefront, an intuitive customer portal, real-time analytics, inventory tracking, role-based access control (RBAC), and integrated customer messaging via WhatsApp and Nodemailer Email SMTP.

---

## 🌟 Overview & Key Architecture

BizFlow connects business operations and customer interactions into a unified platform:

- **Frontend Client**: Built with **Vite, React 18, TypeScript, Tailwind CSS, and Recharts**, styled with a custom dark-luxury aesthetic.
- **Backend API Server**: Powered by **Node.js, Express.js, TypeScript, and Mongoose ORM**, connected to **MongoDB Atlas**.
- **Automated SMTP & Messaging**: Integrated **Nodemailer Gmail SMTP** for instant inquiry notifications, invoice delivery, and campaign broadcasts, alongside direct **WhatsApp click-to-chat** integration.
- **Security & Authorization**: **JWT Token Authentication** coupled with strict **Role-Based Access Control (RBAC)** for `Owner`, `Manager`, and `Staff` roles.

---

## 🚀 Complete Feature Modules

### 🌐 1. Public Marketing Landing Page & Storefront
- **Dynamic Storefront**: Public business profiles (`/business/:slug`) showcasing services, business hours, client reviews, and direct booking triggers.
- **Interactive Contact Section**: Contact form connected to `POST /api/contact/inquiry` which dispatches real-time email notifications directly to `arpitanathwani2195@gmail.com`.
- **Demo Mode**: Interactive demo picker (`/demo`) pre-loaded with sample business datasets for instant evaluation.

### 👤 2. Customer Portal (`/portal`)
- **Dark Luxury View**: High-contrast, elegant portal interface designed for business clients.
- **Self-Service Dashboard**: Allows customers to track upcoming bookings, view loyalty point balances, inspect past invoices, and review service history.

### 🛡️ 3. Authentication & Role-Based Access Control (RBAC)
- **Multi-Role Security**:
  - `Owner`: Full unrestricted administrative access to revenue, staff management, settings, and business analytics.
  - `Manager`: Access to daily operations, bookings, customer directory, products, and invoices.
  - `Staff`: Scoped operational view restricted from sensitive financials and system configurations.
- **Onboarding Wizard**: 9-step business setup flow configuring logo, business category, operating hours, and tax settings.

### 📊 4. Core Management Dashboard (`/app`)

| Module | Features & Functionality |
| :--- | :--- |
| **Dashboard Overview** | Live KPI cards (Revenue, Bookings, Customers, Expenses), interactive revenue vs. expense charts, upcoming schedule feed, low-stock warnings, and quick action shortcuts. |
| **Customer CRM** | Comprehensive customer directory, lifetime value metrics, visit frequency, appointment logs, and one-click campaign broadcasts. |
| **Bookings & Appointments** | Status board (Pending, Confirmed, Completed, Cancelled), service duration tracking, staff assignment, and calendar scheduling. |
| **Products & Inventory** | Stock quantity tracking, SKU identifiers, low-stock threshold alerts, category filters, and reorder notices. |
| **Invoicing & Billing** | Itemized invoice creation, automatic subtotal/tax calculations, PDF invoice preview modal, and multi-channel dispatch (**Email & WhatsApp**). |
| **Quotations & Estimates** | Estimate creation, client status tracking, and one-click conversion of accepted quotes into active invoices. |
| **Expense Tracking** | Categorized expense logging (Salaries, Rent, Utilities, Supplies) with P&L breakdown visualization. |
| **Analytics & Reports** | Revenue trend charts, top-performing services leaderboard, staff commission metrics, and customer acquisition insights. |
| **Staff & Team** | Team profiles, assigned roles, performance tracking, schedule management, and contact details. |
| **Loyalty & Rewards** | Automated point calculation based on customer spend, tier rewards (Silver, Gold, Platinum), and point redemption management. |
| **Customer Reviews** | Customer feedback feed, average rating score calculation, and public review toggle. |
| **BizFlow AI Assistant** | Intelligent natural language chat assistant providing on-demand business metrics (revenue analysis, low stock items, top customers). |
| **Business Settings** | Profile management, custom business URL slug, operating hours editor, tax rates, and email notification controls. |

---

## 📲 Direct Customer Messaging (Email & WhatsApp)

- **WhatsApp Billing Integration**: Instantly send invoice summaries and appointment details directly to customer WhatsApp numbers (`+91 9099314955`) via formatted `wa.me` links.
- **Automated Nodemailer SMTP**:
  - **Inquiry Alerts**: Direct notification emails sent to `arpitanathwani2195@gmail.com` when a visitor submits the contact form.
  - **Invoice Delivery**: Professional HTML invoice billing emails sent directly to customers.
  - **Promotional Broadcasts**: Mass campaign offer dispatches to targeted customer segments (`VIP Customers`, `Inactive 60+ Days`).

---

## 🎨 Brand Design System

BizFlow utilizes a curated **Clean SaaS** color palette:

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| **Deep Navy** | `#0F172A` | Sidebar Shell, Primary Headers, Main Dark Backgrounds |
| **Electric Blue** | `#3B82F6` | Primary Action Buttons, Active Highlights, Key Icons |
| **Slate Grey** | `#64748B` | Subtitles, Muted Text, Borders, Chart Gridlines |
| **Cyan Accent** | `#22D3EE` | Active Sidebar Highlight, Pulsing Badges, Accent Lines |
| **Near White** | `#F8FAFC` | App Canvas Background, Clean Card Fill, Modal Shells |

*Typography*: **Inter** (Clean Modern Sans-Serif Body & Headings).

---

## 📁 Repository Directory Structure

```
bizflow/
├── client/                      # Frontend Vite + React Application
│   ├── public/                  # Static assets & SVG icons
│   ├── src/
│   │   ├── assets/              # Branding images & graphics
│   │   ├── components/
│   │   │   ├── auth/            # RBAC Guards & Protected Routes
│   │   │   └── ui/              # Reusable UI Primitives (Modals, Headers, Inputs)
│   │   ├── context/             # AppContext (Global State & Auth Provider)
│   │   ├── data/                # Centralized mock and fallback datasets
│   │   ├── layouts/             # AppLayout (Sidebar & Topbar Navigation)
│   │   └── pages/
│   │       ├── admin/           # Super-admin views
│   │       ├── app/             # Authenticated Dashboard pages
│   │       ├── auth/            # Login, Register & Onboarding Wizard
│   │       ├── customer/        # Customer Self-Service Portal
│   │       └── marketing/       # Landing Page & Public Storefronts
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── server/                      # Backend Express.js API Server
│   ├── src/
│   │   ├── models/              # Mongoose MongoDB Data Schemas
│   │   └── server.ts            # REST API Routes & Nodemailer SMTP Controller
│   ├── .env.example             # Template for Environment Secrets
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore                   # Version control rules
├── package.json                 # Workspace root scripts (Concurrently runner)
└── README.md                    # Project Documentation
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: Atlas Cluster URI or Local MongoDB instance

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Arpita2195/BizFlow.git
cd BizFlow

# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### 2. Run Application Locally
Run the concurrent dev server (starts both Frontend on port `5173` and Backend on port `5000`):

```bash
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)

---

## 🔌 API Endpoint Reference

| HTTP Method | Endpoint Path | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new business & owner account | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| `POST` | `/api/contact/inquiry` | Process visitor contact inquiry & send email | Public |
| `GET` | `/api/public/:slug` | Fetch public business storefront data | Public |
| `GET` | `/api/customers` | Retrieve business customer CRM directory | Authenticated |
| `POST` | `/api/customers` | Add new customer record | Authenticated |
| `GET` | `/api/bookings` | Fetch business bookings & appointments | Authenticated |
| `POST` | `/api/bookings` | Schedule new booking appointment | Authenticated |
| `GET` | `/api/invoices` | List invoices and billing records | Authenticated |
| `POST` | `/api/invoices` | Create new invoice entry | Authenticated |
| `POST` | `/api/messaging/send-invoice` | Dispatch invoice to customer via Email/WhatsApp | Authenticated |
| `POST` | `/api/messaging/broadcast-offer` | Broadcast promotional offer campaign | Authenticated |
| `POST` | `/api/ai/query` | Query BizFlow AI assistant for business insights | Authenticated |

---

## 📞 Support & Owner Contact

- **Owner**: Arpita Nathwani
- **Support Email**: [arpitanathwani2195@gmail.com](mailto:arpitanathwani2195@gmail.com)
- **Phone / WhatsApp**: [+91 90993 14955](https://wa.me/919099314955)
- **Repository**: [github.com/Arpita2195/BizFlow](https://github.com/Arpita2195/BizFlow)

---

*© 2026 BizFlow. Built for ambitious business owners.*
