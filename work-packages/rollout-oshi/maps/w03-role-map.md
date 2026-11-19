# W03 role map

- Date: 2026-11-18; revised 2026-11-19 after review (four rulings, recorded in `todo.md` "Open decisions")
- Source: oshi `28c8bc4`, worktree `E:\Projects\oshi\.worktrees\skeleton-migration`
- Status: accepted 2026-11-19; applied 2026-11-19 as C1 `6d6033a`, C2 `b7efaec`, C3 `5bfb3de`, C4 `5f9df75`, oshi gate green at every commit
- Role basis: `docs/norm/roles.md` admission clauses quoted per role below, "Five discriminations", and `rules.md` R13 — the section's content decides, not its title or directory. The reader test decides the contracts/architecture question: a consumer can file a bug because a page's palette, anatomy, keys, data shape or navigation changed (contracts), versus a page that is read to understand the system (architecture).
- Measure: non-whitespace characters, table delimiter rows excluded (`docs/norm/rules.md` "Measuring"), re-measured 2026-11-19. A new page's volume is its source sections plus a 300-character header allowance; an existing page's merge includes its current volume. Revision records are excluded (see "Disposals"). `Line` names the norm line that governs the verdict: `hard` means inside 10,000 soft, `soft` means above soft and below 16,000 hard. A directory README is 6,000/12,000 with ≤40 rows.

Eleven sources become 31 files in four role homes: contracts 20 files (19 pages and their index), architecture 7 files (6 pages and their index), 4 operations pages (two merges into existing pages, two new pages), and one conventions merge; ten old paths become tombstones. Each page holds one role. Roles are decided by the reader test, not by the source file: four UI specifications contribute contracts pages only, because a page author is the consumer and a changed palette or key map is a bug they file.

## Role admissions

Quoted from `docs/norm/roles.md`, "Optional, admitted by trigger" and "Always present".

- **Durable contract** — "A fact a consumer may rely on across efforts: API shape, data schema, CLI surface, compatibility promise"; trigger "A second effort depends on the same fact". Discrimination, Contracts / Architecture — "Can a consumer file a bug because it changed (contracts), or is it read to understand the system (architecture)".
- **Architecture** — "How the system is organized and what a change must respect: components and their boundaries, data and control flow, failure responses, invariants; an interface promise belongs to contracts and a choice's reason to an ADR"; trigger "The first change that must respect a boundary it does not own".
- **Operations page** — "A procedure someone must follow under pressure: deploy, rollback, restore, rotate"; trigger "The first procedure that cannot be remembered". Discrimination, Architecture, Contracts / Operations — "Does it describe a system response or format (architecture, contracts), or steps a person runs (operations)".
- **Conventions** — "Language, naming, citation, the five discriminations; a target page points at the norm source and records deviations".

A UI page's failure list is a promise its author must keep, so it is a contract; a component failure-mode walkthrough describes a system response, so it is architecture.

## Contracts

`Admission` quoted above applies to every row in this table.

