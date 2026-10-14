import Link from "next/link";
import ProjectImage from "@/components/ProjectImage";
import ConsultanosButton from "@/components/ConsultanosButton";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { ArrowRightIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { homeCover, siteInfo, SITE_URL } from "@/data/site";

// Only facts already stated in informe-estudio-bg.md — no invented figures.
const stats = [
  { value: String(projects.length), label: "Proyectos en portfolio" },
  { value: "60.000 m²", label: "Teatro Argentino de La Plata" },
  { value: "ONU · BID", label: "Antecedentes institucionales" },
  { value: "UNLP · Milán", label: "Formación académica" },
];

const homeServices = [
  {
    number: "01",
    title: "Proyecto",
    description:
      "Anteproyecto, proyecto ejecutivo y documentación técnica completa para obra.",
  },
  {
    number: "02",
    title: "Dirección de obra",
    description:
      "Supervisión y coordinación integral de la construcción, asegurando la materialización del diseño.",
  },
  {
    number: "03",
    title: "Consultoría",
    description:
      "Asesoramiento en diseño, materiales, inversión y gerenciamiento de proyectos.",
  },
];

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
      <section className="relative h-svh min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-surface)]">
          <div className="absolute inset-0 hero-drift">
            <ProjectImage
              src={homeCover.src}
              alt={homeCover.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-85"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-20 md:pb-24 w-full">
          <div className="max-w-4xl">
            <ScrollReveal immediate delay={0} y={16}>
              <p className="eyebrow mb-8">Estudio B+G — La Plata, Argentina</p>
            </ScrollReveal>
            <ScrollReveal immediate delay={120}>
              <h1 className="font-display text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[var(--text-primary)] mb-8">
                Arquitectura
                <br />
                <em className="text-[var(--accent)]">elegante, honesta</em>
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
                <Link href="/proyectos" className="btn-primary">
                  Ver proyectos
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <ConsultanosButton className="btn-ghost">Consultanos</ConsultanosButton>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-3"
          aria-hidden
        >
          <span className="text-[var(--text-secondary)] text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
            Scroll
          </span>
          <div className="w-px h-14 bg-white/10 overflow-hidden">
            <div className="w-full h-full bg-[var(--accent)] scroll-line" />
          </div>
        </div>
      </section>

      {/* STATS — factual credentials strip */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border-x border-[var(--border)]">
            {stats.map((s, i) => (
              <ScrollReveal
                key={s.label}
                delay={i * 90}
                y={16}
                className="bg-[var(--bg)] py-8 md:py-10 px-5 md:px-8"
              >
                <p className="font-display text-3xl md:text-4xl text-[var(--text-primary)] mb-2">
                  {s.value}
                </p>
                <p className="text-[var(--text-secondary)] text-[11px] tracking-[0.2em] uppercase">
                  {s.label}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS — CAROUSEL */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-5">Portfolio</p>
                <h2 className="font-display text-4xl md:text-5xl">Proyectos destacados</h2>
              </div>
              <Link href="/proyectos" className="link-arrow hidden sm:inline-flex">
                Ver todos
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100} className="px-6 md:px-10">
          <ProjectsCarousel projects={projects} />
        </ScrollReveal>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-6 sm:hidden">
          <Link href="/proyectos" className="link-arrow">
            Ver todos los proyectos
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-t border-[var(--border)] py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <ScrollReveal className="md:col-span-7">
              <p className="eyebrow mb-8">Sobre el estudio</p>
              <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-[var(--text-primary)]">
                <span className="text-[var(--accent)]">“</span>Diseño, materialidad y calidad
                espacial <em className="text-[var(--accent)]">en equilibrio</em>.
                <span className="text-[var(--accent)]">”</span>
              </blockquote>
            </ScrollReveal>
            <ScrollReveal delay={150} className="md:col-span-5 flex flex-col gap-6 md:pt-16">
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
                Estudio B+G es un estudio de arquitectura con sede en Gonnet, La Plata,
                fundado por los arquitectos José Luis Biagioni y Kevin Gershanik.
                Con formación en la UNLP y el{" "}
                <strong className="text-[var(--text-primary)] font-normal">
                  Politécnico de Milán
                </strong>
                , desarrollamos proyectos de vivienda, edificios en altura y arquitectura
                comercial en toda la región.
              </p>
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
                Nuestro lenguaje se apoya en el{" "}
                <strong className="text-[var(--text-primary)] font-normal">
                  hormigón visto
                </strong>
                , la madera natural, el vidrio y la vegetación integrada. Cada proyecto
                busca la máxima luz natural y una relación fluida entre interior y exterior.
              </p>
              <Link href="/nosotros" className="link-arrow is-accent self-start">
                Conocer el equipo
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PROCESO / DETALLE */}
      <section className="border-t border-[var(--border)] py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal className="order-2 md:order-1 flex flex-col gap-6">
              <p className="eyebrow">El proceso</p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-[var(--text-primary)] max-w-md">
                Cada detalle es <em className="text-[var(--accent)]">una decisión</em>.
              </h2>
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-md">
                Un plano no es solo una guía técnica — es donde empieza cada decisión. La
                proporción de una abertura, el espesor de una junta, la forma en que la luz
                entra a media tarde. Revisamos cada detalle antes de que se convierta en
                obra, porque sabemos que la diferencia entre un proyecto correcto y uno
                memorable está ahí: en lo que no se nota a simple vista, pero se siente al
                habitarlo.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150} y={40} className="order-1 md:order-2">
              <div className="relative">
                {/* Offset frame — a quiet architectural "drawing" gesture behind the sketch. */}
                <div
                  className="absolute -inset-3 md:-inset-4 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 border border-[var(--accent)]/30 pointer-events-none"
                  aria-hidden
                />
                <div className="relative aspect-[4/3] bg-[var(--bg-surface)] overflow-hidden border border-[var(--border)]">
                  <ProjectImage
                    src="/inicio/dibujo.png"
                    alt="Boceto conceptual de una vivienda — Estudio B+G"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="border-t border-[var(--border)] py-24 md:py-32 bg-[var(--bg-surface)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12 gap-6">
              <div>
                <p className="eyebrow mb-5">Servicios</p>
                <h2 className="font-display text-4xl md:text-5xl">Qué hacemos</h2>
              </div>
              <Link href="/servicios" className="link-arrow hidden sm:inline-flex">
                Ver todos los servicios
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {homeServices.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100} className="bg-[var(--bg-surface)]">
                <Link
                  href="/servicios"
                  className="group relative block p-8 md:p-10 h-full hover:bg-[var(--bg-elevated)] transition-colors duration-300"
                >
                  <span
                    className="absolute top-0 left-0 h-px w-full bg-[var(--accent)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    aria-hidden
                  />
                  <p className="font-display text-5xl text-[var(--accent)]/70 mb-8">
                    {service.number}
                  </p>
                  <h3 className="text-[var(--text-primary)] font-light text-xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link href="/servicios" className="link-arrow">
              Ver todos los servicios
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section className="relative py-28 md:py-40 border-t border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0">
          <ProjectImage
            src="/projects/benoit-51/hero3.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/70 to-[var(--bg)]" />
        </div>
        <ScrollReveal className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center flex flex-col items-center">
          <p className="eyebrow mb-8">Empecemos juntos</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6 max-w-3xl">
            ¿Tenés un proyecto <em className="text-[var(--accent)]">en mente</em>?
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Contanos sobre tu proyecto. Trabajamos con viviendas en barrios privados,
            edificios en altura y arquitectura comercial en La Plata y alrededores.
          </p>
          <ConsultanosButton className="btn-primary">
            Consultanos sobre tu proyecto
            <ArrowRightIcon className="w-4 h-4" />
          </ConsultanosButton>
        </ScrollReveal>
      </section>
    </>
  );
}
