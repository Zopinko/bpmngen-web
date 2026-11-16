import { PrivacyPage } from "@/components/PrivacyPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  locale: "sk",
  enPath: "/privacy",
  title: "Ochrana osobných údajov | BPMN.GEN",
  description: "Aké osobné údaje BPMN.GEN spracúva na bpmngen.com a v aplikácii, prečo a ako dlho.",
});

export default function SlovakPrivacy() {
  return <PrivacyPage locale="sk" />;
}
