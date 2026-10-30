import type { MetadataRoute } from "next";
import { URL_SITIO } from "@/lib/negocio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/estado-menu" },
    sitemap: `${URL_SITIO}/sitemap.xml`,
  };
}
