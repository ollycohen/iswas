/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    // loader: "default",
    domains: ["localhost", 'cdn.shopify.com'],
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.shopify.com',
        },
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
