/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure static export is disabled for API routes
  output: undefined,
  // Add trailing slash handling
  trailingSlash: false,
  // Ensure proper rewrites for your app
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;