# W04b role map — the `docs/notes/` residue, first half

- Date: 2026-11-19
- Source: oshi `55cea2d`, worktree `E:\Projects\oshi\.worktrees\skeleton-migration`; standard `42a5eca`
- Status: accepted 2026-11-19 (first half: the admitted jobs move, the explanation question waits; second half: dissolve, no new role); applied as `a9300cc`, `adbebc5` (first half) and `c4e0a93`, `869e762`, `ac68abe`, `6205394` (second half), oshi gate green after each
- Role basis: `docs/norm/roles.md` — Knowledge guide "A method that changes what a maintainer does next time"; Architecture "How the system is organized and what a change must respect ... invariants"; the ADR role's admission is discrimination 1, "a choice with rejected alternatives is an ADR". Measure: non-whitespace characters, 2026-11-19.

The six residue pages were carried by W04 as one unit. Reading them page by page, two of them hold no job that is not already at a home, and the third holds one job plus a teaching narrative. So this half moves what is admitted and parks the rest: one guide, one ADR, one path retired with a tombstone, two pages left for the role question.

## Per-page pass

| Page | Job | Admission | Trigger | Volume | Disposition |
| --- | --- | --- | --- | --- | --- |
| `recognition-pipeline.md` §3 | a tuning method: model, definition and pipeline scope recorded with every value | Knowledge guide — "A method that changes what a maintainer does next time" | `pitfalls.md` and `ADR-0013` both need the method; no contract stated it | 1,292 (new page) | new `knowledge/guides/threshold-binding.md` (`a9300cc`); §3 keeps a pointer |
| `classifier-vs-prototype.md` | a choice with a rejected alternative: no in-project classifier, identity in the `prototypes` table | ADR — discrimination 1: "a choice with rejected alternatives is an ADR" | ADR-0009 records how the arms are mixed, not where identity lives; nothing stated the classifier alternative | 4,047 (new page) | new `ADR-0013-no-in-project-classifier.md` (`adbebc5`); the old path becomes a tombstone |
| `data-integrity.md` | the four layers, hard links, manifest order, the drift verdict chain, the human boundary | no admitted job left: every claim is already stated by a page whose role owns it | — | 6,030 | parked: see "The duplicate trace" |

## The duplicate trace (why `data-integrity.md` moved to W04b-ii)

Each load-bearing claim of the page, and the page that already states it:

| Claim | Already stated at |
| --- | --- |
| the four layers and their reproducibility | `architecture/data-layers.md` §1, table verbatim |
| hard links share the file record; ACL and attributes write through; read-only protection on archive links is impossible, so protection is the manifest plus `_quarantine` | `architecture/components-decision.md` §4.13, last bullet, verbatim, with the probe script and its JSON |
| deleting the last surviving copy → `_quarantine`, cleared after backup | §4.13 delete-protection bullet; FM-16; `contracts/data-rules-decisions.md` §4.5 |
| register first, write the filesystem second; resume before drift detection | §4.14 startup order; FM-09 |
| content identity is `file_hash`, sha256 only after a size/same-name prefilter; `move` follows the user; `ignore` means "not pursued"; no suppression bit in the output layer | §4.14 W4 landing boundary, verbatim |
| append-only decisions, one source of truth | `architecture/system.md` "Current default baseline" row 6; `data-layers.md` |

Nothing on the page is un-homed. Its remaining job is the teaching register — the narrative that explains these facts to a reader with no filesystem background — which is the same job W04b-ii is asking the maintainer to rule on. Retiring it here would decide that question by attrition, so it stays, and the trace lands there as the evidence.

## Decision report

`Unit — docs/notes residue, first half · Recommend — A — extract the admitted jobs, park the explanation · Class — target wrong`

**1 Rule and source**

- Rule — a page moves only when a role's admission takes its job; a job no role admits is reported, not relabelled, and not deleted to make a unit look finished.
- Source — `docs/norm/roles.md` rows quoted above, discrimination 1, and `docs/workflow.md` "Mapping table"; owner is the standard's maintainer.
- Sample — `docs/knowledge/guides/` and `docs/decisions/`, both in use since 2026-11-19.
- Owner — none outside the maintainer; no standard change here.

**2 Target now**

- Boundary — the six pages the W04 map left under `docs/notes/` (93,045 non-whitespace at the W04 baseline; 44,930 today, five live pages plus six tombstones).
- Shape — one shelf, one README, five live pages; every page states facts that also live in architecture, contracts, or a guide, and three of them teach those facts to a zero-background reader.
- Coherent — as a shelf, yes: consistent header, one owner, no known failure. As a role, no: it holds a method, a decision, and teaching, and none of the first two has a home.
- Gap — the method and the decision are admitted and homeless; the teaching is homeless and not admitted.
- Baseline — oshi `55cea2d`.

**3 Action**

- Change — `A`: extract §3 of `recognition-pipeline.md` into a guide, write `classifier-vs-prototype.md` into ADR-0013 and tombstone its path, and leave `data-integrity.md` plus the teaching register for W04b-ii. One role per commit: `a9300cc` (guide), `adbebc5` (ADR).
- Check — oshi gate: `ruff check`, `ruff format --check`, `scripts/check_prose.py`, plus every relative link under `docs/`; `git grep` over the retired path returns frozen citers only.
- Stop — a page that has to be relabelled to fit; a rule that would be stated twice after the move; a teaching page retired before the role ruling.
- Expected — the method has one home, the decision has one record, and the shelf shrinks by one live page with a tombstone in its place.

**4 Risks**

