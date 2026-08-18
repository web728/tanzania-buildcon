/**
 * Cited market statistics used across the site (homepage, Why Tanzania).
 * Every entry must carry a verifiable source. Remove an entry rather than
 * publish an unsourced figure.
 */

export type MarketFact = {
  id: string;
  value: string;
  label: string;
  detail?: string;
  period?: string;
  sourceName: string;
  sourceUrl?: string;
  lastVerified: string; // YYYY-MM-DD
};

export const marketFacts: MarketFact[] = [
  {
    id: "construction-growth",
    value: "6.5%",
    label: "Construction sector growth",
    detail:
      "Tanzania's construction activity recorded 6.5% growth in the third quarter of 2025, compared with 3.9% in the corresponding quarter of 2024.",
    period: "Q3 2025",
    sourceName: "National Bureau of Statistics, Tanzania",
    sourceUrl: "https://www.nbs.go.tz/",
    lastVerified: "2026-08-14",
  },
  {
    id: "port-trade-share",
    value: "95%",
    label: "Of Tanzania's international trade",
    detail:
      "Dar es Salaam Port handles approximately 95% of Tanzania's international trade, reinforcing Dar es Salaam's position as the country's principal commercial, import and distribution centre.",
    sourceName: "Tanzania Ports Authority",
    sourceUrl: "https://www.tanzaniaports.go.tz/",
    lastVerified: "2026-08-14",
  },
  {
    id: "sgr-network",
    value: "2,561+ km",
    label: "Planned Standard Gauge Railway network",
    detail:
      "Tanzania Railways Corporation is developing the country's Standard Gauge Railway network, alongside continuing road and infrastructure projects that contribute to construction demand across multiple sectors.",
    sourceName: "Tanzania Railways Corporation",
    sourceUrl: "https://trc.co.tz/",
    lastVerified: "2026-08-14",
  },
];

export const opportunityCategories: string[] = [
  "Residential Development",
  "Commercial Construction",
  "Roads & Infrastructure",
  "Industrial Projects",
  "Hotels & Hospitality",
  "Warehousing & Logistics",
  "Water & Utility Projects",
  "Public Infrastructure",
  "Renovation & Interior Projects",
];

export const marketSources = [
  { name: "National Bureau of Statistics Tanzania", url: "https://www.nbs.go.tz/" },
  { name: "Tanzania Ports Authority", url: "https://www.tanzaniaports.go.tz/" },
  { name: "Tanzania Railways Corporation", url: "https://trc.co.tz/" },
  { name: "TANROADS", url: "https://www.tanroads.go.tz/" },
  { name: "World Bank", url: "https://www.worldbank.org/en/country/tanzania" },
];
