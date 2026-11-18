# Plan

## Approach

1. Move `tasks/` to `work-packages/` and `template/effort/tasks/` to `template/effort/work-packages/` with `git mv`, so history follows the files; the open package `rollout-oshi` and its archive move as units.
2. Update every living pointer: the roles table, `flow.md`, `foundations.md`, `rules.md`, `structure.md`, both `README.md` copies, `GLOSSARY.md`, `docs/workflow.md`, the template's workflow and adapter pages, and the template's own `README.md`.
3. Add ADR-0019 with the rejected names, and its row in `docs/decisions/README.md`.
4. Bump `standard v1` to `standard v2` in `README.md` and `docs/norm/README.md`; moving a role's home is a version change under `docs/governance.md`.
5. Update the skill's create-package step, which names the old root.
6. Close out: name the surviving old-path citations in `summary.md`, move the package to `work-packages/archive/`, and move its rows.

## Work breakdown

| Phase | Work items | Exit condition |
| --- | --- | --- |
| P0 — Home move | W01–W02 | Directories moved; every living page names the new root; gate green |
| P1 — Closeout | W03 | ADR accepted and indexed; version bumped; summary written; package archived |

The table names the phases and their exit conditions; each item's description, acceptance, and evidence live in `todo.md`.

## Risks

| Risk | Mitigation | Stop condition |
| --- | --- | --- |
| A global replace rewrites a frozen citation or the dated oshi snapshot | Replace only the whitelisted living pages, then audit `rg -n 'tasks/'` by hand | A frozen record changed in the diff |
| A pointer is missed because it spells the path without a trailing slash | Grep the bare word, not only `tasks/`; the tree diagram is the case that bites | A living page still names `tasks` as a path |
| The package's own text self-references the old root | Rewrite `rollout-oshi`'s procedural lines; keep its dated evidence lines | An instruction tells a later effort to write into `tasks/` |

## Out of scope

- The oshi repository itself; its suite track and its own `tasks/` stay where they are.
- Any tombstone at the old root: in a consumer that path belongs to the suite, so a forwarding stub would rebuild the collision.
