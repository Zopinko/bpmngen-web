import { HomePage } from "@/components/home/HomePage";
import { homeContentEn } from "@/content/home/en";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  locale: "en",
  enPath: "/",
  title: homeContentEn.metadata.title,
  description: homeContentEn.metadata.description,
});

export default function Home() {
  return <HomePage content={homeContentEn} />;
}
