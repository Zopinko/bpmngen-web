import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "bpmngen.com",
          },
        ],
        destination: "https://www.bpmngen.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
