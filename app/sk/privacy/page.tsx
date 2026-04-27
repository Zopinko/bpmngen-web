import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "Súkromie | BPMN.GEN",
  description: "Ako BPMN.GEN používa analytiku a pracuje so súkromím na bpmngen.com.",
};

export default function SlovakPrivacy() {
  return <PrivacyPage locale="sk" />;
}
