# Agent Squad ⚡

## The Roster

| Name | Role | Model | Use Case |
|------|------|-------|----------|
| **Blink** | Commander | `anthropic/claude-opus-4-6` | Orchestration, architecture, strategy, main brain |
| **Spark** | Coder | `anthropic/claude-sonnet-4-6` | Fast coding, building features, refactoring |
| **Volt** | Reasoner | `xai/grok-4-1-fast` | Deep reasoning, complex problem solving, research |
| **Pixel** | Creative | `anthropic/claude-sonnet-4-6` | UI/UX, visualizer, design, content creation |
| **Scout** | Researcher | `xai/grok-4-1-fast` | Web research, competitive analysis, data gathering |
| **Echo** | Reviewer | `anthropic/claude-haiku-4-5` | Code review, triage, lightweight tasks, monitoring |
| **Cipher** | Data/Code | `xai/grok-code-fast-1` | Code-heavy tasks, algorithms, data processing |
| **Atlas** | Long Context | `nvidia/moonshotai/kimi-k2.5` | Large codebases, long documents, bulk analysis |

## Principles

1. **Right model for the job** — don't burn Opus tokens on Haiku tasks
2. **Solo or team** — agents can work alone or coordinate
3. **Named identities** — each agent has a personality in the visualizer
4. **Fail gracefully** — if one agent fails, others pick up the slack

## Visualizer Avatars

Each agent gets an 8-bit pixel avatar in the retro office:
- Blink: Commander chair, center terminal, lightning bolt motif
- Spark: Dual monitors, code streaming
- Volt: Holographic display, thinking pose
- Pixel: Drawing tablet, color palette
- Scout: Multiple browser windows, binoculars
- Echo: Clipboard, checkmarks flying
- Cipher: Matrix-style terminal, data streams
- Atlas: Massive wide monitor, documents stacked
