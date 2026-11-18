# Spec — the repository standard

Normative specification, `spec v1`. Read in order.

| Page | Question it answers |
| --- | --- |
| [0001-foundations.md](0001-foundations.md) | What the standard is, which principles bind it, which layers exist |
| [0002-roles.md](0002-roles.md) | Which document roles exist, where each lives, what may enter and leave |
| [0003-flow.md](0003-flow.md) | Which level owns a file, how work moves from idea to closeout |
| [0004-rules.md](0004-rules.md) | Which rules are enforced, how budgets are measured, what may be retired |
| [0005-overlays.md](0005-overlays.md) | What the language-agnostic core promises, what each overlay supplies |
| [0006-migration.md](0006-migration.md) | How an existing repository moves onto this standard |
| [0007-committing.md](0007-committing.md) | What every commit message must state, and which parts a repository may override |

## Status

`spec v1`. The template and the skill are downstream of these pages. A statement here that the template contradicts is a template bug; a statement the template cannot express is a spec bug.

## Reading rule

A page is normative only for the question in its row. Do not read `0004-rules.md` to learn where an ADR lives, and do not read `0002-roles.md` to learn how a work package closes. When a page needs another page's definition, it links; it does not restate. Duplication between spec pages is a blocker, not a style issue.
