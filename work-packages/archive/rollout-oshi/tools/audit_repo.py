#!/usr/bin/env python3
"""Audit one repository against the repository standard's roles and budgets.

Read-only. Prints a markdown summary; writes JSON when asked.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

TABLE_DELIMITER = re.compile(r"\|[\s:|-]+\|")
LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
CJK = re.compile(r"[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]")
COUNT_NOUN = re.compile(
    r"\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+"
    r"(pages?|documents?|files?|entries|items|adrs?)\b",
    re.IGNORECASE,
)
ROLE_NAMES = {"README.md", "AGENTS.md", "CONTEXT.md", "CONTEXT-MAP.md", "_template.md"}
EXCLUDE_PARTS = {
    ".git", "node_modules", ".venv", "venv", "__pycache__", ".ruff_cache",
    ".mypy_cache", ".pytest_cache", "dist", "build", "site-packages", ".cache",
}


def volume(text: str) -> int:
    lines = [line for line in text.splitlines() if not TABLE_DELIMITER.fullmatch(line)]
    return len(re.sub(r"\s", "", "\n".join(lines)))


def table_entries(text: str) -> int:
    rows = [line for line in text.splitlines() if line.startswith("|")]
    rows = [line for line in rows if not TABLE_DELIMITER.fullmatch(line)]
    return max(len(rows) - 1, 0)


def markdown_files(root: Path) -> list[Path]:
    return [
        p for p in root.rglob("*.md")
        if not (set(p.relative_to(root).parts) & EXCLUDE_PARTS)
    ]


def guess_role(rel: str) -> str:
    parts = rel.split("/")
    name = parts[-1]
    dirs = parts[:-1]
    top = parts[0]

    if top == ".workbuddy":
        return "foreign: WorkBuddy memory"
    if top == ".codeartsdoer":
        return "foreign: CodeArts adapter"
    if top == ".scratch":
        return "runtime: workshop"
    if top == "experiments":
        return "runtime: experiment evidence"
    if top == "archived":
        return "archive: no role"
    if name == "CONTEXT-MAP.md":
        return "Vocabulary map"
    if name == "CONTEXT.md":
        return "Vocabulary"
    if name == "GLOSSARY.md":
        return "unplaced: glossary"
    if name == "AGENTS.md":
        if len(parts) == 1:
            return "Instruction layer"
        if top in ("apps", "packages"):
            return "Member AGENTS"
        if top == "src":
            return "Module AGENTS"
        return "unplaced: instruction copy"
    if name == "README.md":
        if len(parts) == 1:
            return "Storefront README"
        if top in ("apps", "packages") and len(parts) == 3:
            return "Member README"
        if top == "src" and len(parts) == 3:
            return "Module README"
        if top == "docs":
            return "Docs index" if len(parts) == 2 else "Directory index"
        if top in ("tasks",):
            return "Directory index"
        if top in ("references", "experience", "rules", "skills"):
            return "Directory index"
        return "Directory index"
    if top == "tasks":
        return "Work package"
    if top == "skills":
        return "unplaced: skill unit"
    if top == "rules":
        return "unplaced: rule source"
    if top == "references":
        return "Knowledge guide"
    if top == "experience":
        return "Knowledge case"
    if top == "src" and "docs" in dirs:
        return "unplaced: module docs"
    if top in ("apps", "packages") and "docs" in dirs:
        return "unplaced: member docs"
    if top == "docs":
        sub = parts[1] if len(parts) > 1 else ""
        if sub == "backlog":
            return "Backlog index" if name == "README.md" else "Backlog item"
        if sub in ("adr", "adrs", "decisions"):
            return "ADR" if name != "README.md" else "Directory index"
        if sub == "agents":
            return "Adapter suite"
        if sub == "reviews":
            return "runtime: review report"
        if sub in ("notes", "knowledge"):
            return "Knowledge note"
        if sub in ("plans", "superpowers", "compound-engineering", "specs"):
            return "unplaced: work-package artifact"
        if sub == "status.md":
            return "Status"
        mapping = {
            "charter.md": "Charter", "brief.md": "Charter",
            "structure.md": "Structure", "workspace-layout.md": "Structure",
            "architecture.md": "Structure", "repository-shape.md": "Structure",
            "module-shape.md": "Structure",
            "conventions.md": "Conventions", "language-policy.md": "Conventions",
            "documentation.md": "Conventions", "writing-module-docs.md": "Conventions",
            "committing.md": "Committing",
            "workflow.md": "Workflow", "development-workflows.md": "unplaced: workflow variant",
            "status.md": "Status", "operations.md": "Operations",
            "index.md": "Docs index",
            "stack.md": "unplaced: toolchain candidate",
            "toolchain.md": "unplaced: toolchain candidate",
            "dependencies.md": "unplaced: toolchain candidate",
            "quality-gates.md": "unplaced: toolchain candidate",
            "configuration-and-data.md": "unplaced: toolchain candidate",
            "testing.md": "unplaced: toolchain candidate",
            "mutation-testing.md": "unplaced: toolchain candidate",
            "testing-under-bun.md": "unplaced: toolchain candidate",
            "editing-pitfalls.md": "unplaced: toolchain candidate",
            "import-purity.md": "unplaced: toolchain candidate",
            "runtime-semantics.md": "unplaced: toolchain candidate",
            "the-gate.md": "unplaced: toolchain candidate",
            "library-evidence.md": "unplaced: evidence",
            "new-module-evidence.md": "unplaced: evidence",
        }
        if name in mapping:
            return mapping[name]
        return "unplaced: docs page"
    return "unplaced: root file"


def budget_for(rel: str, text: str) -> int | None:
    parts = rel.split("/")
    name = parts[-1]
    dirs = parts[:-1]
    has_cjk = bool(CJK.search(text))
    if name == "AGENTS.md":
        if len(parts) == 1:
            return 16000
        if parts[0] in ("apps", "packages"):
            return 8000
        if parts[0] == "src":
            return 4000
        return None
    if name == "README.md":
        if len(parts) == 1:
            return 8000
        if parts[0] in ("apps", "packages") and len(parts) == 3:
            return 8000
        if parts[0] == "src" and len(parts) == 3:
            return None
        if "docs" in dirs:
            return 2000
        if parts[0] == "tasks":
            return 2000
        return 2000 if len(parts) > 1 else 8000
    if name == "CONTEXT.md":
        return 6000
    if name == "status.md":
        return 4000 if has_cjk else 8000
    if name == "summary.md" and parts[0] == "tasks":
        return 3000
    if name.startswith("ADR-") or (
        len(parts) > 2 and parts[0] == "docs" and parts[1] in ("adr", "adrs", "decisions")
        and name != "README.md"
    ):
        return 6000
    if parts[0] == "docs" and "backlog" in dirs and name != "README.md":
        return 4000
    if parts[0] == "docs":
        return 8000
    if len(parts) > 2 and parts[0] in ("apps", "packages") and "docs" in dirs:
        return 8000
    return None


def naming_issue(rel: str) -> str | None:
    name = rel.split("/")[-1]
    if name in ROLE_NAMES:
        return None
    if re.fullmatch(r"[a-z0-9][a-z0-9-]*\.md", name):
        return None
    return "does not match kebab-case role naming"


def broken_links(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    out = []
    for target in LINK.findall(text):
        target = target.strip()
        if target.startswith(("http://", "https://", "mailto:", "#")):
            continue
        target = target.strip("<>")
        target = target.split(" ")[0].split("#")[0]
        if not target:
            continue
        candidate = (path.parent / target)
        if not candidate.exists():
            out.append(target)
    return out


def git(root: Path, *args: str) -> str:
    try:
        return subprocess.run(
            ["git", "-C", str(root), *args],
            capture_output=True, text=True, timeout=20,
        ).stdout.strip()
    except Exception:
        return ""


def audit(root: Path) -> dict:
    files = markdown_files(root)
    rows = []
    for path in files:
        rel = path.relative_to(root).as_posix()
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            rows.append({"rel": rel, "error": "undecodable", "role": "unplaced: undecodable"})
            continue
        rows.append({
            "rel": rel,
            "bytes": path.stat().st_size,
            "volume": volume(text),
            "lines": text.count("\n") + 1,
            "role": guess_role(rel),
            "budget": budget_for(rel, text),
            "cjk": bool(CJK.search(text)),
            "entries": table_entries(text) if path.name == "README.md" else None,
            "naming": naming_issue(rel),
            "broken": broken_links(path),
            "counts": [m.group(0) for m in COUNT_NOUN.finditer(text)]
            if path.name in ("README.md", "index.md", "structure.md", "workspace-layout.md", "architecture.md")
            else [],
        })
    return {
        "root": str(root),
        "files": len(files),
        "dirty": git(root, "status", "--short"),
        "head": git(root, "log", "--oneline", "-1"),
        "rows": rows,
    }


def summarize(data: dict) -> str:
    rows = [r for r in data["rows"] if "error" not in r]
    lines = [f"# {data['root']}", ""]
    lines.append(f"- markdown files: {data['files']}")
    lines.append(f"- head: {data['head']}")
    lines.append(f"- dirty: {data['dirty'] or 'clean'}")
    lines.append(f"- total volume: {sum(r['volume'] for r in rows)}")
    lines.append("")

    breached = [r for r in rows if r["budget"] and r["volume"] > r["budget"]]
    lines.append(f"## Budget breaches ({len(breached)})")
    lines.append("")
    lines.append("| File | Volume | Limit |")
    lines.append("| ---- | ------ | ----- |")
    for r in sorted(breached, key=lambda x: x["volume"] - x["budget"], reverse=True):
        lines.append(f"| {r['rel']} | {r['volume']} | {r['budget']} |")
    lines.append("")

    broken = [(r["rel"], b) for r in rows for b in r["broken"]]
    lines.append(f"## Broken links ({len(broken)})")
    lines.append("")
    for rel, target in broken:
        lines.append(f"- {rel} -> {target}")
    lines.append("")

    cjk = [r["rel"] for r in rows if r["cjk"]]
    lines.append(f"## CJK files ({len(cjk)})")
    lines.append("")
    for rel in cjk:
        lines.append(f"- {rel}")
    lines.append("")

    naming = [r for r in rows if r["naming"]]
    lines.append(f"## Naming deviations ({len(naming)})")
    lines.append("")
    for r in naming:
        lines.append(f"- {r['rel']}")
    lines.append("")

    counts = [(r["rel"], c) for r in rows for c in r["counts"]]
    lines.append(f"## Count-plus-noun hits ({len(counts)})")
    lines.append("")
    for rel, c in counts:
        lines.append(f"- {rel}: {c}")
    lines.append("")

    groups: dict[str, list[dict]] = {}
    for r in rows:
        groups.setdefault(r["role"], []).append(r)
    lines.append("## Roles")
    lines.append("")
    lines.append("| Role | Files | Volume | Sample |")
    lines.append("| ---- | ----- | ------ | ------ |")
    for role, items in sorted(groups.items(), key=lambda kv: (-len(kv[1]), kv[0])):
        sample = ", ".join(i["rel"] for i in items[:5])
        lines.append(f"| {role} | {len(items)} | {sum(i['volume'] for i in items)} | {sample} |")
    lines.append("")

    unplaced = [r["rel"] for r in rows if r["role"].startswith("unplaced")]
    lines.append(f"## Unplaced ({len(unplaced)})")
    lines.append("")
    for rel in unplaced:
        lines.append(f"- {rel}")
    return "\n".join(lines)


def main() -> int:
    root = Path(sys.argv[1]).resolve()
    data = audit(root)
    if len(sys.argv) > 2:
        Path(sys.argv[2]).write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(summarize(data))
    return 0


if __name__ == "__main__":
    sys.exit(main())
