export const WHATSAPP_NUMBER = "5511969392260";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const TRIAL_LINK = whatsappLink(
  "Olá! Gostaria de agendar uma aula experimental grátis de Karate.",
);

export const ADDRESS = {
  street: "R. Sabbado D'Ângelo, 1369",
  city: "Itaquera · São Paulo · SP · 08215-545",
  venue: "Academia Cross Fênix",
};

const MAP_QUERY = encodeURIComponent(
  "R. Sabbado D'Ângelo, 1369, Itaquera, São Paulo",
);
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
export const MAP_ROUTE_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/opamkarate/" },
  { name: "YouTube", href: "https://www.youtube.com/@senseibrunoopam8388" },
  { name: "Facebook", href: "https://web.facebook.com/karatenindoryu" },
];

export const NAVIGATION = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Turma e Horários", href: "/turmas" },
  { name: "Galeria", href: "/galeria" },
  { name: "Contato", href: "/contato" },
];

export const WEEK_DAYS = [
  { short: "SEG", initial: "S", long: "Segunda" },
  { short: "TER", initial: "T", long: "Terça" },
  { short: "QUA", initial: "Q", long: "Quarta" },
  { short: "QUI", initial: "Q", long: "Quinta" },
  { short: "SEX", initial: "S", long: "Sexta" },
  { short: "SÁB", initial: "S", long: "Sábado" },
  { short: "DOM", initial: "D", long: "Domingo" },
];

/** `day` is an index into WEEK_DAYS. */
export const CLASSES = [
  { day: 0, period: "night", start: "20:00", end: "21:30" },
  { day: 2, period: "night", start: "20:00", end: "21:30" },
  { day: 5, period: "morning", start: "10:00", end: "12:00" },
] as const;