- Frozen — three frozen citers of `classifier-vs-prototype.md` (`experiments/m5/results/coldstart.md`, the closed suite's `spec.md` and `l2-spec.md`) resolve through the tombstone.
- Blast radius — 2 files created, 1 retired, 5 living pages repointed (`README.md`, `embedding-fundamentals.md`, `pitfalls.md` ×2, `knowledge.md`); no code.
- Revert — `git revert a9300cc adbebc5`.
- Conflict — `AGENTS.md` norm 3 still sends recurring concepts to `docs/notes/`; until the role ruling, the shelf exists, so the rule is satisfiable.

**5 Alternatives and the ask**

- Recommend — `A — extract the admitted jobs, park the explanation`.
- Rejected
  - `B — merge the two pages into architecture` — there is nothing to merge: `components-decision.md` §4.13 and §4.14 already carry their claims verbatim, so a merge would restate them.
  - `C — retire all six now` — decides the explanation role by attrition, inside one repository, against a question the maintainer parked.
- Flip — if the maintainer rules that no tutorial role will exist, `data-integrity.md` drops with a tombstone and the trace above is the argument.
- Ask — Accept `A`? (Answered 2026-11-19 in the session: yes, run the admitted pages first.)

**6 Decision**

- `Status` — accepted · `Route` — on recommendation · `Record` — this map, `todo.md` (W04b-i done, W04b-ii open), the finding 13 row in `audits/README.md`, `audits/move-records.md`.

## Applied results

- **Commits.** `a9300cc` creates `docs/knowledge/guides/threshold-binding.md` (1,292) and turns `recognition-pipeline.md` §3 into a pointer; `adbebc5` creates `docs/decisions/ADR-0013-no-in-project-classifier.md` (4,047) and reduces `classifier-vs-prototype.md` to a tombstone.
- **Repointed.** `knowledge/guides/README.md` gains the guide row, `decisions/README.md` the ADR row, `pitfalls.md` two threshold lines, `notes/README.md` loses the retired row.
- **Measured after `adbebc5`.** Shelf: `knowledge.md` 7,597, `data-integrity.md` 6,030, `recognition-pipeline.md` 10,885, `annotation-eval-terms.md` 15,338, `recall-vs-coverage.md` 3,672; six tombstones ≤132; README 1,267.
- **Proof.** `git grep 'docs/notes/classifier-vs-prototype.md'` returns only frozen records; every relative link under `docs/` resolves.
- **Gate.** prose 260 files with 0 wrapped blocks, `ruff check` and `ruff format --check` green.
- **Deviation.** The W04 map proposed merging `data-integrity.md` into architecture; the read found nothing to merge (trace above), so it is parked instead of merged. That is the second deviation this package records against its own proposal, and both point the same way: the residue's problem is a missing role, not a missing home.

## W04b-ii applied — the shelf is closed

- **Ruling.** Dissolve, no new role (maintainer, 2026-11-19). The five pages were each treated as: extract a job a role admits, or drop with the pointer fixes that keep every living reader resolving.
- **Commits.** `c4e0a93` moves the dependency method to `docs/knowledge/guides/choosing-a-dependency.md` (1,099); `869e762` takes the annotation and metric vocabulary into `GLOSSARY.md` (2,226 → 3,577) and retires `annotation-eval-terms.md` to a tombstone while deleting `recall-vs-coverage.md`, which had no citer; `ac68abe` retires `knowledge.md`; `6205394` retires `data-integrity.md` and `recognition-pipeline.md`, repoints every living reader, and turns the shelf's README into the tombstone index.
- **Dispositions.** `knowledge.md` → guide (`choosing-a-dependency.md`), glossary, ADR-0013's background, with the general-model teaching dropped; `annotation-eval-terms.md` → glossary, with the verification queries left where they already were, in `docs/operations/annotation.md`; `recall-vs-coverage.md` → one entry, then deleted; `data-integrity.md` → tombstone pointing at `components-decision.md` §4.13/§4.14; `recognition-pipeline.md` → tombstone pointing at §4.8.
- **No ADR-0014.** The route comparison would have restated ADR-0013's background, which already carries "no corpus, no training budget, a combination of released weights". One decision, one record.
- **Proof.** `git grep` over the five retired paths returns frozen records only — `docs/plans/m2-plan.md`, `experiments/m1`/`m3`/`m5`, the closed registration suite — plus the two `Source` lines that record where the new guides were split from; every survivor resolves through a tombstone. Every relative link under `docs/` resolves.
- **State.** `docs/notes/` holds ten tombstones and a README that indexes them; `docs/knowledge/` holds 5 guides and 2 cases with their indexes; `GLOSSARY.md` covers three domains. Gate: prose 260 files with 0 wrapped blocks, `ruff check` and `ruff format --check` green.
- **Registered.** The adapter row changed from "frozen, pending a role" to "closed": delete the directory when the last frozen citer is gone. The finding 13 row closes.

**Superseded in part (W04c, 2026-11-19).** The ruling behind this half was read backwards: "dissolve" meant into a new form, not into the pages that own the facts. The routing stands where it moved a job — the dependency method to a guide, the vocabulary to the glossary, the choice to ADR-0013, `recall-vs-coverage.md` deleted — and is reversed for the teaching register, which now lives in three explainers under the form admitted by `13ed7ae` and applied in `c30d17f`. `knowledge.md` stays retired; `data-integrity.md`, `recognition-pipeline.md` and `annotation-eval-terms.md` forward into `docs/knowledge/explainers/`. The authoritative disposition is `maps/w04c-explainer-role.md`.
