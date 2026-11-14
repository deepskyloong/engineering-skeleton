# B-0003 — The measurable threshold for module-level `AGENTS.md`

## Problem

`02-roles.md` defers module-level `AGENTS.md` and states a provisional threshold: at least six modules in one member, and at least two modules needing a rule that would be wrong at member level. Neither number has been tested. The deferral is honest, but the threshold is a guess dressed as a criterion.

## Evidence

- gearset is the only source repository with a real module form (`src/<module>/` with README, docs, and in some cases `AGENTS.md`).
- The review's finding: module-level rule files multiply faster than modules, because every module boundary looks important while it is being drawn.
- The counter-argument: a module with a genuinely different invariant (generated code, a vendored dependency, a protocol adapter) cannot express it at member level without polluting every other module.

## Revisit when

The gearset migration reaches its module level and has at least six modules to sample. The rollout order is tracked in `B-0005`. Then measure: how many modules needed a rule, how many of those rules would have been wrong at member level, and how many module files were created and then deleted within the migration. Set the threshold from that sample, or drop the role.
