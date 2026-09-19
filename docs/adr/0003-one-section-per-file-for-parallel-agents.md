# One homepage section per file, built in parallel after a shared foundation

The homepage is built by several agents at once, so each section (nav, hero, quick-access cards, industries, about, careers CTA, footer) and the Cat AI Assistant live in their own component file under `components/`, and each agent owns only its files. A single foundation change lands first — Next.js + Tailwind scaffold, design tokens, and a `page.tsx` that already imports every section as a stub — so no parallel agent needs to edit shared files like `page.tsx`, `layout.tsx`, `tailwind.config` or `package.json`.

## Consequences

- Agents that need a new dependency or a new shared token must say so in their PR instead of editing shared config, to avoid merge conflicts.
- The hero's "Ask anything" bar opens the assistant through a shared open/close store defined in the foundation, not by importing the assistant directly.
