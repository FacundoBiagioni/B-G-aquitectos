"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RightPanelProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Set to false for panels short enough to never need scrolling. */
  scrollable?: boolean;
}

export default function RightPanel({
  open,
  onClose,
  children,
  scrollable = true,
}: RightPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Always start scrolled to the top the next time the panel opens.
  useEffect(() => {
    if (!open && panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-40 h-full w-full sm:w-[420px] bg-[var(--bg)] border-l border-[var(--border)] ${
          scrollable ? "overflow-y-auto" : "overflow-hidden"
        } transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {children}
      </div>
    </>
  );
}
