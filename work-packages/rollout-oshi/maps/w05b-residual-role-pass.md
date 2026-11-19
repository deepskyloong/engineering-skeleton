# W05b — the four pages with no role, and the three roles oshi never created

- Date: 2026-11-19
- Source: oshi `9c27e08` (clean tree), worktree `E:\Projects\oshi\.worktrees\skeleton-migration` on `feature/skeleton-migration`; standard `2819ab8`
- Status: closed 2026-11-19 — C4 `0e57e99`, C1 `55e6b0c`, C2 `410fb16`, C3 `fc17b18`; R1/R2/R3 settled in the standard (`0d3a5a1`, `06aeb6d`, `a241462`). W05c continues from this map's R2/R3 sections.
- Role basis: `docs/norm/roles.md`, "Always present", "Present from the first real use", "Optional, admitted by trigger", "Five discriminations"; `docs/decisions/ADR-0010-suite-tracks-are-adapters.md`
- Measure: non-whitespace characters, table delimiter rows excluded (`docs/norm/rules.md`, "Measuring"), taken 2026-11-19 on the worktree above

`Unit — place the four live docs pages that hold no role and the three roles the standard requires, before P2 measures pages against budgets · Recommend — A — two work items, one role per commit, standard-first where a ruling changes the norm · Class — target wrong`

## Why this unit exists

P1's exit condition named four roles — charter, contracts, knowledge, toolchain — and all four are at their canonical paths. The migrate protocol's last step, "add the target repository's remaining roles to `docs/backlog/` with a revisit trigger, or stop and report what is left", was never run. Four live pages with consumers and no role survived W05, and three roles the standard calls always-present or first-use never got a page. P2 cannot absorb them: a budget measures a role page, and a page without a role has no budget to be measured against.

## Decision report

**1 Rule and source**

- Guide — "A method that changes what a maintainer does next time"; source `docs/norm/roles.md`, "Optional, admitted by trigger", knowledge guide row. Apply sample: `docs/knowledge/guides/pitfalls.md`, `python-env-convention.md`, `threshold-binding.md`.
- Instruction layer — "Red lines, exact commands, the gate, the routing table, the anti-regrowth clause"; same page, "Always present". Sample: `AGENTS.md` "Gate".
- ADR — "A choice with rejected alternatives that a future maintainer would otherwise relitigate"; same page, "Present from the first real use". Sample: ADR-0013, ADR-0014, ADR-0015.
- Knowledge case — "One incident, with the evidence that settled it". Samples: `docs/knowledge/cases/gt-error-audit.md`, `prototype-curve-reading.md`.
- Structure — "Levels (root / member / module), placement rules, artifact tiers; membership lives in each directory README"; same page, "Always present". Sample: `docs/structure.md` itself.
- Conventions — "Language, naming, citation, the five discriminations; a target page points at the norm source and records deviations". Sample: `docs/conventions.md`.
- Adapter registry — "Foreign suites' owned track roots (permanent) and legacy paths (retirable), the whitelist, and the disposition". Sample: `docs/adapters.md`, but its admission does not name a per-suite map; ADR-0010's Consequences keep `docs/development-workflows.md` as that map. This is the contradiction R1 resolves.
- Committing — "A base pointer to `docs/norm/committing.md` plus this repository's deviations"; "Always present".
- Operating modes — "The effort lifecycle: tracks, t0 fields, permitted compromises, and the closeout procedure"; "Present from the first real use".
- Governance — "Versioning, change surface, ownership, review, retirement; joins with the first work package"; "Present from the first real use".
- Owner — the maintainer (session user). R1 and R2 are standard questions, not local exceptions.

**2 Target now**

