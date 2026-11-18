# ADR-0018 — The repository and its artifact are named the repository standard

## Status

Accepted (2026-11-18)

## Context

The repository was named `engineering-skeleton`, and every living page called the artifact it defines "the skeleton". The name described the copy source: a new repository copied the template, and the tree was the shape it copied. The repository's role is wider now — the norm source existing repositories point at, the authority for general norms, a reference exemplar, and the template with overlays. The artifact carried the same limitation: "skeleton" named the shape to be copied, not the standard a repository follows. `B-0014` recorded the repository half of the question; the artifact half was decided with it on 2026-11-18.

`0001` already frames the repository as the norm source; the stale copy-source sentence lived in `AGENTS.md`. That misattribution is why the item first read as a framing bug rather than a naming decision. The decision here is the name, not the framing.

## Decision

The repository is named `repository-standard`; the artifact it defines is **the repository standard**, shortened to **the standard** after the first mention. The skill is `i-repository-standard`; its root variable is `STANDARD_ROOT` and its fallback is `E:\Projects\repository-standard`. The template's version header is `standard: vN`; `package.json` is `repository-standard`.

Living documents use the new term. Frozen records — ADRs before this one, archived work packages, and dated audit snapshots — keep the words they were written with; the glossary entry **repository standard** maps `skeleton` as the former name. An absolute path inside a frozen record is provenance: it records where the repository was when the decision was made, not a live pointer. The live location is the repository root and the skill's fallback.

## Options considered

- **Keep `engineering-skeleton` and rename only the artifact.** Rejected: the repository name would still describe the copy source, and a reader would meet two names for one authority.
- **`repo-standard`.** Rejected: `repo` is the informal short form of `repository`; the name is the formal one.
- **`project-standard`.** Rejected: a project is scope and goals, while the artifact governs a repository's documents and work; the broader word would claim project management the spec does not define.
- **`project-canon`.** Rejected: `canon` implies a settled authoritative corpus, while the standard is explicitly a draft the rollout keeps changing; "project canon" is also not an established collocation.
- **`norm-source`.** Rejected: it names the role the repository plays, not the artifact; a target's `Norm source:` line would then read as a synonym of itself.
- **`engineering-standard`.** Rejected: it reads as an industry standard and keeps the broad `engineering` word the role no longer needs.
- **Rename the repository but keep the artifact term `skeleton`.** Rejected: the copy-source limitation would survive in every living page, which is the half-measure the decision rejects.

## Consequences

- Every living normative page, the template, the skill, and the open backlog and task records use `repository standard` or `the standard`. The gate is green after the rewrite.
- Frozen records keep `skeleton`; `docs/decisions/ADR-0001` and the archived plans still cite the old absolute path. This is provenance, not a live pointer, and no tombstone can sit at a repository root.
- `B-0002`'s file name `B-0002-portable-skeleton-check.md` stays: a backlog item is an address, and ADR-0015 cites that path. Its body's `skeleton: vN` check becomes `standard: vN`.
- The spec version stays `v1`: no role, budget, or discrimination changed. The rename is vocabulary, recorded here.
- The GitHub repository and the local checkout are the maintainer's actions; this decision does not push or move them.

## References

`B-0014` (the deferred question); `ADR-0015` (backlog addresses are stable); `ADR-0017` (archived packages are never edited); `docs/spec/0001-foundations.md`, opening section; `GLOSSARY.md`, "repository standard".
