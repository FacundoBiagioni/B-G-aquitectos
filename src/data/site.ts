export const homeCover = {
  src: "/portada/portada.jpg",
  alt: "Estudio B+G — Arquitectura",
};

// Placeholder until the studio buys a real domain — update this one line
// (or set NEXT_PUBLIC_SITE_URL) and sitemap/robots/canonical/OG all follow.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://estudioarqbg.com";

export const siteInfo = {
  name: "Estudio B+G Arquitectura",
  email: "estudioarq.bg@gmail.com",
  phones: ["+5492214636769", "+5492216205669"],
  instagram: "https://www.instagram.com/estudioarq.bg/",
  address: {
    street: "Cno. Centenario 2744 e/ 504 y 505",
    locality: "Gonnet, La Plata",
    region: "Buenos Aires",
    country: "AR",
  },
};

// WhatsApp contacts — one per partner. `phone` is the international format
// wa.me expects (no "+", no spaces); `display` is how it's written on the site.
export const whatsappContacts = [
  { name: "José Luis Biagioni", shortName: "José Luis", phone: "5492214636769", display: "0221 15 463-6769" },
  { name: "Kevin Gershanik", shortName: "Kevin", phone: "5492216205669", display: "0221 15 620-5669" },
];

const whatsappMessage = "Hola, los contacto desde la web del estudio. Quería hacerles una consulta.";

export function whatsappUrl(phone: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
}
