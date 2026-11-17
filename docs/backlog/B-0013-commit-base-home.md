# B-0013 — The commit convention base lives outside the norm source

## Problem

`docs/committing.md` points its base at `E:\Projects\personal-agent-kit\rules\commit-conventions.md`, a repository that is not the norm source. The norm source is meant to hold every general norm once, and the commit convention is one of them, so its base belongs here. Until it moves, the pointer stays where it is; a target must not fork the base in the meantime.

## Evidence

- `docs/committing.md` line 3 names the external base; the page records only deviations.
- `template/core/docs/committing.md` already tells a target repository to put `Base: <path or URL>` at the top and record deviations below it, so the pattern is in place and only the authority's home is external.
- When the base moves, the page that holds it becomes an ordinary norm page: one home, and every target's `docs/committing.md` is a pointer plus its own deviations.

## Revisit when

The norm-source model lands, or the commit convention changes — whichever comes first.
