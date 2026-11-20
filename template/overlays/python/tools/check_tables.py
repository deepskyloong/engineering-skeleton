"""R12's gate stage (`docs/norm/rules.md`): checks the tables in every living markdown file.

Usage:
    uv run python tools/check_tables.py [--exempt <prefix>]...

Fails a column-padded cell, a row whose cell count differs from its header, and a
run of spaces outside a code span. A repository that registers a frozen legacy
path passes `--exempt <prefix>`, repeatable: a frozen record keeps the form it was
written with (`docs/workflow.md`, M5).

Exit codes: 0 every checked table is compact; 1 at least one finding.
"""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TABLE_ROW = re.compile(r"^\|.*\|$")
CODE_SPAN = re.compile(r"`[^`]*`")
SKIP_PARTS = {
    ".git",
    ".venv",
    "__pycache__",
    ".pytest_cache",
    ".ruff_cache",
    "dist",
    "node_modules",
}


def git(*arguments: str) -> list[str] | None:
    """Run git at the repository root; None when this copy is not a work tree yet."""
    completed = subprocess.run(
        ["git", *arguments], cwd=ROOT, capture_output=True, text=True, encoding="utf-8"
    )
    if completed.returncode != 0:
        return None
    return completed.stdout.splitlines()


def markdown_files() -> list[Path]:
    """Every living markdown file the repository carries, tracked or not yet committed."""
    tracked = git("ls-files", "--", "*.md")
    if tracked is None:
        return [
            path
            for path in sorted(ROOT.rglob("*.md"))
            if not SKIP_PARTS.intersection(path.relative_to(ROOT).parts)
        ]
    untracked = git("ls-files", "--others", "--exclude-standard", "--", "*.md") or []
    return [
        ROOT / name
        for name in sorted(set(tracked) | set(untracked))
        if name and (ROOT / name).is_file()
    ]


def split_cells(row: str) -> list[str]:
    """Split a table row on unescaped pipes, keeping each cell's padding."""
    body = row.strip()[1:-1]
    cells: list[str] = []
    buffer = ""
    escaped = False
    for character in body:
        if escaped:
            buffer += character
            escaped = False
        elif character == "\\":
            buffer += character
            escaped = True
        elif character == "|":
            cells.append(buffer)
            buffer = ""
        else:
            buffer += character
    cells.append(buffer)
    return cells


def findings_in_text(key: str, text: str) -> list[str]:
    """Every table finding in one markdown file, as `path:line: message`."""
    findings: list[str] = []
    in_fence = False
    columns: int | None = None
    for index, line in enumerate(text.splitlines(), start=1):
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            columns = None
            continue
        if in_fence:
            continue
        if not TABLE_ROW.match(stripped):
            columns = None
            continue
        cells = split_cells(stripped)
        if columns is None:
            columns = len(cells)
        elif len(cells) != columns:
            findings.append(
                f"{key}:{index}: {len(cells)} cells, header has {columns}; "
                "escape a literal pipe as \\|"
            )
        for cell in cells:
            content = cell.strip()
            if content == "":
                continue
            if cell != f" {content} ":
                findings.append(
                    f"{key}:{index}: table cell is column-aligned; one space on each side"
                )
            if "  " in CODE_SPAN.sub("x", content):
                findings.append(f"{key}:{index}: table cell has a run of spaces")
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "--exempt",
        action="append",
        default=[],
        metavar="PREFIX",
        help="path prefix left unchecked because it is a frozen record",
    )
    arguments = parser.parse_args()

    files = [
        path
        for path in markdown_files()
        if not any(
            path.relative_to(ROOT).as_posix().startswith(prefix) for prefix in arguments.exempt
        )
    ]
    findings: list[str] = []
    for path in files:
        key = path.relative_to(ROOT).as_posix()
        findings.extend(findings_in_text(key, path.read_text(encoding="utf-8")))

    for finding in findings:
        print(finding)
    print(f"check_tables: {len(files)} markdown files, {len(findings)} finding(s)")
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
