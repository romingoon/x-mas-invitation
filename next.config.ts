import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/intro',
        destination: '/?view=intro',
        permanent: true,
      },
      {
        source: '/choirs',
        destination: '/?view=choirs',
        permanent: true,
      },
      {
        source: '/program',
        destination: '/?view=program',
        permanent: true,
      },
      {
        source: '/location',
        destination: '/?view=location',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
