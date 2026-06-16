import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';
import type { Company, CompanyLocation } from './dycom.lib';
import { slugify } from './dycom.lib';

/* ----------------------- Sitecore datasource shape ----------------------- */
/*
 * These interfaces mirror the items authored in Sitecore. The Dycom Network Map
 * datasource holds Dycom Company children, and each company holds Dycom Location
 * children. The rendering's GraphQL ComponentQuery returns this nested tree.
 */

export interface DycomLocationFields {
  latitude?: { jsonValue: Field<string> };
  longitude?: { jsonValue: Field<string> };
  stateCode?: { jsonValue: Field<string> };
  isPrimary?: { jsonValue: Field<boolean> };
}

export interface DycomCompanyFields {
  /** Item id, returned by the ComponentQuery so each company has a stable key. */
  id?: string;
  companyName?: { jsonValue: Field<string> };
  logo?: { jsonValue: ImageField };
  website?: { jsonValue: LinkField };
  careersUrl?: { jsonValue: LinkField };
  description?: { jsonValue: Field<string> };
  hqAddress?: { jsonValue: Field<string> };
  hqCity?: { jsonValue: Field<string> };
  hqState?: { jsonValue: Field<string> };
  hqZip?: { jsonValue: Field<string> };
  hqPhone?: { jsonValue: Field<string> };
  children?: { results: DycomLocationFields[] };
}

export interface DycomNetworkMapDatasource {
  title?: { jsonValue: Field<string> };
  introduction?: { jsonValue: Field<string> };
  children?: { results: DycomCompanyFields[] };
}

export interface DycomNetworkMapParams {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface DycomNetworkMapProps extends ComponentProps {
  isPageEditing?: boolean;
  params: DycomNetworkMapParams;
  fields?: {
    data?: {
      datasource?: DycomNetworkMapDatasource;
    };
  };
}

/* ------------------------------- Mapping --------------------------------- */

function text(field?: { jsonValue?: Field<string> }): string {
  return (field?.jsonValue?.value as string) ?? '';
}

function num(field?: { jsonValue?: Field<string> }): number | null {
  const raw = field?.jsonValue?.value;
  if (raw === undefined || raw === null || raw === '') return null;
  const parsed = typeof raw === 'number' ? raw : Number.parseFloat(String(raw));
  return Number.isFinite(parsed) ? parsed : null;
}

function bool(field?: { jsonValue?: Field<boolean> }): boolean {
  return Boolean(field?.jsonValue?.value);
}

function linkUrl(field?: { jsonValue?: LinkField }): string {
  return (field?.jsonValue?.value?.href as string) ?? '';
}

function imageSrc(field?: { jsonValue?: ImageField }): string {
  return (field?.jsonValue?.value?.src as string) ?? '';
}

/**
 * Transform the authored Sitecore datasource tree into the runtime model the
 * map and sidebar consume. Companies without any geocoded locations are still
 * included (they appear in the list) but contribute no markers.
 */
export function mapDatasourceToCompanies(ds?: DycomNetworkMapDatasource): Company[] {
  const companies = ds?.children?.results ?? [];

  return companies.map((c, index): Company => {
    const name = text(c.companyName);

    const locations: CompanyLocation[] = (c.children?.results ?? [])
      .map((loc): CompanyLocation | null => {
        const lat = num(loc.latitude);
        const lng = num(loc.longitude);
        if (lat === null || lng === null) return null;
        return {
          lat,
          lng,
          state: text(loc.stateCode).toUpperCase(),
          primary: bool(loc.isPrimary),
        };
      })
      .filter((loc): loc is CompanyLocation => loc !== null);

    const states = Array.from(
      new Set(locations.map((l) => l.state).filter(Boolean))
    ).sort();

    return {
      // Prefer a deterministic numeric id derived from the item id so colours and
      // job seeds stay stable; fall back to the list index.
      id: hashId(c.id) ?? index + 1,
      name,
      logo: imageSrc(c.logo),
      website: linkUrl(c.website),
      careers: linkUrl(c.careersUrl),
      description: text(c.description),
      headquarters: {
        address: text(c.hqAddress),
        city: text(c.hqCity),
        state: text(c.hqState).toUpperCase(),
        zip: text(c.hqZip),
        phone: text(c.hqPhone),
      },
      states,
      locations,
    };
  });
}

/** Stable positive integer from a Sitecore GUID string. */
function hashId(guid?: string): number | null {
  if (!guid) return null;
  let h = 0;
  for (let i = 0; i < guid.length; i++) {
    h = (Math.imul(31, h) + guid.charCodeAt(i)) | 0;
  }
  return Math.abs(h) || 1;
}

export { slugify };
