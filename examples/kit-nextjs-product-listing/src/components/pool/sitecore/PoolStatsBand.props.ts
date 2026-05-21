import { Field, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface StatItemFields {
  value: Field<string>;
  label: Field<string>;
}

export interface StatItem {
  id: string;
  fields: StatItemFields;
}

export interface PoolStatsBandFields {
  eyebrow: Field<string>;
  title: RichTextField;
  items: StatItem[];
}

export interface PoolStatsBandProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolStatsBandFields;
}
