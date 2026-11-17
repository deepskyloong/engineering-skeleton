# Audit — oshi

- **Repository**: `E:\Projects\oshi`
- **HEAD**: `57e3d0a` docs: correct the shas §0.2 recorded and B-23's evidence pointer
- **Measured**: 2026-11-16
- **Inventory**: 238 markdown files outside vendored directories, 2,241,268 non-whitespace characters in total.
- **Working tree**: `docs/reviews/README.md` modified, two untracked files under `experiments/s2-legacy-review/`. The modified file is a tracked index; it is a stop condition for any move that touches `docs/reviews/`.

Measurement commands: the inventory is regenerated with `../tools/audit_repo.py`; budgets use the `volume()` definition in `docs/spec/0004-rules.md` ("Budget units").

## Inventory

Each group below is a directory or a role with one disposition. Files not named here are runtime evidence and are not roles; their own directory index lists them.

| Group | Files | Volume | Assigned role | Disposition |
| --- | --: | --: | --- | --- |
| `README.md` | 1 | 10,322 | Storefront README | keep, trim to budget |
| `AGENTS.md` | 1 | 5,891 | Instruction layer | keep, split by reader |
| `docs/README.md` | 1 | 3,044 | Docs doc index | keep, trim to budget |
| `docs/brief.md` | 1 | 4,029 | Charter | move to `docs/charter.md` |
| `docs/structure.md` | 1 | 4,232 | Structure | keep |
| `docs/conventions.md` | 1 | 10,370 | Conventions | keep, split to budget |
| `docs/language-policy.md` | 1 | 2,675 | Conventions (language matrix) | fold into `docs/conventions.md` or a contract |
| `docs/status.md` | 1 | 4,185 | Status | move to `docs/operations/status.md` |
| `docs/operations.md` | 1 | 20,185 | Operations page | split into `docs/operations/<topic>.md` |
| `docs/backlog/` | 24 | 58,311 | Backlog item + index | keep; trim index, split oversized items |
| `docs/backlog.md` | 1 | 258 | Tombstone | keep; register the reason |
| `docs/adrs/` | 5 | 21,315 | Decision record | move to `docs/decisions/`, rename to `ADR-NN-` |
| `docs/designs/` | 4 | 88,581 | unplaced — durable contract candidate | move to `docs/contracts/`, split by topic |
| `docs/specs/` | 7 | 146,716 | unplaced — durable contract candidate | move to `docs/contracts/`, split by topic |
| `docs/notes/` | 11 | 90,429 | Knowledge note | move to `docs/knowledge/{guides,notes}/` |
| `docs/plans/` | 10 | 215,997 | unplaced — frozen protocol, cited by experiments | freeze; legacy path or record role |
| `docs/superpowers/` | 9 | 165,223 | unplaced — closed work-package artifact | move to `tasks/<slug>/`, keep only the cited files |
| `docs/compound-engineering/` | 2 | 40,911 | unplaced — closed work-package artifact | move to `tasks/<slug>/`, keep only the cited files |
| `docs/reviews/` | 24 | 259,786 | runtime report bodies (gitignored) plus one index | index stays; trim it; bodies stay out of git |
| `docs/agents/` | 4 | 3,923 | Adapter suite | register in `docs/adapters.md`; do not move |
| `experiments/` | 86 | 659,186 | unplaced — frozen evidence | freeze; legacy path or record role |
| `archived/` | 3 | 38,781 | unplaced — archive | delete, or leave tombstones where cited |
| `tasks/` | 7 | 130,141 | Work package | add `tasks/README.md`; split the extra files |
| `web/README.md` | 1 | 5,715 | Member README | keep |
| `src/oshi/README.md` | 1 | 2,108 | Module README | keep; no budget in the spec |
| `.scratch/` | 10 | 49,933 | runtime workshop | freeze; untracked or deleted at closeout |
| `.codeartsdoer/AGENTS.md` | 1 | 60 | foreign adapter stub | register in `docs/adapters.md` |
| `.workbuddy/` | 11 | 90,065 | foreign agent memory | leave in place; another product owns it |

`GLOSSARY.md` (1,887) is unplaced: it is the root vocabulary and belongs in `CONTEXT.md`.

### Unplaced files that need a role decision

`GLOSSARY.md`; `docs/designs/` (4); `docs/specs/` (7); `docs/plans/` (10); `docs/superpowers/` (9); `docs/compound-engineering/` (2); `docs/stack.md`; `docs/testing.md`; `docs/mutation-testing.md`; `docs/development-workflows.md`; `archived/` (3). Every other file has a role or is runtime evidence.

