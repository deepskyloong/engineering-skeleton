# ADR-0008 — The vocabulary body follows the domain-modeling glossary format

Status: Accepted (2026-11-16)

## Context

ADR-0007 moved the vocabulary to `GLOSSARY.md` but left its body as the three-column table carried over from `CONTEXT.md`. The `GLOSSARY` name comes from `setup-matt-pocock-skills`, which delegates glossary creation to `domain-modeling`; that skill's `GLOSSARY-FORMAT.md` defines a context title, a one- or two-sentence description, a `## Language` section, bold terms with one- or two-sentence definitions, `_Avoid_` lines, and subheadings for natural clusters. Oshi's existing `GLOSSARY.md` follows that format; the skeleton's table does not. The table is compact, but it has no group headings and it carries implementation details—the tombstone line limit, the budget unit, the generated header, and adapter registration—which the `domain-modeling` skill says a glossary must not do.

## Decision

`GLOSSARY.md` and `template/first-use/GLOSSARY.md` use the `domain-modeling` `GLOSSARY-FORMAT`: a context title, a one- or two-sentence description, `## Language`, and term entries of `**Term**:`, a one- or two-sentence definition of what the term is, and `_Avoid_:` synonyms; entries are grouped under a subheading when a natural cluster emerges. The glossary does not restate a budget, a procedure, or an implementation rule; the page that owns it is linked. `GLOSSARY-MAP.md` lists member contexts, their paths, and their relationships; it stores no definitions.

## Options considered

1. **Keep the flat table.** Rejected: it is compact, but it is not the source format, it has no groups, and it mixes spec rules into definitions.
2. **Keep the table with group headings.** Rejected: it fixes scanning but still forks the source format; generated repositories would not match the `domain-modeling` writer.
3. **Adopt the prose format and keep the implementation details.** Rejected: the format's rule is a glossary, not a spec; the detail belongs in `0001`, `0003`, `0004`, or `0006`.
4. **Adopt the prose format and move details to their owners.** Chosen: one format across the skeleton and oshi; the spec pages remain the single home for rules.

## Consequences

- `GLOSSARY.md` has 17 terms in four groups: structure and roles, work packages, rules and budgets, specs and artifacts.
- `template/first-use/GLOSSARY.md` is the same shape with one example term.
- `0002-roles.md` states the role format and the map's relationship shape; `0003-flow.md` and both `conventions.md` copies state the map shape.
- ADR-0007's "stores locations only" phrase is refined here; the home decision stands.
- Oshi's `GLOSSARY.md` needs no change: it already follows the format.
- The 6,000-character `GLOSSARY.md` budget remains; the gate measures the new body.
