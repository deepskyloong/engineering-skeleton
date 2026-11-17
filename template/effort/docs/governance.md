# Governance

## Change surface

A change that leaves a downstream file stale is incomplete, even if the changed file is correct.

| Change | Also update |
| --- | --- |
| Add, rename, or remove a role | `docs/structure.md`, `AGENTS.md`'s routing table, the matching directory README |
| Change a budget or its unit | `docs/conventions.md`, the header that states the budget |
| Change the gate command | `docs/conventions.md`, `AGENTS.md`, every reference, and `.github/workflows/gate.yml` |
| Move or rename a directory | every pointer, proven by `rg -l '<old-path>'` returning nothing |
| Change a template or generated file | regenerate it; the gate fails when it differs |

## Who decides

- The owner decides scope, non-goals, and any change to a role's home.
- An agent may edit prose, templates, and the gate, following `AGENTS.md`.
- Removing or moving a role requires an ADR with rejected alternatives.
- A budget change requires the old value, the new value, and one measured sample.

## Review

- Adversarial by default: a reviewer tries to break the structure, not to praise it.
- Output format is fixed: `[severity] section — problem / why / minimal fix`, with `blocker`, `major`, `minor`, `nit`.
- A finding without a section reference cannot be adjudicated.
- Findings are accepted, accepted with a different fix (reason recorded), or deferred to the backlog with a trigger. A deferred finding does not disappear.

## Retirement

An artifact that stops being true is deleted; `git log` keeps it. Four exceptions: an ADR is marked `Superseded` and linked, never deleted; a closed backlog item keeps its file and its index row, with the row marked `closed`; a superseded contract stays only while a consumer cites it; a tombstone stays at the old path only while a frozen record cites it — ≤3 lines, exactly one link, title ending with `— moved`.
