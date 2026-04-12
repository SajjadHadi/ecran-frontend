@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Écran is a TV show discovery and curation app. The frontend is a Next.js 16 (Turbopack) app with a cinematic landing page, show browsing, user watchlists, and favorites management.

## Commands

```bash
npm run dev    # Next.js dev server with Turbopack
npm run build  # Production build
npm start      # Production server
```

## Tech Stack

- **Framework**: Next.js 16 with App Router + Turbopack
- **Styling**: Tailwind CSS v4 with CSS custom properties (oklch color space)
- **State**: TanStack Query (React Query) for server state
- **Auth**: next-themes for dark/light mode, better-auth for session management
- **HTTP**: Axios via `src/lib/api.ts`

## Architecture

**Feature-based structure**:
```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Landing page (hero, stats, features, genre carousel, etc.)
    shows/                # Browse shows, show detail
    auth/                 # Sign in, sign up
    favorites/            # Favorites lists
    watchlist/            # Watchlist management
  components/
    ui/                   # Reusable UI components (button, card, input, accordion)
    navbar.tsx            # Top navigation with theme toggle
    theme-provider.tsx    # next-themes provider
    show-card.tsx         # Show poster card
  features/
    shows/hooks.ts       # useShows, useTrendingShows, useFeaturedShows, useGenres
    favorites/hooks.ts    # Favorites mutations
    watchlist/hooks.ts    # Watchlist mutations
    auth/hooks.ts         # useSession, useSignIn, useSignUp
  lib/api.ts              # Axios instance with base URL from NEXT_PUBLIC_API_URL
  types/index.ts           # TypeScript interfaces (Show, Episode, User, Session, etc.)
```

## Theming

Dark/light mode via CSS custom properties defined in `src/app/globals.css`:
- Dark theme: default (oklch dark values)
- Light theme: `.light` class overrides on `<html>`
- All colors use `--color-*` CSS variables so both themes are complete
- `forcedTheme="dark"` must NOT be set in ThemeProvider — it blocks theme switching

## Landing Page Sections

The landing page (`src/app/page.tsx`) is composed of these sections:
1. **HeroSection** — gradient mesh background, floating show posters, glassmorphism container, entrance animations
2. **StatsBar** — animated stat counters (shows tracked, users, etc.)
3. **LogoStrip** — streaming platform names
4. **FeaturesGrid** — 6 feature cards with icons
5. **HowItWorks** — 3-step walkthrough
6. **StaffPicks** — curated show cards
7. **GenreCarousel** — Netflix-style horizontal rows per genre with scroll buttons
8. **Testimonials** — 3 user quotes
9. **FAQSection** — collapsible accordion (uses Accordion UI component)
10. **NewsletterSection** — email capture form
11. **MobileAppCTA** — animated phone mockup with feature callouts

## Key Patterns

- All data-fetching hooks live in `src/features/{feature}/hooks.ts`
- Show cards use `ShowCard` component — do not duplicate card markup
- Landing page is a server component that imports `"use client"` sub-components
- Use CSS animations from `globals.css` for hero effects (`animate-float`, `animate-fade-in-up`, etc.)
- Genre carousel rows use `useShows(genre)` to fetch live data per genre

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000   # Backend URL (docker: http://backend:3000)
```

## Docker

```bash
docker compose -f docker-compose.yml up --build -d   # Build and start all containers
docker compose down                              # Stop containers
```

Frontend runs on port 3002 when using docker-compose.
