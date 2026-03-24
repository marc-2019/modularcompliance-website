# Modular Compliance Marketing Website — Design Spec
**Date:** 2026-03-25
**Status:** Approved → Building

## Architecture
Static HTML/CSS/JS on Cloudflare Pages, matching instilligent-website pattern. No build step.

## Pages
- `index.html` — Landing page (hero, value props, modules, pricing preview, CTA)
- `pages/about.html` — About MC, Instilligent, the team
- `pages/pricing.html` — Pricing tiers + FAQ
- `pages/features.html` — Compliance modules, AI features, dashboard
- `pages/privacy.html` — NZ Privacy Act 2020 compliant policy

## Design System
- Dark mode default (`#0d1117` base)
- Purple brand: `#6B21A8` / lighter `#9333ea` for dark bg contrast
- Inter font (Google Fonts)
- Lucide icons
- Mobile-responsive (same breakpoints as instilligent-website)

## Pricing
- Starter: $99/mo (5 users, 2 frameworks)
- Professional: $249/mo (25 users, 5 frameworks)
- Enterprise: Custom

## GA4
- Tag: G-NQZ08PD0MJ (all pages)

## Infrastructure
- `_headers` — security headers + cache control
- `_redirects` — clean URLs for Cloudflare Pages
- GitHub: marc-2019/modularcompliance-website
