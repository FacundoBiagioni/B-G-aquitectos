import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Estudio B+G Arquitectura | La Plata",
    template: "%s | Estudio B+G Arquitectura",
  },
  description:
    "Estudio de arquitectura en La Plata. Edificios en altura, casas en barrios privados y proyectos comerciales. José Luis Biagioni + Kevin Gershanik.",
  keywords: [
    "estudio de arquitectura La Plata",
    "arquitectos La Plata",
    "edificios en altura La Plata",
    "casas barrios privados La Plata",
    "arquitectura contemporánea La Plata",
    "Gonnet arquitectura",
  ],
  authors: [{ name: "José Luis Biagioni" }, { name: "Kevin Gershanik" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://estudioarqbg.com",
    siteName: "Estudio B+G Arquitectura",
    title: "Estudio B+G Arquitectura | La Plata",
    description:
      "Estudio de arquitectura en La Plata. Edificios, casas en barrios privados y proyectos comerciales.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text-primary)] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
