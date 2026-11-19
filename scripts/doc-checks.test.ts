/**
 * Tests for the checks. Each case builds the smallest repository the rule can be
 * violated in, so a rule that stops firing shows up as a failing expectation instead
 * of a quiet green gate.
 */

import { afterEach, describe, expect, test } from 'bun:test'
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

import {
  backlogStatus,
  budgets,
  createContext,
  emptyDirectories,
  english,
  entries,
  explainerSections,
  generated,
  indexAutonomy,
  links,
  markers,
  movedStubs,
  naming,
  packages,
  prose,
  requiredFiles,
  roleCoverage,
  rolePaths,
  runChecks,
  tables,
  type Runner,
} from './doc-checks.ts'

const roots: string[] = []

/** A key ending in `/` creates a directory, so an empty one can be seeded. */
function fixture(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-check-'))
  roots.push(root)
  for (const [key, text] of Object.entries(files)) {
    const target = path.join(root, ...key.split('/'))
    fs.mkdirSync(path.dirname(target), { recursive: true })
    if (key.endsWith('/')) {
      fs.mkdirSync(target, { recursive: true })
    } else {
      fs.writeFileSync(target, text, 'utf8')
    }
  }
  return root
}

function messages(findings: Array<{ message: string }>): string[] {
  return findings.map(finding => finding.message)
}

afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

describe('requiredFiles', () => {
  test('names the file that is missing', () => {
    const findings = requiredFiles(createContext(fixture({ 'README.md': '# R\n' })))
    expect(messages(findings)).toContain('missing required file: GLOSSARY.md')
    expect(messages(findings)).toContain('missing norm page: docs/norm/flow.md')
  })

  test('a complete set is silent', () => {
    const findings = requiredFiles(
      createContext(
        fixture({
          'README.md': '# R\n',
          'AGENTS.md': '# A\n',
          'GLOSSARY.md': '# G\n',
          'docs/workflow.md': '# W\n',
          ...Object.fromEntries(
            [
              'docs/norm/README.md',
              'docs/norm/foundations.md',
              'docs/norm/roles.md',
              'docs/norm/flow.md',
              'docs/norm/rules.md',
              'docs/norm/overlays.md',
              'docs/norm/committing.md',
            ].map(page => [page, '# P\n']),
          ),
        }),
      ),
    )
    expect(findings).toEqual([])
  })
})

