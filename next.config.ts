import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Ánh xạ URL ngắn gọn đến các file trong thư mục /client
      { source: "/", destination: "/client/home" },
      { source: "/profile", destination: "/client/profile" },
      { source: "/category", destination: "/client/category" },
      { source: "/category/:id", destination: "/client/category/:id" },
      { source: "/manga", destination: "/client/manga" },
      // Route động: /manga/:id → /client/manga/[id]
      { source: "/manga/:id", destination: "/client/manga/:id" },
      { source: "/movie", destination: "/client/movie" },
      { source: "/team", destination: "/client/team" },
      { source: "/about", destination: "/client/about" },

      { source: "/login", destination: "/auth/login" },
    ];
  },
};

export default nextConfig;
