# ADR-0013 — Volume budgets carry a soft and a hard line

Status: Accepted (2026-11-17)

## Context

Every volume budget was one number with one consequence: above it, the gate fails. That single line answered two different questions with one value — "long enough that the reader should reconsider the shape" and "too long to be one document" — so a file ten percent over was treated like a file three times over, and the only way to say "this page is dense but legitimate" was to edit the spec. The numbers themselves were never derived: the backlog index's 8,000 was set by hand on 2026-11-17 to hold twelve rows, and the rest predate any measurement.

The skill audit in `~/.agents/skills/i-skill-audit` handles the same problem with two tiers: a soft line where judgment starts, a hard line where a finding is a must. Its hard line is either an external cap (a description at 1,024 characters) or double the soft line (a README at 45/85, a changelog at 120/240). Binary checks — syntax, naming, dead references — stay single-tier there, because they leave no judgment space.

## Decision

Volume budgets are pairs. Soft keeps the existing number: a file above it may stay, and the gate prints a warning. Hard is double soft: the gate fails. Limits with no judgment space — index rows, a tombstone's 400 — stay one number. `scripts/check.py` reports soft breaches in a `WARN` block and exits 0; hard breaches fail as before.

## Options considered

- **One number, raised.** Rejected: it moves the cliff without creating a judgment zone, and every future "long but fine" case needs another spec edit.
- **One number kept, with a soft line below it.** Rejected: it makes today's files warn more often without permitting anything the current gate rejects — an answer to "too noisy", not to "too strict".
- **Hard derived from this repository's corpus.** Rejected: the corpus was written under the old caps, so its percentiles are censored. The median file is 1,865 characters and the largest spec page 7,906, which would put the hard line below today's allowances.
- **Keep one tier and drop the budget.** Rejected: the budget is the only mechanical brake on page growth, and a review criterion does not survive a busy week.

## Consequences

- The hard line is a rule, not a measurement: twice a number that was itself a judgment. That is weaker than the skill audit's position, whose hard lines sit above a measured p95; this repository has no population of target repositories to measure, and says so instead of pretending otherwise.
- A soft breach is a review line. `bun run gate` stays green, so a commit can carry one with the body saying why the shape holds.
- Every class doubles at once, `AGENTS.md` included (32,000 hard). That is the per-turn read cost of an agent layer that grows; if per-turn cost matters more than page growth, the pair is where to change it.
- The template mirror carries both numbers and the checker's `budget_for` returns a tuple, so no class can drift back into one tier.
