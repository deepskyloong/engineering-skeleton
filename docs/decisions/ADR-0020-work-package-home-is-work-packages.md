# ADR-0020 — The work-package home is `work-packages/`

Status: Accepted (2026-11-18)

## Context

ADR-0010 registers a third-party suite's track root as a permanent adapter: the suite loads its path by name, so the repository neither relocates nor merges it. One registered track writes `tasks/<slug>/`, and the Work package role's home was the same path. A repository carrying both held one directory with two owners and two file shapes, and the adapter registry could not separate them — its row names a root, not a subset of packages. A closeout would move a suite package into the role's archive, or the reverse.

The name also contradicted the vocabulary. `GLOSSARY.md` defines the work package with `_Avoid_: task, ticket`; the path used the avoided word, so every pointer named the role by its banned synonym. That defect predates the collision.

## Decision

The work-package role lives at `work-packages/`:

| Path | Role |
| --- | --- |
| `/work-packages/README.md` | Work package index |
| `/work-packages/<slug>/` | Open work package |
| `/work-packages/archive/<slug>/` | Closed work package |

`tasks/` is not a path of this standard. It stays a suite track wherever the suite is installed. No tombstone is left at the old root: in a consumer that path belongs to the suite, so a forwarding stub would rebuild the collision the move removes. A frozen record that cites `tasks/<slug>/` keeps its text and stops resolving; the suite's adapter row is the explanation.

## Options considered

1. `work-packages/` — chosen. The path states the role's name; `roles.md`, the template, and the glossary use one term; no registered or plausible suite track claims it.
2. `efforts/` — rejected: it reuses `template/effort/`'s noun, so `template/effort/efforts/` reads as two nested homes and forces a second rename of the template tier.
3. `changes/` — rejected: "change" already means a commit-sized unit and the change surface; an effort is not always a change, and the name courts the next change-proposal suite.
4. Keep `tasks/` and let each consumer choose a different root — rejected: a canonical path that varies per repository is not canonical, and the template cannot express it.
5. Keep `tasks/` and ask the suite to accept another root — rejected: a suite loads its path by name, and ADR-0010 already decided that the repository yields.
6. Short generic names (`works/`, `work/`, `units/`) — rejected: they read as a scratch area or say neither package nor item.
7. Names already taken (`tracks/`, `packages/`, `projects/`, `specs/`, `plans/`) — rejected: `track` is the workflow-suite term in the glossary; `packages` is the monorepo member name; `projects` collides with the member-level word; `specs` and `plans` put one of the four files' names on the container, the two-sense defect `roles.md` forbids.
8. Lifecycle-flavored names (`jobs/`, `runs/`, `queue/`, `sprints/`) — rejected: CI and runtime connotations; a queue cannot hold the archive; a sprint is a time box and an effort is not one.

## Consequences

- `docs/norm/roles.md`, `flow.md`, `foundations.md`, and `rules.md` carry the new paths; `docs/structure.md`, both `README.md` copies, `GLOSSARY.md`, and `docs/workflow.md` follow.
- `template/effort/work-packages/` replaces `template/effort/tasks/`; the template's README, `_template.md`, workflow page, and adapter page name the new root.
- A consumer registers the suite's `tasks/` as a suite track and stops registering the standard's own role there; the two owners now have separate roots.
- The summary budget in `rules.md` keeps its numbers against the new paths. The gate still does not measure it; that gap predates this ADR.
- ADR-0017 is superseded in part: closed packages still move to an archive as a unit, now at `work-packages/archive/`. ADR-0010's decision stands; its consequence naming the repository's own `tasks/` role is historical.
- A repository migrated from the old layout moves its packages; no tombstone is placed, and citations in frozen records stop resolving by design.
- `standard v2`: moving a role's home is a version change under `docs/governance.md`.
