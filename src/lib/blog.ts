import { ADDRESS, whatsappLink } from "@/lib/site";

export type PostLink = { label: string; href: string };

export type PostBlock =
  | { h2: string }
  | { p: string }
  | { ul: string[] }
  | { links: PostLink[] }
  | { instagram: { href: string; caption: string } };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  category: string;
  minutes: number;
  image: { src: string; width: number; height: number; alt: string };
  body: PostBlock[];
  cta: { title: string; text: string; label: string; href: string };
};

export const FIRST_AID_REGISTRATION_LINK = whatsappLink(
  "Olá! Quero me inscrever no Curso de Primeiros Socorros para Atletas (28/11).",
);

const GRUPO_LAKE_URL = "https://grupolake.com.br";
const CODEC_URL = "https://congressocodec.com.br";
const INSTRUCTOR_URL = "https://www.instagram.com/prof_wagner_cortez/";

const firstAidCourse: Post = {
  slug: "curso-primeiros-socorros-para-atletas",
  title: "Curso de Primeiros Socorros para Atletas: 28 de novembro em Itaquera",
  excerpt:
    "A OPAM e o CODEC apoiam um curso prático de primeiros socorros esportivos, com o Prof. Wagner Cortez, no dia 28 de novembro, na Academia Cross Fênix.",
  date: "2026-10-29",
  category: "Eventos",
  minutes: 3,
  image: {
    src: "/curso-primeiro-socorros-para-atletas.jpeg",
    width: 1086,
    height: 1448,
    alt: "Cartaz do Curso de Primeiros Socorros para Atletas, 28 de novembro, Academia Cross Fênix",
  },
  body: [
    {
      p: "Quem treina ou acompanha treinos sabe que um tombo, uma torção ou um mal-estar podem acontecer a qualquer momento. O que muda tudo é saber o que fazer nos primeiros minutos. Por isso a OPAM, com o apoio do CODEC, abre inscrições para o Curso de Primeiros Socorros para Atletas.",
    },
    { h2: "O que você vai aprender" },
    {
      ul: [
        "Primeiros socorros esportivos",
        "Técnicas de imobilização",
        "Atendimento de emergência",
        "Técnicas essenciais para salvar vidas",
      ],
    },
    {
      p: "O curso é prático. Os participantes treinam as técnicas com os materiais necessários, em vez de só assistir a uma palestra.",
    },
    { h2: "Quem ministra" },
    {
      p: "As aulas ficam a cargo do Prof. Wagner Cortez Domingos, gestor de segurança pública e privada, técnico de enfermagem do trabalho e instrutor de formação de bombeiros. Ele também é o responsável pelo curso.",
    },
    { links: [{ label: "Perfil do Prof. Wagner Cortez no Instagram", href: INSTRUCTOR_URL }] },
    { h2: "Data, horário e local" },
    {
      ul: [
        "Data: sábado, 28 de novembro",
        "Horário: das 11h às 15h",
        `Local: ${ADDRESS.venue}, ${ADDRESS.street}, Itaquera, São Paulo (próximo à estação Dom Bosco)`,
        "Investimento: R$ 50",
        "Vagas limitadas a 25 participantes",
        "Dois certificados: um impresso, emitido pela organização do evento, e outro digital, do palestrante",
      ],
    },
    { h2: "Como se inscrever" },
    {
      ul: [
        "Faça o pagamento de R$ 50 por Pix, para o celular (11) 96939-2260.",
        "Envie o seu nome completo, como deve aparecer no certificado.",
      ],
    },
    {
      p: "Pronto, a inscrição está feita. Como são apenas 25 vagas, vale garantir a sua logo. Dúvidas? Fale com a gente pelo WhatsApp.",
    },
    { h2: "Também no Instagram" },
    {
      instagram: {
        href: "https://www.instagram.com/p/DfFdGBcAszW/",
        caption:
          "Você está preparado para agir em uma situação de emergência? Saber como agir pode fazer toda a diferença e até salvar uma vida. A preparação vai além do tatame.",
      },
    },
    { h2: "Uma ação em conjunto" },
    {
      p: "O curso reúne a OPAM e o Congresso CODEC em torno de uma ideia que os dois defendem: cuidar de quem pratica esporte também faz parte do compromisso com a modalidade. A divulgação deste evento foi feita com o apoio do Grupo Lake, que atualizou os sites das duas iniciativas.",
    },
    {
      links: [
        { label: "Congresso CODEC", href: CODEC_URL },
        { label: "Grupo Lake", href: GRUPO_LAKE_URL },
      ],
    },
  ],
  cta: {
    title: "Garanta sua vaga.",
    text: "São 25 vagas, R$ 50, com certificado impresso e digital.",
    label: "Inscrever pelo WhatsApp",
    href: FIRST_AID_REGISTRATION_LINK,
  },
};

export const POSTS: Post[] = [firstAidCourse].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
