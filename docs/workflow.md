# Workflow

Three modes. Every mode names its inputs, its steps, its output, and the condition under which it must stop and ask.

## Mode 1 — forge (new repository)

**Input**: a repository path, a one-line purpose, a language (TypeScript or Python).

**Steps**

1. Read `docs/spec/0001-foundations.md` and `docs/spec/0002-roles.md`. Do not skip to the template: the template is a consequence, and copying it without the roles produces files nobody can place later.
2. Copy `template/core/` to the repository root. Replace the values listed in `template/README.md`; leave the notation tokens in place.
3. Choose one overlay under `template/overlays/` and apply its README. The gate must run green before anything else is added.
4. Trim the `AGENTS.md` routing table to the pages that exist: charter, structure, conventions, committing, and the overlay's toolchain page.
5. Run the day-one checklist below.
6. Stop. Do not create `docs/decisions/`, `docs/backlog/`, or `docs/knowledge/` yet. They appear at their first real use.

**Day-one checklist**

- [ ] `README.md` states what the project is in one sentence, how to install, and the shortest command that proves it runs.
- [ ] `AGENTS.md` has invariants, the gate, and a routing table.
- [ ] `docs/README.md` has governance and index sections.
- [ ] `docs/charter.md` names at least one non-goal.
- [ ] `docs/structure.md` carries the tree and the three artifact tiers.
- [ ] `docs/conventions.md` carries the language rule and the five discriminations.
- [ ] `docs/committing.md` states the header shape, the body rule, and one logical change.
- [ ] The overlay gate runs green.
- [ ] `AGENTS.md` volume is inside budget.

**Stop condition**: if the project has no runnable code yet, stop after step 4 and say so. A documentation standard over an empty repository is a promise, not a structure.

## Mode 2 — audit (existing repository)

**Input**: a repository path.

**Steps**

1. Read `docs/spec/0002-roles.md` and `docs/spec/0004-rules.md`.
2. Inventory: list every markdown file outside vendored directories, and assign each one a role or mark it `unplaced`.
3. Check the four failures that matter most: two homes for one role, a rule restated in two places, a budget breach, and a pointer that resolves to nothing.
4. Write the report in the fixed format: `[severity] §role — problem / why / minimal fix`. Sort by severity, then by the effort each fix would take.
5. Stop at the report. An audit does not edit the target repository unless the user asks for migration in the same request.

**Output**: an audit report with a top-3 list. If nothing is wrong, say so in one line and stop.

## Mode 3 — migrate (one role at a time)

**Input**: a repository path plus one target role, or a role list with an agreed order.

**Steps**

1. Read `docs/spec/0006-migration.md` and the mapping row for the role.
2. Move one role per commit. Never batch three directories into one commit, even when they look mechanical.
3. Before committing, prove the pointer migration: `rg -l '<old-path>'` returns nothing, and the command prints the files it covered.
4. Register a third-party suite's track root in `docs/adapters.md` as a suite track and a path that cannot move as a legacy path; neither one moves.
5. Add the target repository's remaining roles to `docs/backlog/` with a revisit trigger, or stop and report what is left.

**Stop condition**: if a move would break a frozen record that cites the old path by name, do not move it. Write a tombstone (≤3 lines) and continue.

## Which mode to use

| The user says | Mode |
| --- | --- |
| "new project", "bootstrap this repo", "initialize" | forge |
| "review my repo structure", "why is this unmaintainable", "audit" | audit |
| "move docs to the new layout", "adopt the standard" | migrate |
