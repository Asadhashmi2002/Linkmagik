import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV === 'production' 
      ? `https://${process.env.APP_HOSTING_SITE_ID}.web.app`
      : 'http://localhost:9002',
  }
};

export default nextConfig;
