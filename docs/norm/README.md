# Norm — the repository standard

The binding text of the repository standard, `standard v1`. Read by question, not in order.

| Page | Question it answers |
| --- | --- |
| [foundations](foundations.md) | What the standard is, which principles bind it, which layers exist |
| [roles](roles.md) | Which document roles exist, where each lives, what may enter and leave |
| [flow](flow.md) | Which level owns a file, how work moves from idea to closeout |
| [rules](rules.md) | Which rules are enforced, how budgets are measured, what may be retired |
| [overlays](overlays.md) | What the language-agnostic core promises, what each overlay supplies |
| [migration](migration.md) | How an existing repository moves onto this standard |
| [committing](committing.md) | What every commit message must state, and which parts a repository may override |

## Reading paths

First pass: [foundations](foundations.md) → [roles](roles.md) → [flow](flow.md) → [rules](rules.md).

Reference: [overlays](overlays.md) when a language overlay is involved; [migration](migration.md) when moving an existing repository; [committing](committing.md) when writing a commit message.

The file names carry the subject; the order lives here. Adding a page does not renumber the set, and moving a page in a reading path does not break a citation.

## Status

`standard v1`. The template and the skill are downstream of these pages. A statement here that the template contradicts is a template bug; a statement the template cannot express is a norm bug.

## Reading rule

A page is normative only for the question in its row. Do not read `rules.md` to learn where an ADR lives, and do not read `roles.md` to learn how a work package closes. When a page needs another page's definition, it links; it does not restate. Duplication between norm pages is a blocker, not a style issue.
