# Modular Compliance — AI Discoverability Content Map

**Living document.** Start here before creating any new URL on this site. Expand only with
intents discovered in Search Console or real sales questions — do not add speculative rows.

Status values: `live` (built + wired), `planned` (capability gate passes, not built),
`blocked` (capability gate fails today — do not build), `forbidden` (brief explicitly disallows).

## Phase A — foundation

| Page | Intent | Priority | Schema | Status |
|---|---|---|---|---|
| `/` | Product home / entity | Highest | Organization, SoftwareApplication, WebSite | live |
| `/about` | Who operates it (entity disambiguation) | High | BreadcrumbList | live (2026-09-01) |
| `/privacy` | Privacy policy | High | — | live (2026-09-01, promoted from redirect) |
| `/terms` | Terms of use / subscription terms | High | BreadcrumbList | live (2026-09-01) — **needs legal review** |
| `/security` | Factual security posture | High | BreadcrumbList | live (2026-09-01) |
| `/contact` | Contact / entity | High | BreadcrumbList | live (2026-09-01) |
| `/pricing` | Pricing | High | — | live (folded into `/#pricing`, per brief allowance) |

## Phase B — high-intent product pages

| Intent | Target page | Priority | Capability gate | Status |
|---|---|---|---|---|
| Compliance management system / register | `/compliance-register` | High | Real: register + tasks + evidence + audit trail | planned |
| NZ compliance software / register | `/nz-compliance-software` | High | Real: NZ-built register/workflow tool | planned |
| NZ Privacy Act software / register | `/nz-privacy-act-compliance` | High | Real: native Privacy Act 2020 module (13 IPPs, breach checklist) | planned |
| NZ H&S compliance record / software | `/nz-health-and-safety-compliance` | High | Real: native HSWA 2015 module | planned |
| NZ employment compliance record | `/nz-employment-compliance` | High | Real: native ERA 2000 module | planned |
| Compliance software for small business | `/compliance-software-for-small-business` | High | Real: Starter tier, 5 users / 2 frameworks | planned |
| ISO 9001 templates / register | `/iso-9001-compliance` | Medium | Real: native ISO 9001 module | planned |

## Phase C — industry pages (gated on a real seeded module)

| Intent | Target page | Gate | Status |
|---|---|---|---|
| Food safety compliance software | `/compliance-software-for-food-businesses` | Food Safety module exists | planned |
| Body corporate compliance software | `/compliance-software-for-body-corporates` | Body Corporate module exists | planned |
| Maritime compliance software NZ | `/maritime-compliance-software-nz` | Maritime module exists — must include one-sentence distinction from Mastering MOSS | planned |

## Phase D — comparison pages

| Intent | Target page | Frame | Status |
|---|---|---|---|
| Compliance software vs spreadsheets | `/modular-compliance-vs-spreadsheets` | Primary honest alternative | planned |
| Compliance software vs consultant | `/modular-compliance-vs-consultants` | Tool vs advisor, does not replace either | planned |
| Best compliance software NZ | `/best-compliance-software-nz` | Category explainer naming real limits | **blocked — requires Marc approval before publish (brief §17)** |
| Vanta alternative NZ | `/modular-compliance-vs-vanta` or similar | Different-category framing only, no "cheaper Vanta" | **blocked — default no; requires explicit Marc approval to even draft (brief §17)** |

## Phase E — knowledge hub

| Guide | Source requirement | Status |
|---|---|---|
| What is a compliance register / CMS? | General definitional, no legal citation needed | planned |
| NZ SME compliance checklist | legislation.govt.nz + regulator links | planned |
| NZ Privacy Act 2020 — obligations and evidence record | privacy.org.nz + legislation.govt.nz | planned |
| NZ HSWA 2015 — H&S task/incident record | worksafe.govt.nz + legislation.govt.nz | planned |
| Preparing evidence for an audit or review | General, no external claim needed | planned |
| Compliance software vs a compliance consultant | General, ties to Phase D comparison | planned |
| Building a custom framework in a register tool | Product-only, no external source needed | planned |

## Explicitly forbidden (do not build without a policy change)

| Intent | Why forbidden |
|---|---|
| `/iso-27001-compliance` as a product page | No native ISO 27001 pack — custom-framework only |
| `/soc-2-compliance` as a product page | No native SOC 2 pack — custom-framework only |
| `/compliance-software-for-saas` implying SOC 2 automation | Product doesn't do automated evidence collection |
| `/compliance-software-for-healthcare` | No health-specific pack exists |
| `/compliance-software-for-financial-services` | AML/CFT explicitly out of scope |
| `/compliance-software-australia` | No AU-specific packs exist yet; templates are NZ-legislation-first |
| Any `/alternatives-to-vanta` or `-drata` page | Default no; requires explicit Marc approval for a different-category framing only |

## Maintenance rule

Before adding a row: confirm the capability actually ships today (check `modules.json` / the live
app / `llms.txt`), not just that it would be nice to rank for. If the gate fails, the row goes in
"forbidden" or is left out entirely — it does not go in "planned" as an aspiration.
