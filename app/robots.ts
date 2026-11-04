import type { MetadataRoute } from "next";

// Private demo: keep every crawler out (DESIGN.md 1.3).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
