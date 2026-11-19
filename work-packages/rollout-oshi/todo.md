# Todo

## Current state

- Updated: 2026-11-19
- Status: open; `B-0005` active (programme); this package is the oshi step
- Branch: `feature/b0005-rollout-oshi`
- Last done: W07f — the forwarding stubs are gone and every moved path is an adapter row (ADR-0028; `0291824`, oshi `e040e5f`, `dd2afd5`)
- Gate: standard `bun run gate` PASS 2026-11-19 (112 markdown files, 62 tests; one soft `roles.md` warning); oshi full path green the same day (ruff check / format, `ty`, prose 246 files, pytest 658 passed / 1 skipped, frontend `bun run validate` 86 passed)
- Phase: P2 — page repairs and audit closeout
- Focus: W06 — re-measure every role page, then split by topic
- Progress: 18 done / 3 todo / 1 doing
- Todo: W06, W08, W09; W07 in progress
- Next: W06 — two measured breaches (`docs/reviews/README.md` 13,323 / 12,000 and `docs/backlog/B-13-degenerate-crops.md` 13,875 / 8,000) plus a fresh sweep; the conventions page is now 12,056, still over its 10,000 soft line but clear of the 16,000 hard one
- Blocked: none
- Open decisions: none — R1 settled as a new role (`docs/decisions/ADR-0026-per-suite-map-role.md`); R2 settled as no replacement, repository owns the base rule and the page points at the norm source (`06aeb6d`); R3 settled, Governance retired (`a241462`, ADR-0027); R4 settled, the tombstone role retired (`0291824`, ADR-0028)
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/decisions/check-in), this file (state/ledger)

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

**Evidence**: commit `b041762`; the package carries its three ledger files, `audits/` and `tools/`; `B-0005` states the per-repository order and stays `active`; gate `PASS — 80 markdown files`.

### P1 — Package rule and role moves

#### W02 — Move the charter role

**Status**: done
**Depends on**: W01

Compare `docs/brief.md` (4,029) with the charter admission — scope, non-goals, hard constraints, success criteria — and move it to `docs/charter.md`. A brief that carries history or a roadmap loses that material to `docs/status.md` or the backlog before the move. Update living pointers; leave a tombstone if a frozen record cites the old path.

**Done when**:

- `docs/charter.md` exists in the charter shape
- no living page points at `docs/brief.md`; `rg -l 'docs/brief.md'` survivors are explained
- oshi's gate is green

**Evidence**: oshi `28c8bc4`; `docs/charter.md` 3,678 non-whitespace; tombstone at `docs/brief.md` and its adapter row; `docs/conventions.md` "Human labor and communication" carries §2; oshi text-only gate green; dispositions in `audits/README.md`.

#### W08a — Define the package evidence category

**Status**: done
**Depends on**: W02; field 6 acceptance

Define the work package container in the standard: four ledger files by closeout plus evidence directories created on demand. Evidence is package-local — named by `summary.md`, archived with the package, no docs-page budget, never a durable home. The 2026-11-18 six-field report is the basis, field 6 `accepted` (route `on recommendation`), and ADR-0021 records the decision. `scripts/doc-checks.ts` gains the package check; the norm, template, index, skill and checker state the same rule.

**Done when**:

- field 6 reads `accepted` with owner, date, and route
- `GLOSSARY.md`, `docs/structure.md`, `template/core/docs/structure.md`, `docs/norm/rules.md`, `docs/norm/flow.md`, `work-packages/README.md`, `template/effort/`, `scripts/doc-checks.ts`, and `SKILL.md` state the same rule
- the new ADR records the decision; ADR-0009 and ADR-0017 are clarified, not rewritten
- `rg -n 'four files'` live survivors are "four ledger files" or frozen records with an explanation
- `bun scripts/check.ts` passes on the three archived packages and `rollout-oshi` without a false positive
- the standard gate is green

**Evidence**: decision report 2026-11-18 (field 6 `accepted`, route `on recommendation`); ADR-0021; `a2848c8`; gate `PASS — 99 markdown files`; the package check covers the three archived packages and this one; the old-count-phrase survivors are all frozen records.

#### W03 — Move the four role destinations

**Status**: done
**Depends on**: W02; W08a

