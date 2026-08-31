#!/usr/bin/env node
/**
 * Publish the static export to the gh-pages branch.
 *
 *   npm run deploy:pages
 *
 * Builds, then force-pushes the contents of out/ to gh-pages as a single
 * commit. gh-pages holds build output only; it is not a branch anyone should
 * edit or merge, which is why each deploy replaces its history outright.
 *
 * Deliberately not a GitHub Actions workflow: publishing from a local build
 * needs no `workflow` token scope and no CI minutes. If this later moves to
 * Actions, delete this script rather than keeping both.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BRANCH = "gh-pages";
const AUTHOR_NAME = process.env.GIT_AUTHOR_NAME ?? "Aleksandar";
const AUTHOR_EMAIL = process.env.GIT_AUTHOR_EMAIL ?? "ace@growthradical.com";

const run = (cmd, args, opts = {}) => {
  const res = spawnSync(cmd, args, { stdio: "inherit", shell: true, ...opts });
  if (res.status !== 0) {
    console.error(`\nFailed: ${cmd} ${args.join(" ")}`);
    process.exit(res.status ?? 1);
  }
};

const capture = (cmd, args, opts = {}) =>
  spawnSync(cmd, args, { encoding: "utf8", shell: true, ...opts }).stdout?.trim() ?? "";

// 1. Build.
run("node", ["scripts/build-pages.mjs"]);

const out = join(process.cwd(), "out");
if (!existsSync(out)) {
  console.error("No out/ directory after build.");
  process.exit(1);
}

const remote = capture("git", ["remote", "get-url", "origin"]);
if (!remote) {
  console.error("No git remote named origin.");
  process.exit(1);
}

// 2. Stage the output in a scratch repo so the working tree is never touched.
const staging = mkdtempSync(join(tmpdir(), "pages-deploy-"));
cpSync(out, staging, { recursive: true });

const git = (...args) => run("git", args, { cwd: staging });

git("init", "-q", "-b", BRANCH);
git("config", "user.name", JSON.stringify(AUTHOR_NAME));
git("config", "user.email", JSON.stringify(AUTHOR_EMAIL));
git("add", "-A");
git("commit", "-q", "-m", JSON.stringify(`Publish static export (${new Date().toISOString()})`));
git("remote", "add", "origin", remote);
git("push", "-q", "--force", "origin", BRANCH);

rmSync(staging, { recursive: true, force: true });

console.log(`\nPushed out/ to ${BRANCH}.`);
console.log("GitHub Pages will rebuild in about a minute.");
