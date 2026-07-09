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

export interface SearchEntry {
  cmd: string;
  desc: string;
  tool: string;
  toolSlug: string;
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
    for (const card of data.cards) {
      for (const block of card.blocks) {
        if (block.type === "row" && block.desc) {
          entries.push({
            cmd: block.cmd,
            desc: block.desc,
            tool: tool.name,
            toolSlug: tool.slug,
          });
        }
      }
    }
  }

  return entries;
}

export const searchIndex: SearchEntry[] = buildIndex();
