# Summary — rollout-oshi

**Date:** 2026-11-21

**Acceptance:** met — all five `spec.md` criteria are met.

**Gate:** oshi full gate at `2cb1380` (`main` after the fast-forward) — 2026-11-20: pytest 658 passed / 1 skipped; ruff 231 files; ty clean; prose 244/0; tables 144/0; frontend `bun run validate` 86 tests.

**Gate:** repository-standard `bun run gate` — 2026-11-21: PASS 162 markdown files, 90 tests, 0 fail; two soft warnings (`docs/norm/flow.md`, `docs/norm/roles.md`).

**Criteria:**

- `audits/oshi.md` is reviewed — `audits/README.md` disposes all 25 findings (17 report + 8 follow-ups).
- Every oshi markdown file outside vendored directories has a role, an adapter row, or a written exception — inventory `audits/oshi.md`; admissions and exceptions in `maps/` and `docs/adapters.md`.
- Oshi's gate is green — `2cb1380`, 2026-11-20; output above.
- `B-0005` records oshi's disposition and stays active — `Progress`: merged and archived, four repositories remain, bun-toolkit next.
- `docs/knowledge/guides/migrating-a-repository-onto-the-standard.md` exists, names this summary, and carries only rules that outlive the effort.
- Oshi's migration branch is merged into `main`; `origin/main` contains `2cb1380` — **met** 2026-11-21: local `main` fast-forwarded from `1b52545`; `origin/main` moved `08a5414..2cb1380`.

## Outcome

- Target: on `main` at `2cb1380`, live roles are at canonical paths; `docs/README.md` is the inventory. Oshi's decisions are `ADR-0009–0015`. The retired shelves `docs/notes/`, `docs/designs/`, `docs/specs/`, `docs/adrs/`, `archived/`, and the 31 forwarding stubs are gone; every retired path with a remaining citation has an adapter row. `experiments/` and `docs/plans/` remain frozen legacy paths. The manual suite keeps `l2-spec.md` and `acceptance.md` as repo-added records in `docs/adapters.md`; no move to `experiments/`. The migration is on `main`.
- Standard: ADR-0021 package evidence; ADR-0028 moved path one row; ADR-0029 item files; ADR-0030 board handoff; ADR-0031 four-digit backlog; ADR-0032 role-page pointer; ADR-0033 item form; ADR-0034 evidence entries; ADR-0035 Python overlay R12 stage; ADR-0036 summary shape; ADR-0037 the guide is the closeout's judgement.
- Programme: `B-0005` stays active for the remaining four repositories; `Progress` records oshi merged and archived; bun-toolkit opens after.

## Residuals

- `docs/reviews/README.md` is 48 entries against the 40-row cap; the marker table is a separate index change — kind: known limitation; destination: revisit at the next reviews edit, accepted because the overflow is structural.
- `docs/adapters.md` 975 / 178 citation counts are undated — kind: known limitation; destination: date or remove at the next edit, accepted because each row names its successor.
- `AGENTS.md`, `docs/workflow.md`, and `docs/committing.md` keep `Last read 2026-11-19` — kind: deferred work; destination: re-read before the next repository's package opens (`B-0005`).
- The audit's full inventory is not re-run — kind: known limitation; destination: nothing, accepted because W06 re-measured 118 files / 0 hard breaches and the gate covers the live tree.
- `test_vlm` teardown prints a `ConnectionAbortedError` traceback on exit 0 — kind: known limitation; destination: nothing, accepted because no assertion fails and the suite exits 0.

## Compromises

None. No permitted deviation; known limitations and deferred work are in `Residuals`.

## Verification

- Survivors: `rg -l 'rollout-oshi'` returns the archived package, its archive index row, `B-0005`, this guide, historical ADRs (0029–0034, 0036, 0037), and older archived packages; no living page points at the open-package path.
- Reproduce: `git -C E:\Projects\oshi branch -a --contains 2cb1380` includes `main` and `origin/main`; `bun run gate` here; oshi's gate in `AGENTS.md`, with `uv run --frozen`; `Test-Path work-packages/archive/rollout-oshi` and `Test-Path work-packages/rollout-oshi` (the second is false); `tools/audit_repo.py` reproduces the audit counts.

Evidence: `audits/` — frozen report, 25-row disposition ledger, dated move records; `maps/` — role and admission basis; `tools/` — `audit_repo.py`; `docs/knowledge/guides/migrating-a-repository-onto-the-standard.md` — the method.
