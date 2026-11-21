# W04c — the explainer form, and the five pages it admits

`Unit — admit a from-zero explanation form · Recommend — A — admit Knowledge explainer · Class — standard refined (N = 0)`

## Decision report

**1 Rule and source**

- Rule — the knowledge role carries three forms (guide, case, note), each with its own path and admission; none takes a page that teaches a subsystem from zero.
- Source — `docs/norm/roles.md` rows 46–48 (the three knowledge forms); the gap is what W04's role pass found (`docs/notes/` served four jobs, not the audit's two) and what W04b-ii could not route: five pages, 44,403 non-whitespace characters, with no admitted home.
- Sample — `no sample: first application`. oshi's five pages were the candidate, not an existing application, so the role pass that followed was stricter than a regression check.
- Owner — the maintainer (session user); no exception request was needed.

**2 Target now**

- Boundary — the knowledge form list, and oshi as the first application (the five pages then held as ten tombstones).
- Shape — the five pages shared one register: a one-line conclusion, a section-by-section walkthrough, self-check commands, and a boundary statement. Their facts were already owned: `components-decision.md` §4.8–§4.10, §4.13–§4.14, `GLOSSARY.md`, `docs/operations/annotation.md`, `docs/contracts/*`.
- Coherent — yes for the register (used consistently across five pages, sourced in its own pages as distilled project conversations, no known failure); no for its home — one page was at 15,338, over the soft line, and nothing owned it.
- Gap — no form admits the teaching register, and the register necessarily restates, which R1 forbids.
- Baseline — oshi `c30d17f` (its parent), standard `46e6278`.

**3 Action**

- Change — `A — admit Knowledge explainer`: `/docs/knowledge/explainers/<topic>.md`, admission "a subsystem explained from zero, in the order it runs, for a reader who does not yet have its vocabulary", exit "deleted when a guide, a contract, or an architecture page covers the same ground", authority "binds no rule; each section ends at the page that owns the fact", trigger "a new maintainer must reach operability without reading the architecture page". The restraint is part of the form: a definition it needs is one line at the glossary, and a page that would mostly link is an index. Carried into `DOC_ROLE_PATHS`, one check with two tests (`explainerSections`), the role-boundary test, and the migration mapping row.
- Check — `bun run gate` (standard); on the target, the three pages inside budget, every section resolving, and oshi's own prose and ruff gates.
- Stop — a carve-out that cannot be stated in one rule (i.e. a gloss that turns into whole-page restatement), or any applied unit that would stop complying.
- Expected — `N = 0`; the standard's existing pages and oshi's six guides, three cases, and ten tombstones unaffected.

**4 Risks**

- Frozen — the W04b-ii closure records (`46e6278`, the move-record section, the finding-13 row) said "no role admitted". They are corrected by a later record, not rewritten in place.
- Blast radius — `N = 0`; `docs/norm/roles.md` grows to 12,644 and stays over its soft line, which it already was.
- Revert — `git revert 13ed7ae` on the standard, `git revert c30d17f` on oshi.
- Conflict — R1 ("one fact, one home") against a form whose job is to teach; resolved by putting the restraint inside the form: every section ends at its owner, definitions are one line, and the majority-link page is not an explainer.

**5 Alternatives and the ask**

- Recommend — `A — admit Knowledge explainer`; field 3 is its mechanics.
- Rejected
  - `B — keep the shelf closed` — the maintainer's original ruling was to dissolve into a new form, not into existing pages; B drops the walkthrough and leaves the register homeless.
  - `C — park the pages in docs/notes/ first, admit the form later` — the standard forbids a target inventing a directory the norm does not define, and the pages were already frozen there once.
- Flip — a rewritten page that cannot stay inside budget without repeating its owner pages; the form would then be a norm risk.
- Ask — `Accept A?`; `per-section gloss limited to one line, numbers always a link to the owner?` — both accepted 2026-11-19.

**6 Decision**

- `Status` — accepted 2026-11-19.
- `Route` — on recommendation.
- `Record` — this page, plus `audits/move-records.md` and the finding-13 row in `audits/README.md`.

## Applied — the standard

`13ed7ae` (norm): the fourth knowledge form; the explanation that a page whose sections would mostly link is an index; the boundary test; `DOC_ROLE_PATHS`; `explainerSections` and its two tests; the migration mapping row. Nothing was added to `template/`: no knowledge form has a template page, and a template that led the norm would be the drift the standard exists to prevent. Gate: `bun run gate` PASS (107 markdown files, 65 tests), with the pre-existing `roles.md` soft warning.

## Applied — the target

`c30d17f` (oshi, one commit for the form):

- Three pages, from the five: `recognition-pipeline.md` (11,614), `data-and-filesystem.md` (6,644), `reading-the-numbers.md` (14,835, over the soft line and inside hard); `README.md` (1,176) with the placement rule and one row per page.
- Each section ends at its owner: `components-decision.md` §4.8/§4.13/§4.14, `data-layers.md` §1, `data-rules-decisions.md` §4.5, `contracts/annotation-definition.md`, `plans/m1-plan.md` §2.1/§2.2/§2.5, and `GLOSSARY.md`.
- Three blocks did not move because they already have homes: the threshold method (a guide since `a9300cc`), the metric definitions (glossary since `869e762`), and the verification queries (`docs/operations/annotation.md`).
- `knowledge.md` and `recall-vs-coverage.md` do not come back: their method, vocabulary, route comparison and single metric rule are in a guide, the glossary, ADR-0013 and the contract, and their teaching is absorbed by the three pages. `docs/notes/` keeps ten tombstones, three of which forward into `explainers/`.
- Proof: every relative link under `docs/` resolves; every `##` section of every explainer carries a link; prose 264 files with 0 wrapped blocks; `ruff check` and `ruff format --check` green.

## What this corrects

W04b-ii was applied against a misread instruction: "dissolve" was read as dissolving into architecture and the glossary, and the record says so (`46e6278`, "no explanation role was admitted"). The maintainer's ruling was the opposite — dissolve into a new form, then let the practice justify the standard change. `audits/move-records.md` carries the correction entry; the closure commits stay in history, and their movable content is where the three explainers came from.
