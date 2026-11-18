# rename-work-package-home

- **Goal**: The work-package role's canonical home is `work-packages/`, so `tasks/` is left to the `addyosmani/agent-skills` suite track that loads that path by name.
- **Non-goal**: No tombstone at the old root, and no edit to frozen records — the ADRs, the archived summaries, and the dated oshi snapshot keep their citations.
- **Acceptance**: `rg -n 'tasks/'` over the repository returns only frozen records and dated snapshots, and `bun run gate` is green with every canonical path row naming `work-packages/`.
- **track**: default

## Context

ADR-0010 registers `addyosmani/agent-skills` as a suite track writing `tasks/<slug>/`. The standard's own Work package role claimed the same path, so an adapter row could not tell a suite-owned package from a repository-owned one, and a consumer carrying both had one directory with two incompatible shapes. `GLOSSARY.md` already lists `task` as an avoided synonym for work package, so the path also contradicted the vocabulary. ADR-0019 records the decision, the rejected names, and why the standard yields instead of the suite.
