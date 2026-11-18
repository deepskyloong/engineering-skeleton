# B-0011 — Overlays format no Markdown

## Problem

R12 keeps column padding out of Markdown and assumes a repository that formats Markdown at all. Both overlays bypass that assumption: no gate stage reads `*.md`, so the pages shipped by `template/core/` are normalized by nothing — heading spacing, blank lines, list markers, and code fences included. A generated repository also has no table check, because the portable checker is deferred (`B-0002`). The result is a standard that is strict about its own Markdown and silent about a target repository's.

## Evidence

- The TypeScript overlay's `package.json` sets `format:check` to `oxfmt --check src tests`, and its gate chains format, lint, typecheck, test, and build; `src/` and `tests/` hold no Markdown.
- The Python overlay's `tools/gate.py` runs `ruff format --check src tests tools`; Ruff formats only `python`-tagged code fences inside Markdown, and no stage reads `*.md`.
- `template/core/` has no format or check command of its own, so a forged repository inherits neither the formatter nor `scripts/check.py`.
- The TypeScript overlay already carries a `package.json` and devDependencies, which makes a Markdown stage cheap there and expensive in Python.

## Minimal fix

Add one stage to the TypeScript overlay only: `prettier --plugin=prettier-plugin-markdown-compact-tables --check "**/*.md"`, with `prettier` and the plugin pinned in its `package.json` and the stage listed in its `README.md` stage chain and `.github/workflows/gate.yml`. Leave the Python overlay untouched: `mdformat` re-pads every table to the longest cell, so there is no Python formatter that satisfies R12, and R12 is conditional precisely for this case.

## Revisit when

The first forge whose target repository asks for Markdown normalization, or a Python formatter that keeps table cells at one space.
