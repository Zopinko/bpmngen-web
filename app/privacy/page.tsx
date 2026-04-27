import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy | BPMN.GEN",
  description: "How BPMN.GEN handles analytics and privacy on bpmngen.com.",
};

export default function Privacy() {
  return <PrivacyPage locale="en" />;
}
