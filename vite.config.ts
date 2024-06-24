import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      extension: ["ts"],
      exclude: [
        "src/env",
        "src/lib",
        "src/http",
        "src/repositories/prisma",
        "src/app.ts",
        "src/server.ts",
      ],
    },
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
  },
});
