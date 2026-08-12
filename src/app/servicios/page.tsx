import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de Estudio B+G: proyecto arquitectónico, dirección de obra y consultoría en diseño, materiales e inversión.",
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
      <div className="pt-32 pb-16 max-w-[1400px] mx-auto px-6 md:px-10 border-b border-[var(--border)]">
        <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-4">
          Lo que hacemos
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight max-w-2xl">Servicios</h1>
      </div>

      {/* Services */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {services.map((service, i) => (
          <div
            key={service.number}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 ${
              i < services.length - 1 ? "border-b border-[var(--border)]" : ""
            }`}
          >
            <div className="flex flex-col gap-4">
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.3em] uppercase">
                {service.number}
              </p>
              <h2 className="text-3xl md:text-4xl font-light">{service.title}</h2>
              <p className="text-[var(--text-secondary)] text-lg font-light italic">
                {service.short}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">{service.description}</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-6">
                Incluye
              </p>
              <ul className="flex flex-col divide-y divide-[var(--border)]">
                {service.includes.map((item) => (
                  <li key={item} className="py-3 flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="py-20 border-t border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl font-light mb-4">¿En qué te podemos ayudar?</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Contanos sobre tu proyecto y te contamos cómo podemos trabajar juntos.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-8 py-3.5 bg-[var(--text-primary)] text-[var(--bg)] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[var(--accent)] transition-colors duration-300"
          >
            Consultanos
          </Link>
        </div>
      </section>
    </>
  );
}
