import type { NextConfig } from "next";

/**
 * Two build targets from one config.
 *
 *   npm run build         normal Next.js build, for a real host
 *   npm run build:pages   fully static export for GitHub Pages
 *
 * GitHub Pages serves a project site from a subdirectory
 * (/<repo>/), so the export needs a basePath. It also has no image
 * optimizer and no server, hence `unoptimized` and `output: "export"`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  basePath: basePath || undefined,
  // Directory-style URLs (/about/index.html) are what Pages serves cleanly.
  trailingSlash: isStaticExport,
  images: {
    // No image optimizer exists on Pages. Harmless elsewhere until real
    // photography is wired in; revisit when config/photography.ts gets real src values.
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
