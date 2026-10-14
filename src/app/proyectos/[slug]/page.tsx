import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ConsultanosButton from "@/components/ConsultanosButton";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectGallery from "@/components/ProjectGallery";
import AnimatedProjectHero from "@/components/AnimatedProjectHero";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
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
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.concept,
      url: `/proyectos/${project.slug}`,
      images: [{ url: project.heroImage, alt: project.title }],
    },
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

  // Prev/next across the whole portfolio (wraps around), in data order.
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];

  const restOfPage = (
    <>
      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Meta bar */}
        <ScrollReveal className="border-b border-[var(--border)] py-8 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-1.5">Año</p>
              <p className="text-[var(--text-primary)] text-base">{project.year}</p>
            </div>
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-1.5">Tipología</p>
              <p className="text-[var(--text-primary)] text-base capitalize">
                {typologyLabels[project.typology]}
              </p>
            </div>
            {project.area && (
              <div>
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-1.5">Programa</p>
                <p className="text-[var(--text-primary)] text-base">{project.area}</p>
              </div>
            )}
          </div>
          <span
            className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border rounded-full ${statusColors[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </ScrollReveal>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 py-16">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ScrollReveal>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                Concepto
              </p>
              <p className="font-display text-3xl md:text-4xl leading-[1.2] text-[var(--text-primary)]">
                {project.concept}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                Descripción
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg max-w-2xl">
                {project.description}
              </p>
            </ScrollReveal>

          </div>

          {/* Sidebar */}
          <ScrollReveal delay={150} className="flex flex-col gap-10 lg:sticky lg:top-24 self-start">
            {/* Materialidad */}
            <div>
              <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-4">
                Materialidad
              </p>
              <ul className="flex flex-col gap-2">
                {project.materials.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-[var(--text-secondary)] text-base">
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
                    <li key={h} className="flex items-start gap-3 text-[var(--text-secondary)] text-base">
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--border)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="relative border border-[var(--border)] bg-[var(--bg-surface)] p-7 flex flex-col gap-3">
              <span className="absolute top-0 left-0 w-10 h-px bg-[var(--accent)]" aria-hidden />
              <p className="font-display text-2xl text-[var(--text-primary)]">
                ¿Te interesa un proyecto similar?
              </p>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                Contanos sobre tu idea y te respondemos a la brevedad.
              </p>
              <ConsultanosButton className="btn-primary mt-3">
                Consultanos
                <ArrowRightIcon className="w-4 h-4" />
              </ConsultanosButton>
            </div>
          </ScrollReveal>
        </div>

        {/* Gallery — full page width (not just this 2/3 column), so it
            picks up the width the sidebar leaves unused once Materialidad/
            CTA run out of content. Row sizes/widths follow each photo's own
            orientation (see ProjectGallery + lib/galleryLayout.ts). Extra
            bottom padding so the last row gets some breathing room (on the
            page's black background) before "También en..." starts. */}
        {project.gallery.length > 0 && (
          <div className="pb-16 md:pb-24">
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        )}
      </div>

      {/* Related projects */}
      {otherProjects.length > 0 && (
        <section className="border-t border-[var(--border)] py-16 bg-[var(--bg-surface)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase">
                  También en {typologyLabels[project.typology]}
                </p>
                <Link href="/proyectos" className="link-arrow">
                  Ver todos
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12">
              {otherProjects.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 100}>
                  <ProjectCard project={p} dimmed />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <nav
        aria-label="Otros proyectos"
        className="border-t border-[var(--border)] grid grid-cols-2"
      >
        <Link
          href={`/proyectos/${prevProject.slug}`}
          className="group px-6 md:px-10 py-10 md:py-14 border-r border-[var(--border)] hover:bg-[var(--bg-surface)] transition-colors duration-300"
        >
          <span className="flex items-center gap-2 text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-3">
            <ArrowLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Anterior
          </span>
          <span className="font-display text-xl md:text-3xl text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {prevProject.title}
          </span>
        </Link>
        <Link
          href={`/proyectos/${nextProject.slug}`}
          className="group px-6 md:px-10 py-10 md:py-14 text-right hover:bg-[var(--bg-surface)] transition-colors duration-300"
        >
          <span className="flex items-center justify-end gap-2 text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-3">
            Siguiente
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="font-display text-xl md:text-3xl text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {nextProject.title}
          </span>
        </Link>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 border-t border-[var(--border)]">
        <Link href="/proyectos" className="link-arrow is-back">
          <ArrowLeftIcon className="w-4 h-4" />
          Volver a proyectos
        </Link>
      </div>
    </>
  );

  // Fullscreen shrinking-cover intro (see AnimatedProjectHero.tsx) — it only
  // mounts the rest of the page once the intro is fully settled, so nothing
  // below can appear before the animation actually finishes.
  return <AnimatedProjectHero project={project}>{restOfPage}</AnimatedProjectHero>;
}
