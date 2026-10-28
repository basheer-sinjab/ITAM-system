import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const workspace = path.resolve(import.meta.dirname, "..");
const roots = ["src/routes", "src/components", "src/lib"];
const extensions = new Set([".ts", ".tsx"]);
const arabic = /[\u0600-\u06ff]/u;
const values = new Set();

function visitDirectory(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) visitDirectory(absolute);
    else if (extensions.has(path.extname(entry.name))) visitFile(absolute);
  }
}

function add(value) {
  const normalized = value.replace(/\s+/gu, " ").trim();
  if (normalized && arabic.test(normalized)) values.add(normalized);
}

function visitFile(filename) {
  const source = ts.createSourceFile(
    filename,
    fs.readFileSync(filename, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  function walk(node) {
    if (
      ts.isStringLiteralLike(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) ||
      ts.isJsxText(node)
    ) {
      add(node.text);
    }
    ts.forEachChild(node, walk);
  }
  walk(source);
}

for (const root of roots) visitDirectory(path.join(workspace, root));

for (const value of [...values].sort((left, right) =>
  left.localeCompare(right, "ar"),
)) {
  process.stdout.write(`${value}\n`);
}
process.stderr.write(`Arabic source fragments: ${values.size}\n`);
