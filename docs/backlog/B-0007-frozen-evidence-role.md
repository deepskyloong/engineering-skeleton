# B-0007 — A home for frozen evidence records

## Problem

A research repository keeps records that are tracked, cited by later work, and never edited: pre-registered protocols, measured results, and verdicts. The role table has no home for them, and the four retirement exceptions in `docs/spec/0004-rules.md` do not cover a frozen protocol or result. A migration must therefore either delete evidence or invent a role in one repository, and both break the rule that a missing role is recorded here rather than forked.

## Evidence

- oshi tracks 86 experiment markdown files and nine milestone protocols under `docs/plans/`. The markdown under `experiments/` is cited 975 times; `docs/plans/` is cited 178 times across 84 files.
- `docs/plans/m1-plan.md` is 47,001 non-whitespace characters. A page budget of 8,000 would force a pre-registered protocol to be split after the fact, which changes the protocol.
- Filing these as `docs/knowledge/cases/` fails twice: a case admits one incident with the evidence that settled it, and the case exit rule deletes it when the evidence stops being citable. A pre-registration is citable for the life of the repository.
- oshi's own audit (2026-11-16) stops on this question before its first move.

## Candidate homes

1. **Record role** — `docs/records/<topic>.md`, admitted when a tracked record is cited by another frozen record, never edited, with no volume budget and an exit only when nothing cites it. This needs an ADR and a spec version bump.
2. **Registered legacy path** — keep `experiments/` and `docs/plans/` where they are, freeze them, and add one row per path to `docs/adapters.md`. No role change; the path stays visibly foreign to the docs tree.
3. **Knowledge case per incident** — one case per experiment, with the protocol and result linked from the case, not copied into it. The case budget forces a summary, and the raw record stays a legacy path.

Option 2 is the cheapest and preserves every citation. Option 1 is the honest model if a second repository also keeps frozen records. Option 3 costs the most prose and loses the protocol text.

## Revisit when

Before oshi's first move of an evidence path, or when a second repository keeps a frozen protocol in git. Choose one candidate with oshi's sample, then record the choice as an ADR if it changes a role.
