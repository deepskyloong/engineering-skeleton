# Effort template

Added when the first work package starts. Copy the two subdirectories into the target repository root:

- `docs/*` → merge into the existing `docs/`; append the rows from `docs/README.md` to the existing index. Keep the core page's governance section.
- `tasks/` → repository root.

Do not copy this `README.md`, and do not copy `docs/README.md` over the existing one. The existing `docs/README.md` is the repository's index; this one is a merge fragment.

After merging, add the three pages to the tree in `docs/structure.md`.

## What arrives

| File                 | Role                                                   |
| -------------------- | ------------------------------------------------------ |
| `docs/workflow.md`   | Tracks, t0 fields, permitted compromises, closeout     |
| `docs/governance.md` | Change surface, who decides, review format, retirement |
| `docs/adapters.md`   | Foreign suites and legacy paths, as a registry         |
| `tasks/README.md`    | Work package governance and open table                 |
| `tasks/_template.md` | The four files, as one copyable scaffold               |

`tasks/_template.md` is not a role. Split it into `spec.md`, `plan.md`, `todo.md`, and `summary.md`, then delete it.

Do not add this before the first work package. An empty `tasks/` table trains readers to ignore it.
