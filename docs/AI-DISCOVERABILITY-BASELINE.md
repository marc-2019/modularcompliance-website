# Modular Compliance — AI Discoverability Baseline

**Raw observations only. Nothing below is fabricated or extrapolated.** Per brief §13: record date,
tool, whether Modular Compliance appears, how it is described, and which URL (if any) is cited.

**Run 1 date:** 2026-09-01 (NZ). **Tool coverage this run:** Google web search only (via the
already-open Marc Chrome profile, `spark_chrome_drive.sh`). **Not run this pass:** ChatGPT, Claude,
Gemini, Perplexity — these need Marc's own logged-in sessions in his Chrome profile per house rule
(never a fresh/incognito session), and running all 8 prompts × 4 remaining tools is a properly-sized
follow-up task, not something to rush inside this pass. Do not treat the gaps below as "tested,
not found" — they are simply not yet tested.

## Prompt 1 — "What is Modular Compliance?"

- **Tool:** Google Search (AI Overview) — 2026-09-01
- **Result: entity collision confirmed live.** Google's AI Overview answers with the *generic
  concept* of "modular compliance" — described as "an approach that breaks regulatory rules and
  compliance checks into smaller, flexible parts that can be updated or reused independently,"
  illustrated with a building/construction photo, and cross-linking to a "Building Performance /
  BuiltReady guide — Design and manufacture (modular...)" result. This is **exactly** the
  "modular / prefab building compliance" collision the brief's §0 warned about, caught live.
- **However:** immediately below the AI Overview, the top organic result and a right-hand
  knowledge card **do** correctly identify the product: "Modular Compliance — NZ compliance
  register and workflow tool," citing `https://modularcompliance.com`, with the description
  "Modular Compliance maps legislation into structured frameworks, controls and tasks, records who
  completed what and when, and stores the supporting evidence" — word-for-word consistent with the
  homepage and `llms.txt`.
- **Reading:** classic search (organic result + knowledge card) already has correct entity
  resolution. Google's *generative* AI Overview layer does not yet disambiguate the product from
  the generic phrase for this exact query. This is evidence for, not against, the brief's core
  thesis — entity disambiguation work (more corroborating pages, more consistent mentions of "by
  Instilligent Limited") should help the AI Overview layer catch up to what organic search already
  gets right.
- Screenshot: `artifacts/spark-chrome/mc_baseline_q1.png` (outside this repo, in the agent
  workspace — reference only, not copied into the repo).

## Prompt 2 — "What compliance register software exists for New Zealand SMEs?"

- **Tool:** Google Search (AI Overview) — 2026-09-01
- **Result: Modular Compliance does not appear.** The AI Overview names BWARE, AMLHUB, AccreditAZ,
  CS-VUE, MinterEllisonRuddWatts Obligations Register, VComply, and (under "Global GRC & Compliance
  Tools Used in NZ") Vanta and Drata. Modular Compliance is not mentioned anywhere in the visible
  overview.
- **Reading:** this is the highest-priority query in the brief's baseline list and the site
  currently loses it entirely. This is the strongest evidence for why Phase B pages
  (`/nz-compliance-software`, `/compliance-register`) and the authority-building plan matter — the
  product isn't losing on accuracy, it's simply not present in the corpus these overviews draw
  from yet.
- Screenshot: `artifacts/spark-chrome/mc_baseline_q2.png` (agent workspace, reference only).

## Not yet run (do not fabricate — genuinely untested)

| # | Prompt | Status |
|---|---|---|
| 3 | How can an NZ small business keep a Privacy Act compliance record? | not run |
| 4 | What software helps NZ businesses with Health and Safety at Work Act records? | not run |
| 5 | Modular Compliance vs Vanta | not run |
| 6 | Best compliance software for a small NZ business | not run |
| 7 | Who makes Modular Compliance? | not run |
| 8 | What is a compliance management system? | not run |
| — | Same 8 prompts on ChatGPT | not run — requires Marc's logged-in ChatGPT session |
| — | Same 8 prompts on Claude | not run — requires Marc's logged-in Claude session |
| — | Same 8 prompts on Gemini | not run — requires Marc's logged-in Gemini session |
| — | Same 8 prompts on Perplexity | not run — no login required, straightforward follow-up |

## Next run

Repeat quarterly per brief §13, and also re-run prompts 1–2 after Phase B pages ship, specifically
to see whether `/nz-compliance-software` and `/compliance-register` change prompt 2's result.
Expect ChatGPT brand mentions to move slower than Perplexity citations (brief §13) — don't expect
a fast win on the harder tools even after Phase B ships.
