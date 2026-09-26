import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { hasPublic } from "@/lib/assets";

export default function manifest(): MetadataRoute.Manifest {
  const icons: { src: string; sizes: string; type: string }[] = [];
  if (hasPublic(SITE.brand.pwa192)) icons.push({ src: SITE.brand.pwa192, sizes: "192x192", type: "image/png" });
  if (hasPublic(SITE.brand.pwa512)) icons.push({ src: SITE.brand.pwa512, sizes: "512x512", type: "image/png" });
  return {
    name: "Taazu",
    short_name: "Taazu",
    description: SITE.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8E7",
    theme_color: "#EA580C",
    icons: icons,
  };
}
