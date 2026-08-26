# MCP delta spec — Modular Compliance remote connector

**Date:** 2026-08-26  
**Do not regenerate Spark MCP.**  
**Do not submit** `compliance-service/mcp/index.js` (static FAQ; overclaims).  
**Do not build in this change.** This is the bar when Marc chooses Track A.

## Live API (PROVEN 2026-08-26)

- Host: `https://app.modularcompliance.com` (`api.modularcompliance.com` does not resolve).
- Public OpenAPI: `GET /api/docs` → OpenAPI 3.0.3, 14 paths.
- Auth: `Authorization: Bearer mc_live_…` or `X-API-Key` (Professional / Enterprise). Starter has no API.
- `GET /api/v1/*` agent-discovery routes exist in `routes/agentDiscovery.js` but live returned **401 Unauthorized**. Do not wrap that file: it still lists “AI-powered gap analysis”, “Policy generation”, and SSO on Professional (SSO is Enterprise on the marketing site).

### Read-only tools (v1 connector)

Map 1:1 to documented GET paths. Every tool: `title`, `readOnlyHint: true`, `destructiveHint: false`, name ≤64 chars.

| Tool | Title | Live path |
|------|-------|-----------|
| `list_frameworks` | List compliance frameworks | `GET /api/frameworks` |
| `get_framework` | Get one framework | `GET /api/frameworks/{id}` |
| `list_obligations` | List obligations | `GET /api/obligations` |
| `list_controls` | List controls | `GET /api/controls` |
| `list_tasks` | List tasks | `GET /api/tasks` |
| `get_task` | Get one task | `GET /api/tasks/{id}` |
| `list_documents` | List evidence documents | `GET /api/documents` |
| `get_document` | Get document metadata | `GET /api/documents/{id}` |
| `get_compliance_summary` | Compliance summary report | `GET /api/reports/compliance-summary` |

Do not add a fake `list_overdue_tasks` until the tasks list (or query param) is proven to filter overdue. Client-side filter on `list_tasks` is fine.

### Write tools (later)

`create_task` / `update_task` only after read tools work. `destructiveHint: true` on PUT/DELETE. Do not expose `DELETE /api/frameworks/{id}` in v1.

## Directory vs custom connector

Anthropic directory (Team/Enterprise org): Streamable HTTP + **OAuth 2.0**. API keys are not OAuth. That is the real build, not another FAQ server.

Until OAuth exists: paid Claude users can add a **custom connector** URL. Do not say “listed” or “verified by Anthropic”.

## Privacy

`pages/privacy.html` has no connector section yet. Draft only when a remote MCP will actually run: data collected = tenant register fields the user authorises; no Claude memory/chat history; retention = existing product retention; contact privacy@instilligent.com.

## Example prompts (for a later submission kit)

1. List the frameworks in my Modular Compliance register.  
2. Show tasks in the register and which are overdue, if the dates are there.  
3. What evidence documents are attached in this tenant?

Need a populated **test tenant** with sample NZ Privacy Act + HSWA tasks. Do not use production customer data.

## Transport

Replace `mcp/index.js`. New module in-repo (not a second product): Streamable HTTP, graceful JSON errors, token-frugal descriptions. Bind 127.0.0.1 in compose; public HTTPS only behind the existing app host when Marc is ready.
