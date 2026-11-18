# W03 role map

- Date: 2026-11-18
- Source: oshi `28c8bc4`, worktree `E:\Projects\oshi\.worktrees\skeleton-migration`
- Status: review pending; role-first re-cut from `maps/w03-admission-census.md`
- Role basis: `docs/norm/roles.md` "Five discriminations" and `rules.md` R13 — the section's content decides, not its title or directory; ADR-0022 adds the optional Architecture role.
- Measure: non-whitespace characters, table delimiter rows excluded (`docs/norm/rules.md` "Measuring"). A new page's volume is its source sections plus a 300-character header allowance; an existing page's merge includes its current volume. Revision records are excluded (see "Disposals").

Eleven sources become four role destinations and ten tombstones. Contracts and Architecture are first applications; Operations and Conventions are existing homes. The page count rises from 26 to 35 because each page now holds one role; the directory cut it replaces failed the admission test. The Decisions and Charter destinations dissolve: the charter already carries D1–D4, ADR-0010 already carries the per-work trade-offs and reopen triggers, and the architecture §2 ledger is a traceability index, not a decision. The five spec revision records (22,152 characters) drop, and `docs/conventions.md` §8.7 retires.

## Sources

| Source | Volume | Target pages |
| --- | --- | --- |
| `docs/designs/architecture-v2.md` | 33,784 | architecture ×4, contracts/cli; §1, §2, §7 drop |
| `docs/designs/data-model.md` | 45,282 | contracts ×6, architecture ×1, operations ×1 |
| `docs/designs/per-work-db.md` | 9,286 | architecture ×1, contracts ×1, operations ×1; §5–§6 duplicate ADR-0010 |
| `docs/designs/README.md` | 6,211 | both READMEs, architecture/system (baseline), conventions; the rest drops |
| `docs/specs/annotation-spec.md` | 32,284 | contracts ×3, operations/annotation; §1 history, §8.1, §12 drop |
| `docs/specs/audit-ui-spec.md` | 36,017 | contracts ×2, architecture ×2, operations/ui-checks |
| `docs/specs/backup-spec.md` | 14,492 | contracts/backup, operations/backups, conventions |
| `docs/specs/label-ui-spec.md` | 16,534 | contracts/ui-label, architecture/ui-label, operations/ui-checks, conventions |
| `docs/specs/manual-page-ui-spec.md` | 20,612 | contracts/ui-manual, architecture/ui-manual; §8 drops |
| `docs/specs/review-ui-spec.md` | 25,562 | contracts ×2, architecture/ui-review, operations/ui-checks |
| `docs/specs/README.md` | 1,609 | contracts/README, conventions |

## Contract pages

| Page | Source sections | Volume | Consumer | Budget |
| --- | --- | --- | --- | --- |
| `contracts/README.md` | specs README index; designs README contract inventory; directory scope | ≤4,300 (17 rows) | a reader placing a contract page | hard |
| `contracts/cli.md` | architecture §8 | 2,092 | CLI users and operations | hard |
| `contracts/data-model.md` | data-model §2 | 1,311 | store and registry implementers | hard |
| `contracts/schema.md` | data-model §3 | 11,725 | store, migration, backup | soft |
| `contracts/data-rules-ingest.md` | data-model §4.1–§4.2 | 10,028 | scan and ingest implementers | soft |
| `contracts/data-rules-decisions.md` | data-model §4.3–§4.7 | 9,170 | fuser, review and output implementers | hard |
| `contracts/config.md` | data-model §5 | 8,279 | bootstrap, scan, operations | hard |
| `contracts/backup.md` | backup §1, §2 command surfaces, §7; data-model §1 backup obligations, §6 backup rules; per-work §3 backup granularity | 6,999 | the nightly backup task and operations | hard |
| `contracts/work-key.md` | per-work §1 naming matrix | 1,000 | store and operations | hard |
| `contracts/annotation-definition.md` | annotation §1 holdout definition, §3, §9 red lines | 6,960 | annotators and QC | hard |
| `contracts/annotation-identity.md` | annotation §4–§7 | 8,670 | annotators | hard |
| `contracts/annotation-acceptance.md` | annotation §8 | 3,689 | the acceptance reviewer | hard |
| `contracts/ui-review.md` | review §1, §2, §4, §7 | 7,869 | the review page | hard |
| `contracts/ui-review-data.md` | review §5 | 7,269 | the review page and `oshi review --apply` | hard |
| `contracts/ui-audit.md` | audit §1, §4, §8 | 5,212 | the audit page | hard |
| `contracts/ui-audit-data.md` | audit §7 | 3,221 | the audit page and `oshi audit apply` | hard |
| `contracts/ui-label.md` | label §3, §3a, §4–§6 | 6,897 | label pages and their writers | hard |
| `contracts/ui-manual.md` | manual §1, §4, §5, §7 | 5,513 | manual-page authors | hard |

