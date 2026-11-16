# Audit reports

One report per repository, written before its migration. The format is the fixed review format from `docs/governance.md`: severity, role, problem, why, minimal fix.

A report is runtime evidence for the work package; a finding that changes the specification becomes a backlog item in `docs/backlog/`, and a finding that records a choice becomes an ADR. Do not edit the report after its repository has migrated: write a new one.

| Repository | Report             | Disposition                                                                                                                                                                                                                           |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oshi       | [oshi.md](oshi.md) | audit complete; adapters, tasks index, operations split, and the status page at `docs/status.md` committed; contracts, knowledge, and decisions pending; vocabulary is `GLOSSARY.md` (canonical after ADR-0007; no `CONTEXT.md` move) |

ADR-0007 supersedes finding 7 and the `GLOSSARY.md` pointer-debt row in `oshi.md`; the report remains a dated snapshot. The vocabulary is `GLOSSARY.md`; do not move oshi's file to `CONTEXT.md`.
