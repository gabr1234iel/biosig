/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      SCROLL_SEPOLIA_RPC_URL: process.env.SCROLL_SEPOLIA_RPC_URL,
      DEPLOYER_PRIVATE_KEY: process.env.DEPLOYER_PRIVATE_KEY,
    },
  };
  
  export default nextConfig;