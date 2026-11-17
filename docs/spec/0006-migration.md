# 0006 — Migration

## Six execution rules

**M1 — Freeze before moving.** Announce the target home and stop adding to the old one. A move performed while new files keep arriving at the source never converges.

**M2 — One role per commit.** A commit moves one role, or one role plus its pointers. Three directories moved in one commit look mechanical and are impossible to review.

**M3 — Prove every pointer.** Before committing, run `rg -l '<old-path>'` and require an empty result, or an explained survivor. The command is the proof; "I checked" is not.

**M4 — No bulk `mv`.** Move file by file with `git mv`, so a rename is visible in the diff. A recursive move hides deletions inside a directory rename.

**M5 — A frozen record keeps its citation.** A file that a closed record cites by name is not rewritten to point at the new path. Move it, leave a tombstone, and register the tombstone's reason. Rewriting history to simplify today's grep is how a record stops being evidence.

**M6 — A foreign path is registered, not forced.** A third-party suite's track root is a permanent row in `docs/adapters.md`; a legacy path is a retirable row there. Do not make the whole repository bend so one tool can keep writing where it always wrote, and do not relocate a suite's track because it resembles a skeleton role.

## Mapping table

| Current pattern                                                         | Target role                                                                      | Note                                                                                                                      |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| One large `AGENTS.md` holding rules, architecture, and history          | `AGENTS.md` (red lines, gate, routing) + `docs/structure.md` + `docs/decisions/` | Split by reader: what must hold every turn, what explains the layout, what records a choice                               |
| `adr/`, `adrs/`, `decisions/`                                           | `docs/decisions/`                                                                | Pick one name; the other paths become tombstones only if cited                                                            |
| `specs/` in four places                                                 | `tasks/<slug>/spec.md` and `docs/contracts/`                                     | The work-package spec is temporary; the contract is durable                                                               |
| A single backlog file, or `backlog/B-<nnnn>`                            | `docs/backlog/B-<nnnn>-slug.md` + index                                          | New repositories use four digits; existing numbering is kept and never renumbered                                         |
| `status.md` at the root                                                 | `docs/status.md`                                                                 | Rewritten in place, no history                                                                                            |
| A tracker suite's hidden directory                                      | `docs/adapters.md` row                                                           | The suite keeps its path; the registry explains it                                                                        |
| Per-module `README.md` + `docs/` + `AGENTS.md`                          | Module `README.md`; module `AGENTS.md` deferred                                  | Module docs fold into the member unless a module is a real boundary                                                       |
| A generated `AGENTS.md` from source rules                               | Keep the generator; mark the output                                              | The source rules stay authoritative; the generated file carries the header                                                |
| A README change-surface table                                           | Keep it                                                                          | It is a real mechanism, not a skeleton violation                                                                          |
| A commit convention inside `AGENTS.md` or a separate contributing guide | `docs/committing.md`                                                             | Keep one commit section only; move the vocabulary there and leave a routing row in `AGENTS.md`                            |
| A root glossary or a pile of jargon                                     | Root `GLOSSARY.md`; member terms move down                                       | A term used by one member does not belong at the root; a legacy `CONTEXT.md` takes the `GLOSSARY` name, not a second home |
| A legacy `CONTEXT.md` / `CONTEXT-MAP.md`                                | `GLOSSARY.md` / `GLOSSARY-MAP.md`                                                | Rename; leave a tombstone only when a frozen record cites the old path; never keep both names                             |
| An existing `tasks/` with ad-hoc folders                                | `tasks/README.md` plus one package at a time                                     | Do not bulk-move; close or freeze an old package before converting it                                                     |
| A `notes/` or `knowledge/` pile                                         | `docs/knowledge/{guides,cases,notes}/`                                           | A note that cannot state its evidence stays a note; it does not become a guide                                            |

## Per-repository notes

The notes below are observations from 2026-11-14, for-the-record; they describe the source state, not a current inventory.

**bun-toolkit** — a TypeScript monorepo with a 305-line `AGENTS.md`, five ADRs, and a third-party tracker suite under `docs/agents/`. The `AGENTS.md` splits by reader: red lines and the gate stay, architecture moves to `docs/structure.md`, and the measured values become commands. The tracker suite is an adapter row, not a docs subdirectory.

**gearset** — a TypeScript library with twelve ADRs and twenty-plus trigger-loaded docs. Its module form (`src/<module>/` with README, docs, and `AGENTS.md`) is the richest sample of the module level, and the reason the module-`AGENTS.md` threshold is deferred rather than guessed. Migrate its ADRs first; they are the part with real cost.

**oshi** — a single-person Python research project: `docs/brief|status|structure|conventions|stack|operations|language-policy`, a nineteen-item backlog, a status cap enforced by a test, and no CI by design. Its backlog is the most mature in the five and becomes the reference shape. Its status cap converts from total characters to non-whitespace characters: 4,942 total / 4,211 non-whitespace maps to a 4,000 limit, about 5% tighter than the original; 4,200 preserves the existing room. No CI is an accepted overlay choice, not a gap.

**python-toolkit** — a `uv` workspace with `docs/index.md` and a `workspace-layout.md` that answers three placement questions. Its layout page is the model for `docs/structure.md`; its index becomes `docs/README.md` with autonomy (no counts).

**personal-agent-kit** — a skill-asset library, not a conventional project: `references/` for norms and `experience/` for cases, a README change-surface table, and `rules/` as source units feeding a generated `AGENTS.md`. It is the sample for the generated-artifact contract and for the two-tier knowledge split; it is not a sample for the work-package flow, because its unit of work is a skill, not an effort.

## Order of migration

1. Freeze additions to the old homes.
2. Move `docs/` roles into the canonical tree, one role per commit.
3. Split `AGENTS.md` last, after the docs exist — the routing table cannot point at pages that are not there yet.
4. Add the gate and prove it green before touching `tasks/`.
5. Migrate the backlog and status.
6. Register adapters and legacy paths.
7. Delete empty directories only after their last file has moved.
