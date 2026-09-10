"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import { projects, typologyLabels } from "@/data/projects";
import type { ProjectTypology } from "@/data/projects";
import { getMosaicSpanClass } from "@/lib/gridSpans";

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
        <ScrollReveal>
          <p className="text-[var(--accent)] text-[10px] tracking-[0.3em] uppercase mb-4">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-10">
            Proyectos
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 md:gap-8 border-b border-[var(--border)] pb-6">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`text-xs tracking-[0.15em] uppercase pb-1 border-b transition-colors duration-200 ${
                  active === f.value
                    ? "text-[var(--text-primary)] border-[var(--accent)]"
                    : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div
          key={active}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16"
        >
          {visible.map((project, i) => (
            <ScrollReveal key={project.slug} delay={(i % 3) * 80} className={getMosaicSpanClass(i)}>
              <ProjectCard project={project} priority={i < 3} />
            </ScrollReveal>
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
