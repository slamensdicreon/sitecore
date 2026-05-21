// Mock data for the Caelum pool atelier site.
// Edits here change every page — single source of truth pre-Sitecore.

export const BRAND = {
  name: 'CAELUM',
  tagline: 'Bespoke Pool Atelier',
  phone: '+1 (561) 555-0142',
  email: 'studio@caelumpools.com',
  address: '210 Ocean Boulevard · Palm Beach, FL',
  hoursWeek: 'Mon–Fri · 9am – 6pm',
  hoursWeekend: 'Sat · 10am – 4pm · Sun by appointment',
  social: {
    instagram: 'https://instagram.com/',
    pinterest: 'https://pinterest.com/',
    houzz: 'https://houzz.com/',
  },
} as const;

export const NAV = [
  { label: 'Atelier', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
] as const;

export type Service = {
  id: string;
  title: string;
  blurb: string;
  description: string;
  image: string;
  bullets: string[];
};

/**
 * T18: Treated as an *emergency fallback* only. Production reads
 * `getPoolServices()` from `src/lib/pool-content.ts`, which fetches the same
 * shape from Sitecore Experience Edge. Keep this list authored-by-hand for
 * offline dev and as a last-resort if Edge is unreachable.
 */
export const EMERGENCY_FALLBACK_SERVICES: Service[] = [
  {
    id: 'bespoke-design',
    title: 'Bespoke Design & Build',
    blurb:
      'Custom pool architecture from concept to first swim — engineered for permanence and finished to gallery standards.',
    description:
      'Our atelier pairs you with a master designer and structural engineer. Every Caelum pool is one of one — drawn from your site, your home, and the way you live in the water.',
    image:
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=1600&q=85&auto=format&fit=crop',
    bullets: [
      'On-site survey and 3D concept renders',
      'Hand-selected stone, glass tile, and plaster finishes',
      'Structural engineering with 25-year shell warranty',
      'Project lead from groundbreak to commissioning',
    ],
  },
  {
    id: 'renovation',
    title: 'Renovation & Re-Imagining',
    blurb:
      'Transform an aging pool into a contemporary statement — new finishes, geometry, lighting, and equipment.',
    description:
      'Most pools age out of style long before they age out of structure. We resurface, reshape, and re-engineer existing pools into spaces that feel brand new.',
    image:
      'https://images.unsplash.com/photo-1559563458-527698bf5295?w=1600&q=85&auto=format&fit=crop',
    bullets: [
      'Plaster, pebble, and glass-tile resurfacing',
      'Coping, decking, and waterline redesign',
      'Equipment modernization (variable-speed, salt, automation)',
      'Energy audits with payback projections',
    ],
  },
  {
    id: 'maintenance',
    title: 'White-Glove Maintenance',
    blurb:
      'Weekly stewardship by trained technicians — water chemistry, equipment, and surface care managed for you.',
    description:
      'Our service members receive a single dedicated technician, a service log per visit, and 48-hour response on any issue.',
    image:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1600&q=85&auto=format&fit=crop',
    bullets: [
      'Weekly visits with digital service log',
      'Lab-grade water chemistry every visit',
      'Filter, pump, and heater preventative care',
      'Dedicated technician + 48-hour response SLA',
    ],
  },
  {
    id: 'opening-closing',
    title: 'Opening & Closing',
    blurb:
      'Seasonal transitions handled end-to-end — covers, lines, equipment, and start-up chemistry.',
    description:
      'Open the season with clear water on day one, close it knowing nothing will freeze. Both visits include a written condition report.',
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=85&auto=format&fit=crop',
    bullets: [
      'Cover removal, cleaning, and storage',
      'Equipment commissioning and pressure-testing',
      'Winterization with antifreeze, plugs, and freeze sensors',
      'Written condition report each visit',
    ],
  },
  {
    id: 'equipment',
    title: 'Equipment & Automation',
    blurb:
      'Smart pump, heater, lighting, and chemistry automation — controlled from your phone.',
    description:
      'We design integrated equipment pads that are quiet, efficient, and beautiful to look at — and connect them to a single app you actually want to open.',
    image:
      'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=1600&q=85&auto=format&fit=crop',
    bullets: [
      'Pentair, Jandy, and Hayward authorized installer',
      'Color-tunable LED lighting scenes',
      'Salt-chlorine, UV, and ozone sanitization',
      'Single-app control of pump, heat, light, and water features',
    ],
  },
  {
    id: 'repair',
    title: 'Diagnostics & Repair',
    blurb:
      'Leak detection, structural repair, and equipment service — by technicians who built pools first.',
    description:
      'Most problems are not what they look like. Our team diagnoses before quoting, and explains the why before any work begins.',
    image:
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=85&auto=format&fit=crop',
    bullets: [
      'Electronic and pressure-test leak detection',
      'Crack injection and shell repair',
      'Pump, heater, and salt-cell replacement',
      'Transparent diagnosis-first quoting',
    ],
  },
];

export const STATS = [
  { value: '500+', label: 'Bespoke pools built' },
  { value: '25', label: 'Years in practice' },
  { value: '94%', label: 'Client referral rate' },
  { value: '25yr', label: 'Structural warranty' },
];

export const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Atelier Consultation',
    body: 'A 90-minute conversation at your home or our studio. We walk the site, listen to how you live, and sketch first ideas. Confidential, no obligation.',
  },
  {
    n: '02',
    title: 'Design & Engineering',
    body: 'Within four weeks: a curated set of three concepts, hand-rendered in 3D. We refine until one feels inevitable — then engineer to construction documents.',
  },
  {
    n: '03',
    title: 'Build & Finish',
    body: 'A single project lead, a fixed timeline, weekly client updates with photography. Our crews are in-house — no rotating subcontractors.',
  },
  {
    n: '04',
    title: 'Commissioning & Care',
    body: 'First swim is ceremonial. We tune water chemistry for two weeks, then transition you to our maintenance program — or hand you a complete owner manual.',
  },
];

