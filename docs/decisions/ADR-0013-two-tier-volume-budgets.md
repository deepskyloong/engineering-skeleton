# ADR-0013 — Volume budgets carry a soft and a hard line

Status: Accepted (2026-11-17)

## Context

Every volume budget was one number with one consequence: above it, the gate fails. That single line answered two different questions with one value — "long enough that the reader should reconsider the shape" and "too long to be one document" — so a file ten percent over was treated like a file three times over, and the only way to say "this page is dense but legitimate" was to edit the spec. The numbers themselves were never derived: the backlog index's 8,000 was set by hand on 2026-11-17 to hold twelve rows, and the rest predate any measurement.

The skill audit in `~/.agents/skills/i-skill-audit` handles the same problem with two tiers: a soft line where judgment starts, a hard line where a finding is a must. Its hard line is either an external cap (a description at 1,024 characters) or double the soft line (a README at 45/85, a changelog at 120/240). Binary checks — syntax, naming, dead references — stay single-tier there, because they leave no judgment space.

## Decision

Volume budgets are pairs. Soft is where judgment starts: a file may stay above it and the gate warns. Hard is where the file is too long for its role: the gate fails. For prose, soft is a quarter above the old single line and hard is twice it; the old line is where files were shaped to stop, so a judgment line sitting on it would flag the normal top of the distribution rather than an outlier. An index derives its soft line from its row cap: 40 rows at the measured ~117 characters per row plus a preamble is about 5,100, so 6,000, and the 60-row backlog index keeps 8,000; hard is double the derived soft. Limits with no judgment space — an index's rows, a tombstone's 400 — stay one number. `scripts/check.py` reports soft breaches in a `WARN` block and exits 0; hard breaches fail as before.

## Options considered

- **One number, raised.** Rejected: it moves the cliff without creating a judgment zone, and every future "long but fine" case needs another spec edit.
- **One number kept, with a soft line below it.** Rejected: it makes today's files warn more often without permitting anything the current gate rejects — an answer to "too noisy", not to "too strict".
- **Soft at the old line.** The first cut, rejected on measurement: the old line is where the corpus was shaped to stop, so the top files sit just under it (`docs/spec/0002-roles.md` at 98.8% of its line, `0004` at 89%), and a warning there flags the normal top of the distribution. An index shows the defect numerically: a 2,000-character cap and a 40-row cap cannot both hold (40 × ~117 ≈ 4,700).
- **Hard derived from this repository's corpus.** Rejected: the corpus was written under the old caps, so its percentiles are censored. The median file is 1,865 characters and the largest spec page 7,906, which would put the hard line below today's allowances.
- **Keep one tier and drop the budget.** Rejected: the budget is the only mechanical brake on page growth, and a review criterion does not survive a busy week.

## Consequences

- The lines are rules, not measurements: soft is a quarter above a number that was itself a judgment, hard twice it. The skill audit's hard lines sit above a measured p95; this repository has no population of target repositories to measure, and says so instead of pretending otherwise.
- A soft breach is a review line. `bun run gate` stays green, so a commit can carry one with the body saying why the shape holds.
- Every class moves at once: prose hard is twice the old line, prose soft a quarter above it, and a 40-row index moves from 2,000/4,000 to 6,000/12,000. `AGENTS.md` becomes 20,000/32,000, the per-turn read cost of an agent layer that grows; if per-turn cost matters more than page growth, that pair is where to change it.
- The template mirror carries both numbers and the checker's `budget_for` returns a tuple, so no class can drift back into one tier.

## Revision (2026-11-17, before the change left the working tree)

The first cut set soft to the old line itself and hard to double it. Measuring the 70 budgeted files showed that the old line sits at the mode, not the tail: `docs/spec/0002-roles.md` is at 98.8% of its 8,000 and `0004` at 89%, because the old caps shaped the files. A judgment line there flags the normal top of the distribution, and on a page that cannot legally split it becomes a permanent warning. Soft moved to 1.25× the old line for prose. The indexes were wrong independently — 2,000 characters and a 40-row cap cannot both hold — so an index now derives its soft line from its row cap. Hard did not move.