Create `docs/contracts/` and `docs/architecture/`; split `docs/designs/` (4 files, 88,581) and `docs/specs/` (7 files, 146,716) by admission: contracts (a fact a consumer may rely on, including the four UI specifications), architecture (system organization only), operations, conventions. A source directory maps no role; the section decides. The accepted map is `maps/w03-role-map.md`: 19 contract pages, 6 architecture pages, 4 operations pages, 10 tombstones. Leave tombstones for cited paths and register both old directories as `legacy path` rows; the four frozen citations the drops degrade are carried by W08.

**Done when**:

- every page under `docs/contracts/` and `docs/architecture/` passes the admission; the operations merges and conventions additions land
- `docs/contracts/README.md` and `docs/architecture/README.md` index their pages
- every moved page is inside oshi's budget for its role
- the old paths are tombstones or registered legacy paths
- oshi's gate is green

**Evidence**: `maps/w03-role-map.md` "Applied results" — the commits, measured volumes, the five corrections to the accepted map, and the per-commit gate results. Pointer proof: `git grep -n 'docs/designs/\|docs/specs/'` survivors are the two adapter legacy rows, the frozen citers, and the new pages' `Source` headers.

#### W04 — Move the knowledge role

**Status**: done
**Depends on**: W03

Split `docs/notes/` (11 files, 90,429) into `docs/knowledge/guides/` for methods that change what a maintainer does and `docs/knowledge/notes/` for observations that do not yet justify a guide. `pitfalls.md`, `knowledge.md`, and `python-env-convention.md` are guides by the audit's reading. Add `docs/knowledge/README.md`; leave tombstones for cited files.

**Done when**:

- each note is a guide or a case by admission, or it stays with a recorded disposition
- every page is inside its hard line; `pitfalls.md` at 15,283 is above soft, and its split is W06's per the plan's "split after the role is at home"
- no living pointer resolves to the five moved paths; every survivor is explained
- oshi's gate is green

**Evidence**: `maps/w04-role-map.md` "Applied results" — `e4b96c8` and `55cea2d`, the repointed pages, the `docs/notes/` legacy row, the pointer proof, and the gate. Acceptance amended 2026-11-19 (A): the split is guides and cases, and six pages stay as a registered legacy path.

#### W04b-i — Extract the admitted jobs from the residue

**Status**: done
**Depends on**: W04

Two of the six pages hold a job that is admitted and homeless: `recognition-pipeline.md` §3's tuning method (a guide) and `classifier-vs-prototype.md`'s choice with a rejected alternative (an ADR). The other four hold no job a role takes, so they wait for the ruling in W04b-ii. A page that duplicates a contract or architecture page is retired with a tombstone, not relabelled to fit; the freeze holds while this runs.

**Done when**:

- the method and the decision each have one home, and no page states the same rule twice
- the retired path is a tombstone and its frozen citers resolve
- oshi's gate is green

**Evidence**: oshi `a9300cc` (`knowledge/guides/threshold-binding.md`, 1,292; `recognition-pipeline.md` §3 becomes a pointer), `adbebc5` (`decisions/ADR-0013-no-in-project-classifier.md`, 4,047; `classifier-vs-prototype.md` → tombstone, 132); index rows added; prose 260 files, ruff green, every relative link resolves; `git grep` over the retired path returns three frozen records. `data-integrity.md` held no claim that was not already stated elsewhere, so it had nothing to merge; the per-page pass is in `maps/w04b-role-map.md`.

#### W04b-ii — Decide whether explanation is a role, then route the five pages

**Status**: done
**Depends on**: W04b-i

One ruling opened this unit, and the maintainer made it on 2026-11-19: no new role — the explanation register dissolves into architecture, `GLOSSARY.md`, `docs/operations/` and tombstones. Each of the five pages was then either extracted into a role that admits its job or dropped with the pointer fixes a living reader needs.

**Done when**:

- the ruling is recorded, and every page has a disposition that follows from it
- the pages it lands in pass their admissions and hard lines
- `docs/notes/` holds no live page; the adapter row retires when the last tombstone does
- oshi's gate is green

