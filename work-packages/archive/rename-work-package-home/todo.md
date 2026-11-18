# Todo

## Current state

- Updated: 2026-11-18
- Status: closed
- Branch: main; re-check `git status`
- Gate: PASS — 97 markdown files (2026-11-18)
- Last done: W03 — close out the package
- Phase: P1 — Closeout
- Focus: none
- Progress: 3 done / 0 todo / 0 blocked
- Todo: none
- Next: none
- Blocked: none
- Open decisions: none; ADR-0019 carries the naming decision
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/risks), this file (state/ledger)

## Work items

### P0 — Home move

#### W01 — Move the two directories

Move `tasks/` to `work-packages/` and `template/effort/tasks/` to `template/effort/work-packages/` with `git mv`. The open package `rollout-oshi` and the archive move as units; nothing is deleted. This package directory rides the move and lands at `work-packages/rename-work-package-home/`.

**Status**: done
**Depends on**: none

**Done when**:

- `tasks/` no longer exists at the repository root.
- `work-packages/` holds `README.md`, `archive/`, `rollout-oshi/`, and this package.
- `template/effort/work-packages/` holds `README.md` and `_template.md`.
- `git status --short` reports the moves as renames (`R`), not delete-plus-add.

**Evidence**: `git status --short` lists 18 renames from `tasks/` and `template/effort/tasks/`; the tree at `work-packages/` held `README.md`, `archive/`, `rollout-oshi/`, and this package, which W03 then moved to `archive/`.

#### W02 — Update every living pointer

Replace the old root wherever a living page names the standard's own path: `GLOSSARY.md`, root `README.md`, `docs/structure.md`, `docs/workflow.md`, `docs/norm/roles.md`, `docs/norm/flow.md`, `docs/norm/foundations.md`, `docs/norm/rules.md`, `template/core/docs/structure.md`, `template/effort/README.md`, `template/effort/docs/workflow.md`, `template/effort/docs/adapters.md`, `work-packages/README.md`, the template's work-package README and scaffold, and `rollout-oshi`'s procedural lines. Add ADR-0020 and its index row; bump the standard version; update the skill's create-package step. Frozen records and the dated oshi snapshot keep their citations.

**Status**: done
**Depends on**: W01

**Done when**:

- `rg -n 'tasks/'` survivors are only ADR-0009, ADR-0010, ADR-0017, ADR-0020, the archived packages, the dated oshi snapshot, the migration row in `docs/workflow.md`, and the historical lines in `rollout-oshi/plan.md` and `todo.md`.
- `docs/norm/roles.md`, `docs/norm/flow.md`, and the template name `work-packages/` on every path row.
- ADR-0020 is indexed and `standard v2` is stated in both files the gate compares.
- The skill's create-package step names `work-packages/`.

**Evidence**: ADR-0020; the survivor audit above; `standard v2` in `README.md` and `docs/norm/README.md`; gate `PASS — 96 markdown files`.

### P1 — Closeout

#### W03 — Close out the package

Write `summary.md` with what was done, what was not, and what a later maintainer must know — chiefly that the old root is a suite track in a consumer, so no tombstone exists and frozen citations of `tasks/` no longer resolve. Move the package to `work-packages/archive/rename-work-package-home/` and move its rows in the open and archive indexes.

**Status**: done
**Depends on**: W02

**Done when**:

- `summary.md` exists and is inside budget.
- The open table lists no row for this package; the archive index does.
- The gate is green.

**Evidence**: `summary.md`; the row moved from `work-packages/README.md` to `work-packages/archive/README.md`; gate `PASS — 97 markdown files`.
