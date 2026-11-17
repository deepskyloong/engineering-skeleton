# Summary — rollout-five-repositories

## Done

Opened the five-repository package and audited oshi against the draft roles (`tasks/rollout-oshi/audits/oshi.md`, measured 2026-11-16). The audit and its review produced the specification changes the rollout needed: ADR-0006 (status at `docs/status.md`), ADR-0007 (vocabulary at `GLOSSARY.md`), ADR-0008 (glossary body and map), ADR-0009 (work item ledger and phase breakdown), ADR-0010 (suite tracks are adapters), ADR-0011 (tombstone role), ADR-0015 (ADR width). Oshi's adapter registry, status page, operations split, decisions move (`ADR-0009…0012`), and vocabulary were placed; the work-package handoff and ledger were added to the skeleton.

## Not done

The other four repositories were never audited or migrated. Oshi's charter, contracts, knowledge, and toolchain roles were not moved, and its budget splits and remaining audit findings stayed open. All of it moved to `rollout-oshi`.

## What a future maintainer must know

A five-repository package planned the last four repositories against a spec the first migration was still changing. The unit is one repository: `B-0005` now opens one package per repository, in order, and each package closes before the next opens. A goal change is a new package under `0003`, not a scope reduction, so this package closed rather than carrying the narrower goal.

The package is frozen here at `tasks/archive/rollout-five-repositories/`; `rollout-oshi` carries the migration forward, and `B-0005` is the live programme item.
