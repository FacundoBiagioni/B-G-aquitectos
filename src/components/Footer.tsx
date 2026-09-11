import Link from "next/link";
import Image from "next/image";
import ConsultanosButton from "./ConsultanosButton";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 md:gap-12 mb-12">
          {/* Brand — full width on mobile (its own row), one of three columns from md up */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Link href="/">
              <Image
                src="/logo-bg.png"
                alt="Estudio B+G Arquitectos"
                width={2500}
                height={709}
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </Link>
            <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-xs">
              Arquitectura elegante, honesta y contemporánea, pensada para perdurar en el tiempo.
            </p>
            <a
              href="https://www.instagram.com/estudioarq.bg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] text-xs tracking-widest uppercase hover:text-[var(--accent)] transition-colors"
            >
              @estudioarq.bg
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-[var(--text-muted)] text-xs tracking-[0.2em] uppercase mb-2">
              Navegación
            </p>
            {[
              { href: "/proyectos", label: "Proyectos" },
              { href: "/nosotros", label: "Nosotros" },
              { href: "/servicios", label: "Servicios" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-secondary)] text-sm md:text-base hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ConsultanosButton className="text-left text-[var(--text-secondary)] text-sm md:text-base hover:text-[var(--text-primary)] transition-colors">
              Contacto
            </ConsultanosButton>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-[var(--text-muted)] text-xs tracking-[0.2em] uppercase mb-2">
              Contacto
            </p>
            <a
              href="mailto:estudioarq.bg@gmail.com"
              className="text-[var(--text-secondary)] text-sm md:text-base hover:text-[var(--text-primary)] transition-colors break-all"
            >
              estudioarq.bg@gmail.com
            </a>
            <a
              href="tel:+5492214636769"
              className="text-[var(--text-secondary)] text-sm md:text-base hover:text-[var(--text-primary)] transition-colors"
            >
              0221 15 463-6769
            </a>
            <a
              href="tel:+5492216205669"
              className="text-[var(--text-secondary)] text-sm md:text-base hover:text-[var(--text-primary)] transition-colors"
            >
              0221 15 620-5669
            </a>
            <address className="not-italic text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
              Cno. Centenario 2744<br />
              e/ 504 y 505, Gonnet<br />
              La Plata, Buenos Aires
            </address>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[var(--text-muted)] text-xs">
            © {year} Estudio B+G Arquitectura. Todos los derechos reservados.
          </p>
          <p className="text-[var(--text-muted)] text-xs">
            José Luis Biagioni + Kevin Gershanik — La Plata, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
