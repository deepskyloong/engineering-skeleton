# ADR-0012 — Markdown tables are not column-aligned

Status: Accepted (2026-11-17)

## Context

The gate formatted Markdown through `bun fmt`, and the Prettier family pads table cells to column width. That padding is invisible once rendered, so it serves only a reader of the raw source. Its cost is measurable: across the thirteen commits before this decision that touched `*.md`, 101 of 254 added table rows changed no cell text — they were re-padded around one edited row, cells compared after trimming (2026-11-17, for-the-record). A single added row in `docs/decisions/README.md` rewrote eleven unchanged rows, and those rows now blame the reformat commit.

Review-side workarounds hide the spaces but not the delimiter row: `git diff -w`, GitHub's "Hide whitespace", and VS Code's `diffEditor.ignoreTrimWhitespace` leave a padded delimiter row visible, because alignment pads it with hyphens — a character change no whitespace option ignores. On the migration measured below, `git diff -w` leaves +57/-57 of 958 changed lines, and all 57 are delimiter rows.

## Decision

Markdown is formatted by Prettier with `prettier-plugin-markdown-compact-tables`: one space around each cell, a fixed `| --- |` delimiter row, alignment colons kept. R12 in `0004-rules.md` states the shape, and `scripts/check.py` fails on padding and on a cell count that differs from its header. Code formatters — `bun fmt` here, `oxfmt` and `ruff` in the overlays — skip `*.md`. The rule is conditional: a repository that formats no Markdown complies by doing nothing.

## Options considered

- **Keep column alignment.** Rejected: the churn above and the blame damage. `bun fmt`, `oxfmt`, and Prettier all align, and none exposes an option; `oxfmt`'s configuration schema carries no table key among its 29.
- **A `<!-- prettier-ignore -->` marker above each table.** Rejected: one marker per table to maintain, a second owner for the same file, and a marker placed after a table applies to the next node rather than the table.
- **Format Markdown with `mdformat`.** Rejected: `mdformat` with `mdformat-tables` re-pads every cell to the longest column, verified against 1.0, and its style carries no option to stop.
- **Exclude `*.md` from the formatter.** Rejected: blank lines, heading spacing, list markers, and code fences then drift, and full formatting minus table width is the actual intent.
- **`@jaens/prettier-plugin-compact-markdown-table`.** Rejected in favour of the chosen plugin: its `standard` layout prints `|---|---|`, rewriting every delimiter row in the repository, while the chosen plugin keeps `| --- |` and removes only the padding.

## Consequences

- This repository takes its first runtime dependency, `prettier` and the plugin. `bun.lock` is committed and CI runs `bun install --frozen-lockfile` before the gate.
- The one-time migration commit rewrote 39 files and 958 lines (+479/-479); `git diff -w` on it leaves +57/-57, all delimiter rows (2026-11-17, for-the-record). After it, a cell edit changes that row alone.
- The plugin skips a table it cannot parse — a missing delimiter row, or a row whose cell count differs from its header — and Prettier then pads it. The checker is the guard, so a skipped table cannot pass the gate.
- `git blame -w` recovers lineage across the migration. `-w` stays a review aid: it also hides whitespace that carries meaning — two trailing spaces are a hard break, and indentation decides list nesting — so it is never a gate and never the only review.
- Editor format-on-save must call `bun run fmt:md`; a bare `prettier` run without `--plugin` re-pads the tables.
