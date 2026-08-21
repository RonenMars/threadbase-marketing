# Agent tooling

Everything on this page is optional. None of it is needed to build, test, or contribute to Threadbase Marketing — it is the AI-assistant tooling this repo expects, declared in config so your agent can pick it up instead of you wiring it by hand.

## Claude Code

`.claude/settings.json` enables these plugins for anyone working in this repo:

| Plugin | Marketplace | What it adds |
|---|---|---|
| `vercel` | `claude-plugins-official` | Vercel deploys, logs, and environment variables |
| `frontend-design` | `claude-plugins-official` | UI implementation guidance |

Plugins from `claude-plugins-official` need no setup: Claude Code registers that marketplace itself on first interactive start, so they resolve on any machine.

Project skills committed under `.claude/skills/` load with no install at all.

## Codex

This repo declares no Codex MCP servers. If it grows one, it goes in a `.codex/config.toml` at the repo root under `[mcp_servers.<name>]`; Codex merges that file once the project is trusted.

Codex ignores `[marketplaces.*]` and `[plugins.*]` in a project-level `.codex/config.toml` — verified on `codex-cli 0.149.0` by declaring a marketplace in a trusted project's config and confirming `codex plugin marketplace list` never picked it up, while an `[mcp_servers.*]` entry in the same file was honored. Codex plugins are therefore a one-time global install. Each `marketplace add` is a no-op if you already have that marketplace:

```bash
codex plugin marketplace add anthropics/claude-plugins-official
codex plugin add vercel@claude-plugins-official
codex plugin add frontend-design@claude-plugins-official
```

## Other agents

Cursor, Copilot, and the rest read none of the files above — the formats are Claude Code's and Codex's own. This page is the whole handoff: the plugin table says what capability the repo expects, and any equivalent in your own tooling is fine.

## What gets registered, and by whom

Every plugin here comes from `claude-plugins-official`, the marketplace Anthropic curates and Claude Code registers on its own. This repo names no third-party marketplace, so trusting the folder registers nothing new.

