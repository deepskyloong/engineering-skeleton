# Todo

## Current state

- Updated: 2026-11-19
- Status: open; `B-0005` active (programme); this package is the oshi step
- Branch: `feature/b0005-rollout-oshi`
- Last done: W05c closed — C7 records the governance disposition as one line on the docs index, so no page was created (oshi `8e16fe5`); the two required roles now have pages and the third has a recorded retirement
- Gate: standard `bun run gate` PASS 2026-11-19 (111 markdown files, 66 tests; one soft `roles.md` warning); oshi text-only path green the same day (ruff check / format, prose 277 files, 0 wrapped)
- Phase: P1 — package rule and role moves, closed 2026-11-19; next is P2
- Focus: W06 — budget repair, with two measured breaches and one page inside a sixth of its hard line
- Progress: 11 done / 4 todo / 0 blocked
- Todo: W06–W09
- Next: W06 — `docs/reviews/README.md` 13,323 against 12,000 and `docs/backlog/B-13-degenerate-crops.md` 13,875 against 8,000 are over their hard lines; `docs/conventions.md` is at 14,092 of 16,000
- Blocked: none; W05c C6–C7 wait on a ruling, not on a blocker
- Open decisions: none — R1 settled as a new role (`docs/decisions/ADR-0026-per-suite-map-role.md`); R2 settled as no replacement, repository owns the base rule and the page points at the norm source (`06aeb6d`); R3 settled, Governance retired (`a241462`, ADR-0027)
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/decisions/check-in), this file (state/ledger), and `maps/w05b-residual-role-pass.md` before W05b or W05c

## Work items

### P0 — Package split

#### W01 — Split the five-repository package into `rollout-oshi`

**Status**: done
**Depends on**: none

Close the five-repository package as superseded and open `tasks/rollout-oshi/`: move the oshi audit and its measurement script, carry the reviewed rulings, and leave the programme in `B-0005` with one package per repository. The old package's goal changed from five repositories to one, which `0003` makes a new package rather than a scope reduction; its summary records what it left behind.

**Done when**:

- the new package carries spec, plan, and todo, plus the audit and its tool
- the old package's summary is written and its directory is gone
- `tasks/README.md` lists one open package
- `B-0005` states the per-repository order and stays `active`
- the gate is green

**Evidence**: commit `b041762`; `tasks/rollout-oshi/`; `B-0005` (per-repository plan); gate `PASS — 80 markdown files`.

### P1 — Package rule and role moves

#### W02 — Move the charter role

**Status**: done
**Depends on**: W01

Compare `docs/brief.md` (4,029) with the charter admission — scope, non-goals, hard constraints, success criteria — and move it to `docs/charter.md`. A brief that carries history or a roadmap loses that material to `docs/status.md` or the backlog before the move. Update living pointers; leave a tombstone if a frozen record cites the old path.

**Done when**:

- `docs/charter.md` exists in the charter shape
- no living page points at `docs/brief.md`; `rg -l 'docs/brief.md'` survivors are explained
- oshi's gate is green

**Evidence**: oshi commit `28c8bc4`; `docs/charter.md` 3,678 non-whitespace; tombstone at `docs/brief.md` and its adapter row; `docs/conventions.md` "Human labor and communication" carries §2; oshi text-only gate green; dispositions in `audits/README.md`.

#### W08a — Define the package evidence category

**Status**: done
**Depends on**: W02; field 6 acceptance

Define the work package container in the standard: four ledger files by closeout (`spec.md`, `plan.md`, `todo.md`, and `summary.md` written then) plus evidence directories created on demand. Evidence is package-local: it stays in git, `summary.md` names each directory and what it answers, and closeout archives it with the package unless a successor owns it; it is not a role, carries no docs-page volume budget, and never becomes a durable home. The 2026-11-18 six-field decision report is the basis; field 6 is `accepted` (owner user, route `on recommendation`). The unit adds a package check to `scripts/check.py`: the three open ledger files always, `summary.md` in the archive, and evidence naming once a summary exists. The norm, the template, the live index, the skill, and the checker state the same rule; ADR-0021 records the decision; oshi's `audits/` and `tools/` stay untouched.

