/**
 * Gate for the repository-standard repository.
 *
 * Checks what can be checked mechanically. Prose *quality* and cross-file semantic
 * duplication are review criteria, not a gate; prose *form* is one, and the stage
 * below delegates it to the `md-tools` CLI so the block model has one implementation.
 *
 * The Python original measured text with `str.splitlines()`, `str.strip()`, and Unicode
 * `\s`/`\b`. Those helpers below reproduce the same character sets so a volume number
 * does not move because the checker changed language.
 */

import { spawnSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

const ROOT = path.resolve(import.meta.dir, '..')

const FAILURES: string[] = []
const WARNINGS: string[] = []

/** Python's `str.isspace()` set, minus the `\ufeff` that only JavaScript strips. */
const PY_WS =
  ' \\t\\n\\r\\v\\f\\x1c-\\x1f\\x85\\xa0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000'
const PY_STRIP = new RegExp(`^[${PY_WS}]+|[${PY_WS}]+$`, 'g')
const PY_SPACE = new RegExp(`[${PY_WS}]`, 'g')

/** Python's `str.splitlines()` boundaries. */
const LINE_BREAK = /\r\n|\r|\n|\v|\f|\x1c|\x1d|\x1e|\x85|\u2028|\u2029/
const LINE_BREAK_AT_END = /\r\n|\r|\n|\v|\f|\x1c|\x1d|\x1e|\x85|\u2028|\u2029$/

const TABLE_DELIMITER = new RegExp(`\\|[${PY_WS}:|-]+\\|`)
const TABLE_ROW = /^\|.*\|$/
const CODE_SPAN = /`[^`]*`/g
const SKIP_PARTS = new Set(['.git', 'node_modules', '__pycache__'])
const BACKLOG_STATUSES = new Set(['open', 'active', 'paused', 'closed'])

const CJK = /[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/
const LINK = /\[[^\]]*\]\(([^)]+)\)/g
const TOMBSTONE_SUFFIX = '— moved'
/** `\b` and `\d` are ASCII in JavaScript; R8 keeps this tree ASCII outside code fences. */
const COUNT_NOUN =
  /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(pages?|documents?|files?|entries|items|adrs?)\b/gi
const ROLE_NAMES = new Set([
  'README.md',
  'AGENTS.md',
  'GLOSSARY.md',
  'GLOSSARY-MAP.md',
  '_template.md',
])

const DOC_ROLE_PATHS = [
  'docs/README\\.md',
  'docs/(charter|structure|conventions|committing|governance|workflow|status)\\.md',
  'docs/adapters\\.md',
  'docs/norm/(README|[a-z0-9-]+)\\.md',
  'docs/decisions/(README|ADR-\\d{4}-[a-z0-9-]+)\\.md',
  'docs/backlog/(README|B-\\d{4}-[a-z0-9-]+)\\.md',
  'docs/contracts/(README|[a-z0-9-]+)\\.md',
  'docs/architecture/(README|[a-z0-9-]+)\\.md',
  'docs/operations/(README|[a-z0-9-]+)\\.md',
  'docs/toolchain/(README|[a-z0-9-]+)\\.md',
  'docs/knowledge/(README|(guides|cases|notes)/(README|[a-z0-9-]+))\\.md',
].map(source => new RegExp(`^(?:${source})$`))

const EXACT_BUDGETS = new Map<string, [number, number]>([
  ['AGENTS.md', [20_000, 32_000]],
  ['README.md', [10_000, 16_000]],
  ['GLOSSARY.md', [7_500, 12_000]],
  ['GLOSSARY-MAP.md', [2_500, 4_000]],
  ['docs/README.md', [6_000, 12_000]],
  ['docs/committing.md', [5_000, 8_000]],
  ['docs/norm/README.md', [6_000, 12_000]],
  ['docs/decisions/README.md', [6_000, 12_000]],
  ['docs/backlog/README.md', [8_000, 16_000]],
  ['template/README.md', [6_000, 12_000]],
  ['template/core/AGENTS.md', [20_000, 32_000]],
  ['template/core/README.md', [10_000, 16_000]],
  ['template/core/docs/committing.md', [5_000, 8_000]],
  ['template/first-use/docs/backlog/README.md', [8_000, 16_000]],
  ['template/overlays/README.md', [6_000, 12_000]],
])

const ENTRY_LIMITS = new Map<string, number>([
  ['docs/README.md', 40],
  ['docs/decisions/README.md', 40],
  ['docs/backlog/README.md', 60],
  ['template/README.md', 40],
])

const GENERATED_DIRS = ['dist']

const INDEX_PAGES = [
  'docs/README.md',
  'docs/decisions/README.md',
  'docs/backlog/README.md',
  'template/README.md',
  'docs/structure.md',
  'template/core/docs/structure.md',
]

function rel(file: string): string {
  return path.relative(ROOT, file).split(path.sep).join('/')
}

function fail(message: string): void {
  FAILURES.push(message)
}

function warn(message: string): void {
  WARNINGS.push(message)
}

/** Python's `str.splitlines()`: every boundary splits, and a trailing break adds no empty line. */
function splitLines(text: string): string[] {
  if (text === '') {
    return []
  }
  const lines = text.split(LINE_BREAK)
  if (LINE_BREAK_AT_END.test(text)) {
    lines.pop()
  }
  return lines
}

/** Python's `str.strip()`. */
function pyStrip(value: string): string {
  return value.replace(PY_STRIP, '')
}

/** Python's `repr()` for the one message that quotes a matched string. */
function pyRepr(value: string): string {
  const quote = value.includes("'") && !value.includes('"') ? '"' : "'"
  const body = value
    .replace(/\\/g, '\\\\')
    .replace(new RegExp(quote, 'g'), `\\${quote}`)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
  return `${quote}${body}${quote}`
}

function read(file: string): string {
  return fs.readFileSync(file, 'utf8')
}

interface Walk {
  files: string[]
  directories: string[]
}

function walk(directory: string, result: Walk): void {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const child = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      result.directories.push(child)
      walk(child, result)
    } else if (entry.isFile()) {
      result.files.push(child)
    }
  }
}

function tree(): Walk {
  const result: Walk = { files: [], directories: [] }
  walk(ROOT, result)
  return result
}

function sortedByKey(files: string[]): string[] {
  return [...files].sort((left, right) => {
    const a = rel(left)
    const b = rel(right)
    return a < b ? -1 : a > b ? 1 : 0
  })
}

function markdownFiles(): string[] {
  return sortedByKey(
    tree().files.filter(file => {
      if (!file.endsWith('.md')) {
        return false
      }
      const parts = path.relative(ROOT, file).split(path.sep)
      return !parts.some(part => SKIP_PARTS.has(part))
    }),
  )
}

function volume(text: string): number {
  const lines = splitLines(text).filter(line => !matchesFully(TABLE_DELIMITER, line))
  return lines.join('\n').replace(PY_SPACE, '').length
}

function matchesFully(pattern: RegExp, value: string): boolean {
  const anchored = new RegExp(`^(?:${pattern.source})$`, pattern.flags.replace('g', ''))
  return anchored.test(value)
}

function tableEntries(text: string): number {
  const rows = splitLines(text)
    .filter(line => line.startsWith('|'))
    .filter(line => !matchesFully(TABLE_DELIMITER, line))
  return Math.max(rows.length - 1, 0)
}

function tombstoneState(file: string): { isTombstone: boolean; issue: string | null } {
  const text = read(file)
  const lines = splitLines(text).filter(line => pyStrip(line) !== '')
  const title = lines[0]
  if (
    !title ||
    !title.startsWith('# ') ||
    !title.replace(PY_STRIP, '').endsWith(TOMBSTONE_SUFFIX)
  ) {
    return { isTombstone: false, issue: null }
  }
  if (lines.length > 3) {
    return { isTombstone: true, issue: `${lines.length} non-empty lines, max 3` }
  }
  const links = [...text.matchAll(LINK)]
  if (links.length !== 1) {
    return { isTombstone: true, issue: `${links.length} links, expected 1` }
  }
  const measured = volume(text)
  if (measured > 400) {
    return { isTombstone: true, issue: `volume ${measured} > 400` }
  }
  return { isTombstone: true, issue: null }
}

function budgetFor(key: string, name: string): [number, number] | null {
  const exact = EXACT_BUDGETS.get(key)
  if (exact) {
    return exact
  }
  if (key.startsWith('work-packages/') && name === 'summary.md') {
    return [3_750, 6_000]
  }
  if (key.startsWith('docs/decisions/')) {
    return [7_500, 12_000]
  }
  if (key.startsWith('docs/backlog/')) {
    return [5_000, 8_000]
  }
  if (key.startsWith('docs/') && name === 'README.md' && key.split('/').length - 1 >= 2) {
    return [6_000, 12_000]
  }
  if (key.startsWith('docs/')) {
    return [10_000, 16_000]
  }
  if (key.startsWith('template/overlays/')) {
    return [10_000, 16_000]
  }
  if (key.startsWith('template/')) {
    if (name === 'README.md') {
      return [6_000, 12_000]
    }
    if (key.includes('/docs/backlog/')) {
      return [5_000, 8_000]
    }
    return [10_000, 16_000]
  }
  return null
}

function entryLimit(key: string): number | null {
  const exact = ENTRY_LIMITS.get(key)
  if (exact !== undefined) {
    return exact
  }
  if (key.endsWith('/README.md')) {
    if (key.startsWith('template/overlays/') && key !== 'template/overlays/README.md') {
      return null
    }
    return key.includes('/backlog/') ? 60 : 40
  }
  return null
}

function checkRoleCoverage(): void {
  for (const base of ['docs', 'template']) {
    const root = path.join(ROOT, base)
    if (!fs.existsSync(root)) {
      fail(`missing directory: ${base}/`)
      continue
    }
    const directories: string[] = []
    const collect = (directory: string): void => {
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          const child = path.join(directory, entry.name)
          directories.push(child)
          collect(child)
        }
      }
    }
    collect(root)
    directories.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    for (const directory of directories) {
      const pages = fs
        .readdirSync(directory, { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
        .map(entry => path.join(directory, entry.name))
      if (pages.length === 0) {
        continue
      }
      if (pages.every(page => tombstoneState(page).isTombstone)) {
        continue
      }
      if (!fs.existsSync(path.join(directory, 'README.md'))) {
        fail(`missing README: ${rel(directory)}/`)
      }
    }
  }
}

function checkEmptyDirectories(): void {
  const directories = tree().directories.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  for (const directory of directories) {
    const parts = path.relative(ROOT, directory).split(path.sep)
    if (parts.includes('.git') || parts.includes('__pycache__')) {
      continue
    }
    if (fs.readdirSync(directory).length === 0) {
      fail(`empty directory: ${rel(directory)}/`)
    }
  }
}

function checkEnglish(files: string[]): void {
  for (const file of files) {
    if (CJK.test(read(file))) {
      fail(`CJK text: ${rel(file)}`)
    }
  }
}

function checkLinks(files: string[]): void {
  for (const file of files) {
    for (const match of read(file).matchAll(LINK)) {
      const target = match[1]
      if (target.startsWith('http://') || target.startsWith('https://')) {
        continue
      }
      if (target.startsWith('mailto:') || target.startsWith('#')) {
        continue
      }
      const bare = pyStrip(target.split('#')[0])
      if (bare && !fs.existsSync(path.resolve(path.dirname(file), bare))) {
        fail(`broken link in ${rel(file)}: ${target}`)
      }
    }
  }
}

function checkBudgets(files: string[]): void {
  for (const file of files) {
    const limits = budgetFor(rel(file), path.basename(file))
    if (!limits) {
      continue
    }
    const [soft, hard] = limits
    const measured = volume(read(file))
    if (measured > hard) {
      fail(`volume ${measured} > ${hard} (hard): ${rel(file)}`)
    } else if (measured > soft) {
      warn(`volume ${measured} > ${soft} (soft): ${rel(file)}`)
    }
  }
}

function checkEntries(files: string[]): void {
  for (const file of files) {
    const key = rel(file)
    const limit = entryLimit(key)
    if (limit === null) {
      continue
    }
    const measured = tableEntries(read(file))
    if (measured > limit) {
      fail(`entries ${measured} > ${limit}: ${key}`)
    }
  }
}

function checkMarkers(files: string[]): void {
  const marker = /\b(TODO|TBD|FIXME)\b/
  for (const file of files) {
    if (marker.test(read(file))) {
      fail(`unfinished marker: ${rel(file)}`)
    }
  }
}

function checkIndexAutonomy(): void {
  for (const key of INDEX_PAGES) {
    const file = path.join(ROOT, key)
    if (!fs.existsSync(file)) {
      continue
    }
    for (const match of read(file).matchAll(COUNT_NOUN)) {
      fail(`count in index or structure page: ${key}: ${pyRepr(match[0])}`)
    }
  }
}

function checkNaming(files: string[]): void {
  for (const file of files) {
    const name = path.basename(file)
    const key = rel(file).split('\\').join('/')
    const route = `/${key}`
    if (tombstoneState(file).isTombstone) {
      continue
    }
    if (ROLE_NAMES.has(name)) {
      continue
    }
    let pattern: RegExp
    if (route.includes('/docs/decisions/')) {
      pattern = /^ADR-\d{4}-[a-z0-9-]+\.md$/
    } else if (route.includes('/docs/backlog/')) {
      pattern = /^B-\d{4}-[a-z0-9-]+\.md$/
    } else {
      pattern = /^[a-z0-9][a-z0-9-]*\.md$/
    }
    if (!pattern.test(name)) {
      fail(`file name does not match its role: ${key}`)
    }
  }
}

function checkRolePaths(files: string[]): void {
  for (const file of files) {
    const key = rel(file)
    if (!key.startsWith('docs/')) {
      continue
    }
    if (tombstoneState(file).isTombstone) {
      continue
    }
    if (!DOC_ROLE_PATHS.some(pattern => pattern.test(key))) {
      fail(`docs page does not map to a declared role: ${key}`)
    }
  }
}

function checkTombstones(files: string[]): void {
  for (const file of files) {
    const state = tombstoneState(file)
    if (state.isTombstone && state.issue) {
      fail(`tombstone shape: ${rel(file)} — ${state.issue}`)
    }
  }
}

/** Split a table row on unescaped pipes, keeping the padding. */
function splitCells(row: string): string[] {
  const body = pyStrip(row).slice(1, -1)
  const cells: string[] = []
  let buffer = ''
  let escaped = false
  for (const char of body) {
    if (escaped) {
      buffer += char
      escaped = false
    } else if (char === '\\') {
      buffer += char
      escaped = true
    } else if (char === '|') {
      cells.push(buffer)
      buffer = ''
    } else {
      buffer += char
    }
  }
  cells.push(buffer)
  return cells
}

/**
 * A table row carries one space per cell; column padding is a finding.
 *
 * Padding is a formatting decision that hides the changed row in a diff and hands
 * every untouched row to the reformat commit in `git blame` (`docs/norm/rules.md`,
 * R12). A cell count that differs from the header is also reported: the formatter
 * skips such a table, and the default printer would pad it again.
 */
function checkTables(files: string[]): void {
  for (const file of files) {
    let inFence = false
    let columns: number | null = null
    splitLines(read(file)).forEach((line, index) => {
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
        fail(
          `${rel(file)}:${number}: ${cells.length} cells, header has ${columns}; ` +
            'escape a literal pipe as \\|',
        )
      }
      for (const cell of cells) {
        const content = pyStrip(cell)
        if (content === '') {
          continue
        }
        if (cell !== ` ${content} `) {
          fail(`${rel(file)}:${number}: table cell is column-aligned; one space on each side`)
        }
        if (content.replace(CODE_SPAN, 'x').includes('  ')) {
          fail(`${rel(file)}:${number}: table cell has a run of spaces`)
        }
      }
    })
  }
}

/**
 * The backlog index carries one of four statuses, and a typo is a finding.
 *
 * Status is the only column a reader filters the queue by, and it lives in the index
 * rather than in the item file (`docs/norm/roles.md`, "Backlog index"), so a misspelled
 * state has no second copy to correct it.
 */
function checkBacklogStatus(files: string[]): void {
  const targets = new Set(['docs/backlog/README.md', 'template/first-use/docs/backlog/README.md'])
  for (const file of files) {
    if (!targets.has(rel(file))) {
      continue
    }
    let header: string[] | null = null
    splitLines(read(file)).forEach((line, index) => {
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
        fail(`${rel(file)}:${number}: unknown backlog status ${pyRepr(status)}`)
      }
    })
  }
}

function checkGenerated(files: string[]): void {
  for (const file of files) {
    const lines = splitLines(read(file))
    if (lines.length > 0 && lines[0].startsWith('generated by')) {
      if (lines.length < 2 || pyStrip(lines[1]) !== '') {
        fail(`generated header needs a blank second line: ${rel(file)}`)
      }
    }
  }
  for (const name of GENERATED_DIRS) {
    const directory = path.join(ROOT, name)
    if (!fs.existsSync(directory)) {
      continue
    }
    const nested: Walk = { files: [], directories: [] }
    walk(directory, nested)
    for (const file of nested.files.filter(item => item.endsWith('.md'))) {
      const lines = splitLines(read(file))
      if (lines.length === 0 || !lines[0].startsWith('generated by')) {
        fail(`generated file lacks header: ${rel(file)}`)
      }
    }
  }
}

function checkRequiredFiles(): void {
  for (const name of ['README.md', 'AGENTS.md', 'GLOSSARY.md', 'docs/workflow.md']) {
    if (!fs.existsSync(path.join(ROOT, name))) {
      fail(`missing required file: ${name}`)
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
    if (!fs.existsSync(path.join(ROOT, page))) {
      fail(`missing norm page: ${page}`)
    }
  }
}

/** Every live and archived package, with archived as the flag. */
function packageDirs(): Array<{ directory: string; archived: boolean }> {
  const base = path.join(ROOT, 'work-packages')
  if (!fs.existsSync(base)) {
    return []
  }
  const byName = (left: string, right: string): number => (left < right ? -1 : left > right ? 1 : 0)
  const packages = fs
    .readdirSync(base, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name !== 'archive')
    .map(entry => path.join(base, entry.name))
    .sort(byName)
    .map(directory => ({ directory, archived: false }))
  const archive = path.join(base, 'archive')
  if (fs.existsSync(archive)) {
    packages.push(
      ...fs
        .readdirSync(archive, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => path.join(archive, entry.name))
        .sort(byName)
        .map(directory => ({ directory, archived: true })),
    )
  }
  return packages
}

/**
 * A package carries its ledger files and names the evidence directories it owns.
 *
 * ADR-0021: four ledger files by closeout, evidence directories on demand. `summary.md`
 * is written at closeout, so it is required only in the archive; an open package may
 * carry three ledger files. Every top-level directory is evidence and must be named in
 * the summary once one exists. A file beside the ledger is a fifth file, not evidence.
 */
function checkPackages(): void {
  const ledger = new Set(['spec.md', 'plan.md', 'todo.md', 'summary.md'])
  const byName = (left: string, right: string): number => (left < right ? -1 : left > right ? 1 : 0)
  for (const { directory, archived } of packageDirs()) {
    const key = rel(directory)
    for (const name of ['spec.md', 'plan.md', 'todo.md']) {
      if (!fs.statSync(path.join(directory, name), { throwIfNoEntry: false })?.isFile()) {
        fail(`missing package file: ${key}/${name}`)
      }
    }
    const summary = path.join(directory, 'summary.md')
    if (archived && !fs.statSync(summary, { throwIfNoEntry: false })?.isFile()) {
      fail(`missing package summary: ${key}/summary.md`)
    }
    const children = fs
      .readdirSync(directory, { withFileTypes: true })
      .map(entry => ({
        name: entry.name,
        isFile: entry.isFile(),
        full: path.join(directory, entry.name),
      }))
      .sort((left, right) => byName(left.name, right.name))
    for (const child of children) {
      if (child.isFile && !ledger.has(child.name)) {
        fail(`unexpected package file: ${rel(child.full)}`)
      }
    }
    if (!fs.statSync(summary, { throwIfNoEntry: false })?.isFile()) {
      continue
    }
    const text = read(summary)
    for (const child of children) {
      if (!child.isFile && !text.includes(child.name)) {
        fail(`evidence directory not named in summary: ${rel(child.full)}/`)
      }
    }
  }
}

/**
 * Every paragraph is one line. The rule lives in `md-tools`; this stage calls it.
 *
 * The project root comes from `MD_TOOLS_PROJECT` because a machine-local path does not
 * belong in a file. A missing project, a code outside 0/1/2, or a report that did not get
 * written is a failure, never a skip: a prose check that passes because the tool was
 * absent is the failure this stage exists to catch (`docs/norm/rules.md`, the prose
 * bullet under "Naming and citation").
 */
function checkProse(files: string[]): void {
  const project = pyStrip(process.env.MD_TOOLS_PROJECT ?? '')
  if (!project) {
    fail('prose check: MD_TOOLS_PROJECT is not set to the python-toolkit checkout')
    return
  }
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'check-'))
  try {
    const listing = path.join(directory, 'files.txt')
    const report = path.join(directory, 'report.json')
    fs.writeFileSync(listing, `${files.join('\n')}\n`, 'utf8')
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
    const completed = spawnSync('uv', args, { encoding: 'utf8', env: environment })
    if (completed.error) {
      fail(`prose check: md-reflow could not run: ${completed.error.message}`)
      return
    }
    const code = completed.status ?? -1
    if (![0, 1, 2].includes(code) || !fs.existsSync(report)) {
      const detail = splitLines(pyStrip(completed.stderr || completed.stdout || ''))
      const tail = detail.length > 0 ? detail[detail.length - 1] : 'no output'
      fail(`prose check: md-reflow failed (exit ${code}): ${tail}`)
      return
    }
    const payload = JSON.parse(read(report)) as { files?: unknown; files_skipped?: unknown }
    const rows = Array.isArray(payload.files) ? payload.files : []
    for (const row of rows) {
      const name = String((row as { path: unknown }).path)
      const absolute = path.resolve(name)
      const relativePath = path.relative(ROOT, absolute)
      const key =
        relativePath.startsWith('..') || path.isAbsolute(relativePath)
          ? name.split(path.sep).join('/')
          : relativePath.split(path.sep).join('/')
      const blocks = (row as { blocks: unknown }).blocks
      fail(`prose is hard-wrapped: ${key} — ${blocks} block(s), run md-reflow --apply`)
    }
    const skipped = Number(payload.files_skipped ?? 0)
    if (skipped) {
      fail(`prose check: ${skipped} file(s) could not be read (mixed line endings)`)
    }
  } finally {
    fs.rmSync(directory, { recursive: true, force: true })
  }
}

function main(): number {
  const files = markdownFiles()
  checkRequiredFiles()
  checkPackages()
  checkRoleCoverage()
  checkEmptyDirectories()
  checkEnglish(files)
  checkLinks(files)
  checkBudgets(files)
  checkEntries(files)
  checkMarkers(files)
  checkIndexAutonomy()
  checkNaming(files)
  checkRolePaths(files)
  checkTombstones(files)
  checkTables(files)
  checkBacklogStatus(files)
  checkGenerated(files)
  checkProse(files)

  if (WARNINGS.length > 0) {
    console.log(`WARN — ${WARNINGS.length} file(s) over the soft volume budget\n`)
    for (const item of WARNINGS) {
      console.log(`  - ${item}`)
    }
    console.log()
  }

  if (FAILURES.length > 0) {
    console.log(`FAIL — ${FAILURES.length} finding(s) across ${files.length} markdown files\n`)
    for (const item of FAILURES) {
      console.log(`  - ${item}`)
    }
    return 1
  }

  console.log(
    `PASS — ${files.length} markdown files, roles, links, budgets, entries, ` +
      'naming, tables, statuses, packages, prose',
  )
  return 0
}

if (import.meta.main) {
  process.exit(main())
}