| Page | Job | Trigger | Source sections | Volume | Line |
| --- | --- | --- | --- | --- | --- |
| `contracts/README.md` | directory index: membership, the family grouping, scope | a reader placing a contract page | specs README index; designs README contract inventory; directory scope | 3,396 | hard |
| `contracts/cli.md` | CLI surface | CLI users and operations | architecture §8 | 2,028 | hard |
| `contracts/model-registry.md` | model registry rows and their fields | store and registry implementers | data-model §2 | 1,230 | hard |
| `contracts/schema.md` | SQLite schema | store, migration, backup | data-model §3, §6 | 12,261 | soft |
| `contracts/data-rules-ingest.md` | generations, file identity, prototype admission and aggregation | scan and ingest implementers | data-model §4.1–§4.2 | 9,988 | hard |
| `contracts/data-rules-decisions.md` | clustering, burst, output, correction, path boundaries | fuser, review and output implementers | data-model §4.3–§4.7 | 9,097 | hard |
| `contracts/config.md` | the per-work TOML config surface | bootstrap, scan, operations | data-model §5 | 8,264 | hard |
| `contracts/backup.md` | data safety tiers, backup formats, backup failure modes | the nightly backup task and operations | backup §1, §2 command surfaces, §7; data-model §1 backup obligations; per-work §3 granularity | 5,841 | hard |
| `contracts/work-key.md` | the four-artifact naming matrix | store and operations | per-work §1 naming matrix | 912 | hard |
| `contracts/annotation-definition.md` | what counts as a human-shaped instance, and the red lines | annotators and QC | annotation §1 holdout definition, §3, §9 red lines | 7,253 | hard |
| `contracts/annotation-identity.md` | identity assignment, layers, burst, progress | annotators | annotation §4–§7 | 8,936 | hard |
| `contracts/annotation-acceptance.md` | acceptance definitions and the blind-review disclosure | the acceptance reviewer | annotation §8 (except §8.1); §9's mislabel statement | 3,350 | hard |
| `contracts/ui-review.md` | the review page's write boundary, batch modes, keys, failure modes | the review page and `oshi review --apply` | review §1–§4, §7 | 9,608 | hard |
| `contracts/ui-review-data.md` | review manifest, decisions export, apply writer, page state | the review page and `oshi review --apply` | review §5–§6 | 7,638 | hard |
| `contracts/ui-audit.md` | the audit page's structure, visual language, lightbox, write boundary, failure modes | the audit page | audit §1–§5, §8 | 12,104 | soft |
| `contracts/ui-audit-data.md` | audit manifest, page state, decisions export, apply writer | the audit page and `oshi audit apply` | audit §7 | 3,135 | hard |
| `contracts/ui-audit-navigation.md` | the navigation strip and its jumps | the audit navigation author | audit §6 | 9,770 | hard |
| `contracts/ui-label.md` | the label page family, anatomy, judgement unit, data, writer, failure modes | label page authors | label §1–§7 | 12,188 | soft |
| `contracts/ui-manual.md` | the manual page's write boundary, anatomy, interaction, state, acceptance | manual-page authors | manual §1–§5, §7 | 7,747 | hard |
| `contracts/ui-manual-navigation.md` | the crop-queue and preview navigation | manual page authors | manual §6 | 3,142 | hard |

The page state of all four UI specifications lands in a contract data page (`ui-review-data.md` §page state, `ui-audit-data.md` §page state, `ui-label.md` data section, `ui-manual.md` state section); the earlier cut sent review's local state to architecture, which split one job across two roles.

## Architecture

`Admission` quoted above applies to every row in this table.

| Page | Job | Trigger | Source sections | Volume | Line |
| --- | --- | --- | --- | --- | --- |
| `architecture/README.md` | directory index: membership and scope | a reader placing an architecture page | designs README architecture inventory; directory scope | 1,670 | hard |
| `architecture/system.md` | context, component inventory, notes, core flows; one pointer line for the M0 backfill | an implementer changing a component or a flow | architecture §3.1–§3.3 (except §3.2.1), §5; designs README baseline | 6,443 | hard |
| `architecture/components-pipeline.md` | ingest through embedder | scan-pipeline implementers | architecture §4.1–§4.7 | 5,338 | hard |
| `architecture/components-decision.md` | fuser through review | decision-chain implementers | architecture §4.8–§4.15 | 10,883 | soft |
| `architecture/failure-modes.md` | the failure-mode walkthrough | an operator or reviewer | architecture §6 | 2,396 | hard |
| `architecture/db-topology.md` | the per-work boundary and what is shared | store and backup | per-work §1 boundary, §2 | 2,861 | hard |
| `architecture/data-layers.md` | the four-layer data model and its reproducibility | store and registry implementers | data-model §1 | 988 | hard |

`architecture/system.md` carries one pointer line, not a section move: the M0 enablement backfill's exit conditions are in `docs/plans/m0-plan.md` §5.3, and the current enablement is the baseline table the page already holds. The section itself is a decision record, so it does not become an architecture section.

## Operations pages

`Admission` quoted above applies to every row in this table.

