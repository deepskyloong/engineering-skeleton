# W04b-ii — Decide whether explanation is a role, then route the five pages

**Depends on**: W04b-i

One ruling opened this unit, and the maintainer made it on 2026-11-19: no new role — the explanation register dissolves into architecture, `GLOSSARY.md`, `docs/operations/` and tombstones. Each of the five pages was then either extracted into a role that admits its job or dropped with the pointer fixes a living reader needs.

**Done when**:

- the ruling is recorded, and every page has a disposition that follows from it
- the pages it lands in pass their admissions and hard lines
- `docs/notes/` holds no live page; the adapter row retires when the last tombstone does

**Evidence**:

- oshi `c4e0a93` — `knowledge/guides/choosing-a-dependency.md` 1,099.
- oshi `869e762` — `GLOSSARY.md` 2,226 → 3,577; `annotation-eval-terms.md` → tombstone; `recall-vs-coverage.md` deleted for having no citer.
- oshi `ac68abe` — `knowledge.md` → tombstone.
- oshi `6205394` — `data-integrity.md` and `recognition-pipeline.md` → tombstones, plus pointers in `README.md`, `embedding-fundamentals.md`, `pitfalls.md` and the pose probe.
- `docs/notes/` holds 10 tombstones and a README that indexes them; the adapter row says "closed"; `git grep` over the five retired paths returns frozen records and the two `Source` lines only; prose 260 files, ruff green.
- No ADR-0014 — ADR-0013's background carries the zero-training rationale. Report in `maps/w04b-role-map.md`.
