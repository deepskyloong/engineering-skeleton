# Backlog

Deferred items only. An item here binds nothing; it records a decision that has not been made, with the evidence that would settle it.

## Rules

- Each item is its own file: `B-<nnnn>-<slug>.md`. New repositories use four digits (`B-0001`); a migrated series keeps its width and numbering and is never renumbered. The index, not the filename, carries order for a migrated series.
- Every item states `Revisit when` — a measurable trigger, not a date. An item without a trigger is a wish.
- **Status lives in the index, not in the item file.** `open` means the trigger has not fired; `active` means a work package is on it; `closed` means delivered, withdrawn, or superseded. The item file carries no status line.
- Closing an item: write a one-line outcome under `## Outcome`, set the row's `Status` to `closed`, and keep both the file and the row. Closed rows stay so the index is a complete inventory, not a to-do list.

## Index

| ID | Item | Status | Revisit when |
|---|---|---|---|
| [B-0001](B-0001-toolchain-role.md) | Whether `docs/toolchain/` survives as a role | open | A third trap file is proposed, or two traps stop reproducing |
| [B-0002](B-0002-portable-skeleton-check.md) | A machine-checkable checker for target repositories | open | The first repository is forged, or the first migration reaches its overlay step |
| [B-0003](B-0003-module-agents-threshold.md) | The measurable threshold for module-level `AGENTS.md` | open | gearset migration supplies a six-module member as a sample |
| [B-0004](B-0004-overlay-config-validation.md) | Validate the overlay configs against a real repository | open | The first repository is forged, or the first migration reaches its overlay step |
| [B-0005](B-0005-rollout-five-repositories.md) | Roll the skeleton out to the five source repositories | open | The first migration completes, or a second repository is ready to adopt |
| [B-0006](B-0006-backlog-index-growth.md) | Backlog index growth under a fixed entry budget | open | Any index exceeds 40 rows, or a second repository migrates |
