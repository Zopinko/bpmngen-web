import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { homeContentSk } from "@/content/home/sk";

export const metadata: Metadata = {
  title: homeContentSk.metadata.title,
  description: homeContentSk.metadata.description,
};

export default function SlovakHome() {
  return <HomePage content={homeContentSk} />;
}
