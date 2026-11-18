# 0007 — Committing

The committing norm for every repository that names the norm source. A repository's `docs/committing.md` points here and records only its own deviations; anything not overridden applies from this page. The path is the same in every repository.

Messages are English by default; a project may record another language. Proper nouns stay verbatim.

## What a message is for

`git log --oneline` is the index a future reader — or agent — scans first. The subject says what the change now does. The body says what the diff cannot: why the change has this shape, what lost, what was deliberately left out. The diff already shows which files moved, so the message never repeats it.

A commit is also the unit of bisect and revert: one logical change, passing the project's gates on its own.

## Header

```
<type>[(<scope>)][!]: <subject>
```

### Type

| Type | Use for |
| --- | --- |
| `feat` | A capability or observable behavior that did not exist. |
| `fix` | Wrong or missing behavior made right; a contract moved to match reality. |
| `refactor` | Same demanded behavior, different shape. If a test now expects something else, the contract moved and the type is `fix` or `feat`. |
| `docs` | Documentation only. |
| `test` | Tests only, with no production behavior change. |
| `chore` | Repo housekeeping, tooling, dependencies, config. |
| `ci` | Pipeline and workflow definitions. |

When `fix` and `feat` both fit, choose `fix`: it remedied a broken or missing behavior. A project may add types (`perf`, `build`, `revert`, …) in its own doc; a type is never invented per commit.

### Scope

- When the change belongs to one topic, the scope is mandatory. When it genuinely serves several, omit it — no scope is information.
- Never a stand-in like `(misc)`, and never two scopes stacked.
- Spell the scope exactly as the project names the topic — workspace member, package export, skill directory — never a shorter alias. The project's doc owns the vocabulary.
- A topic's own docs and tests ride in its scope.

### Subject

- Imperative present tense, no trailing period: `add bounded retry…`, not `added` / `adds` / `…retry.`
- Start lowercase after the colon: `treat a 429 as retryable`, not `Treat a 429 as retryable`. A proper noun, acronym, or code identifier that opens the subject keeps its own case (`GitHub`, `HTTP`, `bun`); the subject is a fragment, not a title.
- Say what the code now does, not which files were touched: `give the logger two output formats`, not `update logger.ts`.
- One outcome. If the subject needs "and", check whether it is two commits; the second clause usually belongs in the body.
- Aim for ≤ 72 characters; hard cap 100. Past 100, cut a clause, not a word — or split the commit.
- Keep proper nouns verbatim.

### Breaking changes

Mark with `!` before the colon and a `BREAKING CHANGE:` footer. The header warns the skimmer; the trailer feeds the tools.

## Body

The subject says what; the body says why this way. **Required for `feat`, `fix`, and `refactor`; welcome elsewhere whenever the subject does not say it all.** If the only available body would restate the subject, the subject is the whole message: omit the body rather than pad it.

The body carries only what the diff cannot show:

1. The constraint or discovery that forced this shape — a site behavior, a measurement (say how it was taken), a rule elsewhere in the repo.
2. Alternatives rejected, and the evidence each lost on.
3. What was deliberately not done, and the condition that would reopen it.
4. References: commits by short hash, docs by path, issues by link.

Never:

- Lists of touched files, or a restatement of the subject.
- Process narration — the order the work happened in — unless that order is the fact.
- The how; the diff shows it.
- Numbers or claims you did not observe. If a measurement is the warrant, name what produced it.
- Markdown that only a forge renders: headings, bold, tables. Inline code and lists are fine.
- Agent or tool chatter: "as requested", "step 2", "generated with …".

Shape:

- Prose paragraphs, one blank line between. Bullets only for genuine enumerations — rejected alternatives, deliberate omissions — never as a substitute for the causal chain. A bullet list of what changed is a diff in words.
- No hard-wrap by default: leave the wrapping to the renderer. A project may instead record a width — 72 for patch-email workflows, 100 to match its code — and apply it uniformly.
- The imperative rule applies to the subject only; the body is ordinary prose.