**Done when**:

- field 6 reads `accepted` with owner, date, and route
- `GLOSSARY.md`, `docs/structure.md`, `template/core/docs/structure.md`, `docs/norm/rules.md`, `docs/norm/flow.md`, `work-packages/README.md`, `template/effort/`, `scripts/check.py`, and `SKILL.md` state the same rule
- the new ADR records the decision; ADR-0009 and ADR-0017 are clarified, not rewritten
- `rg -n 'four files'` live survivors are "four ledger files" or frozen records with an explanation
- `check.py` passes on the three archived packages and `rollout-oshi` without a false positive
- the standard gate is green

**Evidence**: decision report 2026-11-18 (field 6 `accepted`, route `on recommendation`); ADR-0021; `a2848c8`; gate `PASS — 99 markdown files`; the package check covers the three archived packages and this one; the old-count-phrase survivors are all frozen records.

#### W03 — Move the four role destinations

**Status**: done
**Depends on**: W02; W08a

Create `docs/contracts/` and `docs/architecture/`; split `docs/designs/` (4 files, 88,581) and `docs/specs/` (7 files, 146,716) by admission: contracts (a fact a consumer may rely on, including all four UI specifications), architecture (system organization only), operations (the existing `docs/operations/` pages), conventions (`docs/conventions.md`). A source directory maps no role; the section decides. The map is `maps/w03-role-map.md`, accepted 2026-11-19: 19 contract pages, 6 architecture pages, 4 operations pages, 10 tombstones. Leave tombstones for cited paths, forward cross-role splits to `docs/README.md`, and register both old directories as `legacy path` rows in `docs/adapters.md` "Registry"; the four frozen citations the drops degrade are recorded in the map and carried by W08.

**Done when**:

- every page under `docs/contracts/` and `docs/architecture/` passes the admission; the operations merges and conventions additions land
- `docs/contracts/README.md` and `docs/architecture/README.md` index their pages
- every moved page is inside oshi's budget for its role
- the old paths are tombstones or registered legacy paths
- oshi's gate is green

**Evidence**: commits, measured volumes, deviations and the five corrections to the accepted map in `maps/w03-role-map.md` "Applied results", with the per-commit gate results. The prose unwrap, the three `md-tools` defects, and the gate's fifth stage are that map's "Prose and gate follow-ups". Pointer proof: `git grep -n 'docs/designs/\|docs/specs/'` survivors are the two adapter legacy rows, the frozen citers, and the new pages' `Source` headers.

#### W04 — Move the knowledge role

**Status**: done
**Depends on**: W03

Split `docs/notes/` (11 files, 90,429) into `docs/knowledge/guides/` for methods that change what a maintainer does and `docs/knowledge/notes/` for observations that do not yet justify a guide. `pitfalls.md`, `knowledge.md`, and `python-env-convention.md` are guides by the audit's reading. Add `docs/knowledge/README.md`; leave tombstones for cited files.

**Done when**:

- each note is a guide or a case by admission, or it stays with a recorded disposition
- every page is inside its hard line; `pitfalls.md` at 15,283 is above soft, and its split is W06's per the plan's "split after the role is at home"
- no living pointer resolves to the five moved paths; every survivor is explained
- oshi's gate is green

**Evidence**: `maps/w04-role-map.md` "Applied results" — commits `e4b96c8` and `55cea2d`, the measured volumes, the repointed pages, the `docs/notes/` legacy row, the pointer proof, and the gate. Acceptance amended 2026-11-19 (A): the split is guides and cases, and six pages stay as a registered legacy path.

#### W04b-i — Extract the admitted jobs from the residue

**Status**: done
**Depends on**: W04

