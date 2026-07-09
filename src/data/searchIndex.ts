import { tools } from "@/data/tools";
import docker from "@/data/cheatsheets/docker";
import kubernetes from "@/data/cheatsheets/kubernetes";
import terraform from "@/data/cheatsheets/terraform";
import git from "@/data/cheatsheets/git";
import githubActions from "@/data/cheatsheets/github-actions";
import jenkins from "@/data/cheatsheets/jenkins";
import linux from "@/data/cheatsheets/linux";
import prometheusGrafana from "@/data/cheatsheets/prometheus-grafana";
import type { CheatsheetData } from "@/data/types";
import { buildRowAnchorMap } from "@/lib/anchors";

export interface SearchEntry {
  id: string;
  cmd: string;
  desc: string;
  tool: string;
  toolSlug: string;
  href: string;
}

const DATASETS: Record<string, CheatsheetData> = {
  docker,
  kubernetes,
  terraform,
  git,
  "github-actions": githubActions,
  jenkins,
  linux,
  "prometheus-grafana": prometheusGrafana,
};

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const tool of tools) {
    const data = DATASETS[tool.slug];
    const rowAnchors = buildRowAnchorMap(data);
    data.cards.forEach((card, cardIndex) => {
      card.blocks.forEach((block, blockIndex) => {
        if (block.type === "row" && block.desc) {
          const anchorId = rowAnchors.get(`${cardIndex}-${blockIndex}`) ?? "";
          entries.push({
            id: `${tool.slug}#${anchorId}`,
            cmd: block.cmd,
            desc: block.desc,
            tool: tool.name,
            toolSlug: tool.slug,
            href: `/${tool.slug}#${anchorId}`,
          });
        }
      });
    });
  }

  return entries;
}

export const searchIndex: SearchEntry[] = buildIndex();
