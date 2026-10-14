import type { Metadata } from "next";
import ConsultanosButton from "@/components/ConsultanosButton";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRightIcon } from "@/components/icons";

const serviciosTitle = "Servicios";
const serviciosDescription =
  "Servicios de Estudio B+G: proyecto arquitectónico, dirección de obra y consultoría en diseño, materiales e inversión.";

export const metadata: Metadata = {
  title: serviciosTitle,
  description: serviciosDescription,
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: serviciosTitle,
    description: serviciosDescription,
    url: "/servicios",
  },
};

const services = [
  {
    number: "01",
    title: "Proyecto",
    short: "De la idea al plano ejecutivo.",
    description:
      "Trabajamos desde el brief inicial hasta la documentación técnica completa. Anteproyecto con alternativas conceptuales, proyecto de ejecución con planos, cortes, elevaciones y planillas, y coordinación con especialidades (estructura, instalaciones).",
    includes: [
      "Anteproyecto con alternativas",
      "Proyecto ejecutivo completo",
      "Planos de instalaciones eléctricas, sanitarias y gas",
      "Documentación para permisos municipales",
      "Renders y visualizaciones 3D",
    ],
  },
  {
    number: "02",
    title: "Dirección de obra",
    short: "El diseño materializado con precisión.",
    description:
      "Supervisamos y coordinamos la construcción para asegurar que cada detalle del proyecto se materialice como fue concebido. Presencia en obra, control de calidad de materiales y mano de obra, certificación de avances y relación con el contratista.",
    includes: [
      "Inspecciones periódicas en obra",
      "Control de calidad de materiales",
      "Coordinación con contratistas y subcontratistas",
      "Certificación de avances",
      "Ajustes y solución de imprevistos",
    ],
  },
  {
    number: "03",
    title: "Consultoría",
    short: "Experiencia al servicio de tu decisión.",
    description:
      "Asesoramiento técnico y estratégico para inversores, propietarios y desarrolladores. Evaluación de terrenos y oportunidades, orientación en selección de materiales, gestión de proyectos y domótica aplicada a edificios inteligentes.",
    includes: [
      "Evaluación de terrenos y factibilidades",
      "Asesoramiento en materiales y sistemas constructivos",
      "Steel Framing y construcción en seco",
      "Domótica e inmótica aplicada",
      "Higiene y seguridad laboral en construcción",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-36 md:pt-44 pb-16 max-w-[1400px] mx-auto px-6 md:px-10 border-b border-[var(--border)]">
        <ScrollReveal>
          <p className="eyebrow mb-6">Lo que hacemos</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-display text-5xl md:text-7xl leading-none">Servicios</h1>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-md">
              Acompañamos cada proyecto desde la primera idea hasta la entrega de la obra.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Services */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {services.map((service, i) => (
          <div
            key={service.number}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-16 md:py-24 ${
              i < services.length - 1 ? "border-b border-[var(--border)]" : ""
            }`}
          >
            <ScrollReveal className="flex flex-col gap-4">
              <p className="font-display text-7xl md:text-8xl leading-none text-[var(--accent)]/60">
                {service.number}
              </p>
              <h2 className="font-display text-4xl md:text-5xl mt-2">{service.title}</h2>
              <p className="font-display italic text-2xl text-[var(--accent)]">{service.short}</p>
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
                {service.description}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="lg:pt-6">
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                Incluye
              </p>
              <ul className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="group py-4 flex items-center gap-4 text-[var(--text-secondary)] text-base hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    <span className="w-4 h-px bg-[var(--accent)] shrink-0 transition-all duration-300 group-hover:w-6" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-[var(--border)] bg-[var(--bg-surface)]">
        <ScrollReveal className="max-w-[1400px] mx-auto px-6 md:px-10 text-center flex flex-col items-center">
          <p className="eyebrow mb-8">Empecemos juntos</p>
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            ¿En qué te podemos <em className="text-[var(--accent)]">ayudar</em>?
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg mb-10 max-w-md mx-auto">
            Contanos sobre tu proyecto y te contamos cómo podemos trabajar juntos.
          </p>
          <ConsultanosButton className="btn-primary">
            Consultanos
            <ArrowRightIcon className="w-4 h-4" />
          </ConsultanosButton>
        </ScrollReveal>
      </section>
    </>
  );
}
