import type { Metadata } from "next";
import ProyectosClient from "./ProyectosClient";

const proyectosTitle = "Proyectos";
const proyectosDescription =
  "Portfolio de Estudio B+G. Edificios en altura, casas en barrios privados y proyectos comerciales en La Plata.";

export const metadata: Metadata = {
  title: proyectosTitle,
  description: proyectosDescription,
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: proyectosTitle,
    description: proyectosDescription,
    url: "/proyectos",
  },
};

export default function ProyectosPage() {
  return <ProyectosClient />;
}