## Findings

Sorted by severity, then by the effort each fix would take.

1. **[blocker] §Evidence — 451 tracked files under `experiments/`, cited 975 times, with no role and no deletion exception.** The skeleton's retirement rules admit four exceptions; a frozen pre-registration or result is none of them. Why: a migration must either delete evidence or invent a home, and both break a rule. The same shape appears at smaller scale in `docs/plans/` (10 files, 178 citations). Minimal fix: decide the artifact class first — a record role admitted by trigger, or a legacy path registered in `docs/adapters.md` and frozen. Do not move these files before that decision.

2. **[blocker] §Work package index — `tasks/README.md` is absent, and one package is not a package.** `tasks/manual-character-registration/` carries `acceptance.md` and `l2-spec.md` beside the four files; `tasks/head-kind-experiment/` has only `spec.md`. Why: the work-package index is an always-present role, and a package with six files has no closeout boundary. Minimal fix: add `tasks/README.md` with one row per package; fold `acceptance.md` into `summary.md`, fold `l2-spec.md` into `spec.md`, and give `head-kind-experiment` a one-line summary or delete it.

3. **[major] §Structure — one effort shape lives in five homes.** `docs/plans/`, `docs/superpowers/`, `docs/compound-engineering/`, `tasks/`, and `.scratch/` all hold work-package artifacts. Why: P1 and "one role, one home"; a reader cannot tell which copy is authoritative, and a closeout cannot find all the pieces. Minimal fix: freeze the four old homes, route new efforts through `tasks/`, and dispose each home as its own commit: superpowers and compound-engineering become `tasks/<slug>/` (keep only files a frozen record cites), plans become the decided evidence class, `.scratch` stops being tracked.

4. **[major] §Contracts — two durable-fact directories have no contract home.** `docs/designs/` holds product architecture, the data model, and the DB topology (88,581); `docs/specs/` holds five UI contracts and the backup contract (146,716). Why: neither is repository structure, and neither fits a page budget of 8,000. Minimal fix: create `docs/contracts/` and split by topic (one file per contract surface), leaving the five UI contracts as five pages rather than one 146k pile.

5. **[major] §Budget — 29 role files exceed their volume budget.** The largest: `docs/designs/data-model.md` 45,276 / 8,000; `docs/plans/m3-plan.md` 47,288 (legacy); `docs/specs/audit-ui-spec.md` 36,017; `docs/designs/architecture-v2.md` 33,774; `docs/operations.md` 20,185; `docs/backlog/B-13-degenerate-crops.md` 13,863 / 4,000; `README.md` 10,322 / 8,000; `docs/conventions.md` 10,370; `docs/stack.md` 10,524; `docs/reviews/README.md` 11,708 / 2,000; `docs/backlog/README.md` 5,524 / 2,000; `docs/README.md` 3,044 / 2,000; `docs/adrs/adr-10-per-work-db.md` 7,680 / 6,000; `tasks/manual-character-registration/summary.md` 6,198 / 3,000. Why: R4a is a strong rule, and a budget breach inside a role page is the one failure a future gate will catch. Minimal fix: split each page by topic; trim each index to one line per child; split B-13 into an item plus a knowledge case.

6. **[major] §Retirement — `archived/` is a fifth deletion exception.** It holds three superseded documents and is cited 20 times. Why: "kept for history" is the second-home failure the spec names; `git log` already keeps the text. Minimal fix: delete the directory, and where a frozen record cites a path, leave a three-line tombstone and register it.

7. **[major] §Vocabulary — the root glossary is `GLOSSARY.md`, not `CONTEXT.md`.** Why: "shared terms have a home" is one of the five discriminations, and a vocabulary page outside its home will not be found by the next agent. Minimal fix: `git mv GLOSSARY.md CONTEXT.md`, update citations outside frozen records, and leave a tombstone only if a frozen record cites the old name.

8. **[major] §Adapter registry — two foreign paths write into the repository and no registry exists.** `docs/agents/` is the tracker suite the engineering skills read and write; `.codeartsdoer/AGENTS.md` is another tool's stub. Why: a foreign path that is not registered looks like a skeleton violation to the next auditor. Minimal fix: add `docs/adapters.md` with one row per suite: its path, what reads it, the whitelist, and the closeout route.

9. **[major] §Index autonomy — four indexes state counts.** `experiments/README.md` carries 442 and 675 item counts; `docs/plans/README.md` carries 442; `docs/reviews/README.md` carries 6; `docs/adrs/README.md` writes "five". Why: R2 is strong, and the counts are already stale against the directory. Minimal fix: replace each count with the directory link or the command that produces the list.

