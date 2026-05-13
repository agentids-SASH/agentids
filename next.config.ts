import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

/** Set in GitHub Actions to the repo name, e.g. `/agent-ID-PoC-website` for Pages. Leave unset for local `next dev`. */
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath =
  rawBase === "" || rawBase === "/"
    ? undefined
    : rawBase.startsWith("/")
      ? rawBase
      : `/${rawBase}`;

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : "standalone",
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath } : {}),
  /** Keeps Turbopack anchored when multiple lockfiles exist above this project. */
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
