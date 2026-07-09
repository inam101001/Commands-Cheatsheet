import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { JwtDecoder } from "@/components/tools/JwtDecoder";

export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode a JWT's header and payload entirely in your browser — nothing is sent anywhere.",
};

export default function JwtPage() {
  return (
    <ToolPageShell title="🔑 JWT Decoder" subtitle="Decoded entirely in your browser">
      <JwtDecoder />
    </ToolPageShell>
  );
}
