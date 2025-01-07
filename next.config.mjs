/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'daydreamersnyc.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'daydreamersnyc.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
