# Stocktake — Modular Compliance MCP vs Claude directory

**Date:** 2026-08-26  
**Path:** `/home/marc/projects/ModularCompliance/compliance-service/mcp/index.js`  
**Do not regenerate Spark MCP.**

## What exists

Express app with `GET /health`, `GET /.well-known/mcp`, and REST paths that return **hardcoded** Privacy Act 2020 text, a product feature list, and pricing. Tools are advertised with `readOnlyHint` only. No Streamable HTTP MCP transport. No OAuth 2.0. No calls into the live register API.

## Must not ship as a connector

File copy contradicts marketing-truths / live site:

- Starter price `amount: 0` (live: NZ$199/month + GST)
- “automated tracking”, “72-hour notification workflow”
- Native ISO 27001 / SOC 2 / NZISM / Health Information Privacy Code (not shipped as native templates)

Submitting this would fail Anthropic privacy/tool review **and** claim-audit.

## Directory bar (when Marc chooses Track A)

Remote MCP: HTTPS Streamable HTTP, OAuth 2.0, `title` + `readOnlyHint`/`destructiveHint` on every tool, names ≤64 chars, complete privacy policy covering connector data handling, populated test account, ≥3 prompts. Team or Enterprise Claude org required to submit.

Until then: users can paste a custom connector URL (paid Claude). Directory listing is distribution, not a prerequisite to function.

## Next (not this change)

Delta spec against the **live** GAP-001 API, read-oriented tools first (list frameworks, overdue tasks, evidence records). Rewrite or replace `mcp/index.js`; do not extend the FAQ stub.
