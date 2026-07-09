export interface ResourceInput {
  cpuRequest: string;
  cpuLimit: string;
  memRequest: string;
  memLimit: string;
}

export interface SanityFinding {
  level: "error" | "warning" | "info";
  message: string;
}

const MEMORY_UNITS: Record<string, number> = {
  Ki: 1024,
  Mi: 1024 ** 2,
  Gi: 1024 ** 3,
  Ti: 1024 ** 4,
  K: 1e3,
  M: 1e6,
  G: 1e9,
  T: 1e12,
};

export function parseCpuToMillicores(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.endsWith("m")) {
    const n = parseFloat(trimmed.slice(0, -1));
    return Number.isNaN(n) ? null : n;
  }
  const n = parseFloat(trimmed);
  return Number.isNaN(n) ? null : n * 1000;
}

export function parseMemoryToBytes(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^([\d.]+)\s*([A-Za-z]*)$/);
  if (!match) return null;
  const [, numStr, unit] = match;
  const n = parseFloat(numStr);
  if (Number.isNaN(n)) return null;
  if (!unit) return n;

  const multiplier = MEMORY_UNITS[unit];
  return multiplier ? n * multiplier : null;
}

export function analyzeResources(input: ResourceInput): SanityFinding[] {
  const findings: SanityFinding[] = [];

  const cpuReq = parseCpuToMillicores(input.cpuRequest);
  const cpuLim = parseCpuToMillicores(input.cpuLimit);
  const memReq = parseMemoryToBytes(input.memRequest);
  const memLim = parseMemoryToBytes(input.memLimit);

  if (!input.cpuRequest && !input.cpuLimit && !input.memRequest && !input.memLimit) {
    findings.push({
      level: "error",
      message: "No requests or limits set at all — this pod runs as BestEffort QoS and is first in line to be evicted under node pressure.",
    });
    return findings;
  }

  if (cpuLim !== null && cpuReq !== null && cpuLim < cpuReq) {
    findings.push({
      level: "error",
      message: "CPU limit is lower than the CPU request — the API server will reject this, or the pod will never actually get the CPU it requested.",
    });
  }

  if (memLim !== null && memReq !== null && memLim < memReq) {
    findings.push({
      level: "error",
      message: "Memory limit is lower than the memory request — the API server will reject this manifest.",
    });
  }

  if (input.cpuRequest && cpuReq === null) {
    findings.push({ level: "error", message: "Couldn't parse the CPU request — use a plain number (cores) or millicores like \"500m\"." });
  }
  if (input.cpuLimit && cpuLim === null) {
    findings.push({ level: "error", message: "Couldn't parse the CPU limit — use a plain number (cores) or millicores like \"500m\"." });
  }
  if (input.memRequest && memReq === null) {
    findings.push({ level: "error", message: "Couldn't parse the memory request — use a unit like Mi, Gi, M, or G." });
  }
  if (input.memLimit && memLim === null) {
    findings.push({ level: "error", message: "Couldn't parse the memory limit — use a unit like Mi, Gi, M, or G." });
  }

  if (!input.cpuRequest) {
    findings.push({
      level: "warning",
      message: "No CPU request set — the scheduler can't reason about how much CPU this pod needs, risking node oversubscription.",
    });
  }
  if (!input.memRequest) {
    findings.push({
      level: "warning",
      message: "No memory request set — same scheduling risk, and it makes eviction behavior unpredictable.",
    });
  }
  if (!input.cpuLimit) {
    findings.push({
      level: "info",
      message: "No CPU limit set — this avoids CPU throttling, but the container can use all available CPU on the node if nothing else constrains it.",
    });
  }
  if (!input.memLimit) {
    findings.push({
      level: "warning",
      message: "No memory limit set — a leak in this container could exhaust node memory and trigger the OOM killer against other pods too.",
    });
  }

  if (cpuReq !== null && cpuLim !== null && cpuReq > 0 && cpuLim / cpuReq > 10) {
    findings.push({
      level: "warning",
      message: "CPU limit is more than 10x the request — the pod is scheduled based on a low request but can burst enough to starve its neighbors under load.",
    });
  }

  if (memReq !== null && memLim !== null && memReq > 0 && memLim / memReq > 4) {
    findings.push({
      level: "warning",
      message: "Memory limit is much higher than the request — under memory pressure this pod may be OOMKilled unpredictably since the scheduler expected far less usage.",
    });
  }

  if (
    cpuReq !== null &&
    cpuLim !== null &&
    memReq !== null &&
    memLim !== null &&
    cpuReq === cpuLim &&
    memReq === memLim
  ) {
    findings.push({
      level: "info",
      message: "Requests equal limits on both CPU and memory — this gives the pod Guaranteed QoS, the highest priority against eviction.",
    });
  }

  if (findings.length === 0) {
    findings.push({ level: "info", message: "No issues found with the values provided." });
  }

  return findings;
}
