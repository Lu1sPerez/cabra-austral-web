import type { MetadataRoute } from "next";
import { URL_SITIO } from "@/lib/negocio";

// Las dos versiones de la web: castellano ("/") e inglés ("/en")
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${URL_SITIO}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${URL_SITIO}/en`, changeFrequency: "weekly", priority: 0.9 },
  ];
}
