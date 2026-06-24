import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables `use cache` + cacheLife so live eBay slots render instantly from
  // cache and refresh server-side every 60s. See lib/slots-cache.ts.
  cacheComponents: true,
};

export default nextConfig;
