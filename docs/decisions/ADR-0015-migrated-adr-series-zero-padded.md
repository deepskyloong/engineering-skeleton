# ADR-0015 — A migrated ADR series is zero-padded to four digits

Status: Accepted (2026-11-17)

## Context

ADR-0004 made every numbered file four digits and let a migrated repository keep its existing width, so a migration would not rename records. That exception now has its first applied case: oshi moved its four ADRs as `ADR-09`–`ADR-12` (2026-11-17), and it is the only ADR series in the rollout that is not four digits — bun-toolkit's five, gearset's twelve, and python-toolkit's two are all four digits. The checker's ADR pattern is four digits, so the exception can be neither enforced nor expressed; a target gate and a reader carry two widths.

The same width rule covers backlog IDs. Oshi's backlog is `B-1`–`B-25`, and its items are cited by path and line in frozen records (`docs/backlog/B-13-degenerate-crops.md:46`), while the backlog index admits no file other than `README.md`. A forwarding tombstone is a three-line stub; it cannot preserve a line anchor.

## Decision

A migrated ADR series is zero-padded to four digits at migration and is never renumbered. Padding is not renumbering: `ADR-09` and `ADR-0009` are the same record. A migrated backlog series keeps its width and is never renumbered.

## Options considered

- Keep the migrated width for ADR series too. Rejected: the four-digit rule then has an ADR exception only the target knows, and the checker cannot express it.
- Renumber the migrated series into a fresh range. Rejected: changes the identity a citation carries; padding keeps the number.
- Pad backlog items too. Rejected: frozen records cite them by path and line, and a tombstone cannot preserve a line anchor (M5).
- Leave the backlog carve-out implicit. Rejected: the next target would guess whether its backlog pads; the rule states it.

## Consequences

- A migration renames ADR files once and updates every living pointer; old paths are tombstoned only where a frozen record cites them. Old labels keep the number.
- A migrated backlog keeps its width; a portable checker (`docs/backlog/B-0002-portable-skeleton-check.md`) must accept `B-<n>` as well as `B-<nnnn>`.
- Oshi's four ADRs are the first application: the series is `ADR-0009`–`ADR-0012`, and the three old `docs/adrs/` tombstones point at the padded files.
