# Plan

## Approach

1. This package is the oshi step of `B-0005`; the programme's order and its one-package-per-repository rule live there. The next repository's package opens only after this one closes.
2. The audit is done (`audits/oshi.md`, measured 2026-11-16) and reviewed (`audits/README.md`). Re-measure before each budget step; the report is a dated snapshot, not a budget.
3. Move one role per commit, following the migrate mode of `docs/workflow.md`, smallest complete role first: charter, then contracts, knowledge, and toolchain. W08a (package evidence) is a standard change before contracts; it is not a role move. W05's closeout left four live pages without a role and three required roles without a page, which is why the migrate protocol's last step matters: W05b and W05c complete the role set before P2 measures a single page.
4. Register what cannot move in oshi's `docs/adapters.md`; never force a suite track or a frozen record to accept a new path.
5. Evolve the standard when a move exposes a wrong placement, a missing rule, a wrong format, a budget with no sample, or a source rule oshi's working practice contradicts. The change follows the change surface in `AGENTS.md`: spec first, then `template/`, then the skill, then `scripts/check.py`; oshi follows the evolved spec afterwards.
6. Close when every audit finding has a disposition — resolved, withdrawn, or filed as a backlog item — and `B-0005` carries oshi's disposition.

## Work breakdown

| Phase | Work items | Exit condition |
| --- | --- | --- |
| P0 — Package split | W01 | One package per repository; oshi's audit and tool moved with it; standard gate green |
| P1 — Package rule and role moves | W08a, W02, W03, W04, W04b-i, W04b-ii, W04c, W05, W05b, W05c | The package evidence category is defined; charter, contracts, knowledge and toolchain at their canonical paths; every remaining live page at an admitted home or a recorded disposition; the roles the standard calls always-present or first-use in place or ruled out in the standard; old paths are tombstones or adapter rows; both gates green |
| P2 — Page repairs and audit closeout | W06a, W06, W07, W07a–W07g, W10 | Every role page inside its volume budget; every audit finding resolved, withdrawn, or filed |
| P3 — Closeout | W08, W11, W12, W13, W09 | Standard gaps have ADR, spec, or backlog homes; the template's role pages point at the norm instead of copying it; oshi's backlog is padded to four digits with both gates green; the summary is written; `B-0005` records oshi's disposition; standard gate green |

The table names every ID and each phase's exit condition; the item detail lives in `items/<ID>.md`. Numbering and late-discovery placement follow `docs/norm/flow.md` "Work items"; this package applied the letter rule when W07 became a container over W07a–W07g.

## Protocol

Every unit is one pass of `i-draft-standard-rollout`: the rule and its source, the target's shape, one change with its check, the risks, the alternatives, and the ask. The protocol and its report format live there; this page does not restate them.

This page records only what is oshi's: the workspace, the role order, the rulings already made, and the check-ins.

## Migration guide

This page records the operating sequence on top of the migrate mode in `docs/workflow.md`; it does not replace it. The six execution rules are M1–M6 there and are not restated here.

### Workspace

1. Standard work happens on `feature/b0005-rollout-oshi` in `E:\Projects\repository-standard`; one branch per target migration, so the next repository's package opens `feature/b0005-rollout-<target>` (the checkout move is the maintainer's action; resolve the root from the skill if the path is not there yet). Run `bun run gate` before every commit.
2. Oshi's migration checkout is the worktree `E:\Projects\oshi\.worktrees\skeleton-migration` on `feature/skeleton-migration`; the worktree and branch names predate the rename and stay as they are. It was rebased onto `main` before the first move with `git rebase --onto main d990a58 feature/skeleton-migration`, which kept the s2 work off the branch.
3. Run `git status --short` before the first move; a dirty file the move touches is a stop condition. `docs/reviews/README.md` was modified and uncommitted at audit time.

### Oshi's sequence

1. Already placed: `tasks/README.md`, the operations split, the status page at `docs/status.md`, the decisions at `docs/decisions/` padded to `ADR-0009…0012`, and the vocabulary at `GLOSSARY.md`.
2. Done: `docs/brief.md` → `docs/charter.md`. Before contracts, W08a defined the package evidence category in the standard (ADR-0021); then contracts: `docs/designs/` and `docs/specs/` become `docs/contracts/`, one contract surface per page. Then knowledge: `docs/notes/` splits into `docs/knowledge/guides/` and `docs/knowledge/notes/`. Then toolchain: `docs/stack.md` splits into a toolchain page, an ADR, and backlog rows, if the toolchain admission holds.
3. For each role: `git mv` file by file, update living pointers, register every moved path in `docs/adapters.md` (no file left behind, ADR-0028), and prove `rg -l '<old-path>'` survivors are explained. Run the full gate.
4. Split an over-budget page after the role is at its home; do not mix a split with a move.
5. Gate: oshi's `AGENTS.md` "Gate". The text-only shortcut applies only when the diff touches no `src/`, `tests/`, `scripts/`, `config/`, `web/`, `pyproject.toml`, `uv.lock`, or `.python-version`; a `web/` diff is not text-only, and a `docs/status.md` diff is not text-only either.

