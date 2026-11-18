# Repository Standard

A language-agnostic repository standard: which documents a long-lived project needs, where each one lives, how work moves from an idea to a recorded decision, and how the whole thing stays maintainable.

## Why this exists

Five repositories under `E:\Projects` grew five different documentation systems. They converged on the same roles — rule layer, index, decision record, backlog, work package, knowledge capture — but disagreed on where each role lives, what it is called, and how big it may get. The cost shows up in two places: a new repository has to reinvent the layout, and an agent entering an existing one has to guess where the next document belongs.

This repository makes the roles normative and keeps the layout as small as it can be while still covering a project that lives for years.

## What is here

| Path | Role |
| --- | --- |
| `docs/norm/` | The binding text of the standard. Read this before changing anything else. |
| `docs/charter.md` | Scope, non-goals, hard constraints, success criteria. |
| `docs/structure.md` | This repository's layout and the placement rules for new files. |
| `docs/conventions.md` | Language, naming, citation, and the five role discriminations. |
| `docs/governance.md` | Versioning, change surface, review, and how the standard evolves. |
| `docs/workflow.md` | The three operating modes: forge, audit, migrate, and the migration mapping table. |
| `docs/decisions/` | ADRs — the choices that shaped the standard, with rejected options. |
| `docs/backlog/` | Deferred items with a revisit trigger. |
| `tasks/` | Work packages: spec, plan, todo, and the closeout summary. |
| `template/` | Copyable starting points: day-one files, first-effort files, language overlays. |
| `scripts/check.py` | The document checks inside `bun run gate`: role coverage, link resolution, budget, naming, table shape. |
| `package.json`, `.oxfmtrc.json`, `ruff.toml` | Root tooling for the gate: Bun format for code, Prettier for Markdown, Ruff lint, and command wiring. |
| `.github/workflows/gate.yml` | CI forwarding: runs `bun run gate` on push and pull request. |

## Quick start

1. Copy `template/core/` into the new repository root; replace every `<placeholder>`.
2. Pick one overlay under `template/overlays/` and follow its README.
3. Run the day-one checklist in `docs/workflow.md` (mode: forge).
4. When the first work package starts, copy `template/effort/` and create `tasks/<slug>/spec.md` with a `track:` line.
5. Run `bun install && bun run gate` in this repository after changing the norm or a template.

## Reading order

For a person: this file → `docs/charter.md` → `docs/norm/foundations.md` → `docs/norm/roles.md`.

For an agent: `AGENTS.md` → the routing table there → the one norm page the task needs.

## Status

`standard v1`. The template and the skill are downstream: when a role or budget changes, all three change in the same commit. A machine-checkable checker for target repositories is deferred (`docs/backlog/B-0002`).
