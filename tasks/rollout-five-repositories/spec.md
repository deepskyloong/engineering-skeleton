# rollout-five-repositories

- **Goal**: Each of the five source repositories holds the skeleton's roles at their canonical paths with a green gate, or carries a reasoned exception recorded in `docs/backlog/B-0005-rollout-five-repositories.md`.
- **Non-goal**: This package does not fork the specification inside a target repository. A gap that exposes a wrong or missing rule changes the skeleton here first (spec → template → skill → `scripts/check.py`), with an ADR when a choice is made; the target then migrates to the evolved spec. A finding that cannot be settled in this session becomes a backlog item.
- **Acceptance**: Five audit reports exist under `audits/`; every repository has a recorded disposition in the backlog item; every skeleton change made during the rollout is committed on the skeleton branch with a green gate.
- **track**: default

## Context

`B-0005` names the rollout as the event that fires the triggers of `B-0002`, `B-0003`, and `B-0004`; without it those triggers are wishes. Stage one is a read-only audit of all five repositories against `docs/spec/0002-roles.md`. Migration begins only after the maintainer has reviewed the reports. The 2026-11-16 status-home decision (ADR-0006) is the first specification change the rollout forced; the vocabulary-home decision (ADR-0007) is the second: `GLOSSARY.md` is canonical and `CONTEXT.md` is a legacy alias; the vocabulary body and map shape (ADR-0008) is the third: the body follows the `domain-modeling` `GLOSSARY-FORMAT`, and `GLOSSARY-MAP.md` lists member contexts, their paths, and their relationships. `plan.md` records the per-repository sequence and the evolution rule.
