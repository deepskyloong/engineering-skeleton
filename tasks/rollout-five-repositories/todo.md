# Todo

## Current state

- Updated: 2026-11-17
- Status: open; backlog `B-0005` active
- Branch: `feature/b0005-rollout`; re-check `git status`
- Gate: last known `PASS — 77 markdown files` (2026-11-17); re-run `bun run gate`
- Last done: W03 — review oshi's audit and rule the open questions; W10's decisions role moved (`610f1e9`) and its ADRs padded to `ADR-0009…0012` (`7a988f4`), while charter, contracts, and knowledge remain
- Phase: P1 — oshi migration
- Focus: W10 — move oshi's living docs into their roles
- Progress: 9 done / 2 todo / 10 blocked
- Todo: W10, W20
- Next: W10 — charter role: check `docs/brief.md` against the charter admission, then move it to `docs/charter.md`
- Blocked: W11–W19, W21 (see `Depends on`; W11 is next after W10)
- Open decisions: none for the audit; each role move still stops for review before it starts
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/decisions/check-in), this file (state/ledger)

## Work items

### P0 — Skeleton and oshi audit

#### W01 — Open the work package

**Status**: done
**Depends on**: none

Open `tasks/rollout-five-repositories/`, add the package to `tasks/README.md`, and set `B-0005` to `active` in the backlog before any work starts.

**Done when**:

- `tasks/README.md` lists the package
- `docs/backlog/README.md` reads `active` for `B-0005`

**Evidence**: commit `9446ec3`; `tasks/README.md`; `docs/backlog/README.md`.

#### W02 — Audit oshi

**Status**: done
**Depends on**: W01

Inventory every markdown file in oshi outside vendored directories, assign each a role or mark it `unplaced`, check the four failures, and write `audits/oshi.md` in the fixed format. The report records the blockers and major findings and the pointer-debt table.

**Done when**:

- every markdown file has a role or is `unplaced`
- the four failures are checked
- `audits/oshi.md` is committed

**Evidence**: `audits/oshi.md`; `tools/audit_repo.py`; dated snapshot 2026-11-16.

#### W03 — Review oshi's audit

**Status**: done
**Depends on**: W02

Rule the audit's open questions with the maintainer: which evidence class covers `experiments/` and `docs/plans/`, where tombstones live, and how the five closed work packages are disposed of. Record the rulings in `audits/README.md` and `plan.md`, then choose the next oshi role.

**Done when**:

- the three rulings are recorded
- `audits/README.md` no longer leaves them open
- the next oshi role is named

**Evidence**: commits `85ba4c0` (suite tracks, ADR-0010), `a2faba8` (tombstone role, ADR-0011); oshi `dcf99c9`; `audits/README.md`; `plan.md`; `B-0008` closed; next role `docs/decisions`.

#### W04 — Freeze oshi's legacy paths and add the adapter registry

**Status**: done
**Depends on**: W02

Freeze oshi's legacy paths and add `docs/adapters.md` before any migration. The registry covers `experiments/`, `docs/plans/`, `docs/reviews/`, `docs/agents/`, `archived/`, and `.workbuddy`; new files stop landing in those paths.

**Done when**:

- `docs/adapters.md` carries the registry rows
- the old homes are frozen
- the pointer proof is recorded

**Evidence**: commit `491b1ed`; `docs/adapters.md`; operations split `d583a92`.

#### W05 — Move the Status role to `docs/status.md`

**Status**: done
**Depends on**: none

Evolve Status to `docs/status.md` and revert oshi's move to `docs/operations/status.md`; record the choice in ADR-0006. The page stays a cross-domain state page; operations holds procedures only.

**Done when**:

- ADR-0006 is accepted
- the spec and template changes are committed
- oshi's page is back at `docs/status.md` and the gate is green

**Evidence**: commit `8049b3c`; ADR-0006; oshi `a1e3ba1`; `tests/test_status_cap.py`.

#### W06 — Move the Vocabulary role to `GLOSSARY.md`

**Status**: done
**Depends on**: none

