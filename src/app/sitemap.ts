import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://joyful-torrone-50355b.netlify.app",
      lastModified: new Date(),
    },
    {
      url: "https://joyful-torrone-50355b.netlify.app/myrewards",
      lastModified: new Date(),
    },
    {
      url: "https://joyful-torrone-50355b.netlify.app/login",
      lastModified: new Date(),
    },
    {
      url: "https://joyful-torrone-50355b.netlify.app/register",
      lastModified: new Date(),
    },
  ];
}
