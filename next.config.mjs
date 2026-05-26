/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Tailwind CSS regeneration on every build
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
