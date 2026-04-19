# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on http://localhost:3000
npm run build      # Production build (runs ESLint + TS check)
npm run start      # Serve production build
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```

No test runner is configured — the MVP plan explicitly defers automated tests. Verify changes by running `npm run build` (catches TS + ESLint) and walking through the flow in the browser.

## Architecture

**Single-user, frontend-only Next.js 14 App Router app.** No backend, no auth, no API routes. All state lives in Zustand and persists to `localStorage` under key `career-values-v1`.

### The flow is linear and gated

6 routes form a strict sequence: `/` → `/instructions` → `/sort` → `/rank` → `/choices` → `/results`. Later routes guard themselves: `/rank` redirects to `/sort` if Always ≠ 8 cards; `/choices` redirects to `/rank` if `rankedTop8.length !== 8`; `/results` redirects to `/choices` if the matrix is incomplete. Guards run inside `useEffect` after `useHydrated()` returns true — **never gate on store state before hydration**, you'll cause redirect loops on reload.

### State shape (`store/useCardSortStore.ts`)

One Zustand store holds the entire app state, wrapped in `persist` middleware:

- `cardBuckets: Record<cardId, BucketId>` — every card starts in `"unsorted"`; 5 other buckets are `always | often | sometimes | seldom | never`.
- `rankedTop8: string[]` — ordered card IDs. Populated via `syncRankedFromAlways()` when leaving `/sort`.
- `choices: Choice[]` — 2–5 user-defined options.
- `matrix: Record<cardId, Record<choiceId, SupportValue>>` — sparse; cells start `undefined`. `SupportValue = 3 | 2 | 1 | -1 | "unknown"`.

Actions return `{ ok, error? }` for validated mutations (`assignCard`, `addChoice`). The UI shows errors via `sonner` toasts.

**Always bucket cap (8 cards)** is enforced inside `assignCard` — don't duplicate that check in UI code.

### Hydration pattern

`persist` middleware + SSR means components that render persisted state must wait for hydration. The pattern throughout the codebase:

```tsx
const hydrated = useHydrated();  // from hooks/useHydrated.ts
if (!hydrated) return <LoadingFallback />;
```

The landing page (`/`) and instructions page don't need this — they render no persisted state.

### Bilingual display (EN + VI simultaneously)

There is **no language toggle** by design. Every card shows: `en` (bold) + `vi` (muted subtitle) + `shortDescription` (Vietnamese blurb). The `ValueCard` component in `components/shared/` is the single source of truth for card rendering — reuse it everywhere (sort, rank, results).

Card data schema (`data/careerValueCards.ts`): `{ id, order, en, vi, shortDescription, descriptionEn }` — 54 entries.

### Desktop vs mobile interaction

**Sort page** uses dual input modes simultaneously (not a mode toggle):
- Desktop: `@dnd-kit/core` with `DndContext` in `SortPageClient`. Cards are `useDraggable`, buckets are `useDroppable`. `DragOverlay` renders the floating preview.
- Mobile: tapping a card opens `AssignSheet` (a Radix `Dialog`) with 5 bucket buttons.

Both paths call the same `assignCard(cardId, bucket)` action. The `PointerSensor` has `activationConstraint: { distance: 6 }` so taps don't trigger drags.

**Rank page** uses `@dnd-kit/sortable` for desktop drag handles plus up/down arrow buttons visible only on mobile (`sm:hidden`).

### Scoring (`lib/scoring.ts`)

`computeChoiceStats(matrix, choiceId, rankedTop8)` returns `{ totalScore, unknownCount, supportCount, conflictCount }`. Key rule: **`"unknown"` is excluded from `totalScore`** (counted separately). Weighted-by-rank scoring is intentionally deferred to phase 2.

`isMatrixComplete()` gates the `/results` transition. A complete matrix needs: `rankedTop8.length === 8`, `choices.length >= 2`, and every `matrix[cardId][choiceId]` defined.

### UI primitives

`components/ui/` contains hand-written shadcn-style primitives (Button, Card, Dialog, Select, Accordion, Progress, Input, Label). They follow standard shadcn patterns and depend on `@radix-ui/*` + `class-variance-authority` + `tailwind-merge`. If you add new UI primitives, stick to this pattern — do NOT introduce a different component library.

### Print CSS

`globals.css` has a `@media print` block that hides anything with `no-print`. `ProgressHeader`, `StickyFooterActions`, and `ResultActions` all include `no-print` so browser print (Cmd/Ctrl+P) produces a clean summary. There is no PDF export — `window.print()` is intentional.

## Path conventions

Import alias `@/*` maps to the project root (not `src/`). Example: `import { useCardSortStore } from "@/store/useCardSortStore"`.

Folders:
- `app/` — route files only (`page.tsx`, `layout.tsx`). Page files are thin wrappers around client components in `components/`.
- `components/<page>/` — page-specific components (e.g. `sort/`, `choices/`).
- `components/shared/` — reused across pages (`ValueCard`, `ProgressHeader`, `StickyFooterActions`, `ResetDialog`).
- `lib/` — pure functions (scoring, insights, validations, clipboard).
- `hooks/` — `useHydrated`, `useIsMobile`, `useRouteGuard`.

## Known constraints

- ESLint rule `react/no-unescaped-entities` is disabled (`.eslintrc.json`) so Vietnamese/English text with inline quotes doesn't block builds.
- `package.json` name is `knowdell-card-sorts` (lowercase) because the folder `KnowDellCardSorts` violates npm naming. Don't try to rebuild via `create-next-app .`.
