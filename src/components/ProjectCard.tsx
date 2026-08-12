import Link from "next/link";
import ProjectImage from "./ProjectImage";
import type { Project } from "@/data/projects";
import { typologyLabels, statusLabels } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const statusColors = {
  "en-desarrollo": "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30",
  "en-obra": "bg-blue-500/10 text-blue-400 border-blue-400/30",
  entregado: "bg-green-500/10 text-green-400 border-green-400/30",
};

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group block relative overflow-hidden bg-[var(--bg-surface)] aspect-[4/3]"
    >
      <ProjectImage
        src={project.heroImage}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={priority}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/90 via-[var(--bg)]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase mb-1">
              {typologyLabels[project.typology]} — {project.year}
            </p>
            <h3 className="text-[var(--text-primary)] font-light text-lg leading-tight">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-[var(--text-secondary)] text-sm font-light mt-0.5">
                {project.subtitle}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 text-[9px] tracking-widest uppercase px-2 py-1 border rounded-full ${statusColors[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
        <p className="text-[var(--text-muted)] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
          {project.location}
        </p>
      </div>
    </Link>
  );
}
