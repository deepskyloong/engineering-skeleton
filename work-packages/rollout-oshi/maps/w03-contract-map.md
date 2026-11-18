# W03 contract and architecture map

- Date: 2026-11-18
- Source: oshi `28c8bc4`, worktree `E:\Projects\oshi\.worktrees\skeleton-migration`
- Status: review pending; architecture rows reissued against ADR-0022
- Role basis: ADR-0022 (2026-11-18) adds the optional Architecture role at `docs/architecture/<topic>.md`, with its directory README as the index; interface promises stay in `docs/contracts/` and a choice's reason in `docs/decisions/`.
- Measure: non-whitespace characters, table delimiter rows excluded (`docs/norm/rules.md` "Measuring"). A target page's volume is its source sections plus a 300-character header allowance. Revision records are excluded (see "Disposals").

The map applies the contracts and architecture roles to the eleven markdown files under `docs/designs/` and `docs/specs/`. Both roles are first applications: no repository under the standard has a `docs/contracts/` or `docs/architecture/`, so the targets are the sample, not proof. Each page names one consumer surface — the effort that relies on the fact, or the change that must respect the boundary. A page above 10,000 carries a soft warning and stays inside the 16,000 hard line; soft pages are listed for W06.

## Sources

| Source | Volume | Target pages |
| --- | --- | --- |
| `docs/designs/architecture-v2.md` | 33,784 | architecture ×4, contracts/cli |
| `docs/designs/data-model.md` | 45,282 | data-model, schema, data-rules ×2, config |
| `docs/designs/per-work-db.md` | 9,286 | db-topology |
| `docs/designs/README.md` | 6,211 | both READMEs, architecture/system (baseline) |
| `docs/specs/annotation-spec.md` | 32,284 | annotation ×3 |
| `docs/specs/audit-ui-spec.md` | 36,017 | ui-audit ×3 |
| `docs/specs/backup-spec.md` | 14,492 | backup, restore |
| `docs/specs/label-ui-spec.md` | 16,534 | ui-label |
| `docs/specs/manual-page-ui-spec.md` | 20,612 | ui-manual-pages, ui-page-navigation |
| `docs/specs/review-ui-spec.md` | 25,562 | ui-review ×2 |
| `docs/specs/README.md` | 1,609 | contracts/README |

## Architecture pages

| Page | Source sections | Volume | Consumer | Budget |
| --- | --- | --- | --- | --- |
| `architecture/README.md` | designs README architecture inventory; directory scope and invariants | ≤1,000 (4 rows) | a reader placing an architecture page | hard |
| `architecture/system.md` | architecture §2, §3, §5; designs README baseline | 9,298 | an implementer changing a component | hard |
| `architecture/failure-modes.md` | architecture §6 | 2,416 | an operator or reviewer | hard |
| `architecture/components-pipeline.md` | architecture §4.1–§4.7 | 5,264 | scan-pipeline implementers | hard |
| `architecture/components-decision.md` | architecture §4.8–§4.15 | 10,758 | decision-chain implementers | soft |

## Contract pages

