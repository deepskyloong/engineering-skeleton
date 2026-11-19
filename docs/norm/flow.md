# Flow: levels, work packages, closeout

## Three levels

A file lives at the lowest level that owns its fact. Shared facts climb; a fact used by one module never climbs.

| Level | Owns | Entry files | Never owns |
| --- | --- | --- | --- |
| Root | Scope, cross-member rules, the gate, the work-package queue, shared vocabulary | `README.md`, `AGENTS.md`, `GLOSSARY.md` (when shared terms exist) | A rule that only one member needs |
| Member | Its own charter-level facts, its own contracts, its own vocabulary, its own toolchain deviations | `README.md`; `AGENTS.md` only when it differs from the root's | A rule that only one module needs |
| Module | Its own boundary rule, its own README when the module is a real abstraction | `README.md` (optional); `AGENTS.md` only after the deferred threshold is met | Anything two modules share |

`GLOSSARY-MAP.md` exists only when there are member-level vocabularies. It lists the member contexts, their paths, and their relationships; it stores no definitions. A term defined in two places is a bug, even when the two definitions agree.

## Information flow

```text
idea
  └─ docs/backlog/B-<nnnn>-<slug>.md        (deferred, with a revisit trigger)
       └─ work-packages/<slug>/spec.md    (what this effort will do; track field)
            ├─ plan.md                    (how, with risks and stop conditions)
            ├─ todo.md                    (work items with status, done-when, evidence; Current state)
            └─ summary.md                 (what happened; 3 sections)
                 ├─ docs/contracts/<topic>.md   (a fact consumers may rely on)
                 ├─ docs/decisions/ADR-<nnnn>-*.md   (a choice with rejected alternatives)
                 ├─ docs/knowledge/guides|cases|notes
                 └─ (nothing)                 (most efforts end here)
```

The four ledger files may sit beside evidence directories the effort produces; `summary.md` names each directory and what it answers, and closeout archives them with the package.

Most work packages produce only `summary.md` and disappear. That is the normal case, not a failure. A standard that forces every effort to yield an ADR produces ADRs nobody reads.

## t0 — creating a work package

A package carries state that a single commit cannot: a phase boundary, an open decision, a blocked item, a hand-off, or work that spans more than one working session. Open one when at least one of those exists. A change that ends in one commit takes no package: edit, run the gate, commit, and write the ADR when the change is a decision.

Create `work-packages/<slug>/` from `_template.md`, split it into the four ledger files (`spec.md`, `plan.md`, `todo.md`, and `summary.md`, written at closeout), then delete `_template.md`; it is a scaffold, not a role. Create an evidence directory only when the first item exists; never an empty one.

Four fields before any work starts:

1. **Goal**: one sentence, testable.
2. **Non-goal**: at least one thing this effort will not do. A work package without a non-goal expands until it stalls.
3. **Acceptance**: how a reader will know it is done, in one command or one observable state.
4. **`track:`**: which workflow suite this effort runs on, as a field in `spec.md`. Values are free-form (`default`, `spec-flow`, `superpowers`, `none`), but the field is mandatory. The track is never a directory root: a repository does not get a `docs/superpowers/` just because one effort used that suite.

Before the first step, initialize `todo.md` with a `## Current state` block. It carries the updated date, status, branch, last gate result with its date, phase, focus, progress (done / todo / blocked), todo items, last completed work item, next work item, blocked items, open decisions, and the read-first pointers; the work items follow it. The block is a snapshot, not a log, and lives inside `todo.md`: it is not a fifth ledger file. Rewrite it in the same commit as any change to a work item, a decision, a branch, or the gate. A stale block is a defect.

If this effort answers a backlog item, set that row's `Status` to `active` in `docs/backlog/README.md` before work starts.

## Work items

The unit of work in `todo.md` is a work item: a stable `W<n>` ID, a status (`todo`, `doing`, `blocked`, `done`), its dependencies, a prose description of the work, one or more observable done-when criteria, and evidence. `done` requires evidence — a commit, a command, a file, or a decision; an item without evidence stays open. The description is prose, not a bullet list; the done-when criteria are bullets because each is a separate check. One work item is one reviewable commit or one primary outcome; if it needs more, split it.

`Evidence` cites artifacts and names what each proves. Detail the artifact carries, the ledger does not: an item that produced a report, a map, or a measurement cites it by path and one clause, never by recital. `todo.md` is working state and carries no volume budget, so nothing else stops a narrative from growing there.

