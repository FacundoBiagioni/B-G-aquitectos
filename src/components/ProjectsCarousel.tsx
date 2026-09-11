"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

interface ProjectsCarouselProps {
  projects: Project[];
}

const AUTOPLAY_SPEED_PX_PER_SEC = 116;
const RESUME_DELAY_MS = 2200;
const HOVER_PAUSE_DELAY_MS = 700;
const MAX_FRAME_DT_SEC = 1 / 30;

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const [dragged, setDragged] = useState(false);

  // Position is tracked in a ref and applied via a GPU-composited transform —
  // driving native scrollLeft every frame forces layout recalculation and was
  // the source of the stutter; translate3d only touches the compositor.
  const offset = useRef(0);
  const maxScroll = useRef(0);
  const paused = useRef(false);
  const direction = useRef<1 | -1>(1);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clamp = (value: number) => Math.min(Math.max(value, 0), maxScroll.current);

  const applyOffset = useCallback((withTransition: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = withTransition ? "transform 0.4s ease" : "none";
    track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  }, []);

  const pauseTemporarily = (ms = RESUME_DELAY_MS) => {
    paused.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      paused.current = false;
    }, ms);
  };

  // Continuous autoplay — bounces between the two ends, pauses on hover/drag/arrows,
  // and stops entirely (no rAF loop at all) while scrolled out of view.
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateMaxScroll = () => {
      maxScroll.current = Math.max(track.scrollWidth - container.clientWidth, 0);
      offset.current = clamp(offset.current);
      applyOffset(false);
    };
    updateMaxScroll();

    const resizeObserver = new ResizeObserver(updateMaxScroll);
    resizeObserver.observe(container);
    resizeObserver.observe(track);

    let rafId: number | null = null;
    let lastTime = performance.now();

    const step = (time: number) => {
      // Cap dt so a slow/delayed frame (page just loaded, tab was backgrounded,
      // a heavy paint) can't move the track in one big visible jump — without
      // this the carousel looks like it "starts fast" before settling down.
      const dt = Math.min((time - lastTime) / 1000, MAX_FRAME_DT_SEC);
      lastTime = time;
      if (!paused.current && maxScroll.current > 1) {
        let next = offset.current + direction.current * AUTOPLAY_SPEED_PX_PER_SEC * dt;
        if (next >= maxScroll.current) {
          next = maxScroll.current;
          direction.current = -1;
        } else if (next <= 0) {
          next = 0;
          direction.current = 1;
        }
        offset.current = next;
        applyOffset(false);
      }
      rafId = requestAnimationFrame(step);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (rafId === null) {
            lastTime = performance.now();
            rafId = requestAnimationFrame(step);
          }
        } else if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, [applyOffset]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    offset.current = clamp(offset.current + dir * amount);
    applyOffset(true);
    pauseTemporarily();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    paused.current = true;
    setDragged(false);
    dragStartX.current = e.clientX;
    dragStartOffset.current = offset.current;
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) setDragged(true);
    offset.current = clamp(dragStartOffset.current - dx);
    applyOffset(false);
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    pauseTemporarily();
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseEnter={() => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
          paused.current = true;
        }, HOVER_PAUSE_DELAY_MS);
      }}
      onMouseLeave={() => {
        if (hoverTimeout.current) {
          clearTimeout(hoverTimeout.current);
          hoverTimeout.current = null;
        }
        if (!isDragging.current) paused.current = false;
      }}
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClickCapture={(e) => {
          if (dragged) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="flex gap-6 md:gap-8 pb-2 cursor-grab active:cursor-grabbing select-none will-change-transform"
        style={{ touchAction: "pan-y" }}
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            data-card
            className="w-[260px] sm:w-[320px] md:w-[360px] shrink-0"
          >
            <ProjectCard project={project} priority={i < 2} />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Proyecto anterior"
          className="w-11 h-11 flex items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Siguiente proyecto"
          className="w-11 h-11 flex items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        >
          →
        </button>
      </div>
    </div>
  );
}
