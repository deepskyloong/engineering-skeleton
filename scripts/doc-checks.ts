/**
 * The checks themselves: one function per rule, each a pure function of a `Context`
 * and each returning findings instead of writing into shared state. The caller decides
 * what a finding becomes — a line on stdout here, an expectation in a test elsewhere.
 *
 * A check never reads a file twice: `Context` parses once and caches, which is why the
 * Python original's five reads per markdown file are now one.
 */

import { spawnSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

import {
  BACKLOG_STATUSES,
  budgetFor,
  CJK,
  CODE_SPAN,
  COUNT_NOUN,
  DOC_ROLE_PATHS,
  entryLimit,
  GENERATED_DIRS,
  INDEX_PAGES,
  LINK,
  matchesFully,
  MOVED_MARKER,
  namingPattern,
  pyRepr,
  pyStrip,
  ROLE_NAMES,
  SKIP_PARTS,
  splitCells,
  splitLines,
  TABLE_DELIMITER,
  TABLE_ROW,
  tableEntries,
  volume,
  type Finding,
  fail,
  warn,
} from './docs-model.ts'

export interface DirEntry {
  name: string
  isFile: boolean
  isDirectory: boolean
}

export interface Context {
  root: string
  /** Markdown keys, repository-relative, posix, sorted. */
  files: string[]
  /** Every directory key, repository-relative, posix, sorted. */
  directories: string[]
  absolute(key: string): string
  exists(key: string): boolean
  isFile(key: string): boolean
  readText(key: string): string
  readDir(key: string): DirEntry[]
}

const MARKER = /\b(TODO|TBD|FIXME)\b/
const BACKLOG_INDEXES = new Set([
  'docs/backlog/README.md',
  'template/first-use/docs/backlog/README.md',
])

/** A repository, read once. The only place in the branch where the filesystem is touched. */
export function createContext(root: string): Context {
  const absolute = (key: string): string => path.resolve(root, key)
  const toKey = (target: string): string => path.relative(root, target).split(path.sep).join('/')

  const files: string[] = []
  const directories: string[] = []
  const walk = (directory: string): void => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const child = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        directories.push(toKey(child))
        walk(child)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const key = toKey(child)
        if (!key.split('/').some(part => SKIP_PARTS.has(part))) {
          files.push(key)
        }
      }
    }
  }
  walk(root)

  const byKey = (left: string, right: string): number => (left < right ? -1 : left > right ? 1 : 0)
  files.sort(byKey)
  directories.sort(byKey)

  const texts = new Map<string, string>()
  const listings = new Map<string, DirEntry[]>()

  return {
    root,
    files,
    directories,
    absolute,
    exists: key => fs.existsSync(absolute(key)),
    isFile: key => fs.statSync(absolute(key), { throwIfNoEntry: false })?.isFile() === true,
    readText: key => {
      const cached = texts.get(key)
      if (cached !== undefined) {
        return cached
      }
      const text = fs.readFileSync(absolute(key), 'utf8')
      texts.set(key, text)
      return text
    },
    readDir: key => {
      const cached = listings.get(key)
      if (cached !== undefined) {
        return cached
      }
      const entries = fs
        .readdirSync(absolute(key), { withFileTypes: true })
        .map(entry => ({
          name: entry.name,
          isFile: entry.isFile(),
          isDirectory: entry.isDirectory(),
        }))
        .sort((left, right) => byKey(left.name, right.name))
      listings.set(key, entries)
      return entries
    },
  }
}

function baseName(key: string): string {
  return key.slice(key.lastIndexOf('/') + 1)
}

export function requiredFiles(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const name of ['README.md', 'AGENTS.md', 'GLOSSARY.md', 'docs/workflow.md']) {
    if (!context.exists(name)) {
      findings.push(fail(`missing required file: ${name}`))
    }
  }
  for (const page of [
    'docs/norm/README.md',
    'docs/norm/foundations.md',
    'docs/norm/roles.md',
    'docs/norm/flow.md',
    'docs/norm/rules.md',
    'docs/norm/overlays.md',
    'docs/norm/committing.md',
  ]) {
    if (!context.exists(page)) {
      findings.push(fail(`missing norm page: ${page}`))
    }
  }
  return findings
}