**Evidence**: oshi `c4e0a93` (`knowledge/guides/choosing-a-dependency.md`, 1,099), `869e762` (`GLOSSARY.md` 2,226 → 3,577; `annotation-eval-terms.md` → tombstone, `recall-vs-coverage.md` deleted for having no citer), `ac68abe` (`knowledge.md` → tombstone), `6205394` (`data-integrity.md` and `recognition-pipeline.md` → tombstones, plus the pointers in `README.md`, `embedding-fundamentals.md`, `pitfalls.md` and the pose probe). `docs/notes/` holds 10 tombstones and a README that indexes them; the adapter row says "closed". `git grep` over the five retired paths returns frozen records and the two `Source` lines only; prose 260 files, ruff green. No ADR-0014: ADR-0013's background already carries the zero-training rationale. Report in `maps/w04b-role-map.md`.

#### W04c — Admit the explanation form the five pages needed

**Status**: done
**Depends on**: W04b-ii

The maintainer's ruling was to dissolve the five pages into a new form, then let that practice justify a standard change. The unit was therefore a standard refinement: the knowledge role gains a fourth form, and oshi is its first application.

**Done when**:

- the rule is in `docs/norm/roles.md` with its places that must move with it, and the gate is green
- the form's restraint is normative, not advice: every section ends at its owner, a needed definition is one line, a mostly-link page is an index
- the target page set passes the form's own check, and every relative link resolves
- the record names what the form costs

**Evidence**: standard `13ed7ae` — fourth knowledge form in `docs/norm/roles.md`, role-boundary test, `DOC_ROLE_PATHS`, `explainerSections` with two tests, `docs/workflow.md` mapping row; gate PASS (107 markdown files, 65 tests). oshi `c30d17f` — `docs/knowledge/explainers/` README plus `recognition-pipeline.md` (11,614), `data-and-filesystem.md` (6,644), `reading-the-numbers.md` (14,835); three blocks stayed at their owners (threshold guide, glossary, annotation operations); `docs/notes/` keeps ten tombstones, three forwarding into `explainers/`; every `##` section carries a link, every relative link resolves, prose 264 files with 0 wrapped blocks, ruff green. Report in `maps/w04c-explainer-role.md`; correction entry in `audits/move-records.md`.

#### W05 — Place the toolchain role

**Status**: done
**Depends on**: W04

`docs/stack.md` (10,524) mixed toolchain traps, runtime choices, and deferred items. Split it: traps with the command that reproduces them to `docs/toolchain/python.md` if the toolchain admission held, the choices to an ADR with their rejected alternatives, the deferred items to oshi's backlog; if only one trap reproduced, the traps stay in `AGENTS.md` and no toolchain page is created.

**Done when**:

- `docs/stack.md` is gone and each part is at its role
- the toolchain page exists or its absence is recorded
- oshi's gate is green

**Evidence**: `maps/w05-toolchain-role.md` carries the role pass and the applied results. oshi `50d2eb3` (toolchain README 1,136 and `python.md` 4,008, three traps reproducing on 2026-11-19; `AGENTS.md` reduced to a gate clause), `d6a11e5` (ADR-0014, ADR-0015), `720b83b` (B-26, B-27), `9f519dc` (charter container non-goal), `9c27e08` (tombstone and three living pointers). C1–C4 text gate green; C5 full — 658 passed / 1 skipped, `ty` clean, prose 270 files, frontend `bun run validate` 86 tests. Pointer proof: `git grep 'docs/stack.md'` survivors are B-12's dated measurement, the compound-engineering plan, and the two records' `Status` rows — frozen citations and provenance, all resolving.

### P1b — The role set completed

#### W05b — Place the four pages no work item owned, and remove the one over a hard line

**Status**: done
**Depends on**: W05; C4 on R1 (settled)

P1's exit condition named charter, contracts, knowledge and toolchain, and all four reached their homes. The migrate protocol's last step — list what is left — was never run, so four live pages with consumers still held no role: `docs/testing.md` (7,500), `docs/mutation-testing.md` (9,311), `docs/language-policy.md` (2,965), and `docs/development-workflows.md` (16,611, over the 16,000 hard line). The role pass is `maps/w05b-residual-role-pass.md`; one role per commit, a closed package's citation answered by a tombstone, an open package's pointer repointed.

**Done when**:

