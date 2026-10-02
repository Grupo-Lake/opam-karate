import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.9 },
  { path: "/turmas", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contato", changeFrequency: "yearly", priority: 0.8 },
  { path: "/matricula", changeFrequency: "monthly", priority: 0.8 },
  { path: "/galeria", changeFrequency: "weekly", priority: 0.6 },
  { path: "/codec", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
