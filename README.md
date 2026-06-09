# CineVerse AI

A production-ready, premium, full-stack movie discovery platform built with Next.js 15, TypeScript, TailwindCSS, Shadcn-style UI, Framer Motion, GSAP, Three.js, D3.js, React Query, Zustand, NextAuth, Prisma, PostgreSQL, TMDB, OMDB, and YouTube API architecture.

## What is implemented

- Next.js 15 App Router architecture
- Dark cinematic portfolio-grade UI
- Glassmorphism/neon design system
- Cinematic startup loader
- Framer Motion route transitions
- Three.js particle background
- GSAP scroll reveal sections
- D3 movie universe graph
- Advanced debounced search page
- AI mood search page with API route
- Movie battle feature and API route
- Movie details page with trailer, cast, stats, charts, streaming cards, similar movies
- Auth pages for login/register
- NextAuth with Google, GitHub, email, and credentials provider architecture
- Prisma schema covering users, movies, watchlists, favorites, reviews, ratings, collections, notifications, comparisons, preferences, search history, watch parties, release radar, and admin audit logs
- Protected dashboard routes
- Admin dashboard routes
- Production API route structure
- Dockerfile and docker-compose
- Vercel + Neon-ready environment setup

The UI works with mock fallback data when external API keys are not configured. Add API keys to enable live external integrations.

## Quick start

```bash
corepack enable
pnpm install
cp .env.example .env
pnpm prisma generate
pnpm dev
```

For local PostgreSQL:

```bash
docker compose up -d
pnpm prisma migrate dev
pnpm db:seed
```

## Environment variables

See `.env.example`.

Minimum for UI preview:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-strong-secret
DATABASE_URL="postgresql://cineverse:cineverse@localhost:5432/cineverse?schema=public"
DIRECT_URL="postgresql://cineverse:cineverse@localhost:5432/cineverse?schema=public"
```

External APIs:

```env
TMDB_API_KEY=
OMDB_API_KEY=
YOUTUBE_API_KEY=
```

OAuth:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Deployment: Vercel + Neon

1. Create a Neon PostgreSQL project.
2. Use the pooled Neon connection string for `DATABASE_URL`.
3. Use the direct Neon connection string for `DIRECT_URL`.
4. Add all required environment variables in Vercel.
5. Configure OAuth callback URLs:
   - `https://your-domain.com/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/github`
6. Run production migrations:

```bash
pnpm prisma migrate deploy
```

7. Deploy with build command:

```bash
pnpm prisma generate && pnpm build
```

## Production hardening

Apply `docs/database-hardening.sql` after the first migration to enable PostgreSQL trigram search and additional constraints.

## Architecture

CineVerse AI is a server-first modular monolith:

- `src/app` — routes, pages, layouts, API route handlers
- `src/components` — UI, motion, home, movie, search, dashboard, rare feature components
- `src/server` — auth, DB, external API clients, services, validators, security
- `src/stores` — Zustand UI state only
- `src/types` — shared application types
- `prisma` — schema and seed data

## Notes

This implementation intentionally keeps all external API secrets server-side. Client components call internal API routes only.
