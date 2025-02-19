import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Ánh xạ URL ngắn gọn đến các file trong thư mục /client
      { source: "/", destination: "/client/home" },
      { source: "/profile", destination: "/client/profile" },
      { source: "/login", destination: "/client/login" },
    ];
  },
};

export default nextConfig;
