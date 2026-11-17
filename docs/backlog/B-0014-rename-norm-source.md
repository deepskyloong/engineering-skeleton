# B-0014 — The repository still presents itself as a skeleton

## Problem

The repository is named `engineering-skeleton`, and `0001` describes it as "the normative skeleton … the source the skeleton is copied from". Its role is now wider: the single authority for general norms, a reference exemplar for target repositories, and a template with overlays. The name and the framing describe only the copy source, and every target that points here and every ADR that names the repository raises the cost of a rename.

## Evidence

- Target repositories will name the norm source through one placeholder; once that model lands, a rename edits one line per target instead of every reference.
- Oshi's migration is the first target that names this repository by path (W10/W11), so the pointer exists before the rename.
- The name appears in `README.md`, `AGENTS.md`, the rollout skill, and the `E:\Projects\engineering-skeleton` checkout path.

## Revisit when

`B-0005` closes and the placeholder model is in place.
