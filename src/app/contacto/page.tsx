import type { Metadata } from "next";
import HomePage from "../page";
import AutoOpenContact from "./AutoOpenContact";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactar a Estudio B+G Arquitectura. Email, teléfono y formulario de consulta para proyectos en La Plata.",
};

export default function ContactoPage() {
  return (
    <>
      <AutoOpenContact />
      <HomePage />
    </>
  );
}
