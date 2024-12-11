import type { NextConfig } from "next";
const API_URL = process.env.API_URL; 

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match all requests starting with /api/
        destination: `${API_URL}/:path*`, // Forward them to the backend API
      },
    ];
  },
};

export default nextConfig;
