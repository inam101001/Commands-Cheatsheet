import { commandDictionaries } from "@/data/commandDictionary";
import type { FlagEntry, SubcommandEntry } from "@/data/commandDictionary/types";

export type TokenKind = "binary" | "subcommand" | "flag" | "value" | "argument" | "unknown";

export interface ExplainedToken {
  text: string;
  kind: TokenKind;
  description?: string;
}

/** Simple shell-like tokenizer: splits on whitespace, respects single/double quotes. */
export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  const regex = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[3]);
  }
  return tokens;
}

function findFlag(
  token: string,
  flagLists: FlagEntry[][],
): { flag: FlagEntry; value?: string } | null {
  const eqIndex = token.indexOf("=");
  const name = eqIndex >= 0 ? token.slice(0, eqIndex) : token;
  const inlineValue = eqIndex >= 0 ? token.slice(eqIndex + 1) : undefined;

  for (const flags of flagLists) {
    for (const flag of flags) {
      if (flag.flag === name || flag.aliases?.includes(name)) {
        return { flag, value: inlineValue };
      }
    }
  }
  return null;
}

function matchSubcommand(
  tokens: string[],
  startIndex: number,
  subcommands: SubcommandEntry[],
): { entry: SubcommandEntry; wordCount: number } | null {
  const maxWords = Math.min(3, tokens.length - startIndex);
  for (let wordCount = maxWords; wordCount >= 1; wordCount--) {
    const candidate = tokens.slice(startIndex, startIndex + wordCount).join(" ");
    const entry = subcommands.find((s) => s.name === candidate);
    if (entry) return { entry, wordCount };
  }
  return null;
}

export function explainCommand(input: string): ExplainedToken[] {
  const rawTokens = tokenize(input.trim());
  if (rawTokens.length === 0) return [];

  const tokens = [...rawTokens];
  const result: ExplainedToken[] = [];
  let i = 0;

  // Skip a leading `sudo`.
  if (tokens[i] === "sudo") {
    result.push({ text: tokens[i], kind: "argument", description: "Run the following command with elevated privileges." });
    i++;
  }

  const binaryName = tokens[i]?.split(/[\\/]/).pop() ?? "";
  const dictionary = commandDictionaries[binaryName];

  if (!dictionary) {
    result.push({ text: tokens[i], kind: "unknown", description: "Unrecognized tool — not in the explainer's dictionary yet." });
    i++;
    for (; i < tokens.length; i++) {
      result.push({ text: tokens[i], kind: "argument" });
    }
    return result;
  }

  result.push({ text: tokens[i], kind: "binary", description: dictionary.description });
  i++;

  const subMatch = matchSubcommand(tokens, i, dictionary.subcommands);
  let activeSubcommand: SubcommandEntry | undefined;

  if (subMatch) {
    const words = tokens.slice(i, i + subMatch.wordCount);
    words.forEach((word, idx) => {
      result.push({
        text: word,
        kind: "subcommand",
        description: idx === 0 ? subMatch.entry.description : undefined,
      });
    });
    i += subMatch.wordCount;
    activeSubcommand = subMatch.entry;
  }

  const flagLists = [activeSubcommand?.flags ?? [], dictionary.globalFlags];

  for (; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.startsWith("-") && token !== "-") {
      const found = findFlag(token, flagLists);
      if (found) {
        result.push({ text: token, kind: "flag", description: found.flag.description });
        if (found.flag.takesValue && found.value === undefined) {
          const next = tokens[i + 1];
          if (next !== undefined && !next.startsWith("-")) {
            result.push({ text: next, kind: "value", description: `Value for ${found.flag.flag}` });
            i++;
          }
        }
        continue;
      }
      result.push({ text: token, kind: "unknown", description: "Unrecognized flag for this subcommand." });
      continue;
    }

    result.push({ text: token, kind: "argument" });
  }

  return result;
}