| Page | Job | Trigger | Source sections | Volume | Line |
| --- | --- | --- | --- | --- | --- |
| `operations/annotation.md` | the annotation workflow and its verification | the annotation server and its GT import | existing 1,395; annotation §2, §10, §11 operating rules | 7,736 | hard |
| `operations/backups.md` | run steps, strategy, restore, verification | the nightly task and a restore | existing 1,325; backup §2 run steps, §3, §5, §6; data-model §6 migration | 6,256 | hard |
| `operations/db.md` | per-work lifecycle, archive, prune, verification | per-work DB operations | per-work §3 lifecycle, §4, §7 | 4,616 | hard |
| `operations/ui-checks.md` | the page-specific proofs a UI change runs | a UI change that must prove the page | review §8, audit §9, label §8 | 8,852 | hard |

`operations/annotation.md` and `operations/backups.md` are existing pages: the source sections merge into them, they do not append a parallel page. `operations/db.md` and `operations/ui-checks.md` are new; the operations README gains two rows. The UI checks do not copy `operations/commands.md`; that page keeps the curated daily loop and links to `contracts/cli.md` for the surface.

## Conventions and charter

| Target | Merge | Volume | Line |
| --- | --- | --- | --- |
| `docs/conventions.md` | retire the revision-log rule and replace it with the no-history rule; add backup §4 git handling and label §9 change discipline; the two READMEs' governance duplicates §8.1 and drops, except the scope list and naming lines; update §8.1's scope list, §8.5's role paths, and the D1–D4/Q1–Q6/U1–U3 landing-points line | 11,288 → 10,959 | hard |
| `docs/charter.md` | pointer edits only; D1–D4 already sit in "Hard constraints"; the sentence pointing at the architecture decision ledger is removed | 3,678 | hard |
| `docs/decisions/ADR-0010-per-work-db.md` | no edit; per-work §5 and §6 duplicate its Reasoning, Consequences and four "When to reopen" triggers | — | — |

No new ADR and no new backlog item: the census's Q/U rows are pointers to the sections that carry them, and the per-work reopen conditions exist in ADR-0010. Q3 is the exception: its landing point is §7, which drops, so its disposition is in "Disposals" and W08 records it.

## Tombstones

A tombstone is the old path, at most three lines, one link, title ending `— moved` (ADR-0011). Target rule: if every surviving cited section lands in one role home, the link is that home's README or the page that owns its bulk; if the cited sections span role homes, the link is `docs/README.md`, the docs-tree index that lists every role directory. `Cited sections` lists what the frozen citers name, so a reader can see which sections a single link has to reach.

| Old path | Frozen citers | Cited sections | Retired in | Forward to |
| --- | --- | --- | --- | --- |
| `docs/designs/architecture-v2.md` | 16 | §3.2, §3.2.1, §4.8, §4.13–§4.14, §5.1; §7 (dropped) | C2 | `docs/architecture/README.md` |
| `docs/designs/data-model.md` | 20 | §1, §3, §4.1, §4.2, §4.4, §4.5, §5, §6 | C3 | `docs/contracts/schema.md` |
| `docs/designs/per-work-db.md` | 3 | §1–§4, §7 | C3 | `docs/architecture/db-topology.md` |
| `docs/specs/annotation-spec.md` | 12 | §3, §4–§7, §8, §11; §12 (dropped) | C3 | `docs/contracts/README.md` |
| `docs/specs/audit-ui-spec.md` | 2 | §9.3 | C3 | `docs/contracts/ui-audit.md` |
| `docs/specs/review-ui-spec.md` | 10 | §5, §8 | C3 | `docs/contracts/ui-review.md` |
| `docs/specs/backup-spec.md` | 9 | §1, §2, §3–§6 | C4 | `docs/contracts/backup.md` |
| `docs/specs/label-ui-spec.md` | 10 | §1, §3–§6, §9 | C4 | `docs/contracts/ui-label.md` |
| `docs/specs/manual-page-ui-spec.md` | 4 | §1, §3, §7 | C2 | `docs/contracts/ui-manual.md` |
| `docs/specs/README.md` | 2 | whole file: governance, index, scope | C4 | `docs/README.md` |

