"use client";

import { useCallback, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ProjectImage from "./ProjectImage";
import { ExpandIcon } from "./icons";
import { getGalleryTiles } from "@/lib/galleryLayout";
import type { GalleryImage } from "@/data/projects";

interface ProjectGalleryProps {
  images: GalleryImage[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tiles = getGalleryTiles(images);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  // Keyboard nav + lock page scroll while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, prev, next]);

  return (
    <>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[170px] lg:auto-rows-[190px] grid-flow-row-dense gap-3 md:gap-4">
        {tiles.map((tile, i) => (
          <ScrollReveal key={tile.src} delay={(i % 4) * 80} className={tile.className}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Ampliar imagen ${i + 1} de ${title}`}
              className="group relative block h-full w-full overflow-hidden bg-[var(--bg-surface)] text-left cursor-zoom-in"
            >
              <ProjectImage
                src={tile.src}
                alt={`${title} — imagen ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <ExpandIcon className="h-6 w-6 scale-90 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Cerrar"
            autoFocus
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 transition-colors duration-200 hover:border-white/50 hover:text-white"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors duration-200 hover:border-white/50 hover:text-white sm:left-6"
            >
              ←
            </button>
          )}

          <div
            className="relative mx-auto h-[75vh] w-[90vw] max-w-6xl sm:h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectImage
              src={images[openIndex].src}
              alt={`${title} — imagen ${openIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Imagen siguiente"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors duration-200 hover:border-white/50 hover:text-white sm:right-6"
            >
              →
            </button>
          )}

          {images.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.15em] text-white/50">
              {openIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}
