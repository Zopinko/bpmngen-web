import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { homeContentEn } from "@/content/home/en";

export const metadata: Metadata = {
  title: homeContentEn.metadata.title,
  description: homeContentEn.metadata.description,
};

export default function Home() {
  return <HomePage content={homeContentEn} />;
}
