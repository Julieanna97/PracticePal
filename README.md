# Julie Anne Cantillep — Developer Portfolio

[![Build](https://img.shields.io/github/actions/workflow/status/Julieanna97/JulieAnne-Portfolio/ci.yml?branch=main&label=build&style=flat-square)](https://github.com/Julieanna97/JulieAnne-Portfolio/actions)
[![Coverage](https://img.shields.io/codecov/c/github/Julieanna97/JulieAnne-Portfolio?style=flat-square&label=coverage)](https://codecov.io/gh/Julieanna97/JulieAnne-Portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

Personal portfolio and developer showcase for **Julie Anne Cantillep** — fullstack developer based in Malmö, Sweden. Built with Next.js App Router, it features an interactive 3D skills globe, a timeline of work history, a live project showcase (including PracticePal, a full SaaS product), an AI-powered portfolio bot, and a contact form with email delivery via Resend or SMTP.

**Live:** https://julieannecantillep.vercel.app &nbsp;·&nbsp; **GitHub:** [@Julieanna97](https://github.com/Julieanna97) &nbsp;·&nbsp; **LinkedIn:** [julie-anne-cantillep](https://www.linkedin.com/in/julie-anne-cantillep-4ba4ab250/)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quickstart](#quickstart)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Contributing](#contributing)

---

## Features

- **Interactive 3D Skills Globe** — Three.js / React Three Fiber visualization of tech skills
- **Filterable Work Timeline** — Filter by work, product, AI, or education history
- **Project Showcase** — Featured projects with links, tags, and case studies
- **AI Portfolio Bot** — In-page chat assistant that answers questions about Julie's work
- **Contact Form** — Email delivery via Resend (with SMTP fallback)
- **PracticePal Demo** — Full SaaS app embedded: auth, session tracking, Stripe subscriptions
- **Recharts Analytics** — Practice session charts in the PracticePal dashboard

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| 3D / WebGL | Three.js, React Three Fiber, Drei |
| Database | MongoDB / Mongoose |
| Auth | NextAuth v4 (Credentials, Google, Facebook) |
| Payments | Stripe (subscriptions + webhooks) |
| Email | Resend API (SMTP fallback via Nodemailer) |
| Validation | Zod |
| Charts | Recharts |

---

## Quickstart

### Prerequisites

- **Node.js 18+**
- **npm**
- **MongoDB** — running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone and install

```bash
git clone https://github.com/Julieanna97/JulieAnne-Portfolio.git
cd JulieAnne-Portfolio
npm install
```

### 2. Configure environment

Copy the example env file and fill in your values (see [Environment Variables](#environment-variables)):

```bash
cp .env.example .env.local
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root. All variables marked **required** must be set for the app to function correctly.

```env
# ── Auth ──────────────────────────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3001          # required — full URL of your deployment
NEXTAUTH_SECRET=your-secret-here           # required — generate with: openssl rand -base64 32

# Optional OAuth providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# ── Database ──────────────────────────────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/practicepal   # required

# ── Stripe ────────────────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...              # required for payments
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...           # required for webhook verification
STRIPE_PRO_PRICE_ID=price_...             # your Stripe Pro plan price ID

# ── Email — Resend (primary) ──────────────────────────────────────────
RESEND_API_KEY=re_...                      # sign up at resend.com

# ── Email — SMTP (fallback) ───────────────────────────────────────────
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=your-smtp-password
SMTP_FROM=Portfolio Bot <noreply@example.com>

# ── Contact routing ───────────────────────────────────────────────────
PORTFOLIO_CONTACT_TO=your@email.com        # where contact form emails are sent
PORTFOLIO_CONTACT_FROM=Portfolio Bot <onboarding@resend.dev>
```

> **Tip:** If neither Resend nor SMTP is configured, the contact form will return an error message at runtime but the rest of the app continues to work.

---

## Project Structure

```
src/
├── app/
│   ├── PortfolioShowcase.tsx   # Main portfolio page (timeline, projects, bot, contact)
│   ├── SkillsGlobe.tsx         # Three.js 3D skills globe
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── api/                    # Next.js Route Handlers
│   │   ├── auth/               # NextAuth + register endpoint
│   │   ├── contact/            # Contact form email handler
│   │   ├── me/                 # Authenticated user info
│   │   ├── account/            # Account management
│   │   ├── plans/              # Practice plan CRUD
│   │   ├── sessions/           # Practice session CRUD
│   │   └── stripe/             # Checkout, portal, webhooks
│   │
│   ├── auth/                   # Login, register, forgot-password pages
│   ├── dashboard/              # PracticePal user dashboard
│   ├── account/                # Account settings page
│   └── legal/                  # Privacy policy & terms
│
public/
├── projects/practicepal/       # PracticePal screenshots & assets
└── *.png / *.jpg / *.svg       # Portfolio images
```

---

## API Reference

All API routes live under `/api`. Authentication is handled by NextAuth; protected routes require a valid session cookie.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `POST` | `/api/auth/register` | — | Register a new user |
| `GET/POST` | `/api/auth/[...nextauth]` | — | NextAuth session handlers |
| `POST` | `/api/contact` | — | Send a contact form email |
| `GET` | `/api/me` | ✅ | Get current user profile |
| `PUT` | `/api/account` | ✅ | Update account details |
| `GET/POST` | `/api/plans` | ✅ | List / create practice plans |
| `GET/PUT/DELETE` | `/api/plans/[id]` | ✅ | Read, update, delete a plan |
| `GET/POST` | `/api/sessions` | ✅ | List / log practice sessions |
| `DELETE` | `/api/sessions/[id]` | ✅ | Delete a session |
| `POST` | `/api/stripe/checkout-session` | ✅ | Create a Stripe checkout session |
| `POST` | `/api/stripe/sync-checkout-session` | ✅ | Sync subscription after checkout |
| `POST` | `/api/stripe/customer-portal` | ✅ | Open Stripe customer portal |
| `POST` | `/api/stripe/cancel-subscription` | ✅ | Cancel active subscription |
| `POST` | `/api/stripe/webhook` | — | Handle Stripe webhook events |

---

## Building for Production

```bash
npm run build
```

This runs `next build`, which compiles the app and performs type-checking. Fix any TypeScript or ESLint errors before deploying.

To run the production build locally:

```bash
npm run start
```

The production server starts on port `3001` by default (set in `package.json`). Override with the `PORT` environment variable.

---

## Testing

The project does not yet include a test suite. Contributions are welcome — see [Contributing](#contributing).

Suggested test setup:

```bash
# Unit + integration tests
npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest

# E2E tests
npm install --save-dev @playwright/test
```

Recommended coverage targets:

- API route handlers (`/api/**`)
- Auth flow (register, login, session)
- Stripe webhook handler
- Contact form validation

To add code coverage reporting, connect the repo to [Codecov](https://codecov.io) and update the coverage badge at the top of this file with your token.

---

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` in the Vercel project settings.
4. Deploy. Vercel automatically runs `npm run build` on each push to `main`.

### Stripe Webhooks in Production

After deploying, register a webhook endpoint in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks):

- **Endpoint URL:** `https://your-domain.com/api/stripe/webhook`
- **Events to listen for:**
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

### Self-hosted (Docker / VPS)

```bash
npm run build
NODE_ENV=production node .next/standalone/server.js
```

> Ensure `output: 'standalone'` is set in `next.config.ts` for standalone mode.

---

## Configuration

### next.config.ts

Minimal by default. Common additions:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },  // Google OAuth avatars
      { hostname: 'graph.facebook.com' },           // Facebook OAuth avatars
    ],
  },
  output: 'standalone',  // recommended for self-hosted Docker deployments
};
```

### ESLint

Configured in `eslint.config.mjs` using `eslint-config-next`. Run:

```bash
npm run lint
```

### Tailwind CSS

Version 4, configured via `postcss.config.mjs`. No `tailwind.config.js` is needed — Tailwind v4 scans source files automatically.

---

## Contributing

Issues and pull requests are welcome.

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Make your changes and run `npm run lint` and `npm run build` to check for errors
3. Open a pull request with a clear description of what changed and why

---

## License

[MIT](LICENSE) © Julie Anne Cantillep
