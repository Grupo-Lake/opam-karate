import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Há outro package-lock.json na pasta pai; sem isto o Turbopack usa a pasta
  // pai como raiz e não encontra o `tailwindcss` instalado neste projeto.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Páginas antigas / encerradas
      { source: "/horarios", destination: "/turmas", permanent: true },
      { source: "/campeonato", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Área administrativa nunca deve ser indexada
        source: "/backoffice/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
