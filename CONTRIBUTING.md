# Contributing to OpsDeck

OpsDeck is a static content site — almost every feature is a typed data file plus a small renderer. Adding a command, an error, a glossary term, or a cross-cloud mapping is usually a one-file, no-new-component change. This doc explains where each type of content lives and the exact shape it expects.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, also runs the TypeScript check
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

Everything runs client-side — there is no backend, database, or API to configure.

## Adding a command to an existing cheatsheet

Cheatsheet data lives in `src/data/cheatsheets/<tool>.ts` (one file per tool: `docker.ts`, `kubernetes.ts`, `helm.ts`, etc.), typed as `CheatsheetData` from `src/data/types.ts`:

```ts
export interface CheatsheetCard {
  title: string;
  span: 1 | 2 | 3; // grid column span at the lg breakpoint
  blocks: CheatsheetBlock[];
}

export type CheatsheetBlock =
  | { type: "divider"; label: string }        // section header inside a card
  | { type: "row"; cmd: string; desc: string } // a single command + one-line explanation
  | { type: "code"; text: string }             // a multi-line snippet, comments auto-colored
  | { type: "note"; text: string };            // a callout box for caveats/context
```

To add a command, find (or add) a `divider` in the right card and append a `row` block near related commands:

```ts
{ type: "row", cmd: "docker builder prune", desc: "Remove unused build cache" },
```

Every `row` gets a deep-linkable anchor automatically (slugified from `cmd`, deduped on collision — see `src/lib/anchors.ts`), and is automatically included in the command palette and global search (`src/data/searchIndex.ts`) — no extra wiring needed.

## Adding a whole new tool cheat sheet

1. Create `src/data/cheatsheets/<slug>.ts` exporting a default `CheatsheetData`.
2. Add an entry to `tools` in `src/data/tools.ts` (`slug`, `name`, `icon`, `description`, `cmdCount`, `category`, `accentClass`). `category` must be one of the existing `ToolCategory` values.
3. Create `src/app/<slug>/page.tsx`:
   ```tsx
   import type { Metadata } from "next";
   import { CheatsheetPage } from "@/components/cheatsheet/CheatsheetPage";
   import data from "@/data/cheatsheets/<slug>";

   export const metadata: Metadata = { title: data.title, description: data.subtitle };
   export default function Page() {
     return <CheatsheetPage data={data} toolSlug="<slug>" />;
   }
   ```
4. Import and register the dataset in `DATASETS` inside `src/data/searchIndex.ts` (keyed by slug) so its commands show up in search/palette.
5. Add an entry to `src/data/paletteRoutes.ts` so the page itself is reachable from the command palette.

The home page, Quick Switch dropdown, and category filters all read from `tools`, so step 2 is what makes the new sheet show up everywhere else automatically.

## Adding an error to the Error Decoder

Edit `src/data/errors.ts`:

```ts
export interface ErrorEntry {
  id: string;                                          // unique, kebab-case
  tool: "Docker" | "Kubernetes" | "Terraform" | "Git";  // extend this union if adding a new tool
  title: string;                                        // short human-readable name
  match: string[];                                      // substrings/phrases to match against pasted error text
  cause: string;
  fix: string;
  relatedCommands?: string[];
}
```

`match` entries should be distinctive substrings of the actual error text (not full sentences) — the decoder does substring + stemmed-keyword matching, so overly generic phrases will over-match unrelated errors.

## Adding a cross-cloud task to the Rosetta Stone

Edit `src/data/rosetta.ts`:

```ts
export interface RosettaTask {
  id: string;
  category: string;   // groups rows under a heading; reuse an existing category where it fits
  task: string;        // plain-English description of what the commands do
  aws?: string;
  azure?: string;
  gcloud?: string;
  kubectl?: string;
  notes?: string;      // caveats, e.g. a required flag or regional default
}
```

Leave a provider's field out entirely if that provider has no direct equivalent — don't fill it with a placeholder.

## Adding a checklist or checklist item

Edit `src/data/checklists.ts` — each `Checklist` has an `id`, `title`, `icon`, `description`, and an `items: ChecklistItem[]` array of `{ id, text, rationale }`. Item `id`s must be unique **within their checklist** (they're used as localStorage keys for progress tracking).

## Adding a glossary term

Edit `src/data/glossary.ts` — append a `{ term, category, definition }` object. Reuse an existing `category` where the term fits; only introduce a new category for a genuinely new domain area.

## Adding a troubleshooting flowchart

Flowcharts live in `src/data/flowcharts/`, typed in `types.ts` as a graph of `QuestionNode`s (branching options) and `ResolutionNode`s (terminal cause/fix). Add a new file per flowchart and register it in `src/data/flowcharts/index.ts`'s `flowcharts` array.

## Code style

- TypeScript strict mode; explicit types on exported functions and data shapes.
- Tailwind utility classes read from the CSS custom properties in `src/app/globals.css` — never hardcode a hex color in a component.
- Every tool is client-side only — don't introduce a server dependency (API route, database) without discussing it first, since "nothing leaves your browser" is a core product promise.
- Run `npm run build` and `npm run lint` before opening a PR; both must pass clean.
