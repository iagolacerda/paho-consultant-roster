# Project conventions

Single-app project (CRA/react-scripts), not a monorepo. Stack: React 19 + TypeScript strict, styled-components v6, react-hook-form v7 + zod v4, react-router-dom v7, hand-rolled Context-based i18n (`src/i18n`, no external i18n library).

## Global component structure (`src/components/**`)

Every component folder follows the same layout:

```
components/<Component>/
  styles/
    <Component>.ts    # all styled-components for this component
    index.ts           # barrel: export * from './<Component>';
  hooks/                # only when the component has its own non-trivial logic
    use<Component>.ts
    index.ts
  index.tsx             # JSX only — imports from ./styles and ./hooks, no styled.div here
```

Rules:
- `index.tsx` contains only JSX — no `styled.div`, no `keyframes`, no `css` helper.
- `styles/<Component>.ts` contains all styled-components for that component.
- `hooks/` is created only when needed — when the component manages non-trivial state or side-effects worth isolating (timers, click-outside, auth state). Don't create it for a simple `useState` inline in the JSX.
- Always import by folder path, never by internal file:

```ts
// correct
import { Wrap, Trigger } from './styles';

// wrong — leaks internal structure
import { Wrap, Trigger } from './styles/Select';
```

## Page structure (`src/pages/**`)

Each page with real business logic follows this structure — only create the folders that have content:

```
pages/<Page>/
  hooks/
    use<Page>.ts        # orchestrates data (contexts/services) + form wiring
    index.ts
  validators/
    schema.ts            # zod schema(s) for this page's form(s) + inferred types (z.infer)
    index.ts
  types/
    enums.ts              # UI-only state types, only if needed
    index.ts
  styles/
    <Page>.ts             # styled-components for the page
    index.ts
  components/              # page-specific subcomponents, if any
    index.ts
  index.tsx                 # composition/JSX only — no business logic, no styled-components
```

A simple page with no form and no subcomponents only needs `styles/` + `index.tsx`.

### `validators/`: what goes in

- Zod schemas that define the shape/validation of a form, and their inferred types.
- Nothing else — no business functions, no UI constants.
- Schemas used by a **single page** live in that page's own `validators/`. Schemas/data genuinely shared by more than one page live in `src/data/paho/` instead (see below) — don't duplicate.

### `types/` folder pattern

Every `types/` folder in the project — page-level or shared — splits by responsibility, never one file mixing everything:

```
types/
  enums.ts        # enums only
  interfaces.ts   # interfaces only
  types.ts         # type aliases only
  index.ts          # barrel
```

Create only the files that have content. Always import by folder path (`from './types'`), never the specific file, outside the folder itself.

## Components/hooks/utilities only become global when reused

A component, hook, or helper starts life inside the thing that needs it — a page's own `components/`/`hooks/`, or nested inside the one component that renders it (e.g. `UserMenu` lives inside `components/Navbar/UserMenu/` because only `Navbar` renders it). It only moves up to global `src/components/` (or `src/data/paho/`, `src/utils/`) the moment a **second**, independent place needs it too.

Don't front-load things into the global folders "in case" they get reused later — that's exactly the anti-pattern this project moved away from (e.g. `Carousel` used to sit in global `src/components/` despite only ever being used by `Home`; most of `components/FormFields/*` — `RadioOptionGroup`, `CheckboxField`, `ChipMultiSelect`, `SkillsPicker`, `LanguagesPicker`, `AssignmentRecordsField`, `FileUploadField`, `CvAssistUpload` — were global despite being used only by `ConsultantProfile`'s own sections; both were moved back down). Before adding something to a global folder, check: is there already a second real consumer, right now — not a hypothetical future one?

## Shared domain layer (`src/data/paho/`)

This app has no monorepo package split, so `src/data/paho/` is the single shared layer for anything used by more than one page: choice sets (`choiceSets.ts`), country flag lookups (`countryFlags.ts`), completeness scoring (`completeness.ts`), mock services (`mock*.ts`), and shared domain types (`types/`).

Rule of thumb for where new code goes:
- **Used by a single page** → that page's own `validators/`, `hooks/`, or `components/`.
- **Used by more than one page** → `src/data/paho/`.
- **Purely visual, reusable UI** → `src/components/`.

## Global utilities (`src/utils/`)

Pure, framework-agnostic helper functions reused across the app (date formatting, mock file download, etc.) live in `src/utils/`. `helpers/` does not exist in this project — do not create it; everything shared goes in `src/utils/` (UI-facing) or `src/data/paho/` (domain-facing).

## Import order

Imports are auto-sorted on save (VS Code `emeraldwalk.runonsave` → `scripts/sort-imports.js`) into labelled groups with no blank lines between them:

```
// React      → react, react-dom, react-router-dom, react-hook-form, @hookform
// Libs       → other external libraries (styled-components, zod, etc.)
// Components → deeper relative imports (../../components, ../../hooks, etc.)
// Local      → same-directory relative imports (./components, ../domain, etc.)
```

ESLint additionally enforces `import/order` and `import/no-duplicates` (warnings) as a backstop. `i18next/no-literal-string` warns on hardcoded JSX label/placeholder/title/subtitle/description strings — this project's i18n is hand-rolled (`useTranslation()` + `src/translations/{pt,en}.json`), so user-facing text should always go through `t(...)`.
