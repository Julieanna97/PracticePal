# PracticePal

PracticePal is a full-stack practice tracking app for musicians. It helps users plan weekly goals, log sessions, review progress, and manage account and billing flows from one place.

## Live Routes

- `/` - marketing landing page
- `/auth/login` - sign in with email, Google, or Facebook
- `/auth/register` - create an account
- `/dashboard` - main authenticated dashboard
- `/plans` - view and manage practice plans
- `/sessions/new` - log a practice session
- `/stats` - review progress charts
- `/account` - manage profile and billing

## What It Does

- Social and email/password authentication with NextAuth
- MongoDB-backed users, plans, and session records
- Stripe billing flows for upgrades and customer portal access
- Practice plan creation, editing, and deletion
- Session logging with progress tracking
- Stats views for session history and plan distribution
- Auth-protected routes using middleware

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB with Mongoose
- NextAuth.js
- Stripe
- Recharts

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file with the values your app needs. The key variables used by this project are:

```bash
MONGODB_URI=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRO_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
```

If you are testing locally, make sure `NEXTAUTH_URL` points to the port you are actually using, such as `http://localhost:3000`.

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint

## Portfolio Notes

If you are adding this to your portfolio website, the strongest highlights are:

- the authenticated dashboard experience
- the practice plan and session logging workflow
- the Stripe billing integration
- the polished landing page and account flow

You can also add a deployed app URL, screenshots, or a short case-study section above this README if you want to present it more like a portfolio project page.

## Project Structure

- `src/app` - routes, layouts, pages, and API handlers
- `src/components` - reusable UI and forms
- `src/lib` - auth, database, and Stripe helpers
- `src/models` - Mongoose models
- `src/middleware.ts` - route protection

## Notes

- Google and Facebook sign-in only work when their OAuth credentials are set in `.env.local`.
- The account page uses `SessionProvider`, so the app shell wraps the tree correctly.
- The landing page lives at `/`, while the authenticated dashboard stays at `/dashboard`.
