import Link from "next/link";
import ProjectImage from "@/components/ProjectImage";
import ConsultanosButton from "@/components/ConsultanosButton";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/data/projects";
import { homeCover, siteInfo, SITE_URL } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#business`,
          name: siteInfo.name,
          url: SITE_URL,
          email: siteInfo.email,
          telephone: siteInfo.phones[0],
          address: {
            "@type": "PostalAddress",
            streetAddress: siteInfo.address.street,
            addressLocality: siteInfo.address.locality,
            addressRegion: siteInfo.address.region,
            addressCountry: siteInfo.address.country,
          },
          sameAs: [siteInfo.instagram],
          areaServed: "La Plata, Buenos Aires, Argentina",
          description:
            "Estudio de arquitectura en La Plata. Edificios en altura, casas en barrios privados y proyectos comerciales.",
        }}
      />
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-surface)]">
          <ProjectImage
            src={homeCover.src}
            alt={homeCover.alt}
            fill
            priority
            className="object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-20 w-full">
          <div className="max-w-3xl">
            <ScrollReveal immediate delay={0} y={16}>
              <p className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-6">
                Estudio B+G — La Plata, Argentina
              </p>
            </ScrollReveal>
            <ScrollReveal immediate delay={120}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-[var(--text-primary)] mb-8">
                Arquitectura
                <br />
                <span className="text-[var(--text-secondary)]">elegante, honesta</span>
                <br />
                y contemporánea.
              </h1>
            </ScrollReveal>
            <ScrollReveal immediate delay={240}>
              <p className="text-[var(--text-secondary)] text-base md:text-lg font-light leading-relaxed max-w-xl mb-10">
                Diseñamos edificios, casas y proyectos únicos en La Plata.
                Materialidad, calidad espacial y luz natural en equilibrio.
              </p>
            </ScrollReveal>
            <ScrollReveal immediate delay={360}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/proyectos"
                  className="px-8 py-3.5 bg-[var(--text-primary)] text-[var(--bg)] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[var(--accent)] transition-colors duration-300"
                >
                  Ver proyectos
                </Link>
                <ConsultanosButton className="px-8 py-3.5 border border-[var(--border)] text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300">
                  Consultanos
                </ConsultanosButton>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2">
          <span className="text-[var(--text-muted)] text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl] animate-bounce">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
        </div>
      </section>

      {/* FEATURED PROJECTS — CAROUSEL */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-3">
                  Portfolio
                </p>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                  Proyectos destacados
                </h2>
              </div>
              <Link
                href="/proyectos"
                className="hidden sm:flex items-center gap-2 text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase hover:text-[var(--text-primary)] transition-colors group"
              >
                Ver todos
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100} className="px-6 md:px-10">
          <ProjectsCarousel projects={projects} />
        </ScrollReveal>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-6 sm:hidden">
          <Link
            href="/proyectos"
            className="flex items-center gap-2 text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase hover:text-[var(--text-primary)] transition-colors group"
          >
            Ver todos los proyectos
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-t border-[var(--border)] py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-6">
                Sobre el estudio
              </p>
              <p className="text-2xl md:text-3xl font-light leading-snug text-[var(--text-primary)] max-w-lg">
                Diseño, materialidad y calidad espacial en equilibrio.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="flex flex-col gap-6">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Estudio B+G es un estudio de arquitectura con sede en Gonnet, La Plata,
                fundado por los arquitectos José Luis Biagioni y Kevin Gershanik.
                Con formación en la UNLP y el{" "}
                <strong className="text-[var(--text-primary)] font-normal">
                  Politécnico de Milán
                </strong>
                , desarrollamos proyectos de vivienda, edificios en altura y arquitectura
                comercial en toda la región.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Nuestro lenguaje se apoya en el{" "}
                <strong className="text-[var(--text-primary)] font-normal">
                  hormigón visto
                </strong>
                , la madera natural, el vidrio y la vegetación integrada. Cada proyecto
                busca la máxima luz natural y una relación fluida entre interior y exterior.
              </p>
              <Link
                href="/nosotros"
                className="self-start flex items-center gap-2 text-[var(--accent)] text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all group"
              >
                Conocer el equipo
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PROCESO / DETALLE */}
      <section className="border-t border-[var(--border)] py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="order-2 md:order-1 flex flex-col gap-6">
              <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase">
                El proceso
              </p>
              <p className="text-2xl md:text-3xl font-light leading-snug text-[var(--text-primary)] max-w-md">
                Cada detalle es una decisión.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-md">
                Un plano no es solo una guía técnica — es donde empieza cada decisión. La
                proporción de una abertura, el espesor de una junta, la forma en que la luz
                entra a media tarde. Revisamos cada detalle antes de que se convierta en
                obra, porque sabemos que la diferencia entre un proyecto correcto y uno
                memorable está ahí: en lo que no se nota a simple vista, pero se siente al
                habitarlo.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150} y={40} className="order-1 md:order-2">
              <div className="relative aspect-[4/3] bg-[var(--bg-surface)] overflow-hidden border border-[var(--border)]">
                <ProjectImage
                  src="/inicio/dibujo.png"
                  alt="Boceto conceptual de una vivienda — Estudio B+G"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="border-t border-[var(--border)] py-24 bg-[var(--bg-surface)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <ScrollReveal>
            <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-12">
              Servicios
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {[
              {
                title: "Proyecto",
                description:
                  "Anteproyecto, proyecto ejecutivo y documentación técnica completa para obra.",
              },
              {
                title: "Dirección de obra",
                description:
                  "Supervisión y coordinación integral de la construcción, asegurando la materialización del diseño.",
              },
              {
                title: "Consultoría",
                description:
                  "Asesoramiento en diseño, materiales, inversión y gerenciamiento de proyectos.",
              },
            ].map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100} className="bg-[var(--bg-surface)]">
                <div className="p-8 h-full hover:bg-[var(--bg-elevated)] transition-colors duration-200">
                  <h3 className="text-[var(--text-primary)] font-light text-lg mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/servicios"
              className="flex items-center gap-2 text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase hover:text-[var(--text-primary)] transition-colors group"
            >
              Ver todos los servicios
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section className="relative py-24 border-t border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0">
          <ProjectImage
            src="/projects/benoit-51/hero3.jpg"
            alt=""
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-[var(--bg)]" style={{ opacity: 0.55 }} />
        </div>
        <ScrollReveal className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-6">
            Empecemos juntos
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6 max-w-2xl mx-auto">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            Contanos sobre tu proyecto. Trabajamos con viviendas en barrios privados,
            edificios en altura y arquitectura comercial en La Plata y alrededores.
          </p>
          <ConsultanosButton className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--text-primary)] text-[var(--bg)] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors duration-300">
            Consultanos sobre tu proyecto
          </ConsultanosButton>
        </ScrollReveal>
      </section>
    </>
  );
}