## Architecture pages

| Page | Source sections | Volume | Consumer | Budget |
| --- | --- | --- | --- | --- |
| `architecture/README.md` | designs README architecture inventory; directory scope | ≤2,500 (11 rows) | a reader placing an architecture page | hard |
| `architecture/system.md` | architecture §3.1–§3.3 (except §3.2.1), §5; designs README baseline | 6,194 | an implementer changing a component or a flow | hard |
| `architecture/components-pipeline.md` | architecture §4.1–§4.7 | 5,264 | scan-pipeline implementers | hard |
| `architecture/components-decision.md` | architecture §4.8–§4.15 | 10,758 | decision-chain implementers | soft |
| `architecture/failure-modes.md` | architecture §6 | 2,399 | an operator or reviewer | hard |
| `architecture/db-topology.md` | per-work §1 boundary, §2 | 2,521 | store and backup | hard |
| `architecture/data-model.md` | data-model §1 | 981 | store and registry implementers | hard |
| `architecture/ui-review.md` | review §3, §6 | 2,404 | the review page author | hard |
| `architecture/ui-audit.md` | audit §2, §3, §5 | 6,899 | the audit page author | hard |
| `architecture/ui-audit-navigation.md` | audit §6 | 9,798 | the audit navigation author | hard |
| `architecture/ui-label.md` | label §1, §2, §7 | 5,401 | label page authors | hard |
| `architecture/ui-manual.md` | manual §2, §3, §6 | 5,311 | manual page authors | hard |

## Operations pages

| Page | Source sections | Volume | Consumer | Budget |
| --- | --- | --- | --- | --- |
| `operations/annotation.md` | existing 1,395; annotation §2, §10, §11 | 8,238 | the annotation server and its GT import | hard |
| `operations/backups.md` | existing 1,325; backup §2 run steps, §3, §5, §6; data-model §6 migration | 7,326 | the nightly task and a restore | hard |
| `operations/db.md` | per-work §3 lifecycle, §4, §7 | 3,915 | per-work DB operations and verification | hard |
| `operations/ui-checks.md` | review §8, audit §9, label §8 | 8,758 | a UI change that must prove the page | hard |

`operations/annotation.md` and `operations/backups.md` are existing pages: the source sections merge into them, they do not append a parallel page. `operations/db.md` and `operations/ui-checks.md` are new; the operations README gains two rows. The UI checks do not copy `operations/commands.md`; that page keeps the shared command shapes, the checks page keeps the page-specific proofs.

## Conventions and decisions

| Target | Merge | Volume | Budget |
| --- | --- | --- | --- |
| `docs/conventions.md` | retire §8.7's revision-log rule; add backup §4 git handling and label §9 change discipline; the two READMEs' governance duplicates §8.1 and drops, except the scope list and naming lines; update §8.1's scope list and §8.5's role paths | 11,288 → ~12,800 | soft |
| `docs/charter.md` | pointer edits only; D1–D4 already sit in "Hard constraints"; the sentence pointing at the architecture decision ledger is removed | 3,678 | hard |
| `docs/decisions/ADR-0010-per-work-db.md` | no edit; per-work §5 (trade-offs) and §6 (reopen triggers) duplicate its Reasoning, Consequences and "When to reopen" | — | — |

No new ADR and no new backlog item: the census's Q/U rows are pointers to the sections that carry them, and the per-work reopen conditions already exist in ADR-0010.

## Tombstones

A tombstone is the old path, at most three lines, one link, title ending `— moved` (ADR-0011). A source that splits forwards to the role's directory README or the page that owns its bulk; the one-link rule leaves that index as the only target that reaches every successor.

