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
    if (immediate) {
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

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        transform: visible ? "none" : `translateY(${y}px)`,
      }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
