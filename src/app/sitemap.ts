import type { MetadataRoute } from "next";
import { URL_SITIO } from "@/lib/negocio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${URL_SITIO}/`, changeFrequency: "weekly", priority: 1 }];
}
