# docs/ — index and governance

## Governance

- **Authority**: this directory holds the normative specification, its supporting policy pages, decision records, and deferred items. It does not hold templates (that is `template/`) or tooling (`scripts/`).
- **What goes here**: a document whose reader is a maintainer of the skeleton. A document whose reader is a user of a generated repository belongs in `template/`.
- **What does not go here**: project-specific business documentation, language tutorials, copies of values owned by `template/` or `scripts/`.
- **Structure**: each topic gets its own file. A new subdirectory gets its own README before it gets a second file. The top-level index lists subdirectories in one row each and does not repeat their file lists.
- **Naming**: `kebab-case.md`; ADRs use `NNNN-slug.md`; backlog items use `B-<nnnn>-slug.md`.
- **Change flow**: a normative change lands in `docs/spec/` first; supporting pages follow in the same commit; `template/` follows in the same commit or in the next one with a pointer left behind.

## Index

| File / directory | Content |
|---|---|
| [charter.md](charter.md) | Scope, non-goals, hard constraints, success criteria |
| [structure.md](structure.md) | Repository layout and placement rules |
| [conventions.md](conventions.md) | Language, naming, citation, five role discriminations |
| [committing.md](committing.md) | Commit message convention, based on an external base, plus deviations |
| [governance.md](governance.md) | Versioning, change surface, review, ownership |
| [workflow.md](workflow.md) | Operating modes: forge, audit, migrate |
| [spec/](spec/README.md) | The normative specification |
| [decisions/](decisions/README.md) | ADRs — choices and rejected alternatives |
| [backlog/](backlog/README.md) | Deferred items with revisit triggers |

`docs/knowledge/` is an optional role and is absent until the first guide, case, or note exists. Its absence is correct, not incomplete.
