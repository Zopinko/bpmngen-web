import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  locale: "en",
  enPath: "/contact",
  title: "Contact | BPMN.GEN",
  description: "Questions, feedback or a process you want to try? Write to the BPMN.GEN team.",
});

export default function Contact() {
  return <ContactPage locale="en" />;
}