Two of the six pages hold a job that is admitted and homeless: `recognition-pipeline.md` §3's tuning method (a guide) and `classifier-vs-prototype.md`'s choice with a rejected alternative (an ADR). The other four hold no job a role takes, so they wait for the ruling in W04b-ii. A page that duplicates a contract or architecture page is retired with a tombstone, not relabelled to fit; the freeze holds while this runs.

**Done when**:

- the method and the decision each have one home, and no page states the same rule twice
- the retired path is a tombstone and its frozen citers resolve
- oshi's gate is green

**Evidence**: oshi `a9300cc` (`knowledge/guides/threshold-binding.md`, 1,292; `recognition-pipeline.md` §3 becomes a pointer), `adbebc5` (`decisions/ADR-0013-no-in-project-classifier.md`, 4,047; `classifier-vs-prototype.md` → tombstone, 132); `decisions/README.md` index row and `guides/README.md` guide row; prose 260 files with 0 wrapped blocks, ruff green, every relative link under `docs/` resolves; `git grep` over the retired path returns three frozen records only. Reading `data-integrity.md` page by page found every claim already stated elsewhere, so there was nothing to merge: the trace and the per-page pass are in `maps/w04b-role-map.md`.

#### W04b-ii — Decide whether explanation is a role, then route the five pages

**Status**: done
**Depends on**: W04b-i

One ruling opened this unit, and the maintainer made it on 2026-11-19: no new role — the explanation register dissolves into architecture, `GLOSSARY.md`, `docs/operations/` and tombstones. Each of the five pages was then either extracted into a role that admits its job or dropped with the pointer fixes a living reader needs.

**Done when**:

- the ruling is recorded, and every page has a disposition that follows from it
- the pages it lands in pass their admissions and hard lines
- `docs/notes/` holds no live page; the adapter row retires when the last tombstone does
- oshi's gate is green

