# 0004 — Rules, budgets, retirement

## Scope and strength

This table covers cross-role rules. The steps in `0003-flow.md` and `0006-migration.md` are review criteria — `weak` — unless a row below marks them `strong`. `strong` means a command fails. `weak` means a person or an agent must check it and say so. `none` means a recommendation, labeled as such. A rule presented as strong but enforced by nothing is the defect this table prevents.

## Rules

| # | Rule | Strength | Enforcement |
| --- | --- | --- | --- |
| R1 | One fact, one home | weak | Review: the same rule stated twice is a finding. Semantic duplication cannot be grepped reliably. |
| R2 | Index autonomy: no totals in indexes or structure pages | strong | `scripts/check.py` scans the index pages and both `structure.md` pages for count-plus-noun patterns |
| R3 | Change surface: spec → template → skill in the same or next commit | weak | Review against the `AGENTS.md` table |
| R4a | Volume budgets are measured in non-whitespace characters and carry a soft and a hard line; soft is a review signal, hard fails the gate | strong | `scripts/check.py` measures every budgeted file, warns above soft and fails above hard |
| R4b | Entry budgets are measured in table rows | strong | `scripts/check.py` counts rows in the index tables that carry a limit |
| R5 | Every `docs/` page maps to a declared role, including optional ones | strong | `scripts/check.py` role-path map; an unmapped path fails |
| R6 | No empty directories | strong | `scripts/check.py` fails on a directory with no files |
| R7 | Files under a generated path carry the generated header | strong | `scripts/check.py` scans `dist/` and any file whose first line self-declares generated |
| R8 | English for repository-maintained markdown | strong | `scripts/check.py` scans markdown for CJK, including full-width punctuation. Commit messages, comments, and test names are review criteria |
| R9 | No history in living documents | weak | Review: `status.md` is rewritten in place; a backlog row changes status instead of disappearing; a closed work package leaves the tasks index |
| R10 | Record method, not measurement | weak | Review: a count, duration, coverage number, resolved version, benchmark, or size that can drift is written as the command that produces it, or dated `for-the-record` |
| R11 | File naming follows the convention | strong | `scripts/check.py` naming check, with explicit patterns for spec pages, ADRs, and backlog names |
| R12 | Markdown tables are not column-aligned: one space around every cell | strong | `scripts/check.py` table check: cell padding and cell count per row. Markdown is formatted by Prettier with a compact-table plugin; code formatters skip `*.md` |

## Naming and citation

- Files: `kebab-case.md`; the skeleton's spec pages `NNNN-slug.md`; ADRs `ADR-<nnnn>-slug.md`; backlog `B-<nnnn>-slug.md`. All-caps names are reserved for roles: `README.md`, `AGENTS.md`, `GLOSSARY.md`, `GLOSSARY-MAP.md`.
- Numbered files use four digits: spec page `0001`, ADR `ADR-0001`, backlog `B-0001`. Spec ordinals are fixed; record IDs start at `0001`. A migrated series keeps its width and is never renumbered.
- Prose is not hard-wrapped; one paragraph is one line. Code fences, tables, and YAML keep their line breaks.
- Cite a file plus a section name (`docs/spec/0002-roles.md`, "Five discriminations"). Do not cite section numbers.
- Section headings are unnumbered by default. Number them only when the number is part of the artifact a consumer cites: a legal clause, a fixed contract section, or a numbered procedure. A number added for visual order becomes wrong when the section moves.

Naming is gated by `scripts/check.py`; the other bullets are review criteria.

## Budget units

Two units, never interchangeable:

- **Volume** — non-whitespace characters, excluding table delimiter rows. Measures reading cost; a delimiter row is formatting, not content, so its width cannot change a budget.
- **Entry** — table rows. Measures scannability.

Lines are not a volume unit: the same budget expressed in lines gives opposite verdicts for documents of similar size. Word count is not a volume unit either: it splits on whitespace, so a Chinese paragraph reports far fewer words than characters. See `docs/decisions/ADR-0003-volume-budget-unit.md` for the measured samples.

## Budgets

