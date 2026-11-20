# ADR-0034 — Evidence gives each artifact one entry

Status: Accepted (2026-11-20).

## Context

ADR-0009 requires evidence and `docs/norm/flow.md` said it "cites artifacts and names what each proves", but no clause fixed the shape. Measured 2026-11-20 in `work-packages/rollout-oshi/`: 25 of the 27 items were a single paragraph, the longest `W07e` 1,307 non-whitespace carrying four commits and two rulings in one block, and `W06` reached 2,060 characters with six bullets because one bullet held fourteen page measurements. The maintainer reported the paragraph shape on 2026-11-20, after the description form was settled in ADR-0033.

## Decision

`Evidence` gives each artifact one entry, naming what it proves: bullets when there are several, a table when one artifact carries several facts (per-page volumes, per-commit gates), a sentence when there is one. Detail stays in the artifact — a report, a map or a measurement is cited by path and one clause, not by recital. The item stays working state with no volume budget, and the board carries no item prose.

## Options considered

- Keep the paragraph and mark boundaries with commas — rejected: an entry boundary is what separates a proof from a narrative, and commas do not mark one.
- Bullets always — rejected: an artifact that carries fourteen measurements becomes a fourteen-clause bullet; `W06` already demonstrated it.
- A table always — rejected: an item with one commit has no second column to fill.
- A fixed schema per field — rejected: artifacts differ, and the form belongs to the content, as ADR-0033 settled for descriptions.

## Consequences

- `docs/norm/flow.md` "Work items" states the entry rule; `template/effort/work-packages/items/W01.md` names it in the placeholder.
- ADR-0009's evidence requirement stands; this ADR fixes the form it left open.
- The items in `work-packages/rollout-oshi/` that carry evidence are reflowed into one entry per artifact; content, hashes, numbers and paths stay.
- No gate stage changes: the entry shape is a review criterion, not a check. `N = 0` — a shape rule removes no compliance.
