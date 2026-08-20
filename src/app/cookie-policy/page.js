import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Cookie Policy | Joe Praise" };

const sections = [
  {
    id: "general-information",
    title: "General Information",
    paragraphs: [
      "Effective Date: 4th August 2026",
      "This Cookie Policy (\"Policy\") explains how Joe Praise Smart Hub (\"Platform\"), operated by Joe Praise Technologies Limited, uses cookies, tracking technologies, analytics tools, and related technologies when Users access or use the Platform.",
      "This Policy should be read alongside the Privacy Policy, Terms & Conditions, and related Platform operational policies.",
    ],
    subsections: [
      { title: "1. Introduction", paragraphs: ["The Platform may use cookies, pixels, session technologies, analytics tools, tracking technologies, and related operational technologies to support Platform functionality, improve user experience, maintain security, analyse usage, support authentication, monitor performance, maintain operational integrity, and improve marketplace services.", "By continuing to use the Platform, Users acknowledge that cookies and related technologies may be used in accordance with this Policy and applicable consent preferences."] },
      { title: "2. What Are Cookies?", paragraphs: ["Cookies are small text files or similar technologies stored on a User’s device when visiting websites or using online services. They may be temporary session cookies, persistent cookies, first-party cookies, or third-party cookies."], bullets: ["recognise devices and maintain sessions", "remember preferences and improve functionality", "analyse usage patterns", "support security and operational performance"] },
      { title: "5. How Cookies Are Used", bullets: ["authentication and account management", "transaction processing and onboarding", "analytics and operational reporting", "fraud prevention and security management", "performance monitoring and communications support", "marketplace analytics, visibility optimisation, and Platform improvement"] },
    ],
  },
  {
    id: "required-cookies",
    title: "Required Cookies",
    paragraphs: ["Essential cookies may be required for the Platform to function properly. Disabling essential cookies may affect login access, transactions, account functionality, or operational performance."],
    subsections: [
      { title: "3.1 Essential & Operational Cookies", bullets: ["support login functionality", "maintain account sessions", "enable authentication", "maintain security", "process transactions", "support navigation", "ensure core Platform functionality"] },
      { title: "3.5 Security & Fraud Prevention Technologies", bullets: ["detect suspicious activity", "prevent fraud", "monitor account security", "identify abuse", "support operational investigations", "maintain marketplace integrity"] },
      { title: "Essential Technologies", paragraphs: ["Cookies necessary for security, authentication, fraud prevention, transactions, or core Platform functionality may continue to operate as essential operational technologies."] },
    ],
  },
  {
    id: "functional-cookies",
    title: "Functional Cookies",
    paragraphs: ["Functional cookies support Platform settings and help provide a consistent user experience."],
    subsections: [
      { title: "3.4 Functional & Preference Cookies", bullets: ["remember user preferences", "support operational settings", "improve user experience", "maintain language or interface preferences", "support Platform functionality"] },
      { title: "6. Cookie Management & User Controls", paragraphs: ["Users may manage, restrict, disable, or delete cookies through browser settings, device settings, available cookie consent tools, or Platform preference controls where available. Most browsers allow Users to view, block, or remove cookies, restrict third-party cookies, or receive notifications when cookies are used.", "Disabling or restricting cookies may affect account access, login functionality, transaction processing, analytics functionality, operational performance, saved preferences, or certain Platform features. The Platform does not guarantee full functionality where essential cookies or operational technologies are disabled."] },
      { title: "7. Consent & Cookie Preferences", paragraphs: ["Where required by applicable law, the Platform may request consent before using certain non-essential cookies or analytics technologies. Users may be offered options to accept cookies, reject certain cookies, manage preferences, or modify consent settings.", "Where required, a Cookie Consent Banner may allow Users to accept, reject, or customise non-essential cookies before they are activated. Continued use following applicable consent notices may constitute acknowledgement of cookie usage under this Policy and available preferences."] },
      { title: "9. Policy Updates", paragraphs: ["The Platform may update, modify, or revise this Cookie Policy periodically. Updated versions may be published with revised effective dates. Continued use following publication constitutes acknowledgement and acceptance of the revised Policy."] },
    ],
  },
  {
    id: "advertising-cookies",
    title: "Advertising Cookies",
    paragraphs: ["The Platform may use analytics, advertising, and third-party technologies to understand behaviour, monitor performance, measure conversions, and improve marketing communications."],
    subsections: [
      { title: "3.2 Analytics & Performance Cookies", paragraphs: ["Analytics technologies may include Google Analytics 4 (GA4), Microsoft Clarity, Meta Pixel, and similar measurement technologies. Certain analytics information may be aggregated or processed to reduce direct identification where reasonably possible."], bullets: ["browser, session, and device information", "pages visited and referral sources", "feature interactions and traffic patterns", "conversion events and advertising metrics", "heatmaps and session recordings, where applicable"] },
      { title: "3.3 Marketing & Advertising Cookies", paragraphs: ["Marketing, advertising, and conversion tracking technologies may be used to measure campaign performance, support remarketing, and improve marketing communications. Contact information may be processed through authorised providers, including Brevo, for transactional emails, onboarding updates, account notifications, newsletters, and lawful marketing communications."] },
      { title: "4 & 8. Third-Party Technologies", paragraphs: ["Providers may independently use cookies or related technologies under their own policies. The Platform does not control all external technologies and is not responsible for third-party operational practices, tracking systems, or independent privacy policies."], bullets: ["Firebase Authentication", "Stripe and PayPal", "Google Analytics 4 (GA4)", "Microsoft Clarity and Meta Pixel", "Brevo and Cloudinary", "DigitalOcean and MongoDB Atlas", "related operational infrastructure providers"] },
      { title: "10. Contact Information", paragraphs: ["Joe Praise Smart Hub is operated by Joe Praise Technologies Limited.", "Registered Office: 3rd Floor, 86-90 Paul Street, London, England, EC2A 4NE"], contacts: [{ label: "Support", email: "support@joepraisesmarthub.co.uk" }, { label: "Onboarding", email: "onboarding@joepraisesmarthub.co.uk" }, { label: "Legal & Compliance", email: "legal@joepraisesmarthub.co.uk" }] },
    ],
  },
];

export default function CookiePolicyPage() {
  return <LegalPage title="Cookie Policy" eyebrow="Joe Praise Smart Hub" introduction="This Cookie Policy explains how Joe Praise Smart Hub, operated by Joe Praise Technologies Limited, uses cookies and related technologies. Select a tab to read each part of the policy." sections={sections} tabs />;
}
