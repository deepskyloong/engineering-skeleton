# Board

## Current state

- Updated: 2026-11-20
- Status: open
- Phase: P3 — closeout
- Gate: all green (2026-11-20; one soft standard warning); 2/2 repositories
- Next: W12 — convert `template/core/docs/structure.md` to links
- Last done: W14 — evidence gives each artifact one entry (standard `a1b727f`, `09f0fa1`)
- Blocked: none
- Open decisions: none

## Repositories

| Repository | Branch | Gate command | Last result |
| --- | --- | --- | --- |
| repository-standard | `feature/b0005-rollout-oshi` | `bun run gate` | PASS 2026-11-20 (147 markdown files, 87 tests; one soft `roles.md` warning) |
| oshi | `feature/skeleton-migration` | full gate in oshi `AGENTS.md` "Gate" | green at `2a7ff38` (pytest 658 passed / 1 skipped; `ty` clean; ruff 231 files; prose 244 files; `bun run validate` 86 tests) |

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
| [W06](items/W06.md) | Fit oshi's role pages to their budgets | done |
| [W07](items/W07.md) | Close the audit's remaining findings | done |
| [W07a](items/W07a.md) | Repair the pointer and index residue | done |
| [W07b](items/W07b.md) | Convert `docs/conventions.md` to a base pointer | done |
| [W07c](items/W07c.md) | Drop the document-version rule the standard declines | done |
| [W07d](items/W07d.md) | Decide the retired-path citations in open backlog items and ADRs | done |
| [W07e](items/W07e.md) | Directory READMEs point at the norm instead of restating it | done |
| [W07f](items/W07f.md) | Retire the forwarding stubs and register the moved paths | done |
| [W07g](items/W07g.md) | Dispose of the four findings the batches did not carry | done |
| [W10](items/W10.md) | Give each work item its own file and the ledger a board | done |

### P3 — Closeout

| Item | Title | Status |
| --- | --- | --- |
| [W08](items/W08.md) | Fix the standard gaps the rollout exposed | todo |
| [W11](items/W11.md) | Pad oshi's backlog series to four digits | done |
| [W12](items/W12.md) | Point `template/core/docs/structure.md` at the norm instead of copying it | todo |
| [W13](items/W13.md) | Let the item description take the form its content needs | done |
| [W14](items/W14.md) | Give evidence one entry per artifact | done |
| [W09](items/W09.md) | Close the package and record oshi's disposition | todo |
