import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 300, // 5 минут хранить уже открытые динамические страницы (/movies/[id]) в памяти браузера
      static: 300,
    },
  },
  serverExternalPackages: [
    "firebase",
    "@firebase/app",
    "@firebase/firestore",
    "@firebase/auth",
  ],
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
