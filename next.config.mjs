/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["picsum.photos", "fastly.picsum.photos"],
  },
};

export default nextConfig;
