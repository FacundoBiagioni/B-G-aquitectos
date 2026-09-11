"use client";

import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import ProjectImage from "./ProjectImage";
import type { Project } from "@/data/projects";
import { typologyLabels } from "@/data/projects";

interface AnimatedProjectHeroProps {
  project: Project;
  children: ReactNode;
}

// How much accumulated wheel/touch input (px) it takes to go from the
// fullscreen intro to the regular, settled hero size every other project
// page uses.
const SHRINK_DISTANCE_PX = 600;
const FINAL_HEIGHT_VH = 0.7; // matches h-[70vh] on the static hero
const FINAL_MIN_HEIGHT_PX = 500; // matches min-h-[500px] on the static hero
const TEXT_START_SCALE = 1.5;
// How much the visual (eased) progress catches up to the raw input target
// each frame — a mouse wheel arrives in a few big, chunky notches rather
// than a smooth stream, so jumping straight to the raw value felt stuck/
// stepped. Easing towards it every frame turns those chunky notches into
// continuous motion, the same trick smooth-scroll libraries use.
const EASE = 0.16;
const LOCK_EPSILON = 0.997;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function HeroImage({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 bg-[var(--bg-surface)]">
      <ProjectImage
        src={project.heroImage}
        alt={project.title}
        fill
        priority
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/10 to-transparent" />
    </div>
  );
}

interface HeroTextProps {
  project: Project;
  eyebrowRef?: Ref<HTMLParagraphElement>;
  titleRef?: Ref<HTMLHeadingElement>;
  subtitleRef?: Ref<HTMLParagraphElement>;
}

function HeroText({ project, eyebrowRef, titleRef, subtitleRef }: HeroTextProps) {
  return (
    <>
      <p
        ref={eyebrowRef}
        className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-3"
      >
        {typologyLabels[project.typology]} — {project.location}
      </p>
      <h1
        ref={titleRef}
        className="text-4xl md:text-6xl font-light tracking-tight text-[var(--text-primary)]"
      >
        {project.title}
      </h1>
      {project.subtitle && (
        <p ref={subtitleRef} className="text-[var(--text-secondary)] text-xl font-light mt-1">
          {project.subtitle}
        </p>
      )}
    </>
  );
}

// Final, settled state — identical markup/sizing to the static hero used on
// every other project page. Once we reach this, everything (hero + the rest
// of the page, passed in as `children`) renders as normal in-flow content:
// no more fixed positioning, no more hijacked scroll. Scrolling back to the
// top afterwards just shows this same compact hero — the intro never
// replays within the same page load.
function StaticHero({ project }: { project: Project }) {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <HeroImage project={project} />
      <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-10 pb-12 pt-24">
        <HeroText project={project} />
      </div>
    </div>
  );
}

