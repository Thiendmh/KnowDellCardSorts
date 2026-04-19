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

No test runner is configured. Verify changes by running `npm run build` (catches TS + ESLint) and walking through the flow in the browser.

## Architecture

**Single-user, frontend-only Next.js 14 App Router app.** No backend, no auth, no API routes. All state lives in Zustand and persists to `localStorage`.

Two independent card-sorting decks share the same layout shell, UI primitives, and i18n system:

| Deck | Cards | localStorage key | Routes |
|---|---|---|---|
| Career Values | 54 | `career-values-v1` | `/` → `/instructions` → `/sort` → `/rank` → `/choices` → `/results` |
| Motivated Skills | 51 | `motivated-skills-v1` | `/skills` → `/skills/enjoyment` → `/skills/proficiency` → `/skills/results` |

Each deck has its own Zustand store and `resetAll()` that clears **only its own** localStorage key — never the other deck's.

### State shapes

**Career Values** (`store/useCardSortStore.ts`):
- `cardBuckets: Record<cardId, BucketId>` — `"unsorted" | "always" | "often" | "sometimes" | "seldom" | "never"`
- `rankedTop8: string[]` — ordered card IDs; populated via `syncRankedFromAlways()` when leaving `/sort`
- `choices: Choice[]` — 2–5 user-defined labels
- `matrix: Record<cardId, Record<choiceId, SupportValue>>` — sparse; `SupportValue = 3 | 2 | 1 | -1 | "unknown"`
- `language: "en" | "vi"` — **global language toggle lives here**, shared across both decks

**Motivated Skills** (`store/useMotivatedSkillsStore.ts`):
- `enjoymentBuckets: Record<cardId, EnjoymentBucket>` — `EnjoymentLevel | "unsorted"`
- `proficiency: Record<cardId, ProficiencyLevel>` — sparse; `"expert" | "competent" | "learning"`

Actions return `{ ok, error? }` for validated mutations. The UI shows errors via `sonner` toasts. **Always bucket cap (8 cards)** is enforced inside `assignCard` — don't duplicate in UI code.

### Hydration pattern

`persist` middleware + SSR means every component that renders persisted state must wait:

```tsx
const hydrated = useHydrated();  // hooks/useHydrated.ts
if (!hydrated) return <LoadingFallback />;
```

Route guards also run **after** hydration inside `useEffect` — never gate on store state before hydration, it causes redirect loops on reload.

### Route guards

Each page checks prerequisites and redirects if unmet, always inside `useEffect` after `useHydrated()`:

- `/rank` → `/sort` if `always.length !== 8`
- `/choices` → `/rank` if `rankedTop8.length !== 8`
- `/results` → `/choices` if matrix incomplete
- `/skills/proficiency` → `/skills/enjoyment` if `canContinueFromEnjoyment().ok === false`
- `/skills/results` → `/skills/proficiency` if `isProficiencyComplete() === false`

### i18n

Language is stored in `useCardSortStore` (not URL/cookie). All components read it via:

```ts
const lang = useLanguage();   // i18n/useT.ts — reads from store
const t = useT();             // returns full Dict for current language
const dict = getDict(lang);   // i18n/index.ts — server-safe, no hooks
```

`Dict = typeof vi` — TypeScript infers the shape from `i18n/vi.ts`. Do **not** add `as const` to the vi/en objects; function values in the dict (e.g. `counter: (n) => \`${n} / 51\``) require mutable inference. Both `i18n/vi.ts` and `i18n/en.ts` must have identical structure. Adding a key to one requires adding it to the other.

Top-level i18n namespaces: `common`, `languageToggle`, `progress`, `buckets`, `bucketShort`, `support`, `landing`, `instructions`, `sort`, `rank`, `choices`, `results`, `reset`, `insights`, `clipboard`, `skills`. The `skills` namespace covers the full Motivated Skills deck.

### Bilingual display

There is **no language toggle that hides text** — both languages show simultaneously on cards. Every `Card` has `en`, `vi`, `shortDescription` (VI description), `descriptionEn`. Use `pickCardDesc(card, lang)` from `@/i18n` to select the right description length. `ValueCard` in `components/shared/` is the single source of truth for card rendering.

### Desktop vs mobile interaction

Sort pages (both decks) run dual input modes simultaneously:
- **Desktop:** `@dnd-kit/core` — `useDraggable`, `useDroppable`, `DragOverlay`
- **Mobile:** tapping a card opens a Radix `Dialog` sheet with bucket buttons

