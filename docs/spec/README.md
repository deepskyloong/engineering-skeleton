# Spec — the engineering skeleton

Normative specification, `spec v1`. Read in order.

| Page | Question it answers |
|---|---|
| [01-foundations.md](01-foundations.md) | What the skeleton is, which principles bind it, which layers exist |
| [02-roles.md](02-roles.md) | Which document roles exist, where each lives, what may enter and leave |
| [03-flow.md](03-flow.md) | Which level owns a file, how work moves from idea to closeout |
| [04-rules.md](04-rules.md) | Which rules are enforced, how budgets are measured, what may be retired |
| [05-overlays.md](05-overlays.md) | What the language-agnostic core promises, what each overlay supplies |
| [06-migration.md](06-migration.md) | How an existing repository moves onto this skeleton |

## Status

`spec v1`. The template and the skill are downstream of these pages. A statement here that the template contradicts is a template bug; a statement the template cannot express is a spec bug.

## Reading rule

A page is normative only for the question in its row. Do not read 04-rules to learn where an ADR lives, and do not read 02-roles to learn how a work package closes. When a page needs another page's definition, it links; it does not restate. Duplication between spec pages is a blocker, not a style issue.
