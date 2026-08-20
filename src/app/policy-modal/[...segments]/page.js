import { notFound } from "next/navigation";
import CookiePolicyPage from "@/app/cookie-policy/page";
import PrivacyPolicyPage from "@/app/privacy-policy/page";
import TermsOfUsePage from "@/app/terms-of-use/page";
import LegalPage from "@/components/LegalPage";
import { policyDocuments, publicAccessiblePolicySlugs } from "@/data/policyCatalog";

export default async function ModalPolicyPage({ params }) {
  const { segments } = await params;
  const path = segments.join("/");

  if (path === "terms-of-use") return <TermsOfUsePage />;
  if (path === "privacy-policy") return <PrivacyPolicyPage />;
  if (path === "cookie-policy") return <CookiePolicyPage />;

  if (segments.length === 2 && segments[0] === "policies") {
    const slug = segments[1];
    const policy = publicAccessiblePolicySlugs.includes(slug)
      ? policyDocuments[slug]
      : null;

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

  notFound();
}
