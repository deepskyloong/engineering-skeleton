# Decisions

Each choice with rejected alternatives gets its own file. An ADR is never deleted; when a decision is replaced, the old file is marked `Superseded` and links to its replacement.

## Index

| ADR                                              | Decision                                                                            | Status   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- | -------- |
| [ADR-0001](ADR-0001-spec-repo-and-thin-skill.md) | The specification lives in a standalone repository; the skill is a thin entry point | Accepted |
| [ADR-0002](ADR-0002-manual-skill-invocation.md)  | The skill is manually invoked, not description-triggered                            | Accepted |
| [ADR-0003](ADR-0003-volume-budget-unit.md)       | Volume budgets measure non-whitespace characters, not lines or words                | Accepted |
| [ADR-0004](ADR-0004-numbered-file-prefixes.md)   | Numbered files use four digits; citable records carry a type prefix                 | Accepted |
| [ADR-0005](ADR-0005-directory-inventories.md)    | Directory inventories belong to directory READMEs, not to `structure.md`            | Accepted |

## Format

`ADR-<nnnn>-slug.md`, with `Status`, `Context`, `Decision`, `Options considered`, `Consequences`. Options must include at least one rejected alternative and the reason it lost; an ADR without a rejected alternative is a note, not a decision.
