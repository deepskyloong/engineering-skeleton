# ADR-0001 — The specification lives in a standalone repository; the skill is a thin entry point

Status: Accepted (2026-11-14)

## Context

The skeleton serves five existing repositories and every repository created after it. The normative content is six spec pages plus a copyable template. The skill library is the natural place an agent looks, but a skill is loaded as one folder and its `references/` are read as supporting material for that skill.

Two questions had to be answered together: where the normative text lives, and what the skill contains.

## Decision

The specification, the template, and the operating manual live in `E:\Projects\engineering-skeleton`. The skill `i-project-skeleton` contains only the mode sequence, the hard rules, the report format, and a pointer to the repository. It copies nothing from the spec.

## Options considered

1. **Spec inside the skill's `references/`.** Self-contained, one hop, no external path. Rejected: the spec serves five repositories and would be buried inside one skill; editing it would look like editing a skill rather than changing a standard; the template would have to live in `assets/` and would be invisible to anyone not using the skill.
2. **Template-only repository, no prose.** Copy the tree; skip the roles. Rejected: the roles are the product. A tree without roles is exactly how the five source repositories diverged — each copied a shape and invented its own meanings.
3. **Standalone repository plus a thin skill.** Chosen: the spec can be read, reviewed, and versioned on its own; the template sits beside it so drift is visible in one diff; the skill stays small and points at one path.

## Consequences

- The skill has one external dependency: the repository root. It resolves `SKELETON_ROOT` first and falls back to one default path; if the repository moves, one lookup changes.
- A person can adopt the skeleton without installing the skill, by reading the repository. A person can use the skill without reading all six pages, because the skill names which page each mode needs.
- The template can drift from the spec. This is handled by the change-surface rule in `AGENTS.md` and by `scripts/check.py`, not by merging the two layers.
- The spec is not a package and is never "installed". It is copied, so a breaking change states its migration step in the same commit.
