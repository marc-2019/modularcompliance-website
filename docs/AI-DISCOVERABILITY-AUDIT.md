# Modular Compliance — AI Discoverability Audit

**Date:** 2026-09-01
**Scope:** `modularcompliance-website` (this repo), live `modularcompliance.com` + `app.modularcompliance.com`
**Brief:** AI Discoverability & SEO Implementation Prompt v2 (Marc, 2026-08-31)
**Author:** agent pass, Phase A + audit only. Phase B–E not yet built (see "Remaining gaps").

## 0. What v1 already got right (do not undo)

The repo history (`git log`) shows this site already went through a takedown-and-relaunch cycle
before this brief:

- `3ec6c1b` takedown of an over-claiming marketing site
- `527863f` relaunch as a truthful one-pager
- `8c47104` verified pricing section added
- `1a95f29` NZBN corrected to 9429041896853
- `e8e0c18` AI citation crawlers allowed + `SoftwareApplication` JSON-LD added
- `6294341` MCP delta spec documented (do-not-submit note preserved)

`llms.txt`, `robots.txt`, `modules.json`, and the homepage were already accurate, specific, and
consistent with the product-facts section of the brief before this pass started. This audit did
**not** rewrite any of that — it left voice and existing accurate claims alone per the brief's
"do not undo" instruction.

## 1. Current state (as found, 2026-09-01)

