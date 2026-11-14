# B-0004 — Validate the overlay configs against a real repository

## Problem

Both overlays ship real configs — `package.json` scripts, `tsconfig.base.json`, `.oxlintrc.json`, `.oxfmtrc.json`, the workspace `pyproject.toml`, `[tool.ruff]` — that were written from current tool conventions. Template copies have now been executed green, but no repository with existing code has applied either overlay. A key that a real project's layout silently ignores still produces a gate that looks green and checks less than it claims.

## Evidence

- A fresh TypeScript copy, after `bun install`, runs `bun run gate` green: oxfmt 0.78.0 on 2 files, oxlint 1.93.0 with 0 warnings, `tsc --noEmit`, `bun test` 1 pass, build to `dist/`.
- A fresh Python copy, after `uv sync`, runs `uv run python tools/gate.py` green on Python 3.15.0: ruff 0.17.5, pytest 9.2.0, 1 pass.
- TypeScript 7 required an explicit `"rootDir": "src"` in `tsconfig.build.json`; without it the build failed with TS5011. That trap is now in the overlay README.
- `oxlint` and `oxfmt` accepted a revised schema during their 2025–2026 releases; a copied key may be ignored rather than rejected.
- The template's own gate is the documentation checker, not the language gate.

## Revisit when

The first repository is forged, or the first migration reaches its overlay step. Then run the overlay gate on real code, keep only keys the tool actually honors, and record each rejected key as a trap in the overlay README. A key that cannot be verified is removed rather than kept "just in case".
