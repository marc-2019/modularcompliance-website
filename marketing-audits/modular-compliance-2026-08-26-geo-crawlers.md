# Marketing audit — Modular Compliance GEO crawler + entity markup

**Date:** 2026-08-26  
**Surface:** `modularcompliance-website` (`robots.txt`, `index.html` JSON-LD, `sitemap.xml`)  
**Trigger:** AI discoverability playbook. Week-1 on-site items were treated as unverified; live check showed they mostly already exist. Real origin gap: citation vs training crawler split + SoftwareApplication JSON-LD.  
**Scorer:** `score_copy.py --product modular-compliance` on JSON-LD description draft.

## Claims

| Claim | Surface | Verdict | Evidence |
|-------|---------|---------|----------|
| People do the compliance work; the tool keeps the record | JSON-LD SoftwareApplication `description` | IMPLEMENTED | Same wording as existing Organization JSON-LD + `llms.txt` + homepage. positioning_v2 in `ModularCompliance/marketing-truths.json`. |
| Does not connect to operational systems, monitor transactions, screen activity, or take regulatory action | JSON-LD SoftwareApplication `description` | IMPLEMENTED | Copied from live `llms.txt` out-of-scope line. |
| Operator NZBN 9429041896853 | Organization + provider identifier | IMPLEMENTED | Footer / privacy / `llms.txt` already correct (audit 2026-08-21). |
| Starter NZ$199 / Professional NZ$499 in schema | JSON-LD Offer | DROPPED | Price stays in visible `#pricing` only. Avoids schema drift vs GST copy. |
| FAQPage schema | JSON-LD | DROPPED | No visible FAQ on the marketing homepage. FAQ schema without FAQ copy is a spam pattern. App `admin-ui` FAQ schema is behind login — not a public citation surface. |

## Crawl policy (origin)

- **Allow (citation/retrieval):** `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Applebot`.
- **Disallow (training):** `ClaudeBot`, `GPTBot`, `Google-Extended`, plus existing training list.
- **Change from prior origin file:** `ClaudeBot` was `Allow` (wrong class — Anthropic training crawler). Now `Disallow`. Search/user tokens added.

## Cloudflare EXTERNAL (origin cannot fix this)

Live `GET https://modularcompliance.com/robots.txt` (2026-08-26) prepends Cloudflare managed content that `Disallow: /` for `ClaudeBot`, `GPTBot`, `Google-Extended`. That prepend is consistent with training-block for `ClaudeBot`, but the dashboard may also **enforce** blocks. Citation crawlers are not in the origin file until this change, and Cloudflare will not add `Claude-SearchBot` for us.

**Marc click (both zones: modularcompliance.com and instilligent.com):**

1. Cloudflare dashboard → domain → **AI Crawl Control** (or Security → Bots).
2. Managed robots.txt / Bot Preference Sync: keep **training = block**.
3. Per-crawler: **Allow** `Claude-SearchBot`, `Claude-User`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`.
4. Keep **Block** `ClaudeBot`, `GPTBot`, `Google-Extended` (training).
5. Re-fetch `https://modularcompliance.com/robots.txt` and confirm origin `Allow` for `Claude-SearchBot` is still present after the prepend.

World-action skill does **not** cover AI Crawl Control (DNS-only allowlist). This stays a Marc dashboard click.

## MCP connector (do not submit)

`ModularCompliance/compliance-service/mcp/index.js` is a static Privacy Act FAQ over Express. It is **not** a Streamable-HTTP + OAuth 2.0 remote MCP against the live register. Hardcoded product copy in that file **overclaims** vs marketing-truths (Starter NZ$0, automated tracking, native ISO 27001 / SOC 2 / NZISM). Do not submit it to Anthropic’s directory. Spark MCP (`/home/marc/projects/spark-mcp`) is a different server — do not regenerate it.

## Not in this change

- G2 / Capterra / Reddit (off-site; Marc).
- Claude Team plan (money; Marc).
- Git push / Cloudflare Pages deploy (four-eyes; waiting Marc ship).
- FAQ content pages.

## Marc

Origin files ready to ship after push to the Pages production branch. Cloudflare crawl-control click is still required for the live robots response to match policy.
