import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Private demo: no indexing, on every response (DESIGN.md 1.3).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  // Old site addresses → new pages (DESIGN.md 3.2). Temporary (307) while
  // this is a private demo, so browsers don't cache them permanently.
  async redirects() {
    const map: [string, string][] = [
      ["/index.html", "/"],
      ["/index-1.html", "/"],
      ["/team.html", "/team"],
      ["/theoretischer-unterricht.html", "/unterricht#theorie"],
      ["/praktischer-unterricht.html", "/unterricht#praxis"],
      ["/fahrzeuge.html", "/fahrzeuge"],
      ["/ausbildungsfahrschule.html", "/ausbildungsfahrschule"],
      ["/preise.html", "/preise"],
      ["/kontakt.html", "/kontakt"],
      ["/impressum.html", "/impressum"],
      ["/datenschutz.html", "/datenschutz"],
    ];
    return map.map(([source, destination]) => ({ source, destination, permanent: false }));
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // Only global CSS: re-typing `*.module.css` as "*.css" turns CSS
        // Modules into plain global CSS and empties their class maps.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
