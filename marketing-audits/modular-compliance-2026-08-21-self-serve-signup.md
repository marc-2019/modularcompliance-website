# Marketing audit — Modular Compliance self-serve signup on .com

**Date:** 2026-08-21  
**Surface:** `modularcompliance-website` (`index.html`, `llms.txt`, `pages/privacy.html`)  
**Trigger:** Marc directed the public site to stop being enquiry-only and to expose live login/register.  
**Scorer:** `score_copy.py --product modular-compliance` on draft CTAs → quality **8/10**, consistency **10/10**, ship=yes.

## Scope of this change

Add **Register** and **Log in** links that point at the live app. Do **not** claim a free trial, card checkout, or “compliant with” on the marketing site.

## Claims

| Claim | Surface | Verdict | Evidence |
|-------|---------|---------|----------|
| Register CTA opens the live app register page | nav, hero, pricing Starter/Pro, footer | IMPLEMENTED | Live `GET https://app.modularcompliance.com/register` HTTP 200 (SPA). Register form in `ModularCompliance/admin-ui/src/pages/auth/MaterialRegister.tsx`. API `POST /api/auth/register` on production returns validation JSON (`All fields are required: email, password, name, and company name`) — endpoint is live. |
| Log in CTA opens the live app login page | nav, hero, footer | IMPLEMENTED | Live `GET https://app.modularcompliance.com/login` HTTP 200. Login form in `ModularCompliance/admin-ui/src/pages/MaterialLogin.tsx`. API `POST /api/auth/login` on production returns `Invalid credentials` for empty body — endpoint is live. |
| `?plan=starter` / `?plan=professional` pre-selects the plan | pricing cards | IMPLEMENTED | `MaterialRegister.tsx` reads `searchParams.get('plan')` and matches `PLANS` keys `starter` / `professional`. |
| Starter NZ$199/mo + GST · Professional NZ$499/mo + GST · Enterprise contact | `#pricing` | IMPLEMENTED | Unchanged prices on `index.html` pricing cards. Matches live site copy from prior claim-audit MC-12. |
| This page does not take card payment | pricing subtitle, `llms.txt` | IMPLEMENTED | Marketing site has no Stripe/checkout form. App has Stripe service code; **not claimed on .com**. |
| Enterprise is by enquiry | pricing Enterprise CTA | IMPLEMENTED | Mailto `info@instilligent.com` retained. App register still lists Enterprise at `$999` internally — that recalled price is **not** linked from this site. |
| 14-day free trial / no credit card | **not claimed on .com** | DROPPED | App register UI has a trial checkbox (`MaterialRegister.tsx`). Trial expiry enforcement on `trial_ends_at` was **not** proven for this change. FTA `fta:bait-trial` — do not put “free trial” on the marketing site until expiry + purchasable paid path are verified. |
| Access by enquiry as the only path | removed | N/A | Replaced because self-serve register/login are live. |
| Operator NZBN 9429041896853 | footer, `llms.txt` | IMPLEMENTED | Matches Certificate of Incorporation / existing `index.html` footer. `llms.txt` previously had 9429051796284 (wrong); corrected in this change. |
| Privacy policy written in accordance with the Privacy Act 2020 | `pages/privacy.html` meta/og | IMPLEMENTED | Body already said “in accordance with”. Meta/og previously used banned “Compliant with”; rewritten in this change. Canonical/og:url aligned to `/pages/privacy.html`. |

## Honest boundaries (unchanged)

Incident register does not notify a regulator. Templates are starting points the customer reviews. No “compliant with”. No AML/screening claims.

## Residual (do not hide)

- Public register has rate limiting and password checks; **no CAPTCHA** on the marketing CTA (the form is on the app).
- Email verification is **not** required before the register API returns a JWT (`auth.js` creates `active` users).
- `www.modularcompliance.com` was Cloudflare **523** at stocktake; apex `modularcompliance.com` was **200**. This change does not fix www.
- Do not push until Marc says ship — Cloudflare Pages deploys from `master`.

## Marc

Directed in chat 2026-08-21: change enquiry-only; launch login/register on the website; follow CF / Instilligent principles.

Awaiting explicit **ship / push** before origin.
