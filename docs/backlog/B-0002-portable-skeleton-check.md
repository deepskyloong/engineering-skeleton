# B-0002 — A machine-checkable checker for target repositories

## Problem

`scripts/check.py` checks this repository: role paths, link resolution, volume and entry budgets, naming, generated paths, and version consistency. It does not check placeholders, and it is not copied into a target repository. A generated repository gets the rules but not the checker, so its code gate is real and its documentation gate is not. P4 says a rule without enforcement is a slogan; the template currently exports slogans.

## Evidence

- The template's `AGENTS.md` states budgets and the change-surface rule with no command behind them.
- Four of the twelve rules in `docs/spec/04-rules.md` are `weak` and would remain weak even with a checker; the strong rules are only enforced inside this repository.
- A portable checker needs a small config: repository root, overlay, optional roles present, language.
- The rollout order is tracked in `B-0005`; a checker is worth extracting only after the second repository exists.

## Revisit when

The second repository is forged, or the first migration completes. Then extract the checks that are language-agnostic into `skeleton-check` with a config file, keep the language-specific gate in the overlay, and wire both into the template's `AGENTS.md`.
