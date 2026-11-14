# 0002 — The skill is manually invoked, not description-triggered

Status: Accepted (2026-11-14)

## Context

A skill's `description` is the only thing an agent sees before deciding to load the body. It is a soft trigger: the agent matches the description against the request, and a near-miss produces no error — the skill simply does not run. The failure is silent.

The skeleton has three entry moments: a new repository is created, an existing repository is audited, an existing repository adopts the layout. Two of the three are easy to miss, because the request sounds like ordinary work ("set up this project", "clean up these docs").

## Decision

`i-project-skeleton` is invoked by the user, explicitly. Its description states what it does and that it is manually invoked; it does not try to win a description-matching contest.

## Options considered

1. **Description-triggered.** Write a broad description covering project setup, documentation structure, repository audit, and migration. Rejected: the broader the description, the more false positives; the narrower, the more silent misses. Neither failure is observable at the moment it happens, so the skill cannot learn from it.
2. **Description-triggered plus a hard rule in the global `AGENTS.md`.** "Before creating a repository, load i-project-skeleton." Better recall, but the rule itself is read every turn and adds tax to unrelated work; and an agent that does not follow the rule produces the same silent miss.
3. **Manual invocation.** Chosen: precision is 100%, cost is that recall depends on the user. The user already knows the three entry moments and invokes deliberately.

## Consequences

- The skill is not discoverable by accident. The repository README and the global instruction layer should name it once, as a pointer, not as a trigger rule.
- The description still has to say what the skill does, because the user reads it when choosing.
- If manual invocation proves to be forgotten in practice, the fallback is option 2 — a single line in the global instruction layer, not a broader description.
