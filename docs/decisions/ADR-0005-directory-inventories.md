# ADR-0005 — Directory inventories belong to directory READMEs

Status: Accepted (2026-11-14)

## Context

`docs/structure.md` carried a complete tree of this repository. That duplicated `docs/README.md` and every subdirectory README, and the tree went stale whenever a file was added. The role table said the page was updated with every layout change, which made the duplication mandatory.

## Decision

`docs/structure.md` defines levels and placement rules; it does not list files. Each directory's `README.md` lists its direct children; `docs/README.md` lists docs subdirectories only. A tree in a structure page is a second index.

The canonical tree in `docs/spec/0001-foundations.md` remains: it is the normative role set, not a snapshot of this repository.

## Options considered

- Keep the tree and update it on every change. Rejected: it is a second inventory and the update is easy to forget; a stale tree is worse than no tree.
- Generate the tree from the filesystem and mark it generated. Rejected: a generated tree still duplicates membership and adds a gate obligation for a view no reader needs.
- Move the tree into `docs/README.md`. Rejected: the docs index lists directories, not files; subdirectory READMEs already own their children.
- Keep the tree only in the template. Rejected: the asymmetry teaches generated repositories to duplicate their inventories.

## Consequences

- Adding or removing a file updates one directory README, not a central page.
- A structure-page change is a level or placement change; a file addition is not.
- `docs/README.md` remains the docs-tree index; `docs/spec/README.md`, `docs/decisions/README.md`, and `docs/backlog/README.md` remain the page-level indexes.
