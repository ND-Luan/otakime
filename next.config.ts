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
      { source: "/manga/:id", destination: "/client/manga/:id" },
      { source: "/manga/:id/:chapterId", destination: "/client/manga/:id/:chapterId" },

      { source: "/movie", destination: "/client/movie" },
      { source: "/movie/:id", destination: "/client/movie/:id" },

      { source: "/team", destination: "/client/team" },
      { source: "/team/:id", destination: "/client/team/:id" },

      { source: "/blog", destination: "/client/blog" },
      { source: "/blog/:id", destination: "/client/blog/:id" },

      { source: "/about", destination: "/client/about" },

      { source: "/login", destination: "/auth/login" },
      { source: "/register", destination: "/auth/register" },

    ];
  },
};

export default nextConfig;