- each job is at an admitted home, or has a disposition recorded in the map
- `AGENTS.md` carries the test red lines; no second decision page restates ADR-0015's tool choice
- `docs/development-workflows.md` is gone and its three jobs sit with their roles
- the four old paths are tombstones; every living pointer is repointed and every frozen citer resolves
- the page over a hard line is removed rather than carried into W06
- oshi's gate is green

**Evidence**: standard `0d3a5a1` (Suite tracks admitted; gate PASS 112 files / 66 tests), `06aeb6d` (base rule plus deviations), `a241462` (Governance retired; gate PASS 111 files / 66 tests). oshi: C4 `0e57e99` (suite-tracks 8,864, structure 7,439, guide 4,687, tombstone 54), C1 `55e6b0c` (guide 7,191, `AGENTS.md` 7,562), C2 `410fb16` (guide, case 2,878, ADR-0015 5,677), C3 `fc17b18` (conventions 14,092, tombstone 53). Every commit: text-only gate green (ruff check / format, prose 272 → 275 files, 0 wrapped) and every relative link under `docs/` resolving. Per-commit volumes, pointer proofs and survivor lists are in `maps/w05b-residual-role-pass.md` "Applied results".

#### W05c — Give the two required roles a home, and record the third's retirement

**Status**: done
**Depends on**: W05b

Three roles the standard called always-present or first-use had no page: `docs/committing.md` (no commit-message rule existed anywhere), `docs/workflow.md` (its lifecycle job was split between `tasks/README.md` and the suite map), and `docs/governance.md`. R2 settled on 2026-11-19: a suite track does not replace either role — the repository states the base rule, and the page is a base pointer to the norm source plus this repository's deviations. R3 settled the same day: Governance is retired as a role (ADR-0027), its subjects living in `docs/norm/flow.md`, `docs/norm/rules.md`, `AGENTS.md` and the review archive rule. Two pages get written, one disposition recorded, and `tasks/README.md` keeps the suite's package shape while pointing at `docs/workflow.md` for the lifecycle.

**Done when**:

- `docs/committing.md` exists as a base pointer plus deviations and is inside its 5,000 line
- `docs/workflow.md` exists as a base pointer to the norm source plus deviations, restating nothing the norm states
- `AGENTS.md` carries the `Norm source:` line the pointers resolve against
- no `docs/governance.md` is created; the oshi-specific authorization deviation is recorded where it lives, with a one-line pointer from wherever a reader would look
- the work-package index's placement inside a suite track has a recorded disposition
- `docs/README.md` indexes whatever exists and states no counts
- oshi's gate is green

**Evidence**: C5 — oshi `4b8d53c`: `docs/committing.md` 1,306 as a base pointer with one deviation (scope vocabulary); `AGENTS.md` 7,796 with the `Norm source:` line; `docs/README.md` gains its row. C6 — oshi `4e1da3e`: `docs/workflow.md` 2,066 as a base pointer with three package-layout deviations; `tasks/README.md` 936, its restated rules replaced by pointers; `docs/adapters.md` records the index's placement. C7 — oshi `8e16fe5`: no governance page; `docs/README.md` 4,650 names where the retired role's subjects live. All three: text-only gate green, prose 277 files.

### P2 — Page repairs and audit closeout

#### W06a — Give the status page back to its role

**Status**: done
**Depends on**: W05c

`docs/status.md` passes the Status admission — current phase, what works, what does not, next action, links to packages — and fails three discriminations: it also serves as the instruction layer (§7), as a contract (§4 "Storage"), and as a record (§5 "Known gaps"), and its next-action section carried a "Done (11-15)" block of finished work, which the role's own exit forbids. Measured 2026-11-19 at `8e16fe5`: 4,093 non-whitespace characters, roughly 1,900 of them belonging to a role that is not this one.

Each block moves to the page that admits it. Three of the four red lines already have a rule elsewhere (`docs/contracts/data-rules-decisions.md`, `docs/conventions.md` §9 and §2.1 with `docs/plans/m1-plan.md` §2), so §7 becomes a pointer; the fourth, the M7 freeze, had no other home and moved to `AGENTS.md`. Storage becomes two links to the config and backup contracts; the done list collapses into the backlog items and packages that already carry those facts and hashes. The known-gaps list stays — "what does not work" is the role's own wording — and loses the milestone stamp's claim of currency and the sentence that made it a record. §1 becomes a pointer, and §3 keeps its measurement with the date in the title.

