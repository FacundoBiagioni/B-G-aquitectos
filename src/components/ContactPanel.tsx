"use client";

import RightPanel from "./RightPanel";
import ContactForm from "./ContactForm";
import { usePanel } from "./PanelProvider";

export default function ContactPanel() {
  const { panel, close } = usePanel();

  return (
    <RightPanel open={panel === "contact"} onClose={close}>
      <div className="flex flex-col gap-8 px-8 sm:px-10 pt-28 pb-12">
        <div>
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-3">
            Hablemos
          </p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[var(--text-primary)]">
            Contacto
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mt-4">
            Trabajamos en La Plata y alrededores. Si tenés una idea, un terreno o un proyecto
            en mente, escribinos.
          </p>
        </div>

        <ContactForm />
      </div>
    </RightPanel>
  );
}
