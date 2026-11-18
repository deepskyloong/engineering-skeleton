# Plan

## Approach

1. Record the decision first: ADR-0018, the glossary entry, `B-0014` set to `active`, and this package opened. The rename has one reason; the record names the alternatives that lost.
2. Rewrite the normative living pages in the spec-first order: `docs/spec/`, then the root pages, then the top-level `docs/` pages. The template follows in the same pass; it is a consequence of the spec.
3. Update the open queue and the live work package. Frozen records stay; ADR-0018 and the glossary map `skeleton` to `repository standard`.
4. Rename the skill and its external references. The skill is the entry point; a stale name there sends a reader to a repository that no longer presents itself that way.
5. Rename the package and the gate identifiers, regenerate the lockfile, and run the gate.
6. Close the package and `B-0014` in one closeout commit.

## Work breakdown

| Phase | Work items | Exit condition |
| --- | --- | --- |
| P0 — Record | W01 | ADR-0018, the glossary entry, and `B-0014` active |
| P1 — Living pages | W02–W03 | Spec, root, docs top, template, open backlog, and tasks use the new term; gate green |
| P2 — Skill and package | W04–W05 | Skill renamed with its references; package name and gate identifiers renamed; gate green |
| P3 — Closeout | W06 | Summary, archive, `B-0014` closed, tasks index updated |

The table names the phases and their exit conditions; each item's description, acceptance, and evidence live in `todo.md`.

## Risks

| Risk | Mitigation | Stop condition |
| --- | --- | --- |
| A blind replacement turns "standard" into a self-referential or ambiguous sentence. | Rewrite each sentence against its context; the spec pages are read one at a time. | A sentence needs the old word to stay true. |
| A frozen record is rewritten and stops being evidence. | Leave ADRs before ADR-0018, archived packages, and dated snapshots; map the old term in ADR-0018 and the glossary. | The rewrite would edit an archived package or an ADR. |
| The skill and the repository name drift again. | Rename the skill directory, its frontmatter, its root variable, and every external reference in one pass. | A reference still resolves to `i-project-skeleton`. |
| The package name changes but the lockfile keeps the old name. | Run `bun install` and `bun run gate` after the `package.json` edit. | `bun.lock` still carries `engineering-skeleton`. |

## Out of scope

- The GitHub repository rename, the local checkout move, and the push. The maintainer handles those.
- ADRs before ADR-0018, `tasks/archive/`, and `tasks/rollout-oshi/audits/oshi.md`. They keep the old term as provenance.
- The `B-0002-portable-skeleton-check.md` file name. It is an address; the body changes, the path does not.
