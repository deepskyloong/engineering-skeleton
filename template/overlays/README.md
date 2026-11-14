# Overlays

One overlay is active per repository. Each subdirectory is one language; copying two is a two-language repository, which is a special case, not the default.

An overlay ships **files, not code blocks**. After copying it and installing dependencies, the gate is green on an empty repository. An overlay that requires transcription is incomplete. Each overlay's `README.md` is a guide for the person copying it and is **not** copied into the target; every other file is.

| Overlay | Runtime | Gate |
|---|---|---|
| [typescript/](typescript/README.md) | Bun | `bun run gate` |
| [python/](python/README.md) | uv | `uv run python tools/gate.py` |

Each overlay fills the eight contracts in `docs/spec/05-overlays.md` and never restates a core rule. If an overlay needs a core rule changed, the spec changes first.
