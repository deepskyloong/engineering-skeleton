# ADR-0010 — Suite tracks are permanent adapters

Status: Accepted (2026-11-17)

## Context

`docs/spec/0002-roles.md` admits an adapter registry for foreign suites: their hard-coded output paths, the whitelist, and the closeout route; the row leaves when the suite is uninstalled. `template/effort/docs/adapters.md` narrowed that to three closeout routes — move into the canonical role, mark generated and leave, delete after the last consumer — and every one of them ends in relocation or deletion.

A development-workflow suite writes into paths it owns and loads by name. Oshi carries four: `addyosmani/agent-skills` writes `tasks/<slug>/`; `compound-engineering` writes `docs/compound-engineering/`; `mattpocock/skills` writes `.scratch/<slug>/` and `docs/agents/`; `obra/superpowers` writes `docs/superpowers/<slug>/` and `.superpowers/`. Each suite defines its own file organization and content form. The five closed packages under two of these roots are the artifacts of those forms, not skeleton work packages. Moving them into `tasks/<slug>/` would not change where the suite writes — its skill loads the path by name and recreates it — and would leave two layouts.

The registry's own applied sample already contradicts the template: oshi's `docs/agents/` row says "leave; the suite still writes its own config", a fourth disposition the template does not name. The role's exit ("entry removed when the suite is uninstalled") assumes permanence; the template assumes temporary.

## Decision

The adapter registry names two kinds of entry:

- **Suite track** — a directory a third-party suite owns and loads by name. It is permanent while the suite is installed; its file layout and content form belong to the suite; the repository does not relocate, merge, or normalize it. The row records its roots, what reads it, the whitelist, and the fact that new artifacts land there only through the suite.
- **Legacy path** — a repository path that cannot move yet because a frozen record cites it. It is retirable when the last consumer is gone, proven by `rg -l '<path>'`.

A migration never relocates a suite track. The row leaves when the suite is uninstalled, per the role's exit.

## Options considered

1. **Fold closed suite packages into `tasks/<slug>/`.** Rejected: the suite loads its paths by name, so a file move does not change where it writes; the next run recreates the old path and the repository carries two layouts.
2. **Freeze the tracks as legacy paths.** Rejected: a legacy path is a retirement queue; a suite track is the opposite — a permanent, owned input. Registering one as legacy invites a later migration to delete it.
3. **Leave the tracks unregistered.** Rejected: an unregistered foreign root reads as a skeleton violation, and the next audit reports it as an unplaced home. The registry is the only page that can say "owned elsewhere, tolerated here".
4. **Split the registry into suite track and legacy path.** Chosen: it matches the role's exit (removed when the suite is uninstalled), legalizes the existing `docs/agents/` row, and keeps the retirement rule for paths that really are waiting to move.

## Consequences

- `0002-roles.md` names both kinds in the Adapter registry admission; `template/effort/docs/adapters.md` carries a `Kind` column and states that a suite track has no relocation route.
- Oshi's `docs/adapters.md` gains one row per suite root; the five closed packages stay where they are, and no tombstone is needed because the paths do not move.
- The audit's finding "one effort shape lives in five homes" is withdrawn as a defect: it is four registered suite tracks plus the repository's own `tasks/` role. `docs/development-workflows.md` remains the per-suite map; the registry carries the disposition.
- The skill's migrate mode registers a suite track as a track, not as a legacy path.
- `docs/backlog/B-0007` is unaffected: the frozen-evidence decision is a separate unit.