export default function AnimatedProjectHero({ project, children }: AnimatedProjectHeroProps) {
  const [locked, setLocked] = useState(false);
  const lockedRef = useRef(false);
  // `targetProgress` jumps immediately with input (wheel/touch/keys);
  // `visualProgress` is what's actually rendered, eased towards the target
  // every animation frame — see EASE above.
  const targetProgressRef = useRef(0);
  const visualProgressRef = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Live (intro) text nodes — sized via real font-size, not a CSS transform:
  // scaling text with `transform` blurs it (the browser rasterizes it at the
  // small size and stretches the bitmap) instead of re-rendering it crisp at
  // the larger size.
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Invisible clones using the exact final markup — measured once (and on
  // resize) to get the real end font-sizes to animate towards, instead of
  // guessing pixel values that could drift from the actual Tailwind classes
  // or their responsive breakpoints.
  const measureEyebrowRef = useRef<HTMLParagraphElement>(null);
  const measureTitleRef = useRef<HTMLHeadingElement>(null);
  const measureSubtitleRef = useRef<HTMLParagraphElement>(null);
  const endSizes = useRef({ eyebrow: 10, title: 60, subtitle: 20 });

  useEffect(() => {
    if (locked) return;

    const measure = () => {
      if (measureEyebrowRef.current) {
        endSizes.current.eyebrow = parseFloat(getComputedStyle(measureEyebrowRef.current).fontSize);
      }
      if (measureTitleRef.current) {
        endSizes.current.title = parseFloat(getComputedStyle(measureTitleRef.current).fontSize);
      }
      if (measureSubtitleRef.current) {
        endSizes.current.subtitle = parseFloat(getComputedStyle(measureSubtitleRef.current).fontSize);
      }
    };

    const applyStyles = (p: number) => {
      const vh = window.innerHeight;
      const finalHeight = Math.max(vh * FINAL_HEIGHT_VH, FINAL_MIN_HEIGHT_PX);
      const currentHeight = vh + (finalHeight - vh) * p;
      const scale = TEXT_START_SCALE + (1 - TEXT_START_SCALE) * p;

      if (heroRef.current) heroRef.current.style.height = `${currentHeight}px`;
      if (eyebrowRef.current) eyebrowRef.current.style.fontSize = `${endSizes.current.eyebrow * scale}px`;
      if (titleRef.current) titleRef.current.style.fontSize = `${endSizes.current.title * scale}px`;
      if (subtitleRef.current) subtitleRef.current.style.fontSize = `${endSizes.current.subtitle * scale}px`;
    };

    let rafId: number | null = null;
    const loop = () => {
      if (lockedRef.current) return;

      const target = targetProgressRef.current;
      const visual = visualProgressRef.current;
      const next = visual + (target - visual) * EASE;
      visualProgressRef.current = Math.abs(target - next) < 0.0004 ? target : next;
      applyStyles(visualProgressRef.current);

      if (target >= 1 && visualProgressRef.current >= LOCK_EPSILON) {
        lockedRef.current = true;
        setLocked(true);
        return;
      }
      rafId = requestAnimationFrame(loop);
    };

    const advance = (deltaPx: number) => {
      if (lockedRef.current) return;
      targetProgressRef.current = clamp(targetProgressRef.current + deltaPx / SHRINK_DISTANCE_PX, 0, 1);
    };

    // Block the page's real scroll entirely while the intro runs — driving
    // this from window.scrollY (the previous version) fought with the
    // page's actual scroll position. Now wheel/touch/keys only drive our
    // own progress value; the page itself never moves until we're done.
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      advance(e.deltaY);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0]?.clientY ?? touchStartY;
      advance(touchStartY - currentY);
      touchStartY = currentY;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        advance(80);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        advance(-80);
      }
    };

    const onResize = () => measure();

    measure();
    applyStyles(visualProgressRef.current);
    rafId = requestAnimationFrame(loop);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [locked]);

  if (locked) {
    return (
      <>
        <StaticHero project={project} />
        {children}
      </>
    );
  }

  return (
    <>
      {/* Constant full-viewport backdrop, always exactly 100vh — the hero
          itself shrinks shorter than the viewport as the intro progresses,
          and without something solid behind it the gap left at the bottom
          of the screen exposed the real page underneath (the Footer, which
          sits right after this component in the layout) for a moment. */}
      <div className="fixed inset-0 bg-[var(--bg)]" aria-hidden />
      <div
        ref={heroRef}
        className="fixed top-0 left-0 right-0 z-10 overflow-hidden"
        style={{ height: "100vh" }}
      >
        <HeroImage project={project} />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-10 pb-12 pt-24">
          <HeroText
            project={project}
            eyebrowRef={eyebrowRef}
            titleRef={titleRef}
            subtitleRef={subtitleRef}
          />
        </div>
      </div>
      {/* Invisible measurement clone — same markup/classes as the final
          static hero's text, used only to read its real computed
          font-sizes (including responsive breakpoints) so the intro
          animates towards the exact end size instead of a guessed value. */}
      <div className="invisible absolute left-0 top-0 pointer-events-none" aria-hidden>
        <HeroText
          project={project}
          eyebrowRef={measureEyebrowRef}
          titleRef={measureTitleRef}
          subtitleRef={measureSubtitleRef}
        />
      </div>
    </>
  );
}
