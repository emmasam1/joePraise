import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import { policyDocuments } from "@/data/policyCatalog";

const allowed = ["payments-and-commission", "reviews", "business-verification", "trust-score", "business-analyst-programme"];

export default async function BusinessPolicyPage({ params }) {
  const { slug } = await params;
  if (!allowed.includes(slug)) notFound();
  const policy = policyDocuments[slug];
  if (!policy) notFound();

  return <LegalPage title={policy.title} eyebrow={`Effective ${policy.effectiveDate}`} introduction={policy.introduction} sections={policy.sections.map((section, index) => ({ id: `section-${index + 1}`, title: section.title, paragraphs: [section.text] }))} />;
}
