# AGENTS.md — engineering-skeleton maintenance manual

This repository holds the normative skeleton. It is not a project built with the skeleton; it is the source the skeleton is copied from.

This file is the per-turn rule layer: red lines, the gate, and the routing table. Everything explanatory lives in `docs/` and is read on demand.

## Hard invariants

1. **The spec is normative; the template and the skill are downstream.** A role, a budget, or a discrimination changes in `docs/spec/` first, then in `template/`, then in the skill. Three-way drift is the failure this repository exists to prevent.
2. **One role, one home.** No two spec pages may define the same role. If a page needs another page's definition, it links instead of restating.
3. **English only.** Prose, templates, comments, commit messages. No CJK in this repository.
4. **Budgets are measured, not asserted.** Volume is non-whitespace characters; entries are lines. Both units and their commands are defined in `docs/spec/0004-rules.md`. A number without a unit and a command is noise.
5. **No pre-built empty directories.** A directory appears when its trigger does, and its README appears with it.
6. **The template mirrors the spec, never leads it.** A template file that carries a rule the spec does not state is a bug in the template.

## Gate

```bash
bun run gate
```

It runs the Bun format check over code, the Prettier check over Markdown, the Ruff format and lint checks, and the document checks. The document checks cover every `docs/` and `template/` directory that contains markdown has a README, every `docs/` page maps to a declared role, every internal markdown link resolves, every markdown file's volume is inside its budget, index tables are inside their row limit, file names follow the naming convention, indexes carry no totals, and no unfinished marker survives. CI runs the same command on push and pull request; it adds no stage. Run it after any spec or template edit. A green run is the minimum for a commit, not evidence that the prose is right.

## Which file answers which question

| Task | Read |
| --- | --- |
| Understand what the skeleton is and why it is shaped this way | `docs/spec/0001-foundations.md` |
| Decide where a new document belongs, or add/remove a role | `docs/spec/0002-roles.md` |
| Decide which level (root / member / module) owns a file | `docs/spec/0003-flow.md` |
| Change a rule, a budget, or a retirement exception | `docs/spec/0004-rules.md` |
| Change a language overlay or the gate contract | `docs/spec/0005-overlays.md` |
| Move an existing repository onto this skeleton | `docs/spec/0006-migration.md` |
| Operate on a target repository (forge / audit / migrate) | `docs/workflow.md` |
| Change where this repository's own files live | `docs/structure.md` |
| Change language, naming, citation, or a discrimination | `docs/conventions.md` |
| Change the commit message convention | `docs/committing.md` |
| Change versioning, ownership, or the review flow | `docs/governance.md` |
| Ask why a choice was made, or what was rejected | `docs/decisions/` |
| Ask what is deliberately deferred | `docs/backlog/` |

## Change surface — same commit, or it is incomplete

| Change | Also update |
| --- | --- |
| Add / rename / remove a role | `docs/spec/0002-roles.md`, the matching `template/` file, the skill's mode steps, `scripts/check.py` expectations |
| Change a level or a placement rule | `docs/spec/0002-roles.md`, `docs/structure.md`, `template/core/docs/structure.md` |
| Change a budget or its unit | `docs/spec/0004-rules.md`, `docs/conventions.md`, `template/core/docs/conventions.md`, `scripts/check.py` budget tables |
| Add / remove an overlay | `docs/spec/0005-overlays.md`, `template/overlays/`, the compatibility table |
| Change a gate command | `docs/spec/0005-overlays.md`, this file, every overlay README, `package.json`, `.github/workflows/gate.yml` |
| Move or rename a directory | every pointer, proven by `rg -l '<old-path>'` returning nothing |
| Change a placeholder value or notation | `template/README.md` |
| Change naming or citation rules | `docs/spec/0004-rules.md`, `docs/conventions.md`, `template/core/docs/conventions.md`, `docs/README.md`, `template/core/docs/README.md`, `scripts/check.py` naming patterns |
| Change the commit convention | `docs/committing.md`, `template/core/docs/committing.md` |
| Change the skill's modes or steps | `SKILL.md`, `docs/spec/0002-roles.md` when a mode reads a new role |
| Bump the spec version | `README.md` status, `docs/spec/README.md`, `scripts/check.py` compares both |
| Change a generated path | `docs/spec/0004-rules.md`, `scripts/check.py` `GENERATED_DIRS` |

## Anti-regrowth

This file holds red lines, the gate, and the routing table. Everything else goes into the page the routing table points at. A line is promoted here only when it would bite on an unrelated task. When a section grows, move it and chase every pointer.
