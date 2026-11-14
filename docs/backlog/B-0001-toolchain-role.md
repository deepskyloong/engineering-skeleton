# B-0001 — Whether `docs/toolchain/` survives as a role

## Problem

`docs/toolchain/<language>.md` is the most likely place for a documentation skeleton to regress into a dumping ground. The first draft let it hold "measured conclusions"; a review pointed out that measurements belong in `docs/operations/` as commands, and that a page of version numbers and benchmark results goes stale silently. The role is now restricted to reproducible traps with a command that shows the failure, but the restriction has no enforcement.

## Evidence

- The review's finding: a directory whose admission rule is "things we learned about the toolchain" admits everything.
- The narrowed rule (spec 02, "Optional, admitted by trigger"; spec 05, C7) is a review criterion, not a gate.
- No target repository currently has more than one trap file.

## Revisit when

A third trap file is proposed, or two existing traps stop reproducing. Then decide one of three: keep the role with a per-file `Reproduces:` command required; merge it into `docs/operations/` as a "Traps" section; delete it and let traps live in the owning member's operations page.
