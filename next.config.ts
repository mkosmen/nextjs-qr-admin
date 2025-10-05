import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  sassOptions: { quietDeps: true },
  crossOrigin: "anonymous",
  allowedDevOrigins: ["172.22.128.1", "*.172.22.128.1"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
