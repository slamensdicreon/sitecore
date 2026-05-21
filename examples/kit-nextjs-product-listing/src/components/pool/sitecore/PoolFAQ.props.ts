import { Field, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface FAQItemFields {
  question: Field<string>;
  answer: RichTextField;
}

export interface FAQItem {
  id: string;
  fields: FAQItemFields;
}

export interface PoolFAQFields {
  eyebrow: Field<string>;
  title: RichTextField;
  items: FAQItem[];
}

export interface PoolFAQProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolFAQFields;
}
