import type { Metadata } from "next";
import Link from "next/link";
import ProjectImage from "@/components/ProjectImage";
import ConsultanosButton from "@/components/ConsultanosButton";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

// Root not-found: covers notFound() calls (e.g. an unknown project slug)
// and every URL that doesn't match a route.
export default function NotFound() {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <ProjectImage
          src="/projects/benoit-51/hero3.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/85 to-[var(--bg)]/40" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-24">
        <ScrollReveal immediate>
          <p className="eyebrow mb-8">Error 404</p>
          <p
            className="font-display text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none text-[var(--accent)]/70 mb-6"
            aria-hidden
          >
            404
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6 max-w-2xl">
            Esta página <em className="text-[var(--accent)]">no existe</em>.
          </h1>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-lg mb-10">
            Puede que el enlace esté mal escrito o que la página se haya movido. Te dejamos
            algunos caminos para seguir recorriendo el estudio.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="btn-primary">
              Volver al inicio
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link href="/proyectos" className="btn-ghost">
              Ver proyectos
            </Link>
          </div>
          <ConsultanosButton className="link-arrow is-accent mt-8">
            ¿Buscabas contactarnos? Escribinos
            <ArrowRightIcon className="w-4 h-4" />
          </ConsultanosButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
