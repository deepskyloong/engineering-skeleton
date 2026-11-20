# W04b-i — Extract the admitted jobs from the residue

**Depends on**: W04

Two of the six pages hold a job that is admitted and homeless: `recognition-pipeline.md` §3's tuning method (a guide) and `classifier-vs-prototype.md`'s choice with a rejected alternative (an ADR). The other four hold no job a role takes, so they wait for the ruling in W04b-ii. A page that duplicates a contract or architecture page is retired with a tombstone, not relabelled to fit; the freeze holds while this runs.

**Done when**:

- the method and the decision each have one home, and no page states the same rule twice
- the retired path is a tombstone and its frozen citers resolve
- oshi's gate is green

**Evidence**:

- oshi `a9300cc` — `knowledge/guides/threshold-binding.md` 1,292; `recognition-pipeline.md` §3 becomes a pointer.
- oshi `adbebc5` — `decisions/ADR-0013-no-in-project-classifier.md` 4,047; `classifier-vs-prototype.md` becomes a 132-character tombstone; index rows added.
- Gates: prose 260 files, ruff green, every relative link resolves; `git grep` over the retired path returns three frozen records.
- `data-integrity.md` held no claim that was not already stated elsewhere, so it had nothing to merge; the per-page pass is in `maps/w04b-role-map.md`.
