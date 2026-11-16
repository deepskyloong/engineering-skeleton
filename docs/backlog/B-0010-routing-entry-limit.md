# B-0010 — The routing-table entry limit is unenforced

## Problem

`docs/spec/0004-rules.md` budgets the root `AGENTS.md` routing table at 12 rows. This repository's table has 13, and `bun run gate` passes. `scripts/check.py` has no `AGENTS.md` entry in `ENTRY_LIMITS`, and `table_entries()` assumes one table per file: adding the key alone would count the change-surface table and the command table as routing rows. A strong rule with no command is the exact defect P4 names.

## Evidence

- `AGENTS.md` has 13 routing rows: six of them are one per spec page.
- `template/core/AGENTS.md` has 8 routing rows, so the template is inside the limit and the source repository is not.
- `ENTRY_LIMITS` lists `docs/README.md`, `docs/decisions/README.md`, `docs/backlog/README.md`, and `template/README.md`; `AGENTS.md` is absent.
- The `template/AGENTS.md` command table and routing table are separate, so a file-wide row count cannot express the rule.

## Minimal fix

Compress the six spec-page rows into one `docs/spec/` row; the spec index already lists its pages, and a routing table that enumerates a directory's files is a second index. That leaves 8 rows and room for one more role. Then add a section-scoped counter to `scripts/check.py` that finds the routing section and counts its rows, and set the limit to 12.

## Revisit when

The next change to `AGENTS.md`, or the first portable checker (`B-0002`). The compression is a prerequisite for adding a `tasks/README.md` routing row without breaking the budget.
