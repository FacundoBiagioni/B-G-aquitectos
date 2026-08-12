import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactar a Estudio B+G Arquitectura. Email, teléfono y formulario de consulta para proyectos en La Plata.",
};

export default function ContactoPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 max-w-[1400px] mx-auto px-6 md:px-10 border-b border-[var(--border)]">
        <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-4">
          Hablemos
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">Contacto</h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-10">
            <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed max-w-md">
              Trabajamos en La Plata y alrededores. Si tenés una idea, un terreno o un
              proyecto en mente, escribinos.
            </p>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:estudioarq.bg@gmail.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  estudioarq.bg@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2">
                  Teléfono
                </p>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+5492214636769"
                    className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    0221 15 463-6769 — José Luis Biagioni
                  </a>
                  <a
                    href="tel:+5492216205669"
                    className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    0221 15 620-5669 — Kevin Gershanik
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2">
                  Estudio
                </p>
                <address className="not-italic text-[var(--text-primary)] leading-relaxed">
                  Cno. Centenario 2744 e/ 504 y 505<br />
                  Gonnet, La Plata<br />
                  Buenos Aires, Argentina
                </address>
              </div>

              <div>
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-2">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/estudioarq.bg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  @estudioarq.bg
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
