# ADR-0033 — An item description takes the form its content needs

Status: Accepted (2026-11-20). Supersedes the description-form clause of ADR-0009 and its restatement in ADR-0029.

## Context

`docs/norm/flow.md` "Work items" said the description is prose and not a bullet list, and ADR-0009 gave the reason: only the done-when criteria are bullets, because each is a separate check. The rule removed the readable form for an enumeration without offering another one: the 26 items in `work-packages/rollout-oshi/` are single blocks, the longest (`W08`) 2,914 characters, and items that list findings, gaps, pages or measurements carry them as semicolon chains inside one sentence (`W07g`'s first sentence holds four findings). The item has no volume budget, and the template's placeholder (`template/effort/work-packages/items/W01.md`) asks for one prose line, so nothing pushed back on length. The maintainer reported the result on 2026-11-20 and asked for the form to follow the content, diagrams included, with no padding.

## Decision

An item's description takes the form its content needs — prose, a bullet list, a table, or a small fenced diagram — and stays short: one screen, carrying what the item is and what it must hold, not the story of the work. The done-when criteria stay bullets because each is a separate check. A description that needs a heading per concern is more than one item.

## Options considered

- Keep prose only and split paragraphs — rejected: an enumeration is still a semicolon chain, and every later item repeats the shape the maintainer reported.
- Make every description a bullet list — rejected: a causal chain becomes a list, which reads worse than the paragraph it replaces.
- Require a table for every enumeration — rejected: it prescribes a form per content type and forces a two-column decision onto a list of findings.
- Give each concern its own heading — rejected: the item becomes a mini-plan and duplicates `plan.md`'s phase breakdown.
- Move the enumeration into `Evidence` — rejected: evidence carries the result; the description carries the scope the item must hold before work starts.

## Consequences

- `docs/norm/flow.md` "Work items" states the form rule; `template/effort/work-packages/items/W01.md` and both `work-packages/README.md` copies drop "prose description".
- ADR-0009 and ADR-0029 are marked superseded in part for that clause; their ledger and file rules stand.
- The 26 items in `work-packages/rollout-oshi/items/` are reflowed into the form each needs; the wording, hashes, numbers and paths stay, and the sweep is a working-state tidy, not a migration.
- No gate stage changes: form and length are review criteria, not a check. `N = 0` — the clause removes a constraint, so no applied item stops complying.
