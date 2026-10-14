import type { Metadata } from "next";
import Link from "next/link";
import ProjectImage from "@/components/ProjectImage";
import ConsultanosButton from "@/components/ConsultanosButton";
import ScrollReveal from "@/components/ScrollReveal";
import LocationMap from "@/components/LocationMap";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, siteInfo } from "@/data/site";
import { ArrowRightIcon } from "@/components/icons";

const founders = [
  {
    name: "José Luis Biagioni",
    telephone: siteInfo.phones[0],
  },
  {
    name: "Kevin Gershanik",
    telephone: siteInfo.phones[1],
  },
];

const nosotrosTitle = "Nosotros";
const nosotrosDescription =
  "José Luis Biagioni y Kevin Gershanik — Arquitectos graduados en la UNLP con posgrado en el Politécnico de Milán. Antecedentes en Naciones Unidas, BID y Teatro Argentino de La Plata.";

export const metadata: Metadata = {
  title: nosotrosTitle,
  description: nosotrosDescription,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: nosotrosTitle,
    description: nosotrosDescription,
    url: "/nosotros",
    images: [{ url: "/team/fachada-bg.png" }],
  },
};

const credentials = [
  {
    institution: "Universidad Nacional de La Plata",
    degree: "Arquitectura — FAU",
    year: "UNLP",
  },
  {
    institution: "Politécnico de Milán, Italia",
    degree: "Project & Design Management — FAU UBA + Politecnico di Milano",
    year: "Milano",
  },
  {
    institution: "FAU — UNLP",
    degree: "Especialista en Higiene y Seguridad Laboral en la Construcción",
    year: "UNLP",
  },
  {
    institution: "Cónsul Steel / Instituto Argentino de Construcción en Seco",
    degree: "Steel Framing",
    year: "IACS",
  },
];

const antecedentes = [
  {
    title: "Naciones Unidas",
    role: "Consultoría en la Subsecretaría de Asuntos Municipales",
    org: "Ministerio de Gobierno de Buenos Aires",
    highlight: true,
  },
  {
    title: "BID — Banco Interamericano de Desarrollo",
    role: "Ciudad de la Música — 15.000 m²",
    org: "Gobierno de la Ciudad de Buenos Aires",
    highlight: true,
  },
  {
    title: "Teatro Argentino de La Plata",
    role: "Jefatura de obra y coordinación de sistemas inteligentes",
    org: "60.000 m² — Inauguración octubre 1999",
    highlight: true,
  },
  {
    title: "Hipermercado Wal-Mart La Plata",
    role: "Jefatura de obra — rubro eléctrico",
    org: "La Plata",
    highlight: false,
  },
  {
    title: "ELEPRINT S.A.",
    role: "4 escuelas en Monte Grande",
    org: "Esteban Echeverría, Buenos Aires",
    highlight: false,
  },
  {
    title: "CONYCA S.A.",
    role: "40 viviendas dúplex en City Bell",
    org: "City Bell, La Plata",
    highlight: false,
  },
];

