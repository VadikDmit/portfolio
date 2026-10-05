import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/about` },
    ...projects.map((project) => ({ url: `${SITE_URL}/projects/${project.slug}` })),
  ];
}