**Truth over completeness.** If you cannot state the why without inventing it, omit the body. An honest short message beats a fabricated rationale.

Example (a project that records a 72-column body width):

```text
fix(shared/http): retry once when the server sends Retry-After

The v0 endpoint answers 429 with Retry-After in seconds; the client
treated the header as a hard failure. The gate now sleeps for the
advertised window once. A second 429 still fails the call: the site's
own docs cap the retry at one.

Rejected: exponential backoff without the header. It lost on a measured
case: two waits already exceeded the command's 30 s budget.

Refs: 4f8242f
```

## Footers

One blank line after the body, then one `Token: value` per line — machine-readable by `git interpret-trailers`:

- `BREAKING CHANGE: <what breaks, and the migration>` — required whenever `!` is used.
- `Refs: <hash|path|url>` for context that closes nothing; `Fixes:` / `Closes:` for issues the forge should close.
- Attribution trailers (`Co-authored-by:`, tool signatures) are a project decision, off by default: the message records the change, not the tool.

## One logical change

Each commit passes the project's gates on its own. Split changes that do not share a reason to land or revert together. The one exception is a change that must land together — implementation plus the docs or tests that describe it — and there the body says what rides along. Structural moves and unrelated doc changes are their own commits.

## Project overrides

A project may set:

- the allowed types (add `perf`, `build`, …) and the scope vocabulary;
- subject casing and cap, body width (unset by default; 72 for patch-email, 100 to match the code);
- message language, ticket or plan-ID suffixes, attribution trailers.

It may not weaken: the header shape, outcome-not-files subjects, the body's "why the diff cannot show" standard, the ban on invented rationale, or one logical change per commit.

Record overrides in `docs/committing.md` — the same path in every project, never forked to another filename or folded into `AGENTS.md`. The project's `AGENTS.md` points there on the commit path. Start the file with:

```text
Base: `{{NORM_SOURCE}}/docs/spec/0007-committing.md`. Read it first; this file records only deviations. A rule here wins only on the dimension it names; everything else comes from the norm.
```

## Before committing

- [ ] The type is from the project's set; the scope is one canonical topic, or absent because the change spans topics.
- [ ] The subject is imperative, starts lowercase, states the outcome, is one clause, and fits the cap.
- [ ] One logical change; unrelated work is split out or left uncommitted.
- [ ] A `feat` / `fix` / `refactor` either carries a body with a fact the diff cannot show, or has nothing non-derivable to say — never filler.
- [ ] The body has no file list, no restatement, no process narration, no invented why.
- [ ] Every number or claim was observed this session and names its source.
- [ ] Breaking changes carry `!` and a `BREAKING CHANGE:` footer.
- [ ] Hash and path references resolve.

## Enforcement

No `commit-msg` hook by default. With one maintainer and an agent writing the messages, a hook costs a dependency to police a rule whose only reader is the next `git log` — and an easily bypassed hook teaches the opposite of what it appears to enforce. This page is the enforcement. Commits made before a project adopted it stay as they are; rewriting history to retro-fit a convention destroys more than it adds.

A project that wants a mechanical check should write a dependency-free `commit-msg` script (`.githooks/commit-msg`, wired with `core.hooksPath`) that checks only the mechanical rules — header shape, type, subject cap and period, the blank line before the body. Do not reach for commitlint: its config-conventional defaults (`subject-case`, `body-max-line-length` 100, a wider `type-enum`) fight this convention, and it cannot check the rules that matter — outcome, why, one logical change.

## Sources

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) — header shape, free-form body, breaking-change markers.
- [git SubmittingPatches](https://git-scm.com/docs/SubmittingPatches) — imperative mood, lowercase after the prefix, body explains why and the alternatives that lost.
- [git interpret-trailers](https://git-scm.com/docs/git-interpret-trailers) — footer syntax.
