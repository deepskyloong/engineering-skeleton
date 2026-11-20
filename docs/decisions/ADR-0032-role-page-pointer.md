# ADR-0032 — A role page links the norm it relies on; only a general-norm page is a base pointer

Status: Accepted (2026-11-20). Narrows the base-pointer claim in `docs/norm/README.md` "Status" to the scope ADR-0016 set.

## Context

The rollout's fifth standard gap read `docs/norm/README.md` "Status" literally: a target repository's page for a role is a base pointer to the page it names. The template carries a pointer on three pages only — a `Base:` line in `docs/conventions.md` and `docs/committing.md`, a `Norm source` head row in `docs/workflow.md` — and none on `docs/structure.md`, `docs/README.md`, `docs/adapters.md` or `docs/suite-tracks.md`; `status.md` has no template page at all, so a row there cannot be templated. Oshi added `Norm` rows to five pages by hand after its migration (`e81cdee`).

The claim cannot be kept. For those four roles no single norm page owns what the page applies: a structure page applies the level table (`docs/norm/flow.md`, "Three levels"), the directory-index rule (`docs/norm/roles.md`, "Directory index") and the artifact tiers (`docs/norm/overlays.md`, C5). ADR-0016 already scoped the base pointer to a target's _general-norm page_, and `docs/workflow.md` "Mapping table" gives it only for a copied lifecycle page and a copied conventions page.

## Decision

A target's general-norm page — a page that consumes one norm page as a whole — is a base pointer to that page plus its own deviations. Every other role page records this repository's own facts and links the norm page and section it relies on instead of copying them; a page that restates the norm remains a finding. No `Norm` row is added to the template; oshi's five rows stand as a permitted link form, not a requirement.

## Options considered

- Add a `Norm` row to the four template pages — rejected: the row can only name `roles.md` "Structure", which lists the topics and states neither the level table nor the tiers, so it cannot answer what the page applies.
- Give every role page a `Base:` line — rejected: the template has no metadata head, and pages such as the charter and the storefront README are not wholly derivative of one norm page.
- Move the level table and the tiers into `roles.md` "Structure" so one page owns the whole role — rejected: `roles.md` would carry `flow.md`'s mechanics and the overlay's C5, moving the duplication instead of removing it.
- Record the four pages as exceptions — rejected: an exception is for a frozen or external contract, not for a sentence no target can satisfy.

## Consequences

- The `docs/norm/README.md` "Status" sentence narrows; ADR-0016 and the mapping table keep the wording they had.
- The template adds no row. Its four pages still copy norm text, which the no-copy clause already makes a finding; `template/core/docs/structure.md` becomes the first page to convert (`work-packages/rollout-oshi/items/W12.md`).
- Oshi needs no edit: its `Norm` rows are links at reliance, and its `docs/conventions.md` keeps the base pointer.
- No gate stage changes; R1 stays a review rule.
