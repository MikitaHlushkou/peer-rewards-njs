import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login/", "/register/"],
    },
    host: "https://joyful-torrone-50355b.netlify.app",
    sitemap: "https://joyful-torrone-50355b.netlify.app/sitemap.xml",
  };
}
