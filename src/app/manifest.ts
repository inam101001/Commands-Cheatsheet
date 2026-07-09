import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OpsDeck",
    short_name: "OpsDeck",
    description:
      "The cloud-native command center for DevOps engineers — searchable cheatsheets, interactive command explainers, and validators, all running in your browser.",
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
