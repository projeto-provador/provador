import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { rotasImplementadas } from "@/lib/routes";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified reflete a data do build.
  const dataBuild = new Date();

  const paginas = rotasImplementadas().map((rota) => ({
    url: `${SITE_URL}${rota.path}`,
    lastModified: dataBuild,
    changeFrequency: "weekly" as const,
    priority: rota.prioridade,
  }));

  const artigos = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.data),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...paginas, ...artigos];
}
