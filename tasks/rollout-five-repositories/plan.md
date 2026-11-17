# Plan

## Approach

1. Audit each repository immediately before its migration, one repository at a time, as the maintainer directed. Each report lands in `audits/<repo>.md` in the fixed format from `docs/governance.md`: severity, role, problem, why, minimal fix.
2. Review the report with the maintainer before touching the repository. Settle the migration order per repository; `B-0005` proposes oshi, bun-toolkit, python-toolkit, gearset, then personal-agent-kit.
3. Migrate one repository at a time, one role per commit, following `docs/spec/0006-migration.md` and the migrate mode of `docs/workflow.md`. Each migration starts from a clean working tree.
4. Register what cannot move in that repository's `docs/adapters.md`; do not force a foreign suite or a frozen record to accept a new path.
5. Evolve the skeleton when a migration exposes a wrong placement, a missing rule, a wrong format, a budget with no sample, or a source rule that the target's working practice contradicts. The change follows the change surface in `AGENTS.md`: spec first, then `template/`, then the skill, then `scripts/check.py`; the target then follows the evolved spec.
6. Close `B-0005` when every repository is migrated or carries a reasoned exception, and file the spec gaps the rollout exposed as backlog items here.

The audit reports stay in the package while it is open. A finding that changes the spec moves to `docs/backlog/` as an item; a finding that records a choice moves to `docs/decisions/`. The report itself is runtime evidence, per `docs/structure.md` ("Artifact tiers").

## Work breakdown

The table names the phases and their exit conditions; each work item's description, acceptance criteria, and evidence live in `todo.md`.

| Phase | Work items | Exit condition |
| --- | --- | --- |
| P0 — skeleton and oshi audit | W01–W09 | The work item ledger and skeleton handoff are defined; oshi's audit review is ruled; skeleton gate green |
| P1 — oshi migration | W10–W11 | Oshi's living docs are in their roles; budgets and repository gate green |
| P2 — bun-toolkit | W12–W13 | Audit reviewed; `AGENTS.md` split; adapter registry; gate green |
| P3 — python-toolkit | W14–W15 | Audit reviewed; layout page mapped; index has no counts; gate green |
| P4 — gearset | W16–W17 | Audit reviewed; six-module sample resolves the module level; gate green |
| P5 — personal-agent-kit | W18–W19 | Audit reviewed; generated header and knowledge split; gate green |
| P6 — closeout | W20–W21 | Skeleton gaps filed; `B-0005` closed |

## Skeleton status and review discipline

The reusable protocol lives in the `i-draft-standard-rollout` skill; this plan records the B-0005 instance. The skeleton is a draft, not a validated standard. The rollout exists to find the errors in it, not to prove the draft right. A migration step reviews two things in the same pass: the target's compliance and the skeleton rule's correctness. A step that only applies the rule is incomplete. The glossary sequence is the sample: ADR-0007 gave the role the right name, but the body was still the three-column `CONTEXT.md` table, with no groups and implementation rules inside definitions. Oshi already had a coherent `GLOSSARY.md`, and the `domain-modeling` skill's `GLOSSARY-FORMAT` was the source; questioning the source instead of trusting the skeleton exposed the error, and ADR-0008 corrected the skeleton. A target that is more coherent than the skeleton is a finding, not a failure. The same review is expected for every role.

Before any role move or skeleton change, report:

1. **The rule and its source.** Name the skeleton page and the evidence or sample behind it. "The skeleton says so" is not evidence.
2. **The target's current shape.** Compare it with the rule. A coherent existing form is evidence, not a deviation to erase; a foreign suite's path is an adapter, not a skeleton role.
3. **Proposed action and expected result.** One role, one commit, one observable gate.
4. **Risks and controversy.** Frozen citations, foreign suites, over-budget pages, second homes, irreversible moves, and any point where the rule conflicts with the target or with another skeleton page.
5. **Alternatives and recommendation.** What was rejected and why, what you recommend, and what the maintainer must decide.

Stop for the maintainer before acting when the source is ambiguous, the target's form is better, the move is irreversible, a frozen record is involved, or the rule has no sample. After the decision, record it: a spec change and an ADR if the skeleton was wrong; an adapter or tombstone if the target cannot move; a backlog item if the question remains open. Do not silently normalize a target to a draft rule.

## Migration guide

This page records the operating sequence on top of `docs/spec/0006-migration.md`; it does not replace it. The six rules from `0006` apply to every repository:

1. Freeze the old home before moving anything.
2. One role per commit.
3. Prove the pointer migration with `rg -l '<old-path>'`; every survivor is explained.
4. `git mv` file by file; never a recursive move.
5. A frozen record keeps its citation; leave a tombstone.
6. A path that cannot move is a legacy path in `docs/adapters.md`.

### Workspace

1. Skeleton work happens on `feature/b0005-rollout` in `E:\Projects\engineering-skeleton`. Run `bun run gate` before every commit.
2. A target repository gets its own branch. When its checkout holds unrelated work, use a worktree under `.worktrees/`; oshi is `E:\Projects\oshi\.worktrees\skeleton-migration` on `feature/skeleton-migration`.
3. Rebase the migration branch onto `main` before the first move when it starts from an older work line. Oshi used `git rebase --onto main d990a58 feature/skeleton-migration`, which kept the s2 work off the branch. Never carry unrelated commits into a migration branch.
4. Run `git status --short` before the first move; a dirty file the move touches is a stop condition.

### Per repository

