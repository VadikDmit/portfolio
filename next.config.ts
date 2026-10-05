import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/projects", destination: "/", statusCode: 301 },
      { source: "/projects/project-03", destination: "/projects/gaya", statusCode: 301 },
      { source: "/projects/project-04", destination: "/projects/pena-pack", statusCode: 301 },
      { source: "/projects/project-05", destination: "/projects/bankfuture", statusCode: 301 },
      { source: "/projects/project-06", destination: "/projects/ugolok", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
