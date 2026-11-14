# TypeScript overlay

Applies to a repository whose runtime is Bun. Copy every file in this directory **except this README** to the repository root; replace `<project-name>`; run `bun install && bun run gate`. A fresh copy is green before any real code is added.

## Files

| File | Role |
|---|---|
| `package.json` | Scripts, pinned dev toolchain |
| `tsconfig.base.json` | Compiler options shared by both configs |
| `tsconfig.json` | Typecheck config, `src` only |
| `tsconfig.build.json` | Emit config, `src` only |
| `.oxlintrc.json` | Lint rules |
| `.oxfmtrc.json` | Format rules |
| `.gitignore` | Runtime and regenerable paths |
| `src/index.ts` | Seed module; replace or delete |
| `tests/index.test.ts` | Seed test; replace or delete |

## C1 — gate

```bash
bun run gate
```

Stages, fail-fast: `oxfmt --check src tests` → `oxlint src tests` → `tsc --noEmit` → `bun test` → `tsc -p tsconfig.build.json`.

Both formatter and linter are scoped to `src` and `tests`. Running `oxlint` with no path walks `node_modules` and reports tens of thousands of errors that have nothing to do with this repository.

A commit message cites `bun run gate`, never a single stage.

## C2 — CI

`bun install --frozen-lockfile`, then `bun run gate`. CI adds no stage the local gate does not run.

## C3 — layout

- Single package: `src/`, `tests/` at the root; one `tsconfig.json`.
- Monorepo: `packages/*` libraries, `apps/*` entry points; each member has its own `package.json`, `tsconfig.json`, `src/`, `tests/`.
- A member depends on another with the workspace protocol, never a file path, never a caret range.
- `dist/` is regenerable and is not committed.

## C4 — dependencies

`bun add`, `bun add -d`, `bun remove`; `bun.lock` is committed. CI installs with `--frozen-lockfile`. A dependency added without a lockfile change is a finding.

`typescript`, `oxlint`, and `oxfmt` are pinned with caret ranges near the versions the template was verified against. `bun.lock` records the exact resolution; that is the pin that matters.

## C5 — artifact tiers

| Tier | Paths |
|---|---|
| Authoritative | `src/`, `tests/`, config files |
| Regenerable | `dist/`, `*.tsbuildinfo` |
| Runtime | `node_modules/`, `.bun/`, `coverage/` |

## C6 — language rules

- ESM only; `"type": "module"`.
- Named exports for modules with more than one symbol.
- Errors as values at boundaries; throw only at the entry point.
- No `any` in a public signature; `unknown` plus a narrowing check instead.
- Type-only imports use `import type` (`verbatimModuleSyntax` enforces it).

## C7 — traps

- **`bun run` is not `npm run`.** A script named `check` is not special. The gate is named `gate` and cited explicitly.
- **`oxlint` without a path walks `node_modules`.** Always pass `src tests`; the same applies to `oxfmt`.
- **Tests are not typechecked.** `tsconfig.json` includes `src` only because the test runner provides `bun:test` at runtime without shipping types. Add `@types/bun` and include `tests` when test type errors start to matter.
- **Path aliases need a per-package `paths` entry.** A root alias does not cross a workspace boundary by itself.
- **TypeScript 7 requires `rootDir` when only `src` is included.** The build config sets `"rootDir": "src"`; removing it fails with TS5011.
- **CRLF breaks a shebang.** Add `*.ts text=lf` to `.gitattributes` if a script starts with `#!`.
- **`composite` conflicts with `noEmit`.** Keep it out of the base config; add it only to a build config that emits.

Verified against bun 1.4.3, oxlint 1.93.0, oxfmt 0.78.0, typescript 7.0.2.

## C8 — upgrade

Bump the three dev dependencies in `package.json`, run `bun install` to refresh `bun.lock`, run the gate, and record any behavior change as a trap above. Do not bump the lockfile without running the gate in the same commit.
