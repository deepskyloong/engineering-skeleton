# docs/ — index and governance

## Governance

- **What goes here**: documents whose reader is a maintainer of this project. A document whose reader is a user belongs in the root `README.md`.
- **What does not go here**: generated files, toolchain configuration (it lives beside the code it configures), or a copy of a value owned elsewhere.
- **Structure**: each topic gets its own file. A new subdirectory gets its own `README.md` before it gets a second file.
- **Naming**: `kebab-case.md`; ADRs use `ADR-<nnnn>-slug.md`; backlog items use `B-<nnnn>-slug.md`.
- **Optional roles**: `contracts/`, `operations/`, `toolchain/`, `knowledge/`, and `adapters.md` appear when their trigger does. Their absence is correct.

## Index

| File | Content |
| --- | --- |
| [charter.md](charter.md) | Scope, non-goals, constraints, success criteria |
| [structure.md](structure.md) | Levels, placement rules, artifact tiers |
| [conventions.md](conventions.md) | Language, naming, citation, five discriminators |
| [committing.md](committing.md) | Commit message shape, types, and deviations from a base |
