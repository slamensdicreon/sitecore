/**
 * T18: Read pool content from Sitecore Experience Edge instead of from the
 * hardcoded `data.ts` / `pricing.ts` arrays. The static `(pool)` route group
 * uses these helpers so that whatever a content editor authors in XM Cloud
 * is what the static fallback pages render.
 *
 * Lookup strategy: each list (services, pricing tiers) lives under a known
 * folder item. We fetch the folder's children via Edge GraphQL and map fields
 * to the typed shape the React components already consume.
 *
 * If Edge is unreachable, returns an EMERGENCY_FALLBACK_* constant so the
 * page never blanks out — these constants live next to the typed shapes in
 * `src/components/pool/data.ts` and `src/components/pool/pricing.ts`.
 */

import {
  EMERGENCY_FALLBACK_SERVICES,
  type Service,
} from 'src/components/pool/data';
import {
  EMERGENCY_FALLBACK_PRICING_TIERS,
  type PricingTier,
} from 'src/components/pool/pricing';

// Sitecore-authored datasource folder IDs (stable, owned by gen-pool-pages.mjs).
// Children of each folder are the list items.
const SERVICES_FOLDER_ID = '{4EC3C876-ABD1-0BDD-17BF-077A0069E89C}'; // Home/Services/Data/Services
const PRICING_TIER_ITEMS_FOLDER_ID = '{D09EB4F5-64A1-DD67-A23D-0BCAF151557A}'; // Home/Pricing/Data/Pricing Tier Items

// Experience Edge Delivery endpoint. The same context id used by the SDK is
// also accepted as `sc_apikey` for direct GraphQL.
const EDGE_ENDPOINT = 'https://edge.sitecorecloud.io/api/graphql/v1';
const REVALIDATE_SECONDS = 60;

type EdgeField = { name: string; value: string };
type EdgeItem = { id: string; name: string; fields: EdgeField[] };
type EdgeChildrenResponse = {
  data?: { item?: { children?: { results?: EdgeItem[] } } | null };
  errors?: Array<{ message: string }>;
};

function fieldMap(fields: EdgeField[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fields) out[f.name] = f.value ?? '';
  return out;
}

/** Strip Sitecore RichText `<ul><li>…</li></ul>` into a plain string[]. */
function bulletsFromRichText(html: string): string[] {
  if (!html) return [];
  return Array.from(html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)).map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim()
  );
}

/** Resolve Sitecore `<image mediaid="{...}" .../>` field to a CDN URL. */
function imageUrlFromField(html: string): string {
  // For T18 we only need the image *URL* on the static page. The real Sitecore
  // pages use the SDK's Image component which already handles mediaid → URL.
  // Static pages just need a stable URL — Edge resolves /-/media/<id>.ashx.
  const id = html.match(/mediaid="\{?([A-Fa-f0-9-]{36})\}?"/)?.[1];
  if (!id) return '';
  const clean = id.toLowerCase().replace(/-/g, '');
  return `https://edge.sitecorecloud.io/-/media/${clean}.ashx`;
}

async function fetchChildren(folderId: string): Promise<EdgeItem[] | null> {
  const apiKey =
    process.env.SITECORE_EDGE_CONTEXT_ID ??
    process.env.NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID;
  if (!apiKey) return null;
  const query = /* GraphQL */ `
    query PoolChildren($id: String!) {
      item(path: $id, language: "en") {
        children {
          results {
            id
            name
            fields(ownFields: true) { name value }
          }
        }
      }
    }
  `;
  try {
    const res = await fetch(EDGE_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'sc_apikey': apiKey,
      },
      body: JSON.stringify({ query, variables: { id: folderId } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as EdgeChildrenResponse;
    if (json.errors?.length) return null;
    return json.data?.item?.children?.results ?? null;
  } catch {
    return null;
  }
}

export async function getPoolServices(): Promise<Service[]> {
  const items = await fetchChildren(SERVICES_FOLDER_ID);
  if (!items || items.length === 0) return EMERGENCY_FALLBACK_SERVICES;
  return items.map((it): Service => {
    const f = fieldMap(it.fields);
    return {
      id: f.slug || it.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: f.title || it.name,
      blurb: f.blurb || '',
      description: (f.description || '').replace(/<[^>]+>/g, ''),
      image: imageUrlFromField(f.image),
      bullets: bulletsFromRichText(f.bullets),
    };
  });
}

/** Parse Sitecore price strings like "from $95,000" into the numeric `from`. */
function parsePriceToNumber(raw: string): number {
  const digits = (raw || '').replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export async function getPoolPricingTiers(): Promise<PricingTier[]> {
  const items = await fetchChildren(PRICING_TIER_ITEMS_FOLDER_ID);
  if (!items || items.length === 0) return EMERGENCY_FALLBACK_PRICING_TIERS;
  return items.map((it): PricingTier => {
    const f = fieldMap(it.fields);
    const name = f.name || it.name;
    return {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      from: parsePriceToNumber(f.price),
      summary: f.description || '',
      features: bulletsFromRichText(f.features),
      featured: f.highlight === '1' || f.highlight === 'true',
    };
  });
}