**Evidence**: oshi `c4e0a93` (`knowledge/guides/choosing-a-dependency.md`, 1,099), `869e762` (`GLOSSARY.md` 2,226 → 3,577 with identity/decisioning plus GT, burst and coverage; `annotation-eval-terms.md` → tombstone, `recall-vs-coverage.md` deleted for having no citer), `ac68abe` (`knowledge.md` → tombstone), `6205394` (`data-integrity.md` and `recognition-pipeline.md` → tombstones; `README.md` ×2, `embedding-fundamentals.md` ×2, `pitfalls.md` ×3 and the pose probe's comment repointed). `docs/notes/` now holds 10 tombstones and a README that indexes them; the adapter row says "closed". `git grep` over the five retired paths returns frozen records and the two `Source` lines only; every relative link resolves; prose 260 files with 0 wrapped blocks, ruff green. No ADR-0014: ADR-0013's background already carries the zero-training rationale. Report in `maps/w04b-role-map.md`.

#### W04c — Admit the explanation form the five pages needed

**Status**: done
**Depends on**: W04b-ii

The maintainer's ruling was to dissolve the five pages into a new form, then let that practice justify a standard change. The unit was therefore a standard refinement: the knowledge role gains a fourth form, and oshi is its first application.

**Done when**:

- the rule is in `docs/norm/roles.md` with its places that must move with it, and the gate is green
- the form's restraint is normative, not advice: every section ends at its owner, a needed definition is one line, a mostly-link page is an index
- the target page set passes the form's own check, and every relative link resolves
- the record names what the form costs

**Evidence**: standard `13ed7ae` — fourth knowledge form in `docs/norm/roles.md`, role-boundary test, `DOC_ROLE_PATHS`, `explainerSections` with two tests, `docs/workflow.md` mapping row; `bun run gate` PASS (107 markdown files, 65 tests). oshi `c30d17f` — `docs/knowledge/explainers/` README plus `recognition-pipeline.md` (11,614), `data-and-filesystem.md` (6,644), `reading-the-numbers.md` (14,835); three blocks stayed at their owners (threshold guide, glossary, annotation operations); `docs/notes/` keeps ten tombstones, three forwarding into `explainers/`; every `##` section carries a link, every relative link resolves, prose 264 files with 0 wrapped blocks, ruff green. Report in `maps/w04c-explainer-role.md`; correction entry in `audits/move-records.md`.

#### W05 — Place the toolchain role

**Status**: done
**Depends on**: W04

`docs/stack.md` (10,524) mixes toolchain traps, runtime choices, and deferred items. Split it: traps with the command that shows them to `docs/toolchain/python.md` if the toolchain admission holds — the second environment-specific trap — the choices to an ADR with their rejected alternatives, and the deferred items to oshi's backlog. If only one trap reproduces, the traps stay in `AGENTS.md` and no toolchain page is created.

**Done when**:

- `docs/stack.md` is gone and each part is at its role
- the toolchain page exists or its absence is recorded
- oshi's gate is green

**Evidence**: `maps/w05-toolchain-role.md` (role pass, six-field report, applied section). oshi `50d2eb3` — `docs/toolchain/README.md` (1,136) and `python.md` (4,008) with three traps that reproduce on 2026-11-19, the `docs/README.md` row, and `AGENTS.md`'s package-index paragraph reduced to a gate clause; `d6a11e5` — `ADR-0014-runtime-stack.md` (5,250) and `ADR-0015-dev-toolchain.md` (5,167) plus two index rows; `720b83b` — `B-26-ci-service.md` (1,393), `B-27-packaging-release.md` (1,305), two index rows; `9f519dc` — the container non-goal in `docs/charter.md` (3,935); `9c27e08` — tombstone (55, one link to `docs/README.md`) and the three living pointers (`docs/development-workflows.md`, `docs/operations/works.md`, `web/README.md`). Gate: C1–C4 text-only green; C5 full — 658 passed / 1 skipped, `ty` clean, prose 270 files with 0 wrapped blocks, frontend `bun run validate` 86 tests. Pointer proof: `git grep 'docs/stack.md'` returns B-12's dated measurement, the compound-engineering plan, and the two new records' `Status` rows — frozen citations and provenance, all resolving.

### P1b — The role set completed

#### W05b — Place the four pages no work item owned, and remove the one over a hard line

**Status**: done
**Depends on**: W05; C4 on R1 (settled)

P1's exit condition named charter, contracts, knowledge and toolchain, and all four reached their homes. The migrate protocol's last step — list what is left — was never run, so four live pages with consumers still held no role: `docs/testing.md` (7,500), `docs/mutation-testing.md` (9,311), `docs/language-policy.md` (2,965), and `docs/development-workflows.md` (16,611, over the 16,000 hard line). The role pass is `maps/w05b-residual-role-pass.md`: testing split into `AGENTS.md` red lines plus a guide, mutation into ADR-0015's rejected table, a guide and a case, language folded into `docs/conventions.md` §11, and the suite map split three ways once R1 admitted Suite tracks as a role (`0d3a5a1`). One role per commit; a closed package's citation is answered by a tombstone, an open package's pointer is repointed.

**Done when**:

- each job is at an admitted home, or has a disposition recorded in the map
- `AGENTS.md` carries the test red lines; no second decision page restates ADR-0015's tool choice
- `docs/development-workflows.md` is gone and its three jobs sit with their roles
- the four old paths are tombstones; every living pointer is repointed and every frozen citer resolves
- the page over a hard line is removed rather than carried into W06
- oshi's gate is green

**Evidence**: standard `0d3a5a1` (Suite tracks admitted; gate PASS 112 files / 66 tests), `06aeb6d` (base rule plus deviations), `a241462` (Governance retired; gate PASS 111 files / 66 tests). oshi: C4 `0e57e99` (suite-tracks 8,864, structure 7,439, guide 4,687, tombstone 54); C1 `55e6b0c` (guide 7,191, `AGENTS.md` 6,746 → 7,562); C2 `410fb16` (guide 7,008, case 2,878, ADR-0015 5,167 → 5,677); C3 `fc17b18` (conventions 11,760 → 14,092, tombstone 53). Every commit: text-only gate green (ruff check / format, prose 272 → 275 files, 0 wrapped) and every relative link under `docs/` resolving; per-commit volumes, pointer proofs and survivor lists are the map's "Applied results".

#### W05c — Give the two required roles a home, and record the third's retirement

**Status**: done
**Depends on**: W05b

Three roles the standard called always-present or first-use had no page: `docs/committing.md` (no commit-message rule exists anywhere), `docs/workflow.md` (its lifecycle job is split between `tasks/README.md` and the suite map), and `docs/governance.md` (seven closed packages, no page). R2 settled on 2026-11-19: a suite track does not replace either role — the repository states the base rule, the page is a base pointer to the norm source plus this repository's deviations, and a suite track records only what it layers on its own artifacts (the `docs/committing.md` shape, B-0005 Plan item 7). R3 settled the same day: Governance is retired as a role (ADR-0027), so its subjects live in `docs/norm/flow.md`, `docs/norm/rules.md`, `AGENTS.md` and, for oshi, the review archive rule already in `docs/reviews/README.md`. So two pages get written and one disposition gets recorded; `tasks/README.md` keeps the suite's package shape while pointing at `docs/workflow.md` for the lifecycle. The work-package index at `tasks/README.md` gets its reason recorded in `docs/adapters.md` in the same pass.

**Done when**:

- `docs/committing.md` exists as a base pointer plus deviations and is inside its 5,000 line
- `docs/workflow.md` exists as a base pointer to the norm source plus deviations, restating nothing the norm states
- `AGENTS.md` carries the `Norm source:` line the pointers resolve against
- no `docs/governance.md` is created; the oshi-specific authorization deviation is recorded where it lives, with a one-line pointer from wherever a reader would look
- the work-package index's placement inside a suite track has a recorded disposition
- `docs/README.md` indexes whatever exists and states no counts
- oshi's gate is green

**Evidence**: C5 — oshi `4b8d53c`: `docs/committing.md` 1,306 as a base pointer, one deviation (scope vocabulary, with the clause that a new topic is added in the commit introducing it); `AGENTS.md` 7,561 → 7,796 with the `Norm source:` line; `docs/README.md` + row. C6 — oshi `4e1da3e`: `docs/workflow.md` 2,066 as a base pointer, three deviations from one cause (packages in a suite track, so no `work-packages/` and no archive); `tasks/README.md` 1,113 → 936 with its six restated rules and its checklist replaced by pointers; `docs/adapters.md` records the index's placement. C7 — oshi `8e16fe5`: no governance page; `docs/README.md` 4,359 → 4,650 gains the one line naming where the retired role's subjects live and the single deviation. All three: text-only gate green, prose 277 files.

### P2 — Page repairs and audit closeout

#### W06 — Fit oshi's role pages to their budgets

**Status**: todo
**Depends on**: W05c

Re-measure every role page after W05b–W05c; the audit's 29 breaches were a 2026-11-16 snapshot, and the C4 list was a snapshot of a smaller tree. Measured 2026-11-19 at oshi `9c27e08`, three pages are over their hard line and none was in W06's scope: `docs/reviews/README.md` (13,323 / 12,000 index line), `docs/backlog/B-13-degenerate-crops.md` (13,875 / 8,000 item line), and `docs/development-workflows.md` (16,611 / 16,000), which W05b removes rather than this split. Over soft: `contracts/schema.md` (12,273), `contracts/ui-label.md` (12,251), `contracts/ui-audit.md` (12,185), `architecture/components-decision.md` (10,911), `contracts/data-rules-ingest.md` (10,009), `docs/conventions.md` (11,760 before the language fold), `knowledge/guides/pitfalls.md` (15,341), `knowledge/explainers/reading-the-numbers.md` (15,023), `knowledge/explainers/recognition-pipeline.md` (11,614), and the storefront `README.md` (10,564). Split by topic, not by length. Trim each index to one line per child (`docs/reviews/README.md`, `docs/backlog/README.md`, `docs/README.md`), keep the storefront README to what, install, and prove, and link the history. Split a page after its role is at home, never in the same commit as a move.

**Done when**:

- every role page is inside its hard budget
- index pages state no counts
- oshi's gate is green

**Evidence**: pending

#### W07 — Close the audit's remaining findings

**Status**: todo
**Depends on**: W06

Give every finding in `audits/oshi.md` a disposition; the ledger is the findings table in `audits/README.md`. The ones the moves do not carry: index autonomy in `experiments/README.md`, `docs/plans/README.md`, and `docs/reviews/README.md` (finding 9; the `docs/adrs/` README went with the decisions move); `tests/test_status_cap.py` measuring total characters against a non-whitespace budget (11); `archived/` as a fifth deletion exception with its 20 citations (6). Finding 17 is resolved (`fb6701e`). A finding that needs a rule in the standard goes to W08 instead of being fixed locally; finding 1 stays with `B-0007`. One new finding joins here: `docs/adapters.md` "Freeze" states where new files may go, and the adapter registry's admission (suite tracks, legacy paths, whitelist, disposition) does not name it; W03 deliberately added its two directory rows to "Registry" instead.

**Done when**:

- every finding is resolved, withdrawn, or filed as a backlog item
- the dispositions are recorded in `audits/README.md`
- oshi's gate is green

**Evidence**: pending

### P3 — Closeout

#### W08 — Fix the standard gaps the rollout exposed

**Status**: todo
**Depends on**: W07

Fix the standard gaps oshi exposed. Each gap becomes an ADR, a spec change, or a backlog item; no one-off role or budget for one repository. Two remain after W08a: ADR-0011's cited sample (`docs/backlog.md`) ends `(moved)`, not `— moved`, and carries an explanation line, so the evidence it names fails the admission it documents; `scripts/check.py` accepts `ADR-\d{4}` and `B-\d{4}` only, while ADR-0015 keeps a migrated backlog's width, so the portable checker (`B-0002`) must accept `B-<n>` as well. W03 adds four records here: the drops degrade the frozen citations of `architecture §7`, `annotation §12`, `annotation §8.1`, and `Q3`'s landing point; each needs a written disposition (exception, pointer, or backlog item), and Q3 must name where the milestone re-sequencing now lives. W03 also moved the design system back to contracts, which leaves the standard's architecture admission narrower than the earlier cut assumed — W08 checks it against the remaining four repositories' design docs before the role is declared settled. The package evidence category and the `work-packages` checker coverage are W08a, before W03. W04 raised the explanation-home question — a zero-background system explanation had no admitted role, five residue pages carried that register, and `AGENTS.md` norm 3 sent every recurring concept to `docs/notes/` — and W04b-ii settled it on 2026-11-19: no role is admitted, the pages dissolved into architecture, `GLOSSARY.md` and tombstones, and norm 3 now points at the guide and case homes. The standard still has no place for a teaching page; if a second target produces the same pressure, that is the evidence this ruling lacked.

**Done when**:

- each open gap has an ADR, a spec change, or a backlog item
- the gate is green

**Evidence**: pending

#### W09 — Close the package and record oshi's disposition

**Status**: todo
**Depends on**: W08

Write `summary.md` in three sections, relocate what outlives the effort — rulings to ADRs or the backlog, the audit index's surviving dispositions to `B-0005` — and record oshi's disposition there without closing the item: the remaining four repositories keep `B-0005` active. Move the package to `work-packages/archive/rollout-oshi/`, move its row from `work-packages/README.md` to `work-packages/archive/README.md`, and prove `rg -l 'rollout-oshi'` survivors are explained.

**Done when**:

- `summary.md` exists, is inside budget, and names what was not done
- `summary.md` names `audits/` and `tools/` and what each answers; no evidence directory is empty
- `B-0005` carries oshi's disposition and remains `active`
- the package is at `work-packages/archive/rollout-oshi/` and its row is in the archive index
- every surviving `rollout-oshi` pointer is explained
- the gate is green

**Evidence**: pending