/** Every live and archived package, with archived as the flag. */
function packageDirs(context: Context): Array<{ key: string; archived: boolean }> {
  if (!context.exists('work-packages')) {
    return []
  }
  const live = context
    .readDir('work-packages')
    .filter(entry => entry.isDirectory && entry.name !== 'archive')
    .map(entry => ({ key: `work-packages/${entry.name}`, archived: false }))
  const archived = context.exists('work-packages/archive')
    ? context
        .readDir('work-packages/archive')
        .filter(entry => entry.isDirectory)
        .map(entry => ({ key: `work-packages/archive/${entry.name}`, archived: true }))
    : []
  return [...live, ...archived]
}

/**
 * A package carries its ledger files and names the evidence directories it owns.
 *
 * ADR-0021: four ledger files by closeout, evidence directories on demand. `summary.md`
 * is written at closeout, so it is required only in the archive; an open package may
 * carry three ledger files. Every top-level directory is evidence and must be named in
 * the summary once one exists. A file beside the ledger is a fifth file, not evidence.
 */
export function packages(context: Context): Finding[] {
  const findings: Finding[] = []
  const ledger = new Set(['spec.md', 'plan.md', 'todo.md', 'summary.md'])
  for (const { key, archived } of packageDirs(context)) {
    for (const name of ['spec.md', 'plan.md', 'todo.md']) {
      if (!context.isFile(`${key}/${name}`)) {
        findings.push(fail(`missing package file: ${key}/${name}`))
      }
    }
    const summary = `${key}/summary.md`
    if (archived && !context.isFile(summary)) {
      findings.push(fail(`missing package summary: ${summary}`))
    }
    for (const child of context.readDir(key)) {
      if (child.isFile && !ledger.has(child.name)) {
        findings.push(fail(`unexpected package file: ${key}/${child.name}`))
      }
    }
    if (!context.isFile(summary)) {
      continue
    }
    const text = context.readText(summary)
    for (const child of context.readDir(key)) {
      if (child.isDirectory && !text.includes(child.name)) {
        findings.push(fail(`evidence directory not named in summary: ${key}/${child.name}/`))
      }
    }
  }
  return findings
}

/** Every directory that holds markdown carries a README. */
export function roleCoverage(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const base of ['docs', 'template']) {
    if (!context.exists(base)) {
      findings.push(fail(`missing directory: ${base}/`))
      continue
    }
    for (const directory of context.directories.filter(key => key.startsWith(`${base}/`))) {
      const pages = context
        .readDir(directory)
        .filter(entry => entry.isFile && entry.name.endsWith('.md'))
        .map(entry => `${directory}/${entry.name}`)
      if (pages.length === 0) {
        continue
      }
      if (!context.exists(`${directory}/README.md`)) {
        findings.push(fail(`missing README: ${directory}/`))
      }
    }
  }
  return findings
}

export function emptyDirectories(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const directory of context.directories) {
    const parts = directory.split('/')
    if (parts.includes('.git') || parts.includes('__pycache__')) {
      continue
    }
    if (context.readDir(directory).length === 0) {
      findings.push(fail(`empty directory: ${directory}/`))
    }
  }
  return findings
}

export function english(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    if (CJK.test(context.readText(key))) {
      findings.push(fail(`CJK text: ${key}`))
    }
  }
  return findings
}

export function links(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    for (const match of context.readText(key).matchAll(LINK)) {
      const target = match[1]
      if (target.startsWith('http://') || target.startsWith('https://')) {
        continue
      }
      if (target.startsWith('mailto:') || target.startsWith('#')) {
        continue
      }
      const bare = pyStrip(target.split('#')[0])
      if (!bare) {
        continue
      }
      const targetPath = path.resolve(context.root, path.dirname(key), bare)
      if (!fs.existsSync(targetPath)) {
        findings.push(fail(`broken link in ${key}: ${target}`))
      }
    }
  }
  return findings
}

