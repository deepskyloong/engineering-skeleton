# ADR-0003 — Volume budgets measure non-whitespace characters, not lines or words

Status: Accepted (2026-11-14)

## Context

The first draft expressed document budgets in pages, then in lines. A review found that "page" is unmeasurable and that a line budget gives opposite verdicts for documents of similar size. Six documents were measured to settle the unit.

| Document                   | Lines | Non-whitespace chars | `wc -w` words | Chars per line |
| -------------------------- | ----- | -------------------- | ------------- | -------------- |
| bun-toolkit `AGENTS.md`    | 305   | 21,793               | 3,702         | 101            |
| gearset `AGENTS.md`        | 143   | 12,458               | 2,035         | 167            |
| oshi `AGENTS.md` (Chinese) | 50    | 5,891                | 1,051         | 139            |
| python-toolkit `AGENTS.md` | 49    | 3,456                | 569           | 82             |
| oshi `status.md` (Chinese) | 47    | 4,211                | 714           | 105            |
| the v1 spec itself         | 582   | 20,146               | 2,697         | 41             |

## Decision

Volume is measured in non-whitespace characters, excluding table delimiter rows. A delimiter row is formatting, not content; its width follows the formatter and must not consume a reading budget. Entry budgets — indexes, tables, tombstones — are measured in lines, because a line is one entry there. The two units are never combined into one number.

English and Chinese get separate volume limits: EN 16,000 and ZH 8,000 for a root `AGENTS.md`. The ZH limit is half the EN limit because a Chinese character costs roughly 2.7× the tokens of an English character; one shared number would either over-constrain Chinese or under-constrain English.

## Options considered

1. **Lines.** Rejected: characters per line ranged from 41 to 167, a 4× spread. A 200-line budget passes a 12,458-character document and fails a 21,793-character one, although their reading cost differs by less than half.
2. **Words (`wc -w`).** Rejected: word count splits on whitespace, so a Chinese paragraph of 5,891 non-whitespace characters reports about 1,000 words. The unit is meaningless for half the corpus and is only a rough cross-check for English.
3. **Pages.** Rejected earlier: a page depends on renderer, font, and window width. It is not a property of the file.
4. **Non-whitespace characters.** Chosen: one command, one number, independent of formatting.

## Consequences

- The gate needs a character counter, not a line counter. The command is stated in `docs/spec/0004-rules.md` and repeated in the template's conventions page.
- Line counts survive only where the line is the entry. A budget stated without a unit and a command is treated as a finding.
- The ZH/EN split has to be restated wherever a limit is published, or the two limits will be confused.
- A document whose prose is mostly tables will read as expensive per character. That is correct: tables are scanned, not read, and a table-heavy document is usually an index that belongs under an entry budget instead.
