import Link from "next/link";
import ProjectImage from "./ProjectImage";
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
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            dimmed ? "brightness-50" : ""
          }`}
          priority={priority}
        />
      </div>

      <div className="pt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[var(--text-primary)] font-light text-lg leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-[var(--text-secondary)] text-base font-light">{project.subtitle}</p>
          )}
          <p className="text-[var(--text-muted)] text-[10px] tracking-[0.15em] uppercase mt-1.5">
            {typologyLabels[project.typology]} — {statusLabels[project.status]}
          </p>
        </div>
        <span className="text-[var(--text-muted)] text-xs shrink-0 pt-1">{project.year}</span>
      </div>
    </Link>
  );
}
