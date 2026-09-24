import React from "react";
import Reveal from "../components/ui/Reveal.jsx";
import CategoryPage from "./CategoryPage.jsx";
import { AuditScopeNote, AuditSteps } from "../components/AuditTimeline.jsx";
import { INTENT } from "../contact/whatsapp.js";

/**
 * Audit hub, built on the shared category template.
 *
 * The fronts are the four audits, each linking to its own page with plans
 * —same shape as the web development and automation hubs—. "What happens
 * after" applies to all four, so it lives here and doesn't get relegated to
 * fine print: it comes in as its own block, with the same visual weight.
 */
export default function AuditPage({ copy, process, chrome }) {
  return (
    <CategoryPage
      copy={{ ...copy, key: "audit" }}
      process={process}
      chrome={chrome}
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