export function budgets(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    const limits = budgetFor(key, baseName(key))
    if (!limits) {
      continue
    }
    const [soft, hard] = limits
    const measured = volume(context.readText(key))
    if (measured > hard) {
      findings.push(fail(`volume ${measured} > ${hard} (hard): ${key}`))
    } else if (measured > soft) {
      findings.push(warn(`volume ${measured} > ${soft} (soft): ${key}`))
    }
  }
  return findings
}

export function entries(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    const limit = entryLimit(key)
    if (limit === null) {
      continue
    }
    const measured = tableEntries(context.readText(key))
    if (measured > limit) {
      findings.push(fail(`entries ${measured} > ${limit}: ${key}`))
    }
  }
  return findings
}

export function markers(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    if (MARKER.test(context.readText(key))) {
      findings.push(fail(`unfinished marker: ${key}`))
    }
  }
  return findings
}

/** Indexes and structure pages carry no totals: a count is a number that goes stale. */
export function indexAutonomy(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of INDEX_PAGES) {
    if (!context.exists(key)) {
      continue
    }
    for (const match of context.readText(key).matchAll(COUNT_NOUN)) {
      findings.push(fail(`count in index or structure page: ${key}: ${pyRepr(match[0])}`))
    }
  }
  return findings
}

export function naming(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    const name = baseName(key)
    if (ROLE_NAMES.has(name)) {
      continue
    }
    if (!namingPattern(key).test(name)) {
      findings.push(fail(`file name does not match its role: ${key}`))
    }
  }
  return findings
}

export function rolePaths(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    if (!key.startsWith('docs/')) {
      continue
    }
    if (!DOC_ROLE_PATHS.some(pattern => pattern.test(key))) {
      findings.push(fail(`docs page does not map to a declared role: ${key}`))
    }
  }
  return findings
}

/**
 * A forwarding stub is not admitted (ADR-0028).
 *
 * The moved path belongs in `docs/adapters.md`; a file left at the old path reads as
 * content in every listing and cannot carry the successor's provenance.
 */
export function movedStubs(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    const title = splitLines(context.readText(key))[0]
    if (title && pyStrip(title).endsWith(MOVED_MARKER)) {
      findings.push(
        fail(
          `forwarding stub not admitted: ${key} — delete it and register the moved path in docs/adapters.md`,
        ),
      )
    }
  }
  return findings
}

/**
 * An explainer ends each section at the page that owns its fact.
 *
 * A section with no link states something nobody owns, which is how a teaching page turns
 * into a second home (`docs/norm/roles.md`, the explainer row). The front matter and the
 * first section are exempt: the first says why the page exists, not a fact.
 */
export function explainerSections(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    if (!key.startsWith('docs/knowledge/explainers/') || baseName(key) === 'README.md') {
      continue
    }
    const sections = context.readText(key).split('\n## ').slice(2)
    for (const section of sections) {
      const heading = section.split('\n')[0].trim()
      if (!/\[[^\]]*\]\([^)]+\)/.test(section)) {
        findings.push(fail(`explainer section links nothing: ${key}: ## ${heading}`))
      }
    }
  }
  return findings
}

/**
 * A table row carries one space per cell; column padding is a finding.
 *
 * Padding is a formatting decision that hides the changed row in a diff and hands every
 * untouched row to the reformat commit in `git blame` (`docs/norm/rules.md`, R12). A cell
 * count that differs from the header is also reported: the formatter skips such a table,
 * and the default printer would pad it again.
 */
