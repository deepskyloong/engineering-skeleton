# Decisions

Each choice with rejected alternatives gets its own file. An ADR is never deleted; when a decision is replaced, the old file is marked `Superseded` and links to its replacement.

## Index

| ADR | Decision | Status |
|---|---|---|
| [0001](0001-spec-repo-and-thin-skill.md) | The specification lives in a standalone repository; the skill is a thin entry point | Accepted |
| [0002](0002-manual-skill-invocation.md) | The skill is manually invoked, not description-triggered | Accepted |
| [0003](0003-volume-budget-unit.md) | Volume budgets measure non-whitespace characters, not lines or words | Accepted |

## Format

`NNNN-slug.md`, with `Status`, `Context`, `Decision`, `Options considered`, `Consequences`. Options must include at least one rejected alternative and the reason it lost; an ADR without a rejected alternative is a note, not a decision.
