# Audit reports and dispositions

One report per repository, written before its migration. The Findings section uses the fixed review format from `docs/norm/flow.md`: severity, role, problem, why, minimal fix.

A report is package evidence for the work package; a finding that changes the specification becomes a backlog item in `docs/backlog/`, and a finding that records a choice becomes an ADR. Do not edit the report after its repository has migrated: write a new one.

| Repository | Report | Status |
| --- | --- | --- |
| oshi | [oshi.md](oshi.md) | migration in progress — charter at `docs/charter.md` (`28c8bc4`); W08a package evidence defined (ADR-0021); contracts, architecture, operations and conventions at their homes (`6d6033a`, `b7efaec`, `5bfb3de`, `5f9df75`); knowledge guides, cases and explainers at `docs/knowledge/` (`e4b96c8`, `55cea2d`, `c4e0a93`, `c30d17f`); threshold method and identity decision routed (`a9300cc`, `adbebc5`); `GLOSSARY.md` covers three domains (`869e762`); `docs/notes/` closed and its 31 forwarding files deleted, every moved path an adapter row (`ac68abe`, `6205394`, `e040e5f`); the explainer form is the standard's (`13ed7ae`); toolchain traps at `docs/toolchain/python.md` (`50d2eb3`); W05b–W05c open the four live pages no work item owned and the three missing roles (`maps/w05b-residual-role-pass.md`); the suite map's role admitted in the standard and applied (`0d3a5a1`, oshi `0e57e99`); W07a–W07c close the conventions page (base pointer, residual index repairs, the document-version rule removed), W07e points the twelve directory READMEs at the norm rows they were restating, W07d settles the retired-path citations, and W07f retires the stub role in the standard (ADR-0028, `0291824`); W06 and W06a closed every budget and status finding (their item evidence), and W07g retires `archived/`, folds the Freeze into the plans row, lets the frontend formatter skip markdown and trims the storefront (`e4d10d0`, `e1ec739`, `9ac5815`, `5e4a208`); every finding has a disposition; next the standard gaps (W08) |

Baseline note (2026-11-18): `oshi.md` measured `57e3d0a`, a commit on `feature/s2-legacy-review` only; its merge base with `main` is `37781fa`. `main` at `1b52545` differs by 35 files / +3,323 / −752. The inventory and pointer counts describe that tree, not `main`; re-measure before a budget or pointer step. The report stays frozen.

## oshi findings

