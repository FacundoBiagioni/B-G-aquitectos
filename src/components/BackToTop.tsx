"use client";

import { useEffect, useRef, useState } from "react";

// Separate show/hide thresholds (instead of one) so the button doesn't flicker
// right at a single boundary — it appears a bit earlier than it disappears.
const SHOW_RATIO = 0.3;
const HIDE_RATIO = 0.5;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) {
          setVisible(false);
        } else {
          const ratio = window.scrollY / maxScroll;
          setVisible((prev) => {
            if (!prev && ratio > SHOW_RATIO) return true;
            if (prev && ratio < HIDE_RATIO) return false;
            return prev;
          });
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-20 w-11 h-11 flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
}
