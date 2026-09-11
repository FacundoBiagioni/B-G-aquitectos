import type { Metadata } from "next";
import Link from "next/link";
import ProjectImage from "@/components/ProjectImage";
import ConsultanosButton from "@/components/ConsultanosButton";
import ScrollReveal from "@/components/ScrollReveal";
import LocationMap from "@/components/LocationMap";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, siteInfo } from "@/data/site";

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
    images: [{ url: "/team/fachada b+g.png" }],
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
          src="/team/fachada b+g.png"
          alt="Fachada Estudio B+G"
          fill
          priority
          className="object-cover object-[center_32%] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
      </Link>

      {/* Header */}
      <div className="pt-16 pb-0 max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-4">
            El estudio
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">Nosotros</h1>
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
              <p className="text-[var(--text-muted)] text-base">Con el resto del equipo</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} className="flex flex-col gap-6 md:pt-4">
            <p className="text-2xl md:text-3xl font-light leading-snug text-[var(--text-primary)]">
              Dos arquitectos, una visión compartida sobre cómo debería ser la arquitectura.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Estudio B+G nació de la unión de José Luis Biagioni y Kevin Gershanik, arquitectos
              graduados de la Facultad de Arquitectura y Urbanismo de la UNLP con especialización
              en Project & Design Management en el{" "}
              <strong className="text-[var(--text-primary)] font-normal">
                Politécnico de Milán
              </strong>
              .
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Nuestra experiencia abarca desde grandes obras institucionales — como el{" "}
              <strong className="text-[var(--text-primary)] font-normal">
                Teatro Argentino de La Plata
              </strong>{" "}
              (60.000 m²) — hasta viviendas en barrios privados del Gran La Plata, pasando por
              consultoría con organismos internacionales como la{" "}
              <strong className="text-[var(--text-primary)] font-normal">ONU</strong> y el{" "}
              <strong className="text-[var(--text-primary)] font-normal">BID</strong>.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Hoy nos especializamos en arquitectura residencial de alto estándar y edificios en
              altura en La Plata, con un lenguaje consistente: hormigón visto, madera natural,
              vidrio y vegetación integrada.
            </p>
            <ConsultanosButton className="self-start flex items-center gap-2 text-[var(--accent)] text-xs tracking-[0.15em] uppercase hover:gap-3 transition-all group mt-2">
              Hablemos de tu proyecto
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </ConsultanosButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Formación */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-10 border-b border-[var(--border)]">
        <ScrollReveal>
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-10">
            Formación académica
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)]">
          {credentials.map((c, i) => (
            <ScrollReveal key={i} delay={(i % 2) * 100} className="bg-[var(--bg)]">
              <div className="p-6 flex flex-col gap-1">
                <p className="text-[var(--text-muted)] text-[10px] tracking-widest uppercase">
                  {c.year}
                </p>
                <p className="text-[var(--text-primary)] font-light">{c.institution}</p>
                <p className="text-[var(--text-secondary)] text-base">{c.degree}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Antecedentes */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-10">
            Antecedentes institucionales
          </p>
        </ScrollReveal>
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {antecedentes.map((a, i) => (
            <ScrollReveal key={i} delay={Math.min(i, 4) * 60} y={16}>
              <div
                className={`py-6 flex flex-col sm:flex-row sm:items-start sm:gap-8 ${
                  a.highlight ? "" : "opacity-70"
                }`}
              >
                <div className="shrink-0 w-full sm:w-48">
                  {a.highlight && (
                    <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 border border-[var(--accent)]/40 text-[var(--accent)] rounded-full">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="flex-1 mt-2 sm:mt-0">
                  <p className="text-[var(--text-primary)] font-light mb-1">{a.title}</p>
                  <p className="text-[var(--text-secondary)] text-base">{a.role}</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1">{a.org}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-16 border-t border-[var(--border)] max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-4">
            Dónde estamos
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
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
      <section className="py-20 border-t border-[var(--border)] bg-[var(--bg-surface)]">
        <ScrollReveal className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl font-light mb-6">¿Trabajamos juntos?</h2>
          <ConsultanosButton className="inline-flex px-8 py-3.5 bg-[var(--text-primary)] text-[var(--bg)] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[var(--accent)] transition-colors duration-300">
            Contactar al estudio
          </ConsultanosButton>
        </ScrollReveal>
      </section>
    </>
  );
}
