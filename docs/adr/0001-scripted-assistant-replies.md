# Cat AI Assistant uses scripted replies, not a live LLM

This is a hackathon demo presented live to Caterpillar, so the Cat AI Assistant answers from a fixed table of scripted replies (one per Suggested Prompt plus a keyword-matched fallback) with a simulated typing delay. A live model would need an API key and a backend and could fail or say something off-brand on stage. Do not "upgrade" this to a real API call without revisiting this decision.

## Considered Options

- **Live Claude API** — rejected: needs secrets and a server route, adds latency and demo risk, and doesn't fit the build window.
