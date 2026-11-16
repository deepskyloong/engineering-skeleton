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

## Risks

| Risk | Mitigation | Stop condition |
| ---- | ---------- | -------------- |

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
- Next action: <one action; who decides>
- Open decisions: <list or "none">
- Read first: `spec.md` (goal/acceptance), `plan.md` (decisions/check-in), this file (state/steps)

- [ ] Step — done when: <observable>
- [ ] Step — done when: <observable>
```

## summary.md

```markdown
# Summary — <slug>

## Done

## Not done

## What a future maintainer must know
```

Keep `summary.md` under 3,000 non-whitespace characters. A summary that restates the diff is noise; a summary that records the surprise is the point.
