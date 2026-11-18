# ADR-0017 — Closed work packages move to an archive location

## Status

Accepted; superseded in part by [ADR-0020](ADR-0020-work-package-home-is-work-packages.md) (2026-11-18). The archive rule stands; its path moved to `work-packages/archive/`.

## Context

`0002` and `0003` deleted a closed work package. The rationale was that `git log` keeps the text and that deleting is the only way a reader can tell what is current. In practice the closeout writes `summary.md` at the end and deletes the directory in the same commit, so the summary never enters a tree: `rollout-five-repositories` closed at `b041762` with its plan, spec, and todo in the parent commit and no `summary.md` anywhere. The same sequence loses the summary for every later package. A closed package is also the record of how the effort was run, and reading it through `git show` is poor when the repository is small and the record is consulted by hand.

## Decision

A closed work package moves, as a unit, to `tasks/archive/<slug>/`. The four files stay, read-only; `tasks/archive/README.md` indexes one row per package and links its `summary.md`; `tasks/README.md` lists open packages only and points at the archive. An archived package binds nothing — `0002` already says a work package has no authority after closeout — and `summary.md` is the entry point.

The first closeout creates `tasks/archive/README.md`; the directory is not pre-built. `git mv` moves the package as one unit, and the closeout remains one commit, so the summary is in the tree with the package.

## Options considered

- **Delete, as before.** Rejected: it lost the summary in the first application, and it forces `git show` for every dispatch. Its benefit, a tree that shows what is current, survives the move because the open table no longer lists closed packages.
- **Keep the package at `tasks/<slug>/`.** Rejected: the queue and the record share one listing, and a reader must check each package's status before trusting it.
- **Keep `summary.md` only.** Rejected: it bounds the archive but drops the plan and the work items, which are the record of how the effort was run.
- **A root `archive/` directory.** Rejected: it adds a fourth top-level tree for one artifact class; `tasks/archive/` keeps work-package material under the tree that owns it.
- **A backlog archive page.** Rejected here: that is `B-0006`'s question for the backlog index, not a home for work packages.

## Consequences

- `tasks/archive/` is a permanent location; its index grows by one row per closed package. `B-0006` still governs the backlog index, which keeps no archive.
- The closeout steps, the tasks index, the work-package template, and the `tasks/archive/README.md` index change together.
- The `rg -l '<slug>'` proof stays; a frozen record that cites a file in the old package still gets a tombstone, which points into the archive.
- An archived package is never edited; a later effort that needs its facts gets a new work package instead.

## References

`b041762` (the closeout that lost the summary); `B-0006` (the archive role as an index-growth option); `docs/spec/0002-roles.md`, `docs/spec/0003-flow.md`.
