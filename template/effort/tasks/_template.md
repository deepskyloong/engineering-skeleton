# Work package template

Copy this file into `tasks/<slug>/` and split it into four files at the headings. Delete the section that does not apply; never keep an empty heading.

## spec.md

```markdown
# <slug>

- **Goal**: one sentence, testable.
- **Non-goal**: at least one thing this effort will not do.
- **Acceptance**: one command or one observable state.
- **track**: default | spec-flow | superpowers | none

## Context

Why this exists, in three sentences. Link the backlog item or the report that started it.
```

## plan.md

```markdown
# Plan

## Approach

How the goal is reached, in steps. Name the files and the roles they land in.

## Work breakdown

| Phase | Work items | Exit condition |
| --- | --- | --- |
| P0 — <phase> | W01–W0n | <observable exit> |

The table names the phases and their exit conditions; each item's description, acceptance, and evidence live in `todo.md`.

## Risks

| Risk | Mitigation | Stop condition |
| --- | --- | --- |

## Out of scope

What this plan deliberately does not touch.
```

## todo.md

```markdown
# Todo

## Current state

- Updated: <YYYY-MM-DD>
- Status: open
- Branch: <branch>; re-check `git status`
- Gate: last known <result> (<date>); re-run `<gate-command>`
- Last done: <one line>
- Phase: P0 — <phase>
- Focus: W01 — <title>
- Progress: <n> done / <n> todo / <n> blocked
- Todo: <open work items or "none">
- Next: W01 — <one action>
- Blocked: <list or "none">
- Open decisions: <list or "none">
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/decisions/check-in), this file (state/ledger)

## Work items

### P0 — <phase>

#### W01 — <title>

**Status**: todo
**Depends on**: none

<prose description: what, why, constraints, files, sequence>

**Done when**:

- <observable criterion>
- <observable criterion>

**Evidence**: pending
```

## summary.md

```markdown
# Summary — <slug>

## Done

## Not done

## What a future maintainer must know
```

Keep `summary.md` under 3,000 non-whitespace characters. A summary that restates the diff is noise; a summary that records the surprise is the point. At closeout the package moves to `tasks/archive/<slug>/`; `summary.md` is the record a reader opens first.
