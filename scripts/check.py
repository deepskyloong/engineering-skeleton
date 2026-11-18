#!/usr/bin/env python3
"""Gate for the repository-standard repository.

Checks what can be checked mechanically. Prose quality and cross-file
semantic duplication are review criteria, not a gate.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FAILURES: list[str] = []
WARNINGS: list[str] = []
TABLE_DELIMITER = re.compile(r"\|[\s:|-]+\|")
TABLE_ROW = re.compile(r"^\|.*\|$")
CODE_SPAN = re.compile(r"`[^`]*`")
SKIP_PARTS = {".git", "node_modules", "__pycache__"}
BACKLOG_STATUSES = {"open", "active", "paused", "closed"}


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def fail(message: str) -> None:
    FAILURES.append(message)


def warn(message: str) -> None:
    WARNINGS.append(message)


def markdown_files() -> list[Path]:
    return [p for p in ROOT.rglob("*.md") if not SKIP_PARTS.intersection(p.parts)]


def volume(text: str) -> int:
    lines = [line for line in text.splitlines() if not TABLE_DELIMITER.fullmatch(line)]
    return len(re.sub(r"\s", "", "\n".join(lines)))


def table_entries(text: str) -> int:
    rows = [line for line in text.splitlines() if line.startswith("|")]
    rows = [line for line in rows if not TABLE_DELIMITER.fullmatch(line)]
    return max(len(rows) - 1, 0)


def tombstone_state(path: Path) -> tuple[bool, str | None]:
    """Return (is_tombstone, shape_issue) for a forwarding stub.

    The marker is the title suffix, not the file name or its directory: a
    tombstone lives at the old path and would otherwise look like a live page
    to the role map.
    """
    text = path.read_text(encoding="utf-8")
    lines = [line for line in text.splitlines() if line.strip()]
    if (
        not lines
        or not lines[0].startswith("# ")
        or not lines[0].rstrip().endswith(TOMBSTONE_SUFFIX)
    ):
        return False, None
    if len(lines) > 3:
        return True, f"{len(lines)} non-empty lines, max 3"
    links = LINK.findall(text)
    if len(links) != 1:
        return True, f"{len(links)} links, expected 1"
    measured = volume(text)
    if measured > 400:
        return True, f"volume {measured} > 400"
    return True, None


CJK = re.compile(
    r"[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]"
)
LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
TOMBSTONE_SUFFIX = "— moved"
COUNT_NOUN = re.compile(
    r"\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+"
    r"(pages?|documents?|files?|entries|items|adrs?)\b",
    re.IGNORECASE,
)
ROLE_NAMES = {"README.md", "AGENTS.md", "GLOSSARY.md", "GLOSSARY-MAP.md", "_template.md"}

DOC_ROLE_PATHS = [
    re.compile(r"docs/README\.md"),
    re.compile(r"docs/(charter|structure|conventions|committing|governance|workflow)\.md"),
    re.compile(r"docs/adapters\.md"),
    re.compile(r"docs/norm/(README|[a-z0-9-]+)\.md"),
    re.compile(r"docs/decisions/(README|ADR-\d{4}-[a-z0-9-]+)\.md"),
    re.compile(r"docs/backlog/(README|B-\d{4}-[a-z0-9-]+)\.md"),
    re.compile(r"docs/contracts/(README|[a-z0-9-]+)\.md"),
    re.compile(r"docs/operations/(README|[a-z0-9-]+)\.md"),
    re.compile(r"docs/toolchain/(README|[a-z0-9-]+)\.md"),
    re.compile(r"docs/knowledge/(README|(guides|cases|notes)/[a-z0-9-]+\.md)"),
]

EXACT_BUDGETS = {
    "AGENTS.md": (20_000, 32_000),
    "README.md": (10_000, 16_000),
    "GLOSSARY.md": (7_500, 12_000),
    "GLOSSARY-MAP.md": (2_500, 4_000),
    "docs/README.md": (6_000, 12_000),
    "docs/committing.md": (5_000, 8_000),
    "docs/norm/README.md": (6_000, 12_000),
    "docs/decisions/README.md": (6_000, 12_000),
    "docs/backlog/README.md": (8_000, 16_000),
    "template/README.md": (6_000, 12_000),
    "template/core/AGENTS.md": (20_000, 32_000),
    "template/core/README.md": (10_000, 16_000),
    "template/core/docs/committing.md": (5_000, 8_000),
    "template/first-use/docs/backlog/README.md": (8_000, 16_000),
    "template/overlays/README.md": (6_000, 12_000),
}

ENTRY_LIMITS = {
    "docs/README.md": 40,
    "docs/decisions/README.md": 40,
    "docs/backlog/README.md": 60,
    "template/README.md": 40,
}

GENERATED_DIRS = ("dist",)


def budget_for(key: str, name: str) -> tuple[int, int] | None:
    """Return the (soft, hard) volume budget for a markdown file.

    Soft is a judgment line: the gate warns. Hard is a failure line
    (`docs/norm/rules.md`, R4a; ADR-0013).
    """
    if key in EXACT_BUDGETS:
        return EXACT_BUDGETS[key]
    if key.startswith("docs/decisions/"):
        return (7_500, 12_000)
    if key.startswith("docs/backlog/"):
        return (5_000, 8_000)
    if key.startswith("docs/"):
        return (10_000, 16_000)
    if key.startswith("template/overlays/"):
        return (10_000, 16_000)
    if key.startswith("template/"):
        if name == "README.md":
            return (6_000, 12_000)
        if "/docs/backlog/" in key:
            return (5_000, 8_000)
        return (10_000, 16_000)
    return None


def check_role_coverage() -> None:
    for base in ("docs", "template"):
        root = ROOT / base
        if not root.exists():
            fail(f"missing directory: {base}/")
            continue
        for directory in sorted(p for p in root.rglob("*") if p.is_dir()):
            pages = list(directory.glob("*.md"))
            if not pages:
                continue
            if all(tombstone_state(p)[0] for p in pages):
                continue
            if not (directory / "README.md").exists():
                fail(f"missing README: {rel(directory)}/")


def check_empty_directories() -> None:
    for directory in sorted(p for p in ROOT.rglob("*") if p.is_dir()):
        if ".git" in directory.parts or "__pycache__" in directory.parts:
            continue
        if not any(directory.iterdir()):
            fail(f"empty directory: {rel(directory)}/")


def check_english(files: list[Path]) -> None:
    for path in files:
        if CJK.search(path.read_text(encoding="utf-8")):
            fail(f"CJK text: {rel(path)}")


def check_links(files: list[Path]) -> None:
    for path in files:
        for target in LINK.findall(path.read_text(encoding="utf-8")):
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            bare = target.split("#")[0].strip()
            if bare and not (path.parent / bare).exists():
                fail(f"broken link in {rel(path)}: {target}")


def check_budgets(files: list[Path]) -> None:
    for path in files:
        limits = budget_for(rel(path), path.name)
        if limits is None:
            continue
        soft, hard = limits
        measured = volume(path.read_text(encoding="utf-8"))
        if measured > hard:
            fail(f"volume {measured} > {hard} (hard): {rel(path)}")
        elif measured > soft:
            warn(f"volume {measured} > {soft} (soft): {rel(path)}")


def check_entries(files: list[Path]) -> None:
    for path in files:
        key = rel(path)
        limit = ENTRY_LIMITS.get(key)
        if limit is None:
            continue
        measured = table_entries(path.read_text(encoding="utf-8"))
        if measured > limit:
            fail(f"entries {measured} > {limit}: {key}")


def check_markers(files: list[Path]) -> None:
    for path in files:
        if re.search(r"\b(TODO|TBD|FIXME)\b", path.read_text(encoding="utf-8")):
            fail(f"unfinished marker: {rel(path)}")


INDEX_PAGES = (
    "docs/README.md",
    "docs/decisions/README.md",
    "docs/backlog/README.md",
    "template/README.md",
    "docs/structure.md",
    "template/core/docs/structure.md",
)


def check_index_autonomy(files: list[Path]) -> None:
    for key in INDEX_PAGES:
        path = ROOT / key
        if not path.exists():
            continue
        for match in COUNT_NOUN.finditer(path.read_text(encoding="utf-8")):
            fail(f"count in index or structure page: {key}: {match.group(0)!r}")


def check_naming(files: list[Path]) -> None:
    for path in files:
        name = path.name
        key = rel(path).replace("\\", "/")
        route = "/" + key
        if tombstone_state(path)[0]:
            continue
        if name in ROLE_NAMES:
            continue
        if "/docs/decisions/" in route:
            pattern = r"ADR-\d{4}-[a-z0-9-]+\.md"
        elif "/docs/backlog/" in route:
            pattern = r"B-\d{4}-[a-z0-9-]+\.md"
        else:
            pattern = r"[a-z0-9][a-z0-9-]*\.md"
        if not re.fullmatch(pattern, name):
            fail(f"file name does not match its role: {key}")


def check_role_paths(files: list[Path]) -> None:
    for path in files:
        key = rel(path)
        if not key.startswith("docs/"):
            continue
        if tombstone_state(path)[0]:
            continue
        if not any(pattern.fullmatch(key) for pattern in DOC_ROLE_PATHS):
            fail(f"docs page does not map to a declared role: {key}")


def check_tombstones(files: list[Path]) -> None:
    for path in files:
        is_tombstone, issue = tombstone_state(path)
        if is_tombstone and issue:
            fail(f"tombstone shape: {rel(path)} — {issue}")


def split_cells(row: str) -> list[str]:
    """Split a table row on unescaped pipes, keeping the padding."""
    body = row.strip()[1:-1]
    cells: list[str] = []
    buffer = ""
    escaped = False
    for char in body:
        if escaped:
            buffer += char
            escaped = False
        elif char == "\\":
            buffer += char
            escaped = True
        elif char == "|":
            cells.append(buffer)
            buffer = ""
        else:
            buffer += char
    cells.append(buffer)
    return cells


def check_tables(files: list[Path]) -> None:
    """A table row carries one space per cell; column padding is a finding.

    Padding is a formatting decision that hides the changed row in a diff and
    hands every untouched row to the reformat commit in `git blame`
    (`docs/norm/rules.md`, R12). A cell count that differs from the header
    is also reported: the formatter skips such a table, and the default printer
    would pad it again.
    """
    for path in files:
        in_fence = False
        columns: int | None = None
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            stripped = line.strip()
            if stripped.startswith(("```", "~~~")):
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
                fail(
                    f"{rel(path)}:{number}: {len(cells)} cells, header has {columns}; "
                    r"escape a literal pipe as \|"
                )
            for cell in cells:
                content = cell.strip()
                if not content:
                    continue
                if cell != f" {content} ":
                    fail(
                        f"{rel(path)}:{number}: table cell is column-aligned; "
                        "one space on each side"
                    )
                if "  " in CODE_SPAN.sub("x", content):
                    fail(f"{rel(path)}:{number}: table cell has a run of spaces")


def check_backlog_status(files: list[Path]) -> None:
    """The backlog index carries one of four statuses, and a typo is a finding.

    Status is the only column a reader filters the queue by, and it lives in the
    index rather than in the item file (`docs/backlog/README.md`, "Rules"), so a
    misspelled state has no second copy to correct it.
    """
    for path in files:
        if rel(path) != "docs/backlog/README.md":
            continue
        header: list[str] | None = None
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            stripped = line.strip()
            if not TABLE_ROW.match(stripped):
                header = None
                continue
            cells = split_cells(stripped)
            if header is None:
                header = cells
                continue
            if TABLE_DELIMITER.fullmatch(stripped):
                continue
            status = cells[2].strip() if len(cells) > 2 else ""
            if status not in BACKLOG_STATUSES:
                fail(f"{rel(path)}:{number}: unknown backlog status {status!r}")


def check_generated(files: list[Path]) -> None:
    for path in files:
        lines = path.read_text(encoding="utf-8").splitlines()
        if lines and lines[0].startswith("generated by") and (len(lines) < 2 or lines[1].strip()):
            fail(f"generated header needs a blank second line: {rel(path)}")
    for name in GENERATED_DIRS:
        directory = ROOT / name
        if not directory.exists():
            continue
        for path in directory.rglob("*.md"):
            lines = path.read_text(encoding="utf-8").splitlines()
            if not lines or not lines[0].startswith("generated by"):
                fail(f"generated file lacks header: {rel(path)}")


def check_required_files() -> None:
    for name in ("README.md", "AGENTS.md", "GLOSSARY.md", "docs/workflow.md"):
        if not (ROOT / name).exists():
            fail(f"missing required file: {name}")
    for page in (
        "docs/norm/README.md",
        "docs/norm/foundations.md",
        "docs/norm/roles.md",
        "docs/norm/flow.md",
        "docs/norm/rules.md",
        "docs/norm/overlays.md",
        "docs/norm/committing.md",
    ):
        if not (ROOT / page).exists():
            fail(f"missing norm page: {page}")


def main() -> int:
    files = markdown_files()
    check_required_files()
    check_role_coverage()
    check_empty_directories()
    check_english(files)
    check_links(files)
    check_budgets(files)
    check_entries(files)
    check_markers(files)
    check_index_autonomy(files)
    check_naming(files)
    check_role_paths(files)
    check_tombstones(files)
    check_tables(files)
    check_backlog_status(files)
    check_generated(files)

    if WARNINGS:
        print(f"WARN — {len(WARNINGS)} file(s) over the soft volume budget\n")
        for item in WARNINGS:
            print(f"  - {item}")
        print()

    if FAILURES:
        print(f"FAIL — {len(FAILURES)} finding(s) across {len(files)} markdown files\n")
        for item in FAILURES:
            print(f"  - {item}")
        return 1

    print(
        f"PASS — {len(files)} markdown files, roles, links, budgets, entries, "
        "naming, tables, statuses"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
