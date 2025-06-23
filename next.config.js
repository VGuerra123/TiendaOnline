/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ───────────── Linter / TypeScript ───────────── */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  /* ───────────── Imágenes remotas ───────────── */
  images: {
    unoptimized: true,
    domains: ['images.pexels.com', 'cdn.shopify.com', 'shopify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com', // comodín correcto
        pathname: '/**',
      },
    ],
  },

  /* ───────────── Modularize imports ───────────── */
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/icons/{{member}}',
    },
  },

  /* ───────────── Otros ajustes ───────────── */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  env: {
    NEXT_PUBLIC_CUSTOM_KEY: 'mercart-chile-2025',
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },

  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  httpAgentOptions: { keepAlive: true },
};

module.exports = nextConfig;
