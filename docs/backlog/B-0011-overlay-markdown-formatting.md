# B-0011 — Overlays format no Markdown

## Problem

R12 keeps column padding out of Markdown and assumes a repository that formats Markdown at all. Both overlays format no Markdown: no gate stage normalizes `*.md`, so the pages shipped by `template/core/` are normalized by nothing — heading spacing, blank lines, list markers, and code fences included. R12's check exists only on the Python side (`tools/check_tables.py`, ADR-0035); a generated TypeScript repository has neither a formatter nor a table check, because the portable checker is deferred (`B-0002`). The result is a standard that is strict about its own Markdown and silent about a TypeScript target repository's.

## Evidence

- The TypeScript overlay's `package.json` sets `format:check` to `oxfmt --check src tests`, and its gate chains format, lint, typecheck, test, and build; `src/` and `tests/` hold no Markdown.
- The Python overlay's `tools/gate.py` runs `ruff format --check src tests tools`; Ruff formats only `python`-tagged code fences inside Markdown, and no stage normalizes `*.md`.
- `template/core/` has no format or check command of its own, so a forged repository inherits neither the formatter nor `scripts/check.ts`.
- The TypeScript overlay already carries a `package.json` and devDependencies, which makes a Markdown stage cheap there and expensive in Python.
- The prose rule is unenforced for the same reason: `docs/norm/rules.md` forbids a hard-wrapped paragraph, the standard gates it through `md-tools`, and a forged repository inherits no equivalent stage — so its pages may wrap at any width while the norm says they must not.
- Prettier cannot close that gap: `proseWrap` defaults to `preserve`, which keeps an author's line breaks, so a Prettier stage normalizes a page and leaves it hard-wrapped. Checking prose flow needs the block model, which lives in `md-tools` (Python) and has no port.

## Minimal fix

Add one Markdown-formatting stage to the TypeScript overlay only: `prettier --plugin=prettier-plugin-markdown-compact-tables --check "**/*.md"`, with `prettier` and the plugin pinned in its `package.json` and the stage listed in its `README.md` stage chain and `.github/workflows/gate.yml`. Leave the Python overlay's formatter half untouched: `mdformat` re-pads every table to the longest cell, so no Python formatter satisfies R12; the rule's check ships there as a gate stage (ADR-0035), and only the formatting half stays open.

The prose half waits on the tool, not on the overlay: a stage needs `md-tools` runnable on a machine that has the overlay's language only. Add it in both overlays once the CLI is installable (`uvx md-reflow` or an equivalent), and add `MD_TOOLS_PROJECT`-style configuration only where no install path exists.

## Revisit when

The first forge whose target repository asks for Markdown normalization, or a Python formatter that keeps table cells at one space, or `md-tools` becoming installable outside this machine.
