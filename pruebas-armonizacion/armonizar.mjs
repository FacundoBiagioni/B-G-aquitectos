// Prueba de armonización de color (no generativa): corrige balance de blancos,
// niveles, contraste y aplica un tono cálido común, sin redibujar nada.
// Uso: node pruebas-armonizacion/armonizar.mjs <slug> [<slug> ...]
// Lee public/projects/<slug>/ (no lo modifica) y escribe en
// pruebas-armonizacion/<slug>/: las fotos retocadas + comparacion.jpg.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const WB_STRENGTH = 0.6; // 0 = sin corrección de balance, 1 = gris neutro total
const WARM = [1.03, 1.0, 0.96]; // leve calidez común a todas (R, G, B)
const CONTRAST = 1.05;
const SATURATION = 0.95;

async function grade(input) {
  const { channels } = await sharp(input).stats();
  const means = channels.slice(0, 3).map((c) => c.mean);
  const gray = (means[0] + means[1] + means[2]) / 3;
  const gains = means.map((m, i) => (1 + WB_STRENGTH * (gray / m - 1)) * WARM[i]);

  // Separate passes: sharp applies operations in a fixed internal order, so
  // chaining them in one pipeline wouldn't guarantee WB → levels → contrast.
  const balanced = await sharp(input).rotate().linear(gains, [0, 0, 0]).toBuffer();
  const leveled = await sharp(balanced).normalise({ lower: 1, upper: 99.5 }).toBuffer();
  return sharp(leveled)
    .linear(CONTRAST, -(128 * (CONTRAST - 1)))
    .modulate({ saturation: SATURATION })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

async function label(text, width) {
  const svg = `<svg width="${width}" height="44" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#0a0a0a"/>
    <text x="16" y="29" font-family="Arial, sans-serif" font-size="18" letter-spacing="3" fill="#c8a96e">${text}</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function run(slug) {
  const src = path.join(ROOT, "public", "projects", slug);
  const out = path.join(ROOT, "pruebas-armonizacion", slug);
  await mkdir(out, { recursive: true });
  const files = (await readdir(src)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

  const W = 760; // width of each half in the comparison sheet
  const rows = [];
  for (const f of files) {
    const original = path.join(src, f);
    const graded = await grade(original);
    await sharp(graded).toFile(path.join(out, f.replace(/\.(png|jpeg)$/i, ".jpg")));

    const before = await sharp(original).rotate().resize({ width: W }).toBuffer({ resolveWithObject: true });
    const after = await sharp(graded).resize({ width: W }).toBuffer();
    rows.push({ before: before.data, after, h: before.info.height });
  }

  const header = 44;
  const gap = 12;
  const height = header + rows.reduce((s, r) => s + r.h + gap, 0);
  const composites = [
    { input: await label("ANTES (ORIGINAL)", W), left: 0, top: 0 },
    { input: await label("DESPUÉS (ARMONIZADA)", W), left: W + gap, top: 0 },
  ];
  let top = header;
  for (const r of rows) {
    composites.push({ input: r.before, left: 0, top }, { input: r.after, left: W + gap, top });
    top += r.h + gap;
  }
  await sharp({ create: { width: W * 2 + gap, height, channels: 3, background: "#0a0a0a" } })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(path.join(out, "comparacion.jpg"));
  console.log(`${slug}: ${files.length} fotos -> ${path.relative(ROOT, out)}`);
}

for (const slug of process.argv.slice(2)) await run(slug);
