#!/usr/bin/env node
/**
 * Resizes and re-compresses images under public/ in place (same path, same
 * extension) so the repo and the images Next.js has to optimize on request
 * stay a reasonable size. Safe to re-run any time new photos are dropped in
 * public/projects, public/team or public/portada — already-small files are
 * left untouched (only overwritten if the result is smaller).
 *
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public");
const TARGET_DIRS = ["projects", "team", "portada"];
const MAX_WIDTH = 2200;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const originalSize = fs.statSync(filePath).size;
  const input = fs.readFileSync(filePath);
  const image = sharp(input, { failOn: "none" });
  const metadata = await image.metadata();

  let pipeline = image.rotate(); // apply EXIF orientation, then strip it
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const output =
    ext === ".png"
      ? await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  if (output.length < originalSize) {
    fs.writeFileSync(filePath, output);
    return { filePath, originalSize, newSize: output.length };
  }
  return null;
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walk(full)));
    } else {
      const result = await processFile(full);
      if (result) results.push(result);
    }
  }
  return results;
}

const all = [];
for (const dir of TARGET_DIRS) {
  const full = path.join(ROOT, dir);
  if (fs.existsSync(full)) all.push(...(await walk(full)));
}

const before = all.reduce((sum, r) => sum + r.originalSize, 0);
const after = all.reduce((sum, r) => sum + r.newSize, 0);

for (const r of all) {
  const rel = path.relative(ROOT, r.filePath);
  const beforeMB = (r.originalSize / 1024 / 1024).toFixed(2);
  const afterMB = (r.newSize / 1024 / 1024).toFixed(2);
  console.log(`${rel}: ${beforeMB}MB -> ${afterMB}MB`);
}

console.log(`\nProcessed ${all.length} files.`);
console.log(`Total: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`);
