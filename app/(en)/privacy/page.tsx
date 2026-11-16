import { PrivacyPage } from "@/components/PrivacyPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  locale: "en",
  enPath: "/privacy",
  title: "Privacy policy | BPMN.GEN",
  description: "What personal data BPMN.GEN processes on bpmngen.com and in the app, why, and for how long.",
});

export default function Privacy() {
  return <PrivacyPage locale="en" />;
}
