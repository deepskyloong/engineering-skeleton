# W03 admission census

- Date: 2026-11-18
- Source: oshi `28c8bc4`, worktree `E:\Projects\oshi\.worktrees\skeleton-migration`
- Test: `docs/norm/roles.md` "Five discriminations" and `rules.md` R13; the section's content decides, not its title or directory.
- Method: one row per section range; a range that spans roles is split. `Target` is a proposal for the map re-cut, not a move.
- Status: census (2026-11-18); its targets are superseded by `w03-role-map.md`, which re-cut them on 2026-11-19

## `docs/designs/architecture-v2.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Background and goals | charter / drop | goals to the charter; background dropped |
| 2 | Decision ledger (D/Q/U) | decisions | D1–D4 to the charter; Q/U to `docs/decisions/` or a decision index; not architecture |
| 3.1 | System context | architecture | `architecture/system.md` |
| 3.2 | Architecture notes | architecture | `architecture/system.md` |
| 3.2.1 | M0 component enablement decisions | decisions / history | dropped; the exit conditions live in `docs/plans/m0-plan.md` |
| 3.3 | Component inventory | architecture | `architecture/system.md` |
| 4.1–4.15 | Component behavior, invariants, failure responses | architecture | `architecture/components-pipeline.md`, `architecture/components-decision.md` |
| 5 | Core flows | architecture | `architecture/system.md` |
| 6 | Failure-mode walkthrough | architecture | `architecture/failure-modes.md` |
| 7 | Milestones | history | dropped; `experiments/*/results` and `docs/status.md` hold the present |
| 8 | CLI surface | contract | `contracts/cli.md` |

## `docs/designs/data-model.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Four-layer data model | architecture + contract | layers and reproducibility to `architecture/data-model.md`; the backup obligations to `contracts/backup.md` |
| 2 | Model registry | contract | `contracts/data-model.md` |
| 3 | SQLite schema | contract | `contracts/schema.md` |
| 4.1–4.2 | Generations, prototype admission and aggregation | contract | `contracts/data-rules-ingest.md` |
| 4.3–4.7 | Clustering, burst, output, correction, path boundaries | contract | `contracts/data-rules-decisions.md` |
| 5 | `config/<work>.toml` | contract | `contracts/config.md` |
| 6 | Migration and backup | operations + contract | migration steps to `operations/backup.md`; backup rules to `contracts/backup.md` |

## `docs/designs/per-work-db.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Boundary and work key | architecture + contract | boundary to `architecture/db-topology.md`; the four-artifact naming matrix to `contracts/work-key.md` |
| 2 | What is per-work vs shared | architecture | `architecture/db-topology.md` |
| 3 | Backup and storage lifecycle | contract + operations | backup granularity to `contracts/backup.md`; retention, archive and prune to `operations/db.md` |
| 4 | Operations | operations | `operations/db.md` |
| 5 | Trade-offs | decisions | ADR-0010 carries the choice; the section is dropped |
| 6 | Reopen triggers | decisions / backlog | ADR-0010 or a backlog item |
| 7 | Verification | operations | `operations/db.md` |

## `docs/designs/README.md`

| Section | Role | Target |
| --- | --- | --- |
| Governance and maintenance | conventions | `docs/conventions.md`; each README keeps only its own scope |
| File inventory | index | `contracts/README.md` and `architecture/README.md` |
| Design principles | drop | duplicates the charter and notes |
| Current default baseline | architecture | `architecture/system.md` |
| Traceability table | drop | the CR markers stay in the pages |
| Reader's guide | drop | the indexes and page headers serve |
| Revision history | drop | git log; the version line remains |

## `docs/specs/annotation-spec.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | GT definition and why the M0 batch cannot be reused | contract + decisions | the holdout definition to `contracts/annotation-definition.md`; the why and history dropped |
| 2 | Environment and workflow | operations | `operations/annotation.md` |
| 3 | Definition of a human-shaped instance | contract | `contracts/annotation-definition.md` |
| 4 | Identity assignment | contract | `contracts/annotation-identity.md` |
| 5 | Layer labels | contract | `contracts/annotation-identity.md` |
| 6 | Burst same-shot | contract | `contracts/annotation-identity.md` |
| 7 | Progress, confirmation and saving | contract | `contracts/annotation-identity.md` |
| 8 | Passing and acceptance definitions | contract + drop | definitions to `contracts/annotation-acceptance.md`; §8.1 (closed M3-B) dropped |
| 9 | Known biases and red lines | contract + knowledge | red lines to `contracts/annotation-definition.md`; biases to a knowledge case |
| 10 | Verification commands | operations | `operations/annotation.md` |
| 11 | GT quality checks and mislabel audit | operations + knowledge | checks to `operations/annotation.md`; the audit to a knowledge case |
| 12 | Revision record | drop | the version line remains |

## `docs/specs/backup-spec.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Data safety tiers | contract | `contracts/backup.md` |
| 2 | Backup channels | contract + operations | command surfaces to `contracts/backup.md`; run steps to `operations/backup.md` |
| 3 | Backup strategy | operations | `operations/backup.md` |
| 4 | git handling | conventions | `docs/conventions.md` |
| 5 | Restore procedure | operations | `operations/restore.md` |
| 6 | Verification commands | operations | `operations/restore.md` |
| 7 | Failure modes | contract | `contracts/backup.md` |

