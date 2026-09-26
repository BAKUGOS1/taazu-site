import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: SITE.siteUrl + "/privacy", lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