Evolve Vocabulary to `GLOSSARY.md`, retire `CONTEXT.md` as a role, and record the home choice in ADR-0007. `CONTEXT.md` remains a legacy alias; no target gets a new `CONTEXT.md`.

**Done when**:

- ADR-0007 is accepted
- the spec, template, and check changes are committed
- the skeleton's `GLOSSARY.md` is in place

**Evidence**: commit `0b49c17`; ADR-0007; `GLOSSARY.md`.

#### W07 — Align the glossary body and map

**Status**: done
**Depends on**: W06

Align the glossary body with the `domain-modeling` `GLOSSARY-FORMAT`: context title, description, `## Language`, bold terms, `_Avoid_`, and subheadings for natural clusters. Widen `GLOSSARY-MAP.md` to member contexts and their relationships; it stores no definitions. Record ADR-0008.

**Done when**:

- `GLOSSARY.md` and `template/first-use/GLOSSARY.md` use the format
- `0002` states the role and map admission
- the gate is green

**Evidence**: commit `da09892`; ADR-0008; `GLOSSARY.md`; `template/first-use/GLOSSARY.md`.

#### W08 — Add the `Current state` handoff

**Status**: done
**Depends on**: W07

Add a `Current state` dashboard to `todo.md` and require it to be rewritten in the same commit as any step, decision, branch, or gate change. The block is a snapshot inside the four files; no work log and no fifth progress file.

**Done when**:

- `0003` defines the block
- `0002` names the handoff
- the template and both task indexes carry it
- the gate is green

**Evidence**: commit `aac07f6`; `docs/spec/0003-flow.md`; `template/effort/tasks/_template.md`; `tasks/README.md`.

#### W09 — Replace the checklist with a work item ledger

**Status**: done
**Depends on**: W08

Replace the one-line checklist with a work item ledger: `W<n>` blocks with status, dependencies, a prose description, one or more done-when criteria, and evidence. Add the phase breakdown to `plan.md`; keep `todo.md` as the detail home. Record ADR-0009.

**Done when**:

- `0003` defines the work item and the phase breakdown
- the template and both task indexes carry the schema
- this ledger is in place
- the gate is green

**Evidence**: `docs/spec/0003-flow.md`; ADR-0009; `plan.md`; `template/effort/tasks/_template.md`; `tasks/README.md`; this file; gate `PASS — 69`.

### P1 — Oshi migration

#### W10 — Move oshi's living docs into their roles

**Status**: todo
**Depends on**: W03

Move oshi's living docs one role per commit. `docs/charter.md`, `docs/contracts/`, `docs/knowledge/`, and `docs/decisions/` do not exist yet; `docs/status.md`, `docs/operations/`, `tasks/README.md`, and `GLOSSARY.md` are already placed. Leave tombstones or adapter rows for paths that cannot move.

**Done when**:

- the four roles exist at their canonical paths
- every old path is a tombstone or registered legacy path
- `rg -l '<old-path>'` survivors are explained
- oshi's gate is green

**Evidence**: commit `610f1e9` (decisions: ADR-09…12 at `docs/decisions/`, tombstones at the 09/10/12 old names, `docs/adrs/` a legacy path); `7a988f4` pads the series to `ADR-0009…0012` under ADR-0015, full gate green; charter, contracts, and knowledge pending.

#### W11 — Split oshi's pages to their budgets

**Status**: blocked
**Depends on**: W10

Split oshi's over-budget pages after the role moves. `docs/designs/` and `docs/specs/` total about 235k and need a contracts home and topic splits; `docs/notes/` has 32 files and needs the knowledge split. Do not mix a split with a move.

**Done when**:

- every role file is inside its volume budget
- `uv run pytest -q -n auto` and the `web/` gate are green
- the old paths have their closeout record

**Evidence**: pending

### P2 — Bun-toolkit

#### W12 — Audit bun-toolkit

**Status**: blocked
**Depends on**: W11

Audit bun-toolkit immediately before migration and write `audits/bun-toolkit.md` in the fixed format. Inventory every markdown file, assign a role or `unplaced`, and check the four failures.

