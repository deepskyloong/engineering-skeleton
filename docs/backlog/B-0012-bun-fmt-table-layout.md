# B-0012 — bun fmt may learn to keep table cells compact

## Problem

ADR-0012 buys the compact table shape with this repository's first runtime dependency — `prettier`, `prettier-plugin-markdown-compact-tables`, two `fmt:md` scripts, and `**/*.md` in two formatter ignore lists — because `bun fmt`, which formats this repository's code and Markdown, pads table cells to column width. If `bun fmt` gains a setting that leaves a compact table alone, that whole layer is dead weight.

## Evidence

- `bun fmt --help --all` lists no table or cell-padding option; its Markdown-relevant flags are `--prose-wrap` and `--embedded-language-formatting`, both about prose and code fences.
- `bun fmt` reads a config file (`--config`, `--no-config`; the `--svelte` note says "without a Prettier or oxfmt config"), so the `.oxfmtrc.json` it honors is oxfmt's file name by compatibility. The formatter is Bun's; the file name is not.
- oxfmt is a dependency of the TypeScript overlay only, never of this repository's root, so an oxfmt-only key cannot change what this gate does.
- `**/*.md` in both `.oxfmtrc.json` ignore lists is what keeps `bun fmt` out of Markdown: `bun fmt --no-script --list-files .` names 15 files and no `.md`, while the same command with `--no-config` names 106 files, 91 of them Markdown.
- The chosen plugin prints `| a | b |` with a `| --- |` delimiter row; a replacement must keep that delimiter row unchanged, or the migration it forces is the one ADR-0012 rejected.

## Minimal fix

Replace `fmt:md` and `fmt:md:check` with the `bun fmt` invocation — it already claims Markdown — remove `prettier` and the plugin from `devDependencies`, and drop `**/*.md` from both ignore lists. Keep `scripts/check.py`'s table check: it guards against a formatter that silently skips a table it cannot parse, and that risk does not leave with the plugin.

## Revisit when

`bun fmt` gains a setting that stops cell padding: a flag in `bun fmt --help --all`, a `[fmt]` key in `bunfig.toml` (what `--init` writes), or a key it honors from `.oxfmtrc.json`. Confirm by running `bun fmt` on a compact table and seeing `| a | b |` survive. An oxfmt-only key is not the trigger: oxfmt is the overlay's formatter, not this repository's.
