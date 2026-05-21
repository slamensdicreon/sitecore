import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface ServiceItemFields {
  title: Field<string>;
  slug?: Field<string>;
  blurb: Field<string>;
  description?: RichTextField;
  image?: ImageField;
  bullets?: RichTextField;
}

export interface ServiceItem {
  id: string;
  url?: string;
  name?: string;
  displayName?: string;
  fields: ServiceItemFields;
}

export interface PoolServicesGridFields {
  eyebrow: Field<string>;
  title: RichTextField;
  intro: RichTextField;
  items: ServiceItem[];
}

export interface PoolServicesGridProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolServicesGridFields;
}
