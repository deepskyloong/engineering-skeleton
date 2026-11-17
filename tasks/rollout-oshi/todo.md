# Todo

## Current state

- Updated: 2026-11-17
- Status: open; `B-0005` active (programme); this package is the oshi step
- Branch: `feature/b0005-rollout`; re-check `git status`
- Gate: last known `PASS — 80 markdown files` (2026-11-17); re-run `bun run gate`
- Last done: W01 — split the five-repository package into `rollout-oshi`
- Phase: P1 — role moves
- Focus: W02 — charter role
- Progress: 1 done / 8 todo / 0 blocked
- Todo: W02–W09
- Next: W02 — compare `docs/brief.md` with the charter admission, then move it to `docs/charter.md`
- Blocked: none
- Open decisions: none for the audit; each role move still stops for review before it starts
- Read first: `spec.md` (goal/acceptance), `plan.md` (work breakdown/decisions/check-in), this file (state/ledger)

## Work items

### P0 — Package split

#### W01 — Split the five-repository package into `rollout-oshi`

**Status**: done
**Depends on**: none

Close the five-repository package as superseded and open `tasks/rollout-oshi/`: move the oshi audit and its measurement script, carry the reviewed rulings, and leave the programme in `B-0005` with one package per repository. The old package's goal changed from five repositories to one, which `0003` makes a new package rather than a scope reduction; its summary records what it left behind.

**Done when**:

- the new package carries spec, plan, and todo, plus the audit and its tool
- the old package's summary is written and its directory is gone
- `tasks/README.md` lists one open package
- `B-0005` states the per-repository order and stays `active`
- the gate is green

**Evidence**: commit `b041762`; `tasks/rollout-oshi/`; `B-0005` (per-repository plan); gate `PASS — 80 markdown files`.

### P1 — Role moves

#### W02 — Move the charter role

**Status**: todo
**Depends on**: W01

Compare `docs/brief.md` (4,029) with the charter admission — scope, non-goals, hard constraints, success criteria — and move it to `docs/charter.md`. A brief that carries history or a roadmap loses that material to `docs/status.md` or the backlog before the move. Update living pointers; leave a tombstone if a frozen record cites the old path.

**Done when**:

- `docs/charter.md` exists in the charter shape
- no living page points at `docs/brief.md`; `rg -l 'docs/brief.md'` survivors are explained
- oshi's gate is green

**Evidence**: pending

#### W03 — Move the contracts role

**Status**: todo
**Depends on**: W02

Create `docs/contracts/` and split `docs/designs/` (4 files, 88,581) and `docs/specs/` (7 files, 146,716) by contract surface: one page per API shape, data schema, CLI surface, or compatibility promise a second effort relies on. A design narrative that explains internal organization is architecture, not a contract; its choices become ADRs and its structure stays a section of the owning page. Leave tombstones for cited paths and register them in `docs/adapters.md`.

**Done when**:

- every page under `docs/contracts/` passes the contract admission
- `docs/contracts/README.md` indexes the pages
- every contract page is inside oshi's budget for the role
- the old paths are tombstones or registered legacy paths
- oshi's gate is green

**Evidence**: pending

#### W04 — Move the knowledge role

**Status**: todo
**Depends on**: W03

Split `docs/notes/` (11 files, 90,429) into `docs/knowledge/guides/` for methods that change what a maintainer does and `docs/knowledge/notes/` for observations that do not yet justify a guide. `pitfalls.md`, `knowledge.md`, and `python-env-convention.md` are guides by the audit's reading. Add `docs/knowledge/README.md`; leave tombstones for cited files.

**Done when**:

- each note is a guide or a note by admission
- every page is inside its volume budget
- no living pointer resolves to `docs/notes/`
- oshi's gate is green

**Evidence**: pending

#### W05 — Place the toolchain role

**Status**: todo
**Depends on**: W04

`docs/stack.md` (10,524) mixes toolchain traps, runtime choices, and deferred items. Split it: traps with the command that shows them to `docs/toolchain/python.md` if the toolchain admission holds — the second environment-specific trap — the choices to an ADR with their rejected alternatives, and the deferred items to oshi's backlog. If only one trap reproduces, the traps stay in `AGENTS.md` and no toolchain page is created.

**Done when**:

- `docs/stack.md` is gone and each part is at its role
- the toolchain page exists or its absence is recorded
- oshi's gate is green

**Evidence**: pending

### P2 — Page repairs and audit closeout

#### W06 — Fit oshi's role pages to their budgets

**Status**: todo
**Depends on**: W05

Re-measure every role page after the moves; the audit's 29 breaches were a 2026-11-16 snapshot. Split by topic, not by length: `docs/designs/data-model.md` (45,276) and `docs/specs/audit-ui-spec.md` (36,017) are the largest. Trim each index to one line per child (`docs/reviews/README.md` 11,708, `docs/backlog/README.md` 5,524, `docs/README.md` 3,044), keep the storefront README to what, install, and prove, and link the history. Split a page after its role is at home, never in the same commit as a move.

**Done when**:

- every role page is inside its hard budget
- index pages state no counts
- oshi's gate is green

**Evidence**: pending

#### W07 — Close the audit's remaining findings

**Status**: todo
**Depends on**: W06

Give every finding in `audits/oshi.md` a disposition. The ones the moves do not carry: index autonomy in `experiments/README.md`, `docs/plans/README.md`, `docs/reviews/README.md`, and `docs/adrs/README.md` (finding 9); `tests/test_status_cap.py` measuring total characters against a non-whitespace budget (11); `archived/` as a fifth deletion exception with its 20 citations (6); the uncommitted `docs/reviews/README.md` (17). A finding that needs a skeleton rule goes to W08 instead of being fixed locally; finding 1 stays with `B-0007`.

**Done when**:

- every finding is resolved, withdrawn, or filed as a backlog item
- the dispositions are recorded in `audits/README.md`
- oshi's gate is green

**Evidence**: pending

### P3 — Closeout

#### W08 — Fix the skeleton gaps the rollout exposed

**Status**: todo
**Depends on**: W07

Fix the skeleton gaps oshi exposed. Each gap becomes an ADR, a spec change, or a backlog item; no one-off role or budget for one repository. Two are named: ADR-0011's cited sample (`docs/backlog.md`) ends `(moved)`, not `— moved`, and carries an explanation line, so the evidence it names fails the admission it documents; `scripts/check.py` accepts `ADR-\d{4}` and `B-\d{4}` only, while ADR-0015 keeps a migrated backlog's width, so the portable checker (`B-0002`) must accept `B-<n>` as well.

**Done when**:

- each open gap has an ADR, a spec change, or a backlog item
- the gate is green

**Evidence**: pending

#### W09 — Close the package and record oshi's disposition

**Status**: todo
**Depends on**: W08

Write `summary.md` in three sections, relocate what outlives the effort — rulings to ADRs or the backlog, the audit index's surviving dispositions to `B-0005` — and record oshi's disposition there without closing the item: the remaining four repositories keep `B-0005` active. Move the package to `tasks/archive/rollout-oshi/`, move its row from `tasks/README.md` to `tasks/archive/README.md`, and prove `rg -l 'rollout-oshi'` survivors are explained.

**Done when**:

- `summary.md` exists, is inside budget, and names what was not done
- `B-0005` carries oshi's disposition and remains `active`
- the package is at `tasks/archive/rollout-oshi/` and its row is in the archive index
- every surviving `rollout-oshi` pointer is explained
- the gate is green

**Evidence**: pending
