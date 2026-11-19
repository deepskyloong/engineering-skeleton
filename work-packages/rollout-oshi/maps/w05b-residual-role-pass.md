# W05b — the four pages with no role, and the three roles oshi never created

- Date: 2026-11-19
- Source: oshi `9c27e08` (clean tree), worktree `E:\Projects\oshi\.worktrees\skeleton-migration` on `feature/skeleton-migration`; standard `2819ab8`
- Status: open — the role pass is complete; two rulings block the parts that change the norm (R1, R2)
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
- Missing roles: `docs/committing.md` (always present; the repository has no commit-message rule anywhere), `docs/workflow.md` (its job is split between `tasks/README.md` "Closeout checklist" and `docs/development-workflows.md` "Tracks"), `docs/governance.md` (seven closed packages exist; the job is scattered across `docs/conventions.md` "Review cycle", `AGENTS.md`, and each directory README's governance block).
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
  - **C6 workflow, C7 governance** — after R2: one page each, or a standard backlog item that records why a suite track replaces the role. Not both.
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

- `Status` — pending; R1 and R2 await the maintainer.

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
| Committing | "A base pointer to `docs/norm/committing.md` plus this repository's deviations" | `docs/committing.md` | no page; `git grep 'commit message'` returns nothing |
| Operating modes | "The effort lifecycle: tracks, t0 fields, permitted compromises, and the closeout procedure" | `docs/workflow.md` | job split between `tasks/README.md` and `docs/development-workflows.md` |
| Governance | "Versioning, change surface, ownership, review, retirement; joins with the first work package" | `docs/governance.md` | seven closed packages; job split across `docs/conventions.md`, `AGENTS.md` and directory READMEs |
| Work package index | "Work package governance, the open table, the closeout checklist" | `work-packages/README.md` | kept at `tasks/README.md`, inside a suite track, tolerated by the whitelist with no recorded reason |

## W06 scope correction

Measured 2026-11-19 at `9c27e08`; the C4 list in W06 was a smaller tree.

| Page | Role | Measured | Hard | Verdict |
| --- | --- | --: | --: | --- |
| `docs/development-workflows.md` | none | 16,611 | 16,000 | over hard; W05b removes it |
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
