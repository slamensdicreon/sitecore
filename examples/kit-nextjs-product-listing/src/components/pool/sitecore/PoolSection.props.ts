import { Field, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface PoolSectionFields {
  eyebrow: Field<string>;
  title: RichTextField;
  intro: RichTextField;
  body: RichTextField;
  align: Field<string>; // 'left' | 'center'
}

export interface PoolSectionProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolSectionFields;
}