`docs/designs/README.md` has no frozen citer; its inventory and baseline move in C2, its governance in C4, and the file is deleted in C4 with no stub. A directory whose markdown files are all tombstones is a forwarding shelf and needs no README (ADR-0011). Its four living citers — `README.md`, `docs/conventions.md` (two lines), `docs/structure.md` — are edited in C4, the commit that deletes it.

### Frozen citations the drops degrade

Four dropped sections are cited by frozen records. The records are not rewritten (M5); the citation degrades and W08 records it.

| Dropped | Frozen citer | Disposition |
| --- | --- | --- |
| architecture §7 (milestones) | `docs/plans/m3-plan.md` (three lines) | exception: milestone history is in `git log` and `experiments/*/results`; the label ruling the cites are about is in the plan itself |
| annotation §12 (revision record) | `experiments/m1/w4_annotation/import_gt.py`; living `docs/notes/pitfalls.md` | exception: revision records drop by policy (R9); the living citer is re-pointed in C3 |
| annotation §8.1 (closed M3-B pool) | `docs/plans/m3b-plan.md` | exception: the M3-B facts are in the plan and in `experiments/m3b/results/` |
| architecture §3.2.1 (M0 backfill) | `docs/plans/m1-plan.md` | pointer line in `architecture/system.md` to `docs/plans/m0-plan.md` §5.3 |

## Disposals

- Revision records drop at migration: annotation §12 (4,615), review §9 (4,643), audit §10 (5,381), label §10 (4,781), manual §9 (2,732) — 22,152 characters. Each page keeps its version line; R9 forbids history in living documents, the logs are in `git log`, and the record rows are changelogs, not contracts. `docs/conventions.md` §8 item 7's revision-log rule (1,700) retires, and `docs/specs/README.md`'s "every spec carries a revision record" retires with it; the retirement funds the conventions merge.
- Architecture §2 (855) drops: the decision ledger is a traceability index. D1–D4 duplicate the charter's "Hard constraints"; Q1–Q2, Q4–Q6 and U1–U3 point at surviving sections; **Q3 points at §7, which drops, so Q3 has no successor and is the one ruling the drop loses** — W08 records where the milestone re-sequencing now lives (`docs/status.md` and the plan set). The charter's sentence pointing at the ledger is removed.
- Architecture §1 (633) duplicates the charter's "What this is" and "In scope"; §3.2.1 (2,260) is a decision record, replaced by the pointer line; §7 (3,860) is milestone history — `experiments/*/results` holds the outcomes, `docs/status.md` the present. All three drop.
- Annotation §9 splits three ways: red lines (1,008) to `contracts/annotation-definition.md`; the mislabel statement including "identity layer not blind-reviewed" and the break-even demand (≈450) to `contracts/annotation-acceptance.md`, because it binds the acceptance report; the GT bias directions (≈488) drop. The explanation and the incident are already in `docs/notes/gt-error-audit.md` §2–§3 and §5, which the knowledge move carries; a contract page restating them would be the second home R1 forbids.
- Annotation §11 splits two ways: operating rules (1,563) to `operations/annotation.md`; the dated "mislabels observed this round" table (772) drops — `docs/notes/gt-error-audit.md` §5 records the same incident with its reading, and a dated table in a living operations page is the history R9 forbids.
- Annotation §1 keeps the GT definition and drops the "why the M0 batch cannot be reused" history; §8.1 drops. `docs/specs/README.md` governance (551) duplicates §8.1 and drops; its index (857) becomes the contract index.
- `docs/designs/README.md`: governance duplicates `docs/conventions.md` §8.1 and drops except the scope and naming lines; the inventory splits by role; the baseline table (936) moves to `architecture/system.md`; the design principles (650) duplicate the charter and notes; the CR traceability table (1,445) and reader's guide (916) are indexes that die with the file; the revision history (261) drops. The file is deleted in C4.
- Manual §8 (1,783) drops: the "new page checklist" is a method, not a contract; the page's acceptance line and `operations/ui-checks.md` cover the criteria. A knowledge guide would open an optional role for 1.8k of prose; it is a separate unit if the maintainer wants it.
- Per-work §5 (678) and §6 (539) duplicate ADR-0010's Reasoning/Consequences and its four "When to reopen" triggers; both drop, and the ADR is not rewritten.
- `contracts/schema.md` copies `src/oshi/store/schema.sql`. The copy stays with an authoritative-file pointer, and the R1 duplication is filed for W08; a generated block needs a gate stage oshi does not have.