| Document | Volume (soft / hard) | Entry |
| --- | --- | --- |
| Root `AGENTS.md` | ≤20,000 / ≤32,000 | routing table ≤12 rows |
| Root `README.md` | ≤10,000 / ≤16,000 | install ≤3 steps |
| Any `docs/` page | ≤10,000 / ≤16,000 | — |
| ADR | ≤7,500 / ≤12,000 | — |
| Backlog item | ≤5,000 / ≤8,000 | — |
| `docs/workflow.md` | ≤10,000 / ≤16,000 | — |
| `docs/committing.md` | ≤5,000 / ≤8,000 | — |
| Member `README.md` | ≤10,000 / ≤16,000 | — |
| Member `AGENTS.md` | ≤10,000 / ≤16,000 | — |
| Module `AGENTS.md` (deferred) | ≤5,000 / ≤8,000 | — |
| Directory `README.md` (index) | ≤6,000 / ≤12,000 | ≤40 rows |
| Backlog index | ≤8,000 / ≤16,000 | ≤60 rows |
| Overlay `README.md` (a guide, not an index) | ≤10,000 / ≤16,000 | — |
| `status.md` | ≤10,000 / ≤16,000 EN; ≤5,000 / ≤8,000 ZH | — |
| `GLOSSARY.md` | ≤7,500 / ≤12,000 | — |
| `GLOSSARY-MAP.md` | ≤2,500 / ≤4,000 | — |
| `tasks/<slug>/summary.md` | ≤3,750 / ≤6,000 | 3 sections |
| Tombstone | ≤400 | exactly 1 link |

The EN/ZH split exists because a Chinese character costs roughly 2.7× the tokens of an English character. A single number would either over-constrain Chinese or under-constrain English. The ZH limit is half the EN limit.

A volume budget has two lines. Soft is where judgment starts: a file may stay above it, and the gate prints a warning instead of failing. Hard is where the file is too long for its role: the gate fails. For prose, soft is a quarter above the old single line and hard is twice it, because that line is where files were shaped to stop; a judgment line placed on it would flag the normal top of the distribution rather than an outlier. An index derives its soft line from its row cap instead: 40 rows at the measured ~117 characters per row plus a preamble is about 5,100, so 6,000, and hard is double that. `docs/decisions/ADR-0013-two-tier-volume-budgets.md` records how the numbers were set and what was rejected. A limit with no judgment space, such as a tombstone's 400, stays one number.

A directory `README.md` is an index and gets 6,000/12,000, from its 40-row cap at the measured ~117 characters per row plus a preamble; the backlog index's 60 rows give 8,000/16,000. An overlay `README.md` is a guide and gets 10,000/16,000. The path decides, not the file name.

A `docs/committing.md` that adopts an external base is short by design: the base carries the rules, the page carries only deviations. The 4,000 limit exists so it cannot grow into a second copy of the base.

## Measuring

PowerShell:

```powershell
$p = 'AGENTS.md'
$t = [IO.File]::ReadAllText((Resolve-Path -LiteralPath $p))
$lines = $t -split "`n" | Where-Object { $_ -notmatch '^\|[\s:|-]+\|$' }
($lines -join "`n" -replace '\s', '').Length        # volume
(Get-Content -LiteralPath $p).Count                # lines, for entry budgets only
```

Bash:

```bash
grep -vE '^\|[[:space:]:-]+\|$' AGENTS.md | tr -d '[:space:]' | wc -m  # volume
wc -l < AGENTS.md                                   # lines, for entry budgets only
```

The gate's `volume()` function is authoritative; the commands above match it by dropping table delimiter rows.

`(Get-Content).Count` counts physical lines, including blank ones; `Measure-Object -Line` does not. Neither is a volume unit.

## Retirement and the four exceptions

Default: an artifact that stops being true is deleted. `git log` keeps it, and deleting is the only way a reader can tell what is current.

Four exceptions:

1. **ADR** — never deleted. Marked `Superseded` and linked to its replacement. A decision's rejected alternatives are the record's value.
2. **Closed backlog item** — the file and its index row stay; the row's status becomes `closed`. Its `Evidence` may be cited by a later item.
3. **Superseded contract** — kept only while a consumer still cites it, then deleted.
4. **Tombstone** — kept only while a frozen record cites the old path. It lives at the old path: ≤3 lines, exactly one link, no explanation, and a title ending with `— moved`; the budget is in the table above.

An artifact that is "kept just in case" is not an exception; it is the start of a second home.

## Generated artifacts

A file under `dist/` — or any file whose first line self-declares — carries:

```text
generated by <command> — do not edit
```

as its first line, followed by a blank line. The gate regenerates it and fails when the content differs. An unmarked generated file is treated as authoritative and will be edited by hand; that is the failure the header prevents. `dist/` is the only generated directory in the skeleton today; a repository that adds another must add it to the gate's list.
