# Repository Standard

A language-agnostic repository standard: which documents a long-lived project needs, where each one lives, how work moves from an idea to a recorded decision, and how the structure stays maintainable.

## Why this exists

Five source repositories grew five different documentation systems. They converged on the same roles — rule layer, index, decision record, backlog, work package, knowledge capture — but disagreed on where each role lives, what it is called, and how big it may get. The cost shows up in two places: a new repository has to reinvent the layout, and an agent entering an existing one has to guess where the next document belongs.

This repository makes the roles normative and keeps the layout as small as it can be while still covering a project that lives for years.

## What is here

| Path | Role |
| --- | --- |
| `docs/norm/` | The binding text of the standard. Read this before changing anything else. |
| `docs/charter.md` | Scope, non-goals, hard constraints, success criteria. |
| `docs/structure.md` | This repository's layout and the placement rules for new files. |
| `docs/conventions.md` | Language, naming, citation, and the five role discriminations. |
| `docs/committing.md` | This repository's commit deviations; the base is `docs/norm/committing.md`, and the optional hook is enabled here. |
| `docs/workflow.md` | The source repository's forge / audit / migrate workflow. |
| `docs/decisions/` | ADRs — the choices that shaped the standard, with rejected options. |
| `docs/backlog/` | Deferred items with a revisit trigger. |
| `docs/knowledge/` | Methods, incidents and explanations that change what a maintainer does next time. |
| `work-packages/` | Work packages: spec, plan, board, items, closeout summary, and the archive. |
| `template/` | Copyable core, first-use, effort and overlay files; `template/core/.githooks/commit-msg` is the optional commit check. |
| `scripts/` | The gate: `check.ts` reports, `docs-model.ts` measures text and budgets, `check-context.ts` reads the repository, `doc-checks.ts` holds the generic rules, `package-checks.ts` holds the work-package and board rules, and each check has a test beside it. |
| `.githooks/` | This checkout's wrapper around the template hook; a repository copied from `template/core/` gets the full script. |
| `package.json`, `.oxfmtrc.json` | Root tooling for the gate: Bun format for code, Prettier for Markdown, and command wiring. |
| `.github/workflows/gate.yml` | CI forwarding: runs `bun run gate:ci`, every stage but prose, on push and pull request. |

Optional roles — `docs/contracts/`, `docs/operations/`, `docs/toolchain/`, `docs/adapters.md`, and `docs/suite-tracks.md` — appear only when their trigger does. This checkout has not needed them.

## Quick start

1. Copy `template/core/` into the new repository root, including `.editorconfig`, `.gitattributes`, and `.githooks/`; replace every `<placeholder>`. If you want the optional commit check, run `git config core.hooksPath .githooks`.
2. Pick one overlay under `template/overlays/` and follow its README.
3. Run the day-one checklist in `docs/workflow.md` (mode: forge).
4. When the first work package starts, copy `template/effort/` and create `work-packages/<slug>/spec.md` with a `track:` line.
5. Run `bun install && bun run gate` in this repository after changing the norm or a template; a generated repository runs the gate its overlay names.

## Reading order

For a person: this file → `docs/charter.md` → `docs/norm/foundations.md` → `docs/norm/roles.md`.

For an agent: `AGENTS.md` → the routing table there → the one norm page the task needs.

## Status

The gate is green in this checkout. The template and the skill are downstream: a role or budget change lands in the norm, then the template and the skill in the same commit. A portable checker for target repositories remains deferred (`docs/backlog/B-0002`). The optional commit hook is shipped in the template, not a norm requirement.
