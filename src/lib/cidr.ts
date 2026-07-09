export interface CidrResult {
  network: string;
  broadcast: string;
  netmask: string;
  wildcard: string;
  firstHost: string;
  lastHost: string;
  totalAddresses: number;
  usableHosts: number;
  prefixLength: number;
}

export interface CidrError {
  error: string;
}

function ipToInt(octets: number[]): number {
  return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

export function calculateCidr(input: string): CidrResult | CidrError {
  const trimmed = input.trim();
  const match = trimmed.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!match) {
    return { error: "Enter a valid CIDR block, e.g. 10.0.0.0/24" };
  }

  const octets = [1, 2, 3, 4].map((i) => parseInt(match[i], 10));
  if (octets.some((o) => o > 255)) {
    return { error: "Each octet must be between 0 and 255" };
  }

  const prefixLength = parseInt(match[5], 10);
  if (prefixLength < 0 || prefixLength > 32) {
    return { error: "Prefix length must be between 0 and 32" };
  }

  const ipInt = ipToInt(octets);
  const netmaskInt = prefixLength === 0 ? 0 : (0xffffffff << (32 - prefixLength)) >>> 0;
  const wildcardInt = (~netmaskInt) >>> 0;
  const networkInt = (ipInt & netmaskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalAddresses = 2 ** (32 - prefixLength);
  const usableHosts = prefixLength >= 31 ? totalAddresses : totalAddresses - 2;
  const firstHostInt = prefixLength >= 31 ? networkInt : networkInt + 1;
  const lastHostInt = prefixLength >= 31 ? broadcastInt : broadcastInt - 1;

  return {
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    netmask: intToIp(netmaskInt),
    wildcard: intToIp(wildcardInt),
    firstHost: intToIp(firstHostInt),
    lastHost: intToIp(lastHostInt),
    totalAddresses,
    usableHosts,
    prefixLength,
  };
}
