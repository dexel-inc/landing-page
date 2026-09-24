import React, { useMemo } from "react";
import Reveal from "../components/ui/Reveal.jsx";
import CategoryPage from "./CategoryPage.jsx";
import { AuditScopeNote, AuditSteps } from "../components/AuditTimeline.jsx";
import { INTENT } from "../analytics/intent.js";

/**
 * Process audit detail, built on the shared category template.
 *
 * The content is the same as always —the eight deliverables, the four
 * follow-up steps, and the scope note—; what changes is that it now mounts
 * on top of `CategoryPage`, so the three service pages share a structure
 * instead of merely resembling each other by coincidence.
 *
 * The eight deliverables play the role of "fronts": they answer the
 * question that holds back the purchase of a diagnostic product, which is
 * what exactly you get for that money. "What happens after" doesn't get
 * relegated to fine print: it comes in as its own block, with the same
 * visual weight.
 */
export default function AuditPage({ copy, process, chrome }) {
  const fronts = useMemo(
    () =>
      copy.deliverables.map((item) => ({
        iconName: "ScanSearch",
        name: item.title,
        text: item.text,
      })),
    [copy.deliverables],
  );

  const categoryCopy = {
    ...copy,
    key: "audit",
    frontsTitle: copy.deliverablesTitle,
    frontsIntro: copy.deliverablesIntro,
  };

  return (
    <CategoryPage
      copy={categoryCopy}
      process={process}
      chrome={chrome}
      fronts={fronts}
      intentType={INTENT.AUDIT}
      serviceId="auditoria"
    >
      <section className="relative z-10 px-4 md:px-6 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              {copy.afterTitle}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light">
              {copy.afterIntro}
            </p>
            <div className="w-12 h-0.5 bg-blue-500 mt-4" />
          </Reveal>

          <AuditSteps steps={copy.steps} />

          <div className="mt-10 md:mt-12">
            <AuditScopeNote title={copy.scopeTitle} text={copy.scopeNote} />
          </div>
        </div>
      </section>
    </CategoryPage>
  );
}