**Done when**:

- every markdown file has a role or is `unplaced`
- the four failures are checked
- the report is committed

**Evidence**: pending

#### W13 — Migrate bun-toolkit

**Status**: blocked
**Depends on**: W12

Migrate bun-toolkit after the audit is reviewed. The `AGENTS.md` split and the adapter registry are the first moves; one role per commit.

**Done when**:

- `AGENTS.md` is split
- the adapter registry is in place
- the overlay's Markdown stage runs, or the exception is recorded
- the gate is green

**Evidence**: pending

### P3 — Python-toolkit

#### W14 — Audit python-toolkit

**Status**: blocked
**Depends on**: W13

Audit python-toolkit immediately before migration and write `audits/python-toolkit.md` in the fixed format. Inventory every markdown file, assign a role or `unplaced`, and check the four failures.

**Done when**:

- every markdown file has a role or is `unplaced`
- the four failures are checked
- the report is committed

**Evidence**: pending

#### W15 — Migrate python-toolkit

**Status**: blocked
**Depends on**: W14

Migrate python-toolkit after the audit is reviewed. Map its layout page to `docs/structure.md` and remove counts from the index pages; one role per commit.

**Done when**:

- the layout page maps to `docs/structure.md`
- the index carries no counts
- the gate is green

**Evidence**: pending

### P4 — Gearset

#### W16 — Audit gearset

**Status**: blocked
**Depends on**: W15

Audit gearset immediately before migration and write `audits/gearset.md`. Inventory every markdown file, check the four failures, and collect the six-module sample that `B-0003` needs.

**Done when**:

- every markdown file has a role or is `unplaced`
- the four failures are checked
- the six-module sample is recorded

**Evidence**: pending

#### W17 — Migrate gearset

**Status**: blocked
**Depends on**: W16

Migrate gearset after the audit is reviewed. Resolve the module level against the `B-0003` sample; one role per commit.

**Done when**:

- the module level is resolved against the sample
- the overlay's Markdown stage runs, or the exception is recorded
- the gate is green

**Evidence**: pending

### P5 — Personal-agent-kit

#### W18 — Audit personal-agent-kit

**Status**: blocked
**Depends on**: W17

Audit personal-agent-kit immediately before migration and write `audits/personal-agent-kit.md`. Record the generated-artifact and knowledge-split findings, and check the four failures.

**Done when**:

- every markdown file has a role or is `unplaced`
- the generated-artifact finding is recorded
- the knowledge-split finding is recorded

**Evidence**: pending

#### W19 — Migrate personal-agent-kit

**Status**: blocked
**Depends on**: W18

Migrate personal-agent-kit after the audit is reviewed. Introduce the generated header and the knowledge split; one role per commit.

**Done when**:

- the generated header is in place
- the knowledge split is in place
- the gate is green

**Evidence**: pending

### P6 — Closeout

#### W20 — Fix the skeleton gaps the rollout exposed

**Status**: todo
**Depends on**: none

Fix the skeleton gaps the rollout exposed. Each gap becomes an ADR, a spec change, or a backlog item; no one-off role or budget for a single repository. The first tombstone use exposed two: ADR-0011's cited sample (`docs/backlog.md`) ends `(moved)`, not `— moved`, and carries an explanation line, so the evidence it names fails the admission it documents; `scripts/check.py` accepts `ADR-\d{4}` and `B-\d{4}` only, while ADR-0015 keeps a migrated backlog's width, so a portable checker (`B-0002`) must accept `B-<n>` as well.

**Done when**:

- each open gap has an ADR, a spec change, or a backlog item
- the gate is green

**Evidence**: pending

#### W21 — Close `B-0005`

**Status**: blocked
**Depends on**: W20

Close `B-0005`. Every repository is migrated or carries a reasoned exception; the triggers for `B-0002`, `B-0003`, and `B-0004` have fired; the work package row leaves `tasks/README.md` and the backlog row is `closed`.

**Done when**:

- every repository has a recorded disposition
- the triggers have fired
- the indexes are updated
- the gate is green

**Evidence**: pending
