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
      <div className="pt-36 md:pt-44 pb-12 max-w-[1400px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <p className="eyebrow mb-6">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h1 className="font-display text-5xl md:text-7xl leading-none">Proyectos</h1>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-md">
              Edificios en altura, casas en barrios privados y arquitectura comercial en La
              Plata y alrededores.
            </p>
          </div>

          {/* Filters */}
          <div
            role="group"
            aria-label="Filtrar por tipología"
            className="flex flex-wrap gap-x-8 gap-y-2 border-b border-[var(--border)]"
          >
            {filters.map((f) => {
              const isActive = active === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActive(f.value)}
                  aria-pressed={isActive}
                  className={`relative min-h-[44px] -mb-px flex items-center gap-2 text-xs tracking-[0.15em] uppercase border-b transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--text-primary)] border-[var(--accent)]"
                      : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
                  }`}
                >
                  {f.label}
                  <span
                    className={`text-[10px] tabular-nums ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {String(f.count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
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
