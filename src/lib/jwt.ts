export interface DecodedJwt {
  header: unknown;
  payload: unknown;
  signature: string;
  isExpired: boolean | null;
  expiresAt: string | null;
  issuedAt: string | null;
}

export interface JwtError {
  error: string;
}

function base64UrlDecode(segment: string): string {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export function decodeJwt(token: string): DecodedJwt | JwtError {
  const trimmed = token.trim();
  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return { error: "A JWT has three dot-separated parts: header.payload.signature" };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  let header: unknown;
  let payload: unknown;
  try {
    header = JSON.parse(base64UrlDecode(headerPart));
  } catch {
    return { error: "Could not decode the header segment — not valid base64url JSON." };
  }
  try {
    payload = JSON.parse(base64UrlDecode(payloadPart));
  } catch {
    return { error: "Could not decode the payload segment — not valid base64url JSON." };
  }

  const claims = payload as Record<string, unknown>;
  const exp = typeof claims?.exp === "number" ? claims.exp : null;
  const iat = typeof claims?.iat === "number" ? claims.iat : null;

  return {
    header,
    payload,
    signature: signaturePart,
    isExpired: exp !== null ? Date.now() >= exp * 1000 : null,
    expiresAt: exp !== null ? new Date(exp * 1000).toISOString() : null,
    issuedAt: iat !== null ? new Date(iat * 1000).toISOString() : null,
  };
}
