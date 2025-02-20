import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Ánh xạ URL ngắn gọn đến các file trong thư mục /client
      { source: "/", destination: "/client/home" },
      { source: "/profile", destination: "/client/profile" },
      { source: "/category", destination: "/client/category/index" },
      { source: "/manga", destination: "/client/manga/index" },
      { source: "/movie", destination: "/client/movie/index" },
      { source: "/team", destination: "/client/team/index" },
      { source: "/about", destination: "/client/about" },

      { source: "/login", destination: "/auth/login" },
    ];
  },
};

export default nextConfig;
