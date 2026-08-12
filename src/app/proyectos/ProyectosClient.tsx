"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects, typologyLabels } from "@/data/projects";
import type { ProjectTypology } from "@/data/projects";

type Filter = "todos" | ProjectTypology;

const filters: { value: Filter; label: string; count: number }[] = [
  { value: "todos", label: "Todos", count: projects.length },
  {
    value: "edificio",
    label: typologyLabels.edificio,
    count: projects.filter((p) => p.typology === "edificio").length,
  },
  {
    value: "casa",
    label: typologyLabels.casa,
    count: projects.filter((p) => p.typology === "casa").length,
  },
  {
    value: "comercial",
    label: typologyLabels.comercial,
    count: projects.filter((p) => p.typology === "comercial").length,
  },
];

export default function ProyectosClient() {
  const [active, setActive] = useState<Filter>("todos");

  const visible =
    active === "todos" ? projects : projects.filter((p) => p.typology === active);

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-12 max-w-[1400px] mx-auto px-6 md:px-10">
        <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-4">
          Portfolio
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-10">
          Proyectos
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`flex items-center gap-2 px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 border ${
                active === f.value
                  ? "border-[var(--text-primary)] text-[var(--text-primary)] bg-transparent"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] ${
                  active === f.value ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div
          key={active}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]"
        >
          {visible.map((project, i) => (
            <div key={project.slug} className="bg-[var(--bg)]">
              <ProjectCard project={project} priority={i < 3} />
            </div>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="text-[var(--text-secondary)] text-center py-16">
            No hay proyectos en esta categoría.
          </p>
        )}
      </div>
    </>
  );
}
