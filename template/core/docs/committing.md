# Committing

One logical change per commit; each commit passes the gate on its own.

Header: `<type>(<scope>): <subject>`.
Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `ci`.
Subject: imperative present, lowercase after the colon, states the outcome, ≤72 characters, no trailing period.
Body: why this shape, what lost, what was deliberately left out. Never a file list or a restatement.

If this repository adopts an external base, put `Base: <path or URL>` at the top and record only deviations below it. The base wins wherever this page is silent.
