// Pool cost calculator pricing model. Tune constants here — every number
// shown on the pricing page and inside the calculator flows from this file.

export type PoolType = {
  id: 'plunge' | 'classic' | 'lap' | 'infinity' | 'custom';
  label: string;
  baseCost: number;
  blurb: string;
};

export const POOL_TYPES: PoolType[] = [
  {
    id: 'plunge',
    label: 'Plunge',
    baseCost: 95_000,
    blurb: 'Intimate, architectural, often spa-integrated',
  },
  {
    id: 'classic',
    label: 'Classic',
    baseCost: 165_000,
    blurb: 'The everyday family pool, finished to atelier standard',
  },
  {
    id: 'lap',
    label: 'Lap',
    baseCost: 215_000,
    blurb: 'Engineered for swim training, minimum 50 ft',
  },
  {
    id: 'infinity',
    label: 'Infinity Edge',
    baseCost: 285_000,
    blurb: 'Vanishing edge with catch basin and view orientation',
  },
  {
    id: 'custom',
    label: 'Fully Bespoke',
    baseCost: 360_000,
    blurb: 'Sculptural geometry, integrated water features, no compromise',
  },
];

export type Finish = {
  id: 'plaster' | 'pebble' | 'glass';
  label: string;
  multiplier: number;
  description: string;
};

export const FINISHES: Finish[] = [
  { id: 'plaster', label: 'Hand-polished plaster', multiplier: 1.0, description: 'Soft underfoot, classic mid-tone' },
  { id: 'pebble', label: 'European river pebble', multiplier: 1.18, description: 'Deep color, exceptional longevity' },
  { id: 'glass', label: 'Italian glass tile', multiplier: 1.42, description: 'Jewel-like clarity, the Caelum signature' },
];

export type AddOn = {
  id: string;
  label: string;
  cost: number;
  hint: string;
};

export const ADD_ONS: AddOn[] = [
  { id: 'spa', label: 'Integrated spa', cost: 32_000, hint: '8-person, raised with spillway' },
  { id: 'fire', label: 'Fire feature', cost: 14_500, hint: 'Bronze bowl or wall, gas-plumbed' },
  { id: 'water', label: 'Water feature', cost: 11_000, hint: 'Sheer descent or scupper wall' },
  { id: 'auto-cover', label: 'Automatic cover', cost: 18_000, hint: 'Recessed, motorized, key-switch' },
  { id: 'heater', label: 'Heater & chiller', cost: 9_500, hint: 'Year-round comfort, app-controlled' },
  { id: 'lighting', label: 'Architectural lighting', cost: 8_000, hint: 'Color-tunable, scene programming' },
  { id: 'sound', label: 'Underwater sound', cost: 6_500, hint: 'High-fidelity submersible speakers' },
];

// Size multiplier: small (≤14×28) baseline, medium adds 18%, large adds 38%, oversized adds 65%.
export const SIZES = [
  { id: 'small', label: 'Up to 14 × 28 ft', multiplier: 1.0 },
  { id: 'medium', label: '16 × 32 to 18 × 36 ft', multiplier: 1.18 },
  { id: 'large', label: '20 × 40 to 24 × 50 ft', multiplier: 1.38 },
  { id: 'oversized', label: 'Larger than 24 × 50 ft', multiplier: 1.65 },
] as const;

export type SizeId = (typeof SIZES)[number]['id'];

export type Estimate = {
  low: number;
  high: number;
  type: PoolType;
  finish: Finish;
  size: (typeof SIZES)[number];
  addOns: AddOn[];
};

export function estimate(args: {
  typeId: PoolType['id'];
  finishId: Finish['id'];
  sizeId: SizeId;
  addOnIds: string[];
}): Estimate {
  const type = POOL_TYPES.find((t) => t.id === args.typeId) ?? POOL_TYPES[1];
  const finish = FINISHES.find((f) => f.id === args.finishId) ?? FINISHES[0];
  const size = SIZES.find((s) => s.id === args.sizeId) ?? SIZES[0];
  const addOns = ADD_ONS.filter((a) => args.addOnIds.includes(a.id));

  const base = type.baseCost * size.multiplier * finish.multiplier;
  const addOnTotal = addOns.reduce((acc, a) => acc + a.cost, 0);
  const subtotal = base + addOnTotal;

  // Quote bands ± 12% to set realistic expectations.
  const low = Math.round((subtotal * 0.92) / 1000) * 1000;
  const high = Math.round((subtotal * 1.12) / 1000) * 1000;
  return { low, high, type, finish, size, addOns };
}

export function formatUSD(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export type PricingTier = {
  id: string;
  name: string;
  from: number;
  summary: string;
  features: string[];
  featured?: boolean;
};

/**
 * T18: Emergency fallback only. Production reads `getPoolPricingTiers()` from
 * `src/lib/pool-content.ts`, which fetches the same shape from Sitecore.
 */
export const EMERGENCY_FALLBACK_PRICING_TIERS: PricingTier[] = [
  {
    id: 'plunge',
    name: 'Plunge',
    from: 95_000,
    summary: 'Architectural intimacy — perfect for courtyards and tight modern lots.',
    features: [
      'Up to 14 × 28 ft footprint',
      'Hand-polished plaster finish',
      'Single-color LED lighting',
      'Variable-speed pump + cartridge filter',
      'Standard equipment pad',
    ],
  },
  {
    id: 'classic',
    name: 'Classic',
    from: 165_000,
    summary: 'The everyday family pool, finished to gallery standard.',
    features: [
      'Up to 18 × 36 ft footprint',
      'European pebble finish, choice of palette',
      'Color-tunable architectural lighting',
      'Salt-chlorine sanitization + UV polish',
      'Integrated automation app',
    ],
    featured: true,
  },
  {
    id: 'signature',
    name: 'Signature',
    from: 285_000,
    summary: 'Infinity edge or fully bespoke geometry, integrated features.',
    features: [
      'Vanishing edge or custom geometry',
      'Italian glass tile waterline + accents',
      'Integrated spa with spillway',
      'Fire & water feature pairing',
      'Concierge maintenance — first year complimentary',
    ],
  },
];
