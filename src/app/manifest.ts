import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OPAM KARATE - Academia de Karate Shorin Ryu",
    short_name: "OPAM KARATE",
    description:
      "Academia de Karate Shorin Ryu, afiliada à SHINSHUKAN, com mais de 25 anos de tradição em Itaquera, São Paulo.",
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ee",
    theme_color: "#d4232a",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
