# Workflow

## Tracks

A work package records `track:` in its `spec.md`: which workflow suite the effort runs on (`default`, `spec-flow`, `superpowers`, `none`). The field is mandatory; the value is free-form. The track is never a directory root: a repository does not get a `docs/<suite>/` because one effort used that suite.

## t0 — create a work package

A package carries state a single commit cannot: a phase boundary, an open decision, a blocked item, a hand-off, or work that spans more than one working session. Open one when at least one of those exists. A change that ends in one commit takes no package: edit, run the gate, commit, and record the choice in an ADR when the change is a decision.

Create `work-packages/<slug>/` with four files from `_template.md`, and fill in four fields before any work:

1. **Goal** — one sentence, testable.
2. **Non-goal** — at least one thing this effort will not do.
3. **Acceptance** — one command or one observable state.
4. **`track:`** — see above.

Before the first step, initialize `todo.md` with a `## Current state` block: updated date, status, branch, last gate result with its date, phase, focus, progress (done / todo / blocked), todo items, last completed work item, next work item, blocked items, open decisions, and read-first pointers. The work items follow it. Rewrite the block in the same commit as any change to a work item, a decision, a branch, or the gate; it is a snapshot, not a log, and a stale block is a defect. The block lives inside the four-file package; it is not a fifth file.

The unit of work is a `W<n>` block: status, dependencies, a prose description, one or more observable done-when criteria, and evidence. `done` requires evidence; an item without evidence stays open. `plan.md` groups the items into phases with an exit condition; the item detail stays in `todo.md`. One item is one reviewable commit or one primary outcome; split it when it needs more.

Add a row to `work-packages/README.md`. If this effort answers a backlog item, set that row's `Status` to `active` in `docs/backlog/README.md`. Slug rules: kebab-case, describes the outcome, not the ticket number. Closeout moves the whole package to `work-packages/archive/<slug>/`; `summary.md` is the entry point a reader opens first.

## Runtime — three permitted compromises

| Compromise | Allowed when | Record in `summary.md` |
| --- | --- | --- |
| Scope reduction | The acceptance criterion is still met | Which goal dropped, where it moved |
| Track switch | The chosen suite cannot express the work | Old track, new track, why |
| Artifact deferral | A contract or ADR is not yet knowable | The trigger that will produce it |

Anything else — a changed goal or acceptance criterion — is a new work package.

## Closeout — five steps

1. Write `summary.md` (≤3,000 non-ws chars): what was done, what was not, what a future maintainer must know.
2. Relocate what outlives the effort: contract → `docs/contracts/`; decision → `docs/decisions/`; method → `docs/knowledge/guides/`; incident → `docs/knowledge/cases/`.
3. Freeze the package: move `work-packages/<slug>/` to `work-packages/archive/<slug>/` as a unit. Check `rg -l '<slug>'`; every survivor is explained.
4. Move the row from `work-packages/README.md` to `work-packages/archive/README.md`, linking `summary.md`. If the effort answers a backlog item, set its row to `closed` in `docs/backlog/README.md`.
5. Leave a tombstone at the old path only when a frozen record cites it: ≤3 lines, exactly one link, title ending with `— moved`.

## Acceptance checklist

- [ ] `summary.md` exists, inside budget, names what was not done.
- [ ] Every contract, ADR, or knowledge file has a home and a link from its directory README.
- [ ] `rg -l '<slug>'` was run; every survivor is explained.
- [ ] The row moved from `work-packages/README.md` to `work-packages/archive/README.md`.
- [ ] The package is at `work-packages/archive/<slug>/` and read-only.
- [ ] A backlog item this effort answered is marked `closed` in `docs/backlog/README.md`.
- [ ] Every done work item cites evidence; every open item is in `Current state`.
- [ ] The gate is green.
- [ ] No optional role was created without its trigger.
