# ADR-0029 — A work item is a file; the board is its index

Status: Accepted (2026-11-19)

## Context

ADR-0009 made the work package a work-item ledger: `todo.md` held a `Current state` block, then one `#### W<n>` block per item under phase headings. That shape served a package with ten items. It does not serve one with twenty-four.

Measured on oshi's package at 2026-11-19, before this decision: 31,944 non-whitespace characters. Eighteen closed items were 24,557 of them (77%), the five open items 4,989 (16%), and the dashboard with its headings 2,398 (7%). A conversation focused on one open item read the whole file, so 77% of its ledger budget went to work that was already done and would never change again. The closed detail is not worthless — it is the record of what was tried — but it is history, and the standard's own split puts history in the record, not in the working state a maintainer opens every turn.

The package's other artifacts are also large: `plan.md` was 10,096 characters and the seven `maps/` files 102,824. The ledger is not the only cost, but it is the only one that grows with finished work: a late discovery adds an item, and a closed item keeps its block forever.

The standard's package rules constrained the shape. A package root admits only the ledger files; any other file is `unexpected package file`. A top-level directory is package evidence and must be named in `summary.md`. ADR-0021 fixes four ledger files, and the checker enforces them. An item file therefore cannot be added inside a package without a standards change; it is not a package-local experiment.

## Decision

A work item is one file, and the ledger that lists it is a board.

- **`items/<ID>.md`.** Each work item is a file named by its ID alone — `W01.md`, `W04b-i.md`, `W07g.md` — carrying its dependencies, a prose description, the done-when criteria, and evidence. The file's first line is `# <ID> — <title>`.
- **`board.md`.** The file formerly called `todo.md` becomes `board.md`: the `Current state` snapshot, then an index grouped under the plan's phase headings, one row per item with its title, its status, and a link to the item file. Status lives there and nowhere else; an item file never repeats it.
- **Still four ledger artifacts.** `spec.md`, `plan.md`, `board.md`, `summary.md`. `items/` is a reserved directory of the package, not a fifth ledger and not evidence; it is not named in `summary.md`, and closeout archives it with the package.
- **No slug in the item path.** The title lives in the H1 and the board. A retitled item keeps its path; a path that moves needs an adapter row (ADR-0028), and a title changes more often than an ID.
- **The checker holds the two halves together.** It reserves `items/`, stops treating it as evidence, requires `board.md` in an open package, and checks that every item file has a board row and every board row a file. Archived packages keep the old block shape; the checker does not demand a rewrite of a frozen record.
- **The board is not a directory index.** Its snapshot carries counts on purpose; index autonomy (R2) governs index pages, not a package's working state.

## Options considered

1. **Collapse closed items in place.** Keep `todo.md`, keep every open block, and reduce each closed item to one row in a `## Closed` table. Measured: about 8,300 characters, a 74% cut, with changes to `flow.md`, `roles.md`, the template and the package README, and no checker change. Rejected as the decision, kept as the fallback: it preserves the single-file ledger and so preserves the collision between two conversations writing the same file, and it deletes the closed prose from the package (recoverable from `git show`, but no longer where a reader looks). It also keeps the name `todo.md` for a file that would list done work.
2. **Move only the closed items into files.** Keep open blocks in `todo.md`, put each closed item at `items/<ID>.md`. Rejected: it pays every structural cost of the chosen option — reserved directory, evidence exclusion, parity check, template, skill — and delivers only the size cut of option 1. Two homes for one item's detail unless status and links are duplicated.
3. **One file per item, one board for the state and the index.** Chosen. The working state is bounded by the work still open, a conversation opens only the item it is on, and two conversations no longer write the same file.
4. **One file per phase.** Rejected: phases are `plan.md`'s job, and a phase file still mixes seven items and both open and closed work. It moves the same bytes without separating what a reader needs.
5. **Keep the name `todo.md`.** Rejected: once the file lists done items and links their files, the name is false. `index.md` collides with the directory-index role, `ledger.md` with the four-file collective, `status.md` with the Status role, and `tracker.md` with `track:`. `board` holds the snapshot and the index at once.
6. **`tickets/` instead of `items/`.** Rejected: `GLOSSARY.md` already lists `ticket` under `_Avoid_` for the work package, and a ticket implies an intake-and-triage queue the standard does not have. The unit has been called a work item since ADR-0009.

## Consequences

- `docs/norm/flow.md` changes the package tree, the creation step, the `Current state` home, the work-item section, closeout step 3, and the acceptance checklist.
- `docs/norm/roles.md` states the work package's admission as a board of work items; `docs/norm/rules.md` adds `board.md` and the item files to the working-state list; `docs/norm/foundations.md` shows the new tree.
- `GLOSSARY.md` gains `work item`, `parent item` and `board`, and the work package entry names spec, plan, board and summary.
- `template/effort/work-packages/_template.md` splits into four ledger files plus an `items/` example; both work-package READMEs state the new rules; the skill's creation step names `items/`.
- `scripts/doc-checks.ts` reserves `items/`, excludes it from evidence naming, requires `board.md` in an open package, allows `todo.md` only in the archive, and checks index/file parity plus the H1. `scripts/docs-model.ts` gains the item naming pattern. The tests cover both shapes.
- Oshi's package migrates in the same change: `todo.md` becomes `board.md`, the 23 blocks become 23 files plus the new item that carries this decision, and `plan.md` points at the item files. The old text stays recoverable at `git show 64f4cc6:work-packages/rollout-oshi/todo.md`.
- The three archived packages keep `todo.md`. A frozen package is not rewritten to a shape it did not use.
- The board and the item files carry no volume budget: they are working state. The board's row count is bounded by the number of work items, which is bounded by the work.
