# Committing

Base: `E:\Projects\personal-agent-kit\rules\commit-conventions.md`. Read it first; this file records only deviations.

## Deviations

- **Extra types.** `spec`, `template`, `skill`, and `check` are allowed in addition to the base's set. They name the layer a change lands in; they do not replace `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, or `ci`.
- **Migration commits.** `docs/spec/06-migration.md` M2 applies the base's "one logical change" to document moves: one role per commit, with its pointers. This narrows the unit; it does not weaken the header or body rules.
