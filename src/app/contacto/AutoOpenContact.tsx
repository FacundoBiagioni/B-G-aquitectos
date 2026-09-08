"use client";

import { useEffect } from "react";
import { usePanel } from "@/components/PanelProvider";

export default function AutoOpenContact() {
  const { openContact } = usePanel();

  useEffect(() => {
    openContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
