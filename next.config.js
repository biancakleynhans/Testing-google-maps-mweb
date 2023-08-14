/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: '/newdawn',
  images: {
    path: '/newdawn/_next/image',
    domains: ['mweb.co.za', 'www.mweb.co.za', 'apigw.mwebaws.co.za', 'api.mwebaws.co.za', 'picsum.photos', 'i.postimg.cc', 'dev.mwebaws.co.za', 'www.dev.mwebaws.co.za'],
  },
};

module.exports = nextConfig;
