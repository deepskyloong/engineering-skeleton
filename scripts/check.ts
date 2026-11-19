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

function main(): number {
  const context = createContext(ROOT)
  const findings = runChecks(context)
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

  console.log(
    `PASS — ${context.files.length} markdown files, roles, links, budgets, entries, ` +
      'naming, tables, statuses, packages, prose',
  )
  return 0
}

if (import.meta.main) {
  process.exit(main())
}
