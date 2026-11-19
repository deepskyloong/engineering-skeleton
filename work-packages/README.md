# Work packages

One directory per effort that needs a ledger: `work-packages/<slug>/`, holding four ledger files by closeout and the evidence directories it creates. A change that ends in one commit takes no package. What outlives the effort moves to `docs/`; the package itself moves to `work-packages/archive/<slug>/` at closeout and stays there as a frozen record.

## Rules

- Slug: `kebab-case`, describes the outcome (`add-retry-budget`, not `ticket-42`).
- Four ledger files: `spec.md` (what), `plan.md` (how), `todo.md` (work items and current state), `summary.md` (result, written at closeout). Split `_template.md` into these four, then delete `_template.md`.
- Evidence the effort produces lives in a named directory beside the ledger — a report, an inventory, or a reproduction script. It stays in git, `summary.md` names it, and closeout archives it with the package. Never create an empty evidence directory.
- The first thing in `todo.md` is a `Current state` block; see `docs/norm/flow.md` for its fields and the same-commit update rule. It is a snapshot, not a log.
- Work items are `W<n>` blocks under phase headings; each carries status, dependencies, a prose description, done-when criteria, and evidence. `done` requires evidence, and the evidence field cites artifacts and what each proves rather than restating them; `plan.md` carries the phase breakdown.
- `spec.md` carries a `track:` field. See `docs/workflow.md`.
- A work package that changes its goal is a new work package.
- On closeout: write `summary.md`, take the four ledger files and the evidence directories it names, move the package to `work-packages/archive/<slug>/`, and move the row to the archive index.

## Open

| Slug | Goal | Track | Status |
| --- | --- | --- | --- |
| rollout-oshi | Adopt the repository standard in oshi | default | open |

## Archived

Closed packages move to `work-packages/archive/<slug>/`; `work-packages/archive/README.md` is their index. The table above lists open packages only, so a package's state is its location rather than a column.

## Closeout checklist

The five closeout steps are in `docs/norm/flow.md`; this checklist verifies them.

- [ ] `summary.md` names what was not done.
- [ ] `summary.md` names every evidence directory; none is empty.
- [ ] Contracts, ADRs, and knowledge files have homes and index links.
- [ ] `rg -l '<slug>'` was run.
- [ ] Every done work item cites evidence; every open item is in `Current state`.
- [ ] This table no longer lists the package; `work-packages/archive/README.md` does.
- [ ] The package is at `work-packages/archive/<slug>/` and frozen.
- [ ] The gate is green.
