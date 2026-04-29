<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-structure -->

## Project Structure

This project uses a **feature-based structure** with clear separation of concerns.

```
src/
├── app/                    # Next.js App Router (routes only)
│   ├── (auth)/             # Route groups for auth pages
│   │   ├── signin/
│   │   └── signup/
│   ├── (main)/             # Route groups for main app pages
│   │   ├── favorites/
│   │   ├── shows/
│   │   │   └── [id]/
│   │   └── watchlist/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/             # Shared UI components
│   ├── ui/                 # Primitive components (button, input, card)
│   │   ├── index.ts
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── layout/             # Layout components (Navbar, Footer, Sidebar)
│   │   ├── index.ts
│   │   └── navbar.tsx
│   └── shows/              # Show-related components (ShowCard, ShowList)
│       ├── index.ts
│       └── show-card.tsx
│
├── features/               # Feature-based modules (colocated)
│   ├── auth/
│   │   ├── hooks/          # Auth-related hooks (useSession, useSignIn, useSignOut, etc.)
│   │   ├── api.ts          # Auth-specific API calls
│   │   └── types.ts        # Auth-specific types
│   ├── shows/
│   │   ├── hooks/          # Show-related hooks (useShows, useShow, useTrendingShows, etc.)
│   │   ├── api.ts          # Show-specific API calls
│   │   └── types.ts        # Show-specific types
│   ├── favorites/
│   │   ├── hooks/          # Favorites hooks
│   │   └── types.ts
│   └── watchlist/
│       ├── hooks/          # Watchlist hooks
│       └── types.ts
│
├── lib/                    # Shared utilities
│   ├── api.ts              # Global API client configuration
│   └── utils.ts            # Shared utility functions
│
├── hooks/                  # Only truly global hooks
│
├── store/                  # Global state (when needed)
│
├── types/                  # Global types only
│   └── index.ts
│
└── styles/
    └── globals.css
```

### Rules

1. **Routes in `app/`** - Only route files (page.tsx, layout.tsx, loading.tsx, etc.) go in `app/`
2. **Route groups** - Use `(auth)/` and `(main)/` groups for organizing auth and main app routes
3. **Feature colocation** - Components, hooks, API calls, and types specific to a feature stay within `features/{feature}/`
4. **Shared components in `components/`** - Only truly reusable components (layout, ui primitives, shows)
5. **Barrel exports** - Use `index.ts` files for clean imports (e.g., `from "@/components/layout"`)
6. **Import path conventions**:
   - UI primitives: `@/components/ui/{component}` or `@/components/ui`
   - Layout components: `@/components/layout`
   - Show components: `@/components/shows`
   - Feature hooks: `@/features/{feature}/hooks`
   - Types: `@/types`

### Anti-patterns to Avoid

- ❌ `import { ShowCard } from "@/features/shows/components"` (wrong path)
- ❌ `import { Navbar } from "@/components/navbar"` (wrong path)
- ❌ Creating feature components outside of `features/` folder
- ❌ Mixing feature-specific components in flat `components/` directory

### Correct Import Patterns

- ✅ `import { Navbar } from "@/components/layout"`
- ✅ `import { ShowCard } from "@/components/shows"`
- ✅ `import { Button } from "@/components/ui/button"`
- ✅ `import { useShows } from "@/features/shows/hooks"`
- ✅ `import { useSignIn } from "@/features/auth/hooks"`

<!-- END:project-structure -->

<!-- BEGIN:commit-messages -->

## Commit Messages

Use the following format for commit messages:

```
<type>: <title>

- <modification 1>
- <modification 2>
- <modification 3>
```

### Types

- `feat` — new feature
- `fix` — bug fix
- `refactor` — code restructuring without behavior change
- `docs` — documentation changes
- `chore` — maintenance tasks (deps, configs)

### Examples

```
feat: add user profile page

- Create profile page with user info display
- Add edit button for profile settings
- Integrate with user API endpoint
```

```
fix: correct show search pagination

- Fix offset calculation in search query
- Update pagination UI to show correct page numbers
```

<!-- END:commit-messages -->
