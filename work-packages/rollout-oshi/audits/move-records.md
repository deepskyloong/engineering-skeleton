# oshi move records

One section per role move or ruling, newest last; each carries the commit, the pointer proof, and the gate. A dated section keeps its date's finding state; the ledger in [README.md](README.md) carries the current one. The package archives this page with it.

## oshi decisions move (2026-11-17)

- Commit `610f1e9`; ADR-09…12 live at `docs/decisions/` and keep the two-digit series width; three two-line tombstones remain at `docs/adrs/adr-09-fuser-mixing.md`, `adr-10-per-work-db.md`, and `adr-12-vlm-cluster-experimental-seam.md`. ADR-11 had no frozen path citation, so its old path left no stub. Finding 10 is resolved: the records now use the `ADR-NN` prefix.
- Proof: `git grep -l 'docs/adrs/'` survivors are `.scratch/embedding-coverage/map.md` (closed suite package), `archived/` (legacy path, deletion pending), `docs/backlog/B-21` (closed item), `docs/decisions/ADR-12` (frozen ADR), `docs/plans/` (frozen), `experiments/m1/results/m1-final-report.md` (frozen), plus the adapter registry row and the index's move note; every frozen citation resolves through a tombstone.
- The four ADR blobs are byte-identical to their pre-move state; the body keeps `## Background` and `## Rejected alternatives`, and the index records the grandfathering instead of rewriting accepted records.
- Gate: text-only, the two `ruff` commands, green.

## oshi ADR width reconciliation (2026-11-17)

- The maintainer chose four-digit ADR width over the migrated two-digit exception. Standard `ADR-0015` changes the rule: a migrated ADR series is zero-padded at migration and never renumbered; a migrated backlog series keeps its width, because its items are cited by path and line and its index admits no non-item file.
- Oshi commit `7a988f4`: `ADR-09…12` → `ADR-0009…0012`; the four blobs are renamed, not rewritten. The three `docs/adrs/` tombstones keep their titles and now point at the padded files. The two-digit uppercase names had no frozen citation, so no new stubs were needed. Living pointers and labels are repointed; frozen records keep `ADR-09` labels.
- The backlog is untouched (`B-1…B-25`), as ADR-0015 requires.
- Gate: full, because the status page was touched — 658 passed / 1 skipped; `ruff` check and format green; `ty` check green. `docs/decisions/README.md` volume 4,240 (soft 6,000).

## oshi rulings (2026-11-17)

- **Suite tracks.** The four development-workflow suites own their track roots. The five closed packages under `docs/superpowers/` and `docs/compound-engineering/` stay in place and are registered as suite tracks (ADR-0010). Finding 3 is withdrawn: the five homes are four registered tracks plus the repository's own `tasks/` role. Finding 16 is withdrawn: a suite package may hold only the files a phase produced. Finding 2's reshape instruction is withdrawn for suite-owned packages; `tasks/README.md` exists and `head-kind-experiment` may stay spec-only.
- **Frozen evidence.** `experiments/` and `docs/plans/` stay frozen legacy paths; no move. `B-0007` stays open and fires only when a second repository keeps a frozen protocol. Finding 1's disposition is recorded; its role question is deferred.
- **Tombstones.** A tombstone is a role at the old path (ADR-0011); `B-0008` is closed. A correct tombstone is no longer `unplaced`.
- **Next role.** `docs/decisions`.

Resolved, withdrawn, or superseded: 2 (missing `tasks/README.md` resolved by `7443137`; the reshape instruction is withdrawn), 3 (withdrawn, registered tracks), 7 (superseded by ADR-0007), 8 (registry exists after W04), 10 (resolved by the decisions move, `610f1e9`), 16 (withdrawn). Still open: 4, 5, 6, 9, 11, 12, 13, 14, 15, 17, and the role question inside 1 (`B-0007`).

## oshi charter move (2026-11-18)

