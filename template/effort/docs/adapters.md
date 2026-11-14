# Adapters

Third-party suites whose output paths are hard-coded, and legacy paths that cannot move yet. This is a registry, not a directory layer.

## Registry

| Suite / legacy path | Hard-coded path | What reads it | Whitelist | Closeout route |
|---|---|---|---|---|
| `<suite>` | `<path>` | `<consumer>` | `<allowed files>` | `<which closeout step relocates it>` |

## Rules

1. The suite keeps writing where it writes. Do not make the repository bend so one tool can keep its habit.
2. The whitelist names exactly which files or directories are tolerated. Everything else under that path is a finding.
3. A closeout route is one of: move into the canonical role; mark generated and leave; delete after the last consumer disappears.
4. A legacy path is removed only when its last consumer is gone, proven by `rg -l '<path>'`.
5. A row is removed when the suite is uninstalled. A row that stays after uninstall is a stale exception.

## When to add a row

- A tool writes into the repository at a path the skeleton does not own.
- A migration cannot move a path because a frozen record cites it.
- A tool cannot follow a symlink or a junction.

If none of the three holds, do not add a row. An adapter registry with one entry is cheap; with ten, it is a second undocumented layout.
