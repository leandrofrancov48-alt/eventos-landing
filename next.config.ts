import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ingresos",
        permanent: false, // 302 temporal
      },
    ];
  },
};

export default nextConfig;