`plan.md` groups the work items into phases, names the IDs in each phase, and states each phase's exit condition; it does not restate the item detail. `todo.md` keeps the item detail under `## Work items`, below the `Current state` dashboard.

## Runtime — the three permitted compromises

An effort may deviate from its plan in exactly three ways, each recorded in `summary.md`:

| Compromise | Allowed when | Record |
| --- | --- | --- |
| Scope reduction | The acceptance criterion is still met | Which goal was dropped and where it moved (backlog or nothing) |
| Track switch | The chosen suite cannot express the work | Old track, new track, why |
| Artifact deferral | A contract or ADR is not yet knowable | The trigger that will produce it |

Anything else — a changed goal, a changed acceptance criterion — is a new work package, not a compromise.

## Closeout — five steps, in order

1. **Write `summary.md`.** Three sections: what was done, what was not, what a future maintainer must know. It sits inside the summary budget in `rules.md`. A summary that restates the diff is noise.
2. **Relocate what outlives the effort.** A fact consumers rely on → `docs/contracts/`. A choice with rejected alternatives → `docs/decisions/`. A method that changes future behavior → `docs/knowledge/guides/`. An incident worth citing → `docs/knowledge/cases/`.
3. **Freeze the package.** Move `work-packages/<slug>/` to `work-packages/archive/<slug>/` as a unit, taking the four ledger files and the evidence directories `summary.md` names; a runtime artifact a successor package now owns stays with the successor. Check `rg -l '<slug>'`; a non-empty result means every survivor is explained, not that the directory is kept.
4. **Update the indexes.** Remove the row from `work-packages/README.md` and add it to `work-packages/archive/README.md`, linking `summary.md`. If the effort answers a backlog item, set that row's `Status` to `closed` in `docs/backlog/README.md`. An index that still calls a closed item `open` is worse than no index.
5. **Leave a tombstone if a frozen record cites the old path.** ≤3 lines, exactly one link, no explanation. A tombstone is a forwarding stub, not a summary; it points into the archived package. If no frozen record cites the path, skip it and stop.

## Who decides and how a change is reviewed

The owner decides a package's scope and non-goals, and any change to a role's home. An agent may write prose, templates, and the gate within the rules this standard states; the red lines it must respect every turn live in `AGENTS.md`. Removing or moving a role needs an ADR with the rejected alternatives; a budget change needs the old value, the new value, and one measured sample.

A review is adversarial by default: the reviewer tries to break the structure rather than praise it, and the output format is fixed — `[blocker|major|minor|nit] section — problem / why / minimal fix`. A finding without a section reference cannot be adjudicated. Every finding is accepted, accepted with a different fix and the reason recorded, or deferred to the backlog with a revisit trigger; a deferred finding does not disappear.

## Acceptance checklist

Run before declaring a work package closed:

- [ ] `summary.md` exists, is inside budget, and names what was not done.
- [ ] `summary.md` names every evidence directory, and no evidence directory is empty.
- [ ] Every contract, ADR, or knowledge file produced by the effort has a home and a link from its directory README.
- [ ] `rg -l '<slug>'` was run; every surviving pointer is explained.
- [ ] The row moved from `work-packages/README.md` to `work-packages/archive/README.md`.
- [ ] The package is at `work-packages/archive/<slug>/` and read-only.
- [ ] A backlog item this effort answered is marked `closed` in `docs/backlog/README.md`.
- [ ] Every done work item cites evidence; every open item is in `Current state`.
- [ ] The gate is green.
- [ ] No new optional role was created without its trigger.

## Adapter closeout

A third-party suite that writes into the repository is not migrated; it is registered. `docs/adapters.md` carries one row per suite track: its roots, what reads it, the compatibility whitelist, and the disposition — the track is permanent, and no closeout step relocates it. The suite keeps writing where it writes; the standard stops pretending that path is its own.

The artifact shape a suite writes at those roots, and every repository rule layered on the suite's default, live in `docs/suite-tracks.md`; the registry carries the tolerance and the disposition, the map carries the shape. Splitting them keeps a tolerant row from becoming a directory layer.

A suite's closed packages stay in the track. A repository does not fold them into `work-packages/<slug>/`: the suite loads its path by name, so a move changes nothing on disk and leaves two layouts behind.

A legacy path that survives migration follows the other row kind: it appears in `docs/adapters.md`, and it is removed only when its last consumer is gone. Forcing a foreign tool to accept a new path costs more than one line in a registry.
