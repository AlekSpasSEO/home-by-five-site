#!/usr/bin/env node
/**
 * Static export for GitHub Pages.
 *
 *   node scripts/build-pages.mjs
 *
 * Sets the env the export needs, runs `next build`, then drops a `.nojekyll`
 * marker into the output. Without that marker Pages runs the output through
 * Jekyll, which ignores every directory starting with an underscore, and
 * `_next/` is where all the CSS and JS lives.
 *
 * Written as a Node script rather than an inline env assignment in package.json
 * so it behaves the same on Windows, macOS and CI.
 */
import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const repo = process.env.PAGES_REPO ?? "home-by-five-site";
const owner = process.env.PAGES_OWNER ?? "AlekSpasSEO";

const env = {
  ...process.env,
  STATIC_EXPORT: "true",
  NEXT_PUBLIC_BASE_PATH: `/${repo}`,
  NEXT_PUBLIC_SITE_URL: `https://${owner.toLowerCase()}.github.io/${repo}`,
};

console.log(`Building static export for ${env.NEXT_PUBLIC_SITE_URL}`);

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  env,
  shell: true,
});

if (result.status !== 0) process.exit(result.status ?? 1);

const out = join(process.cwd(), "out");
if (!existsSync(out)) {
  console.error("Expected an out/ directory and did not find one.");
  process.exit(1);
}

writeFileSync(join(out, ".nojekyll"), "");
console.log("Wrote out/.nojekyll");
console.log(`Done. Serve out/ at ${env.NEXT_PUBLIC_SITE_URL}/`);
