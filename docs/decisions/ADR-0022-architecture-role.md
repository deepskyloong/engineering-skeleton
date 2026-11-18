# ADR-0022 — Architecture is a role, not a contract or a structure section

Status: Accepted (2026-11-18)

## Context

`docs/norm/roles.md` "Five discriminations" names architecture as one of four document jobs and gives the test that separates it from a contract: a fact a consumer may rely on is a contract, an explanation of internal organization is architecture. The role table had no home for that job. `docs/workflow.md` sent an oversized `AGENTS.md`'s architecture content to `docs/structure.md`, whose admission is levels, placement, and artifact tiers.

Oshi's `docs/designs/architecture-v2.md` is the first real application: 33,784 non-whitespace characters, cited by 27 files, describing components, flows, failure responses, and rulings. A one-to-one move to contracts would contradict the test; a move to `docs/structure.md` would mix placement with the system's shape and exceed the 16,000-character hard line. Python-toolkit keeps a `docs/architecture.md`, a second sample of the job.

The W03 review withdrew its architecture rows on 2026-11-18: R13 makes admission a content test, and internal organization fits neither contracts nor operations.

## Decision

Add an optional Architecture role at `/docs/architecture/<topic>.md`, with the directory's `README.md` as its index. It holds how the system is organized and what a change must respect: component boundaries, data and control flow, failure responses, invariants. An interface promise a consumer relies on belongs to `docs/contracts/`; the reason a choice won belongs to `docs/decisions/`.

The role is admitted by the first change that must respect a boundary it does not own, and deleted when the system it describes is gone. It binds a change's shape: a change that contradicts it updates the page in the same change, or records why not.

The optional role table gains an Authority column, so a contract, an operation, and an architecture page each state how far they bind. A new "Role boundaries" section gives one test per adjacent pair and a tie-break: when two roles still admit the same sentence, the narrower exit owns it and the other page links.

## Options considered

1. Add the optional Architecture role — chosen. It completes the four-document set the discrimination already declares, keeps promises and descriptions apart, and gives a 33,784-character page a home that can split by topic.
2. Let contracts absorb architecture — rejected: the discrimination's test separates a promise from a description; a component diagram is not a fact a consumer may rely on, and the role would become the home for everything durable.
3. Widen Structure's admission and put architecture there — rejected: structure answers placement, architecture answers shape; one page cannot serve both readers and cannot hold the content inside 16,000 characters.
4. Keep `docs/designs/` as a legacy path — rejected: a legacy row is for a frozen citation that blocks a move, not for a live page with no home; P5 says a roleless page is not maintained.
5. Put architecture in the charter — rejected: the charter binds scope, architecture describes the system; a scope change and a design change are different events.

## Consequences

- `roles.md` gains the role row, the Authority column, the boundaries section, and a reworded discrimination.
- `foundations.md` adds the optional directory to the canonical tree; `template/core/docs/README.md`, `template/core/docs/structure.md`, and the `workflow.md` mapping row follow.
- `scripts/check.py` admits `docs/architecture/(README|<topic>).md`.
- Oshi's W03 splits into a contracts move and an architecture move; the architecture source's tombstone points to `docs/architecture/README.md`. The contract pages stand as planned.
- Python-toolkit's `docs/architecture.md` becomes `docs/architecture/system.md` plus its README at migration.
- The budget is unchanged: any `docs/` page is 10,000 soft / 16,000 hard. N = 0: no applied unit stops complying.
