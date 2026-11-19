# ADR-0027 — Governance is not a role

Status: Accepted (2026-11-19)

## Context

ADR-0023 admitted the page at first use, "with the first work package", and rejected forcing it into `template/core` because it would put a page with no first-use reader into day one. That argument settled where the page enters, not whether it should exist.

After `06aeb6d` the norm owns four of its five subjects: ownership, the ADR requirement, budget evidence and the review protocol in `docs/norm/flow.md`; the change surface in `docs/norm/rules.md` R3; retirement in `docs/norm/rules.md` §Retirement. What remained was provenance and the standard's own distribution model. Zero of the five target repositories (bun-toolkit, python-toolkit, gearset, personal-agent-kit, oshi) ever created the page; oshi has closed seven work packages. The one instance, this repository's own page (2,266 non-whitespace on 2026-11-19), was four norm sections plus two paragraphs a maintainer could act on only here. "Governance" is also a category name that contains rules, conventions and decision records, so it predicts nothing a reader can use.

## Decision

Retire the role. No repository page carries authorization. Each remaining job has a stronger home:

- ownership, the ADR requirement, budget-change evidence, the review protocol → `docs/norm/flow.md`;
- the change surface and retirement → `docs/norm/rules.md`;
- what must hold every turn, including any repository-specific authorization deviation such as a required approval or a review archive kept outside git → a red line or a gate in `AGENTS.md`;
- provenance — no version number, `Norm source:`, `Last read:` — and the distribution model → `docs/norm/foundations.md`.

## Options considered

1. **Keep it always present in `template/core`.** Rejected by ADR-0023 and again here: a page with no first-use reader, and the underlying trigger was the wrong one — seven packages closed without needing it.
2. **Keep the page, change the trigger to "the first deviation from the norm's authorization rules".** Rejected: a deviation already has a stronger home — a red line in `AGENTS.md`, which is loaded every turn — and a page that exists only to declare a difference restates the pointer model without giving a maintainer a place they would read first.
3. **Rename it to `docs/authority.md` and narrow its admission to authorization deviations.** Rejected for the reason in 2, plus rename churn across the role table, the template, the mapping table and the checker for a page most repositories would never create.
4. **Retire the role.** Chosen: every remaining job has a home that binds more strongly, and five repositories produced no instance.

## Consequences

- `docs/norm/roles.md` loses the role row, the `Conventions / Governance` boundary pair, and the Governance half of `Operating modes, Governance / Suite tracks`; the architecture pair becomes `Architecture / Instruction layer`. `conventions.md`'s boundary section cites the norm rather than restating it, so it needs no edit.
- `docs/norm/foundations.md` carries provenance and distribution: no changelog, consumed by copying, a breaking change states its migration step in the same commit, no version number.
- Deleted: `docs/governance.md` and `template/effort/docs/governance.md`. `template/effort/docs/README.md` lists three pages; `template/effort/README.md` drops its row; `docs/workflow.md` "Mapping table" now maps a copied governance page to "no page"; `scripts/docs-model.ts` drops the path; `AGENTS.md` routes provenance and review to the norm.
- A repository with a real authorization deviation records it as a red line or a gate. If two repositories produce deviations that need explaining rather than stating, revisit whether an authorization page is the right home — that is the evidence this decision is missing, not the count of pages it removed.
