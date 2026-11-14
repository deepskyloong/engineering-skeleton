# Template

Copyable starting points for a repository that adopts the skeleton. Read `docs/spec/02-roles.md` first: the template is a consequence of the roles, and copying it without them produces files nobody can place later.

## Copy order

1. `core/` → repository root. Replace the values in the table below, except `<gate-command>`, which the overlay decides.
2. `overlays/<language>/` → copy every file except the overlay's `README.md` to the repository root. Set the gate command in `README.md` and `AGENTS.md`, install dependencies, run the gate until green.
3. `first-use/` → only when the first ADR, the first backlog item, or the first shared term appears. Copy the matching piece only; its `docs/README.md` is a merge fragment, not a replacement.
4. `effort/` → only when the first work package starts. Merge `docs/*` into the existing `docs/`; never overwrite `docs/README.md`.

Do not copy all four at day one. Each segment has a trigger, and copying it early creates exactly the empty structure the skeleton forbids.

## Values to replace

| Value | Where it appears | Set when |
|---|---|---|
| `<project-name>` | `README.md`, `AGENTS.md`, overlay files | Step 1 |
| `<one-line purpose>` | `README.md`, `AGENTS.md` | Step 1 |
| `<owner>` | `docs/charter.md` | Step 1 |
| `<language>` | `AGENTS.md` | Step 2, once the overlay is chosen |
| `<gate-command>` | `README.md`, `AGENTS.md` | Step 2, after the overlay README states it |

`<repo-path>` does not appear in `core/`; it exists only in pointers a later migration generates.

## Notation that survives

These are grammar, not values. Replacing them would break the rule that uses them.

| Token | Meaning |
|---|---|
| `<nnnn>` | Backlog number, four digits |
| `<slug>` | Work package slug |
| `<topic>` | Contract, operation, or knowledge topic |
| `<member>` | Workspace member name |
| `<command>` | Command named in a generated header |
| `<type>` | Commit type |
| `<scope>` | Commit scope |
| `<path or URL>` | Location of an external base convention |
| `<what changed and why>` | Commit summary |
| `<overlay files>` | Tree placeholder for the chosen overlay |
| `<any constraint that would make a reviewer say "you cannot do that">` | Charter prompt |

A value left unreplaced is a failure. A notation left in place is correct. `check.py` does not test this distinction; grep for `<` in the copied repository and classify each hit against the two tables.

## What not to copy

- Do not copy `AGENTS.md` routing rows for pages that do not exist. The template marks optional pages with "(when present)"; delete the row when the page is absent.
- Do not copy optional roles. `docs/contracts/`, `docs/operations/`, `docs/toolchain/`, `docs/knowledge/`, and `docs/adapters.md` appear when their trigger does.
- Do not copy a budget number without its unit and its command.
- Do not copy the spec pages themselves into a repository. A repository carries its own charter, structure, and conventions, which point back when they need the rationale.