## Pointer work

- Living docs: `README.md`, `AGENTS.md`, `docs/README.md`, `docs/charter.md`, `docs/conventions.md`, `docs/development-workflows.md`, `docs/language-policy.md`, `docs/stack.md`, `docs/structure.md`, `docs/testing.md`, `docs/operations/*`, `docs/notes/*`, `docs/reviews/README.md`, `docs/adapters.md`, and the open backlog items B-2, B-3, B-4, B-12, B-22.
- Placement prose, not path substitution — each rewrite changes what the tree means, and lands with the commit that forces it: `docs/README.md` "What goes here" lists designs and specs as live homes (C1, then C4); `docs/structure.md`'s `docs/` row, its "design-doc entry → `docs/designs/README.md`" line, and its `per-work-db.md` / `backup-spec.md` pointers (C2–C4); `docs/development-workflows.md`'s tier row that defines `docs/specs/` as long-lived contracts (C1); `docs/conventions.md`'s D1–D4/Q1–Q6/U1–U3 landing-points line, whose architecture-v2 "Decision ledger" target dies in C2; `docs/conventions.md`'s two `docs/designs/README.md` citations, which must go in C4 with the deletion.
- Code and configuration: `.gitignore` comments, `src/oshi/README.md`, `src/oshi/config.py`, `src/oshi/store/db.py`, `src/oshi/store/registry.py`, `src/oshi/store/schema.sql`, `src/oshi/review/__init__.py`, `src/oshi/review/apply.py`, `web/README.md`.
- Untouched: `experiments/`, `docs/plans/`, `docs/superpowers/`, `docs/compound-engineering/`, `tasks/`, `.scratch/`, `archived/`, `docs/decisions/ADR-*`, and the closed backlog items. Each keeps its citation and resolves through a tombstone or `docs/README.md`.
- Each new page carries a `Source` header naming its old path and sections; those are provenance lines, not stale pointers, and `git grep` survivors are explained by them.
- Proof: after C4, `git grep -n 'docs/designs/\|docs/specs/'` survivors are the two adapter rows, the frozen citers, and the provenance headers. A tombstone names no old path, so a forwarding stub never matches the search for its own source.
- Adapters: two `legacy path` rows in the Registry, one per old directory, modeled on the `docs/adrs/` row: what reads it, the whitelist (the current files, no addition from 2026-11-19, and the forwarding tombstones only from C4), and the disposition (`delete when the last frozen citation retires`). Per-file reasons stay in this map; the registry records the disposition, not one row per tombstone.

## Commit sequence

C1 contracts. Twenty files: the 19 contract pages and their index with 19 rows; the two adapter rows; the `docs/README.md` contracts row; the conventions and placement rewrites C1 forces; the `operations/commands.md` link. The diff touches `src/oshi/review/`, `src/oshi/store/`, `src/oshi/config.py`, `web/README.md`, and `.gitignore`, so the text-only shortcut does not apply; run the full oshi gate.

C2 architecture. Seven files: the 6 architecture pages and their index with 6 rows; the `docs/README.md` architecture row; the charter and conventions pointer edits; tombstones for `architecture-v2.md` and `manual-page-ui-spec.md`, both fully consumed by this commit. The diff touches `src/oshi/store/*`, `src/oshi/README.md`, and `src/oshi/review/*`; run the full gate.

C3 operations. Four pages, two of them merges into existing operations pages; the operations README rows; tombstones for `annotation-spec.md`, `audit-ui-spec.md`, `review-ui-spec.md`, `data-model.md`, and `per-work-db.md`, all consumed by this commit; the remaining dropped sections of those sources are deleted here. The diff is docs-only; the text-only shortcut applies.

