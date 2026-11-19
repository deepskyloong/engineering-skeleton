# Audit reports and dispositions

One report per repository, written before its migration. The Findings section uses the fixed review format from `docs/governance.md`: severity, role, problem, why, minimal fix.

A report is package evidence for the work package; a finding that changes the specification becomes a backlog item in `docs/backlog/`, and a finding that records a choice becomes an ADR. Do not edit the report after its repository has migrated: write a new one.

| Repository | Report | Status |
| --- | --- | --- |
| oshi | [oshi.md](oshi.md) | migration in progress — charter at `docs/charter.md` (`28c8bc4`); W08a package evidence defined (ADR-0021); contracts, architecture, operations and conventions at their homes (`6d6033a`, `b7efaec`, `5bfb3de`, `5f9df75`); knowledge guides, cases and explainers at `docs/knowledge/` (`e4b96c8`, `55cea2d`, `c4e0a93`, `c30d17f`); threshold method and identity decision routed (`a9300cc`, `adbebc5`); `GLOSSARY.md` covers three domains (`869e762`); `docs/notes/` closed with ten tombstones (`ac68abe`, `6205394`); the explainer form is the standard's (`13ed7ae`); next toolchain (W05) |

Baseline note (2026-11-18): `oshi.md` measured `57e3d0a`, a commit on `feature/s2-legacy-review` only; its merge base with `main` is `37781fa`. `main` at `1b52545` differs by 35 files / +3,323 / −752. The inventory and pointer counts describe that tree, not `main`; re-measure before a budget or pointer step. The report stays frozen.

## oshi findings

| # | Severity | Status | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| 1 | blocker | filed (`B-0007`) | Frozen evidence stays as legacy paths; the record role is deferred | `docs/adapters.md` "Frozen experiments"; `B-0007` |
| 2 | blocker | resolved | `tasks/README.md` exists; the six-file reshape is withdrawn for suite tracks | `7443137`; ADR-0010 |
| 3 | major | withdrawn | The five homes are four registered suite tracks plus `tasks/` | `docs/adapters.md` "Registry"; ADR-0010 |
| 4 | major | open (W03) | `docs/designs/` and `docs/specs/` move to `docs/contracts/` by surface | W03 in `todo.md` |
| 5 | major | open (W06) | Re-measure under ADR-0013; the audit's 29 used the old single 8,000 line | ADR-0013; W06 |
| 6 | major | open (W07) | `archived/` is a legacy path; its last pointers retire before deletion, and the charter's v1 mapping pointer is one of them | `docs/adapters.md` "Archived documents"; `docs/charter.md` "In scope" |
| 7 | major | superseded | `GLOSSARY.md` stays; no `CONTEXT.md` move | ADR-0007 |
| 8 | major | resolved | The registry exists with four suite tracks and the legacy paths | `491b1ed`; `docs/adapters.md` |
| 9 | major | open (W07) | Re-check the three indexes under R2; the `docs/adrs/` README went with the decisions move, and the 442/675 hits are dated evidence, not index totals | `experiments/README.md`, `docs/plans/README.md`, `docs/reviews/README.md` |
| 10 | major | resolved | `ADR-0009…0012` at `docs/decisions/`; the cited two-digit names keep tombstones | `610f1e9`, `7a988f4` |
| 11 | minor | open (W07) | `tests/test_status_cap.py` still measures total characters against a non-whitespace budget | `tests/test_status_cap.py` |
| 12 | minor | open (W05) | `docs/stack.md` splits into a toolchain page, an ADR, and backlog rows if the admission holds | W05 |
| 13 | minor | resolved 2026-11-19 (W04c) | `docs/notes/` served four jobs, not the audit's two, and the audit's "guides and notes" split would have relabelled six pages. Routed by job: 3 method pages and 2 incident pages to knowledge (`e4b96c8`, `55cea2d`), the tuning method to a guide (`a9300cc`), the classifier choice to ADR-0013 (`adbebc5`), vocabulary to `GLOSSARY.md` and the dependency method to a guide (`869e762`, `c4e0a93`), and the teaching register to a new fourth knowledge form (`13ed7ae`), applied on three explainers (`c30d17f`); the shelf closes with ten tombstones and three of them forward into `docs/knowledge/explainers/` | `maps/w04-role-map.md`, `maps/w04b-role-map.md`, `maps/w04c-explainer-role.md`; `docs/adapters.md` "Closed notes shelf" |
| 14 | minor | open (W06) | `docs/reviews/README.md` describes every report; trim to one line per child | `docs/reviews/README.md`; W06 |
| 15 | nit | open (W06) | `README.md` keeps the milestone history; keep one paragraph and link it | `README.md`; W06 |
| 16 | nit | withdrawn | A suite package may stay spec-only | ADR-0010; `tasks/head-kind-experiment/spec.md` |
| 17 | nit | resolved | Working tree clean; the review-index change landed | `fb6701e` |

`open` is tracked by the named work item; `resolved` names the commit; `withdrawn` means the finding no longer holds; `superseded` means a later decision replaces it; `filed` means a backlog item or ADR owns it.

## Move records

Dated role moves and rulings: [move-records.md](move-records.md).
