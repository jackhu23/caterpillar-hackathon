# Agent guide

Hackathon demo: a reimagined caterpillar.com homepage for Job Seekers and Curious Visitors, with a Cat AI Assistant side panel. Links may be dead; the page must look finished. Read `CONTEXT.md` (glossary) and `docs/adr/` before starting.

## Polish is the product

- **Use the `frontend-design` skill** (`.claude/skills/frontend-design/`) for every UI change. Read it before writing markup.
- Pull in libraries when they raise the finish: `motion` for the assistant panel and the hero load sequence, `lucide-react` for icons, `clsx` for class merging. Ask in your PR for anything new rather than editing `package.json` yourself (ADR 0003).
- Follow the layout and content of the planning mockup (nav, hero, "What are you looking for?", Industries We Power, About, Careers CTA, footer), but skip template chrome the skill flags: tracked ALL-CAPS eyebrows, `A · B · C` meta strings, `→` appended to button text, one-word color accents, identical soft-shadow cards, fade-up on every section.

## Design system

Subject: heavy iron, Cat yellow paint, steel, earth and jobsite signage. Spend boldness in one place, the hero headline and ask bar; everything else is quiet and disciplined.

| Token | Hex | Role |
|---|---|---|
| `cat-yellow` | `#FFCD11` | Primary actions, focus rings, the one bold surface per section |
| `iron` | `#000000` | Nav, hero, footer, display type. True black, not tinted |
| `steel` | `#5F6368` | Secondary text, hairlines on dark |
| `concrete` | `#E8E9EA` | Light section backgrounds |
| `paper` | `#FFFFFF` | Cards and assistant panel |
| `earth` | `#6B4F2E` | Rare secondary accent (industries, imagery overlays) |

- **Display:** Barlow Condensed (`font-display`), heavy weights, tight leading, set large like jobsite signage.
- **Body:** Barlow (`font-sans`), 16–18px, lines under 80 characters.
- **Shape:** 2px radius (machined edges), hard borders over shadows. The assistant panel is the only large-radius surface, matching parts.cat.com.
- **Layout:** left-aligned, full-bleed photography, 1280px content max width, generous vertical rhythm.
- **Motion:** one orchestrated hero load, plus motion that answers actions (panel open, card press). Always honor `prefers-reduced-motion`.
- **Images:** remote photos from `images.unsplash.com` through `next/image`, with descriptive alt text.

## File ownership (ADR 0003)

Each issue owns only its own files under `components/`. Don't edit `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `next.config.ts` or `package.json`; ask in your PR. The Hero opens the assistant only through `useAssistant()` from `lib/assistant-store.ts`.

## Commands

- `npm run dev`: local app at http://localhost:3000
- `npm test`: Vitest + Testing Library