| # | Severity | Status | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| 1 | blocker | filed (`B-0007`) | Frozen evidence stays as legacy paths; the record role is deferred | `docs/adapters.md` "Frozen experiments"; `B-0007` |
| 2 | blocker | resolved | `tasks/README.md` exists; the six-file reshape is withdrawn for suite tracks | `7443137`; ADR-0010 |
| 3 | major | withdrawn | The five homes are four registered suite tracks plus `tasks/` | `docs/adapters.md` "Registry"; ADR-0010 |
| 4 | major | resolved 2026-11-19 (W03) | `docs/designs/` and `docs/specs/` split by surface into `docs/contracts/` and `docs/architecture/`; both old directories are registered legacy paths, the stubs they left were deleted in W07f, and the surviving retired-path citations are classified under ADR-0028 | `6d6033a`, `b7efaec`, `e040e5f`; `maps/w03-role-map.md` |
| 5 | major | resolved 2026-11-20 (W06) | Re-measured under ADR-0013: 118 budgeted live files, zero hard breaches; the audit's 29 used the older single 8,000 line | ADR-0013; W06 evidence |
| 6 | major | resolved 2026-11-20 (W07g) | `archived/` deleted after its pointers retired: one moved-path row for the cited consolidation plan, the charter and decisions index rewritten, three frozen citations resolve through the row and git history | `e1ec739`; `docs/adapters.md` "Archived documents" row removed |
| 7 | major | superseded | `GLOSSARY.md` stays; no `CONTEXT.md` move | ADR-0007 |
| 8 | major | resolved | The registry exists with four suite tracks and the legacy paths | `491b1ed`; `docs/adapters.md` |
| 9 | major | resolved 2026-11-20 (W06) | The three indexes were re-checked under R2 and state no totals; `experiments/README.md` 21,423 → 4,340 and `docs/reviews/README.md` 13,300 → 8,391; the `docs/adrs/` README went with the decisions move | `2f7a8f2`, `be0a4ac`, `3bde9bf`, `04bf196` |
| 10 | major | resolved | `ADR-0009…0012` at `docs/decisions/`; the cited two-digit names resolve through the `docs/adrs/` moved-path row | `610f1e9`, `7a988f4` |
| 11 | minor | resolved 2026-11-20 (W06a) | `tests/test_status_cap.py` measures non-whitespace against the 5,000 local tightening, and `docs/conventions.md` §8.6 states the unit | `3b66d71`; W06a evidence |
| 12 | minor | resolved 2026-11-19 (W05) | `docs/stack.md` split by job: traps to `docs/toolchain/python.md` (three reproduced), runtime choices to ADR-0014, dev choices to ADR-0015, deferred items to B-26/B-27, one non-goal to the charter; the old path is a moved-path row (`e040e5f`) | `50d2eb3`, `d6a11e5`, `720b83b`, `9f519dc`; `maps/w05-toolchain-role.md` |
| 13 | minor | resolved 2026-11-19 (W04c) | `docs/notes/` served four jobs, not the audit's two, and the audit's "guides and notes" split would have relabelled six pages. Routed by job: 3 method pages and 2 incident pages to knowledge (`e4b96c8`, `55cea2d`), the tuning method to a guide (`a9300cc`), the classifier choice to ADR-0013 (`adbebc5`), vocabulary to `GLOSSARY.md` and the dependency method to a guide (`869e762`, `c4e0a93`), and the teaching register to a new fourth knowledge form (`13ed7ae`), applied on three explainers (`c30d17f`); the shelf closed with ten forwarding files, all deleted in W07f (`e040e5f`) | `maps/w04-role-map.md`, `maps/w04b-role-map.md`, `maps/w04c-explainer-role.md`; `docs/adapters.md` "Closed notes shelf" |
| 14 | minor | resolved 2026-11-20 (W06) | `docs/reviews/README.md` describes each child in one line; 13,300 → 8,391 / 12,000 | `be0a4ac` |
| 15 | nit | resolved 2026-11-20 (W07g) | `README.md` keeps one alpha-stage paragraph with the acceptance caveat and links `docs/status.md` and `experiments/`; the timeline and the seven-row table are gone; 10,546 → 9,043 non-whitespace | `9ac5815` |
| 16 | nit | withdrawn | A suite package may stay spec-only | ADR-0010; `tasks/head-kind-experiment/spec.md` |
| 17 | nit | resolved | Working tree clean; the review-index change landed | `fb6701e` |

`open` is tracked by the named work item; `resolved` names the commit; `withdrawn` means the finding no longer holds; `superseded` means a later decision replaces it; `filed` means a backlog item or ADR owns it.

## Follow-up findings

Findings noticed while executing the repairs, numbered after the frozen report. The report itself is not edited.

| # | Found | Status | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| 18 | 2026-11-20 (W07g) | resolved | `docs/adapters.md` "Freeze" stated a placement rule the adapter registry's admission does not name; the dated freeze is folded into the `docs/plans/` row's Disposition and the paragraph is deleted | `e4d10d0` |
| 19 | 2026-11-20 (W07g) | resolved | `web/README.md`'s tables were re-padded by the frontend `oxfmt`, which put R12 out of reach; `**/*.md` joins `web/.oxfmtrc.json` `ignorePatterns` and the three tables are compact | `5e4a208` |
| 20 | 2026-11-20 (W07e) | resolved | `docs/status.md` and `docs/suite-tracks.md` still lacked their `Norm` row; the concurrent norm-declaration pass added them | `e81cdee` |
| 21 | 2026-11-20 (W06) | resolved | `tests/test_s2_prereg.py` asserted the ten result files `3bde9bf` had replaced with directory rows; the test now guards the package row and its index link | `2cabed8` |

## Move records

Dated role moves and rulings: [move-records.md](move-records.md).
