# ADR-0014 — The backlog carries no priority field

Status: Accepted (2026-11-17)

## Context

The issue trackers a reader arrives from carry a priority field, and the first proposal is a fifth column in `docs/backlog/README.md`: `P0`–`P3`, or `high`/`medium`/`low`. The question behind it is real — a dozen open items, and the index gives no way to tell which to read first.

That question assumes the items wait for attention. A backlog item here was deferred at the moment it was written, and the same file names the event that reopens it (`Revisit when`). Its clock is that trigger, not the maintainer's attention. Before the trigger fires the item cannot be started, whatever the label says; after it fires the item is work, and work has a home and a ranking of its own — `plan.md` carries `P0 — <phase> | W01–W0n | <observable exit>`, `todo.md` carries the `W<n>` items under those phases, and the review format carries `blocker`, `major`, `minor`, `nit` (ADR-0009, `docs/governance.md`).

## Decision

The backlog index keeps four columns: `ID`, `Item`, `Status`, `Revisit when`. Neither the index nor the item file gains a priority. The ID sequence is the order, `Status` is the state, and urgency is read off the `Revisit when` line — how near and how concrete the trigger is. Ranking a dormant item waits for the moment its trigger fires, when the evidence that settles it is in hand; the result lands in `status.md`'s next action or in a work package's phase order.

## Options considered

- **A priority column in the index.** Rejected: a cell nothing reads. No command reads it, no gate checks it, and the decision it appears to inform happens later against different evidence. `0004-rules.md` opens by naming this defect class — a rule presented as strong but enforced by nothing — and a ranking column with no reader is that defect in a table cell.
- **A priority line in the item file.** Rejected: `Status` was moved out of the item file into the index for the same reason — one state home. A second ranking field in the file inherits the defect without the index's scannability.
- **Order the rows by urgency.** Rejected: `B-<nnnn>` is a stable address, cited by other items and by commit messages. Reordering rows around a judgment that expires breaks the one thing the numbering guarantees.
- **A free-text `Note` column for a soft ranking.** Rejected: an admission rule of "whatever the writer felt" is the failure B-0001 records for `docs/toolchain/`.
- **A `blocked by` column.** Rejected as a different field: the trigger already carries a dependency — "a freed slot in the plan", "the first migration completes" — and B-0005 and B-0010 use it that way. Mechanical dependency checking, if it is ever needed, is its own decision with its own evidence.

## Consequences

- No spec, template, or gate change follows. `0002-roles.md` already fixes the index's contents and `template/first-use/docs/backlog/README.md` mirrors them; this record answers the question the shape raises instead of adding a rule.
- The question returns with every reader who arrives from an issue tracker. The answer is this record, and the condition that reopens it: a backlog that stays above twenty open items while several triggers fire in the same week. That state is a budget problem first (B-0006); a ranking field is weighed there, against real items rather than a hypothetical.
- A closed row keeps the words it was written with. A priority would become an assertion about a week that no longer exists and would need editing to stay true; a trigger keeps saying what it always said.
- Recording the decision costs the decisions index one row, and the index already sits close to its soft line, so the row takes it over. `bun run gate` prints the warning ADR-0013 defines; the warning is the honest state, not a reason to shorten the decision until it fits.
