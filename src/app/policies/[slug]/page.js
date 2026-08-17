import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import { policyDocuments, publicAccessiblePolicySlugs } from "@/data/policyCatalog";

export function generateStaticParams() {
  return publicAccessiblePolicySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const policy = publicAccessiblePolicySlugs.includes(slug) ? policyDocuments[slug] : null;
  return { title: policy ? `${policy.title} | Joe Praise` : "Policy | Joe Praise" };
}

export default async function PolicyPage({ params }) {
  const { slug } = await params;
  const policy = publicAccessiblePolicySlugs.includes(slug) ? policyDocuments[slug] : null;
  if (!policy) notFound();

  return (
    <LegalPage
      title={policy.title}
      eyebrow={`Effective ${policy.effectiveDate}`}
      introduction={policy.introduction}
      sections={policy.sections.map((section, index) => ({
        id: `section-${index + 1}`,
        title: section.title,
        paragraphs: [section.text],
      }))}
    />
  );
}
