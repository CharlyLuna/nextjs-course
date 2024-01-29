/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fayerwayer.com",
      },
      {
        protocol: "https",
        hostname: "cdn.freelogovectors.net",
      },
    ],
  },
}

export default nextConfig
