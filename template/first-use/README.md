# First-use template

Copy pieces of this directory only when their trigger fires. It exists so that the first ADR, the first backlog item, and the first shared term do not require inventing a format under pressure.

| Trigger | Copy | To |
| --- | --- | --- |
| A decision with rejected alternatives | `docs/decisions/README.md` and `docs/decisions/ADR-0001-first-decision.md` | `docs/decisions/` |
| A deferred idea with a revisit trigger | `docs/backlog/README.md` and `docs/backlog/B-0001-first-item.md` | `docs/backlog/` |
| A term with a fixed meaning that would otherwise drift | `GLOSSARY.md` | Repository root |

`docs/README.md` here is a merge fragment: append its rows to the existing index, do not replace the page. The same rule applies to `docs/decisions/README.md` and `docs/backlog/README.md` when the directory already exists.

Rename `ADR-0001-first-decision.md` and `B-0001-first-item.md` to the real slug after copying; the number and prefix stay. After copying, add the new entries to the tree in `docs/structure.md`.
