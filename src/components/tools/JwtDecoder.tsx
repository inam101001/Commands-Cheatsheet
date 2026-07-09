"use client";

import { useMemo, useState } from "react";
import { decodeJwt } from "@/lib/jwt";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzE2MjM5MDIyLCJleHAiOjE3MTYyNDI2MjJ9.dQw4w9WgXcQ-fake-signature";

export function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const result = useMemo(() => decodeJwt(token), [token]);

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="glass-panel rounded-xl p-6">
        <label htmlFor="jwt-input" className="mb-2 block text-sm font-medium text-text-muted">
          JWT
        </label>
        <textarea
          id="jwt-input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          spellCheck={false}
          rows={4}
          className="w-full resize-y rounded-md border border-border bg-bg px-4 py-3 font-mono text-[12px] text-text outline-none focus:border-accent-blue"
        />

        <p className="mt-3 rounded-md border border-accent-blue/30 bg-accent-blue/5 px-3 py-2 text-[12px] text-accent-blue">
          Decoded entirely in your browser — nothing is sent anywhere. The signature is shown but
          not cryptographically verified (that requires the signing secret/key, which never
          leaves your server).
        </p>

        {"error" in result ? (
          <p className="mt-4 text-[13px] text-accent-error">{result.error}</p>
        ) : (
          <div className="mt-4 space-y-4">
            {result.expiresAt && (
              <p className="text-[13px]">
                <span className="text-text-muted">Expires: </span>
                <span className={result.isExpired ? "text-accent-error" : "text-accent-green"}>
                  {result.expiresAt} ({result.isExpired ? "expired" : "valid"})
                </span>
              </p>
            )}

            <div>
              <p className="mb-1 text-[11px] tracking-wide text-text-dim uppercase">Header</p>
              <pre className="overflow-auto rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-[12px] text-text-body">
                {JSON.stringify(result.header, null, 2)}
              </pre>
            </div>

            <div>
              <p className="mb-1 text-[11px] tracking-wide text-text-dim uppercase">Payload</p>
              <pre className="overflow-auto rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-[12px] text-text-body">
                {JSON.stringify(result.payload, null, 2)}
              </pre>
            </div>

            <div>
              <p className="mb-1 text-[11px] tracking-wide text-text-dim uppercase">
                Signature (not verified)
              </p>
              <code className="block overflow-auto rounded-md border border-border-3 bg-bg px-3 py-2 font-mono text-[12px] break-all text-text-muted">
                {result.signature}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
