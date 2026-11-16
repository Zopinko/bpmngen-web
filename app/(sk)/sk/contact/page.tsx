import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  locale: "sk",
  enPath: "/contact",
  title: "Kontakt | BPMN.GEN",
  description: "Otázky, spätná väzba alebo proces, ktorý chcete vyskúšať? Napíšte tímu BPMN.GEN.",
});

export default function SlovakContact() {
  return <ContactPage locale="sk" />;
}
