# B-0006 — Backlog index growth under a fixed entry budget

## Problem

The index keeps closed rows and carries `Status`. The entry budget is 60 rows. Closed items accumulate monotonically, so a long-lived repository will either break the budget or delete evidence. The volume budget no longer binds first — it is derived from the row cap — so the 60 rows are the actual ceiling, and no archive role exists.

## Evidence

- The `Status` column and the "closed rows stay" rule were added on 2026-11-14.
- oshi's backlog has 19 items and keeps closed rows; it is the reference shape, but also the largest sample.
- No archive role exists for the backlog index. Adding one is a role admission, not a formatting fix.
- 2026-11-17: `ADR-0017` admitted `tasks/archive/` for closed work packages. The backlog index still has no archive, so the options below are unchanged; an archive page for the backlog now has a pattern to follow.
- 2026-11-17: a twelfth row fits the 2,000 volume budget only after the rules lost about a hundred characters of redundancy. Volume binds at twelve rows while the entry limit allows 60, so the two limits are inconsistent, not merely tight. The decisions index repeats the defect: 40 rows allowed against 2,000, with 1,840 spent at twelve.
- 2026-11-17, same day: the volume half was settled by the revision in `docs/decisions/ADR-0013-two-tier-volume-budgets.md` — an index's soft volume is derived from its row cap, 6,000 for 40 rows and 8,000 for 60. At the measured ~112 characters per row plus the preamble, 60 rows is about 7,500 and fits, so the two limits no longer disagree. What remains is the entry ceiling itself.

## Revisit when

Any repository's backlog index exceeds 40 rows, or a second repository migrates. Decide one: exclude closed rows from the entry budget (loses scannability), add a backlog archive page as an optional role (new role), or prune closed rows after their outcome is cited (loses the complete inventory).
