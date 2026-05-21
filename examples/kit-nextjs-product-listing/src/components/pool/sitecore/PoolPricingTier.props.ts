import { Field, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface PricingTierItemFields {
  name: Field<string>;
  price: Field<string>;
  highlight?: Field<string>;
  description?: Field<string>;
  features?: RichTextField;
  ctaLabel?: Field<string>;
  ctaHref?: Field<string>;
}

export interface PricingTierItem {
  id: string;
  url?: string;
  name?: string;
  displayName?: string;
  fields: PricingTierItemFields;
}

export interface PoolPricingTierFields {
  eyebrow: Field<string>;
  title: RichTextField;
  intro: RichTextField;
  items: PricingTierItem[];
}

export interface PoolPricingTierProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolPricingTierFields;
}
