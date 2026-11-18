# rollout-oshi

- **Goal**: Oshi holds the standard's roles at their canonical paths with a green gate, or carries a reasoned exception registered in its `docs/adapters.md`.
- **Non-goal**: This package does not migrate the other four source repositories; `B-0005` opens one package per repository, in order. It does not fork the specification inside oshi: a gap that exposes a wrong or missing rule changes the standard here first (spec → template → skill → `scripts/check.py`), with an ADR when a choice is made, and oshi then follows the evolved spec.
- **Acceptance**: `audits/oshi.md` is reviewed; every oshi markdown file outside vendored directories has a role, a tombstone, an adapter row, or a written exception; oshi's gate is green; `B-0005` records oshi's disposition and stays active for the remaining four.
- **track**: default

## Context

`B-0005` first carried all five repositories in one package; oshi's audit showed that unit is too large. Oshi's migration is the first application of a draft norm, and each role it moves changes the norm the next repository would follow — ADR-0006 through ADR-0016 are already that change — so a package that also planned four untouched repositories would plan them against a spec oshi will not leave in place. The rollout now runs one package per repository, oshi first (`B-0005`); the five-repository package closed after its audit, its decisions about the standard, and oshi's first role moves, and `git log` is the record of that part.
