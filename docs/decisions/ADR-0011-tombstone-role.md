# ADR-0011 — A tombstone is a role at the old path

Status: Accepted (2026-11-17)

## Context

`0004-rules.md` admits a tombstone as the fourth retirement exception: at most 400 non-whitespace characters, exactly one link, kept only while a frozen record cites the old path. `0002-roles.md` had no row for it — no home, admission, exit, or trigger — and `scripts/check.py` had no path pattern. A correct tombstone inside `docs/` therefore failed the role-path check even when it matched every stated rule. `B-0008` recorded the gap.

Oshi's `docs/backlog.md` is the applied sample: 258 non-whitespace characters, one link to `backlog/README.md`, kept because 18 files cite the old path. The 2026-11-16 audit classified it as `unplaced: docs page`, which is the failure the missing row produces. Oshi's decisions move is the next migration and will create four more tombstones, so the role has to exist before that move.

## Decision

A Tombstone is an optional role admitted by trigger:

- **Home**: the old path being forwarded.
- **Admission**: a forwarding stub for a moved file — at most three non-empty lines, exactly one link to the successor, no explanation; the title ends with `— moved`.
- **Exit**: deleted when the last frozen record citing the old path is deleted.
- **Trigger**: a frozen record cites a path that has moved.
- **Budget**: 400 non-whitespace characters, exactly one link, per `0004-rules.md`.

`scripts/check.py` admits and enforces the shape: a file whose first line ends with `— moved` must have at most three non-empty lines, exactly one link, and at most 400 non-whitespace characters. Such a file is exempt from the role-path and naming maps. A directory whose markdown files are all tombstones is a forwarding shelf and needs no `README.md`.

## Options considered

1. **Register the old path in `docs/adapters.md` only, with no forwarding file.** Rejected: `0006-migration.md` M5 requires a tombstone; a registry row leaves the old path 404 for a reader who follows a citation, and a legacy path is a retirement queue, not a forwarding stub.
2. **One ledger page, `docs/tombstones.md`, holding every alias.** Rejected: the old path still 404s; the ledger becomes a second index and loses the per-path locality that makes a citation resolve.
3. **A role at the old path plus a gate pattern.** Chosen: the citation resolves, the artifact is one file with one link, and the gate can tell a tombstone from a live page.

## Consequences

- `B-0008` closes: the role exists and the checker enforces it.
- `0002-roles.md` carries the row; `0004-rules.md` states the path and the title marker; the template's governance and workflow pages carry the shape.
- Oshi's decisions move uses the role: each cited ADR leaves a three-line tombstone at `docs/adrs/adr-NN-*.md` while the live file moves to `docs/decisions/`.
- A directory that holds several tombstones and nothing else is a forwarding shelf, not an empty directory and not an index; the gate accepts it without a README.