The budget unit rode with the item: `docs/conventions.md` §8.6 and `tests/test_status_cap.py` counted raw characters against a 5,000 cap while the norm counts non-whitespace and gives an EN page 10,000. The local line stays as a deliberate tightening, and §8.6 and the test say so.

**Done when**:

- every block on the page serves the Status admission; red lines are in the instruction layer and the page points at them
- no rule is stated twice (`rg` on each moved rule returns the owning page only)
- storage resolves through `docs/contracts/`, with no restatement on status
- the gap list states which measurement it reports, and no longer claims to be a record
- §6 states a next action and a closure reason, with no list of finished work
- the budget unit is stated, and `docs/conventions.md` §8.6 and `tests/test_status_cap.py` agree with it
- oshi's gate is green

**Evidence**: five commits, one per job. `13c060f` — the three red lines already in `AGENTS.md` stay there and the M7 freeze joins them; §7 stays as a pointer because the embedding-coverage tracker cites it in eight places. `2923344` — §4 names the config and backup contracts. `1a6c232` — the gap list keeps its role and loses its record claim. `259b3fa` — §1 becomes a pointer, §3's title carries its dates. `3b66d71` — §8.6 and the cap test state the unit and the tightening's reason. Status 4,093 → 3,840 non-whitespace, 4,825 → 4,548 raw against the 5,000 cap; gate green on every commit.

#### W06 — Fit oshi's role pages to their budgets

**Status**: todo
**Depends on**: W05c; W06a for the status row

