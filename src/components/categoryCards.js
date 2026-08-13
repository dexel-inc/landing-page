/** Arma las tres tarjetas de categoría a partir del mismo copy que las páginas. */
export function buildCategoryCards({ categories, audit, routeKeys }) {
  return [
    {
      key: "webDev",
      routeKey: routeKeys.WEB_DEV,
      navLabel: categories.webDev.navLabel,
      subtitle: categories.webDev.subtitle,
      price: categories.webDev.price,
      delivery: categories.webDev.delivery,
      fronts: categories.webDev.fronts.map((front) => front.name),
    },
    {
      key: "automation",
      routeKey: routeKeys.AUTOMATION,
      navLabel: categories.automation.navLabel,
      subtitle: categories.automation.subtitle,
      price: categories.automation.price,
      delivery: categories.automation.delivery,
      fronts: categories.automation.fronts.map((front) => front.name),
    },
    {
      key: "audit",
      routeKey: routeKeys.AUDIT,
      navLabel: audit.navLabel,
      subtitle: audit.subtitle,
      price: audit.price,
      delivery: audit.delivery,
      fronts: audit.deliverables.map((item) => item.title),
    },
  ];
}