- Both checkouts were rebased onto `main` before the move: the standard's branch was fast-forwarded to `bd5b6f2` (it had no unique commits) and renamed `feature/b0005-rollout-oshi`, and oshi's `feature/skeleton-migration` was rebased onto `1b52545`.
- Commit `28c8bc4`: `docs/brief.md` → `docs/charter.md`. The page carries What this is / Who it serves / In scope (R1–R11) / Out of scope / Hard constraints (D1–D4) / Success criteria, 3,678 non-whitespace against the 10,000 soft line; the original wording of the requirements and rulings is preserved.
- Disposition (maintainer, C): §2 user profile and communication conventions folded into `docs/conventions.md` "Human labor and communication", the section that owned the topic and pointed at §2; §3 material and environment dropped — current material is `docs/status.md`, the environment is `docs/operations/setup.md`, and the tool-selection findings are `docs/notes/pitfalls.md` §1/§2; §4 and §5 moved with the page. The charter's requirement-mapping pointer still names the archived v1 architecture, so finding 6's deletion must retire that pointer first.
- Pointer proof: `git grep -n 'brief.md'` survivors are `archived/docs/designs/architecture.md` (4 lines, frozen archive), `tasks/manual-character-registration/spec.md` (1, closed suite package), `docs/notes/knowledge.md` (1, a historical statement naming §6 of the old page), and the adapter row. Every frozen citation resolves through the three-line tombstone.
- Gate: text-only (two `ruff` commands), green. The charter's §N anchors do not survive the move; ADR-0011 accepts that, because a tombstone carries one link, not a section map.

## oshi knowledge move (2026-11-19)

- C1 `e4b96c8`, C2 `55cea2d`. Five pages live at `docs/knowledge/`: guides `pitfalls.md` (15,283 non-whitespace, above soft and below hard), `python-env-convention.md` (7,691), `embedding-fundamentals.md` (7,370); cases `gt-error-audit.md` (4,329), `prototype-curve-reading.md` (5,762). `docs/knowledge/README.md` and one README per subrole; `notes/` is not created, because no page is a short unproven observation.
- The split is by job, not by the audit's two buckets. The audit's finding 13 called three pages methods and "the rest notes"; six pages fail the note admission ("a short observation") and stay, because they serve architecture, vocabulary, or a decision. The maintainer chose A on 2026-11-19; the report and the per-page target are `maps/w04-role-map.md`.
- Registered: `docs/notes/` as a legacy path, whitelist = the six pages listed in `docs/notes/README.md` plus their five forwarding tombstones (three content lines, ≤129 non-whitespace each); the Freeze paragraph carries its date.
- Pointer proof: `git grep` over the five old paths returns `docs/plans/m5-plan.md`, `m8-plan.md`, `experiments/m1` (final report, annotation README, `build_kit.py`), `experiments/m3/results/g2b-apply-probe.json`, `experiments/m3b` (README, `build_kit.py`), `experiments/m5/results/coldstart.md`, and the closed `tasks/manual-character-registration` package, which cites a residue page. Every survivor is frozen and resolves through a tombstone or the live shelf. Living pages repointed in the same commits: `AGENTS.md` norms 1 and 3, `docs/README.md`, `docs/structure.md`, `docs/conventions.md` §8 item 5 and §8.1, `docs/development-workflows.md`, `docs/testing.md`, `docs/mutation-testing.md`, `docs/contracts/backup.md`, `docs/operations/annotation.md`, the two moved guides' relative links, and the six residue pages' links.
- Gate: text-only (`ruff check`, `ruff format --check`), `scripts/check_prose.py` 258 files with 0 wrapped blocks, and every relative link under `docs/` resolves.
- Deviation: C1's shelf index listed the six residue pages while the two case pages still lived in the directory, so the index and the directory disagreed for one commit; C2 removed them and closed the gap. No page's content was rewritten beyond pointer fixes.
