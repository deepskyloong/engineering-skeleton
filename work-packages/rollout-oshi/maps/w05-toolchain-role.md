# W05 — the toolchain role, and the three jobs `docs/stack.md` holds

- Date: 2026-11-19
- Source: oshi `ec4a852`, worktree `E:\Projects\oshi\.worktrees\skeleton-migration`; standard `7c4e782`
- Status: pending — nothing applied
- Role basis: `docs/norm/roles.md` "Optional, admitted by trigger" (toolchain traps), "Always present" (directory index, charter), "Present from the first real use" (ADR, backlog item), "Five discriminations", and `rules.md` R13. The section's content decides the home, not its title.
- Measure: non-whitespace characters, table delimiter rows excluded (`docs/norm/rules.md` "Measuring"). New pages are estimated from the source sections plus a header allowance; the two ADRs and the traps page carry a measured source, not a snapshot of versions.

`Unit — place the toolchain role out of docs/stack.md · Recommend — A — split it into a traps page, two ADRs, two backlog items and one charter non-goal · Class — target wrong`

## Decision report

**1 Rule and source**

- Rule — a reproducible failure mode with its fix, and the command that shows it, is a toolchain trap at `/docs/toolchain/<language>.md`; the trigger is "the second environment-specific trap".
- Source — `docs/norm/roles.md`, "Optional, admitted by trigger", toolchain traps row; the row entered the standard with the role set, not from a target's failure, so its evidence is the five-repository audit that found install-level knowledge buried in stack pages (`audits/oshi.md` finding 12).
- Sample — `no sample: first application`. No repository among the five applies the row yet; the pass below is therefore stricter, one quoted admission per row.
- Owner — the maintainer (session user); no exception request is needed.

**2 Target now**

- Boundary — `docs/stack.md` (10,534 non-whitespace) and the trap already living in `AGENTS.md` "Package-index override" (600).
- Shape — one page serves three jobs. Traps: §2's Python 3.15 and `dghs-imgutils` rows, and §5's proof commands. Choices with rejected alternatives: §2 (17 rows) and §3.1 (14 rows). Deferred items: §3.3 (CI, packaging). §3.2 repeats the charter's non-goals for three of its five rows. §1 and §4 are framing.
- Coherent — the page is internally consistent, sourced (a 2026-10-28 measurement), and has an owner; it is not coherent as one role, because three readers arrive for three different jobs (debugging an install, relitigating a tool, planning a release) and the page sits at 10,534 against the 10,000 / 16,000 any-page budget.
- Gap — the trap row has no home; the choices have none; the deferred items are correct where they are only by accident of the page's shape.
- Baseline — oshi `ec4a852` (clean tree); standard `7c4e782`.

**3 Action**

- Change — `A — split by job`, one role per commit:
  - **C1 toolchain** — new `docs/toolchain/README.md` (directory index) and `docs/toolchain/python.md` (three traps, each with its reproduction command); the `docs/README.md` row; `AGENTS.md` keeps a one-line gate precondition pointing at the page.
  - **C2 decisions** — new `docs/decisions/ADR-0014-runtime-stack.md` (§2) and `docs/decisions/ADR-0015-dev-toolchain.md` (§3.1); two index rows.
  - **C3 backlog** — new `docs/backlog/B-26-ci-service.md` and `docs/backlog/B-27-packaging-release.md` (§3.3); two index rows.
  - **C4 charter** — one non-goal (containerized or multi-machine deployment); the other four §3.2 rows already sit in the charter and are dropped, not restated.
  - **C5 retire** — `docs/stack.md` becomes a tombstone linking `docs/README.md`; the remaining living pointers move (`docs/development-workflows.md`, `web/README.md`).
- Check — oshi's gate per commit. C1–C4 are text-only (two `ruff` commands plus the prose check); C5 touches `web/README.md`, so it runs all five Python commands and the frontend gate. Pointer proof: `git grep -n 'docs/stack.md'` survivors are the two frozen citers, explained below.
- Stop — a trap that stops reproducing under its own command; a choice whose rejected alternative a page already owns (then it is a pointer, not an ADR row); a citation that would break without a tombstone.
- Expected — `docs/stack.md` is gone and a tombstone stands; the traps page, both ADRs, both backlog items and the charter are inside their soft lines; the gate is green at each commit.

**4 Risks**