1. Audit immediately before the migration; write `audits/<repo>.md`; review it with the maintainer. Settle the role order and the exceptions.
2. Freeze the old homes and add `docs/adapters.md`; the freeze and legacy rows are the first commit.
3. Move one role per commit, smallest complete role first. Oshi's executed order is `tasks/README.md`, the operations split, then the Status role (now at `docs/status.md` after ADR-0006); the next role is `docs/decisions`, and `docs/contracts` and `docs/knowledge` remain; the vocabulary is already at `GLOSSARY.md` after ADR-0007.
4. For each role: `git mv` file by file, update living pointers, leave a tombstone for frozen citations, register the tombstone reason in `docs/adapters.md`, and prove `rg -l '<old-path>'` survivors are explained. Run the full gate.
5. Split an over-budget page after the role is at its home; do not mix a split with a move.
6. Gate: the target's `AGENTS.md` "Gate". The text-only shortcut applies only when the diff touches no `src/`, `tests/`, `scripts/`, `config/`, `web/`, `pyproject.toml`, `uv.lock`, or `.python-version`; a `web/` diff is not text-only, and a `docs/status.md` diff is not text-only either.

### What the rollout has decided

- Status is a cross-domain state page at `docs/status.md`, not a procedure under `docs/operations/` (ADR-0006). Operations holds procedures only. Oshi's 2026-11-16 move was reverted; the page is byte-identical to its pre-move state.
- The operations directory is procedures only. Oshi's split produced eight pages: `README.md`, `setup.md`, `commands.md`, `works.md`, `runbook.md`, `vlm.md`, `annotation.md`, `backups.md`; the command table stays in operations; the old `docs/operations.md` tombstone's reason is in `docs/adapters.md`.
- Vocabulary lives at `GLOSSARY.md`; `CONTEXT.md` is a legacy alias, not a role (ADR-0007). Oshi's `GLOSSARY.md` stays; the earlier `GLOSSARY.md` → `CONTEXT.md` move is withdrawn.
- The vocabulary body follows the `domain-modeling` `GLOSSARY-FORMAT`: a context title, a description, `## Language`, bold terms with `_Avoid_`, and subheadings for natural clusters; the glossary defines terms, not rules. `GLOSSARY-MAP.md` lists member contexts, their paths, and their relationships; it stores no definitions. Oshi's `GLOSSARY.md` already follows this format (ADR-0008).
- The skeleton is unvalidated. A wrong placement, a missing rule, or a wrong format changes the skeleton first; the target then follows. Do not hard-code an old skeleton rule into a target repository, and do not fork the spec inside one target.
- The work-package handoff is a `Current state` block at the top of `todo.md`, rewritten in the same commit as any change to a step, a decision, a branch, or the gate. It is a snapshot inside the existing four files; there is no work log and no fifth progress file. A new conversation reads `tasks/README.md`, `spec.md`, `plan.md`, then the block, and re-checks `git status` and the gate.
- The work package is a work item ledger: `plan.md` carries the phase breakdown; `todo.md` carries `W<n>` blocks with status, dependencies, a prose description, done-when criteria, and evidence. The `Current state` block is the dashboard; there is no `progress.md` and no work log (ADR-0009).
- A third-party suite's track root is a permanent adapter, not a legacy path (ADR-0010). Each suite owns its layout and content form. Oshi's four tracks are registered in `docs/adapters.md`; the five closed packages under `docs/superpowers/` and `docs/compound-engineering/` stay in place, and no migration folds a suite package into `tasks/`.
- Frozen evidence stays where it is until a role is admitted. Oshi's `experiments/` and `docs/plans/` are frozen legacy paths in `docs/adapters.md`, with no move; `B-0007` remains open and fires only when a second repository keeps a frozen protocol (2026-11-17 ruling).
- A tombstone is a role at the old path (ADR-0011): ≤3 lines, exactly one link, ≤400 non-whitespace characters, title ending `— moved`. `scripts/check.py` enforces the shape and exempts it from the role and naming maps; `B-0008` is closed. The oshi decisions move is its first use.
- Oshi's next role is `docs/decisions`: four ADRs move to `docs/decisions/ADR-09` through `ADR-12` — the migrated series keeps its width and is never renumbered — with tombstones at the cited old names.

## Check-in points

Stop and confirm with the maintainer at each of these, rather than at every commit:

- After the audit of a repository, before the first move.
- After the freeze and adapter-registry commit, before any deletion.
- Before a role move when the skeleton rule is ambiguous, has no sample, or conflicts with the target's working practice.
- Before changing the skeleton's spec in response to a migration finding; the target waits for the skeleton gate.
- After the docs roles are in place, before the budget splits.
- Before deleting an archive or a directory.
- After the repository's gate is green, before starting the next repository.

## Risks

| Risk | Mitigation | Stop condition |
| --- | --- | --- |
| A migration rewrites documents that record decisions, losing the reasoning. | One role per commit; a frozen record keeps its citation and gets a tombstone. | A move would break a frozen record that cites the old path. |
| Uncommitted work in a target repository is swept into a move. | Run `git status --short` before the first move of each repository. | The working tree has changes in a file the move touches. |
| The spec is bent to fit one repository. | Change the skeleton first when the gap is a genuine defect; every repo then follows the same spec. | A migration needs a one-off role, budget, or path that no other repo would use. |
| Five audits in one pass hide a pattern a second look would catch. | One measurement script and one report format across all five. | Two reports disagree on what a role means. |
| The skeleton is a draft and a rule is wrong; a target gets normalized to it. | Review the rule's source and the target's existing form; a better target changes the skeleton first. | A rule has no source or sample, or conflicts with a target's working practice. |

## Out of scope

- Rewriting a target repository's content beyond what the role layout requires.
- A machine-checkable gate for target repositories; that is `B-0002`.
- The module `AGENTS.md` threshold; gearset supplies the sample, and `B-0003` sets the number afterwards.
