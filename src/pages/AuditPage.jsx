import React, { useMemo } from "react";
import Reveal from "../components/ui/Reveal.jsx";
import CategoryPage from "./CategoryPage.jsx";
import { AuditScopeNote, AuditSteps } from "../components/AuditTimeline.jsx";
import { INTENT } from "../analytics/intent.js";

/**
 * Detalle de la auditoría de procesos, sobre la plantilla común de categoría.
 *
 * El contenido es el mismo de siempre —los ocho entregables, los cuatro pasos
 * posteriores y la nota de alcance—; lo que cambia es que ahora se monta sobre
 * `CategoryPage`, para que las tres páginas de servicio compartan estructura en
 * vez de parecerse por casualidad.
 *
 * Los ocho entregables cumplen el papel de "frentes": responden la pregunta que
 * frena la compra de un producto de diagnóstico, que es qué recibo exactamente
 * por ese dinero. El "qué pasa después" no baja a letra pequeña: entra como
 * bloque propio, con el mismo peso visual.
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

          <Reveal delay={120} className="mt-10 md:mt-12">
            <AuditScopeNote title={copy.scopeTitle} text={copy.scopeNote} />
          </Reveal>
        </div>
      </section>
    </CategoryPage>
  );
}
