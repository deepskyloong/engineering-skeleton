# Structure and placement

## Levels

This repository is a single package: `src/` and `tests/` sit at the root, `docs/` sits beside them, and `work-packages/` arrives with the first package. How a fact is placed across the root, member, and module levels is `{{NORM_SOURCE}}/docs/norm/flow.md`, "Three levels"; how a single package degenerates from a monorepo is `{{NORM_SOURCE}}/docs/norm/foundations.md`, "Single-package degeneration".

## Directory ownership

`docs/README.md` lists the docs tree's direct children, and each docs subdirectory's own `README.md` lists its pages. The rule a directory index follows is `{{NORM_SOURCE}}/docs/norm/roles.md`, "Directory index".

## Placement rules

The role tables in `{{NORM_SOURCE}}/docs/norm/roles.md` — "Always present", "Present from the first real use", "Optional, admitted by trigger" — are the placement router; the chosen home's `README.md` is the membership list. Configuration for a tool sits beside the code it configures.

## Artifact tiers

| Tier | Meaning | In git |
| --- | --- | --- |
| Authoritative | Source of truth | Yes |
| Regenerable | Produced from an authoritative file by a command | No |
| Runtime | Caches, session state, run output | No |
| Package evidence | A report, inventory, or reproduction script a work package owns and cites | Yes |

A review report body outside a work package is runtime; one inside a work package is package evidence. The header a regenerable file carries is defined in `{{NORM_SOURCE}}/docs/norm/rules.md`, "Generated artifacts".