| Page | Source sections | Volume | Consumer | Budget |
| --- | --- | --- | --- | --- |
| `contracts/README.md` | specs index; designs README contract inventory; directory scope | 4,300 | a reader placing a contract page | hard |
| `contracts/cli.md` | architecture §8 | 2,092 | CLI users and operations | hard |
| `contracts/data-model.md` | data-model §1–§2 | 2,005 | store and registry implementers | hard |
| `contracts/schema.md` | data-model §3, §6 migration | 12,075 | store, migration, backup | soft |
| `contracts/data-rules-ingest.md` | data-model §4.1–§4.2 | 10,028 | scan and ingest implementers | soft |
| `contracts/data-rules-decisions.md` | data-model §4.3–§4.7 | 9,170 | fuser, review and output implementers | hard |
| `contracts/config.md` | data-model §5 | 8,279 | bootstrap, scan, operations | hard |
| `contracts/db-topology.md` | per-work-db, all sections | 9,586 | store and backup | hard |
| `contracts/backup.md` | backup §1–§4 | 10,077 | the nightly backup task and operations | soft |
| `contracts/restore.md` | backup §5–§7 | 3,646 | operations during a restore | hard |
| `contracts/annotation-definition.md` | annotation §1–§3, §9 | 9,243 | annotators and QC | hard |
| `contracts/annotation-identity.md` | annotation §4–§7 | 8,700 | annotators | hard |
| `contracts/annotation-acceptance.md` | annotation §8, §10, §11 | 9,461 | the acceptance reviewer | hard |
| `contracts/ui-manual-pages.md` | manual page §1–§5, §7 | 7,685 | manual-page authors | hard |
| `contracts/ui-page-navigation.md` | manual page §6, §8 | 4,970 | a new UI page author | hard |
| `contracts/ui-label.md` | label page, §1–§9 | 12,040 | label pages and their writers | soft |
| `contracts/ui-review.md` | review page §1–§4, §6–§8 | 12,081 | the review page | soft |
| `contracts/ui-review-data.md` | review page §5 | 7,330 | the review page and `oshi review --apply` | hard |
| `contracts/ui-audit.md` | audit page §1–§5, §8 | 11,880 | the audit page | soft |
| `contracts/ui-audit-navigation.md` | audit page §6 | 9,798 | the audit page | hard |
| `contracts/ui-audit-data.md` | audit page §7, §9 | 8,081 | the audit page and `oshi audit apply` | hard |

Soft pages: `architecture/components-decision`, `contracts/schema`, `contracts/data-rules-ingest`, `contracts/backup`, `contracts/ui-label`, `contracts/ui-review`, `contracts/ui-audit`. All stay under 16,000; W06 re-measures and splits by topic if the shape does not hold.

## Tombstones

A tombstone is the old path, at most three lines, one link, title ending `— moved` (ADR-0011). A source that splits forwards to its role's directory README: the one-link rule leaves the index as the only target that reaches every successor.

| Old path | Frozen citers | Forward to |
| --- | --- | --- |
| `docs/designs/architecture-v2.md` | 16 | `docs/architecture/README.md` |
| `docs/designs/data-model.md` | 20 | `docs/contracts/README.md` |
| `docs/designs/per-work-db.md` | 3 | `docs/contracts/db-topology.md` |
| `docs/specs/annotation-spec.md` | 12 | `docs/contracts/README.md` |
| `docs/specs/audit-ui-spec.md` | 2 | `docs/contracts/README.md` |
| `docs/specs/backup-spec.md` | 9 | `docs/contracts/README.md` |
| `docs/specs/label-ui-spec.md` | 10 | `docs/contracts/ui-label.md` |
| `docs/specs/manual-page-ui-spec.md` | 4 | `docs/contracts/README.md` |
| `docs/specs/review-ui-spec.md` | 10 | `docs/contracts/README.md` |
| `docs/specs/README.md` | 2 | `docs/contracts/README.md` |

`docs/designs/README.md` has no frozen citer; it is deleted in C3 after both inventories and the baseline are absorbed, and leaves no stub. A directory whose markdown files are all tombstones is a forwarding shelf and needs no README (ADR-0011).

## Pointer work

