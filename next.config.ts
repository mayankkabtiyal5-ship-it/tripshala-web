import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The guides section briefly went live at /blog before being renamed to
  // /guides (better SEO/nav match — "guide" is what people actually search
  // for, not "blog"). Permanent redirect in case anything got crawled or
  // shared in that window.
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/guides/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
