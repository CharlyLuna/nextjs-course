/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "album.mediaset.es",
      },
    ],
  },
}

module.exports = nextConfig
