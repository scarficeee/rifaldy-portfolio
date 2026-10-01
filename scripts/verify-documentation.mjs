import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import vm from "node:vm";
import ts from "typescript";
import sharp from "sharp";
import { prepareDocumentation } from "./prepare-documentation.mjs";

const code = ts.transpileModule(
  await fs.readFile("content/documentation.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const context = { exports: {} };
vm.runInNewContext(code, context);
const input = Array.from({ length: 8 }, (_, i) => ({
  id: String(i),
  featured: i === 3,
}));
const ordered = context.exports.orderDocuments(input);
assert.equal(ordered[0].id, "3");
assert.equal(new Set(ordered.map((item) => item.id)).size, input.length);
assert.equal(ordered.slice(0, 6).length, 6);
assert.equal(input[0].id, "0", "Curation must not mutate project data");

const root = await fs.mkdtemp(path.join(os.tmpdir(), "rr-documentation-test-"));
try {
  const sourceFolder = path.join(root, "public/media/japanect");
  await fs.mkdir(sourceFolder, { recursive: true });
  const large = await sharp({
    create: { width: 2400, height: 1600, channels: 3, background: "#263b61" },
  })
    .png()
    .toBuffer();
  await fs.writeFile(path.join(sourceFolder, "large.png"), large);
  await sharp({
    create: { width: 240, height: 400, channels: 3, background: "#f2eee6" },
  })
    .webp()
    .toFile(path.join(sourceFolder, "small.webp"));
  const manifest = await prepareDocumentation(root);
  assert.equal(Object.keys(manifest).length, 2);
  const preview = manifest["/media/japanect/large.png"];
  assert.equal(preview.width, 960);
  assert.equal(preview.height, 640);
  assert.equal(preview.srcSet.split(", ").length, 3);
  assert.deepEqual(
    await fs.readFile(path.join(sourceFolder, "large.png")),
    large,
    "Original must not be modified",
  );
  assert.equal(
    manifest["/media/japanect/small.webp"].width,
    240,
    "Small sources must not be upscaled",
  );
  assert.equal(
    manifest["/media/japanect/small.webp"].srcSet.split(", ").length,
    1,
  );
  await fs.unlink(path.join(sourceFolder, "large.png"));
  const next = await prepareDocumentation(root);
  assert.equal(next["/media/japanect/large.png"], undefined);
  await assert.rejects(
    fs.access(path.join(root, "public", preview.src)),
    "Obsolete previews must be removed",
  );
  console.log(
    "PASS: featured ordering retains supports; responsive previews preserve proportions and originals; small images stay native; removed assets are cleaned.",
  );
} finally {
  const resolved = path.resolve(root);
  assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
  assert.ok(path.basename(resolved).startsWith("rr-documentation-test-"));
  await fs.rm(resolved, { recursive: true, force: true });
}
