"use client";

import { useCallback, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ProjectImage from "./ProjectImage";
import { ExpandIcon } from "./icons";
import { groupIntoRows } from "@/lib/galleryLayout";
import type { GalleryImage } from "@/data/projects";

interface ProjectGalleryProps {
  images: GalleryImage[];
  title: string;
}

const ROW_HEIGHT_CLASSES = "h-[320px] sm:h-[420px] lg:h-[520px]";

interface GalleryTileButtonProps {
  src: string;
  alt: string;
  onClick: () => void;
}

function GalleryTileButton({ src, alt, onClick }: GalleryTileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ampliar ${alt}`}
      className="group relative block h-full w-full overflow-hidden bg-[var(--bg-surface)] text-left cursor-zoom-in"
    >
      <ProjectImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
        <ExpandIcon className="h-6 w-6 scale-90 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
      </div>
    </button>
  );
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const rows = groupIntoRows(images);

  return (
    <>
      <div className="mt-4 flex flex-col gap-4 md:gap-6">
        {rows.map((rowImages, rowIndex) => (
          <div
            key={rowImages[0].src}
            className={`flex flex-col sm:flex-row gap-4 md:gap-6 ${ROW_HEIGHT_CLASSES}`}
          >
            {rowImages.map((image, i) => {
              const index = images.indexOf(image);
              return (
                <ScrollReveal
                  key={image.src}
                  delay={((rowIndex + i) % 4) * 80}
                  className="min-w-0"
                  style={
                    rowImages.length > 1
                      ? { flexGrow: image.width / image.height, flexBasis: 0 }
                      : { flexGrow: 1 }
                  }
                >
                  <GalleryTileButton
                    src={image.src}
                    alt={`${title} — imagen ${index + 1}`}
                    onClick={() => setOpenIndex(index)}
                  />
                </ScrollReveal>
              );
            })}
          </div>
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
