/**
 * Shared, framework-agnostic helpers for the Dycom "one connected network" map.
 *
 * The interactive map is driven by a small runtime model (companies + their
 * physical locations). In Sitecore that model is authored as datasource items
 * (a Dycom Network Map item with Dycom Company children, each holding Dycom
 * Location children) and mapped onto these shapes by the component. Keeping the
 * runtime model separate from the Sitecore field shape lets the map, the
 * sidebar and the (derived) open-roles feed stay simple and pure.
 */
import type { FeatureCollection, Point } from 'geojson';

/* ------------------------------ Brand tokens ----------------------------- */

/**
 * Dycom brand tokens. The connected map layer is intentionally uniform across
 * the family of companies, so the markers always read as "one network".
 */
export const brand = {
  blue: '#005cb9',
  blueDark: '#00427f',
  green: '#84bd00',
  orange: '#f28c28',
  softBlue: '#d7e2ff',
} as const;

export const US_STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia',
};

export function stateName(code: string): string {
  return US_STATE_NAMES[code?.toUpperCase()] ?? code;
}

/** CSS custom properties consumed by the themed sidebar (`var(--dycom-accent)`). */
export function dycomThemeVars(): React.CSSProperties {
  return {
    '--dycom-accent': brand.blue,
    '--dycom-accent-dark': brand.blueDark,
    '--dycom-accent-soft': `color-mix(in srgb, ${brand.blue} 8%, white)`,
    '--dycom-accent-ring': `color-mix(in srgb, ${brand.blue} 30%, white)`,
  } as React.CSSProperties;
}

/* ------------------------------ Runtime model ---------------------------- */

export interface CompanyLocation {
  lng: number;
  lat: number;
  state: string;
  primary: boolean;
}

export interface CompanyHeadquarters {
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  website: string;
  careers: string;
  description: string;
  headquarters: CompanyHeadquarters;
  /** Distinct two-letter state codes this company operates in. */
  states: string[];
  /** Every location (headquarters + satellite offices). */
  locations: CompanyLocation[];
}

/** URL-safe slug for a company. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/* ------------------------------- GeoJSON --------------------------------- */

export type PointCollection = FeatureCollection<Point>;

export const EMPTY_FC: PointCollection = { type: 'FeatureCollection', features: [] };

/** Build a GeoJSON FeatureCollection of every location across the given companies. */
export function toFeatureCollection(source: Company[]): PointCollection {
  const features: PointCollection['features'] = [];
  for (const company of source) {
    for (const loc of company.locations) {
      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [loc.lng, loc.lat] },
        properties: {
          companyId: company.id,
          companyName: company.name,
          state: loc.state,
          primary: loc.primary,
        },
      });
    }
  }
  return { type: 'FeatureCollection', features };
}

/* --------------------------- Open roles (jobs) --------------------------- */

/**
 * The map's "Open roles" view models a single SAP SuccessFactors requisition
 * feed projected across every property. We derive it deterministically from the
 * company/location data so server and client render identical counts.
 */
export interface Job {
  id: string;
  title: string;
  category: string;
  companyId: number;
  companyName: string;
  lng: number;
  lat: number;
  state: string;
  postedDays: number;
}

export const JOB_CATEGORIES = [
  'Wireline Construction',
  'Wireless Construction',
  'Engineering',
  'Locating',
  'Fulfillment',
  'Maintenance & Restoration',
  'Project Management',
  'Fleet & Equipment',
  'Safety',
] as const;

const TITLES: Record<string, string[]> = {
  'Wireline Construction': [
    'Fiber Splice Technician',
    'Underground Crew Foreman',
    'Aerial Lineman',
    'Cable Construction Laborer',
  ],
  'Wireless Construction': [
    'Tower Technician',
    'Small Cell Installer',
    'RF Engineer',
    'Wireless Foreman',
  ],
  Engineering: ['OSP Design Engineer', 'Network Planner', 'CAD Designer', 'Permitting Specialist'],
  Locating: ['Utility Locator', 'Damage Prevention Tech', 'Locate Supervisor'],
  Fulfillment: ['Field Service Technician', 'Install & Repair Technician', 'Fulfillment Lead'],
  'Maintenance & Restoration': [
    'Restoration Technician',
    'Maintenance Crew Member',
    'Splicing Maintenance Tech',
  ],
  'Project Management': ['Project Manager', 'Project Coordinator', 'Construction Manager'],
  'Fleet & Equipment': ['Diesel Mechanic', 'Fleet Coordinator', 'Equipment Operator'],
  Safety: ['Safety Manager', 'Field Safety Coordinator', 'Compliance Specialist'],
};

// Small deterministic PRNG so output is stable across server/client renders.
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

export function buildJobs(source: Company[]): Job[] {
  const jobs: Job[] = [];
  for (const company of source) {
    if (company.locations.length === 0) continue;
    const rng = lcg((company.id || 1) * 2654435761);
    const count = Math.max(2, Math.round(company.locations.length * 1.6));
    for (let i = 0; i < count; i++) {
      const loc = company.locations[Math.floor(rng() * company.locations.length)];
      const category = JOB_CATEGORIES[Math.floor(rng() * JOB_CATEGORIES.length)];
      const titles = TITLES[category];
      const title = titles[Math.floor(rng() * titles.length)];
      jobs.push({
        id: `${company.id}-${i}`,
        title,
        category,
        companyId: company.id,
        companyName: company.name,
        lng: loc.lng,
        lat: loc.lat,
        state: loc.state,
        postedDays: 1 + Math.floor(rng() * 30),
      });
    }
  }
  return jobs;
}

export function jobsToFeatureCollection(jobs: Job[]): PointCollection {
  return {
    type: 'FeatureCollection',
    features: jobs.map((j) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [j.lng, j.lat] },
      properties: {
        companyId: j.companyId,
        companyName: j.companyName,
        category: j.category,
        title: j.title,
      },
    })),
  };
}
