import type { Metadata } from "next";
import { ToolPageShell } from "@/components/ToolPageShell";
import { SnippetsView } from "@/components/snippets/SnippetsView";

export const metadata: Metadata = {
  title: "My Snippets",
  description: "Bookmarked commands saved from any cheatsheet page, stored locally in your browser.",
};

export default function SnippetsPage() {
  return (
    <ToolPageShell title="📌 My Snippets" subtitle="Bookmarked commands, saved locally in your browser">
      <SnippetsView />
    </ToolPageShell>
  );
}
