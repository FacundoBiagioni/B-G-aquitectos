import type { Metadata } from "next";
import ProyectosClient from "./ProyectosClient";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portfolio de Estudio B+G. Edificios en altura, casas en barrios privados y proyectos comerciales en La Plata.",
};

export default function ProyectosPage() {
  return <ProyectosClient />;
}
