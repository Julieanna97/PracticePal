# PracticePal (Examensarbete)

PracticePal is a Next.js (App Router) web app for tracking music practice sessions, plans, and statistics.
It supports authentication (NextAuth) and Pro subscriptions via Stripe.

## Tech Stack
- Next.js (App Router)
- NextAuth (Credentials + Google + Facebook)
- MongoDB (local) / MongoDB Atlas (production)
- Stripe subscriptions + webhooks (Pro plan)

---

## 1) Requirements
- Node.js 18+ (recommended)
- npm
- MongoDB running locally **OR** MongoDB Atlas connection string

---

## 2) Install & Run Locally

### Clone and install
```bash
npm install
```
install the required library
```bash
npm install recharts
```
then start the app
```bash
npm run dev