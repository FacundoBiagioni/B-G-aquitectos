import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PanelProvider } from "@/components/PanelProvider";
import ContactPanel from "@/components/ContactPanel";
import BackToTop from "@/components/BackToTop";
import { SITE_URL, homeCover } from "@/data/site";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const defaultTitle = "Estudio B+G Arquitectura | La Plata";
const defaultDescription =
  "Estudio de arquitectura en La Plata. Edificios en altura, casas en barrios privados y proyectos comerciales. José Luis Biagioni + Kevin Gershanik.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Estudio B+G Arquitectura",
  },
  description: defaultDescription,
  keywords: [
    "estudio de arquitectura La Plata",
    "arquitectos La Plata",
    "edificios en altura La Plata",
    "casas barrios privados La Plata",
    "arquitectura contemporánea La Plata",
    "Gonnet arquitectura",
  ],
  authors: [{ name: "José Luis Biagioni" }, { name: "Kevin Gershanik" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Estudio B+G Arquitectura",
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: homeCover.src, width: 1600, height: 900, alt: homeCover.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [homeCover.src],
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
        <PanelProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ContactPanel />
          <BackToTop />
        </PanelProvider>
      </body>
    </html>
  );
}
