/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // for static export
  images: {
    unoptimized: true, // disable image optimization
  },
};

module.exports = nextConfig;