### What the rollout has decided

- Frozen evidence stays where it is until a role is admitted. Oshi's `experiments/` and `docs/plans/` are frozen legacy paths in `docs/adapters.md`, with no move; `B-0007` remains open and fires only when a second repository keeps a frozen protocol (2026-11-17 ruling).
- A third-party suite's track root is a permanent adapter, not a legacy path (ADR-0010). Oshi's four tracks are registered in `docs/adapters.md`; the five closed packages under `docs/superpowers/` and `docs/compound-engineering/` stay in place, and no migration folds a suite package into `work-packages/`.
- A tombstone was a role at the old path (ADR-0011): ≤3 lines, one link, title ending `— moved`. Retired 2026-11-19 by ADR-0028 — a moved path is one `docs/adapters.md` row and no file, and the checker now flags the marker. Oshi's W07f deleted the 31 files the role had produced.
- A migrated ADR series is zero-padded to four digits and never renumbered (ADR-0015); a migrated backlog series is padded the same way (ADR-0031, 2026-11-20), because one width per series is the only shape a checker can express. Oshi's `7a988f4` is the first application for ADRs; its backlog is renamed in W11, and frozen records keep their old labels.
- Markdown formatting is not a migration step, and no target gets it by default: neither overlay ships a Markdown stage today (`B-0011`), so oshi adopts the formatter only when that item lands; a page the formatter would re-pad records the exception instead.
- Oshi's `docs/conventions.md` consumes general norms by pointer: `Base: {{NORM_SOURCE}}/docs/conventions.md` plus deviations with a last-read date, never a restated copy (ADR-0016); a norm with no page at the source is recorded as an exception, not forked.
- A requirements brief becomes the charter: scope and rulings move with the page, the user profile and communication conventions go to `docs/conventions.md` "Human labor and communication", and material or environment pointers stay in `docs/status.md` and `docs/operations/setup.md`; a dated history row is dropped rather than carried (2026-11-18 ruling, oshi `28c8bc4`).
- A work package carries the evidence it owns (ADR-0021, 2026-11-18): four ledger files by closeout, a file per work item under `items/`, plus named evidence directories created on demand. Evidence stays in git, `summary.md` names each directory, closeout archives it with the package, and it carries no docs-page volume budget. Oshi's `audits/` and `tools/` are legal without a move; `scripts/check.ts` checks the package shape.
- A work item is one file (ADR-0029, 2026-11-19): `items/<ID>.md` carries its dependencies, description, done-when criteria and evidence, and `board.md` carries the current state and the index. `todo.md` is retired as a ledger name and status lives only in the board; the three archived packages keep their block shape.
- An item description takes the form its content needs (ADR-0033, 2026-11-20): prose, a list, a table, or a small fenced diagram, one screen; the done-when criteria stay bullets, and needing a heading per concern means two items. This package's items were reflowed in W13.
- A role page links the norm it relies on; only a general-norm page is a base pointer (ADR-0032, 2026-11-20). The template carries no `Norm` row: oshi's five rows are a permitted link form, not a requirement, and the four template pages that copy norm text become W12.

## Check-in points

Stop and confirm with the maintainer at each of these, rather than at every commit:

- After the audit of a repository, before the first move.
- After the freeze and adapter-registry commit, before any deletion.
- Before a role move when the rule in the standard is ambiguous or conflicts with oshi's working practice.
- Before changing the standard's spec in response to a migration finding; oshi waits for the standard gate.
- After the docs roles are in place, before the budget splits.
- Before deleting an archive or a directory.
- After oshi's gate is green, before starting the next repository.

## Risks

| Risk | Mitigation | Stop condition |
| --- | --- | --- |
| A migration rewrites documents that record decisions, losing the reasoning. | One role per commit; a frozen record keeps its citation and the moved path becomes an adapter row. | A move would break a frozen record that cites the old path. |
| Uncommitted work in oshi is swept into a move. | Run `git status --short` before the first move. | The working tree has changes in a file the move touches. |
| The spec is bent to fit oshi. | Change the standard first when the gap is a genuine defect; the remaining repositories then follow the same spec. | A move needs a one-off role, budget, or path that no other repo would use. |
| The standard is a draft and a rule is wrong; oshi gets normalized to it. | Review the rule's source and oshi's existing form; a better target changes the standard first. | A rule has no source, or conflicts with oshi's working practice. |
| Splitting `docs/designs/` and `docs/specs/` turns eleven files into pages that restate each other. | One contract surface per page; a fact used twice is linked, not copied; the contract admission decides what stays. | Two pages state the same fact, or a page has no consumer outside its own effort. |

## Out of scope

- The other four source repositories; `B-0005` opens their packages after this one closes.
- Rewriting oshi's content beyond what the role layout requires.
- A machine-checkable gate for target repositories; that is `B-0002`.
- The module `AGENTS.md` threshold; gearset supplies the sample, and `B-0003` sets the number afterwards.
