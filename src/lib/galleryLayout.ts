import type { GalleryImage } from "@/data/projects";

export interface GalleryTile extends GalleryImage {
  className: string;
}

type Orientation = "landscape" | "portrait" | "square";

function classify(width: number, height: number): Orientation {
  const aspect = width / height;
  if (aspect >= 1.3) return "landscape";
  if (aspect <= 0.8) return "portrait";
  return "square";
}

/**
 * Assigns each gallery image a grid span based on its real orientation —
 * landscape images get a wider tile, portrait images get a taller one — with
 * a fixed (not random) "every 3rd" cycle promoting some to a bigger, more
 * prominent tile. Same input always produces the same layout: it just looks
 * varied because the source photos/renders themselves vary in orientation.
 */
export function getGalleryTiles(images: GalleryImage[]): GalleryTile[] {
  let landscapeCount = 0;
  let portraitCount = 0;

  return images.map((image) => {
    const orientation = classify(image.width, image.height);

    if (orientation === "landscape") {
      landscapeCount++;
      const big = landscapeCount % 3 === 0;
      return { ...image, className: big ? "col-span-2 row-span-2" : "col-span-2 row-span-1" };
    }

    if (orientation === "portrait") {
      portraitCount++;
      const wide = portraitCount % 3 === 0;
      return { ...image, className: wide ? "col-span-2 row-span-2" : "col-span-1 row-span-2" };
    }

    return { ...image, className: "col-span-1 row-span-1" };
  });
}
