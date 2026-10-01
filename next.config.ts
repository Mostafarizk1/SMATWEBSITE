import type { NextConfig } from "next";
import path from "node:path";

// next-intl: we register the `next-intl/config` alias ourselves instead of using `createNextIntlPlugin`.
// The plugin eagerly loads @swc/core for its optional message extractor (unused here), which adds a
// heavy native dependency to every build. The alias below is all the plugin does for our setup.
const requestConfig = "./i18n/request.ts";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
  experimental: {
    // Tailwind CSS is small (~16 KB gz): inlining removes the render-blocking stylesheet request,
    // which matters most for first-time visitors arriving from ads on mobile networks.
    inlineCss: true,
  },
  turbopack: {
    resolveAlias: { "next-intl/config": requestConfig },
  },
  webpack(config) {
    config.resolve.alias["next-intl/config"] = path.resolve(requestConfig);
    return config;
  },
};

export default nextConfig;
