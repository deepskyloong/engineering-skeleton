# ADR-0028 — A moved path is a registry row, not a file

Status: Accepted (2026-11-19)

## Context

ADR-0011 admitted a Tombstone role: a three-line forwarding stub at the old path, kept while a frozen record cites it. It closed a real gap — a forwarding file had no home, so an audit reported it as `unplaced` — and it rejected the two alternatives a reader would notice today: a registry row leaves the old path 404, and a single ledger page does the same while adding a second index.

Two days of application produced the cost the decision could not see. Oshi, the only repository far enough along to measure, carried 31 forwarding files on 2026-11-19: `docs/notes/` 10, `docs/specs/` 7, `docs/designs/` 3, `docs/adrs/` 3, and eight top-level `docs/*.md` redirects — 30 ending `— moved` and one, `docs/backlog.md`, ending `(moved)`. They absorbed 217 citations: 15 files cited by frozen records alone, 14 cited by a live page as well (a `Source` provenance row, the adapters registry, the operations old-section map, `conventions.md`), and one cited by nothing. Every one of the 217 is a citation of the past — a plan, a review, an experiment, an accepted ADR, a `tasks/` record, or the `Source` row that says where today's page was cut from. None is a pointer a maintainer follows to find a rule that binds today.

Three costs showed up in that instance:

- A directory of three-line files reads as content. Two retired directories existed only to hold stubs, and a reader counting pages counted them; `docs/notes/` even needed a README whose only job was to index the stubs.
- Each stub repeats, per path, a fact the repository already carries twice: the registry row says the directory moved, and the successor's `Source` row names the old path and the sections it took.
- The shape was enforced on new stubs and invisible on old ones: two failed their own admission, one ending `(moved)` instead of `— moved`, so a shape check could not tell a malformed stub from a live page.

## Decision

Retire the Tombstone role. A moved path is recorded once, in `docs/adapters.md`, and nothing is left at the old path.

- **Registry.** A moved path gets a row at the grade that answers a lookup — the directory or the single file that moved — naming the old path, the successor, what cites it, and the condition that retires the row. `docs/adapters.md` already owns where a path may be written and what its disposition is; it now also owns where a moved path's contents live. No new role is admitted.
- **Frozen record.** The citation is written once and never rewritten. A record that cites `docs/specs/backup-spec.md` keeps that string, and the path resolves three ways: the registry row names the successor directory; the successor page's `Source` row names the old path and the sections it took; `git log --follow -- <old-path>` recovers the content itself. None of the three is a file that pretends to be content.
- **Checker.** A file whose title ends `— moved` is a finding. The naming and role-path exemptions disappear, the README-less shelf allowance goes with them, and the new finding names the registry as the replacement.

## Options considered

1. **Keep the role (ADR-0011).** Rejected: it buys one saved hop on a citation of the past, and pays a file per path in exactly the directories a reader scans to learn what exists. Measured: 31 files for 217 citations, two of them malformed and one cited by nothing.
2. **One ledger page, `docs/tombstones.md`, holding every alias (ADR-0011 option 2).** Rejected again, with a second reason: `docs/adapters.md` is already that ledger, with a role, a disposition rule and a retirement condition. A second page would be a second home for the same registry, not a new home for a new fact.
3. **A directory-level stub only: one `README.md` per retired directory, mapping its old paths.** Rejected: the per-path citation still resolves to nothing, and the directory would exist only to hold a table whose job the registry performs one level up. The `docs/notes/` shelf was exactly this shape, and its README was the most expensive part of the instance.
4. **Retire the role; register the path and resolve by provenance or history.** Chosen: resolution moves from a file that says "moved" to the two facts that already exist without it, and no artifact is created that a reader mistakes for content.

The trade is stated plainly: a citation to a moved path stops resolving in one hop. ADR-0011 treated that as disqualifying. The instance shows the cost it was protecting — a click — is cheaper than the artifact it required, and the record loses nothing because the citation was never meant to be navigable today; it was meant to say what the author read.

## Consequences

- `docs/norm/roles.md` loses the Tombstone row and the Tombstone / Adapter discrimination; the Adapter registry row's admission extends to moved paths and its trigger to "a path a frozen record cites has moved".
- `docs/norm/rules.md` loses the Tombstone budget row and retirement exception 4; three exceptions remain. The width-rule sentence that cites tombstones is reworded.
- `docs/norm/flow.md` closeout step 5 becomes "register the moved path"; `docs/workflow.md` M5 keeps "a frozen record keeps its citation" and replaces "leave a tombstone" with the registry step, and the mapping table's "leave a tombstone" notes become "register the path".
- `scripts/docs-model.ts` loses `tombstoneShape`, `TOMBSTONE_SUFFIX` and the 400-character budget; `scripts/doc-checks.ts` loses the `tombstones` check, the naming and role-path exemptions and the README-less shelf allowance, and gains a finding for any title ending `— moved`. The tests that covered the retired shape are deleted; a test covers the new finding.
- `template/effort/docs/adapters.md` gains the moved-path row and the rule that no file is left behind; no template page mentions tombstones, so nothing else changes there.
- `GLOSSARY.md` keeps the word as historical vocabulary, because records written before 2026-11-19 use it.
- Oshi deletes its 31 forwarding files and folds the paths into `docs/adapters.md` as 12 rows (one per moved directory or file); the successors' `Source` rows stay as they are, because they are the provenance the registry points at. A present-tense pointer to a rule's home is repointed to the successor; a dated report keeps its path. This decision also settles W07d: a frozen citation is neither repointed nor turned into a file.
