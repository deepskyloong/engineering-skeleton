# W04 role map

- Date: 2026-11-19
- Source: oshi `12739f3`, worktree `E:\Projects\oshi\.worktrees\skeleton-migration`; standard `3465bcf`
- Status: accepted 2026-11-19 (A, on recommendation; the residue goes to W04b); applied 2026-11-19 as C1 `e4b96c8` and C2 `55cea2d`, oshi gate green at both commits
- Role basis: `docs/norm/roles.md` admission clauses quoted per role below, "Five discriminations" item 1 (four documents, four jobs), and `docs/structure.md` step 6 ("Is it a lesson that will change what a maintainer does next time? → `docs/knowledge/`"). The page's job decides, not its directory or its title.
- Measure: non-whitespace characters, re-measured 2026-11-19. `Line` names the norm line: `hard` means inside the 10,000 soft line, `soft` means above soft and below the 16,000 hard line (`docs/norm/rules.md` R4a, ADR-0013). Directory READMEs are 6,000/12,000 with ≤40 rows.

Twelve files under `docs/notes/` (11 pages and one index, 93,045 non-whitespace) serve four jobs, not one. Five pages pass a knowledge admission and move in two commits: three guides and two cases. Six pages serve architecture, vocabulary, or a decision, and stay until that routing is decided; the remaining index is replaced by `docs/knowledge/README.md`. No page lands in `docs/knowledge/notes/`, so that directory is not created: a note appears at its first real use.

## Role admissions

Quoted from `docs/norm/roles.md`, "Optional, admitted by trigger" and "Always present".

- **Knowledge guide** — "A method that changes what a maintainer does next time"; trigger "The same mistake is about to be made twice".
- **Knowledge case** — "One incident, with the evidence that settled it"; authority "Binds the evidence it records; a later decision may cite it, not restate it"; trigger "An incident worth citing in a review".
- **Knowledge note** — "A short observation that does not yet justify a guide"; trigger "A thought worth keeping but not yet proven". Nothing here is short and unproven, so no page takes this role.
- **Directory index** — "Direct children membership, subtree placement, and directory-local rules that have no page role: one row per child, no totals".
- **Architecture** — "How the system is organized and what a change must respect: components and their boundaries, data and control flow, failure responses, invariants; an interface promise belongs to contracts and a choice's reason to an ADR". Discrimination, Contracts / Architecture: "Can a consumer file a bug because it changed (contracts), or is it read to understand the system (architecture)".

Discrimination 1 decides three residue pages: "a choice with rejected alternatives is an ADR; a fact a consumer may rely on is a contract; an explanation of internal organization is architecture". `docs/structure.md` step 6 decides the fifth: knowledge takes a lesson that changes behaviour, not a system explanation.

This is the knowledge role's first application. The standard has no `docs/knowledge/` page and the template ships none, so `Sample — no sample: first application`; every page below is checked against the admission's own test, not against a predecessor.

## Guides

| Page | Job | Trigger: the second effort that depends on the fact | Volume | Line |
| --- | --- | --- | --- | --- |
| `knowledge/guides/pitfalls.md` | pre-flight method: each trap is symptom → cause → countermeasure, scanned before work | `docs/testing.md` and `docs/contracts/backup.md` cite the countermeasures; every effort's environment step re-reads the same rows (10 citing files) | 15,283 | soft |
| `knowledge/guides/python-env-convention.md` | method: which interpreter a command needs, `uv run` versus `.venv` python | the annotation server in `docs/operations/annotation.md` and both annotation kits (`experiments/m1`, `experiments/m3b`) use the same split (6 citing files) | 7,691 | hard |
| `knowledge/guides/embedding-fundamentals.md` | method: the three checks that decide an embedding model, and why distance means similarity | the CCIP assumption behind `contracts/data-rules-ingest.md` §4.2 and the M2 pose probe rest on it; the page is the only statement of the checks (6 citing files) | 7,358 | hard |

`pitfalls.md` is above soft and below hard; the split is a W06 step, not part of a move (plan.md "Oshi's sequence" item 4). Its §1 environment rows and `docs/stack.md` also compete for the toolchain role, which W05 opens; the overlap is named in the residue section rather than resolved here.

