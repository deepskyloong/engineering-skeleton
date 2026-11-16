# Structure and placement

## Levels

A repository has three levels: root, member, module. The root holds the always-read files (`README.md`, `AGENTS.md`, `CONTEXT.md`), the shared `docs/` and `tasks/` trees, and the code boundary. A member is a package or app with its own `README.md`, `src/`, `tests/`, and docs when it has member-specific facts. A module is a boundary inside a member; it earns its own `AGENTS.md` only under the threshold in `docs/spec/0002-roles.md`.

This repository has no members. Its root is the whole repository: `docs/` holds the specification and supporting policy, `template/` holds copyable starting points, `tasks/` holds the work packages, and `scripts/` holds the gate. A monorepo replaces `src/` and `tests/` with `apps/` and `packages/`; a single-package repository keeps them at the root.

## Directory ownership

Each directory's `README.md` lists its direct children. `docs/README.md` lists the docs subdirectories; `docs/spec/README.md`, `docs/decisions/README.md`, and `docs/backlog/README.md` list their own pages. A parent lists directories, not files. No page restates another directory's inventory; a structure page that lists files is a second index.

## The relationship between the three layers

| Layer                            | Holds                                                                    | Changes when                                          |
| -------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| `docs/spec/`                     | Normative rules and rationale                                            | A role, rule, budget, or flow is deliberately changed |
| `template/`                      | Copyable starting points, derived from the spec                          | The spec changes, in the same or the next commit      |
| the skill (`i-project-skeleton`) | A thin entry point: modes, order, hard rules, pointer to this repository | The mode sequence or the repository path changes      |

The direction is always spec → template → skill. A template rule that the spec does not state is a template bug. A skill step the spec cannot justify is a skill bug.

## Placement rules for new files here

1. Is it normative — does it bind a generated repository? → `docs/spec/`.
2. Is it about this repository's own operation? → `docs/` top level.
3. Is it a copyable starting point? → `template/`.
4. Is it a decision with rejected alternatives? → `docs/decisions/`.
5. Is it a deferred idea? → `docs/backlog/`.
6. Is it a lesson that will change what a maintainer does next time? → `docs/knowledge/`.
7. Is it executable and run on every change? → `scripts/`.

The chosen home's `README.md` is the membership list. Do not add a row here.

## Artifact tiers

| Tier          | Meaning                                          | Lives in git |
| ------------- | ------------------------------------------------ | ------------ |
| Authoritative | The source of truth for a rule or a template     | Yes          |
| Regenerable   | Produced from an authoritative file by a command | No           |
| Runtime       | Session state, caches, reports produced by a run | No           |

`template/` and `docs/spec/` are authoritative. A generated index or a rendered copy is regenerable. A review report body is runtime; only its index is authoritative.
