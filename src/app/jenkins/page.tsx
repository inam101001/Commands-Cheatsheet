import type { Metadata } from "next";
import { CheatsheetPage } from "@/components/cheatsheet/CheatsheetPage";
import data from "@/data/cheatsheets/jenkins";

export const metadata: Metadata = {
  title: data.title,
  description: data.subtitle,
};

export default function Page() {
  return <CheatsheetPage data={data} toolSlug="jenkins" />;
}
