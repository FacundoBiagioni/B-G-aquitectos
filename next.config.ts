import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonce/dynamic-rendering setup here (this site is fully static, no auth,
// no user data) — the "without nonces" baseline from Next's own CSP guide is
// the right amount of protection for how simple this site is.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://tile.openstreetmap.org;
  font-src 'self';
  connect-src 'self' https://api.web3forms.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://api.web3forms.com;
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  images: {
    // Skip Next's optimization pipeline in dev for faster local iteration;
    // production always optimizes (see CLAUDE.md for the image workflow).
    unoptimized: isDev,
    // AVIF first (~20% smaller than WebP) for browsers that accept it, WebP
    // as fallback. AVIF encodes slower on the first request, then it's cached.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader.replace(/\s{2,}/g, " ").trim() },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
