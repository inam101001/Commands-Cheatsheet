export interface FlagEntry {
  /** Canonical long form, e.g. "--detach". Short-only flags just use the short form here. */
  flag: string;
  /** Other forms that mean the same thing, e.g. ["-d"] for "--detach". */
  aliases?: string[];
  description: string;
  /** Whether this flag consumes the following token as its value (e.g. `-p 8080:80`). */
  takesValue?: boolean;
}

export interface SubcommandEntry {
  /** May be multiple words, e.g. "rollout undo" or "workspace list". Matched longest-first. */
  name: string;
  description: string;
  flags: FlagEntry[];
}

export interface ToolDictionary {
  tool: string;
  binary: string;
  description: string;
  globalFlags: FlagEntry[];
  subcommands: SubcommandEntry[];
}
