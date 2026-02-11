# JustVideos.cloud

## Overview

JustVideos.cloud is a public-facing marketing website for a video production house and AI workflow studio based in India. The site serves as a lead generation platform offering:

- **Video production services** (brand, corporate, product, training, explainers, social/reels)
- **Generative AI services** (image/video generation, voice, script, dubbing, localization)
- **Agentic AI services** (voice agents, business workflows, AI websites, custom apps, automations)

The primary goal is to convert visitors into qualified leads via contact forms, call booking, and brief submissions. The site showcases enterprise clients (L&T, Tata Steel, ITC, Emami, etc.) and positions JustVideos as a combined production + AI engineering + workflow automation provider.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router) with pages for Home, Payment, Privacy, Terms, and a 404 page
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin) with CSS custom properties for theming. Uses shadcn/ui component library (new-york style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state; local React state for UI
- **Fonts**: Fraunces (serif, for headings) and Plus Jakarta Sans (sans-serif, for body) loaded from Google Fonts
- **Animations**: Framer Motion for page animations
- **Notable Component**: "Veera" — a browser-based voice assistant/chatbot component using Web Speech API (SpeechSynthesis) that guides visitors to the right service package

### Backend

- **Runtime**: Node.js with Express, written in TypeScript (transpiled via tsx in dev, esbuild for production)
- **API**: Single REST endpoint `POST /api/contact` that validates a contact brief (name, email, service, company, message) using Zod schemas and optionally sends an email via SMTP
- **Storage**: Currently uses an empty in-memory storage class (`MemStorage`). Drizzle ORM is configured with PostgreSQL dialect but the schema only contains a Zod validation schema (no database tables defined yet)
- **Email**: Nodemailer integration for sending contact form submissions. Falls back to console logging when SMTP credentials aren't configured
- **Dev Server**: Vite dev server runs as middleware in development mode with HMR support; in production, Express serves the static build output

### Build System

- **Development**: `tsx server/index.ts` runs the Express server which integrates Vite middleware for HMR
- **Production Build**: Custom `script/build.ts` that runs Vite build for the client and esbuild for the server, outputting to `dist/`. Server dependencies are selectively bundled vs externalized for faster cold starts
- **Database Migrations**: Drizzle Kit configured for PostgreSQL with `drizzle-kit push`

### Project Structure

```
client/           → React frontend (Vite root)
  src/
    components/   → UI components (shadcn/ui) and custom components (Veera)
    pages/        → Route-level page components
    hooks/        → Custom React hooks
    lib/          → Utilities (query client, cn helper)
    assets/       → Static assets (images)
server/           → Express backend
  index.ts        → Server entry point
  routes.ts       → API route registration
  static.ts       → Production static file serving
  vite.ts         → Vite dev middleware setup
  storage.ts      → Storage interface (currently empty)
shared/           → Shared code between client and server
  schema.ts       → Zod validation schemas
migrations/       → Drizzle database migrations
attached_assets/  → PRD and reference documents
```

### Key Design Decisions

1. **Monorepo structure with shared code**: The `shared/` directory contains Zod schemas used by both frontend validation and backend API validation, ensuring type safety across the stack.

2. **Minimal backend**: The server is intentionally lightweight — a single contact form endpoint. No authentication, no database tables, no user accounts. This is a marketing/lead-gen site, not a full application.

3. **PostgreSQL configured but not actively used**: Drizzle ORM and drizzle-kit are set up with PostgreSQL, but no tables are defined in the schema yet. The `DATABASE_URL` environment variable is needed for Drizzle config but the app can run without a database for its current functionality.

4. **shadcn/ui component library**: Components are copied into the project (not installed as a package) following the shadcn pattern. This gives full control over component styling and behavior. The components use Radix UI primitives underneath.

5. **Payment flow**: The payment page links to an external payment URL (`imjo.in` — Instamojo, an Indian payment gateway) rather than integrating payments directly.

## External Dependencies

### Required Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (required by Drizzle config, but not actively used by the running app)
- `SMTP_HOST` — SMTP server hostname (optional; contact form logs to console without it)
- `SMTP_PORT` — SMTP server port, defaults to 587 (optional)
- `SMTP_USER` — SMTP username (optional)
- `SMTP_PASS` — SMTP password (optional)

### Third-Party Services

- **Nodemailer / SMTP** — For sending contact form submissions via email
- **Instamojo** (`imjo.in`) — External payment gateway for call booking payments
- **Google Fonts** — Fraunces and Plus Jakarta Sans font loading
- **PostgreSQL** — Database (configured via Drizzle, provision when needed)

### Key NPM Dependencies

- **Frontend**: React, Wouter, TanStack React Query, Framer Motion, Radix UI (full suite), shadcn/ui components, Tailwind CSS v4, Embla Carousel, cmdk, react-day-picker, recharts, react-hook-form, vaul (drawer)
- **Backend**: Express, Nodemailer, Drizzle ORM, Zod, nanoid, connect-pg-simple, express-session
- **Build**: Vite, esbuild, tsx, drizzle-kit