Re-measure every role page after W05b–W05c; the audit's 29 breaches were a 2026-11-16 snapshot, and the C4 list was a snapshot of a smaller tree. Measured 2026-11-19, four pages are over their hard line and none was in W06's scope: `docs/reviews/README.md` (13,323 / 12,000 index line), `docs/backlog/B-13-degenerate-crops.md` (13,875 / 8,000 item line), `docs/development-workflows.md` (16,611 / 16,000), which W05b removes rather than this split, and `experiments/README.md` (21,457 / 12,000 directory-README line) — the third was missing from the earlier list, and it is also the page finding 9 names for its counts. Over soft: `contracts/schema.md` (12,273), `contracts/ui-label.md` (12,251), `contracts/ui-audit.md` (12,185), `architecture/components-decision.md` (10,911), `contracts/data-rules-ingest.md` (10,009), `docs/conventions.md` (12,056 after W07b's conversion, from 14,441; over the 10,000 soft line, clear of the 16,000 hard one), `knowledge/guides/pitfalls.md` (15,341), `knowledge/explainers/reading-the-numbers.md` (15,023), `knowledge/explainers/recognition-pipeline.md` (11,614), and the storefront `README.md` (10,564). Split by topic, not by length. Trim each index to one line per child (`docs/reviews/README.md`, `docs/backlog/README.md`, `docs/README.md`), keep the storefront README to what, install, and prove, and link the history. Split a page after its role is at home, never in the same commit as a move.

**Done when**:

- every role page is inside its hard budget
- index pages state no counts
- oshi's gate is green

**Evidence**: pending

#### W07 — Close the audit's remaining findings

**Status**: doing
**Depends on**: W06

Give every finding in `audits/oshi.md` a disposition; the ledger is the findings table in `audits/README.md`. This item is the umbrella over the findings that still need a repair or a ruling; the ruling-free batches became W07a–W07e, and W07f took the stub question to the standard — all six are closed. What remains under it: index autonomy in `experiments/README.md`, `docs/plans/README.md`, and `docs/reviews/README.md` (finding 9; the `docs/adrs/` README went with the decisions move); `archived/` as a fifth deletion exception with its 20 citations (6); `docs/adapters.md` "Freeze" states where new files may go, and the adapter registry's admission does not name it; `web/README.md`'s table is padded by the frontend `oxfmt` invoked from `format:check`, which puts R12's no-padding rule out of reach there without a toolchain change. Finding 17 is resolved (`fb6701e`); finding 11 was W06a's; finding 1 stays with `B-0007`. A finding that needs a rule in the standard goes to W08 instead of being fixed locally.

**Done when**:

- every finding is resolved, withdrawn, or filed as a backlog item
- the dispositions are recorded in `audits/README.md`
- oshi's gate is green

**Evidence**: pending

#### W07a — Repair the pointer and index residue

**Status**: done
**Depends on**: W05c

Seven text-only commits for the residue that needed no ruling: the docs index stops offering `designs/`, `plans/`, `specs/` and `notes/` as landing points, states the three missing top-level pages and the README-less tombstone shelves; `docs/plans/README.md` sends specifications to contracts and models to architecture; `docs/conventions.md` §8.1 and §8.5 name explainers and toolchain; `docs/committing.md`'s scope vocabulary grows to 26 entries; `docs/status.md`'s local-command count matches the five it runs; two knowledge READMEs resolve their `Source` rows through the norm-source token; `docs/adapters.md` records three designs tombstones rather than four and whitelists the notes README.

**Done when**:

- every changed page's relative links and cited paths resolve
- the oshi text-only gate is green

**Evidence**: oshi `166cab9` (docs index and `structure.md`), `99eb712` (plans governance), `b924e30` (conventions §8.1/§8.5), `74f7c0f` (commit scopes), `5a82c5c` (status count), `764a2c7` (norm-source paths), `f8f1f70` (adapters counts). Each: ruff check and format green, prose 277 files with 0 wrapped blocks, every relative link verified with `Test-Path`.

#### W07b — Convert `docs/conventions.md` to a base pointer

**Status**: done
**Depends on**: W07a

The last role page that restated the norm while pointing at it: no `Base` row, no last-read date, and the citation, prose, padding and record rules written out beside the repository's own. The page becomes `Base`, `Last read` and three deviations — the language matrix, the status cap and its unit, numbered citations — with every other section a forwarding stub. Seven commits: the `{{NORM_SOURCE}}` token gets its one definition; §1 and §3 become one guide, since their two sections are one method's two moments; §2.1's enforced half moves to the contracts page as §4.8 beside the holdout exclusion it belongs with; the skipped review round is recorded where a reader looks for it; five circular pointers are repointed.

Numbered headings survive on purpose: roughly forty citations in frozen records name `§N`, and frozen records are never rewritten. What the page still carries is local to this repository: the language matrix, the directory-README procedure, ten document-discipline items, the labor rules and the write boundary's one-command checks.

**Done when**:

- the page states its base, its last-read date and its deviations, and restates no norm clause
- every rule that moved has one home, and each §N citation still resolves
- the oshi text-only gate is green

**Evidence**: oshi `c34f501` (norm-source token defined), `4ceef45` (`knowledge/guides/locked-definitions.md` and its index row), `d563883` (`data-rules-decisions.md` §4.8), `5e3938f` (reviews governance records the skipped round), `1a85f34` (the conversion), `22f84a1` (five circular pointers), `edcfe25` (§1 and §3 leave their text to the guide). Page 14,441 → 12,056 non-whitespace; every commit ruff- and prose-green (277 → 278 files, 0 wrapped) with every relative link and cited path resolving. Known residue: three `.scratch/embedding-coverage` tickets cite `docs/conventions.md:11-13`, a line range that now lands in the deviations table — the §1 heading resolves the intent, the line numbers cannot.

#### W07c — Drop the document-version rule the standard declines

**Status**: done
**Depends on**: W07b

An audit of §8 against the base found one real conflict and one second home. The conflict: §8.1 required version numbers in each document's header, and the docs, scripts and web READMEs carried `Version` rows, while the base keeps no changelog and no version number (`docs/norm/roles.md` "Roles that are deliberately absent", `docs/norm/foundations.md`). Nothing enforced the rule, and every surviving version table belongs to a frozen record that §8.7 already allows. The second home: §8 item 8 repeated `docs/committing.md`'s commit cadence word for word; it is a pointer now.

The audit found the rest of §8 consistent — two declared deviations, one citation deviation, and local discipline the base is silent on — and exposed that `web/README.md`'s table is padded by the frontend `oxfmt`, so R12 cannot hold there without excluding markdown from the formatter; that is filed as a finding.

**Done when**:

- no living page requires or claims a document version table
- frozen records keep theirs
- oshi's gate is green

**Evidence**: oshi `f90b44e` (four files: conventions §8.1 and §7, `docs/README.md`, `scripts/README.md`, `web/README.md`); no living version table survives, the frozen ones stay. Full gate: ruff check and format, `ty` clean, prose 278 files, pytest 658 passed / 1 skipped, frontend `bun run validate` 86 passed.

#### W07d — Decide the retired-path citations in open backlog items and ADRs

**Status**: done
**Depends on**: W07c

Seven citations survive in five open backlog items (`B-2`, `B-3`, `B-4`, `B-12`, `B-22`) and `ADR-0010`: `docs/designs/architecture-v2.md`, `docs/designs/data-model.md`, `docs/designs/per-work-db.md`, `docs/specs/backup-spec.md`, `docs/specs/label-ui-spec.md`, and `docs/notes/*`. Nothing is broken — the tombstones resolve every link — and that is exactly why the item stalled: what has to be decided is whether a citation is a measurement or a present-tense claim. `ADR-0010`'s "The current topology and lifecycle rules are in `docs/designs/per-work-db.md`" asserts where the rule lives today and must move to `docs/architecture/db-topology.md`; `B-3`'s "re-mapped 2026-10-29" reports what a page said on a date, and rewriting it would alter the record. The working rule this item proposes: a citation that asserts where a rule lives now is repointed, a citation that reports a dated state keeps its path. The ruling it needs is whether that is the right line, and whether an open backlog item — open, but frozen at filing — may be edited at all under ADR-0015's "never renumbered" clause.

**Done when**:

- the policy is written, with the split's boundary stated
- every surviving retired-path citation is classified under it, and the repointed ones are changed
- oshi's gate is green

**Evidence**: ADR-0028 writes the split into its frozen-record clause — a present-tense pointer to a rule's home is repointed, a dated report keeps its path — and that clause is what settles "an open item may be edited": yes, under that split only. Classification of the seven: `ADR-0010` repointed to `docs/architecture/db-topology.md` and `docs/contracts/backup.md`; `B-12`'s rule conflict repointed to `docs/contracts/backup.md` §1; `B-2` and `B-4` blast radii, `B-12`'s 20 and 25 lines, and `B-3`'s dated re-map kept, because each reports what a survey found on a date; `B-22` kept, because the item is delivered and therefore frozen. Two pointers of the same class outside the list — ADR-0015's definitions and mutation scope — were repointed with them. oshi `dd2afd5`; text gate green, every relative link resolving. The wider question this item exposed (why the tombstones exist at all) was handed to W07f and answered there by ADR-0028.

#### W07e — Directory READMEs point at the norm instead of restating it

**Status**: done
**Depends on**: W07c

Twelve directory READMEs under `docs/` and `archived/` still carried wording the norm already binds, and most carried no pointer to the row they were copying. Three had already drifted: `docs/backlog/README.md` dropped the norm's `paused` state, `docs/decisions/README.md` said `ADR-NN-<slug>.md` while its header said four digits, and `docs/agents/README.md` still declared "no version header" after W07c removed the rule.

The shape applied: a `Norm` header row naming the role row, the admission and discrimination sentences deleted, and only directory-local content kept — membership, index shape, the repository's own vocabulary. A directory README is not a deviation page, so it takes a `Norm` row, not a `Base` row.

Two pages needed repair rather than trimming: `docs/operations/README.md` gained the header table and governance block §8.1 requires, and `archived/README.md` had its four retired pointers moved to live targets. The archived records keep their own conclusions, and W07d still owns citations inside frozen records.

**Done when**:

- every directory README either names the norm row it applies or carries no norm wording at all
- no directory README contradicts a norm role row (statuses, naming widths)
- oshi's gate is green

**Evidence**: oshi `c430dad` (eight READMEs: `Norm` rows, the backlog status pointer, the two-digit ADR naming line gone), `f02544c` (operations governance block; architecture and agents bookkeeping), `9edbea9` (archive index repointed at `docs/architecture/`, `docs/decisions/ADR-0010-per-work-db.md` and `docs/architecture/db-topology.md`), `3ecb1de` (the stub inventory: 30 tombstones carry 217 citations, one uncited and deleted, 29 load-bearing). Text gate green: ruff check and format, prose 278 → 277 files with 0 wrapped blocks. The shape follows `template/first-use/docs/backlog/README.md` and `docs/norm/roles.md`, "Directory index", so no page enters the standard. A request to consolidate or delete the surviving stubs was measured and declined: it is ADR-0011's two rejected options, and the citations that keep them alive sit in frozen records and `Source` provenance rows. Superseded 2026-11-19: the maintainer asked again, this time to change the standard rather than to weigh the options inside it, and W07f granted the deletion (ADR-0028). The measurement stays accurate and became ADR-0028's cost figure, corrected to 31 files once `docs/backlog.md`'s `(moved)` variant was counted in.

### P3 — Closeout

#### W07f — Retire the forwarding stubs and register the moved paths

**Status**: done
**Depends on**: W07d

The maintainer asked twice to delete the residual redirect files. The first answer measured them and declined, on ADR-0011's authority; the second asked for a standard change instead, and the ruling was "directories over one saved click". ADR-0028 retires the Tombstone role: a moved path is one `docs/adapters.md` row, the old path keeps no file, and a citation resolves three ways — the registry row, the successor's `Source` row, `git log --follow`. Oshi applies it: 31 files deleted across five directories, 12 `moved path` rows added, the index and the four pages that described the shelves rewritten, and the present-tense pointers repointed while dated reports keep their paths.

**Done when**:

- the standard states the rule, and the checker treats a title ending `— moved` as a finding
- no file exists at a moved path, and every retired path is an adapter row with a retirement condition
- every live page's relative links resolve
- both gates are green

**Evidence**: standard `0291824` — ADR-0028, ADR-0011 superseded, `norm/roles.md` (Tombstone row and discrimination gone, Adapter admission extended), `norm/rules.md` (budget row and exception 4 gone), `norm/flow.md`, `docs/workflow.md`, `GLOSSARY.md`, `scripts/docs-model.ts` (`MOVED_MARKER`), `scripts/doc-checks.ts` (`movedStubs`), both test files, `template/effort/docs/adapters.md`; gate PASS 112 markdown files / 62 tests. oshi `e040e5f` — 31 deletions, `docs/adapters.md` rewritten with 12 rows, `docs/README.md`, `structure.md`, `conventions.md` §8, `plans/README.md`, `operations/README.md`; `dd2afd5` — the pointer repairs. Full gate: ruff check and format, `ty` clean, prose 246 files with 0 wrapped blocks, pytest 658 passed / 1 skipped, frontend `bun run validate` 86 passed; the relative-link sweep over every tracked markdown file returns one pre-existing template placeholder under `.scratch/embedding-coverage/` and nothing else.

#### W08 — Fix the standard gaps the rollout exposed

**Status**: todo
**Depends on**: W07

Fix the standard gaps oshi exposed. Each gap becomes an ADR, a spec change, or a backlog item; no one-off role or budget for one repository. One remains after W08a: `scripts/docs-model.ts` accepts `ADR-\d{4}` and `B-\d{4}` only, while ADR-0015 keeps a migrated backlog's width, so the portable checker (`B-0002`) must accept `B-<n>` as well. The other — ADR-0011's cited sample (`docs/backlog.md`) ending `(moved)` and failing the admission it documents — closed with the role itself: W07f retired it (ADR-0028), and the checker now flags the marker instead of shaping it. W03 adds four records here: the drops degrade the frozen citations of `architecture §7`, `annotation §12`, `annotation §8.1`, and `Q3`'s landing point; each needs a written disposition (exception, pointer, or backlog item), and Q3 must name where the milestone re-sequencing now lives. W03 also moved the design system back to contracts, which leaves the standard's architecture admission narrower than the earlier cut assumed — W08 checks it against the remaining four repositories' design docs before the role is declared settled. The package evidence category and the `work-packages` checker coverage are W08a, before W03. W04 raised the explanation-home question — a zero-background system explanation had no admitted role, five residue pages carried that register, and `AGENTS.md` norm 3 sent every recurring concept to `docs/notes/` — and W04b-ii settled it on 2026-11-19: no role is admitted, the pages dissolved into architecture, `GLOSSARY.md` and adapter rows, and norm 3 now points at the guide and case homes. The standard still has no place for a teaching page; if a second target produces the same pressure, that is the evidence this ruling lacked.

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
