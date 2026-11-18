# Adapters

Third-party suites that own directories in this repository, and legacy paths that cannot move yet. This is a registry, not a directory layer.

## Registry

| Kind | Suite / path | Path | What reads it | Whitelist | Disposition |
| --- | --- | --- | --- | --- | --- |
| suite track | `<suite>` | `<root>` | `<consumer>` | `<allowed files>` | leave; suite-owned while installed |
| legacy path | `<reason>` | `<path>` | `<consumer>` | `<allowed files>` | retire when the last consumer is gone |

## Rules

1. A suite writes where it writes. Do not make the repository bend so one tool can keep its habit.
2. A suite track is permanent while the suite is installed. Its file layout and content form belong to the suite; do not relocate, merge, or normalize it. A closed package stays in its track; it is not folded into `work-packages/<slug>/`.
3. A legacy path is a repository path that cannot move because a frozen record cites it. Its closeout route is one of: move into the canonical role; mark generated and leave; delete after the last consumer disappears.
4. The whitelist names exactly which files or directories are tolerated. Everything else under that path is a finding.
5. A legacy path is removed only when its last consumer is gone, proven by `rg -l '<path>'`.
6. A row is removed when the suite is uninstalled or the legacy path retires. A row that stays after that is a stale exception.

## When to add a row

- A suite writes into the repository at a path the standard does not own.
- A migration cannot move a path because a frozen record cites it.
- A tool cannot follow a symlink or a junction.

If none of the three holds, do not add a row. An adapter registry with one entry is cheap; with ten, it is a second undocumented layout.