## `docs/specs/review-ui-spec.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Write boundary | contract | `contracts/ui-review.md` |
| 2 | Batch modes | contract | `contracts/ui-review.md` |
| 3 | Page content | architecture | `architecture/ui-review.md` |
| 4 | Keys and actions | contract | `contracts/ui-review.md` |
| 5 | Data contract | contract | `contracts/ui-review-data.md` |
| 6 | Local state | architecture | `architecture/ui-review.md` |
| 7 | Failure modes and red lines | contract | `contracts/ui-review.md` |
| 8 | Verification | operations | `operations/ui-checks.md` |
| 9 | Revision record | drop | the version line remains |

## `docs/specs/audit-ui-spec.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Write boundary | contract | `contracts/ui-audit.md` |
| 2 | Page structure | architecture | `architecture/ui-audit.md` |
| 3 | Visual language | architecture | `architecture/ui-audit.md` |
| 4 | Interaction discipline | contract | `contracts/ui-audit.md` |
| 5 | Full-window lightbox | architecture | `architecture/ui-audit.md` |
| 6 | Navigation strip | architecture | `architecture/ui-audit.md` |
| 7 | Data contract | contract | `contracts/ui-audit-data.md` |
| 8 | Failure modes and red lines | contract | `contracts/ui-audit.md` |
| 9 | Verification | operations | `operations/ui-checks.md` |
| 10 | Revision record | drop | the version line remains |

## `docs/specs/label-ui-spec.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Label page family | architecture | `architecture/ui-label.md` |
| 2 | Page anatomy and visual language | architecture | `architecture/ui-label.md` |
| 3 | Interaction discipline | contract | `contracts/ui-label.md` |
| 3a | The unit of judgement is one box | contract | `contracts/ui-label.md` |
| 4 | Data contract | contract | `contracts/ui-label.md` |
| 5 | Writer | contract | `contracts/ui-label.md` |
| 6 | Failure modes | contract | `contracts/ui-label.md` |
| 7 | Instantiations | architecture | `architecture/ui-label.md` (pointers only) |
| 8 | Verification commands | operations | `operations/ui-checks.md` |
| 9 | Change discipline | conventions | `docs/conventions.md` |
| 10 | Revision record | drop | the version line remains |

## `docs/specs/manual-page-ui-spec.md`

| § | Content | Role | Target |
| --- | --- | --- | --- |
| 1 | Write boundary | contract | `contracts/ui-manual.md` |
| 2 | Page anatomy | architecture | `architecture/ui-manual.md` |
| 3 | Visual language | architecture | `architecture/ui-manual.md` |
| 4 | Interaction discipline | contract | `contracts/ui-manual.md` |
| 5 | Local state and export | contract | `contracts/ui-manual.md` |
| 6 | Navigation | architecture | `architecture/ui-manual.md` |
| 7 | Acceptance baseline | contract | `contracts/ui-manual.md` |
| 8 | New page checklist | knowledge / conventions | a knowledge guide; the checklist is a method, not a contract |
| 9 | Revision record | drop | the version line remains |

## `docs/specs/README.md`

| Section | Role | Target |
| --- | --- | --- |
| Role and authority scope | conventions | `docs/conventions.md`; the READMEs state their own scope |
| What lives here, naming, versioning, change flow | conventions | `docs/conventions.md` |
| Index | index | `contracts/README.md` |
| "Every spec carries a revision record" | drop / retire | `docs/conventions.md` records the retirement; the version line remains |

## Result

- The eleven sources split across six destinations: contracts, architecture, conventions, operations, decisions, charter; the rest is drop. No source directory maps one-to-one.
- `docs/specs/` is the largest correction: annotation §2/§10/§11 are operations, not contracts; backup §3–§6 are operations/conventions; the UI specs split contracts/architecture/operations/conventions.
- `docs/designs/` is not only contracts/architecture: architecture-v2 §2 is decisions, §3.2.1 and §7 are history; data-model §1 splits architecture/contract; per-work-db splits architecture/contract/operations/decisions.
- The map's C1/C2/C3 by directory cannot stand. The re-cut is role-first: contracts, architecture, operations, conventions, decisions, then drop.
- Revision records are dropped in every source; the version line stays. The `docs/specs/README.md` requirement is retired in `docs/conventions.md`, not carried into `contracts/README.md`.

## Proposed sequence

1. Contracts from the sections that pass the admission: annotation definitions, backup format, UI write/data/keys/failure, CLI, data-model/schema/rules/config, work key.
2. Architecture: system, components, failure modes, db topology, data-model layers, the UI design system.
3. Operations: annotation workflow and verification, backup strategy and restore, per-work operations, UI checks, migration steps.
4. Conventions: README governance, git handling, label and spec change discipline, revision-log retirement.
5. Decisions: architecture-v2 §2 Q/U, per-work-db §5–§6; the charter carries D1–D4.
6. Drop: background, milestones, principles, traceability, reader's guides, revision records, closed §8.1.

The map re-cut fixes page names, volumes, tombstones and commit order from this table; the census does not move files.
