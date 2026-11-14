# Python overlay

Applies to a repository managed with `uv`. Copy every file in this directory **except this README** to the repository root; replace `<project-name>`; run `uv sync` then `uv run python tools/gate.py`. A fresh copy is green before any real package exists.

## Files

| File | Role |
|---|---|
| `pyproject.toml` | Project metadata, dev dependencies, ruff and pytest config |
| `.python-version` | Interpreter pin read by `uv` |
| `.gitignore` | Runtime, regenerable, and cache paths |
| `tools/gate.py` | The gate runner |
| `src/example_package/__init__.py` | Seed module; rename the directory and replace the code |
| `tests/test_smoke.py` | Seed test; replace or delete |

## C1 — gate

```bash
uv run python tools/gate.py
```

Stages, fail-fast: `ruff format --check` → `ruff check` → `pyright` when installed → `pytest` → `python -m build` when the project has a `[build-system]`.

The gate is a script, not a `[project.scripts]` entry. A workspace root is not an installable package, so `uv run gate` would fail with `Failed to spawn: gate`. The script form works in both a single-package repository and a workspace root.

A commit message cites `uv run python tools/gate.py`, never `pytest` alone.

## C2 — CI

`uv sync --frozen`, then `uv run python tools/gate.py`. CI adds no stage the local gate does not run.

## C3 — layout

- Single package: `src/<package>/`, `tests/` at the root.
- Workspace: `packages/<member>/src/<member>/`, `packages/<member>/tests/`; the root `pyproject.toml` keeps the dev group and the tool config.
- A member imports another member by distribution name, never by relative path.
- `__pycache__/`, `.venv/`, `dist/`, `*.egg-info/` are runtime or regenerable and are not committed.

## C4 — dependencies

`uv add`, `uv add --dev`, `uv remove`; `uv.lock` is committed. CI uses `uv sync --frozen`. A member's dependency added without a lockfile change is a finding.

## C5 — artifact tiers

| Tier | Paths |
|---|---|
| Authoritative | `src/`, `tests/`, `tools/`, config files |
| Regenerable | `dist/`, `*.egg-info/` |
| Runtime | `.venv/`, `__pycache__/`, `.pytest_cache/`, `.ruff_cache/` |

## C6 — language rules

- Type hints on public functions; `from __future__ import annotations` at the top of a module with modern syntax.
- No mutable default arguments.
- Dataclasses or typed mappings at boundaries, not bare dicts.
- Output through one formatting helper; no scattered `print` calls in library code.
- One formatter is authoritative: editors call `ruff format`, not a reimplementation.

## C7 — traps

- **A stale `.venv` shadows the resolved interpreter.** `uv sync` recreates it; `uv run --no-sync` does not. When an import works in one member and fails in another, delete `.venv` and sync again.
- **`uv run` inside a member uses the workspace lock.** A member that pins a version the workspace excludes fails only at run time.
- **`pytest` exits 5 when it collects no tests.** The template ships one seed test for this reason; deleting it without replacing it turns the gate red.
- **`python -m build` on a workspace root fails.** The gate runs the build stage only when a `[build-system]` exists; a workspace root normally has none.
- **`wc -w` does not count Chinese.** A 5,891-character Chinese document reports about 1,000 words. Budgets use non-whitespace characters.
- **`ruff target-version` below the runtime hides syntax.** Raise it when ruff supports the interpreter in `.python-version`.

Verified 2026-11-14 (for-the-record): uv 0.13.1, Python 3.15.0, ruff 0.17.5, pytest 9.2.0.

## C8 — upgrade

Raise `.python-version`, run `uv sync` to refresh `uv.lock`, run the gate, and record any behavior change as a trap above. Raise `target-version` only when the ruff release supports the new interpreter; a config pinned below the runtime hides syntax the runtime accepts.
