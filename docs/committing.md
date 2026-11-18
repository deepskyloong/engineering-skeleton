# Committing

Base: `docs/spec/0007-committing.md`. Read it first; this file records only deviations. Last read: 2026-11-18.

## Deviations

- **Extra types.** `spec`, `template`, `skill`, and `check` are allowed in addition to the base's set. They name the layer a change lands in; they do not replace `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, or `ci`.
- **Migration commits.** `docs/spec/0006-migration.md` M2 applies the base's "one logical change" to document moves: one role per commit, with its pointers. This narrows the unit; it does not weaken the header or body rules.
