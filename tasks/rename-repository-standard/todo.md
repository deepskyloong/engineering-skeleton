# Todo

## Current state

- Updated: 2026-11-18
- Status: open
- Branch: `main`; re-check `git status`
- Gate: last known `PASS — 90 markdown files` (2026-11-18); re-run `bun run gate`
- Last done: W01 — record the decision
- Phase: P1 — Living pages
- Focus: W02 — rewrite the normative pages
- Progress: 1 done / 5 todo / 0 blocked
- Todo: W02–W06
- Next: W02 — rewrite the normative pages
- Blocked: none
- Open decisions: none
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/risks), this file (state/ledger)

## Work items

### P0 — Record

#### W01 — Record the decision

**Status**: done
**Depends on**: none

Write `docs/decisions/ADR-0018-repository-standard-rename.md` with the candidates and the rejected options; add its row to `docs/decisions/README.md`; add the **repository standard** entry to `GLOSSARY.md` with `skeleton` as the former name; set `B-0014` to `active` in `docs/backlog/README.md`; open this package's row in `tasks/README.md`.

**Done when**:

- ADR-0018 exists and its index row links it
- `GLOSSARY.md` defines `repository standard`
- `B-0014` is `active`
- `tasks/README.md` lists this package
- `bun run gate` is green

**Evidence**: ADR-0018; `docs/decisions/README.md`; `GLOSSARY.md`; `docs/backlog/README.md`; `tasks/README.md`; gate `PASS — 90 markdown files`.

### P1 — Living pages

#### W02 — Rewrite the normative pages

**Status**: todo
**Depends on**: W01

Rewrite `README.md`, `AGENTS.md`, `GLOSSARY.md`, `docs/spec/0001-foundations.md`, `0003-flow.md`, `0004-rules.md`, `0005-overlays.md`, `0006-migration.md`, `docs/spec/README.md`, `docs/README.md`, `docs/workflow.md`, and `docs/structure.md`. Replace "skeleton" with "repository standard" on first mention and "the standard" after it; rewrite the sentences a blind replacement would make self-referential, including `AGENTS.md`'s opening and `0001`'s degeneration paragraph. Keep the glossary's former-name line as the only living use of `skeleton`.

**Done when**:

- no living normative page says `skeleton` except the glossary's former-name line
- `README.md` and `AGENTS.md` name the repository standard
- `docs/spec/0001-foundations.md` says "What the standard is"
- `bun run gate` is green

**Evidence**: pending

#### W03 — Rewrite the template and the open records

**Status**: todo
**Depends on**: W02

Update `template/README.md`, `template/core/AGENTS.md` (`skeleton: vN` to `standard: vN`), and `template/effort/docs/adapters.md`. Update `docs/backlog/B-0001`, `B-0002` (body only; keep the file name), `B-0005` (title and body), `B-0011`, and the matching index rows. Update `tasks/README.md` and `tasks/rollout-oshi` (the checkout path and a terminology note); leave `audits/oshi.md` as a dated snapshot and keep the existing branch names.

**Done when**:

- the template's header key is `standard: vN`
- the open backlog items and the tasks index use the new term
- `B-0002-portable-skeleton-check.md` keeps its path and its body checks `standard: vN`
- the live package's path points at `E:\Projects\repository-standard`
- `bun run gate` is green

**Evidence**: pending

### P2 — Skill and package

#### W04 — Rename the skill and its references

**Status**: todo
**Depends on**: W03

Rename `E:\AI\skills\i-project-skeleton` to `E:\AI\skills\i-repository-standard`; rewrite its `SKILL.md` name, description, title, grounding, root variable (`SKELETON_ROOT` to `STANDARD_ROOT`), fallback path, and prose. Update the two references in `E:\AI\skills\i-draft-standard-rollout\SKILL.md` and `README.md`, and the `skills-self-built.md` row.

**Done when**:

- `rg -il 'i-project-skeleton|SKELETON_ROOT' E:\AI\skills` returns nothing
- the skill reads `i-repository-standard` and resolves `E:\Projects\repository-standard`
- the rollout skill and the self-built index point at the new name
- `bun run gate` is green

**Evidence**: pending

#### W05 — Rename the package and the gate identifiers

**Status**: todo
**Depends on**: W04

Update `package.json` to `repository-standard`, the `scripts/check.py` docstring, and the `tasks/rollout-oshi/tools/audit_repo.py` docstring. Run `bun install` to regenerate `bun.lock`, then `bun run gate`.

**Done when**:

- `package.json` and `bun.lock` carry `repository-standard`
- neither `scripts/check.py` nor `audit_repo.py` names the old repository
- `bun run gate` is green

**Evidence**: pending

### P3 — Closeout

#### W06 — Close the package and `B-0014`

**Status**: todo
**Depends on**: W05

Write `summary.md`; move the package to `tasks/archive/rename-repository-standard/`; remove its row from `tasks/README.md` and add it to `tasks/archive/README.md`; set `B-0014` to `closed` and write its `## Outcome`; run the final `rg -il 'skeleton'` inventory and name every survivor in the summary; run the final gate.

**Done when**:

- `summary.md` exists and names what was not done
- the package is at `tasks/archive/rename-repository-standard/`
- `B-0014` is `closed` with an outcome
- every surviving `skeleton` occurrence is a frozen record or a dated snapshot named in the summary
- `bun run gate` is green

**Evidence**: pending