- Frozen — `docs/backlog/B-12-retire-experiments.md` names `docs/stack.md` inside a dated measurement (six files whose ruff lines include `experiments`), and `docs/compound-engineering/plans/2026-11-07-1331-refactor-web-assets-decoupling-plan.md` names it in a suite plan. Both keep their citation; the tombstone resolves it. The tombstone links `docs/README.md` because the cited sections land in more than one role home (W03's tombstone rule).
- Blast radius — 11 files across two repositories; no `src/`, `tests/`, `scripts/`, `config/` or `web/assets/` change, so no code moves. `docs/development-workflows.md` is already at 16,539, over its hard line; the pointer edit neither fixes nor worsens it (W06 owns that split).
- Revert — `git revert` each oshi commit in reverse order; the standard's map commit is independent. The tombstone is the only irreversible-looking step and it is reversible: the file's content is in `git log` at `ec4a852`.
- Conflict — `docs/stack.md` says the HuggingFace endpoint was chosen because "direct connection unavailable on this machine". On 2026-11-19 `HEAD https://huggingface.co` returned 200 from this machine (and `hf-mirror.com` did too). The default is not silently rewritten: ADR-0014 records the reason as dated to 2026-10-28, records today's observation, and keeps the mirror with a reopen trigger that names the test that would settle it.

**5 Alternatives and the ask**

- Recommend — `A — split by job`; field 3 is its mechanics.
- Rejected
  - `B — keep docs/stack.md and trim only §3.3` — leaves the traps where no reader looks for them, keeps the page over its soft line, and leaves finding 12 open.
  - `C — one ADR for both runtime stack and dev toolchain` — two choices that are relitigated independently (swapping ONNX Runtime for PyTorch is not the same review as swapping the linter), and the combined record lands above the ADR soft line.
  - `D — leave the package-index trap in AGENTS.md` — the page's trigger is the second environment-specific trap, and that trap is the first; a traps page that omits the trap its own trigger counts is the split half done.
- Evidence — no sample: first application. The three traps were reproduced on 2026-11-19 (commands and observations below); the count, not the argument, is what the trigger measures.
- Flip — if fewer than two traps still reproduce, W05's own condition applies: no page is created and the traps stay in `AGENTS.md`.
- Ask — `Accept A?`; `the three traps, including AGENTS.md's package-index one? Default: yes — a traps page that leaves out the trap that opens its trigger is half a page.`

**6 Decision**

- `Status` — pending.
- `Route` — not yet set.
- `Record` — this page for the ruling; the applied commits and their gate results are appended here; `audits/move-records.md` takes the dated move; finding 12 in `audits/README.md` closes on the applied commit.

## The three traps, reproduced 2026-11-19

| # | Trap | Command that shows it | Observed |
| --- | --- | --- | --- |
| 1 | A package index inherited from the shell rewrites `uv.lock` before the gate runs | `$env:UV_DEFAULT_INDEX`; then `uv run python -V` and `git status --short uv.lock` | the variable printed `https://mirrors.aliyun.com/pypi/simple/` in this session; per `AGENTS.md`, `uv run` re-locks to it and the diff is a registry-URL change that belongs to the environment, not the change. `--locked` fails instead of no-oping; `--frozen` and `$env:UV_DEFAULT_INDEX = $null` both stop it |
| 2 | No ONNX Runtime wheel exists for the 3.15 line | `uv venv --python 3.15 <tmp>` then `uv pip install --dry-run --python <tmp>/Scripts/python.exe onnxruntime` | `error: No solution found … all versions of onnxruntime have no wheels with a matching Python ABI tag (e.g., cp315) … we only found wheels for onnxruntime (v1.32.0) with … cp311, cp312, cp313, cp313t, cp314, cp314t`. PyPI's cp315 wheel count over all releases: 0 |
| 3 | `dghs-imgutils` cannot join the project's resolved set | `uv pip install --dry-run --python .venv/Scripts/python.exe dghs-imgutils`; `python -c "import importlib.metadata as m; print([r for r in m.requires('dghs-imgutils') if 'numpy' in r])"` | the dry run plans `numpy==1.26.4` and downgrades `opencv-contrib-python`, `pandas` and `scipy` to satisfy it; the package declares `numpy <2`; `pyproject.toml` pins `numpy==2.5.4`; numpy 1.x ships no cp314 wheel (PyPI count: 0), so the downgrade has no wheel to install |

The fix each trap already has, and which the page must carry: clear the index variable or run `--frozen`; stay on the 3.14 line and re-verify wheels before upgrading; install the ML set through `scripts/setup_ml_deps.py` (`--no-deps` plus explicit pins, `--check` to verify imports) and never through `uv add`.

## Role admissions

Quoted from `docs/norm/roles.md`.

- **Toolchain traps** — "Reproducible failure modes and their fix, each with the command that shows it"; exit "Deleted when the trap stops reproducing"; authority "Binds the trap's treatment; a fix that ignores the reproduction command is a bug"; trigger "The second environment-specific trap".
- **Decision record (ADR)** — "A choice with rejected alternatives that a future maintainer would otherwise relitigate".
- **Backlog item** — "A deferred idea with a revisit trigger and evidence".
- **Charter** — "Scope, non-goals, hard constraints, success criteria"; exit "A non-goal is removed only by an ADR".
- **Directory index** — "Direct children membership, subtree placement, and directory-local rules that have no page role: one row per child, no totals".
- **Tombstone** — "A forwarding stub for a moved file: at most 3 lines, exactly one link, no explanation; the title ends with `— moved`"; trigger "A frozen record cites a path that has moved".

Discriminations applied: Tombstone / Adapter — "Forwarding a moved path (tombstone) versus registering a foreign suite's path (adapter); a path takes one, not both", so `docs/stack.md` gets a tombstone and no registry row. Explainer / Architecture, Guide — not in play here.

## Role pass

`Admission` is the clause quoted above. `Trigger` is the necessity evidence, not the admission test.

| Page | Job | Admission | Trigger | Volume | Line |
| --- | --- | --- | --- | --- | --- |
| `docs/toolchain/README.md` | directory index: the page, its placement rule | Directory index | the directory exists; placement has one rule (one page per language) | ≈700 est. | hard |
| `docs/toolchain/python.md` | three reproducible traps and their fixes | Toolchain traps | T2 and T3 after T1: a third install failure would otherwise be written wherever it happened | ≈2,500 est. | hard |
| `docs/decisions/ADR-0014-runtime-stack.md` | the runtime rows of §2: choice, why, what lost, when to revisit | Decision record | the architecture baseline names the same choices without their reasons, so every swap re-opens the argument | ≈4,200 est. | hard |
| `docs/decisions/ADR-0015-dev-toolchain.md` | §3.1's tool choices | Decision record | lint, type-check and task-runner swaps recur; only the reasons prevent a re-litigation | ≈3,400 est. | hard |
| `docs/backlog/B-26-ci-service.md` | CI, deferred with its trigger | Backlog item | `AGENTS.md` states the current decision; the trigger (a remote) would otherwise be remembered only in conversation | ≈900 est. | hard |
| `docs/backlog/B-27-packaging-release.md` | packaging and release, deferred | Backlog item | same page, same trigger shape; distribution is a later decision, not an omission | ≈800 est. | hard |
| `docs/charter.md` (edit) | one non-goal: containerized or multi-machine deployment | Charter | §3.2 refuses it; the charter is where a refusal binds | 3,732 → ≈3,980 | hard |
| `docs/stack.md` (tombstone) | forwarding | Tombstone | B-12 and the compound-engineering plan cite the path | ≈150 | ≤400 |

## What does not move, and why

| Source | Job | Disposition |
| --- | --- | --- |
| §1 "In one sentence" | promise | dropped: the charter's "What this is" and `README.md` already state it, and a third copy would drift |
| §3.2 "Web GUI", "Cloud API", "Model fine-tuning" | non-goal | dropped: the charter's "Out of scope" already holds all three, in the original wording; no restatement |
| §3.2 "Docker / containers" | non-goal | moved to the charter |
| §3.2 "ORM / migration framework" | rejected alternative | to ADR-0014's storage row: it is a tool that lost to `sqlite3` + `schema.sql`, not a scope refusal |
| §4 "Division of labor with the design docs" | ownership note | dropped with the page; the surviving rule (the architecture baseline is the design-layer registry; reasons belong here) becomes ADR-0014's `Related` line |
| §3.1 "Tests", "Coverage", "Mutation testing" | choice, already stated | pointed, not restated: `docs/testing.md` and `docs/mutation-testing.md` own the definitions; the ADR records only the tool choice and its rejected alternative |
| §2 / §3.1 version numbers | measurement | dropped from the records: `pyproject.toml` and `uv.lock` are already the authoritative snapshot, and a version copied into prose goes stale (R10) |

## Applied plan

Per commit, on `feature/skeleton-migration`:

| Commit | Files | Gate |
| --- | --- | --- |
| C1 toolchain | `docs/toolchain/README.md`, `docs/toolchain/python.md`, `docs/README.md` row, `AGENTS.md` pointer | text-only: two `ruff` commands + prose |
| C2 decisions | `docs/decisions/ADR-0014-runtime-stack.md`, `ADR-0015-dev-toolchain.md`, `docs/decisions/README.md` ×2 rows, `web/README.md` pointer | text-only (the `web/README.md` pointer is held to C5 instead, so C2 stays docs) |
| C3 backlog | `docs/backlog/B-26-ci-service.md`, `B-27-packaging-release.md`, `docs/backlog/README.md` ×2 rows | text-only |
| C4 charter | `docs/charter.md` | text-only |
| C5 retire | `docs/stack.md` tombstone, `docs/development-workflows.md` pointer, `web/README.md` pointer | full five + frontend gate |

Pointer proof after C5: `git grep -n 'docs/stack.md'` survivors are B-12's dated measurement and the compound-engineering plan; both are frozen citations the tombstone resolves. Every living pointer names a new home.

## Findings the pass leaves for W07

1. `docs/adapters.md` "Registry" carries four `legacy path` rows (`docs/brief.md`, `docs/designs/`, `docs/specs/`, `docs/notes/`) whose only content is a tombstone. The Tombstone / Adapter discrimination says a path takes one, not both, and the tombstone's own exit already states when it retires. W07 decides whether the four rows drop; this unit adds no fifth.
2. `docs/development-workflows.md` at 16,539 is over the 16,000 hard line, and its `docs/stack.md` sentence is one of the pointers this unit must move. The move does not fix the breach; W06 owns the split.
