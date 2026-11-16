# ADR-0007 — The vocabulary home is GLOSSARY.md

Status: Accepted (2026-11-16)

## Context

`0002-roles.md` placed the Vocabulary role at `/CONTEXT.md`. The file came from an external project using `setup-matt-pocock-skills`; the current version of that skill treats `CONTEXT.md` and `CONTEXT-MAP.md` as legacy names and defaults to a root `GLOSSARY.md` plus `docs/adr/`. The skeleton's `CONTEXT.md` content is a glossary of 17 terms, not a project-context page; the name promises context and delivers definitions.

A second convention also uses `CONTEXT.md`: CodeArts finds it by walking up the tree, alongside `AGENTS.md` and `CLAUDE.md`; `GLOSSARY.md` is not in that auto-load list. That is a context-file convention, not a vocabulary rule. The skeleton conflated the two: it copied a legacy vocabulary name and gave it an auto-loaded context slot.

The oshi audit exposed the mismatch. Oshi already has `GLOSSARY.md`, and its `docs/agents/domain.md` suite expects that name. Moving it to `CONTEXT.md` would add a tombstone, an adapter row, and a rewrite of a foreign suite, while making the file less self-describing. The migration should not create that churn.

## Decision

The Vocabulary role lives at `/GLOSSARY.md`; the Vocabulary map lives at `/GLOSSARY-MAP.md` when member vocabularies exist. `GLOSSARY.md` is a root role admitted when a term's meaning would drift without a fixed definition, with avoided synonyms; it is not always-read. `GLOSSARY-MAP.md` stores locations only. `CONTEXT.md` and `CONTEXT-MAP.md` are legacy aliases: rename them to the GLOSSARY names; leave a tombstone only when a frozen record cites the old path, and register a foreign suite that insists on `CONTEXT.md` in `docs/adapters.md`. The root entry files are `README.md` and `AGENTS.md`; `GLOSSARY.md` is read when terms matter.

The budget is 6,000 non-whitespace characters for `GLOSSARY.md` and 2,000 for `GLOSSARY-MAP.md`. The role admission is a term with a fixed meaning, not a term used by two or more members; a single-package repository with cross-cutting terms needs the root glossary, and this repository is the sample.

## Options considered

1. **Keep `/CONTEXT.md` as the vocabulary home.** Rejected: the source convention calls the name legacy; the content is a glossary; the name suggests project context; it would force oshi's `GLOSSARY.md` to move and break its `docs/agents` suite.
2. **Keep `CONTEXT.md` as the vocabulary and add `GLOSSARY.md` as an alias.** Rejected: two homes for one role, and the duplicate definitions are exactly what the skeleton exists to prevent.
3. **Drop the vocabulary role entirely.** Rejected: shared terms drift, and this repository already has 17 terms with avoided synonyms.
4. **Use `GLOSSARY.md` for vocabulary and keep `CONTEXT.md` as a thin context page for agent products.** Rejected for now: the skeleton has no project-context need that `README.md` and `AGENTS.md` do not cover; a context page would be a new role with no trigger. A repository that needs the agent-product auto-load can register `CONTEXT.md` as an adapter path, not a skeleton role.
5. **`GLOSSARY.md` as the single vocabulary home; `GLOSSARY-MAP.md` only for member vocabularies; `CONTEXT` legacy.** Chosen: the name matches the content, the source convention, and the existing oshi file; the migration loses no file and adds no tombstone.

## Consequences

- `0001-foundations.md`, `0002-roles.md`, `0003-flow.md`, `0004-rules.md`, `0006-migration.md`, `docs/conventions.md`, `docs/structure.md`, `template/core/docs/conventions.md`, `template/core/docs/structure.md`, `template/first-use/`, and `scripts/check.py` change together.
- The skeleton's own `CONTEXT.md` becomes `GLOSSARY.md`; the template's first-use vocabulary file becomes `GLOSSARY.md`; the title changes from "CONTEXT — vocabulary" to "GLOSSARY — vocabulary".
- The root is no longer described as "four always-read files". `README.md` and `AGENTS.md` are the entry files; `GLOSSARY.md` is read when terms matter. `0003` and both `structure.md` pages use "entry files".
- A single-package repository can own a root glossary; the "two or more members" admission is removed. `GLOSSARY-MAP.md` remains the multi-member-only artifact.
- Oshi's `GLOSSARY.md` stays. The audit's finding 7 and its pointer-debt row are superseded by this ADR; the `CONTEXT.md` move is removed from the rollout's todo. The audit remains a dated snapshot.
- `B-0008` no longer uses `GLOSSARY.md` as a tombstone example; `docs/adrs/` and `archived/` remain.
- A legacy `CONTEXT.md` is renamed, not kept as a second home. A frozen record that cites the old path gets a tombstone; a third-party suite that hard-codes `CONTEXT.md` gets an adapter row.
