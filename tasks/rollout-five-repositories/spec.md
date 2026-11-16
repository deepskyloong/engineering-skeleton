# rollout-five-repositories

- **Goal**: Each of the five source repositories holds the skeleton's roles at their canonical paths with a green gate, or carries a reasoned exception recorded in `docs/backlog/B-0005-rollout-five-repositories.md`.
- **Non-goal**: This package does not change the specification to fit a repository. A gap found during migration becomes a backlog item here, never a local fork in the target.
- **Acceptance**: Five audit reports exist under `audits/`, and every repository has a recorded disposition in the backlog item.
- **track**: default

## Context

`B-0005` names the rollout as the event that fires the triggers of `B-0002`, `B-0003`, and `B-0004`; without it those triggers are wishes. Stage one is a read-only audit of all five repositories against `docs/spec/0002-roles.md`. Migration begins only after the maintainer has reviewed the reports.
