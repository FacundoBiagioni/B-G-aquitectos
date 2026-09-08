"use client";

import RightPanel from "./RightPanel";
import ContactForm from "./ContactForm";
import { usePanel } from "./PanelProvider";
import { MailIcon, PhoneIcon, MapPinIcon, InstagramIcon } from "./icons";

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
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-4">
            Trabajamos en La Plata y alrededores. Si tenés una idea, un terreno o un proyecto
            en mente, escribinos.
          </p>
        </div>

        <ContactForm />

        <div className="border-t border-[var(--border)] pt-8 flex flex-col gap-6">
          <div>
            <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2 flex items-center gap-1.5">
              Email
              <MailIcon className="w-3 h-3" />
            </p>
            <a
              href="mailto:estudioarq.bg@gmail.com"
              className="text-[var(--text-primary)] text-sm hover:text-[var(--accent)] transition-colors"
            >
              estudioarq.bg@gmail.com
            </a>
          </div>

          <div>
            <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2 flex items-center gap-1.5">
              Teléfono
              <PhoneIcon className="w-3 h-3" />
            </p>
            <div className="flex flex-col gap-1">
              <a
                href="tel:+5492214636769"
                className="text-[var(--text-primary)] text-sm hover:text-[var(--accent)] transition-colors"
              >
                0221 15 463-6769 — José Luis Biagioni
              </a>
              <a
                href="tel:+5492216205669"
                className="text-[var(--text-primary)] text-sm hover:text-[var(--accent)] transition-colors"
              >
                0221 15 620-5669 — Kevin Gershanik
              </a>
            </div>
          </div>

          <div>
            <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2 flex items-center gap-1.5">
              Estudio
              <MapPinIcon className="w-3 h-3" />
            </p>
            <address className="not-italic text-[var(--text-primary)] text-sm leading-relaxed">
              Cno. Centenario 2744 e/ 504 y 505
              <br />
              Gonnet, La Plata, Buenos Aires
            </address>
          </div>

          <div>
            <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2 flex items-center gap-1.5">
              Instagram
              <InstagramIcon className="w-3 h-3" />
            </p>
            <a
              href="https://www.instagram.com/estudioarq.bg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] text-sm hover:text-[var(--accent)] transition-colors"
            >
              @estudioarq.bg
            </a>
          </div>
        </div>
      </div>
    </RightPanel>
  );
}
