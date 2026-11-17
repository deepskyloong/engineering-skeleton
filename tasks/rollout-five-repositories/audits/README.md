# Audit reports

One report per repository, written before its migration. The format is the fixed review format from `docs/governance.md`: severity, role, problem, why, minimal fix.

A report is runtime evidence for the work package; a finding that changes the specification becomes a backlog item in `docs/backlog/`, and a finding that records a choice becomes an ADR. Do not edit the report after its repository has migrated: write a new one.

| Repository | Report             | Disposition                                                                                                                                                                                                                                                                                                      |
| ---------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oshi       | [oshi.md](oshi.md) | audit complete; adapters, tasks index, operations split, and the status page at `docs/status.md` committed; suite tracks registered and closed packages left in place; next role `docs/decisions`; contracts and knowledge pending; vocabulary is `GLOSSARY.md` (canonical after ADR-0007; no `CONTEXT.md` move) |

ADR-0007 supersedes finding 7 and the `GLOSSARY.md` pointer-debt row in `oshi.md`; the report remains a dated snapshot. The vocabulary is `GLOSSARY.md`; do not move oshi's file to `CONTEXT.md`.

## oshi rulings (2026-11-17)

- **Suite tracks.** The four development-workflow suites own their track roots. The five closed packages under `docs/superpowers/` and `docs/compound-engineering/` stay in place and are registered as suite tracks (ADR-0010). Finding 3 is withdrawn: the five homes are four registered tracks plus the repository's own `tasks/` role. Finding 16 is withdrawn: a suite package may hold only the files a phase produced. Finding 2's reshape instruction is withdrawn for suite-owned packages; `tasks/README.md` exists and `head-kind-experiment` may stay spec-only.
- **Frozen evidence.** `experiments/` and `docs/plans/` stay frozen legacy paths; no move. `B-0007` stays open and fires only when a second repository keeps a frozen protocol. Finding 1's disposition is recorded; its role question is deferred.
- **Tombstones.** A tombstone is a role at the old path (ADR-0011); `B-0008` is closed. A correct tombstone is no longer `unplaced`.
- **Next role.** `docs/decisions`.

Resolved, withdrawn, or superseded: 2 (missing `tasks/README.md` resolved by `7443137`; the reshape instruction is withdrawn), 3 (withdrawn, registered tracks), 7 (superseded by ADR-0007), 8 (registry exists after W04), 16 (withdrawn). Still open: 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 17, and the role question inside 1 (`B-0007`).
