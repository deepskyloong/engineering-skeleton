# B-0012 — oxfmt may learn to keep table cells compact

## Problem

ADR-0012 buys the compact table shape with this repository's first runtime dependency: `prettier`, `prettier-plugin-markdown-compact-tables`, two `fmt:md` scripts, and `**/*.md` in two oxfmt ignore lists so the two formatters do not fight over Markdown. If `bun fmt` grows a table setting, that layer is dead weight.

## Evidence

- `oxfmt` 0.78's configuration schema has 29 keys; none of them controls table cells, and `bun fmt` re-padded a compact table when it was measured before ADR-0012.
- The chosen plugin prints `| a | b |` with a `| --- |` delimiter row; a replacement must keep that delimiter row unchanged, or the migration it forces is the one ADR-0012 rejected.
- The root and TypeScript overlay `.oxfmtrc.json` files both list `**/*.md`, so Markdown ownership is already declared in two places that have to agree.

## Minimal fix

Replace `fmt:md` and `fmt:md:check` with the oxfmt invocation, remove `prettier` and the plugin from `devDependencies`, and drop `**/*.md` from both ignore lists. Keep `scripts/check.py`'s table check: it guards against a formatter that silently skips a table it cannot parse, and that risk does not leave with the plugin.

## Revisit when

`oxfmt`'s configuration schema gains a key that controls table cell padding, checked against `node_modules/oxfmt/configuration_schema.json` or the release notes. A key that only changes alignment is not the trigger: the output must be compact without a plugin.