describe('roleCoverage', () => {
  test('a directory of pages without a README is a finding', () => {
    const findings = roleCoverage(createContext(fixture({ 'docs/norm/roles.md': '# Roles\n' })))
    expect(messages(findings)).toEqual([
      'missing README: docs/norm/',
      'missing directory: template/',
    ])
  })

  test('a directory of pages without a README stays a finding', () => {
    const findings = roleCoverage(
      createContext(
        fixture({
          'docs/legacy/a.md': '# A\n',
          'docs/legacy/b.md': '# B\n',
          'template/README.md': '# T\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual(['missing README: docs/legacy/'])
  })
})

describe('emptyDirectories', () => {
  test('an empty directory is a finding', () => {
    const findings = emptyDirectories(createContext(fixture({ 'docs/empty/': '' })))
    expect(messages(findings)).toEqual(['empty directory: docs/empty/'])
  })
})

describe('english', () => {
  test('CJK anywhere in a page is a finding', () => {
    const findings = english(createContext(fixture({ 'docs/a.md': 'a sentence 中文 here\n' })))
    expect(messages(findings)).toEqual(['CJK text: docs/a.md'])
  })

  test('full-width punctuation counts as CJK', () => {
    const findings = english(createContext(fixture({ 'docs/a.md': 'stop。\n' })))
    expect(messages(findings)).toEqual(['CJK text: docs/a.md'])
  })
})

describe('links', () => {
  test('a missing target is a finding, an external link is not', () => {
    const findings = links(
      createContext(
        fixture({
          'docs/a.md': '[gone](missing.md) [web](https://example.com) [here](#top)\n',
          'docs/b.md': '[peer](b.md)\n',
        }),
      ),
    )
    expect(messages(findings)).toEqual(['broken link in docs/a.md: missing.md'])
  })
})

describe('budgets', () => {
  test('above the hard line fails and above the soft line warns', () => {
    const hard = budgets(createContext(fixture({ 'AGENTS.md': 'x'.repeat(32_001) })))
    expect(messages(hard)).toEqual(['volume 32001 > 32000 (hard): AGENTS.md'])

    const soft = budgets(createContext(fixture({ 'AGENTS.md': 'x'.repeat(20_001) })))
    expect(soft).toEqual([{ level: 'warn', message: 'volume 20001 > 20000 (soft): AGENTS.md' }])
  })

  test('a file under the soft line is silent', () => {
    expect(budgets(createContext(fixture({ 'AGENTS.md': 'x'.repeat(1_000) })))).toEqual([])
  })
})

describe('entries', () => {
  test('one row over the limit is a finding', () => {
    const rows = ['| A |', '| --- |', ...Array.from({ length: 41 }, () => '| row |')]
    const findings = entries(createContext(fixture({ 'docs/README.md': `${rows.join('\n')}\n` })))
    expect(messages(findings)).toEqual(['entries 41 > 40: docs/README.md'])
  })
})

describe('markers', () => {
  test('a marker survives as a finding', () => {
    const findings = markers(createContext(fixture({ 'docs/a.md': 'TODO: finish\n' })))
    expect(messages(findings)).toEqual(['unfinished marker: docs/a.md'])
  })
})

describe('indexAutonomy', () => {
  test('a total in an index is a finding', () => {
    const findings = indexAutonomy(
      createContext(fixture({ 'docs/README.md': '14 pages live here.\n' })),
    )
    expect(messages(findings)).toEqual([
      "count in index or structure page: docs/README.md: '14 pages'",
    ])
  })
})

describe('naming', () => {
  test('a name outside its role pattern is a finding', () => {
    const findings = naming(createContext(fixture({ 'docs/norm/Roles_File.md': '# R\n' })))
    expect(messages(findings)).toEqual([
      'file name does not match its role: docs/norm/Roles_File.md',
    ])
  })

  test('a retired stub name is not exempt', () => {
    const findings = naming(
      createContext(fixture({ 'docs/Notes.md': '# Old — moved\n\n[New](new.md)\n' })),
    )
    expect(messages(findings)).toEqual(['file name does not match its role: docs/Notes.md'])
  })
})

describe('rolePaths', () => {
  test('a docs page outside the role map is a finding', () => {
    const findings = rolePaths(createContext(fixture({ 'docs/unknown.md': '# U\n' })))
    expect(messages(findings)).toEqual([
      'docs page does not map to a declared role: docs/unknown.md',
    ])
  })

  test('an admitted page passes', () => {
    expect(rolePaths(createContext(fixture({ 'docs/charter.md': '# C\n' })))).toEqual([])
  })

  test('the suite-track map is an admitted page', () => {
    expect(rolePaths(createContext(fixture({ 'docs/suite-tracks.md': '# S\n' })))).toEqual([])
  })
})

describe('movedStubs', () => {
  test('a file left at a moved path is a finding', () => {
    const findings = movedStubs(
      createContext(fixture({ 'docs/old.md': '# Old — moved\n\n[New](new.md)\n' })),
    )
    expect(messages(findings)).toEqual([
      'forwarding stub not admitted: docs/old.md — delete it and register the moved path in docs/adapters.md',
    ])
  })

  test('a live page is not a stub', () => {
    expect(
      movedStubs(createContext(fixture({ 'docs/live.md': '# Live\n\n[New](new.md)\n' }))),
    ).toEqual([])
  })
})

describe('tables', () => {
  test('column padding is a finding', () => {
    const findings = tables(createContext(fixture({ 'docs/a.md': '| a  | b |\n| --- | --- |\n' })))
    expect(messages(findings)[0]).toBe(
      'docs/a.md:1: table cell is column-aligned; one space on each side',
    )
  })

  test('a cell count that differs from the header is a finding', () => {
    const findings = tables(createContext(fixture({ 'docs/a.md': '| a | b |\n| one |\n' })))
    expect(messages(findings)[0]).toBe(
      'docs/a.md:2: 1 cells, header has 2; escape a literal pipe as \\|',
    )
  })

  test('a table inside a fence is left alone', () => {
    const findings = tables(createContext(fixture({ 'docs/a.md': '```\n| a  | b |\n```\n' })))
    expect(findings).toEqual([])
  })
})

describe('backlogStatus', () => {
  test('a status outside the four is a finding', () => {
    const text = '| # | Item | Status |\n| --- | --- | --- |\n| B-0001 | x | doing |\n'
    const findings = backlogStatus(createContext(fixture({ 'docs/backlog/README.md': text })))
    expect(messages(findings)).toEqual(["docs/backlog/README.md:3: unknown backlog status 'doing'"])
  })

  test('a spelled status passes', () => {
    const text = '| # | Item | Status |\n| --- | --- | --- |\n| B-0001 | x | paused |\n'
    expect(backlogStatus(createContext(fixture({ 'docs/backlog/README.md': text })))).toEqual([])
  })
})

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

describe('generated', () => {
  test('a generated header needs a blank line after it', () => {
    const findings = generated(
      createContext(fixture({ 'dist/index.md': 'generated by x — do not edit\nbody\n' })),
    )
    expect(messages(findings)).toEqual([
      'generated header needs a blank second line: dist/index.md',
    ])
  })

  test('a file inside a generated path needs the header', () => {
    const findings = generated(createContext(fixture({ 'dist/index.md': '# Hand written\n' })))
    expect(messages(findings)).toEqual(['generated file lacks header: dist/index.md'])
  })
})

describe('prose', () => {
  const root = (): string => fixture({ 'docs/norm/roles.md': '# Roles\n' })

  test('an unset project is a failure, not a skip', () => {
    expect(messages(prose(createContext(root()), { project: '' }))).toEqual([
      'prose check: MD_TOOLS_PROJECT is not set to the python-toolkit checkout',
    ])
  })

  test('a process that cannot start is a failure', () => {
    const run: Runner = () => ({
      status: null,
      stdout: '',
      stderr: '',
      error: { message: 'spawn uv ENOENT' },
    })
    expect(messages(prose(createContext(root()), { project: 'p', run }))).toEqual([
      'prose check: md-reflow could not run: spawn uv ENOENT',
    ])
  })

  test('an exit code outside 0/1/2 is a failure', () => {
    const run: Runner = () => ({ status: 7, stdout: '', stderr: 'boom\nsecond line' })
    expect(messages(prose(createContext(root()), { project: 'p', run }))).toEqual([
      'prose check: md-reflow failed (exit 7): second line',
    ])
  })

  test('the report names the wrapped file and the unreadable count', () => {
    const directory = root()
    const run: Runner = (_command, args) => {
      const report = args[args.indexOf('--json') + 1]
      fs.writeFileSync(
        report,
        JSON.stringify({
          files: [{ path: path.join(directory, 'docs', 'norm', 'roles.md'), blocks: 3 }],
          files_skipped: 2,
        }),
      )
      return { status: 1, stdout: '', stderr: '' }
    }
    expect(messages(prose(createContext(directory), { project: 'p', run }))).toEqual([
      'prose is hard-wrapped: docs/norm/roles.md — 3 block(s), run md-reflow --apply',
      'prose check: 2 file(s) could not be read (mixed line endings)',
    ])
  })
})

describe('runChecks', () => {
  const missingProject = 'prose check: MD_TOOLS_PROJECT is not set to the python-toolkit checkout'

  test('runs the prose stage by default', () => {
    const context = createContext(fixture({ 'docs/norm/roles.md': '# Roles\n' }))
    expect(messages(runChecks(context, { project: '' }))).toContain(missingProject)
  })

  test('leaves it out only when the caller asks', () => {
    const context = createContext(fixture({ 'docs/norm/roles.md': '# Roles\n' }))
    expect(messages(runChecks(context, { project: '', skipProse: true }))).not.toContain(
      missingProject,
    )
  })
})

describe('explainerSections', () => {
  test('a section that links nothing is a finding, and the first section is exempt', () => {
    const root = fixture({
      'docs/knowledge/explainers/tour.md':
        '# Tour\n\n| | |\n|---|---|\n| Role | explainer |\n\n## Why read this\n\nNo link here.\n\n## The first stage\n\nThe fact lives in the page that owns it.\n',
    })
    expect(messages(explainerSections(createContext(root)))).toEqual([
      'explainer section links nothing: docs/knowledge/explainers/tour.md: ## The first stage',
    ])
  })

  test('a section that ends at its owner passes, and a guide is not held to the rule', () => {
    const root = fixture({
      'docs/knowledge/explainers/tour.md':
        '# Tour\n\n## Why read this\n\nNo link here.\n\n## The first stage\n\nSee [architecture](../../architecture/system.md).\n',
      'docs/knowledge/guides/method.md': '# Method\n\n## Steps\n\nNo link here.\n',
    })
    expect(messages(explainerSections(createContext(root)))).toEqual([])
  })
})