## Cases

| Page | Job | Trigger: the review that cites the incident | Volume | Line |
| --- | --- | --- | --- | --- |
| `knowledge/cases/gt-error-audit.md` | the 2026-10-27 GT mislabel incident: what mechanical QC caught, what the ruling was, and the `m*` evidence | the acceptance report must state "the identity layer was not blind-reviewed" and carry the break-even table; `docs/operations/annotation.md` points at the same ruling | 4,329 | hard |
| `knowledge/cases/prototype-curve-reading.md` | the W1 sub-sampling experiment and its reading: 8 confirmed crops reach the ceiling | `contracts/data-rules-ingest.md` §4.2 and `docs/plans/m1-plan.md` §2.4 both depend on the ≥8 floor | 5,762 | hard |

## Directory index

| Page | Job | Trigger | Volume | Line |
| --- | --- | --- | --- | --- |
| `knowledge/README.md` | membership of the knowledge subtree: `guides/` and `cases/`, one row each, placement rule | a reader placing a lesson or an incident | new, ≈600 | hard |
| `knowledge/guides/README.md` | membership of the guide subtree, one row per page | a reader choosing between two guides | new, ≈300 | hard |
| `knowledge/cases/README.md` | membership of the case subtree, one row per page | a reader citing an incident | new, ≈300 | hard |

The old `docs/notes/README.md` states what belongs in "notes" (concepts, pitfalls, lessons, conventions) — a governance paragraph the three admissions replace. It does not move; it stays with the residue.

## Residue that stays

Six pages serve another job. They are not relabelled to fit knowledge: a page that serves more than one job splits the unit, and only admitted jobs move.

| Page | Job it serves | Nearest admitted role, and why it does not take it now | Volume | Proposed disposition |
| --- | --- | --- | --- | --- |
| `knowledge.md` | five jobs in one page: §1 route decision, §2 concept table, §3 selection method, §4 pointers, §5 history | no role admits a five-job page; it is not a short observation | 7,517 | W04b: §3 → a guide, §1 → an ADR, §2 → `GLOSSARY.md`, §4 → the guides index, §5 drops (living pages carry no history) |
| `data-integrity.md` | system organization: four layers, hard-link physics, manifest order, drift chain | architecture admits it ("invariants", "failure responses"); it overlaps `architecture/data-layers.md`, `failure-modes.md`, and `components-decision.md` §output-manager | 6,010 | W04b: keep the load-bearing why, merge into the architecture pages, then retire the path |
| `recognition-pipeline.md` | system organization: the model stack, the evidence order, cold start, threshold binding | architecture admits it, same overlap with `system.md` and `components-decision.md` §4.8; over soft | 11,866 | W04b: the organization merges into architecture, §3's "a threshold is not a number" becomes a guide |
| `annotation-eval-terms.md` | vocabulary and an annotation method: GT, holdout, burst, `annot_order`, the dual SKU, `same_shot` | vocabulary admits the terms (home `GLOSSARY.md`); the prefix and burst rules are already in `contracts/annotation-definition.md` and `annotation-identity.md`; over soft | 15,338 | W04b: terms → `GLOSSARY.md`, the ordering method → `docs/operations/annotation.md`, the same-shot explanation drops with pointers (W03 already recorded that the knowledge move carries it) |
| `recall-vs-coverage.md` | metric vocabulary: recall, coverage, and the second meaning of "coverage" | the definition that binds acceptance is in `contracts/annotation-acceptance.md` and `docs/plans/m1-plan.md` §2.1; this page explains it | 3,672 | W04b: one glossary entry per term; the gap-decomposition paragraph moves only if a consumer needs it |
| `classifier-vs-prototype.md` | a choice with a rejected alternative: no classifier, decision boundary in the `prototypes` table | an ADR owns it ("a choice with rejected alternatives"); it is not a method and not an incident | 6,379 | W04b: new `ADR-0013` (the series is free from 0013), with the "what the design gives up" section as its Consequences |

