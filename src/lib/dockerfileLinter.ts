export interface LintFinding {
  line: number;
  severity: "error" | "warning" | "info";
  rule: string;
  message: string;
}

interface Instruction {
  line: number;
  keyword: string;
  args: string;
  raw: string;
}

function parseInstructions(content: string): Instruction[] {
  const lines = content.split("\n");
  const instructions: Instruction[] = [];

  let buffer = "";
  let bufferStartLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (bufferStartLine === -1) bufferStartLine = i + 1;
    buffer += (buffer ? " " : "") + trimmed.replace(/\\$/, "");

    if (trimmed.endsWith("\\")) continue;

    const match = buffer.match(/^([A-Za-z]+)\s*(.*)$/);
    if (match) {
      instructions.push({
        line: bufferStartLine,
        keyword: match[1].toUpperCase(),
        args: match[2],
        raw: buffer,
      });
    }
    buffer = "";
    bufferStartLine = -1;
  }

  return instructions;
}

function checkFromTag(instructions: Instruction[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const inst of instructions) {
    if (inst.keyword !== "FROM") continue;
    const image = inst.args.split(/\s+as\s+/i)[0].trim();
    if (image.includes("@sha256:")) continue;
    if (!image.includes(":")) {
      findings.push({
        line: inst.line,
        severity: "warning",
        rule: "no-tag",
        message: `"${image}" has no tag — it implicitly resolves to :latest. Pin an explicit version for reproducible builds.`,
      });
    } else if (/:latest$/.test(image)) {
      findings.push({
        line: inst.line,
        severity: "warning",
        rule: "latest-tag",
        message: `"${image}" explicitly uses the :latest tag — pin a specific version instead.`,
      });
    }
  }
  return findings;
}

function checkUser(instructions: Instruction[]): LintFinding[] {
  const hasUser = instructions.some((i) => i.keyword === "USER");
  if (hasUser) return [];
  const lastFrom = [...instructions].reverse().find((i) => i.keyword === "FROM");
  return [
    {
      line: lastFrom?.line ?? 1,
      severity: "warning",
      rule: "missing-user",
      message: "No USER instruction found — the container will run as root by default.",
    },
  ];
}

function checkHealthcheck(instructions: Instruction[]): LintFinding[] {
  const hasHealthcheck = instructions.some((i) => i.keyword === "HEALTHCHECK");
  if (hasHealthcheck) return [];
  const lastFrom = [...instructions].reverse().find((i) => i.keyword === "FROM");
  return [
    {
      line: lastFrom?.line ?? 1,
      severity: "info",
      rule: "missing-healthcheck",
      message: "No HEALTHCHECK instruction — the orchestrator can't detect a hung/unhealthy container on its own.",
    },
  ];
}

function checkAptGetInstall(instructions: Instruction[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const inst of instructions) {
    if (inst.keyword !== "RUN" || !/apt-get\s+install/.test(inst.args)) continue;

    if (!/--no-install-recommends/.test(inst.args)) {
      findings.push({
        line: inst.line,
        severity: "info",
        rule: "apt-no-recommends",
        message: "apt-get install without --no-install-recommends pulls in extra packages, growing the image unnecessarily.",
      });
    }
    if (!/\s-y\b|--yes\b/.test(inst.args)) {
      findings.push({
        line: inst.line,
        severity: "warning",
        rule: "apt-no-yes-flag",
        message: "apt-get install without -y can hang waiting for interactive confirmation in a non-interactive build.",
      });
    }
  }
  return findings;
}

function checkAptGetUpdateAlone(instructions: Instruction[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const inst of instructions) {
    if (inst.keyword !== "RUN" || !/apt-get\s+update/.test(inst.args)) continue;
    if (!/apt-get\s+install/.test(inst.args)) {
      findings.push({
        line: inst.line,
        severity: "warning",
        rule: "apt-update-alone",
        message: "apt-get update in its own RUN layer can cache a stale package index — combine it with apt-get install in the same RUN.",
      });
    }
  }
  return findings;
}

function checkAptCacheCleanup(instructions: Instruction[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const inst of instructions) {
    if (inst.keyword !== "RUN" || !/apt-get\s+install/.test(inst.args)) continue;
    if (!/rm\s+-rf\s+\/var\/lib\/apt\/lists/.test(inst.args)) {
      findings.push({
        line: inst.line,
        severity: "info",
        rule: "apt-cache-not-cleaned",
        message: "Package index cache isn't cleaned up (rm -rf /var/lib/apt/lists/*) — bloats the image layer.",
      });
    }
  }
  return findings;
}

function checkAddVsCopy(instructions: Instruction[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const inst of instructions) {
    if (inst.keyword !== "ADD") continue;
    const firstArg = inst.args.trim().split(/\s+/)[0] ?? "";
    const isUrl = /^https?:\/\//.test(firstArg);
    const isArchive = /\.(tar|tar\.gz|tgz|tar\.bz2|tar\.xz|zip)$/i.test(firstArg);
    if (!isUrl && !isArchive) {
      findings.push({
        line: inst.line,
        severity: "info",
        rule: "add-vs-copy",
        message: "ADD is used for a plain local file/directory — COPY is more explicit and predictable when you don't need URL fetching or archive auto-extraction.",
      });
    }
  }
  return findings;
}

function checkAptUpgrade(instructions: Instruction[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const inst of instructions) {
    if (inst.keyword !== "RUN") continue;
    if (/apt-get\s+(dist-)?upgrade/.test(inst.args)) {
      findings.push({
        line: inst.line,
        severity: "warning",
        rule: "apt-upgrade",
        message: "apt-get upgrade in a Dockerfile makes builds non-reproducible — pin the base image version instead.",
      });
    }
  }
  return findings;
}

function checkWorkdirVsCd(instructions: Instruction[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const inst of instructions) {
    if (inst.keyword !== "RUN") continue;
    if (/^cd\s+/.test(inst.args.trim())) {
      findings.push({
        line: inst.line,
        severity: "info",
        rule: "cd-vs-workdir",
        message: "RUN cd only affects that layer's shell — use WORKDIR to persistently change directory across instructions.",
      });
    }
  }
  return findings;
}

const RULES = [
  checkFromTag,
  checkUser,
  checkHealthcheck,
  checkAptGetInstall,
  checkAptGetUpdateAlone,
  checkAptCacheCleanup,
  checkAddVsCopy,
  checkAptUpgrade,
  checkWorkdirVsCd,
];

export function lintDockerfile(content: string): LintFinding[] {
  const instructions = parseInstructions(content);
  return RULES.flatMap((rule) => rule(instructions)).sort((a, b) => a.line - b.line);
}
