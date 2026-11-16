import { HomePage } from "@/components/home/HomePage";
import { homeContentSk } from "@/content/home/sk";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  locale: "sk",
  enPath: "/",
  title: homeContentSk.metadata.title,
  description: homeContentSk.metadata.description,
});

export default function SlovakHome() {
  return <HomePage content={homeContentSk} />;
}