## Dispositions

- **Finding 13 (`docs/notes/` mixes methods and observations).** Re-cut: the directory mixes four jobs, not two. The minimal fix in the audit ("guides and notes") relabels six pages; the fix is a route by job, and this map moves the knowledge half first. The audit's byte counts (90,429) are a `57e3d0a` snapshot; the 2026-11-19 tree measures 93,045 non-whitespace.
- **The explanation job has no admitted home.** Three of the six residue pages (`data-integrity.md`, `recognition-pipeline.md`, the concepts half of `embedding-fundamentals.md`) teach how the system works to a zero-background reader, and `AGENTS.md` norm 3 institutionalises that reader ("recurring concepts moved to a `docs/notes/` page"). Architecture takes "what a change must respect" and the organization; it does not admit a teaching page for its own sake. One target is a sample, not proof, so this is reported as a standard question for W08, not settled here; oshi keeps the pages until it is decided, and `AGENTS.md` norm 3 is re-pointed at the residue path in the meantime.
- **`docs/notes/` becomes a legacy path.** While the six residue pages stay, the directory is a live path, so it is registered in `docs/adapters.md` as a retirable legacy path naming the six files and their revisit trigger (W04b's routing). The row is deleted when the last file leaves.
- **Tombstones.** The moved pages keep their old paths as tombstones when a frozen record cites them: `docs/plans/m2`, `m5`, `m8`, `experiments/m1`, `m2`, `m3`, `m5`, `tasks/manual-character-registration`, `docs/superpowers/b16`, `.scratch/embedding-coverage`. Living pages are repointed instead.

## Decision report

`Unit — docs/notes knowledge split · Recommend — A — knowledge-only move · Class — target wrong`

**1 Rule and source**

- Rule — a knowledge page holds one job: a guide is a method, a case is one incident with its evidence, a note is a short unproven observation; a page serving another job is not admitted.
- Source — `docs/norm/roles.md` rows quoted above, `docs/structure.md` step 6, and discrimination 1. The rule's owner is the standard's maintainer.
- Sample — no sample: first application.
- Owner — none outside the maintainer; this is not a standard change.

**2 Target now**

- Boundary — `docs/notes/`, 12 files: 11 pages and one index, 93,045 non-whitespace, measured 2026-11-19 on oshi `12739f3`.
- Shape — one directory, one README, one stated authority ("explanation layer; rules follow contracts, architecture, operations"), pages grouped by topic: traps, concepts, pipeline, terminology, measurements, decisions.
- Coherent — the form is used consistently (every page carries a Date/Source/Related/Nature header and points at the authoritative page), the maintainer owns it, and no failure is known. It is not coherent as one role: the directory holds four jobs, and its own README admits "concepts, principles, pitfalls, lessons and conventions".
- Gap — five pages pass a knowledge admission; six serve architecture, vocabulary, or an ADR; the index states a membership no single role admits.
- Baseline — oshi `12739f3`; standard `3465bcf`.

**3 Action**

- Change — `A — knowledge-only move`: C1 moves the three guides into `docs/knowledge/guides/` with the two new indexes and `docs/knowledge/README.md`; C2 moves the two cases into `docs/knowledge/cases/` with its index. Living pointers are repointed, frozen citers get tombstones, `docs/adapters.md` gains the `docs/notes/` legacy row, and `todo.md` records the W04b re-cut. One role per commit, `git mv` file by file.
- Check — oshi's gate: `uv run ruff check src tests scripts experiments`, `uv run ruff format --check src tests scripts experiments`, `uv run python scripts/check_prose.py` (needs `MD_TOOLS_PROJECT`), plus `git grep 'docs/notes/pitfalls.md'` and four siblings returning only tombstones, frozen citers, and the adapter row.
- Stop — the working tree has a change in a file the move touches; a frozen citation cannot resolve through a tombstone; a page would have to be relabelled to fit a role; a residue page would have to move to make the unit look complete.
- Expected — five pages at `docs/knowledge/{guides,cases}/`; the knowledge index lists them; every old path is a tombstone, a repointed living page, or an explained survivor; oshi's gate green.

**4 Risks**

- Frozen — ten frozen citer groups (plans, experiments, closed suite packages) keep citations through tombstones of ≤3 lines, one link, ≤400 non-whitespace, title ending `— moved`. The knowledge pages' `Related` headers point at residue pages and at each other; those are living and get repointed in the same commit.
- Blast radius — 5 files moved, 3 files created, ~15 living citing files repointed, 1 adapter row; no code. `N = 0`: no standard rule changes.
- Revert — `git revert` the two commits; no external effect.
- Conflict — `AGENTS.md` norm 3 sends recurring concepts to `docs/notes/`, which the standard has no role for. The move re-points the sentence at the residue path; it does not resolve the gap, which goes to W08 with this map as evidence.

**5 Alternatives and the ask**

- Recommend — A — knowledge-only move.
- Rejected
  - `B — audit-faithful split` — three guides and eight notes: the eight fail the note admission ("a short observation"), and six of them restate contracts or architecture facts; it is relabelling to fit a role.
  - `C — route every residue page now` — five roles in one unit (architecture, vocabulary, ADR, operations, knowledge); it reopens W03's architecture cut without a review and decides a standard question inside one repository.
- Flip — if the maintainer rules that concept explanation is its own role, C's architecture half becomes right and A shrinks to the residue's vocabulary and ADR pages; if the residue pages are judged duplicative with no load-bearing why, the disposition is drop plus tombstone, not a route.
- Ask
  - Accept `A — knowledge-only move`?
  - Should the residue be routed by W04b in this package, or deferred to W06/W08? Default: W04b in this package, because finding 13 and the pointer sweep stay open otherwise.

**6 Decision**

- `Status` — accepted · `Route` — on recommendation · `Record` — this map, `todo.md` (W04 done, W04b opened), the finding 13 row in `audits/README.md`, and `audits/move-records.md`.

## Applied results

- **Commits.** C1 `e4b96c8` moves the three guides with `docs/knowledge/README.md` and `docs/knowledge/guides/README.md`; C2 `55cea2d` moves the two cases with `docs/knowledge/cases/README.md` and adds its row to the parent index.
- **Measured after C2.** Guides: `pitfalls.md` 15,283 (soft), `python-env-convention.md` 7,691, `embedding-fundamentals.md` 7,370. Cases: `gt-error-audit.md` 4,329, `prototype-curve-reading.md` 5,762. Indexes: 849, 678, 516. Five tombstones, each three content lines and ≤129 non-whitespace.
- **Repointed.** `AGENTS.md` norms 1 and 3, `docs/README.md`, `docs/structure.md`, `docs/conventions.md` §8 item 5 and §8.1, `docs/development-workflows.md`, `docs/adapters.md` (row and "Freeze"), `docs/testing.md`, `docs/mutation-testing.md`, `docs/contracts/backup.md`, `docs/operations/annotation.md`, and the relative links inside the six residue pages and the two moved guides.
- **Registered.** `docs/notes/` as a legacy path frozen against new pages, its whitelist naming the six residue pages listed in `docs/notes/README.md` plus their forwarding tombstones.
- **Proof.** `git grep` over the five old paths returns only frozen records — `docs/plans/m5-plan.md`, `m8-plan.md`, `experiments/m1` (final report, annotation README, `build_kit.py`), `experiments/m3/results/g2b-apply-probe.json`, `experiments/m3b` (annotation README, `build_kit.py`), `experiments/m5/results/coldstart.md` — and the closed suite package `tasks/manual-character-registration`, which cites a residue page. Each resolves through a tombstone or the live shelf.
- **Gate.** Text-only: `ruff check` and `ruff format --check` green; `scripts/check_prose.py` 258 files with 0 wrapped blocks; every relative link under `docs/` resolves.
- **Deviation.** The shelf index listed the six residue pages from C1 while the two case pages still sat in the same directory, so the index and the directory disagreed for one commit; C2 removed them and closed the gap. No page's content was rewritten beyond pointer fixes.
- **Opened.** W04b routes the six residue pages; the explanation-home gap is filed for W08.
