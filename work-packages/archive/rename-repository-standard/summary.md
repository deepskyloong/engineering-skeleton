# Summary — rename-repository-standard

## Done

ADR-0018 records the decision: `repository-standard` for the repository, the repository standard for the artifact, `the standard` after the first mention, and `i-repository-standard` for the skill. The twelve normative pages, the template, the four open backlog items, and the live rollout package use the new term. The template header is `standard: vN`; `package.json` and `bun.lock` name the workspace `repository-standard`; the gate and audit docstrings follow. The skill directory, frontmatter, `STANDARD_ROOT`, fallback, and external references are renamed. `B-0014` closes with an outcome. The gate is green.

## Not done

The GitHub repository and the local checkout are still named `engineering-skeleton`; their rename and the push are the maintainer's actions. No ADR before this one, archived package, or dated audit snapshot was rewritten: the old word stays there as provenance. `B-0002`'s file name keeps `skeleton` because it is an address cited by ADR-0015; its body checks `standard: vN`. The spec stays `v1`: no role, budget, or discrimination changed.

## What a future maintainer must know

The old word is historical, not banned. `GLOSSARY.md` maps it and ADR-0018 is the record; a living page that says "skeleton" again is a regression, not a style choice.

The surviving occurrences are the frozen ADRs (0001, 0002, 0006, 0007, 0008, 0010, 0015, 0018), the archived `rollout-five-repositories` and `rename-repository-standard` packages, the oshi audit snapshot, `B-0014`'s original question and index title, the glossary's former-name line, the `B-0002` file name, and the historical worktree and branch names in `tasks/rollout-oshi/plan.md`. Do not edit them to improve a grep.

Two operational notes. The skill's fallback is `E:\Projects\repository-standard`; until the checkout moves it stops and asks for the root, and `STANDARD_ROOT` covers a checkout elsewhere. `bun install` does not rewrite the lockfile's root name when only the package name changes; the root workspace entry was aligned by hand, and a second install accepts it.
