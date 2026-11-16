# Plan

## Approach

1. Audit each repository immediately before its migration, one repository at a time, as the maintainer directed. Each report lands in `audits/<repo>.md` in the fixed format from `docs/governance.md`: severity, role, problem, why, minimal fix.
2. Review the report with the maintainer before touching the repository. Settle the migration order per repository; `B-0005` proposes oshi, bun-toolkit, python-toolkit, gearset, then personal-agent-kit.
3. Migrate one repository at a time, one role per commit, following `docs/spec/0006-migration.md` and the migrate mode of `docs/workflow.md`. Each migration starts from a clean working tree.
4. Register what cannot move in that repository's `docs/adapters.md`; do not force a foreign suite or a frozen record to accept a new path.
5. Improve this repository in the same session when a migration exposes a gap: a missing role, an unenforced rule, a budget with no sample, or a skill step that names a file that does not exist. The change follows the change surface in `AGENTS.md`: spec first, then `template/`, then the skill, then `scripts/check.py`.
6. Close `B-0005` when every repository is migrated or carries a reasoned exception, and file the spec gaps the rollout exposed as backlog items here.

The audit reports stay in the package while it is open. A finding that changes the spec moves to `docs/backlog/` as an item; a finding that records a choice moves to `docs/decisions/`. The report itself is runtime evidence, per `docs/structure.md` ("Artifact tiers").

## Check-in points

Stop and confirm with the maintainer at each of these, rather than at every commit:

- After the audit of a repository, before the first move.
- After the freeze and adapter-registry commit, before any deletion.
- After the docs roles are in place, before the budget splits.
- Before deleting an archive or a directory.
- After the repository's gate is green, before starting the next repository.

## Risks

| Risk                                                                        | Mitigation                                                                    | Stop condition                                                           |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| A migration rewrites documents that record decisions, losing the reasoning. | One role per commit; a frozen record keeps its citation and gets a tombstone. | A move would break a frozen record that cites the old path.              |
| Uncommitted work in a target repository is swept into a move.               | Run `git status --short` before the first move of each repository.            | The working tree has changes in a file the move touches.                 |
| The spec is bent to fit one repository.                                     | Every gap becomes a backlog item here.                                        | A migration needs a role, budget, or directory the spec does not define. |
| Five audits in one pass hide a pattern a second look would catch.           | One measurement script and one report format across all five.                 | Two reports disagree on what a role means.                               |

## Out of scope

- Rewriting a target repository's content beyond what the role layout requires.
- A machine-checkable gate for target repositories; that is `B-0002`.
- The module `AGENTS.md` threshold; gearset supplies the sample, and `B-0003` sets the number afterwards.
