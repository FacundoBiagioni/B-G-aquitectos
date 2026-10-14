import Link from "next/link";
import ProjectImage from "./ProjectImage";
import { ArrowRightIcon } from "./icons";
import type { Project } from "@/data/projects";
import { typologyLabels, statusLabels } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  /** Slightly darkens the image — used for the "también en..." row on a
   * project page so those cards read as secondary next to the gallery
   * above them, even though they're a similar size. */
  dimmed?: boolean;
}

export default function ProjectCard({ project, priority = false, dimmed = false }: ProjectCardProps) {
  return (
    <Link href={`/proyectos/${project.slug}`} className="group block" draggable={false}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-surface)]">
        <ProjectImage
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] ${
            dimmed ? "brightness-50" : ""
          }`}
          priority={priority}
        />
        {/* Hover veil + call to action */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute left-5 bottom-5 flex items-center gap-2 text-[var(--text-primary)] text-[11px] tracking-[0.2em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          Ver proyecto
          <ArrowRightIcon className="w-4 h-4" />
        </span>
        <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/55 backdrop-blur-sm text-[var(--text-primary)] text-[10px] tracking-[0.18em] uppercase">
          {statusLabels[project.status]}
        </span>
      </div>

      <div className="pt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-[var(--text-secondary)] text-base font-light mt-0.5">{project.subtitle}</p>
          )}
          <p className="text-[var(--text-muted)] text-[10px] tracking-[0.18em] uppercase mt-2">
            {typologyLabels[project.typology]}
          </p>
        </div>
        <span className="text-[var(--text-muted)] text-xs tabular-nums shrink-0 pt-2">{project.year}</span>
      </div>
    </Link>
  );
}
