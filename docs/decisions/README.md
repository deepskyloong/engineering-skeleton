# Decisions

Each choice with rejected alternatives gets its own file. An ADR is never deleted; when a decision is replaced, the old file is marked `Superseded` and links to its replacement.

## Index

| ADR | Decision | Status |
| --- | --- | --- |
| [ADR-0001](ADR-0001-spec-repo-and-thin-skill.md) | The specification lives in a standalone repository; the skill is a thin entry point | Accepted |
| [ADR-0002](ADR-0002-manual-skill-invocation.md) | The skill is manually invoked, not description-triggered | Accepted |
| [ADR-0003](ADR-0003-volume-budget-unit.md) | Volume budgets measure non-whitespace characters, not lines or words | Accepted |
| [ADR-0004](ADR-0004-numbered-file-prefixes.md) | Numbered files use four digits; citable records carry a type prefix | Accepted |
| [ADR-0005](ADR-0005-directory-inventories.md) | Directory inventories belong to directory READMEs, not to `structure.md` | Accepted |
| [ADR-0006](ADR-0006-status-page-home.md) | Status lives at the docs top level, not inside the operations directory | Accepted |
| [ADR-0007](ADR-0007-vocabulary-home.md) | The vocabulary home is `GLOSSARY.md`; `CONTEXT.md` is a legacy alias | Accepted |
| [ADR-0008](ADR-0008-vocabulary-format.md) | The vocabulary body follows the domain-modeling glossary format; the map lists contexts and relationships | Accepted |
| [ADR-0009](ADR-0009-work-package-ledger.md) | The work package is a work item ledger; the plan carries the phase breakdown | Accepted |
| [ADR-0010](ADR-0010-suite-tracks-are-adapters.md) | Suite tracks are permanent adapters; legacy paths are the retirable kind | Accepted |
| [ADR-0011](ADR-0011-tombstone-role.md) | A tombstone is a role at the old path; the gate enforces its shape | Accepted |
| [ADR-0012](ADR-0012-markdown-tables-are-not-aligned.md) | Markdown tables are not column-aligned; a compact-table formatter owns the shape | Accepted |
| [ADR-0013](ADR-0013-two-tier-volume-budgets.md) | Volume budgets carry a soft judgment line and a hard failure line | Accepted |
| [ADR-0014](ADR-0014-backlog-carries-no-priority.md) | The backlog carries no priority field | Accepted |
| [ADR-0015](ADR-0015-migrated-adr-series-zero-padded.md) | A migrated ADR series is zero-padded to four digits; a migrated backlog series keeps its width | Accepted |
| [ADR-0016](ADR-0016-norm-source-pointer.md) | General norms are consumed by pointer, not copy | Accepted |
| [ADR-0017](ADR-0017-closed-work-packages-archive.md) | Closed work packages move to `tasks/archive/`; the open table lists only open packages | Accepted |

## Format

`ADR-<nnnn>-slug.md`, with `Status`, `Context`, `Decision`, `Options considered`, `Consequences`. Options must include at least one rejected alternative and the reason it lost; an ADR without a rejected alternative is a note, not a decision.
