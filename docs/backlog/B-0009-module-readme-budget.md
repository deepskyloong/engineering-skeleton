# B-0009 — Module README has no budget

## Problem

`docs/spec/0002-roles.md` admits a module `README.md` when a module is a real abstraction. `docs/spec/0004-rules.md` budgets a member `README.md` at 8,000 non-whitespace characters and says nothing about a module `README.md`. Admission rule 5 requires a budget with a unit and a command, so the role is currently admitted without one.

## Evidence

gearset's five module READMEs, measured 2026-11-16 with the gate's `volume()` definition:

| File | Volume |
| --- | --: |
| `src/logger/README.md` | 12,340 |
| `src/fetcher/README.md` | 11,902 |
| `src/reliable-sse/README.md` | 10,286 |
| `src/reliable-websocket/README.md` | 10,146 |
| `src/utils/README.md` | 4,165 |

Four of five exceed 8,000. oshi's single module README is 2,108. The sample is the first real one, per `B-0003`'s note that gearset supplies the module-level evidence.

## Minimal fix

After the gearset migration measures all five: add a "Module `README.md` ≤ 8,000" row to the budget table, or fold module READMEs into the member `README.md` and delete the role. Do not pick the number before the sample; a budget without a measured distribution is taste.

## Revisit when

gearset's migration reaches its module level, tracked in `B-0005`. Record the five measurements in the ADR or the backlog row that settles the choice.
