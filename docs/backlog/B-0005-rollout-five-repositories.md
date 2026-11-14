# B-0005 — Roll the skeleton out to the five source repositories

## Problem

`B-0002`, `B-0003`, and `B-0004` depend on a repository being forged or migrated, but no item tracks the rollout itself. The triggers are real events that only happen if someone schedules them; without this item, they are wishes with a plausible-sounding condition.

## Evidence

- The five source repositories have different maturity: oshi has the most complete backlog, gearset the richest module form, bun-toolkit the largest `AGENTS.md`, python-toolkit the clearest layout page, personal-agent-kit the only generated artifact.
- Each migration surfaces a different assumption in the spec; a rollout that skips one leaves that assumption untested.

## Plan

1. Audit all five repositories against `docs/spec/02-roles.md`; record one report per repository.
2. Migrate oshi first: its backlog is the reference shape, and the cost of a wrong call is lowest.
3. Migrate bun-toolkit: the `AGENTS.md` split and the adapter registry get their first real test.
4. Migrate python-toolkit: the layout page and the index autonomy rule get their test.
5. Migrate gearset last among the code repositories: it supplies the six-module sample that settles `B-0003`.
6. Migrate personal-agent-kit: the generated artifact contract and the knowledge split get their test. Its unit of work is a skill, so the work-package flow does not apply.

## Revisit when

The first migration completes, or a second repository is ready to adopt the skeleton. At that point, convert this item into a per-repository checklist and close it when all five have either migrated or recorded a reasoned exception.