| Old path | Frozen citers | Last role | Forward to |
| --- | --- | --- | --- |
| `docs/designs/architecture-v2.md` | 16 | C2 architecture | `docs/architecture/README.md` |
| `docs/designs/data-model.md` | 20 | C3 operations | `docs/contracts/README.md` |
| `docs/designs/per-work-db.md` | 3 | C3 operations | `docs/architecture/db-topology.md` |
| `docs/specs/annotation-spec.md` | 12 | C3 operations | `docs/contracts/README.md` |
| `docs/specs/backup-spec.md` | 9 | C4 conventions | `docs/contracts/README.md` |
| `docs/specs/label-ui-spec.md` | 10 | C4 conventions | `docs/contracts/ui-label.md` |
| `docs/specs/audit-ui-spec.md` | 2 | C3 operations | `docs/architecture/ui-audit.md` |
| `docs/specs/review-ui-spec.md` | 10 | C3 operations | `docs/contracts/README.md` |
| `docs/specs/manual-page-ui-spec.md` | 4 | C2 architecture | `docs/contracts/ui-manual.md` |
| `docs/specs/README.md` | 2 | C4 conventions | `docs/contracts/README.md` |

`docs/designs/README.md` has no frozen citer; its inventory and baseline move in C2, its governance in C4, and the file is deleted in C4 with no stub. A directory whose markdown files are all tombstones is a forwarding shelf and needs no README (ADR-0011).

## Pointer work

- Living docs: `README.md`, `AGENTS.md`, `docs/README.md`, `docs/charter.md`, `docs/conventions.md`, `docs/development-workflows.md`, `docs/language-policy.md`, `docs/stack.md`, `docs/structure.md`, `docs/testing.md`, `docs/operations/*`, `docs/notes/*`, `docs/reviews/README.md`, `docs/adapters.md`, and the open backlog items B-2, B-3, B-4, B-12, B-22.
- Code and configuration: `.gitignore` comments, `src/oshi/README.md`, `src/oshi/config.py`, `src/oshi/store/db.py`, `src/oshi/store/registry.py`, `src/oshi/store/schema.sql`, `src/oshi/review/__init__.py`, `src/oshi/review/apply.py`, `web/README.md`.
- Untouched: `experiments/`, `docs/plans/`, `docs/superpowers/`, `docs/compound-engineering/`, `tasks/`, `.scratch/`, `archived/`, `docs/decisions/ADR-*`, and the closed backlog items. Each keeps its citation and resolves through a tombstone.
- Each new page carries a `Source` header naming its old path and sections; those are provenance lines, not stale pointers, and `git grep` survivors are explained by them.
- Proof: after C4, `git grep -n 'docs/designs/\|docs/specs/'` survivors are the two adapter rows, the frozen citers, and the provenance headers. A tombstone names no old path, so a forwarding stub never matches the search for its own source. In C1–C3 the source files still hold sections for a later role; the tombstone table names which commit retires each one.
- Freeze: `docs/designs/` and `docs/specs/` accept no new file from 2026-11-18; both rows land in `docs/adapters.md` "Freeze" in C1.

## Commit sequence

C1 — contracts. Eighteen pages from the eleven sources, `contracts/README.md` with seventeen rows, both freeze rows, the `docs/README.md` index row, and the contract pointers. No tombstone yet: every source still holds sections for a later role. The diff touches `src/oshi/review/`, `src/oshi/store/`, `src/oshi/config.py`, `web/README.md`, and `.gitignore`, so the text-only shortcut does not apply; run the full oshi gate.

C2 — architecture. Twelve pages from `architecture-v2.md` §3.1–§3.3/§5/§6, `data-model.md` §1, `per-work-db.md` §1–§2, the designs README baseline, and the four UI design systems; `architecture/README.md` with eleven rows; the `docs/README.md` row; the charter pointers; tombstones for `architecture-v2.md` and `manual-page-ui-spec.md`, both fully consumed here. The diff touches `src/oshi/store/*`, `src/oshi/README.md`, and `src/oshi/review/*`; run the full gate.

C3 — operations. Four pages, two of them merges into existing operations pages; the operations README rows; tombstones for `annotation-spec.md`, `audit-ui-spec.md`, `review-ui-spec.md`, `data-model.md`, and `per-work-db.md`, all consumed here; the remaining dropped sections of those sources are deleted in this commit. The diff is docs-only; the text-only shortcut applies.

