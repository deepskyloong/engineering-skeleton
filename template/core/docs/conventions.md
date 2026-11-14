# Conventions

## Language

English for every file this repository maintains. Translate before landing; do not annotate.

## Naming

- Files: `kebab-case.md`; ADRs `ADR-<nnnn>-slug.md`; backlog `B-<nnnn>-slug.md`.
- Numbered files use four digits (`ADR-0001`, `B-0001`). A migrated series keeps its width and is never renumbered.
- All-caps names are reserved for roles: `README.md`, `AGENTS.md`, `CONTEXT.md`.
- Prose is not hard-wrapped. One paragraph is one line; the editor soft-wraps.

## Citation

Cite a file plus a section name (`docs/structure.md`, "Placement rules"). Do not cite section numbers; they rot when a page is reordered. Number section headings only when the number is part of a cited artifact: a legal clause, a fixed contract section, or a numbered procedure. Otherwise leave them unnumbered.

## The five discriminations

1. **Four documents, four jobs.** `AGENTS.md` is instruction (what must hold now); `CONTEXT.md` is vocabulary; an ADR is a decision (which options existed and why the others lost); `structure.md` is organization (how it is arranged and how to change it). Test: a choice with rejected alternatives is an ADR; a fact a consumer may rely on is a contract; an explanation of internal organization is structure.
2. **`spec` has two senses.** `tasks/<slug>/spec.md` is the work-package specification: temporary, ends with the effort. `docs/contracts/<topic>.md` is the durable contract: survives the effort.
3. **README serves users, the charter serves maintainers.** README answers "how do I use this"; the charter answers "why does this exist and what will it refuse to do".
4. **Budgets state a unit.** Volume is non-whitespace characters; entries are lines. They are not interchangeable.
5. **Shared terms have a home.** A term used by two or more members lives in the root `CONTEXT.md`; a term used by one member lives in that member's `CONTEXT.md`; `CONTEXT-MAP.md` lists locations and stores no definitions.

## Budgets

| Document | Volume (non-ws chars) | Entries |
|---|---|---|
| Root `AGENTS.md` | ≤16,000 | routing ≤12 rows |
| `README.md` | ≤8,000 | install ≤3 steps |
| Any `docs/` page | ≤8,000 | — |
| `docs/workflow.md` | ≤8,000 | — |
| ADR | ≤6,000 | — |
| Backlog item | ≤4,000 | — |
| Member `README.md` / `AGENTS.md` | ≤8,000 | — |
| Module `AGENTS.md` (deferred) | ≤4,000 | — |
| Directory `README.md` (index) | ≤2,000 | ≤40 rows |
| Backlog index | ≤2,000 | ≤60 rows |
| Overlay `README.md` | ≤8,000 | — |
| `operations/status.md` | ≤8,000 EN / ≤4,000 ZH | — |
| `CONTEXT.md` | ≤6,000 | — |
| `summary.md` | ≤3,000 | 3 sections |
| Tombstone | ≤400 | 1 link |

Measure volume with `tr -d '[:space:]' < FILE | wc -m` (Bash) or `(([IO.File]::ReadAllText($p)) -replace '\s','').Length` (PowerShell). Count entries with `wc -l` or `(Get-Content $p).Count`. Lines are not a volume unit.

## Document discipline

- **Record method, not measurement.** A count, duration, coverage number, resolved version, or benchmark result is written as the command that produces it. (Review criterion.)
- **A named set's cardinality is part of its name.** Changing "four layers" to five is a spec change, not a count update. Do not confuse it with a current inventory count.
- **Never copy a value that has an owner.** Cite the config file or the CLI's `--help`.
- **One fact, one home.** A parent links to a child's conclusion; it does not restate it.
- **Generated files declare their command** on the first line.