C4 conventions. The `docs/conventions.md` merge and the scope/role-path/landing-point updates; tombstones for `backup-spec.md`, `label-ui-spec.md`, and `specs/README.md`; `designs/README.md` deleted (no stub) and its four living citers edited here. The diff is docs-only; the text-only shortcut applies.

All four commits keep oshi's gate: C1–C2 the full `uv run pytest -q -n auto`, Ruff, `ty check src/oshi`, and `cd web && bun run validate`; C3–C4 the text-only path, with the same commands if a pointer fix touches code.

## Applied results

Four commits, gate green at each: C1 `6d6033a` (26 files, +1,730/−25), C2 `b7efaec` (23 files, +429/−571), C3 `5bfb3de` (56 files, +414/−1,710), C4 `5f9df75` (27 files, +64/−519). Measured volumes in the tables above are post-C4, non-whitespace characters with table delimiter rows excluded.

Five places the applied map differs from the accepted one:

- `data-model §6` went to `contracts/schema.md` in full, not to `operations/backups.md`. It is schema's own retention and archive rules, and a second home for them would fail R1; `operations/backups.md` points at the page instead.
- `per-work §3`'s snapshot bullet stays in `contracts/backup.md`; `operations/db.md` keeps the lifecycle, retention, archive and prune procedure without it. The bullet states what a snapshot contains, which is a promise, not a step.
- `docs/conventions.md` item 7 is replaced rather than retired: a living page holds no history and a frozen record keeps the table it was written with. The two rules the retired specs carried (git holes named in `.gitignore`; a page family changes in one order) become items 8 and 9.
- `web/README.md`'s "change the spec first, with a version bump and a newest-first revision row" line was rewritten: the retired rule made the revision row false, and the family order replaced it.
- Every tombstone links to the one page that owns the bulk of its cited sections (`contracts/schema.md`, `architecture/db-topology.md`, `contracts/ui-audit.md`, `contracts/ui-review.md`, `contracts/backup.md`, `contracts/ui-label.md`, `contracts/README.md` where three homes split it). `docs/specs/README.md` and its index keep `docs/README.md`, the docs-tree index.

C3 also normalised 14 files' docstrings and comments that cited bare `architecture §N` / `data-model §N` into page-name citations; `git grep -c` for the bare forms returns nothing.

## Open items

- W06 names `docs/designs/data-model.md` and `docs/specs/audit-ui-spec.md`; measured after C4 it must name four soft pages — `contracts/schema.md` (12,261), `contracts/ui-audit.md` (12,104), `contracts/ui-label.md` (12,188), `architecture/components-decision.md` (10,883). `contracts/data-rules-ingest.md` landed at 9,988 and `docs/conventions.md` at 10,959, both inside the line; `contracts/ui-audit-navigation.md` sits at 9,770. W03 owns the hard line, W06 the soft ones.
- `docs/conventions.md` left the merge at 10,959: the revision-log retirement (1,700) paid for the two added rules and the scope rewrite, so the page is no longer soft. The map expected ~12,800; the measured page is the record.
- `operations/annotation.md` and `operations/backups.md` are merges into existing pages, not new homes; the source sections replace or absorb their current short versions.
- `docs/charter.md` keeps its D1–D4 table; only the "decision ledger" sentence and the "design contract is architecture-v2.md" pointer change. `docs/decisions/ADR-0010-per-work-db.md` keeps its old-path citations; the tombstones resolve them.
- `contracts/ui-audit.md` (12,104), `contracts/ui-label.md` (12,188) and `contracts/schema.md` (12,261) are the soft pages the role rule creates; W06 re-measures them once the pages stop moving.
- `docs/operations/commands.md` and `contracts/cli.md` list the same commands for different readers: the curated daily loop versus the surface. C1 makes the daily page link to the contract instead of restating the surface, and W08 files the R1 check.
- `docs/adapters.md` "Freeze" is not admitted by the adapter registry's clause (track roots, legacy paths, whitelist, disposition). W03 does not add rows there; W07 gives the section a home.
- The manual §8 knowledge guide is a separate unit. The `docs/notes/` to `docs/knowledge/` migration is not part of W03.