- `docs/testing.md` (7,500) serves two jobs and claims authority ("How to write tests … are governed by this file") that a guide cannot carry. Its method sections and its red lines cannot share a home.
- `docs/mutation-testing.md` (9,311) serves three jobs. The tool choice is already decided in ADR-0015; only the three rejected candidates are missing from its rejected table, so a second decision page would split one choice across two records.
- `docs/language-policy.md` (2,965) restates the conventions role at a second path. `docs/conventions.md` (11,760) carries no language section, so the role is split, not duplicated.
- `docs/development-workflows.md` (16,611, over the 16,000 hard line) serves three jobs and one of them has no admitted role. Its Principle restates `docs/adapters.md` "Rules" items 1 and 2 verbatim in substance, so one rule already has two homes.
- Missing roles: `docs/committing.md` (always present; the repository has no commit-message rule anywhere), `docs/workflow.md` (its job is split between `tasks/README.md` "Closeout checklist" and `docs/development-workflows.md` "Tracks"), `docs/governance.md` (seven closed packages exist; the job is scattered across `docs/conventions.md` "Review cycle", `AGENTS.md`, and each directory README's governance block) — the third was retired as a role in R3 (ADR-0027).
- Placement deviation: the work-package index role sits at `tasks/README.md`, inside the `addyosmani/agent-skills` track. The whitelist tolerates the file; no row says the role lives there.
- Registry defects: `docs/adapters.md` "Legacy designs home" says all four tracked files are tombstones, and only three exist (`README.md` was deleted in `5f9df75`); `docs/README.md` "What goes here" still says the notes explainers "await their role (W04b)", which W04c settled on 2026-11-19.
- Coherent — each page is internally consistent and has consumers; the incoherence is placement, not content. Baseline: oshi `9c27e08`, standard `2819ab8`.

**3 Action**

- Change — `A — two work items, one role per commit`.
  - **W05b C1 testing** — the two invariants, the four zeros, and the pre-commit checklist join `AGENTS.md` "Gate" as red lines; the method sections become `docs/knowledge/guides/testing.md`; `docs/testing.md` becomes a tombstone linking the guide.
  - **C2 mutation** — the three rejected candidates join ADR-0015's rejected table; the method becomes `docs/knowledge/guides/mutation-testing.md`; the 2026-10-28 first round and install log become `docs/knowledge/cases/mutation-first-round.md`; `docs/mutation-testing.md` becomes a tombstone linking the guide.
  - **C3 language** — the language rule and the CJK matrix join `docs/conventions.md`; `docs/language-policy.md` becomes a tombstone linking that page.
  - **C4 suite map** — after R1: the track map joins `docs/adapters.md` (widened admission) or a named role; "Boundary with repo-owned docs" joins `docs/structure.md`; "Isolated checkouts" becomes `docs/knowledge/guides/isolated-checkouts.md`; `docs/development-workflows.md` becomes a tombstone linking `docs/README.md`.
  - **W05c C5 committing** — `docs/committing.md` as a base pointer plus this repository's deviations (none today); no commit-message norm is restated.
  - **C6 workflow, C7 governance** — after R2 the workflow page is a base pointer plus deviations; after R3 (ADR-0027) governance has no page, so C7 records where its two jobs land instead.
- Check — oshi's gate per commit; C1–C4 and C6–C7 are text-only unless a page under `web/` or `docs/status.md` changes. Pointer proof per path with `git grep -n 'docs/<path>'`; every survivor named as a frozen citer or repointed in the same commit.
- Stop — a page that fails its admission after the split; a citer that is neither frozen nor repointable; R1 or R2 unresolved when its commit comes up.
- Expected — no live `docs/` page is outside the role table; three required roles have a home or a recorded standard disposition; both gates green.

**4 Risks**

- Frozen citers — `tasks/manual-character-registration` (closed) cites `docs/testing.md` and `docs/development-workflows.md`; `docs/superpowers/b13-*` and `b16-*` (closed suite packages) cite `docs/development-workflows.md`; the CE plan cites it too. Each keeps its citation and resolves through a tombstone; the open `tasks/head-kind-experiment` is repointed in the same commit.
- Budget — `docs/conventions.md` gains about 2,900 and lands near 14,700: inside the 16,000 hard line, over soft. W06 owns the split, not this unit. C4 removes the 16,611 page rather than splitting it here.
- Standard change — R1 and R2 change `docs/norm/roles.md` before oshi moves, and the standard gate runs first. A local exception would fork the norm for one repository.
- Revert — each oshi commit reverts independently; the standard's ruling commit is separate. Tombstoned content stays in `git log` at `9c27e08`.

**5 Alternatives and the ask**

- Rejected `B — register the four pages as legacy paths` — a legacy path is for a frozen citation; these pages are live knowledge with live readers, and the row would freeze content that still needs editing.
- Rejected `C — fold testing into contracts` — a consumer cannot file a bug on "how to write tests"; the durable-fact admission does not take it.
- Rejected `D — admit a testing-conventions role` — the guide and the instruction layer already admit both jobs; a new role for one repository is what the hard rules forbid.
- Rejected `E — keep the suite map in `docs/development-workflows.md` and add a role for it` — one target's page becomes a standard role; the alternative is recorded so the maintainer can still choose it, but it belongs in the standard's backlog, not in oshi's tree.
- Ask — `R1: does the per-suite map join the Adapter registry admission (recommended) or become its own role?`; `R2: do suite tracks replace the workflow and governance roles (recorded in the standard), or does oshi get one page each?`; `Accept A?`
- Note — C1–C3 and C5 do not depend on either ruling and can start now.

**6 Decision**

- `Status` — R1 accepted 2026-11-19 as option 4: a new role, Suite tracks, at `/docs/suite-tracks.md`, recorded in `docs/norm/roles.md` and ADR-0026. R2 settled 2026-11-19: no replacement; the repository states the base rule, the suite track records only deviations, and the repository's page is a base pointer to the norm source (standard `06aeb6d`). R3 settled the same day: Governance is retired as a role, its subjects distributed to the norm and `AGENTS.md` (standard `a241462`, ADR-0027).
- Applied — C4 in oshi `0e57e99`; the measurements, pointer proof and gate are under "Applied results".

## Applied results

C4 — the suite map's role, oshi `0e57e99` (2026-11-19), standard `0d3a5a1`:

| Page | Volume before | Volume after | Role |
| --- | --: | --: | --- |
| `docs/development-workflows.md` | 16,611 | 54 (tombstone) | removed; tombstone links `docs/README.md` |
| `docs/suite-tracks.md` | — | 8,864 | Suite tracks |
| `docs/structure.md` | 4,369 | 7,439 | Structure, plus "Suite-owned paths" |
| `docs/knowledge/guides/isolated-checkouts.md` | — | 4,687 | Knowledge guide |

- Repointed in the same commit: `AGENTS.md` "Workflow tracks", `docs/README.md`, `docs/adapters.md`, `docs/agents/README.md`, `docs/backlog/README.md` (two lines), `docs/backlog/B-26-ci-service.md`, `docs/structure.md`'s `tasks/` row, `tasks/README.md`, `tasks/head-kind-experiment/spec.md` (open package), and `.gitignore`'s comment.
- Pointer proof — `git grep -n 'development-workflows' -- '*.md'` survivors are the four closed packages (`tasks/manual-character-registration`, `docs/superpowers/b13-*`, `docs/superpowers/b16-*`), `docs/backlog/B-12`'s dated measurement, the CE plan, and the closed `.scratch/embedding-coverage` effort. Each is a frozen citation that resolves through the tombstone. No non-markdown reference remains.
- Gate — text-only path, as the diff touches no `src/`, `tests/`, `scripts/`, `config/`, `web/`, `pyproject.toml`, `uv.lock` or `.python-version`: `ruff check` clean, `ruff format --check` 230 files, prose 272 files, 0 wrapped blocks. Every relative link under `docs/` resolves. The first gate run re-locked `uv.lock` to a mirror through an inherited `UV_DEFAULT_INDEX` (the trap in `docs/toolchain/python.md`); the lock was reverted, not committed.
- Standard gate after the role was admitted: `bun run gate` PASS, 112 markdown files, 66 tests, one soft `roles.md` warning.

### R2 — the repository owns the base rule, the suite track carries deviations

Ruling 2026-11-19: suite tracks do **not** replace Operating modes or Governance. The repository states the base rule; a suite track records only what it layers on its own artifacts; and the repository's page points at the norm source instead of restating it — the `docs/committing.md` shape, B-0005 Plan item 7. Standard `06aeb6d`:

| Page | Before | After | Why |
| --- | --: | --: | --- |
| `docs/norm/flow.md` | 7,558 | 8,273 | Gains "Who decides and how a change is reviewed": ownership, the ADR requirement, budget-change evidence, the adversarial review format and its adjudication. Governance had no norm source; only the template stated them |
| `template/effort/docs/workflow.md` | 3,328 | 993 | Base pointer to `docs/norm/flow.md` plus a deviations table |
| `template/effort/docs/governance.md` | 1,537 | 826 | Base pointer to `docs/norm/flow.md` (ownership, review) and `docs/norm/rules.md` (change surface, retirement), plus a deviations table |
| `docs/norm/roles.md` | 13,267 | 13,533 | Discrimination pair `Operating modes, Governance / Suite tracks`: a rule that binds every effort belongs to the repository; a suite may narrow only its own artifacts below it |

`docs/workflow.md` gains three mapping rows — a copied lifecycle page, a copied governance page, and a suite track's rule layered on the lifecycle. `docs/norm/README.md` states the pointer model in its status and extends the `flow` question to who decides and review. Gate: PASS, 112 markdown files, 66 tests, one soft `roles.md` warning.

Consequence for W05c: `docs/workflow.md` is a short pointer page — a `Norm source:` line, then a deviations table. oshi has no `Norm source:` line yet, so it carries the absolute path to the standard until that line exists; the page lands with `docs/committing.md` in C6. Governance has no page after R3, so C7 records the disposition instead.

### R3 — Governance retired as a role, standard `a241462`

Ruling 2026-11-19, recorded as ADR-0027: no repository carries an authorization page. The role listed five subjects; four were already norm after `06aeb6d`, and the fifth was provenance plus this standard's distribution model. No target repository ever created it, and the one instance restated four norm sections.

| Change | Page |
| --- | --- |
| deleted | `docs/governance.md` (2,266) and `template/effort/docs/governance.md` (826) |
| moved | provenance and distribution → `docs/norm/foundations.md`; a repository's authorization deviation → a red line or a gate in `AGENTS.md`; ownership and review were already in `docs/norm/flow.md` |
| removed from the role table | the Governance row; the `Conventions / Governance` boundary pair; Governance from the `Operating modes` pair, which becomes `Operating modes / Suite tracks`; the architecture pair becomes `Architecture / Instruction layer` |
| repointed | `AGENTS.md` routing row, `README.md` and `docs/README.md` index rows, `docs/workflow.md` mapping row (target is now "no page"), `template/effort/docs/README.md` (four pages, three), `template/effort/README.md`, `scripts/docs-model.ts`, this package's `audits/README.md` and `tools/audit_repo.py` |

Gate: PASS, 111 markdown files, 66 tests, one soft `roles.md` warning (13,257).

Consequence for oshi: its one governance-class rule — review reports are local archives kept out of git, append-only, index-only in git — already lives in `docs/reviews/README.md` "Governance and maintenance". That is where C7 points; no new page. The residual question, whether an index page may carry rules at all, belongs to W06's page repairs, not here.

### C1 — testing, oshi `55e6b0c`

| Page | Before | After | Role |
| --- | --: | --: | --- |
| `docs/testing.md` | 7,500 | 41 (tombstone) | removed; tombstone links `docs/README.md` |
| `docs/knowledge/guides/testing.md` | — | 7,191 | Knowledge guide (method) |
| `AGENTS.md` | 6,746 | 7,562 | Instruction layer, new "Tests" section |

The page served three jobs. The rules — two invariants and the four zeros — became an `AGENTS.md` section, because they change behavior every time a test is written. The method (layering, data isolation, naming, assertions, determinism, the coverage command, the change flow, the test-layer checklist) became the guide. The known-gaps list stayed with the method: it says where not to look for coverage, which is stable, not a phase fact, so it did not move to `docs/status.md`.

Tombstone rather than a bare delete: seven frozen citations (`tasks/manual-character-registration` ×4, `ADR-0015` ×2, `B-12`'s dated measurement) land in two homes, so the single link points at `docs/README.md`. Living pointers repointed in the same commit: `docs/README.md`, `docs/knowledge/guides/README.md`, `docs/mutation-testing.md` (four citations), `docs/operations/works.md`, `docs/backlog/B-26-ci-service.md` (two). Gate: text-only path — ruff check and format clean, prose 273 files, 0 wrapped; every relative link under `docs/` resolves; `uv.lock` untouched (`--frozen` with the index override cleared).

### C2 — mutation testing, oshi `410fb16`

| Page | Before | After | Role |
| --- | --: | --: | --- |
| `docs/mutation-testing.md` | 9,343 | 49 (tombstone) | removed; tombstone links `docs/README.md` |
| `docs/knowledge/guides/mutation-testing.md` | — | 7,008 | Knowledge guide (method) |
| `docs/knowledge/cases/mutation-first-round.md` | — | 2,878 | Knowledge case (one probe, with its evidence) |
| `docs/decisions/ADR-0015-dev-toolchain.md` | 5,167 | 5,677 | +3 rows in "Rejected alternatives": mutmut, cosmic-ray, mutatest |

The tool choice had an admitted home already — ADR-0015's rejected table recorded "mutation testing over the whole package" but not the three candidate tools the page rejected. The rows were appended, each carrying the sibling project's provenance and the 2026-10-28 date, because the retired page's table was the only surviving evidence for them; ADR-0015's existing citations were left untouched, which is why the tombstone exists. The method became the guide, the probe and the candidate set recorded with it became the case.

The candidate list (`gate.py`, `fuser.py`, `holdout.py`, `diff.py`, `output.py`, `repair.py`, `scan.py`; `assign.py` and `review/apply.py` below the bar) did **not** stay in the guide: it is a dated snapshot of branch coverage, and the guide carries the criteria it is recomputed from.

Pointer proof: `git grep 'mutation-testing.md'` survivors are ADR-0015's two citations, both answered by the tombstone; the sibling references inside `docs/knowledge/guides/testing.md` resolve within the same directory. Living pointers repointed in the commit: `docs/README.md`, both knowledge indexes, `docs/operations/works.md`. Gate: text-only path — ruff clean, prose 275 files, 0 wrapped, every relative link under `docs/` resolves.

### C3 — language policy, oshi `fc17b18`

| Page | Before | After | Role |
| --- | --: | --: | --- |
| `docs/language-policy.md` | 2,965 | 53 (tombstone) | removed; tombstone links `conventions.md` |
| `docs/conventions.md` | 11,760 | 14,092 | Conventions, new §11 "Language" |
| `docs/README.md` | 3,814 | 4,099 | +4 compatibility-redirect rows |

Language is a conventions job by its admission ("Language, naming, citation…"), so the policy folded in rather than surviving as a sibling. It was appended as §11: every existing numeric citation (`§1` / `§2` / `§8` / `§9` / `§10` in the b16 and head-kind specs, the manual-registration ledger) keeps its target, and the new section takes the issue of a renumbering that would have touched four frozen records.

The fold compressed rather than transported: the policy's own header and version line dropped, the six scope rows kept with their examples trimmed, the "never translated" list and the coupled-edit rules kept because they are the operational half, and the PowerShell acceptance check kept because it is the only mechanical test of the rule. `conventions.md` now sits at 14,092 against the 16,000 hard line — the fold consumed most of the headroom W06 would otherwise have.

The tombstone links `conventions.md` directly, unlike C1 and C2: every frozen citer (the b16 package's spec and plan, the b16 labour quote, the manual-registration summary) asks the same question, and it now has exactly one home.

Two pointer decisions worth recording: `docs/README.md` gained compatibility-redirect rows for all four tombstones (`development-workflows.md`, `testing.md`, `mutation-testing.md`, `language-policy.md`), because that page lists its own children and the earlier removals left four files unindexed; and `docs/README.md`'s description of `conventions.md` now names the language section. Repointed from a living page: `AGENTS.md`, `web/README.md`, `B-12`, `tasks/head-kind-experiment/spec.md` (two). Gate: text-only path — ruff clean, prose 275 files, 0 wrapped, links resolve.

### C5 — committing, oshi `4b8d53c`

| Page | Before | After | Role |
| --- | --: | --: | --- |
| `docs/committing.md` | — | 1,306 | Committing, base pointer + deviations |
| `AGENTS.md` | 7,561 | 7,796 | +`Norm source:` line, + the page on the commit path |
| `docs/README.md` | 4,099 | 4,221 | + index row |

The role is always present and oshi had no commit-message rule anywhere — `git grep 'commit message'` returned nothing — so the convention existed only as the practice of whoever wrote the last message. The page is a base pointer, not a copy: the norm owns the header, the seven types, the subject and body rules, the footers and the one-logical-change unit.

One deviation, and it is the one the norm delegates: the scope vocabulary. Scopes are the topic spelled as the repository names it on disk — module or package (`fuser`, `holdout`, `store`, `cli`), area (`web`, `scripts`, `experiments`), docs page family (`conventions`, `decisions`, `knowledge`, `reviews`, `tasks`). The table says a topic outside the list is added in the commit that introduces it; without that clause the scope list becomes the drift the page exists to stop.

`AGENTS.md` gains the `Norm source:` line, which is what `{{NORM_SOURCE}}` resolves against, and it names `docs/committing.md` on the commit path — both obligations the norm places on the project. Not a second document: the page points, `AGENTS.md` routes. Gate: text-only path — ruff clean, prose 276 files, 0 wrapped, links resolve.

## Role pass

| Page | Job | Admission | Trigger | Volume |
| --- | --- | --- | --- | --: |
| `docs/testing.md` | test method: layering, isolation, assertions, determinism, change flow | "A method that changes what a maintainer does next time" | `pitfalls.md` and `python-env-convention.md` are already guides on the same evidence | 5,000 est. |
| `docs/testing.md` | red lines: the two invariants, the four zeros, the pre-commit checklist | "Red lines, exact commands, the gate, the routing table, the anti-regrowth clause" | the same red line already gates every commit in `AGENTS.md` "Gate" | 1,500 est. |
| `docs/mutation-testing.md` | tool choice and three rejected candidates | "A choice with rejected alternatives that a future maintainer would otherwise relitigate" | ADR-0015 records the choice; its rejected table omits mutmut, cosmic-ray and mutatest | 1,200 est. |
| `docs/mutation-testing.md` | method: scope, prerequisites, survivor disposition, commands | "A method that changes what a maintainer does next time" | `threshold-binding.md` is a guide of the same shape | 6,000 est. |
| `docs/mutation-testing.md` | 2026-10-28 first round and install log | "One incident, with the evidence that settled it" | `gt-error-audit.md` and `prototype-curve-reading.md` are cases of the same shape | 2,000 est. |
| `docs/development-workflows.md` | suite map: principle, tracks, adding a track | no admitted role; ADR-0010 keeps the page, `docs/norm/roles.md` does not admit it | one rule already restated in `docs/adapters.md` "Rules" | 8,000 est. |
| `docs/development-workflows.md` | boundary table: repo-owned and suite-owned paths | "Levels (root / member / module), placement rules, artifact tiers; membership lives in each directory README" | `docs/structure.md` already owns the tree and the three legacy shelves | 2,500 est. |
| `docs/development-workflows.md` | isolated checkouts `.worktrees/<name>` | "A method that changes what a maintainer does next time" | two worktree procedures in one page, each with its commands | 3,500 est. |
| `docs/language-policy.md` | language rule and the CJK matrix | "Language, naming, citation, the five discriminations; a target page points at the norm source and records deviations" | `docs/conventions.md` is the role's home and carries no language section | 2,900 est. |

## Roles with no page

| Role | Admission | Home | Measured state |
| --- | --- | --- | --- |
| Committing | "A base pointer to `docs/norm/committing.md` plus this repository's deviations" | `docs/committing.md` | page landed in C5 (`4b8d53c`), 1,306 |
| Operating modes | "The effort lifecycle: tracks, t0 fields, permitted compromises, and the closeout procedure" | `docs/workflow.md` | job split between `tasks/README.md` and `docs/development-workflows.md` |
| Governance | "Versioning, change surface, ownership, review, retirement; joins with the first work package" | no page — role retired (ADR-0027) | seven closed packages; job split across `docs/conventions.md`, `AGENTS.md` and directory READMEs; four of its five subjects were already norm, and no target repository ever created it |
| Work package index | "Work package governance, the open table, the closeout checklist" | `work-packages/README.md` | kept at `tasks/README.md`, inside a suite track, tolerated by the whitelist with no recorded reason |

## W06 scope correction

Measured 2026-11-19 at `9c27e08`; the C4 list in W06 was a smaller tree.

| Page | Role | Measured | Hard | Verdict |
| --- | --- | --: | --: | --- |
| `docs/development-workflows.md` | none | 16,611 | 16,000 | over hard; removed by W05b C4 (`0e57e99`), no longer a W06 page |
| `docs/reviews/README.md` | directory index | 13,323 | 12,000 | over hard |
| `docs/backlog/B-13-degenerate-crops.md` | backlog item | 13,875 | 8,000 | over hard |
| `docs/knowledge/guides/pitfalls.md` | guide | 15,341 | 16,000 | over soft |
| `docs/knowledge/explainers/reading-the-numbers.md` | explainer | 15,023 | 16,000 | over soft |
| `docs/knowledge/explainers/recognition-pipeline.md` | explainer | 11,614 | 16,000 | over soft |
| `docs/contracts/schema.md` | contract | 12,273 | 16,000 | over soft |
| `docs/contracts/ui-label.md` | contract | 12,251 | 16,000 | over soft |
| `docs/contracts/ui-audit.md` | contract | 12,185 | 16,000 | over soft |
| `docs/architecture/components-decision.md` | architecture | 10,911 | 16,000 | over soft |
| `docs/conventions.md` | conventions | 11,760 | 16,000 | over soft; the language fold adds about 2,900 |
| `README.md` | storefront | 10,564 | 16,000 | over soft |

## Pointer consequences

| Old path | Living citers | Frozen citers | Tombstone link |
| --- | --- | --- | --- |
| `docs/testing.md` | `docs/README.md`, `docs/mutation-testing.md`, ADR-0015 | `tasks/manual-character-registration` (plan, todo) | the guide |
| `docs/mutation-testing.md` | `docs/README.md`, `docs/testing.md`, ADR-0015 | none | the guide |
| `docs/language-policy.md` | `AGENTS.md`, `docs/README.md`, `web/README.md`, `tasks/head-kind-experiment` | `tasks/manual-character-registration`, `docs/superpowers/b16-joint-calibration`, `experiments/b16-joint-calibration/results/labour-quote.md` | `docs/conventions.md` |
| `docs/development-workflows.md` | `AGENTS.md`, `tasks/README.md`, `docs/adapters.md`, `docs/README.md`, `docs/agents/README.md`, `tasks/head-kind-experiment` | `tasks/manual-character-registration`, `docs/superpowers/b13-crop-quality`, `docs/superpowers/b16-joint-calibration`, the CE plan | `docs/README.md` |