export const GALLERY: { src: string; alt: string; tall?: boolean }[] = [
  {
    src: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1600&q=85&auto=format&fit=crop',
    alt: 'Twilight infinity edge over the Atlantic',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=85&auto=format&fit=crop',
    alt: 'Sunlit water close-up, glass tile',
  },
  {
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=85&auto=format&fit=crop',
    alt: 'Modern courtyard pool, travertine deck',
  },
  {
    src: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=85&auto=format&fit=crop',
    alt: 'Limestone coping with planted edge',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=1200&q=85&auto=format&fit=crop',
    alt: 'Underwater light shafts',
  },
  {
    src: 'https://images.unsplash.com/photo-1519495859454-b6f97b1c5d51?w=1200&q=85&auto=format&fit=crop',
    alt: 'Dusk gathering, fire feature',
  },
  {
    src: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=1200&q=85&auto=format&fit=crop',
    alt: 'Spa with cascading edge',
  },
  {
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85&auto=format&fit=crop',
    alt: 'Mountain modern, dark plaster',
    tall: true,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Working with Caelum was the calmest renovation of our lives. They quoted in writing, finished early, and the water feature is the favorite thing in our home.',
    author: 'Helena & Marcus T.',
    role: 'Manalapan, FL · Bespoke build',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=85&auto=format&fit=crop',
  },
  {
    quote:
      'The pool we inherited was 30 years old and beyond tired. Caelum re-imagined it as a courtyard centerpiece — same footprint, completely new soul.',
    author: 'Dr. Anjali R.',
    role: 'Boca Raton · Renovation',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=85&auto=format&fit=crop',
  },
  {
    quote:
      'Their maintenance program is the only one I recommend to friends. One dedicated technician for four years now. I never think about my pool.',
    author: 'Thomas K.',
    role: 'Jupiter Island · Maintenance member',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=85&auto=format&fit=crop',
  },
];

export const FAQS = [
  {
    q: 'How long does a custom build take?',
    a: 'A typical Caelum build runs 14–22 weeks from groundbreak to first swim, depending on geology, finish selection, and integration with surrounding architecture. We lock the timeline before the first shovel.',
  },
  {
    q: 'What does a Caelum pool actually cost?',
    a: 'Plunge pools begin at $95,000 and most full bespoke projects fall between $260,000 and $620,000. Our cost calculator on the pricing page provides a realistic range within minutes — and we honor the upper bound of that range in writing after a site visit.',
  },
  {
    q: 'Do you take on smaller renovations?',
    a: 'Yes. Renovations begin at $42,000 and can be staged across seasons. We are equally invested in a thoughtful resurface as we are in a ground-up build.',
  },
  {
    q: 'Where do you build?',
    a: 'South Florida coastal counties (Palm Beach, Martin, Broward, Miami-Dade). We accept select destination projects worldwide for full bespoke builds.',
  },
  {
    q: 'What warranty comes with a build?',
    a: '25-year structural shell warranty, 10-year finish warranty (plaster/pebble/glass), and manufacturer warranties on all equipment — extended to lifetime for active maintenance members.',
  },
];

/**
 * Alias kept for client components (Footer, ServicesGrid) that don't
 * server-side-fetch. The async server route `app/(pool)/services/page.tsx`
 * uses `getPoolServices()` from `src/lib/pool-content.ts` which falls back
 * to this same array if Sitecore Edge is unreachable.
 */
export const SERVICES = EMERGENCY_FALLBACK_SERVICES;