- Living docs: `README.md`, `AGENTS.md`, `docs/README.md`, `docs/charter.md`, `docs/conventions.md`, `docs/development-workflows.md`, `docs/language-policy.md`, `docs/stack.md`, `docs/structure.md`, `docs/testing.md`, `docs/operations/*`, `docs/notes/*`, `docs/reviews/README.md`, `docs/adapters.md`, and the open backlog items B-2, B-3, B-4, B-12, B-22.
- Code and configuration: `.gitignore` comments, `src/oshi/README.md`, `src/oshi/config.py`, `src/oshi/store/db.py`, `src/oshi/store/registry.py`, `src/oshi/store/schema.sql`, `src/oshi/review/__init__.py`, `src/oshi/review/apply.py`, `web/README.md`.
- Untouched: `experiments/`, `docs/plans/`, `docs/superpowers/`, `docs/compound-engineering/`, `tasks/`, `.scratch/`, `archived/`, `docs/decisions/ADR-*`, and the closed backlog items. Each keeps its citation and resolves through a tombstone.
- Each new page carries a `Source` header naming its old path and sections; those are provenance lines, not stale pointers, and `git grep` survivors are explained by them.
- Proof: `git grep -n 'docs/designs/\|docs/specs/'` survivors are the two adapter rows, the frozen citers, and the provenance headers; a tombstone names no old path, so a forwarding stub never matches the search for its own source.
- Freeze: `docs/designs/` and `docs/specs/` accept no new file from 2026-11-18; the row lands in `docs/adapters.md` "Freeze".

## Commit sequence

C1 — specs role (contracts). Thirteen pages from the six spec files, `contracts/README.md` with thirteen rows, seven tombstones, the `docs/specs/` adapter row, and the living spec pointers. The diff touches `src/review/`, `web/README.md`, and `.gitignore`, so the text-only shortcut does not apply.

C2 — design contracts. Seven pages from `data-model.md`, `per-work-db.md`, and `architecture-v2.md` §8 (CLI); seven rows appended to `contracts/README.md`; two tombstones (`data-model.md`, `per-work-db.md`); the `docs/designs/` adapter row; the living pointers for the moved pages. The architecture source stays; its remaining sections follow in C3. The diff touches `src/store/`, `src/config.py`, the root `README.md`, and `.gitignore`.

C3 — architecture. Four pages from `architecture-v2.md` §2–§6 plus the designs README baseline; `architecture/README.md` with four rows; one tombstone (`architecture-v2.md`); the designs README's architecture inventory, scope, and baseline absorbed, then the file deleted; the architecture pointers. The diff touches the living citers among the 27, including `src/oshi/README.md`, `src/oshi/store/*`, and `src/oshi/review/*`.

All three commits run oshi's full gate: `uv run pytest -q -n auto`, `uv run ruff check src tests scripts experiments`, `uv run ruff format --check src tests scripts experiments`, `uv run ty check src/oshi`, and `cd web && bun run validate`.

## Disposals

- Revision records are dropped at migration; each page keeps its version line. R9 forbids history in living documents, the logs are in `git log`, and keeping them forces label, review, audit and manual into further splits. `docs/conventions.md` records the retirement of its revision-log convention. If the maintainer keeps them, the map gains three to four pages and the hard line forces the log itself to be split.
- Architecture §1 (background) duplicates the charter; §7 (milestones) is history (`experiments/*/results` holds the outcomes, `docs/status.md` the present). Both are dropped.
- Architecture §2 (the Q/U rulings) moves to `architecture/system.md`; the charter carries D1–D4, so no ruling loses its record and the landing points are repointed.
- `docs/designs/README.md`: the governance section duplicates `docs/conventions.md`; the directory-specific scope and invariants go into the two READMEs, the inventory splits by role, the overturnable baseline table moves to `architecture/system.md`, the design principles duplicate the charter and notes, and the CR traceability table and reader's guide are dropped — the review reports are runtime and the markers stay in the pages.
- `docs/specs/README.md`: governance merges into `contracts/README.md`; the index rows are replaced by the contract index.
- `contracts/schema.md` copies `src/oshi/store/schema.sql`. The copy stays with an authoritative-file pointer, and the R1 duplication is filed for W08; a generated block needs a gate stage oshi does not have.

## Open items

- W06's text names `docs/designs/data-model.md` and `docs/specs/audit-ui-spec.md`, which C1 and C2 delete. It should name the contract pages instead, and `architecture/components-decision.md` for the architecture soft page; W03 owns the hard line, W06 the soft ones.