| Asset | State found | Verdict |
|---|---|---|
| Homepage (`index.html`) | Honest, specific, matches product-facts section exactly (register/workflow tool, template disclaimer, 9 modules, honest boundaries section, verified pricing) | Keep — only additive changes made (WebSite JSON-LD, footer links) |
| `llms.txt` | Accurate, matches homepage almost word-for-word, correct NZBN, correct out-of-scope list | Keep as-is |
| `modules.json` | Not re-audited this pass (out of scope of Phase A) | Follow-up |
| `robots.txt` | Dual policy already correct: citation/retrieval crawlers allowed (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Applebot`), training crawlers blocked (`ClaudeBot`, `GPTBot`, `Google-Extended`, etc.) | Keep as-is. Cloudflare AI Crawl Control dashboard alignment still needs a Marc click per `marketing-audits/modular-compliance-2026-08-26-geo-crawlers.md` — **not verified this pass** (would require Cloudflare dashboard access) |
| `sitemap.xml` | Only listed `/` and `/pages/privacy.html` | **Fixed** — now lists `/`, `/about`, `/privacy`, `/terms`, `/security`, `/contact` |
| `/about`, `/terms`, `/security`, `/contact` | Did not exist (redirected to `/` or missing entirely) | **Built** this pass (see §2) |
| `/privacy` | Existed only as `/pages/privacy.html` (301 redirect changed the visible URL) | **Fixed** — now a 200 rewrite so `/privacy` is the canonical, stable URL |
| Structured data | `Organization` + `SoftwareApplication` on homepage only, correctly scoped (no FAQ schema, no `aggregateRating`, no schema price to avoid drift) | **Added**: `WebSite` on homepage; `BreadcrumbList` on each new page. Did not add `FAQPage` anywhere (no visible FAQ yet) or `Product`/`Offer` schema (brief allows omitting to avoid price-drift risk, consistent with the existing DROPPED verdict in the 2026-08-26 audit) |
| www vs apex collision | Brief flagged this as a first-class risk (historical stale/expansive GRC story on www) | **Checked live, 2026-09-01: resolved.** `https://www.modularcompliance.com/` currently serves byte-identical content to the apex, with `canonical` already pointing to the apex. No stale content found. No redirect exists at the DNS/CF level (both hostnames resolve 200), which is a minor SEO-hygiene gap, not a brand-integrity risk. **A `www` → apex 301 redirect requires a Cloudflare dashboard change — that is in the brief's human-approval queue ("Any www.modularcompliance.com redirect or takedown"). Not applied.** |
| Email crawlability | Brief worried about Cloudflare Email Protection hiding `info@instilligent.com` | **Checked: not an issue.** `mailto:` links in `index.html` and the new pages are plain HTML, not rewritten by CF Email Obfuscation. |
| Smoke tests (`tests/smoke_site.test.mjs`) | 6 tests, all passing pre-change | **Extended to 10 tests** — added coverage for the new Phase A pages (existence, correct redirect wiring, NZBN present, no fabricated certification language, sitemap completeness). All 10 pass. |

## 2. Changes made this pass (Phase A only)

Built exactly the Phase A "foundation" set from the brief, reusing the existing design system
(`css/style.css` variables, nav/footer markup from `pages/privacy.html`) so voice and visual
consistency are unchanged:

1. **`/about`** (`pages/about.html`) — entity clarity: Instilligent Limited, NZBN 9429041896853,
   relationship to sibling Instilligent products (named once, no merged-offering framing), link
   back to the homepage's "what it doesn't do" section. No founder bio — no verified public
   founder detail existed in the repo to publish, so none was invented.
2. **`/contact`** (`pages/contact.html`) — `info@instilligent.com` / `privacy@instilligent.com`,
   app login/register links, NZBN. No fabricated phone number or street address.
3. **`/security`** (`pages/security.html`) — states only verifiable facts: HTTPS/HSTS in transit
   (confirmed live via `_headers`), RBAC, SSO at Enterprise tier, audit trail on completions,
   evidence-storage access control. Explicitly states Modular Compliance holds **no** ISO 27001 /
   SOC 2 / other certification today, and that a customer-built custom framework is not the same
   as Instilligent being certified. No pentest or audit claims (none exist).
4. **`/terms`** (`pages/terms.html`) — subscription terms matching live pricing, template
   disclaimer, acceptable use, IP, NZ Consumer Guarantees Act carve-out, NZ governing law. **This
   is a binding legal document — see "Needs human/legal review" below; it was drafted for
   consistency with the honest product facts, not reviewed by a solicitor.**
5. **`/privacy`** — no content change, but promoted from a 301-redirected `/pages/privacy.html`
   to a proper 200-rewritten canonical URL (`_redirects`, canonical tag, `og:url`, sitemap, and
   footer links across all pages updated to point at `/privacy` instead of `/pages/privacy.html`).
6. **`_redirects`** — added 200 rewrites for `/about`, `/terms`, `/security`, `/contact`,
   `/privacy` (previously `/privacy` was a 301, and the others didn't resolve to real content).
   `/pricing` and `/features` remain 301 → `/` per the brief ("can stay on home if the page is
   still one long scroll").
7. **`sitemap.xml`** — now lists all 6 live URLs with `lastmod` dates.
8. **Structured data** — `WebSite` schema added to the homepage; `BreadcrumbList` added to each
   new page (matches visible breadcrumb nav on those pages). Nothing added that doesn't match
   visible content.
9. **Footer links** — `index.html` and `pages/privacy.html` footers updated to link to `/about`,
   `/contact`, `/terms`, `/security` instead of the old mailto-only / privacy-only links.
10. **Smoke tests** — extended `tests/smoke_site.test.mjs` with 4 new tests covering the above.
    All 10 tests pass (`node --test tests/smoke_site.test.mjs`).

## 3. Verification performed

- `node --test tests/smoke_site.test.mjs` — **10/10 pass**.
- JSON-LD in every new/changed file parsed with `json.loads` — all valid.
- Grep sweep of every new page for forbidden language (`compliant with`, `free trial`, `SOC 2
  certif*`, `ISO 27001 certif*`, wrong NZBN) — **clean**.
- Live fetch of `https://www.modularcompliance.com/` and `https://modularcompliance.com/` —
  confirmed content parity (collision risk resolved, see §1).
- Did **not** run a production build (none exists — this is a static-file site with no build
  step) and did **not** push to git. Per repo convention
  (`marketing-audits/modular-compliance-2026-08-26-geo-crawlers.md`: "Git push / Cloudflare Pages
  deploy (four-eyes; waiting Marc ship)") and the house rule that pushes need four-eyes, **these
  changes are staged locally, not pushed**.
- Did **not** validate the new pages against Google Rich Results / schema.org validators (no
  network access to those specific tools from this pass) — recommended before/at deploy time as
  the brief itself requires ("Validate with Google Rich Results and schema.org after every
  deploy").

## 4. Remaining gaps (not built this pass)

- **Phase B** (`/compliance-register`, `/nz-compliance-software`, `/nz-privacy-act-compliance`,
  `/nz-health-and-safety-compliance`, `/nz-employment-compliance`, `/iso-9001-compliance`,
  `/compliance-software-for-small-business`) — not built. These need real, sourced copy (official
  legislation links, accurate feature mapping) at the quality bar the brief demands ("as long as
  the page is useful... do not ship 500-word shells"). Building all seven properly is a
  substantial content job in its own right — recommend doing in a following pass, one at a time,
  starting with `/compliance-register` (defines the core category) and
  `/nz-privacy-act-compliance` (strongest existing module).
- **Phase C** (industry pages: food, body corporate, maritime) — not built. Gate is real (modules
  exist), so these are unlocked whenever Phase B priority allows.
- **Phase D** (comparison pages) — not built. `/modular-compliance-vs-spreadsheets` and
  `/modular-compliance-vs-consultants` do not require Vanta/Drata naming, so they don't hit the
  approval queue and could be built next. `/best-compliance-software-nz` explicitly needs Marc's
  human approval before publish per the brief.
- **Phase E** (`/guides/`) — not built. Each guide requires sourcing from primary NZ legislation /
  regulator pages (legislation.govt.nz, privacy.org.nz, worksafe.govt.nz) — deliberately not
  fabricated in this pass.
- **`modules.json` audit** — not re-verified against the live app this pass.
- **Cloudflare AI Crawl Control dashboard state** — not verified (requires Marc's Cloudflare
  dashboard access, flagged as a Marc click in the prior 2026-08-26 audit and still open).
- **Google Rich Results / schema.org validation** — not run against the new pages.
- **Page-speed / Core Web Vitals / mobile audit** — not run this pass.

## 5. Priority next actions

1. Marc reviews and pushes this branch (four-eyes) so `/about`, `/privacy`, `/terms`, `/security`,
   `/contact` go live.
2. Get `/terms` past a solicitor before treating it as final/binding (see §6).
3. Confirm Cloudflare AI Crawl Control dashboard matches origin `robots.txt` policy (Marc click,
   both `modularcompliance.com` and `instilligent.com` zones).
4. Build `/compliance-register` and `/nz-privacy-act-compliance` (Phase B, highest-value pair).
5. Run the full AI-discoverability baseline (see `AI-DISCOVERABILITY-BASELINE.md` — partial this
   pass, needs the ChatGPT/Claude/Gemini legs run from Marc's logged-in Chrome).
6. Consider a `www` → apex 301 at the Cloudflare dashboard level for SEO hygiene (not urgent —
   content already matches; approval-queue item).
7. Audit `modules.json` against the live app for drift.

## 6. Needs human approval before going live (per brief §17, plus one addition)

- **`/terms`** — not explicitly in the brief's approval-queue list, but it is a binding contract.
  Recommend a solicitor's pass before relying on it, even though it was drafted to be internally
  consistent with the honest product facts and the NZ Consumer Guarantees Act.
- Everything else built this pass (`/about`, `/contact`, `/security`, `/privacy` URL change,
  `sitemap.xml`, `_redirects`, JSON-LD additions) stays within the brief's already-approved
  product facts and does not touch any item on the brief's explicit approval-queue list (no
  Vanta/Drata naming, no "best compliance software" page, no AU claims, no certification claims,
  no testimonials, no crawler-policy change, no `www` redirect, no "manages compliance for you"
  framing).

## 7. Technical risks

- `/terms` liability-limitation clause uses "12 months of fees paid" as the cap — a common SaaS
  pattern but not confirmed against Instilligent's actual insurance/risk position. Flag for legal
  review alongside the general ToS review.
- No build step / CI exists for this static site beyond `tests/smoke_site.test.mjs` — a manual
  `node --test` run is the only gate before deploy. Consider wiring the smoke test into a
  pre-push hook or Cloudflare Pages build command so a future edit can't silently break the
  citation/training crawler split or reintroduce a forbidden claim.
- `_redirects` rewrites (200) mean `/pages/about.html` etc. still resolve directly too (dual URLs
  for the same content). Not currently canonicalized against each other except via the
  `<link rel="canonical">` tag on each page, which does point at the clean `/about` etc. path —
  should be sufficient, but worth a Search Console check post-deploy to confirm Google indexes
  the clean path, not the `/pages/...` path.
