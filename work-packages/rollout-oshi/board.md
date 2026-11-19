# Board

## Current state

- Updated: 2026-11-19
- Status: open; `B-0005` active (programme); this package is the oshi step
- Branch: `feature/b0005-rollout-oshi`
- Last done: W10 — each work item is a file under `items/`, and `board.md` carries the state and the index (ADR-0029)
- Gate: standard `bun run gate` PASS 2026-11-19 (137 markdown files, 70 tests; one soft `roles.md` warning); oshi full path green the same day (ruff check / format, `ty`, prose 246 files, pytest 658 passed / 1 skipped, frontend `bun run validate` 86 passed)
- Phase: P2 — page repairs and audit closeout
- Focus: W06 — re-measure every role page, then split by topic
- Progress: 19 done / 4 todo / 1 umbrella (W07)
- Todo: W06, W07g, W08, W09; W07 is the container over W07a–W07g
- Next: W06 — two measured breaches (`docs/reviews/README.md` 13,323 / 12,000 and `docs/backlog/B-13-degenerate-crops.md` 13,875 / 8,000) plus a fresh sweep; the conventions page is now 12,056, still over its 10,000 soft line but clear of the 16,000 hard one
- Blocked: none
- Open decisions: none — R1 settled as a new role (`docs/decisions/ADR-0026-per-suite-map-role.md`); R2 settled as no replacement, repository owns the base rule and the page points at the norm source (`06aeb6d`); R3 settled, Governance retired (`a241462`, ADR-0027); R4 settled, the tombstone role retired (`0291824`, ADR-0028)
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/decisions/check-in), this board (state and index), `items/<ID>.md` (the item you are on)

## Work items

### P0 — Package split

| Item | Title | Status |
| --- | --- | --- |
| [W01](items/W01.md) | Split the five-repository package into `rollout-oshi` | done |

### P1 — Package rule and role moves

| Item | Title | Status |
| --- | --- | --- |
| [W08a](items/W08a.md) | Define the package evidence category | done |
| [W02](items/W02.md) | Move the charter role | done |
| [W03](items/W03.md) | Move the four role destinations | done |
| [W04](items/W04.md) | Move the knowledge role | done |
| [W04b-i](items/W04b-i.md) | Extract the admitted jobs from the residue | done |
| [W04b-ii](items/W04b-ii.md) | Decide whether explanation is a role, then route the five pages | done |
| [W04c](items/W04c.md) | Admit the explanation form the five pages needed | done |
| [W05](items/W05.md) | Place the toolchain role | done |

### P1b — The role set completed

| Item | Title | Status |
| --- | --- | --- |
| [W05b](items/W05b.md) | Place the four pages no work item owned, and remove the one over a hard line | done |
| [W05c](items/W05c.md) | Give the two required roles a home, and record the third's retirement | done |

### P2 — Page repairs and audit closeout

| Item | Title | Status |
| --- | --- | --- |
| [W06a](items/W06a.md) | Give the status page back to its role | done |
| [W06](items/W06.md) | Fit oshi's role pages to their budgets | todo |
| [W07](items/W07.md) | Close the audit's remaining findings | doing |
| [W07a](items/W07a.md) | Repair the pointer and index residue | done |
| [W07b](items/W07b.md) | Convert `docs/conventions.md` to a base pointer | done |
| [W07c](items/W07c.md) | Drop the document-version rule the standard declines | done |
| [W07d](items/W07d.md) | Decide the retired-path citations in open backlog items and ADRs | done |
| [W07e](items/W07e.md) | Directory READMEs point at the norm instead of restating it | done |
| [W07f](items/W07f.md) | Retire the forwarding stubs and register the moved paths | done |
| [W07g](items/W07g.md) | Dispose of the four findings the batches did not carry | todo |
| [W10](items/W10.md) | Give each work item its own file and the ledger a board | done |

### P3 — Closeout

| Item | Title | Status |
| --- | --- | --- |
| [W08](items/W08.md) | Fix the standard gaps the rollout exposed | todo |
| [W09](items/W09.md) | Close the package and record oshi's disposition | todo |
