# ADR-0025 — CI runs every stage but the prose one

Status: Accepted (2026-11-19)

## Context

The prose stage runs `md-tools` out of the python-toolkit checkout named by `MD_TOOLS_PROJECT`. `ffcbade` moved that stage inside the checker so `bun run gate` kept one entry point, and nothing in `.github/workflows/gate.yml` sets the variable. On `ubuntu-latest` the stage therefore reaches its "variable is not set" branch, which is a failure by design, so the pipeline has been red since that commit while every local run stayed green.

CI cannot clone a machine-local checkout, and `md-tools` has no install path yet — `B-0011` keeps installability as the trigger that would give it one. Leaving the pipeline red until then is the other candidate, and a gate that is always red is a gate nobody reads.

## Decision

CI runs every stage except the prose one, and the omission is explicit at both ends.

- `bun run gate:ci` = `bun fmt --check` over code, Prettier over Markdown, `bun test scripts`, and `bun scripts/check.ts --no-prose`.
- The workflow runs `gate:ci` and carries a comment naming what it leaves out; the checker's pass line prints `(prose stage skipped by --no-prose)`.
- There is no implicit skip. An unset `MD_TOOLS_PROJECT` still fails, and `--no-prose` is the only way to leave the stage out — a flag, not an environment variable, so the omission is visible in the command that made it.
- `setup-python` and `setup-uv` leave the workflow with the stage they served; `bun install --frozen-lockfile` and `bun run gate:ci` are the whole pipeline.

## Options considered

1. A named `gate:ci` that omits the prose stage — chosen. CI goes green, every other rule keeps its enforcement, and a reader of the workflow or of the pass line can see what is unchecked.
2. Clone python-toolkit in CI and export `MD_TOOLS_PROJECT` — rejected for now: it needs a credential for a second repository and ties this repository's CI to a machine-local layout. Reopen when `B-0011` gives `md-tools` an install path.
3. Keep CI red until the tool is installable — rejected: a permanently failing gate stops being a signal, and the reason is invisible in the run.
4. Skip the stage whenever `MD_TOOLS_PROJECT` is unset — rejected: that is the fail-open the stage exists to prevent. A machine that forgot the variable would report prose as clean, which is the one claim the gate must never make without running it.
5. Copy `md-tools` into this repository — rejected: `B-0011` and the norm keep one implementation of the block model, and a copy would answer for the tool's own behavior.

## Consequences

- CI is green again and enforces every rule except prose form.
- A prose regression can merge without a red pipeline. `bun run gate` before a commit is the only control, which is what `AGENTS.md` already says a green run is: the minimum, not evidence.
- `docs/norm/overlays.md` C2 is untouched. It binds generated repositories, where the same distinction applies — CI may not _add_ a rule — and this repository's omission is a local operating choice, recorded here rather than generalized into a norm no second repository has tested.
- Reopen when `md-tools` is installable: the workflow drops `gate:ci` and CI returns to `bun run gate`, and this ADR is superseded rather than edited.
