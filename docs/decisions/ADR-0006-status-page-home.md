# ADR-0006 — Status lives at the docs top level

Status: Accepted (2026-11-16)

## Context

`0002-roles.md` placed the Status role at `docs/operations/status.md`. The operations directory's admission is "a procedure someone must follow under pressure: deploy, rollback, restore, rotate"; Status is "current phase, what works, what does not, next action". The oshi migration made the mismatch visible: the operations directory README needed a separate Status section saying the page is not a procedure, and the first-stop page sat one level below the docs index. Status is cross-domain, like the charter and structure pages, not a runbook.

The role table is the normative home. A migration that follows it puts a state page inside a procedures directory and leaves the directory with an exception. The skeleton has not been battle-tested; this is the first migration that exercised the Status role, so the placement is revisited now rather than after five repositories copy it.

## Decision

Status lives at `/docs/status.md`. The operations directory holds procedures only. The budget table names `status.md` (≤8,000 EN / ≤4,000 ZH). The migration mapping sends a root `status.md` to `docs/status.md`, not to `docs/operations/status.md`. The role stays optional, admitted by the existing trigger (more than one open front).

## Options considered

1. **Keep `docs/operations/status.md`.** Rejected: the operations admission is procedures; Status is state. The directory README needs a carve-out, and the first-stop page is buried one level below the docs index.
2. **Put it at the repository root as `STATUS.md`.** Rejected: the root is for always-read entry files (`README.md`, `AGENTS.md`, `CONTEXT.md`); a status page is docs content. A root file also competes with the storefront and is not listed by `docs/README.md`.
3. **Make Status always-present at `docs/status.md`.** Rejected: the existing trigger is real; a repository with one open front does not need a status page, and an always-present empty role trains readers to ignore it.
4. **`docs/status.md`, optional.** Chosen: a cross-domain state page at the top level, one hop from the docs index, with the existing trigger and no directory carve-out.

## Consequences

- `0002-roles.md`, `0004-rules.md`, `0006-migration.md`, and `template/core/docs/conventions.md` change together. `scripts/check.py` needs no new path pattern because the skeleton's own docs carry no status page.
- A repository already migrated to `docs/operations/status.md` moves back to `docs/status.md`; a frozen record that cites the operations path gets a tombstone, per M5. Oshi's 2026-11-16 move is reverted under this decision.
- The operations directory README lists procedures only; the status page is listed by `docs/README.md` like the other top-level role pages.
- The oshi audit's pointer-debt row for `docs/status.md` ("move, then one tombstone") is superseded: the path does not move. The audit remains a dated snapshot; this ADR is the decision.
- The budget stays 8,000 EN / 4,000 ZH; a repository may keep a stricter local cap (oshi's 5,000 total characters, or 4,200 non-whitespace after its cap conversion).
