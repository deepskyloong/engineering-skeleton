# rename-repository-standard

- **Goal**: The repository presents itself as the repository standard in every living document, in the skill, and in the open records; `B-0014` closes with an outcome; `bun run gate` is green.
- **Non-goal**: This package does not rewrite ADRs before ADR-0018, archived work packages, or dated audit snapshots; it does not rename the GitHub repository, move the local checkout, or push. Those are the maintainer's actions.
- **Acceptance**: `rg -il 'skeleton'` returns only frozen records and dated snapshots, each named in `summary.md`; the skill `i-repository-standard` resolves from `STANDARD_ROOT` or `E:\Projects\repository-standard`; `bun run gate` is green; `B-0014` is `closed` with an outcome.
- **track**: default

## Context

`B-0014` recorded the repository name as a deferred question and misattributed the stale framing to `0001`. The decision on 2026-11-18 renamed both the repository and the artifact: `repository-standard` and **the repository standard**. ADR-0018 carries the candidates and the rejected options; this package applies the decision to the living tree.
