/**
 * Tests for the work-package checks: the ledger and the board as a handoff card.
 */

import { afterEach, describe, expect, test } from 'bun:test'

import { createContext } from './check-context.ts'
import { boardDashboard, packages } from './package-checks.ts'
import { cleanupFixtures, fixture, messages } from './test-fixtures.ts'

afterEach(cleanupFixtures)
describe('packages', () => {
  const boardWithItem =
    '# Board\n\n| Item | Title | Status |\n| --- | --- | --- |\n| [W01](items/W01.md) | One | todo |\n'

  test('an open package carries three ledger files and nothing else', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': '# Board\n',
          'work-packages/x/stray.md': '# X\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual(['unexpected package file: work-packages/x/stray.md'])
  })

  test('an open package without a board is a finding', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual(['missing package file: work-packages/x/board.md'])
  })

  test('an archived package needs its summary', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/archive/y/spec.md': '# S\n',
          'work-packages/archive/y/plan.md': '# P\n',
          'work-packages/archive/y/todo.md': '# T\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([
      'missing package summary: work-packages/archive/y/summary.md',
    ])
  })

  test('an archived package may keep the pre-board shape', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/archive/y/spec.md': '# S\n',
          'work-packages/archive/y/plan.md': '# P\n',
          'work-packages/archive/y/todo.md': '# T\n',
          'work-packages/archive/y/summary.md': '# Summary\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([])
  })

  test('evidence has to be named in the summary', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': '# Board\n',
          'work-packages/x/summary.md': '# Summary\n',
          'work-packages/x/audits/report.md': '# Audit\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([
      'evidence directory not named in summary: work-packages/x/audits/',
    ])
  })

  test('items/ is not evidence and needs no summary row', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': boardWithItem,
          'work-packages/x/summary.md': '# Summary\n',
          'work-packages/x/items/W01.md': '# W01 — One\n\n**Depends on**: none\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([])
  })

  test('a dated summary answers the reader questions', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': '# Board\n',
          'work-packages/x/summary.md': `# Summary

**Date:** 2026-11-21

**Acceptance:** met — all criteria answered

**Gate:** \`bun run gate\` — 2026-11-21, PASS

**Criteria:**

- one criterion — \`bun run gate\`

## Outcome

None.

## Residuals

None.

## Compromises

None.

## Verification

- Survivors: none
- Reproduce: none

Evidence: none
`,
        }),
      ),
    )
    expect(messages(findings)).toEqual([])
  })

  test('a dated summary names every missing part', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': '# Board\n',
          'work-packages/x/summary.md':
            '# Summary\n\n**Date:** 2026-11-21\n\n**Acceptance:** met — ok\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([
      'work-packages/x/summary.md: missing Gate:',
      'work-packages/x/summary.md: missing Criteria:',
      'work-packages/x/summary.md: missing ## Outcome',
      'work-packages/x/summary.md: missing ## Residuals',
      'work-packages/x/summary.md: missing ## Compromises',
      'work-packages/x/summary.md: missing ## Verification',
      'work-packages/x/summary.md: missing Evidence:',
    ])
  })

  test('a summary without Date keeps its pre-change shape', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': '# Board\n',
          'work-packages/x/summary.md': '# Summary\n\n## Done\n\nOld shape.\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([])
  })

  test('an item file must be linked from the board', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': '# Board\n',
          'work-packages/x/items/W01.md': '# W01 — One\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([
      'package item not linked from board: work-packages/x/items/W01.md',
    ])
  })

  test('a board link without a file is a finding', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': boardWithItem,
        }),
      ),
    )
    expect(messages(findings)).toEqual([
      'board links a missing package item: work-packages/x/items/W01.md',
    ])
  })

  test('an item heading must start with its ID', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': boardWithItem,
          'work-packages/x/items/W01.md': '# One\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([
      'package item heading does not start with its ID: work-packages/x/items/W01.md',
    ])
  })

  test('items/ holds only markdown item files', () => {
    const findings = packages(
      createContext(
        fixture({
          'work-packages/x/spec.md': '# S\n',
          'work-packages/x/plan.md': '# P\n',
          'work-packages/x/board.md': boardWithItem,
          'work-packages/x/items/W01.md': '# W01 — One\n',
          'work-packages/x/items/notes.txt': 'x\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual([
      'unexpected entry in package items: work-packages/x/items/notes.txt',
    ])
  })
})

