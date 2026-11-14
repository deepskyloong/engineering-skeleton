# ADR-0004 — Type prefixes and four-digit ordinals for numbered files

Status: Accepted (2026-11-14)

## Context

The repository used three numeric forms. Spec pages were `01`–`06`, ADRs were bare `0001`, and backlog items were `B-0001`. In prose, `0001` could mean an ADR or a spec page, and a two-digit spec page would sort before a four-digit record once the set grew. The convention said numbered files use four digits, but the spec pages did not.

## Decision

Every numbered file uses four digits.

- Spec pages: `NNNN-slug.md`, fixed ordinals `0001`–`0006`; they are not auto-incrementing.
- ADRs: `ADR-<nnnn>-slug.md`; the H1 is `# ADR-<nnnn> — ...`.
- Backlog: `B-<nnnn>-slug.md`; the H1 is `# B-<nnnn> — ...`.

A citable record carries a type prefix. The prefix is what makes `ADR-0002` and `B-0002` different in prose; the directory does not travel with the citation.

## Options considered

- Keep bare ADR numbers, because the `decisions/` directory supplies the type. Rejected: a bare `0002` is ambiguous with `B-0002` and with a spec page once citations leave their directory.
- Remove the backlog `B-` prefix. Rejected: backlog and ADR would share one numeric namespace, and index link text would collide.
- Keep two-digit spec pages because they are fixed chapters, not records. Rejected: the file set then has two numbering widths, and the stated four-digit rule has an exception readers must remember.
- Pad spec pages but leave ADRs bare. Rejected: the record-prefix inconsistency remains.

## Consequences

- Every internal link and checker pattern moves once. A migrated repository keeps its existing width and is never renumbered; a new repository starts at `0001`.
- A spec page number is an ordinal, not an ID: cite the page by file name and section, not by number alone.
