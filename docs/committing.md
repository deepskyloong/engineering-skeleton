# Committing

Base: `docs/norm/committing.md`. Read it first; this file records only deviations. Last read: 2026-11-18.

## Deviations

- **Extra types.** `norm`, `template`, `skill`, and `check` are allowed in addition to the base's set. They name the layer a change lands in; they do not replace `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, or `ci`.
- **Migration commits.** The migrate mode's M2 in `docs/workflow.md` applies the base's "one logical change" to document moves: one role per commit, with its pointers. This narrows the unit; it does not weaken the header or body rules.
- **Commit-msg hook.** The repository enables the optional hook shipped at `template/core/.githooks/commit-msg`; its root `.githooks/commit-msg` is a wrapper in this checkout. It enforces the header pattern and the allowed types, the blank line before the body, the subject cap and no trailing period, and rejects a body paragraph split across lines while no `Body width:` is recorded. Enable it with `git config core.hooksPath .githooks`.