export function tables(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    let inFence = false
    let columns: number | null = null
    splitLines(context.readText(key)).forEach((line, index) => {
      const number = index + 1
      const stripped = pyStrip(line)
      if (stripped.startsWith('```') || stripped.startsWith('~~~')) {
        inFence = !inFence
        columns = null
        return
      }
      if (inFence) {
        return
      }
      if (!TABLE_ROW.test(stripped)) {
        columns = null
        return
      }
      const cells = splitCells(stripped)
      if (columns === null) {
        columns = cells.length
      } else if (cells.length !== columns) {
        findings.push(
          fail(
            `${key}:${number}: ${cells.length} cells, header has ${columns}; ` +
              'escape a literal pipe as \\|',
          ),
        )
      }
      for (const cell of cells) {
        const content = pyStrip(cell)
        if (content === '') {
          continue
        }
        if (cell !== ` ${content} `) {
          findings.push(
            fail(`${key}:${number}: table cell is column-aligned; one space on each side`),
          )
        }
        if (content.replace(CODE_SPAN, 'x').includes('  ')) {
          findings.push(fail(`${key}:${number}: table cell has a run of spaces`))
        }
      }
    })
  }
  return findings
}

/**
 * The backlog index carries one of four statuses, and a typo is a finding.
 *
 * Status is the only column a reader filters the queue by, and it lives in the index
 * rather than in the item file (`docs/norm/roles.md`, "Backlog index"), so a misspelled
 * state has no second copy to correct it.
 */
export function backlogStatus(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    if (!BACKLOG_INDEXES.has(key)) {
      continue
    }
    let header: string[] | null = null
    splitLines(context.readText(key)).forEach((line, index) => {
      const number = index + 1
      const stripped = pyStrip(line)
      if (!TABLE_ROW.test(stripped)) {
        header = null
        return
      }
      const cells = splitCells(stripped)
      if (header === null) {
        header = cells
        return
      }
      if (matchesFully(TABLE_DELIMITER, stripped)) {
        return
      }
      const status = cells.length > 2 ? pyStrip(cells[2]) : ''
      if (!BACKLOG_STATUSES.has(status)) {
        findings.push(fail(`${key}:${number}: unknown backlog status ${pyRepr(status)}`))
      }
    })
  }
  return findings
}

export function generated(context: Context): Finding[] {
  const findings: Finding[] = []
  for (const key of context.files) {
    const lines = splitLines(context.readText(key))
    if (lines.length > 0 && lines[0].startsWith('generated by')) {
      if (lines.length < 2 || pyStrip(lines[1]) !== '') {
        findings.push(fail(`generated header needs a blank second line: ${key}`))
      }
    }
  }
  for (const name of GENERATED_DIRS) {
    if (!context.exists(name)) {
      continue
    }
    for (const key of context.files.filter(item => item.startsWith(`${name}/`))) {
      const lines = splitLines(context.readText(key))
      if (lines.length === 0 || !lines[0].startsWith('generated by')) {
        findings.push(fail(`generated file lacks header: ${key}`))
      }
    }
  }
  return findings
}

export interface RunResult {
  status: number | null
  stdout: string
  stderr: string
  error?: { message: string }
}

export type Runner = (command: string, args: string[], env: Record<string, string>) => RunResult

export interface ProseOptions {
  /** Defaults to `MD_TOOLS_PROJECT`. A test passes a value to skip the environment. */
  project?: string
  /** Defaults to a real `uv` process; a test passes a fake to cover the exit codes. */
  run?: Runner
}

export interface RunOptions extends ProseOptions {
  /**
   * Leave the prose stage out. Only CI passes this, because `md-tools` lives outside
   * this repository; the flag is explicit in the workflow so the omission is visible
   * where it happens, and the pass line names it (ADR-0025).
   */
  skipProse?: boolean
}

const runProcess: Runner = (command, args, env) => {
  const completed = spawnSync(command, args, { encoding: 'utf8', env })
  return {
    status: completed.status,
    stdout: typeof completed.stdout === 'string' ? completed.stdout : '',
    stderr: typeof completed.stderr === 'string' ? completed.stderr : '',
    error: completed.error ?? undefined,
  }
}

