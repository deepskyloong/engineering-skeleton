# ADR-0036 — The closeout summary answers the reader's questions

Status: Accepted (2026-11-21)

## Context

ADR-0030 fixed `summary.md` as `Acceptance:` plus four sections: `Done`, `Not done`, `Compromises`, and `What a future maintainer must know`. The pilot `rollout-oshi` found that the shape is an author's status report: `Done` mixed the target's state, the standard's changes, and the programme's state; `Not done` listed debts without a destination; `Compromises` held a correct placement and two limitations that are not one of the three permitted deviations; the acceptance line compressed four spec criteria into one sentence; and `What a future maintainer must know` collected diff history and a survivor snapshot that the closeout itself invalidates.

The reader of a frozen package asks five questions: did it meet acceptance, what is true now, what remains and where did it go, what changed in the standard, and how does a reader verify it. The old headings do not map to those questions.

## Decision

`summary.md` opens with `Date: YYYY-MM-DD`, `Acceptance: met / not met — <one sentence>`, one `Gate:` line per repository (`<command> — <date>, <result>`), and a `Criteria:` block with one line per `spec.md` acceptance clause (`<clause> — <command, path, or state>`). The template bolds the four labels and separates them with blank lines; `Date:` remains the shape marker because the emphasis is presentation, not the token. The four sections are `Outcome`, `Residuals`, `Compromises`, and `Verification`.

- `Outcome` answers what is true now, in three parts: `Target` (the repository's state), `Standard` (each norm change as `ADR-<nnnn>` plus one clause; `none` when none), and `Programme` (the backlog item's state and what opens next).
- `Residuals` lists what remains. Each entry carries a `kind` (`known limitation`, `new finding`, or `deferred work`) and a `destination` (`B-<nnnn>`, a trigger, or `nothing, accepted because <reason>`). A residual without a destination is a finding.
- `Compromises` holds only the three deviations `flow.md` permits: scope reduction, track switch, and artifact deferral. `None.` is a complete section. A known limitation or a deferred role is not a compromise.
- `Verification` records the closeout pointer snapshot and the commands that reproduce the result. It is for a reader of the frozen record, not a live handoff: the next action is in `Outcome.Programme` and the live programme item, and a successor package starts there.
- The `Evidence` footer names each directory and the question it answers; a script is named with the counts it reproduces, not as a result.

`Date:` is the shape marker. A summary that carries it is checked for the preamble, the four headings, and the evidence footer; an archived summary without it keeps the shape it was written with. `rules.md`'s four-section budget and the 3,750/6,000 volume limit do not change. The acceptance field in `spec.md` may state one or more observable criteria; each criterion is a command, a file, or a state.

## Options considered

1. **Keep the four old headings and add a `## Acceptance` table.** Rejected: `flow.md` requires the summary to open with `Acceptance:`, and a fifth heading would break the four-section shape. The preamble carries the vector without adding a section.
2. **Fold `Not done` and `Compromises` into `Residuals`.** Rejected: a completed track switch is a deviation, not a residual; merging the two loses the record of a permitted deviation and invites known debt into a compromise. Keeping `Compromises` separate costs one section and keeps the three types explicit.
3. **Add `## Decisions` for the ADRs.** Rejected: ADRs are already named in `Outcome` with their clauses; a fifth section duplicates the index and spends budget on links.
4. **Keep the old shape and rewrite only this pilot.** Rejected: the next repository would copy the old shape; a template that produces an author's status report will produce the same defects.
5. **Make the shape a weak checklist only.** Rejected: a section name can drift silently. The `Date:` marker lets `scripts/package-checks.ts` bind new summaries while leaving frozen ones alone.
6. **A `Handoff` section addressed to the next package.** Rejected: an archived package is records, not rules; the successor starts from the live programme item and the guide, and a frozen next action goes stale when priorities change.

## Consequences

- `docs/norm/flow.md` changes the acceptance field, the summary tree line, the compromise note, closeout step 1, and the acceptance checklist.
- `docs/norm/rules.md` keeps the four-section budget; the preamble is not a section. `template/effort/work-packages/spec.md` accepts one or more observable criteria.
- `template/effort/work-packages/summary.md`, `work-packages/README.md`, and `template/effort/work-packages/README.md` carry the new shape.
- `scripts/package-checks.ts` checks the shape of a summary that carries `Date:`; tests cover a valid summary and its missing parts. Frozen summaries without the marker keep their old shape.
- `work-packages/rollout-oshi/summary.md` is the first application; its W09 item names the shape. The package still closes through the archive move.
- ADR-0030's board decision stands; its summary-section names are superseded in part by this ADR.
