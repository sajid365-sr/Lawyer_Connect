/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow external images from unsplash
  images: {
    domains: ["images.unsplash.com", "encrypted-tbn0.gstatic.com"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXTAUTH_URL || "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  webpack: (config, { dev }) => {
    if (dev) {
      // Ensure Webpack HMR works correctly in development
      config.output.publicPath = "http://localhost:3000/_next/";
    }
    return config;
  },
};

module.exports = nextConfig;