C4 — conventions. The `docs/conventions.md` merge and the scope/role-path updates; tombstones for `backup-spec.md`, `label-ui-spec.md`, and `specs/README.md`; `designs/README.md` deleted (no stub). The diff is docs-only; the text-only shortcut applies.

All four commits keep oshi's gate: C1–C2 the full `uv run pytest -q -n auto`, Ruff, `ty check src/oshi`, and `cd web && bun run validate`; C3–C4 the text-only path, with the same commands if a pointer fix touches code.

## Disposals

- Revision records drop at migration: annotation §12 (4,615), review §9 (4,643), audit §10 (5,381), label §10 (4,781), manual §9 (2,732) — 22,152 characters. Each page keeps its version line; R9 forbids history in living documents, the logs are in `git log`, and the record rows are changelogs, not contracts. `docs/conventions.md` §8.7's revision-log rule (1,700) retires, and `docs/specs/README.md`'s "every spec carries a revision record" retires with it; the retirement funds the conventions merge.
- Architecture §2 (855) drops: the decision ledger is a traceability index. D1–D4 duplicate the charter's "Hard constraints" row for row; Q1–Q6 and U1–U3 point at the sections that carry them (§4.8, §3.2, §7, §4.14, data-model §3, §4.11, §4.13). The charter's sentence pointing at the ledger is removed; no ruling loses its record.
- Architecture §1 (633) duplicates the charter's "What this is" and "In scope"; §7 (3,860) is milestone history — `experiments/*/results` holds the outcomes, `docs/status.md` the present. Both drop.
- `docs/designs/README.md`: governance duplicates `docs/conventions.md` §8.1 and drops except the scope and naming lines; the inventory splits by role; the baseline table (936) moves to `architecture/system.md`; the design principles (650) duplicate the charter and notes; the CR traceability table (1,445) and reader's guide (916) are indexes that die with the file; the revision history (261) drops. The file is deleted in C4.
- Annotation §1 keeps the GT definition and drops the "why the M0 batch cannot be reused" history; §8.1 (closed M3-B) and §12 drop. `docs/specs/README.md` governance (551) duplicates §8.1 and drops; its index (857) becomes the contract index.
- Manual §8 (1,783) drops: the "new page checklist" is a method, not a contract; the page's acceptance line and `operations/ui-checks.md` cover the criteria. A knowledge guide would open an optional role for 1.8k of prose; it is a separate unit if the maintainer wants it.
- Per-work §5 (678) and §6 (539) duplicate ADR-0010's Reasoning/Consequences and its four "When to reopen" triggers; both drop, and the ADR is not rewritten.
- `contracts/schema.md` copies `src/oshi/store/schema.sql`. The copy stays with an authoritative-file pointer, and the R1 duplication is filed for W08; a generated block needs a gate stage oshi does not have.

## Open items

- W06's text names `docs/designs/data-model.md` and `docs/specs/audit-ui-spec.md`; it must name `docs/contracts/schema.md`, `docs/contracts/data-rules-ingest.md`, `docs/architecture/components-decision.md`, and `docs/conventions.md` instead. W03 owns the hard line, W06 the soft ones.
- `docs/conventions.md` is 11,288 today — already soft. The merge lands near 12,800: the §8.7 retirement pays for the git and change-discipline additions. If it crosses 16,000, drop the duplicate governance rather than split the Conventions role.
- `operations/annotation.md` and `operations/backups.md` are merges into existing pages, not new homes; the source sections replace or absorb their current short versions. `operations/db.md` and `operations/ui-checks.md` are new pages in the existing operations home.
- `docs/charter.md` keeps its D1–D4 table; only the "decision ledger" sentence and the "design contract is architecture-v2.md" pointer change. `docs/decisions/ADR-0010-per-work-db.md` keeps its old-path citations; the tombstones resolve them.
- The pages within 1,000 of the 10,000 soft line — `contracts/data-rules-decisions` (9,170), `architecture/ui-audit-navigation` (9,798) — are hard today; W06 re-measures both.
- The manual §8 knowledge guide is a separate unit. The `docs/notes/` to `docs/knowledge/` migration is not part of W03.