describe('boardDashboard', () => {
  const validBoard = `# Board

## Current state

- Updated: 2026-11-20
- Status: open
- Phase: P1 — work
- Gate: all green (2026-11-20); per-repository detail below
- Next: W02 — start
- Last done: W01 — done (abc1234)
- Blocked: none
- Open decisions: none

## Repositories

| Repository | Branch | Gate command | Last result |
| --- | --- | --- | --- |
| standard | \`main\` | \`bun run gate\` | PASS (2026-11-20) |

## Work items

| Item | Title | Status |
| --- | --- | --- |
| [W01](items/W01.md) | One | done |
| [W02](items/W02.md) | Two | todo |
`

  function packageWithBoard(board: string, extra: Record<string, string> = {}): string {
    return fixture({
      'work-packages/x/spec.md': '# S\n',
      'work-packages/x/plan.md': '# P\n',
      'work-packages/x/board.md': board,
      'work-packages/x/items/W01.md': '# W01 — One\n\n**Evidence**: abc\n',
      'work-packages/x/items/W02.md': '# W02 — Two\n',
      ...extra,
    })
  }

  test('a consistent handoff card is silent', () => {
    const findings = boardDashboard(createContext(packageWithBoard(validBoard)))
    expect(messages(findings)).toEqual([])
  })

  test('Next and Last done stay adjacent', () => {
    const board = validBoard.replace(
      '- Last done: W01 — done (abc1234)\n- Blocked: none',
      '- Blocked: none\n- Last done: W01 — done (abc1234)',
    )
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain('board fields are out of order: work-packages/x/board.md')
  })

  test('an empty field is a finding', () => {
    const board = validBoard.replace(
      '- Gate: all green (2026-11-20); per-repository detail below',
      '- Gate:',
    )
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain('board field is empty: work-packages/x/board.md: Gate')
  })

  test('a Repositories row needs every cell', () => {
    const board = validBoard.replace(
      '| standard | `main` | `bun run gate` | PASS (2026-11-20) |',
      '| standard | `main` | `bun run gate` |  |',
    )
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Repositories row has an empty cell: work-packages/x/board.md',
    )
  })

  test('Next names one item', () => {
    const board = validBoard.replace('- Next: W02 — start', '- Next: W02 — start; W03 — then')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Next names more than one item: work-packages/x/board.md',
    )
  })

  test('Last done names one item', () => {
    const board = validBoard.replace(
      '- Last done: W01 — done (abc1234)',
      '- Last done: W01 — done (abc1234); W02 closed',
    )
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Last done names more than one item: work-packages/x/board.md',
    )
  })

  test('Next points at a todo or doing item, not a done one', () => {
    const board = validBoard.replace('- Next: W02 — start', '- Next: W01 — finish')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Next points at done item: work-packages/x/board.md: W01',
    )
  })

  test('Next none is wrong while an item is todo', () => {
    const board = validBoard.replace('- Next: W02 — start', '- Next: none')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Next is none but an item is todo/doing: work-packages/x/board.md',
    )
  })

  test('Next closeout is wrong while work remains', () => {
    const board = validBoard.replace('- Next: W02 — start', '- Next: closeout — write summary')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Next is closeout but work remains: work-packages/x/board.md',
    )
  })

  test('Blocked none is wrong while an item is blocked', () => {
    const board = validBoard
      .replace('- Next: W02 — start', '- Next: none')
      .replace('| [W02](items/W02.md) | Two | todo |', '| [W02](items/W02.md) | Two | blocked |')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Blocked is none but an item is blocked: work-packages/x/board.md',
    )
  })

  test('Blocked must name every blocked row', () => {
    const board = validBoard
      .replace('- Next: W02 — start', '- Next: none')
      .replace('- Blocked: none', '- Blocked: W01 (done)')
      .replace('| [W02](items/W02.md) | Two | todo |', '| [W02](items/W02.md) | Two | blocked |')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Blocked omits blocked item: work-packages/x/board.md: W02',
    )
  })

  test('Blocked may not name a non-blocked item', () => {
    const board = validBoard.replace('- Blocked: none', '- Blocked: W02 (waiting)')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Blocked names todo item: work-packages/x/board.md: W02',
    )
  })

  test('Blocked clauses carry a reason', () => {
    const board = validBoard
      .replace('- Next: W02 — start', '- Next: none')
      .replace('- Blocked: none', '- Blocked: W02')
      .replace('| [W02](items/W02.md) | Two | todo |', '| [W02](items/W02.md) | Two | blocked |')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Blocked has no reason: work-packages/x/board.md: W02',
    )
  })

  test('Last done points at a done item', () => {
    const board = validBoard.replace('- Last done: W01 — done (abc1234)', '- Last done: W02 — done')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board Last done points at todo item: work-packages/x/board.md: W02',
    )
  })

  test('Status follows the package location', () => {
    const board = validBoard.replace('- Status: open', '- Status: closed')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain('open package board says closed: work-packages/x/board.md')
  })

  test('a dropped item carries a Disposition', () => {
    const board = validBoard
      .replace('- Next: W02 — start', '- Next: none')
      .replace('| [W02](items/W02.md) | Two | todo |', '| [W02](items/W02.md) | Two | dropped |')
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'dropped item has no Disposition: work-packages/x/items/W02.md',
    )
  })

  test('a board without the Repositories table is a finding', () => {
    const board = validBoard.replace(
      /\n## Repositories\n\n[\s\S]*?\n## Work items/,
      '\n## Work items',
    )
    const findings = boardDashboard(createContext(packageWithBoard(board)))
    expect(messages(findings)).toContain(
      'board has no Repositories table: work-packages/x/board.md',
    )
  })
})
