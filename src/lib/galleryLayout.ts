import type { GalleryImage } from "@/data/projects";

// How many images sit in each successive row of the project-page gallery
// (ProjectGallery) — cycles through this fixed pattern instead of a uniform
// N-per-row grid, so rows read as deliberately uneven (a single wide photo,
// then a pair, then three together) rather than a perfectly regular grid.
// Deterministic, not random: the same gallery always lays out the same way.
const ROW_SIZE_PATTERN = [2, 1, 2, 3, 1, 2, 1, 3, 2, 1];

/** Splits `images` into row groups per ROW_SIZE_PATTERN, trimming the last
 * row short if there aren't enough images left to fill it. */
export function groupIntoRows(images: GalleryImage[]): GalleryImage[][] {
  const rows: GalleryImage[][] = [];
  let cursor = 0;
  let i = 0;
  while (cursor < images.length) {
    const size = Math.min(ROW_SIZE_PATTERN[i % ROW_SIZE_PATTERN.length], images.length - cursor);
    rows.push(images.slice(cursor, cursor + size));
    cursor += size;
    i++;
  }
  return rows;
}
