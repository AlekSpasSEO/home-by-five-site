import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Required for `output: export`: tells Next this route has no dynamic behaviour.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
