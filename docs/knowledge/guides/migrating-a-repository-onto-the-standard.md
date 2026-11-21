# Migrating a repository onto the standard — what the oshi rollout settled

`work-packages/archive/rollout-oshi/` migrated oshi onto the standard on `feature/b0005-rollout-oshi`; its `summary.md` carries the acceptance, the state and what was left. This page keeps only the rules that would change the next migration.

## 1. One package per target, or the later targets are planned against a spec the first one rewrites

`B-0005` opened with five repositories, and oshi's audit showed the unit was too large. The larger cost was sequencing: each role oshi moved changed the norm the other four would follow, and ADR-0006 through ADR-0016 are that change (`B-0005`, Evidence). A plan for four untouched repositories would have described a layout oshi was about to leave. The package split, and the program now opens one package per repository, in order.

## 2. A phase closes on the tree's residue, not on the roles the phase chose to move

P1's exit condition named charter, contracts, knowledge and toolchain, and all four reached their homes, so the phase declared itself done. `docs/testing.md`, `docs/mutation-testing.md`, `docs/language-policy.md` and `docs/development-workflows.md` still had consumers and no role, and the last of them was over its hard line. The migrate mode's final step — list every live page and ask what admits it — had not run, because the phase's own item list looked complete. W05b ran it and routed the four. Write the exit condition over every live page, and let the step that lists them be the one that fails a phase.

## 3. A count is a lead; a ruling is an input

The audit recorded 29 budget breaches on `57e3d0a`, a commit on another branch, under the single 8,000-character line that ADR-0013 replaced with a soft and a hard line per role. The budget step re-measured the live set under the current unit before splitting any page. The unit itself had drifted once already: a local status cap counted raw characters against 5,000 where the norm counts non-whitespace and gives an English page 10,000, so W06a corrected the page and its test to say which unit they used. Re-measure with the unit the rule states, at the moment something acts on the number.

## 4. A moved path costs one registry row; a file left at the old path is a second home

The first pass measured the forwarding files and declined to delete them on ADR-0011's authority. The measurement was right — 31 files carried 217 citations, 29 of them load-bearing (2026-11-19, for-the-record) — and it became the cost figure for the decision that replaced it. When the maintainer asked again, the answer was a standard change rather than another weighing of the options: ADR-0028 retires the role and makes a title ending `— moved` a gate finding. Oshi's application changed 37 files and deleted 150 lines (`git show --stat e040e5f`); `docs/adapters.md` now carries 14 `moved path` rows (`Select-String -Path docs/adapters.md -Pattern '^\| moved path \|'`), and a first-line scan over the 258 markdown files finds no title ending in the marker. The citation resolves through the row, the successor's `Source` row and `git log --follow`.

## 5. A pointer asserts the present; a copy cannot follow its target

Citations to retired paths survived the moves in open backlog items and in `ADR-0010`, and they split by tense. `ADR-0010`'s sentence saying where the topology rule lives moved to `docs/architecture/db-topology.md`; `B-0003`'s re-map reported what a page said on 2026-10-29 and kept its path, because rewriting it would alter the record. The same test over directory READMEs found copies already wrong: the backlog README had dropped a status the norm carries, the decisions README named a two-digit ADR width its own header contradicted, and the agents README still declared a rule the standard had removed (W07e). A directory README takes a `Norm` row naming the role it applies and keeps only directory-local content. Present tense is a pointer; past tense is a record.

## 6. A rule holds only where a tool executes it

Three episodes decided this the same way. A rule required a version number in each page header, nothing enforced it, and the norm declines changelogs, so the rule was deleted and the four files that claimed it were corrected (W07c, oshi `f90b44e`). The frontend formatter re-padded `web/README.md`'s tables, which put the table rule out of reach until markdown left the formatter's set (`web/.oxfmtrc.json`, oshi `5e4a208`). And a Python target could not check the table rule at all until the Python overlay shipped `tools/check_tables.py` as its sixth gate stage (ADR-0035, `d1ff302`). Name the command that fails without the rule before writing the rule; where an overlay cannot run it, ship the stage or drop the rule.

## 7. A template placeholder that prescribes prose hides the evidence the item carries

The package's items grew as single blocks because the norm said prose and the placeholder asked for one line: `W07e`'s evidence held four commits and two rulings in one paragraph, and `W07a` held seven commits in a semicolon chain. Fixing that by hand across the set would have been a formatting pass with no rule behind it. Instead the shape became the norm: ADR-0033 lets the description take the form its content needs, ADR-0034 gives evidence one entry per artifact, and the items were reflowed in two commits (`01f1773`, `09f0fa1`). When the same shape defect shows up across most of a set, the placeholder is the defect.

## 8. An admission is settled by the repositories it will govern, not by the page that prompted it

W03 cut `docs/designs/` and `docs/specs/` by admission, and part of the cut moved back to contracts, which left the architecture admission narrower than assumed. It stood only after being tested against the four remaining repositories: the package's `maps/w08c-architecture-admission.md` admits an architecture job on five rows and refuses the rest into a neighbouring role, and one repository has no design page because its trigger never fired. Two of the admitted jobs live outside a `docs/architecture/` shelf, in `AGENTS.md` and in `docs/`, which is a property of the samples rather than a hole in the admission (ADR-0022). Test an admission against the corpus before calling it settled.

## 9. A page over its line splits only when its job is one topic

`docs/development-workflows.md` measured 16,611 against a 16,000 hard line (2026-11-19, for-the-record), and its jobs were three: a principle the adapter registry already states, a boundary table `docs/structure.md` already owns, and a worktree procedure that became a knowledge guide. It was retired with pointers, not trimmed. `docs/backlog/B-13-degenerate-crops.md` was one topic carrying a dossier: it split, and the dossier became `docs/knowledge/cases/degenerate-crops.md` (W06, oshi `2f7a8f2`). The budget measures length and the admission measures the job; only the second decides between split and delete.
