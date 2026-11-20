# ADR-0035 — The Python overlay ships R12's table stage

Status: Accepted (2026-11-20).

## Context

R12 makes a table a row of cells — one space on each side — and marks itself `strong`, but its enforcement cell names `scripts/check.ts`, which is this repository's checker and is not copied into a target (`B-0002` is still open, and its twelve-check set does not include tables). ADR-0012 called the rule conditional — "a repository that formats no Markdown complies by doing nothing" — yet the failure that produced oshi's script came from a code formatter touching `*.md`: the frontend `oxfmt` re-padded `web/README.md`, and `c6f8711` normalized 98 living files and added `scripts/check_tables.py`, which reads 144 files today with zero findings. The Python overlay's gate runs five code stages and reads no Markdown, so a forged Python repository would inherit a strong rule its gate cannot fail — the defect `docs/norm/rules.md` "Scope and strength" and foundations P4 name.

## Decision

The Python overlay ships `tools/check_tables.py` as its sixth gate stage, after build. The script is oshi's check with the two hard-coded frozen prefixes removed and one repeatable `--exempt <prefix>` added, so a target that registers a frozen legacy path leaves it unchecked; it lists files through `git ls-files` and falls back to a tree walk when the copy is not a work tree yet. `docs/norm/overlays.md` "Python" C1 and the general C1 row state the stage, `docs/norm/rules.md` R12 names it as the Python enforcement, and the overlay README lists the file and the chain.

ADR-0012's conditional sentence is superseded in part: the rule binds a Python repository even when it formats no Markdown, because a checker needs no formatter. Its formatting half — Prettier with the compact-table plugin — stands, and the TypeScript overlay's formatting stage remains `B-0011`'s.

## Options considered

- A standard tool owns the check — rejected: `B-0002` is a twelve-check, two-runtime package that has not started, its check set omits tables, and R12 would stay unenforced in every forge until it lands.
- The target-local check is the intended shape — rejected: every Python target would rewrite about 120 lines, and a target that declines leaves R12 a slogan; oshi's two frozen prefixes are its legacy, not a standard rule.
- Narrow ADR-0012's sentence and ship nothing — rejected: the failure came from a code formatter, so "no formatter means automatic compliance" is false, and a `strong` rule with no command is what P4 forbids.
- Ship a Python Markdown formatter instead of a check — rejected: `mdformat` re-pads every table to the longest cell (`B-0011`, verified against 1.0); no Python formatter keeps cells at one space.

## Consequences

- A forged Python repository reaches a green gate with R12 enforced, and a padded cell fails it; a migrated Python repository ports the stage into its own gate and passes `--exempt` for each frozen path it registers.
- `template/core/AGENTS.md`'s Gate sentence names the stages its overlay's README lists, so a target's per-turn page does not under-describe its gate.
- Oshi is untouched: `scripts/check_tables.py` is the same check at its own path and already the gate's sixth command (`c6f8711`, 144 files, 0 findings).
- ADR-0012 is marked superseded in part and its index row links here; the formatting decision stands.
- When `B-0002`'s Python checker lands, this check becomes one entry in it rather than a second script; the stage name does not change.
- `B-0011` narrows to the formatting half: the TypeScript overlay's formatter stage, the prose stage, and the TypeScript table check still wait.
