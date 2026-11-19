/**
 * The document stage of `bun run gate`.
 *
 * Checks what can be checked mechanically. Prose *quality* and cross-file semantic
 * duplication are review criteria, not a gate; prose *form* is one, and `doc-checks.ts`
 * delegates it to the `md-tools` CLI so the block model has one implementation.
 *
 * Everything below is reporting: which findings fail, which warn, and what the run
 * summarizes. The rules live in `docs-model.ts` and `doc-checks.ts`, with a test beside
 * each.
 */

import * as path from 'node:path'

import { createContext, runChecks } from './doc-checks.ts'

const ROOT = path.resolve(import.meta.dir, '..')

const USAGE = [
  'Usage: bun scripts/check.ts [--no-prose]',
  '',
  '  --no-prose   leave the prose stage out; it needs md-tools through MD_TOOLS_PROJECT,',
  '               which CI cannot reach (ADR-0025). The pass line names the omission.',
].join('\n')

function main(args: string[]): number {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(USAGE)
    return 0
  }
  const unknown = args.filter(arg => arg !== '--no-prose')
  if (unknown.length > 0) {
    console.error(`unknown argument: ${unknown[0]}\n\n${USAGE}`)
    return 2
  }

  const skipProse = args.includes('--no-prose')
  const context = createContext(ROOT)
  const findings = runChecks(context, { skipProse })
  const warnings = findings.filter(finding => finding.level === 'warn')
  const failures = findings.filter(finding => finding.level === 'fail')

  if (warnings.length > 0) {
    console.log(`WARN — ${warnings.length} file(s) over the soft volume budget\n`)
    for (const finding of warnings) {
      console.log(`  - ${finding.message}`)
    }
    console.log()
  }

  if (failures.length > 0) {
    const files = context.files.length
    console.log(`FAIL — ${failures.length} finding(s) across ${files} markdown files\n`)
    for (const finding of failures) {
      console.log(`  - ${finding.message}`)
    }
    return 1
  }

  const scope = 'roles, links, budgets, entries, naming, tables, statuses, packages'
  const tail = skipProse ? ' (prose stage skipped by --no-prose)' : ', prose'
  console.log(`PASS — ${context.files.length} markdown files, ${scope}${tail}`)
  return 0
}

if (import.meta.main) {
  process.exit(main(process.argv.slice(2)))
}
