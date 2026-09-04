# BizFlow — Frontend

Premium all-in-one small business management platform. This package is the **complete frontend** (Phase 1 of the build): landing page, auth flow, onboarding wizard, and the full dashboard app, running on realistic demo data.

## What's included

- Landing page (hero, features, how it works, business types, analytics preview, testimonials, pricing, FAQ)
- Auth: Login, Register, Onboarding wizard (9 steps)
- Demo picker (`/demo`) — explore the dashboard pre-loaded with a sample salon business
- Public business booking page (`/business/:slug`)
- Full authenticated app at `/app`:
  - Dashboard (stats, revenue chart, schedule, low-stock alerts, pending payments)
  - Customers (CRM list + search)
  - Bookings (status board)
  - Products & Inventory
  - Invoices
  - Quotations
  - Expenses (with category breakdown chart)
  - Analytics (revenue/expense/profit trends, top services, top staff)
  - Staff
  - Reviews & Feedback
  - Loyalty Program
  - BizFlow Assistant (AI chat UI with mock, on-device answers from demo data)
  - Settings (profile, hours, invoicing, notifications, public website)
- Responsive: desktop sidebar, mobile drawer nav, tables collapse to cards on mobile
- Design system: Button, Card, Badge, StatCard, EmptyState, Input, Select, Avatar, Skeleton — all built on the exact brand palette

## Brand palette (as specified)

| Token | Hex | Usage |
|---|---|---|
| Warm Ivory | `#F4EFE6` | Background |
| Charcoal Black | `#1A1512` | Sidebar, dark text |
| Espresso Brown | `#3D2B1F` | Primary buttons, headers |
| Antique Gold | `#C9A24B` | Accents, highlights |
| Bronze | `#8C7A5B` | Secondary text, borders |

Typography: **Fraunces** (display serif) for headings, **Inter** for body text.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

## What's mock vs real

Everything here is a **fully functional frontend** — every button, form, and nav link works, and all data is realistic demo data (`src/data/demoData.ts`) representing "Glow Studio," a salon business. There is **no backend yet**: nothing persists, and login/onboarding forms simply navigate you into the dashboard rather than hitting an API.

## Next phases (not yet built)

Per the original spec, phases 2 onward are a separate backend build:
- Express + MongoDB + Mongoose API (`/api/auth`, `/api/customers`, `/api/bookings`, etc.)
- JWT auth with refresh tokens + RBAC middleware
- Real data persistence, multi-business support, PDF invoice generation
- Payment gateway integration architecture

Happy to build those next, phase by phase, so each layer can be tested against a real database before the next is layered on.

## Project structure

```
src/
  components/ui/     Reusable UI primitives (Button, Card, Badge, etc.)
  layouts/            AppLayout (sidebar + topbar shell)
  pages/
    marketing/         Landing, Demo picker, Public business page, 404
    auth/               Login, Register, Onboarding
    app/                Dashboard, Customers, Bookings, Products, Invoices, etc.
  data/               Central demo data (demoData.ts)
```
