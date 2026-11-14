# Structure and placement

## This repository

```text
engineering-skeleton/
├── README.md                  # storefront: what, why, quick start
├── AGENTS.md                  # rule layer: invariants, gate, routing table
├── CONTEXT.md                 # vocabulary with avoided synonyms
├── docs/
│   ├── README.md              # index + governance of this tree
│   ├── charter.md             # scope and non-goals
│   ├── structure.md           # this page
│   ├── conventions.md         # writing and budget conventions
│   ├── committing.md          # commit messages, base and deviations
│   ├── governance.md          # versioning and change surface
│   ├── workflow.md            # forge / audit / migrate
│   ├── spec/                  # normative specification
│   ├── decisions/             # ADRs
│   ├── backlog/               # deferred items
│   └── knowledge/             # guides, cases, notes (created on demand)
├── template/
│   ├── README.md              # how to copy, placeholder list, copy order
│   ├── core/                  # files for day one
│   ├── first-use/             # first ADR, first backlog item, first glossary
│   ├── effort/                # first work package, workflow, governance
│   └── overlays/              # typescript/, python/
└── scripts/
    └── check.py               # repository gate
```

## The relationship between the three layers

| Layer | Holds | Changes when |
|---|---|---|
| `docs/spec/` | Normative rules and rationale | A role, rule, budget, or flow is deliberately changed |
| `template/` | Copyable starting points, derived from the spec | The spec changes, in the same or the next commit |
| the skill (`i-project-skeleton`) | A thin entry point: modes, order, hard rules, pointer to this repository | The mode sequence or the repository path changes |

The direction is always spec → template → skill. A template rule that the spec does not state is a template bug. A skill step the spec cannot justify is a skill bug.

## Placement rules for new files here

1. Is it normative — does it bind a generated repository? → `docs/spec/`.
2. Is it about this repository's own operation? → `docs/` top level.
3. Is it a copyable starting point? → `template/`.
4. Is it a decision with rejected alternatives? → `docs/decisions/`.
5. Is it a deferred idea? → `docs/backlog/`.
6. Is it a lesson that will change what a maintainer does next time? → `docs/knowledge/`.
7. Is it executable and run on every change? → `scripts/`.

## Artifact tiers

| Tier | Meaning | Lives in git |
|---|---|---|
| Authoritative | The source of truth for a rule or a template | Yes |
| Regenerable | Produced from an authoritative file by a command | No |
| Runtime | Session state, caches, reports produced by a run | No |

`template/` and `docs/spec/` are authoritative. A generated index or a rendered copy is regenerable. A review report body is runtime; only its index is authoritative.
