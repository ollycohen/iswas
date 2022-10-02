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
}

module.exports = nextConfig
