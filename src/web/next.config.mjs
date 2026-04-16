import createNextIntlPlugin from "next-intl/plugin";

const apiOrigin = process.env.API_ORIGIN ?? "http://127.0.0.1:3001";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
