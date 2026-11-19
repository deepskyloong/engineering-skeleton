# Governance

## Provenance

There is no version number. A repository records where it read the standard: the `Norm source:` line in `AGENTS.md`, and `Last read: <date>` on the pages it consumes by pointer (`docs/conventions.md`, ADR-0016). This repository's own history is `git log`; no counter sits in front of it.

A change that alters a role, a budget, or a discrimination is still a deliberate change, with its ADR or its page edit. It is recorded where it lands, not in a number.

## Who decides

- The maintainer decides scope, non-goals, and any change to a role's home.
- An agent may edit prose, templates, and the checker, following the invariants in `AGENTS.md`.
- A change that removes a role, or moves one, requires an ADR. The ADR states which options were considered and why the others lost.
- A change to a budget requires the old value, the new value, and one measured sample that justifies the move. No budget moves on taste.

## Change surface

Defined as a table in `AGENTS.md`. It is repeated here only in its principle: a change that leaves a downstream file stale is incomplete, even if the changed file is correct. The three downstream files are `docs/norm/`, `template/`, and the skill; a fourth is `scripts/check.ts` when the change alters what can be checked.

## Review

- Adversarial review is the default: a reviewer tries to break the spec, not to praise it. The output format is fixed — severity, section, problem, why, minimal fix — and the four severities are `blocker`, `major`, `minor`, `nit`.
- A review that only restates the document is not a review. A review without a section reference cannot be adjudicated.
- Findings are adjudicated in one of three ways: accepted, accepted with a different fix (the reason is recorded), or deferred with a trigger. Deferred findings become backlog items; they do not disappear into a conversation.
- A `blocker` finding blocks the change. A `major` finding blocks it until it is fixed or deferred with a trigger.

## Ownership and distribution

- Single maintainer. Agents act on explicit instructions or on the invariants in `AGENTS.md`.
- No changelog file: `git log` is the changelog, and the ADRs hold the reasoning.
- The standard is never "published" in the sense of a package. It is consumed by copying; therefore backward compatibility is a courtesy, not a constraint. A breaking change states the migration step in the same commit.

## Retirement

- A norm page that no longer binds anything is deleted; `git log` keeps it.
- An ADR is never deleted. It is marked `Superseded` and linked to its replacement.
- A backlog item that is closed stays, file and index row, because its `Evidence` may be cited elsewhere. Its row is marked `closed`; it is not removed.
