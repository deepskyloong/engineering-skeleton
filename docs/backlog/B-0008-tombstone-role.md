# B-0008 — Tombstones have no role row

## Problem

`docs/norm/rules.md` defines a tombstone as one of four retirement exceptions: at most 400 non-whitespace characters, exactly one link, kept only while a frozen record cites the old path. `docs/norm/roles.md` has no row for it: no home, no admission, no exit, and `scripts/check.ts` has no path pattern. A migration that leaves a forwarding file therefore creates an artifact the role table cannot place, and the next audit reports it as `unplaced`.

## Evidence

- oshi's `docs/backlog.md` is a correct tombstone by `0004`'s rules: 258 non-whitespace characters, one link to `backlog/README.md`, kept because 18 files cite the old path. The 2026-11-16 measurement classified it as `unplaced: docs page` because no role row matches it.
- The oshi audit proposes more tombstones (`docs/adrs/`, `archived/`); `GLOSSARY.md` is the canonical vocabulary after ADR-0007; `docs/status.md` stays at its top-level home after ADR-0006.
- `scripts/check.ts`'s `DOC_ROLE_PATHS` has no tombstone pattern, so a tombstone inside `docs/` fails the role-path check even when it is correct.

## Minimal fix

Add one row to `docs/norm/roles.md` under "Optional, admitted by trigger":

- **Home**: the old path being forwarded.
- **Admission**: at most 3 lines, exactly one link, no explanation.
- **Exit**: deleted when the last frozen record citing it is deleted.
- **Trigger**: a frozen record cites a path that has moved.

Keep the 400-character budget in `docs/norm/rules.md`; add the tombstone pattern to `scripts/check.ts` and to the portable check set in `B-0002`.

## Revisit when

The first tombstone is created during the rollout, which is oshi's first move. A tombstone that survives after its last citation is deleted is a finding, not a reason to keep the row.

## Outcome

The Tombstone role is admitted at the old path, and `scripts/check.ts` enforces the shape and exempts it from the role and naming maps. Closed 2026-11-17; see `docs/decisions/ADR-0011-tombstone-role.md`.
