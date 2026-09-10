"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

interface ProjectsCarouselProps {
  projects: Project[];
}

const AUTOPLAY_SPEED_PX_PER_SEC = 85;
const RESUME_DELAY_MS = 2200;

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [dragged, setDragged] = useState(false);

  const paused = useRef(false);
  const direction = useRef<1 | -1>(1);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    let rafId: number | null = null;
    let lastTime = performance.now();

    const step = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (!paused.current) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 1) {
          let next = track.scrollLeft + direction.current * AUTOPLAY_SPEED_PX_PER_SEC * dt;
          if (next >= maxScroll) {
            next = maxScroll;
            direction.current = -1;
          } else if (next <= 0) {
            next = 0;
            direction.current = 1;
          }
          track.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
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
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
    pauseTemporarily();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    paused.current = true;
    setDragged(false);
    dragStartX.current = e.clientX;
    dragStartScroll.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) setDragged(true);
    track.scrollLeft = dragStartScroll.current - dx;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    pauseTemporarily();
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
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
        className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-2 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
