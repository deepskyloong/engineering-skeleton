# Repository README

A repository README is a storefront, not a table of contents. Its job is to move a reader from arrival to a first useful action, then hand them to the page that owns the next question.

## What it must answer

The first screen carries four answers. Headings may vary; the answers may not be missing.

1. **What this is** — one sentence in the reader's terms. Not a module list, not the repository's history, not a slogan.
2. **Who it is for** — the task or audience it serves. "General purpose" is not an answer.
3. **How to get a working result** — prerequisites, install, and the shortest command that proves it works. At most three steps. Every command works from a fresh clone using only what the README names.
4. **Where to read next** — links chosen by the reader's next question, not by directory order: the charter for scope, the structure for placement, the workflow for work, the instruction layer for agents.

If the project cannot be installed, say what "working" means instead — an import, a CLI call, a rendered page — and give the command that proves it.

## What it must not become

- **A path inventory.** A `What is here` table, a tree, or a table of every directory is an index; directory indexes own membership. Link to the root index when a map helps. A table is allowed when it compares choices, not when it lists files.
- **A second norm.** Charter, instruction layer, conventions, architecture, and ADR content stay in their pages. The README links; it does not restate.
- **A history.** Changelog, roadmap, release notes, "recent changes", and dated status logs belong to `git log`, the backlog, or the page that owns current state. A status section, when the project has one, says what works, what does not, and the next action; rewrite it, do not append.
- **An advertisement for absent pages.** Every path named in the README exists in the repository. Optional roles appear only when their trigger does.
- **A machine-local recipe.** No absolute paths, private credentials, or assumptions about the author's shell. A command that only works on one machine is not getting started.

## Length and change

A README is read once by a newcomer and skimmed thereafter. Keep the mandatory answers within one screen; move examples, explanation, and design rationale to the page that owns them. A section earns its place by answering a reader's question, not by matching a template.

Rewrite the README when the install path, the proof command, or the first-read pointers change. Do not append a correction below the old text; a storefront with a history is no longer a storefront.

## Review

A reviewer can reject a README without reading the rest of the repository when:

- the first sentence does not say what the project is;
- a reader cannot reach a working result in three steps from a fresh clone;
- a deeper section duplicates a page that already owns it;
- a listed path does not exist;
- a status section has become a log.

A README longer than one screen is not automatically wrong: a complex install may need more than a sentence per step. It is wrong when length comes from inventory or duplication, not from the reader's path.
