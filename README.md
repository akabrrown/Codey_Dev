# Codey Dev — Client Request & Automated Quote Portal

Three-structure monorepo: public portal, admin dashboard, and API backend deployed independently.

## Structure

```
apps/
  public/   → Public-facing request form (codeydev.com)
  admin/    → Admin dashboard (admin.codeydev.com)
  api/      → Backend API (api.codeydev.com)
packages/
  db/       → Drizzle schema + Supabase client
  engine/   → Pricing engine (pure TS)
  validators/ → Zod schemas derived from DB types
  email/    → React Email templates
  config/   → Shared TS/ESLint/Tailwind configs
supabase/
  migrations/ → SQL migrations (up + down)
  seed.sql
```

## Local Setup (Windows/PowerShell)

```powershell
git clone <repository-url>
cd codey-dev-portal
pnpm install
copy .env.example .env.local   # inside each app directory
```

Fill in all variables from `.env.example` before running.

## Running Locally

```powershell
pnpm dev              # All 3 apps in parallel
pnpm dev:public       # Public portal only   → http://localhost:3000
pnpm dev:admin        # Admin dashboard only → http://localhost:3001
pnpm dev:api          # API only             → http://localhost:3002
```

## Database

```powershell
npx supabase db push   # Apply migrations to your Supabase project
```

Run seed.sql once from the Supabase SQL editor to populate services and pricing options.

## Environment Variables

See `.env.example` in each app directory. Never commit real values. Keep a private copy in a password manager.

## Deployment

Each app deploys to its own Vercel project connected to `main`. Vercel Preview Deployments are created per pull request automatically. See the Operational Workflow Guide for the full deployment routine.

## Accounts Required Before First Deploy

- Supabase project (database + auth)
- Cloudinary account (file uploads)
- Resend account + verified sending domain (email)
- Arcjet account (rate limiting)
- Upstash Redis database (Arcjet backing store)
- Vercel account (hosting — 3 projects)
