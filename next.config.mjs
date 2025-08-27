// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        allowedDevOrigins: ["*"], // your LAN IP + port
    },
};

export default nextConfig;
