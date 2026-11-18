# Effort template

Added when the first work package starts. Copy the two subdirectories into the target repository root:

- `docs/*` → merge into the existing `docs/`; append the rows from `docs/README.md` to the existing index. Keep the core page's governance section.
- `work-packages/` → repository root.

Do not copy this `README.md`, and do not copy `docs/README.md` over the existing one. The existing `docs/README.md` is the repository's index; this one is a merge fragment.

After merging, add the three pages to the tree in `docs/structure.md`.

## What arrives

| File | Role |
| --- | --- |
| `docs/workflow.md` | Tracks, t0 fields, handoff, work items, permitted compromises, closeout |
| `docs/governance.md` | Change surface, who decides, review format, retirement |
| `docs/adapters.md` | Suite tracks and legacy paths, as a registry |
| `work-packages/README.md` | Work package governance, the open table, and the archive pointer |
| `work-packages/_template.md` | The four files, as one copyable scaffold |

`work-packages/_template.md` is not a role. Split it into `spec.md`, `plan.md`, `todo.md`, and `summary.md`, then delete it.

At the first closeout, `work-packages/archive/` appears with its README; do not create it at first use.

Do not add this before the first work package. An empty `work-packages/` table trains readers to ignore it.
