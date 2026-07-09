import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevOps Commands Hub",
    short_name: "DevOps Hub",
    description:
      "An ultimate interactive command center for fast search, reference, and copy-paste dev cheatsheets.",
    start_url: "/",
    display: "standalone",
    background_color: "#080b10",
    theme_color: "#0d1117",
    icons: [
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
