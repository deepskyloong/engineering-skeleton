# B-0006 — Backlog index growth under a fixed entry budget

## Problem

The index now keeps closed rows and carries `Status`. The entry budget is 60 rows. Closed items accumulate monotonically, so a long-lived repository will either break the budget or delete evidence.

## Evidence

- The `Status` column and the "closed rows stay" rule were added on 2026-11-14.
- oshi's backlog has 19 items and keeps closed rows; it is the reference shape, but also the largest sample.
- No archive role exists. Adding one is a role admission, not a formatting fix.

## Revisit when

Any repository's backlog index exceeds 40 rows, or a second repository migrates. Decide one: exclude closed rows from the entry budget (loses scannability), add a backlog archive page as an optional role (new role), or prune closed rows after their outcome is cited (loses the complete inventory).