`PointerSensor` uses `activationConstraint: { distance: 6 }` so taps don't trigger drags.

**Rank page** uses `@dnd-kit/sortable` for drag handles + up/down arrow buttons (`sm:hidden`) for mobile.

### Motivated Skills classification

`classifySkill(enjoyment, proficiency): SkillGroup` in `lib/motivatedSkillsScoring.ts`:

| enjoyment | proficiency | group |
|---|---|---|
| `like` | any | `"neutral"` |
| `love` / `like-a-lot` | `expert` / `competent` | `"motivated"` |
| `love` / `like-a-lot` | `learning` | `"developmental"` |
| `dislike` / `hate` | `expert` / `competent` | `"burnout"` |
| `dislike` / `hate` | `learning` | `"irrelevant"` |

Results render in `SKILL_GROUPS_ORDERED = ["motivated","developmental","burnout","neutral","irrelevant"]` order. Enjoyment validation: each of 5 buckets needs ≥ `MIN_PER_ENJOYMENT_BUCKET` (3) cards. `canContinueFromEnjoyment()` returns typed error codes (`"UNSORTED_REMAINING"` or `"BUCKET_UNDERFILLED"`) for targeted toast messages.

### Scoring (Career Values, `lib/scoring.ts`)

`computeChoiceStats(matrix, choiceId, rankedTop8)` returns `{ totalScore, unknownCount, supportCount, conflictCount }`. Key rule: `"unknown"` is **excluded** from `totalScore`. `isMatrixComplete()` gates the `/results` transition.

### Shared components

**`ProgressHeader`** — props: `step` (2–6), `titleEn`, `titleVi`, `total? = 5`. `displayStep = step - 1`. Pass `total={3}` from Skills pages; Career Values pages omit it (default 5).

**`StickyFooterActions`** — props: `backHref`, `continueDisabled`, `onContinueClick`, `continueLabel?`, `hint?`. Sticky footer with safe-area padding, `no-print`.

**`ResetDialog`** — two modes:
- *Legacy* (no controlled props): trigger-based, uses Career Values i18n defaults
- *Controlled*: `open`, `onOpenChange`, `onConfirm`, plus optional `title?`, `body?`, `confirmLabel?` for deck-specific strings

**`HomeButton`** — fixed top-left, hidden on `/`, `no-print`. Uses `useHydrated()` for stable pre-hydration render.

### Deck registry

`data/decks.ts` holds all 4 Knowdell decks. `status: "available" | "coming-soon"` controls the landing page badge and CTA. Decks 3 and 4 are `"coming-soon"`.

### UI primitives

`components/ui/` contains shadcn-style primitives (`Button`, `Card`, `Dialog`, `Select`, `Accordion`, `Progress`, `Input`, `Label`). They depend on `@radix-ui/*` + `class-variance-authority` + `tailwind-merge`. Do not introduce a different component library.

### Print CSS

`globals.css` has a `@media print` block. Add `no-print` to anything that should be hidden on print. `ProgressHeader`, `StickyFooterActions`, `HomeButton`, `LanguageToggle`, and action buttons all carry `no-print`. No PDF export — `window.print()` is intentional.

## Path conventions

Import alias `@/*` maps to the project root (not `src/`).

- `app/` — route files only (`page.tsx`, `layout.tsx`). Thin wrappers around client components.
- `components/<page>/` — page-specific (`sort/`, `rank/`, `choices/`, `results/`, `skills/`, `landing/`).
- `components/shared/` — reused across pages.
- `lib/` — pure functions (scoring, insights, validations, clipboard).
- `hooks/` — `useHydrated`, `useIsMobile`, `useRouteGuard`.
- `store/` — one Zustand store per deck.
- `data/` — static card arrays and deck registry.
- `types/` — `index.ts` (Career Values), `motivatedSkills.ts` (Motivated Skills).
- `i18n/` — `vi.ts`, `en.ts`, `index.ts` (getDict, pickCardDesc), `useT.ts` (useT, useLanguage).

## Known constraints

- ESLint rule `react/no-unescaped-entities` is disabled (`.eslintrc.json`) so Vietnamese/English text with inline quotes doesn't block builds.
- `package.json` name is `knowdell-card-sorts` (lowercase). Don't try to rebuild via `create-next-app .`.
