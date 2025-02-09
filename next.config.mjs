import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};


const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
  importScripts: ['/workbox/index.js'],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|mp3)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Additional caching rules for player components (if applicable).
    // This assumes these are statically generated or rarely change.  Adjust as needed.
    {
      urlPattern: /^\/(Player|PlayerControls|MobilePlayer|QueueDrawer|TrackList)\//,
      handler: 'CacheFirst',
      options: {
        cacheName: 'player-components',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    // Additional rule for API routes (if used).
    {
      urlPattern: /^\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10, // Maximum time to wait for a network response
      },
    },
  ]
});

export default pwaConfig(nextConfig);