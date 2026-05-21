import { getWpHostname, withFaust } from "@faustwp/core";
import type { NextConfig } from "next";
import { createSecureHeaders } from "next-secure-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //output: "export",
  sassOptions: {
    includePaths: ["node_modules"],
  },
  images: {
    //unoptimized: true,
    //dangerouslyAllowLocalIP: true,
    qualities: [50, 75, 90, 100],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "acfpro.local",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: getWpHostname(),
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: createSecureHeaders({
          xssProtection: false,
        }),
      },
    ];
  },
};

export default withFaust(nextConfig);
