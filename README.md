# Blink HQ ⚡

Mission control for Brandon's AI agent operation. A local-only dashboard that connects directly to a running OpenClaw gateway and shows you what's actually happening — real sessions, real sub-agents, real token usage, no fake data.

## What it is

A single Next.js app with four working pages and five placeholders for future features:

### Working Pages

| Page | Route | What it does |
|------|-------|--------------|
| Dashboard | `/` | Live session status, active sub-agents, recent transcript, system health |
| Visualizer | `/visualizer` | 8-bit top-down office — Blink at the desk, sub-agents appear/disappear in real time |
| Agents | `/agents` | Config panel for sub-agent templates (name, role, model, icon, color) |
| Logs | `/logs` | Scrollable session transcript from the live JSONL file |

### Placeholder Pages (Coming Soon)

| Page | Route | Planned Features |
|------|-------|------------------|
| Chat | `/chat` | Direct Blink chat interface, command runner |
| Memory | `/memory` | View/search/edit MEMORY.md + daily notes, semantic search |
| Tasks | `/tasks` | Agent task queue + cron job management |
| Docs | `/docs` | OpenClaw skills + API reference browser |
| Settings | `/settings` | Alerts, theme, database settings |

## Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styles**: Tailwind CSS + inline styles, pixel/retro aesthetic
- **Data**: OpenClaw gateway HTTP API (`/tools/invoke`) — polled every 5s
- **State**: `useState` + `setInterval` (no external state library)
- **Package manager**: pnpm

## Running it

```bash
pnpm dev        # http://localhost:3000
pnpm build      # production build check
pnpm start      # run the production build
```

Requires OpenClaw gateway to be running locally on port 18789.

## Project structure

```
app/
  page.tsx              # Dashboard — the main view
  layout.tsx            # Root layout wrapping all pages in the Sidebar
  globals.css           # CSS vars, pixel-text class, animations
  visualizer/page.tsx   # SVG office scene
  agents/page.tsx       # Agent template config UI
  logs/page.tsx         # Session transcript viewer
  api/
    openclaw/route.ts   # Proxies tool calls to OpenClaw /tools/invoke
    system/route.ts     # Real CPU/RAM stats from Node os module
    agents/route.ts     # GET/POST for data/agents.json
    logs/route.ts       # Reads session JSONL transcript from disk

components/
  Sidebar.tsx           # Collapsible nav (hover to expand), active route highlighted

data/
  agents.json           # Sub-agent template definitions (editable via /agents page)

.env.local              # Gateway URL + auth token (never committed)
```

## How the data flows

```
Browser (poll every 5s)
  → /api/openclaw
    → OpenClaw gateway POST /tools/invoke
      → sessions_list, subagents, session_status

Browser
  → /api/system
    → Node os module (CPU sample, memory, uptime, load)

Browser
  → /api/logs?path=...
    → reads JSONL transcript from disk
```

The gateway token lives in `.env.local` and never touches the frontend.

## Agent config

`data/agents.json` is a list of sub-agent templates Brandon uses when spawning agents. It's not connected to OpenClaw directly — it's a reference/planning layer. Editing and saving via the `/agents` UI writes back to this file via the `POST /api/agents` route.

## Environment variables

```
OPENCLAW_GATEWAY_URL=http://127.0.0.1:18789
OPENCLAW_GATEWAY_TOKEN=<your gateway token>
```

Copy `.env.local.example` (if it exists) or create `.env.local` manually. The gateway token is in `~/.openclaw/openclaw.json` under `gateway.auth.token`.

## Git

Tracked on GitHub. Deployments are local-only for now — no Railway or Vercel config.

## Notes

- `zoom: 1.3` is set on `html` in globals.css because the pixel aesthetic uses intentionally tiny font sizes (6–11px) — this bakes in the right scale at 100% browser zoom.
- The visualizer shows *real* sub-agents from OpenClaw, not a hardcoded roster. If no sub-agents are running, the workstations sit dark.
- Placeholder pages are intentionally left in the sidebar for UI consistency — they'll be built out as needed.
