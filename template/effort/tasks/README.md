# Work packages

One directory per effort: `tasks/<slug>/`, holding four files. The work package is temporary; what outlives it moves to `docs/`.

## Rules

- Slug: `kebab-case`, describes the outcome (`add-retry-budget`, not `ticket-42`).
- Four files: `spec.md` (what), `plan.md` (how), `todo.md` (steps), `summary.md` (result). Split `_template.md` into these four, then delete `_template.md`.
- The first thing in `todo.md` is a `Current state` block; see `docs/workflow.md` for its fields and the same-commit update rule. It is a snapshot, not a log.
- `spec.md` carries a `track:` field. See `docs/workflow.md`.
- A work package that changes its goal is a new work package.
- On closeout: write `summary.md`, relocate artifacts, delete the directory unless a frozen record cites it, and remove the row below.

## Open

| Slug | Goal | Track | Status |
| ---- | ---- | ----- | ------ |
| —    | —    | —     | —      |

## Closed

Closed packages leave this table. `git log` and their `summary.md` are the record.

## Closeout checklist

- [ ] `summary.md` names what was not done.
- [ ] Contracts, ADRs, and knowledge files have homes and index links.
- [ ] `rg -l '<slug>'` was run.
- [ ] This table no longer lists the package.
- [ ] The gate is green.
