/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Keep the MongoDB driver out of the webpack bundle.
    serverComponentsExternalPackages: ["mongodb"],
  },
};

module.exports = nextConfig;
