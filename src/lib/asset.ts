import { site } from "@/config/site";

/**
 * Prefix a public asset path with the deployment's basePath.
 *
 * next/image applies basePath through its optimizer, but the static export runs
 * with `unoptimized: true`, where the default loader returns the src untouched.
 * On GitHub Pages, which serves the site from /home-by-five-site/, that meant
 * every <img> pointed at the domain root and 404'd.
 *
 * basePath is empty in dev and on a root-domain deploy, so this is a no-op
 * there. Use it for anything referenced from /public by string path.
 */
export const assetPath = (path: string): string => {
  if (!path.startsWith("/")) return path;
  return `${site.basePath}${path}`;
};
