import type { ToolDictionary } from "./types";
import docker from "./docker";
import kubectl from "./kubectl";
import terraform from "./terraform";
import git from "./git";

export const commandDictionaries: Record<string, ToolDictionary> = {
  docker,
  kubectl,
  terraform,
  git,
};

export type { ToolDictionary, SubcommandEntry, FlagEntry } from "./types";
