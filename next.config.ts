import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  // O deploy do ambiente de staging (quipeai-redesign) sobe sem eslint.config.mjs;
  // o lint roda no CI/local. Não bloquear o build por lint no upload direto.
  eslint: { ignoreDuringBuilds: true },
};

const withMDX = createMDX({
  options: { remarkPlugins: [remarkGfm] },
});

export default withMDX(nextConfig);
