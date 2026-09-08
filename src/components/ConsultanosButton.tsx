"use client";

import type { ReactNode } from "react";
import { usePanel } from "./PanelProvider";

interface ConsultanosButtonProps {
  className?: string;
  children: ReactNode;
}

export default function ConsultanosButton({ className, children }: ConsultanosButtonProps) {
  const { openContact } = usePanel();
  return (
    <button type="button" onClick={openContact} className={className}>
      {children}
    </button>
  );
}