10. **[major] §Naming — ADRs use a lowercase prefix.** `docs/adrs/adr-09…adr-12` do not match `ADR-<nnnn>-slug.md`. Why: R11, and the migrated series keeps its width, so `ADR-09` is the correct target. Minimal fix: rename four files inside the same move to `docs/decisions/`; a frozen record that cites the old name gets a tombstone, not a rewrite.

11. **[minor] §Status cap — the test measures total characters, the role measures non-whitespace.** `tests/test_status_cap.py` enforces 5,000 total characters; the spec's status budget is 4,000 non-whitespace (Chinese) or 8,000 (English). Why: two units for one limit, the exact confusion `docs/spec/0004-rules.md` forbids. Minimal fix: rewrite the test to strip whitespace and table delimiter rows, then set 4,200 for this repository (the conversion note in `docs/spec/0006-migration.md`).

12. **[minor] §Docs tree — `docs/stack.md` is three documents in one.** It mixes toolchain facts, rejected alternatives, and deferred items. Why: the toolchain role admits reproducible traps, decisions belong in an ADR, and deferred items belong in the backlog. Minimal fix: split into `docs/toolchain/python.md` (traps only), one ADR for the runtime choices, and backlog rows for the deferred items.

13. **[minor] §Knowledge — `docs/notes/` mixes methods and observations.** `pitfalls.md` (15,139), `knowledge.md` (8,886), and `python-env-convention.md` (9,256 bytes) are methods; the rest are notes. Why: a guide changes what a maintainer does next time; a note is an observation. Minimal fix: split into `docs/knowledge/guides/` and `docs/knowledge/notes/`, each page under 8,000.

14. **[minor] §Reviews index — the index is 11,708 and the bodies are out of git.** The split is correct (runtime tier), but the index describes every report in detail. Why: a directory index carries one line per child and stays under 2,000. Minimal fix: one line per report, the detailed abstract moves into the report body (which is local) or a knowledge case.

15. **[nit] §Root entry — `README.md` carries the full milestone history.** Why: the storefront answers what, install, prove; history belongs in `docs/operations/status.md` or a case. Minimal fix: keep one paragraph, link the history.

16. **[nit] §Tasks — `head-kind-experiment` is a spec with no plan, todo, or summary.** Why: a package that never opened is not distinguishable from one that was abandoned. Minimal fix: close it with a one-line summary, or delete it.

17. **[nit] §Working tree — `docs/reviews/README.md` is modified and uncommitted.** Why: a migration that touches that index would sweep an unreviewed change into a move. Minimal fix: commit it before the migration starts, or exclude it from the first move.

## Pointer debt

The counts below are markdown files that name the old path and the number of occurrences. They decide which moves need tombstones and which need a legacy-path row.

| Old path | Files citing | Occurrences | Consequence |
| --- | --: | --: | --- |
| `experiments/` | 144 | 975 | freeze and register; never rewrite |
| `docs/plans/` | 84 | 178 | freeze and register, or 9 tombstones |
| `docs/designs/` | 57 | 164 | move, then tombstones for cited paths |
| `docs/specs/` | 53 | 158 | move, then tombstones for cited paths |
| `docs/status.md` | 57 | 134 | move, then one tombstone |
| `docs/notes/` | 32 | 62 | move, then tombstones per cited file |
| `docs/superpowers/` | 24 | 65 | move, then tombstones per cited package |
| `docs/backlog.md` | 18 | 41 | already a tombstone; keep it |
| `docs/reviews/` | 17 | 35 | index stays in place |
| `docs/adrs/` | 15 | 24 | move, then tombstones for cited ADRs |
| `archived/` | 13 | 20 | delete; tombstones only where cited |
| `GLOSSARY.md` | 10 | 18 | rename, then one tombstone |
| `docs/compound-engineering/` | 4 | 10 | move to `tasks/` |
| `docs/agents/` | 4 | 10 | stays; adapter row |

## What this audit does not cover

- The gitignored review bodies and experiment data files: they are runtime, not roles, and their content is not part of the layout question.
- The Chinese prose inside `docs/reviews/`: the bodies are local runtime artifacts, so the repository's English rule does not reach them. Every living page outside `docs/reviews/` is English with at most 1.3 percent CJK, all of it preserved names and terms per `docs/language-policy.md`.
- `web/` code and `src/oshi/` code: the audit covers documents, not behavior.

## What the next decision is

The audit stops here. Four questions block the first move: the evidence class, the tombstone home, the five closed work packages, and the migration order. The per-repository steps live in `../plan.md` and are updated after those answers.
