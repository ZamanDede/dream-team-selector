/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
  },
}

export default nextConfig;
