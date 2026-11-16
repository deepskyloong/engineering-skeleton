# Backlog

Deferred items only. An item here binds nothing; it records a decision that has not been made, with the evidence that would settle it.

## Rules

- Each item is its own file: `B-<nnnn>-<slug>.md`. New repositories use four digits; a migrated series keeps its width and is never renumbered; the index carries order.
- Every item states `Revisit when` — a measurable trigger, not a date. An item without a trigger is a wish.
- **Status lives in the index, not in the item file.** `open` means the trigger has not fired; `active` means a work package is on it; `closed` means delivered, withdrawn, or superseded. The item file carries no status line.
- Closing an item: write a one-line outcome under `## Outcome`, set the row's `Status` to `closed`, and keep both the file and the row. Closed rows stay, so the index is an inventory, not a to-do list.

## Index

| ID                                            | Item                                    | Status | Revisit when                                               |
| --------------------------------------------- | --------------------------------------- | ------ | ---------------------------------------------------------- |
| [B-0001](B-0001-toolchain-role.md)            | Whether `docs/toolchain/` survives      | open   | A third trap file, or two traps stop reproducing           |
| [B-0002](B-0002-portable-skeleton-check.md)   | A checker for target repositories       | open   | The first forge, or a migration's overlay step             |
| [B-0003](B-0003-module-agents-threshold.md)   | The module `AGENTS.md` threshold        | open   | gearset supplies a six-module sample                       |
| [B-0004](B-0004-overlay-config-validation.md) | Validate overlay configs                | open   | The first forge, or a migration's overlay step             |
| [B-0005](B-0005-rollout-five-repositories.md) | Roll out to the five repositories       | active | The first migration completes, or a second adopts          |
| [B-0006](B-0006-backlog-index-growth.md)      | Index growth under a fixed entry budget | open   | Any index exceeds 40 rows, or a second repository migrates |
