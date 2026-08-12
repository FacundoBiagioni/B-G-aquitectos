export type ProjectTypology = "edificio" | "casa" | "comercial";
export type ProjectStatus = "en-desarrollo" | "entregado" | "en-obra";

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  location: string;
  year: string;
  typology: ProjectTypology;
  status: ProjectStatus;
  concept: string;
  description: string;
  materials: string[];
  heroImage: string;
  gallery: string[];
  featured: boolean;
  highlights?: string[];
  area?: string;
  folder: string;
}

export const projects: Project[] = [
  {
    slug: "hiarq-e25",
    title: "Edificio HIARQ E25",
    subtitle: "E25",
    location: "Av. 25 e/ 41 y 42, La Plata",
    year: "2026",
    typology: "edificio",
    status: "en-desarrollo",
    concept:
      "Arquitectura contemporánea de alta calidad. Diseño, materialidad y calidad espacial en equilibrio.",
    description:
      "64 unidades funcionales distribuidas en un edificio de escala urbana que integra hormigorón visto, madera natural y vidrio laminado. El proyecto incorpora amenities completos pensados para la vida moderna: piscina, solárium, parrillas y salón de eventos.",
    materials: ["Hormigón visto", "Madera natural", "Vidrio laminado", "Carpinterías de aluminio negro"],
    heroImage: "/projects/hiarq-e25/hero.jpg",
    gallery: [
      "/projects/hiarq-e25/render-01.jpg",
      "/projects/hiarq-e25/render-02.jpg",
      "/projects/hiarq-e25/render-03.jpg",
    ],
    featured: true,
    area: "Edificio de 64 unidades",
    highlights: [
      "15 monoambientes",
      "24 de 1 dormitorio",
      "19 de 2 dormitorios",
      "6 de 3 dormitorios",
      "Piscina y solárium",
      "Salón de eventos",
    ],
    folder: "01-Edificio HIARQ E25 e 41 y 42",
  },
  {
    slug: "benoit-51",
    title: "Benoit 51",
    subtitle: "B51",
    location: "Boulevard 51 e/ 18 y 19, La Plata",
    year: "2026",
    typology: "edificio",
    status: "en-desarrollo",
    concept:
      "Edificio Boutique de Casas en Altura. Vanguardismo con referencia histórica: Pedro Benoit, el creador de La Plata.",
    description:
      "2.330 m² de arquitectura boutique a 400 metros de la Catedral de La Plata. PB + subsuelo de cocheras + 10 pisos de viviendas con semi-pisos de ingreso privado, cerraduras digitales y balcones con vegetación integrada. El Piso 11 corona el edificio con amenities de primer nivel y vista panorámica.",
    materials: ["Hormigón visto", "Madera exterior e interior", "Vegetación integrada", "Vidrio"],
    heroImage: "/projects/benoit-51/hero.jpg",
    gallery: [
      "/projects/benoit-51/render-01.jpg",
      "/projects/benoit-51/render-02.jpg",
      "/projects/benoit-51/render-03.jpg",
    ],
    featured: true,
    area: "2.330 m²",
    highlights: [
      "A 400 m de la Catedral de La Plata",
      "Piscina con vista a la Catedral",
      "Semi-pisos con ingreso por palier privado",
      "Cerraduras digitales",
      "Junto a Plaza Malvinas",
    ],
    folder: "02-Benoit 51",
  },
  {
    slug: "edificio-e14",
    title: "Edificio E14",
    location: "Calle 14 e/ 46 y 47, La Plata",
    year: "2019",
    typology: "edificio",
    status: "entregado",
    concept:
      "Arquitectura urbana de escala humana con dúplex en pisos superiores y terrazas privadas.",
    description:
      "PB + 9 pisos con 24 unidades: monoambientes, de 1 dormitorio y dúplex en pisos 8 y 9 con terrazas privadas. Hormigón a la vista en laterales, aluminio negro y vidrio laminado. Tecnología integrada: ascensor automático, sistema de incendio presurizado y portero eléctrico con visor.",
    materials: ["Hormigón a la vista", "Aluminio negro", "Vidrio laminado", "Porcelanato ILVA/Vite"],
    heroImage: "/projects/edificio-e14/hero.jpg",
    gallery: [
      "/projects/edificio-e14/render-01.jpg",
      "/projects/edificio-e14/foto-01.jpg",
    ],
    featured: false,
    area: "PB + 9 pisos, 24 unidades",
    folder: "03- Edif 14 e 46 y 47",
  },
  {
    slug: "dx-castells-village",
    title: "DX Castells Village",
    location: "Villa Castells, CDKOT, La Plata",
    year: "2023",
    typology: "casa",
    status: "entregado",
    concept:
      "Casa contemporánea en barrio privado que integra espacios de doble altura con vistas al paisaje.",
    description:
      "Vivienda unifamiliar en Villa Castells con programa completo desarrollado en planta baja y alta. El proyecto explora la relación entre los espacios interiores y el entorno natural del barrio privado a través de grandes ventanales y materialidad cálida.",
    materials: ["Hormigón visto", "Madera", "Vidrio", "Metales oscuros"],
    heroImage: "/projects/dx-castells-village/hero.jpg",
    gallery: [
      "/projects/dx-castells-village/render-01.jpg",
      "/projects/dx-castells-village/foto-01.jpg",
    ],
    featured: true,
    folder: "04-DX Castells Village Cdkot",
  },
  {
    slug: "casa-jorge-nora",
    title: "Casa Jorge y Nora",
    location: "Country El Disco, La Plata",
    year: "2021",
    typology: "casa",
    status: "en-obra",
    concept: "Vivienda familiar pensada para la vida en contacto con la naturaleza.",
    description:
      "Casa familiar en country privado con fuerte relación interior-exterior. El proyecto prioriza la luz natural y la conectividad entre los distintos ambientes.",
    materials: ["Hormigón visto", "Madera", "Vidrio"],
    heroImage: "/projects/casa-jorge-nora/hero.jpg",
    gallery: ["/projects/casa-jorge-nora/foto-01.jpg"],
    featured: false,
    folder: "05-Casa jorge y nora en disco",
  },
  {
    slug: "casa-miralagos",
    title: "Casa Miralagos",
    subtitle: "Vanesa y Gustavo",
    location: "Barrio Miralagos, La Plata",
    year: "2022",
    typology: "casa",
    status: "en-obra",
    concept:
      "Dos propuestas de anteproyecto para una vivienda premium frente al lago.",
    description:
      "Vivienda unifamiliar en Barrio Miralagos con vistas privilegiadas. El estudio desarrolló dos versiones de anteproyecto para explorar distintas relaciones entre el programa doméstico y el lago.",
    materials: ["Hormigón visto", "Madera natural", "Vidrio", "Metales oscuros"],
    heroImage: "/projects/casa-miralagos/hero.jpg",
    gallery: ["/projects/casa-miralagos/render-01.jpg", "/projects/casa-miralagos/foto-01.jpg"],
    featured: false,
    folder: "06-Casa Miralagos - Vanesa y Gustavo",
  },
  {
    slug: "cdkot",
    title: "CDKOT",
    location: "La Plata",
    year: "2023",
    typology: "comercial",
    status: "entregado",
    concept:
      "Refuncionalización de planta y fachada pensada para 10 años de uso eficiente.",
    description:
      "Proyecto de refuncionalización comercial para la empresa CDKOT. El diseño reorganiza la planta existente con un criterio de organización espacial de largo plazo y propone una nueva fachada contemporánea.",
    materials: ["Acero", "Vidrio", "Materiales de construcción en seco"],
    heroImage: "/projects/cdkot/hero.jpg",
    gallery: ["/projects/cdkot/render-01.jpg", "/projects/cdkot/foto-01.jpg"],
    featured: false,
    folder: "07-CDKOT",
  },
  {
    slug: "casa-campos-de-roca",
    title: "Casa Campos de Roca",
    subtitle: "Lote 381",
    location: "Campos de Roca, La Plata",
    year: "2023",
    typology: "casa",
    status: "en-obra",
    concept: "Vivienda en barrio privado de alta gama con fuerte presencia del hormigón visto.",
    description:
      "Casa en Campos de Roca con anteproyecto completo. El programa residencial se desarrolla integrando materiales nobles como el hormigón a la vista y la madera con el paisajismo del barrio.",
    materials: ["Hormigón visto", "Madera", "Vidrio"],
    heroImage: "/projects/casa-campos-de-roca/hero.jpg",
    gallery: ["/projects/casa-campos-de-roca/render-01.jpg"],
    featured: false,
    folder: "08-Casa Campos de Roca Lote 381",
  },
  {
    slug: "fincas-de-duggan-15b",
    title: "Fincas de Duggan 15b",
    subtitle: "Natalia y Ariel",
    location: "Fincas de Duggan, La Plata",
    year: "2024",
    typology: "casa",
    status: "en-obra",
    concept:
      "Documentación técnica completa de una residencia en barrio privado de alta gama.",
    description:
      "Vivienda con documentación técnica integral: 11 láminas de planos completos más instalaciones eléctricas, sanitarias y de gas. El proyecto se desarrolla respetando el reglamento de construcción de Fincas de Duggan.",
    materials: ["Hormigón visto", "Madera", "Vidrio", "Metales oscuros"],
    heroImage: "/projects/fincas-de-duggan-15b/hero.jpg",
    gallery: ["/projects/fincas-de-duggan-15b/render-01.jpg"],
    featured: false,
    folder: "09- Fincas de Duggan 15b - Natalia y Ariel",
  },
  {
    slug: "casa-juze",
    title: "Casa JUZE",
    location: "La Plata",
    year: "2025",
    typology: "casa",
    status: "en-desarrollo",
    concept: "Casa en desarrollo con planta baja ejecutada y planta alta en diseño.",
    description:
      "Vivienda unifamiliar actualmente en desarrollo. La planta baja fue proyectada en 2025 y la planta alta se está diseñando en 2026.",
    materials: ["Hormigón visto", "Madera", "Vidrio"],
    heroImage: "/projects/casa-juze/hero.jpg",
    gallery: [],
    featured: false,
    folder: "10- Casa JUZE",
  },
  {
    slug: "casa-l19-pueblo",
    title: "Casa L19",
    subtitle: "Lorena y Javier",
    location: "Barrio Pueblo, La Plata",
    year: "2025",
    typology: "casa",
    status: "en-obra",
    concept:
      "Casa con renders de calidad premium en barrio privado con fuerte carácter contemporáneo.",
    description:
      "Vivienda en Barrio Pueblo con renders de alta calidad presentados en 2025. El proyecto explora la contemporaneidad del lenguaje B+G en un lote de barrio privado.",
    materials: ["Hormigón visto", "Madera natural", "Vidrio", "Metales negros"],
    heroImage: "/projects/casa-l19-pueblo/hero.jpg",
    gallery: ["/projects/casa-l19-pueblo/render-01.jpg", "/projects/casa-l19-pueblo/render-02.jpg"],
    featured: false,
    folder: "11-Casa Lorena y Javier L19 Pueblo",
  },
  {
    slug: "casa-4f-las-huertas",
    title: "Casa 4F",
    subtitle: "Las Huertas",
    location: "Las Huertas, La Plata",
    year: "2024",
    typology: "casa",
    status: "en-desarrollo",
    concept: "Anteproyecto completo con programa residencial contemporáneo.",
    description:
      "Casa en Las Huertas con anteproyecto completo documentado en PDF. El proyecto integra el vocabulario material característico del estudio.",
    materials: ["Hormigón visto", "Madera", "Vidrio"],
    heroImage: "/projects/casa-4f-las-huertas/hero.jpg",
    gallery: [],
    featured: false,
    folder: "12-Casa 4F las Huertas",
  },
  {
    slug: "andrea-jalo",
    title: "Casa Andrea Jalo",
    location: "Gonnet, La Plata",
    year: "2021",
    typology: "casa",
    status: "entregado",
    concept: "Residencia entregada con documentación fotográfica de alta calidad.",
    description:
      "Vivienda unifamiliar en Gonnet entregada y documentada fotográficamente. El proyecto combina renders de presentación con fotografías del resultado final de obra.",
    materials: ["Hormigón visto", "Madera", "Vidrio"],
    heroImage: "/projects/andrea-jalo/hero.jpg",
    gallery: ["/projects/andrea-jalo/foto-01.jpg", "/projects/andrea-jalo/foto-02.jpg"],
    featured: false,
    folder: "13-Andrea Jalo gonnet",
  },
  {
    slug: "labca",
    title: "LABCA",
    subtitle: "Laboratorio Científico Ambiental",
    location: "La Plata",
    year: "2022",
    typology: "comercial",
    status: "entregado",
    concept:
      "El laboratorio del 2030: flexibilidad de uso, inspiración orgánica y tecnología de vanguardia.",
    description:
      "Proyecto de refuncionalización de fachada para laboratorio científico. El diseño de fachada incorpora chapas microperforadas con corte de agua, LED integrado y vegetación colgante. El proceso partió del relevamiento edilicio real hacia una propuesta estructural y de fachada tecnológica.",
    materials: [
      "Chapas microperforadas con corte de agua",
      "LED integrado",
      "Vegetación colgante",
      "Montaje en seco reciclable",
    ],
    heroImage: "/projects/labca/hero.jpg",
    gallery: ["/projects/labca/render-01.jpg", "/projects/labca/foto-01.jpg"],
    featured: false,
    highlights: [
      "Fachada inspirada en la figura del círculo (microbiología)",
      "Proceso: relevamiento → digitalización 3D → propuesta",
      "Montaje en seco, durable y reciclable",
    ],
    folder: "14- LABCA",
  },
  {
    slug: "duggan2-305",
    title: "Duggan 2 — Lote 305",
    subtitle: "Amparo y Gastón",
    location: "Fincas de Duggan, La Plata",
    year: "2025",
    typology: "casa",
    status: "en-obra",
    concept: "Segunda residencia en Fincas de Duggan con anteproyecto y documentación de obra.",
    description:
      "Vivienda en Fincas de Duggan lote 305, con anteproyecto completo y seguimiento de obra documentado fotográficamente.",
    materials: ["Hormigón visto", "Madera", "Vidrio"],
    heroImage: "/projects/duggan2-305/hero.jpg",
    gallery: ["/projects/duggan2-305/render-01.jpg"],
    featured: false,
    folder: "15- Duggan2 - 305 - Amparo y Gastón",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByTypology(typology: ProjectTypology): Project[] {
  return projects.filter((p) => p.typology === typology);
}

export const typologyLabels: Record<ProjectTypology, string> = {
  edificio: "Edificios",
  casa: "Casas",
  comercial: "Comercial",
};

export const statusLabels: Record<ProjectStatus, string> = {
  "en-desarrollo": "En proyecto",
  "en-obra": "En obra",
  entregado: "Entregado",
};
