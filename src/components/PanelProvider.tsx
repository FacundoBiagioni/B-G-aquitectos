"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type PanelKind = "menu" | "contact" | null;

interface PanelContextValue {
  panel: PanelKind;
  openMenu: () => void;
  openContact: () => void;
  close: () => void;
}

const PanelContext = createContext<PanelContextValue | null>(null);

export function PanelProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [panel, setPanel] = useState<PanelKind>(null);

  // Close whatever panel is open on real navigation. Adjusting our own state
  // during our own render (not a different component's) is the React-sanctioned
  // way to do this — see "Adjusting state when a prop changes".
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (panel) setPanel(null);
  }

  return (
    <PanelContext.Provider
      value={{
        panel,
        openMenu: () => setPanel("menu"),
        openContact: () => setPanel("contact"),
        close: () => setPanel(null),
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("usePanel must be used within PanelProvider");
  return ctx;
}
