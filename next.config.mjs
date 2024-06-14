/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xfalh2ej6ocmzzq6.public.blob.vercel-storage.com",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
