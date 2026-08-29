import type { NextConfig } from "next"

/** `npm run export` writes a fully static `out/` that any host will serve —
 * every route is prerendered, so nothing needs a Node server. The default
 * build stays a normal Next build. */
const staticExport = process.env.STATIC_EXPORT === "1"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport ? { output: "export", images: { unoptimized: true } } : {}),
}

export default nextConfig
