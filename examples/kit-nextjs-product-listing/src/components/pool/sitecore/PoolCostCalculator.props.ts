import { Field, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface PoolCostCalculatorFields {
  eyebrow: Field<string>;
  title: RichTextField;
  intro: RichTextField;
  ctaLabel: Field<string>;
  ctaLink: LinkField;
}

export interface PoolCostCalculatorProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolCostCalculatorFields;
}