/**
 * Every paragraph is one line. The rule lives in `md-tools`; this stage calls it.
 *
 * The project root comes from `MD_TOOLS_PROJECT` because a machine-local path does not
 * belong in a file. A missing project, a code outside 0/1/2, or a report that did not get
 * written is a failure, never a skip: a prose check that passes because the tool was
 * absent is the failure this stage exists to catch (`docs/norm/rules.md`, the prose bullet
 * under "Naming and citation").
 */
export function prose(context: Context, options: ProseOptions = {}): Finding[] {
  const project = pyStrip(options.project ?? process.env.MD_TOOLS_PROJECT ?? '')
  if (!project) {
    return [fail('prose check: MD_TOOLS_PROJECT is not set to the python-toolkit checkout')]
  }
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'check-'))
  try {
    const listing = path.join(directory, 'files.txt')
    const report = path.join(directory, 'report.json')
    fs.writeFileSync(
      listing,
      `${context.files.map(key => context.absolute(key)).join('\n')}\n`,
      'utf8',
    )
    const args = [
      'run',
      '--project',
      project,
      '--package',
      'md-tools',
      'md-reflow',
      '--check',
      '--quiet',
      '--list-file',
      listing,
      '--json',
      report,
    ]
    const environment: Record<string, string> = {}
    for (const [name, value] of Object.entries(process.env)) {
      if (name === 'VIRTUAL_ENV' || name === 'PYTHONHOME' || value === undefined) {
        continue
      }
      environment[name] = value
    }
    const completed = (options.run ?? runProcess)('uv', args, environment)
    if (completed.error) {
      return [fail(`prose check: md-reflow could not run: ${completed.error.message}`)]
    }
    const code = completed.status ?? -1
    if (![0, 1, 2].includes(code) || !fs.existsSync(report)) {
      const detail = splitLines(pyStrip(completed.stderr || completed.stdout || ''))
      const tail = detail.length > 0 ? detail[detail.length - 1] : 'no output'
      return [fail(`prose check: md-reflow failed (exit ${code}): ${tail}`)]
    }
    const findings: Finding[] = []
    const payload = JSON.parse(fs.readFileSync(report, 'utf8')) as {
      files?: unknown
      files_skipped?: unknown
    }
    const rows = Array.isArray(payload.files) ? payload.files : []
    for (const row of rows) {
      const name = String((row as { path: unknown }).path)
      const relativePath = path.relative(context.root, path.resolve(name))
      const key =
        relativePath.startsWith('..') || path.isAbsolute(relativePath)
          ? name.split(path.sep).join('/')
          : relativePath.split(path.sep).join('/')
      const blocks = (row as { blocks: unknown }).blocks
      findings.push(
        fail(`prose is hard-wrapped: ${key} — ${blocks} block(s), run md-reflow --apply`),
      )
    }
    const skipped = Number(payload.files_skipped ?? 0)
    if (skipped) {
      findings.push(fail(`prose check: ${skipped} file(s) could not be read (mixed line endings)`))
    }
    return findings
  } finally {
    fs.rmSync(directory, { recursive: true, force: true })
  }
}

/** Run every check in the order `docs/norm/rules.md` lists them. */
export function runChecks(context: Context, options: RunOptions = {}): Finding[] {
  return [
    ...requiredFiles(context),
    ...packages(context),
    ...roleCoverage(context),
    ...emptyDirectories(context),
    ...english(context),
    ...links(context),
    ...budgets(context),
    ...entries(context),
    ...markers(context),
    ...indexAutonomy(context),
    ...naming(context),
    ...rolePaths(context),
    ...movedStubs(context),
    ...explainerSections(context),
    ...tables(context),
    ...backlogStatus(context),
    ...generated(context),
    ...(options.skipProse ? [] : prose(context, options)),
  ]
}
