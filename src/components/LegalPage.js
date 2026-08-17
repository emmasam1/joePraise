"use client";

import { useEffect, useState } from "react";

export default function LegalPage({ title, eyebrow, introduction, sections, tabs }) {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    if (tabs) return;

    const updateActiveSection = () => {
      const offset = window.scrollY + 180;
      let current = sections[0].id;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= offset) current = section.id;
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [sections, tabs]);

  const renderSection = (section) => (
    <section key={section.id} id={section.id} className="scroll-mt-8 pb-12">
      <h2 className="text-xl font-bold text-[#1D2939] md:text-2xl">{section.title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[#667085]">
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.contacts?.map((contact) => (
          <p key={contact.email}>
            {contact.label}: <strong className="font-bold text-[#1D2939]">{contact.email}</strong>
          </p>
        ))}
        {section.subsections?.map((subsection) => (
          <div key={subsection.title} className="pt-3">
            <h3 className="text-base font-bold text-[#1D2939] md:text-lg">{subsection.title}</h3>
            <div className="mt-3 space-y-3">
              {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {subsection.contacts?.map((contact) => (
                <p key={contact.email}>
                  {contact.label}: <strong className="font-bold text-[#1D2939]">{contact.email}</strong>
                </p>
              ))}
              {subsection.bullets && (
                <ul className="list-disc space-y-2 pl-5 marker:text-[#18A982]">
                  {subsection.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="bg-white text-[#344054]">
      <header className="bg-[#060853] px-6 py-16 text-center text-white md:py-20">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#18C795]">
          {eyebrow}
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <p className="max-w-5xl text-sm leading-7 text-[#667085]">{introduction}</p>

        {tabs && (
          <div className="mt-10 grid overflow-hidden rounded-lg bg-[#EEF4FC] sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label={`${title} sections`}>
            {sections.map((section) => (
              <button
                type="button"
                key={section.id}
                role="tab"
                aria-selected={activeSection === section.id}
                aria-controls={`${section.id}-panel`}
                onClick={() => setActiveSection(section.id)}
                className={`border-b-2 px-4 py-4 text-center text-xs font-semibold transition-colors ${
                  activeSection === section.id
                    ? "border-[#18C795] bg-white text-[#18A982]"
                    : "border-transparent text-[#667085] hover:text-[#060853]"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}

        <div className={`mt-12 ${tabs ? "" : "lg:grid lg:grid-cols-[280px_1fr] lg:gap-14"}`}>
          {!tabs && (
            <aside className="mb-10 h-fit rounded-xl bg-[#E8F1FD] p-7 lg:sticky lg:top-6 lg:mb-0">
              <h2 className="font-bold text-[#1D2939]">Table of Content</h2>
              <ol className="mt-5 space-y-4 text-sm leading-6">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`flex gap-3 transition-colors hover:text-[#18A982] ${activeSection === section.id ? "font-semibold text-[#18A982]" : "text-[#667085]"}`}
                    >
                      {!/^\d+\./.test(section.title) && <span>{index + 1}.</span>}
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <a href="#top" className="mt-7 inline-block text-xs font-bold text-[#18A982]">Back to top ↑</a>
            </aside>
          )}

          <article
            id={tabs ? `${activeSection}-panel` : "top"}
            role={tabs ? "tabpanel" : undefined}
            className={tabs ? "mx-auto min-h-[480px] max-w-5xl" : "min-w-0"}
          >
            {tabs
              ? renderSection(sections.find((section) => section.id === activeSection))
              : sections.map(renderSection)}
          </article>
        </div>
      </div>
    </div>
  );
}
