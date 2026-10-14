"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate in right after mount instead of waiting for scroll intersection.
   * Use this for content that's already visible on load with no scroll
   * needed (e.g. the hero) — the scroll-triggered rootMargin would otherwise
   * miss elements sitting near the bottom edge of the screen. */
  immediate?: boolean;
  /** Extra inline styles, merged with the ones this component sets itself
   * (e.g. flex-grow for a justified/row-based gallery layout). */
  style?: CSSProperties;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  immediate = false,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // `immediate` is handled purely in CSS below.
    if (immediate) return;

    // Reduced motion: show final state right away, no observer needed.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  // Above-the-fold content: a CSS keyframe animation that starts on first
  // paint, without waiting for hydration. Driving it from React state (as
  // the scroll-triggered path does) kept the home hero heading — the page's
  // LCP element — invisible until JS loaded: ~5s on a throttled mobile run.
  if (immediate) {
    return (
      <div
        className={`reveal-on-load ${className}`}
        style={{
          ...style,
          animationDelay: `${delay}ms`,
          ["--reveal-y" as string]: `${y}px`,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        transform: visible ? "none" : `translateY(${y}px)`,
      }}
      className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
