import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectImage from "@/components/ProjectImage";
import { getProjectBySlug, projects, typologyLabels, statusLabels } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.concept,
  };
}

const statusColors = {
  "en-desarrollo": "text-[var(--accent)] border-[var(--accent)]/40",
  "en-obra": "text-blue-400 border-blue-400/40",
  entregado: "text-green-400 border-green-400/40",
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = projects
    .filter((p) => p.slug !== project.slug && p.typology === project.typology)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-surface)]">
          <ProjectImage
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/10 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-10 pb-12 pt-24">
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-3">
            {typologyLabels[project.typology]} — {project.location}
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[var(--text-primary)]">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-[var(--text-secondary)] text-xl font-light mt-1">
              {project.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Meta bar */}
        <div className="border-b border-[var(--border)] py-6 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-1">Año</p>
              <p className="text-[var(--text-primary)] text-sm">{project.year}</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-1">Tipología</p>
              <p className="text-[var(--text-primary)] text-sm capitalize">
                {typologyLabels[project.typology]}
              </p>
            </div>
            {project.area && (
              <div>
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-1">Programa</p>
                <p className="text-[var(--text-primary)] text-sm">{project.area}</p>
              </div>
            )}
          </div>
          <span
            className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border rounded-full ${statusColors[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 py-16">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                Concepto
              </p>
              <p className="text-xl md:text-2xl font-light leading-snug text-[var(--text-primary)]">
                {project.concept}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                Descripción
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-px bg-[var(--border)]">
                {project.gallery.map((src, i) => (
                  <div key={i} className="relative aspect-video bg-[var(--bg-surface)]">
                    <ProjectImage
                      src={src}
                      alt={`${project.title} — imagen ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            {/* Materialidad */}
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                Materialidad
              </p>
              <ul className="flex flex-col gap-2">
                {project.materials.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--accent)]" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            {project.highlights && (
              <div>
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                  Destaques
                </p>
                <ul className="flex flex-col gap-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--border)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="border border-[var(--border)] p-6 flex flex-col gap-3">
              <p className="text-[var(--text-primary)] text-sm font-light">
                ¿Te interesa un proyecto similar?
              </p>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
                Contanos sobre tu idea y te respondemos a la brevedad.
              </p>
              <Link
                href="/contacto"
                className="mt-2 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg)] text-xs tracking-[0.1em] uppercase text-center hover:bg-[var(--accent)] transition-colors duration-300"
              >
                Consultanos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related projects */}
      {otherProjects.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 bg-[var(--bg-surface)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase">
                También en {typologyLabels[project.typology]}
              </p>
              <Link
                href="/proyectos"
                className="text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase hover:text-[var(--text-primary)] transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
              {otherProjects.map((p) => (
                <div key={p.slug} className="bg-[var(--bg-surface)]">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nav back */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 border-t border-[var(--border)]">
        <Link
          href="/proyectos"
          className="flex items-center gap-2 text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase hover:text-[var(--text-primary)] transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Volver a proyectos
        </Link>
      </div>
    </>
  );
}