export default function NosotrosPage() {
  return (
    <>
      {founders.map((founder) => (
        <JsonLd
          key={founder.name}
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: founder.name,
            jobTitle: "Arquitecto",
            worksFor: {
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#business`,
              name: siteInfo.name,
            },
            telephone: founder.telephone,
            email: siteInfo.email,
            url: `${SITE_URL}/nosotros`,
          }}
        />
      ))}
      {/* Hero */}
      <Link
        href="/"
        aria-label="Ir al inicio"
        className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[320px] sm:min-h-[400px] md:min-h-[500px] overflow-hidden bg-[var(--bg-surface)] block"
      >
        <ProjectImage
          src="/team/fachada-bg.png"
          alt="Fachada Estudio B+G"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
      </Link>

      {/* Header */}
      <div className="pt-16 pb-0 max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="eyebrow mb-6">El estudio</p>
          <h1 className="font-display text-5xl md:text-7xl leading-none">Nosotros</h1>
        </ScrollReveal>
      </div>

      {/* Intro */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-10 border-b border-[var(--border)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ScrollReveal className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-[var(--bg-surface)] overflow-hidden">
              <ProjectImage
                src="/team/equipo.png"
                alt="José Luis Biagioni y Kevin Gershanik"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative aspect-video bg-[var(--bg-surface)] overflow-hidden">
                <ProjectImage
                  src="/team/equipo2.png"
                  alt="Equipo de trabajo de Estudio B+G"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-[var(--text-secondary)] text-base">Con el resto del equipo</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} className="flex flex-col gap-6 md:pt-4">
            <p className="font-display text-3xl md:text-4xl leading-[1.2] text-[var(--text-primary)]">
              Dos arquitectos, una visión compartida sobre{" "}
              <em className="text-[var(--accent)]">cómo debería ser la arquitectura</em>.
            </p>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Estudio B+G nació de la unión de José Luis Biagioni y Kevin Gershanik, arquitectos
              graduados de la Facultad de Arquitectura y Urbanismo de la UNLP con especialización
              en Project & Design Management en el{" "}
              <strong className="text-[var(--text-primary)] font-normal">
                Politécnico de Milán
              </strong>
              .
            </p>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Nuestra experiencia abarca desde grandes obras institucionales — como el{" "}
              <strong className="text-[var(--text-primary)] font-normal">
                Teatro Argentino de La Plata
              </strong>{" "}
              (60.000 m²) — hasta viviendas en barrios privados del Gran La Plata, pasando por
              consultoría con organismos internacionales como la{" "}
              <strong className="text-[var(--text-primary)] font-normal">ONU</strong> y el{" "}
              <strong className="text-[var(--text-primary)] font-normal">BID</strong>.
            </p>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Hoy nos especializamos en arquitectura residencial de alto estándar y edificios en
              altura en La Plata, con un lenguaje consistente: hormigón visto, madera natural,
              vidrio y vegetación integrada.
            </p>
            <ConsultanosButton className="link-arrow is-accent self-start mt-2">
              Hablemos de tu proyecto
              <ArrowRightIcon className="w-4 h-4" />
            </ConsultanosButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Formación */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-10 border-b border-[var(--border)]">
        <ScrollReveal>
          <p className="eyebrow mb-5">Formación académica</p>
          <h2 className="font-display text-4xl md:text-5xl mb-12">Formación</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
          {credentials.map((c, i) => (
            <ScrollReveal key={i} delay={(i % 2) * 100} className="bg-[var(--bg)]">
              <div className="group relative p-8 h-full flex flex-col gap-2 hover:bg-[var(--bg-surface)] transition-colors duration-300">
                <span
                  className="absolute top-0 left-0 h-px w-full bg-[var(--accent)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  aria-hidden
                />
                <p className="text-[var(--accent)] text-[10px] tracking-[0.25em] uppercase mb-2">
                  {c.year}
                </p>
                <p className="font-display text-2xl text-[var(--text-primary)]">{c.institution}</p>
                <p className="text-[var(--text-secondary)] text-base">{c.degree}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Antecedentes */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="eyebrow mb-5">Antecedentes institucionales</p>
          <h2 className="font-display text-4xl md:text-5xl mb-12">Trayectoria</h2>
        </ScrollReveal>
        <div className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {antecedentes.map((a, i) => (
            <ScrollReveal key={i} delay={Math.min(i, 4) * 60} y={16}>
              <div className="group py-7 grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_auto] gap-x-4 sm:gap-x-8 items-start">
                <span className="font-display text-2xl text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p
                    className={`font-display text-2xl md:text-3xl mb-1 ${
                      a.highlight ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {a.title}
                  </p>
                  <p className="text-[var(--text-secondary)] text-base">{a.role}</p>
                  <p className="text-[var(--text-muted)] text-base mt-1">{a.org}</p>
                </div>
                {a.highlight && (
                  <span className="col-start-2 sm:col-start-3 mt-3 sm:mt-2 justify-self-start text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-[var(--accent)]/40 text-[var(--accent)]">
                    Destacado
                  </span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-16 border-t border-[var(--border)] max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="eyebrow mb-5">Dónde estamos</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Nuestro estudio
          </h2>
          <address className="not-italic text-[var(--text-secondary)] text-base leading-relaxed mb-10">
            Cno. Centenario 2744 e/ 504 y 505, Gonnet, La Plata, Buenos Aires
          </address>
        </ScrollReveal>
        <ScrollReveal delay={150} y={40}>
          <LocationMap />
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-[var(--border)] bg-[var(--bg-surface)]">
        <ScrollReveal className="max-w-[1400px] mx-auto px-6 md:px-10 text-center flex flex-col items-center">
          <p className="eyebrow mb-8">Empecemos juntos</p>
          <h2 className="font-display text-4xl md:text-6xl mb-10">
            ¿Trabajamos <em className="text-[var(--accent)]">juntos</em>?
          </h2>
          <ConsultanosButton className="btn-primary">
            Contactar al estudio
            <ArrowRightIcon className="w-4 h-4" />
          </ConsultanosButton>
        </ScrollReveal>
      </section>
    </>
  );
}
