# ADR-0031 — Every backlog series is zero-padded to four digits

Status: Accepted (2026-11-20). Supersedes the backlog clause of ADR-0015.

## Context

ADR-0015 let a migrated backlog keep its width so that a frozen record's path-and-line citation would survive the move, and oshi's `B-1`–`B-27` is the only series that took the carve-out. Three costs followed: no checker could express the exception without a second pattern, B-0002's item 7 ended up stating a four-digit pattern and a width carve-out in the same sentence, and one item carried two labels (`B-13` and `B-0013`) depending on who wrote it. On 2026-11-20 the maintainer ruled that preserving those frozen citations is not worth either cost: a citation to a renamed path is a broken pointer, not a reason for a second naming convention, and `git log --follow` plus one adapter row is the route back.

## Decision

Every backlog series is numbered with four digits: `B-<nnnn>-slug.md`. A migrated series is zero-padded at migration and is never renumbered; padding is not renumbering, so `B-13` and `B-0013` are the same item. ADR-0015's ADR clause stands unchanged.

## Options considered

- Keep the width for backlog series — rejected: the carve-out is unenforceable without a second pattern, and it leaves two labels for one item.
- Renumber a migrated series into a fresh range — rejected: it changes the identity every citation carries, which is what ADR-0015 already refused for ADRs.
- Register the series as a legacy path in the target's adapter registry — rejected: the row would silence the naming check for the whole series, including a typo, and the rule would stay unchecked exactly where it was named.
- A per-repository naming switch in the portable checker — rejected: a knob can silently disarm the check, and the tree already shows which convention it carries.

## Consequences

- Oshi's 27 backlog files are renamed to `B-0001`–`B-0027` in one migration unit (`work-packages/rollout-oshi/items/W11.md`); living pointers, source comments and tests follow the label, while frozen records keep theirs and one `docs/adapters.md` moved-path row names the successor.
- R11 is checkable with one pattern per series, and B-0002's item 7 states four digits with no carve-out.
- A citation to an old backlog path no longer resolves. That is the accepted cost, recorded here rather than repaired in each record.
