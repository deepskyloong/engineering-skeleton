# Summary — rename-work-package-home

## Done

Moved `tasks/` to `work-packages/` and `template/effort/tasks/` to `template/effort/work-packages/` with `git mv`; the open `rollout-oshi` package, the archive, and this package rode the move. Rewrote every living pointer: the norm pages (`roles.md`, `flow.md`, `foundations.md`, `rules.md`), `docs/structure.md`, `docs/workflow.md`, both `README.md` copies, `GLOSSARY.md`, the template's README, workflow, adapter, and scaffold pages, the backlog item that named the routing row, and the skill's create-package step. Added ADR-0020 with the rejected names, marked ADR-0017 superseded in part, and bumped `standard v1` to `standard v2` in the two files the gate compares. Gate: PASS — 97 markdown files.

## Not done

The oshi repository was not touched: its `tasks/` is the suite's track, and its own role file stays there until its package closes out. `work-packages/rollout-oshi/tools/audit_repo.py` still keys on a top-level `tasks`, so it reports the suite's root as the role until oshi migrates. The gate still does not measure `work-packages/<slug>/summary.md` against its budget — a gap that predates this package. The skill's mode table still cites `docs/spec/0001-foundations.md` and the other old norm paths; ADR-0019 created that drift, and repairing it is a separate change.

## What a future maintainer must know

No tombstone stands at the old root, by decision: in a consumer that path belongs to the suite, and a stub would rebuild the collision the move removes. Frozen citations of `tasks/<slug>/` stop resolving. The survivors of `rg -n 'tasks/'` are expected, not missed pointers: ADR-0009, ADR-0010, ADR-0017, the archived packages, the dated oshi snapshot under `work-packages/rollout-oshi/audits/`, the historical lines in `rollout-oshi/plan.md` and `todo.md`, one migration row in `docs/workflow.md` that names a target's pre-existing `tasks/`, and ADR-0020 itself, which quotes the old path to explain it.
