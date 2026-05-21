import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface TestimonialFields {
  quote: Field<string>;
  author: Field<string>;
  role: Field<string>;
  avatar?: ImageField;
}

export interface TestimonialItem {
  id: string;
  fields: TestimonialFields;
}

export interface PoolTestimonialsFields {
  eyebrow: Field<string>;
  title: RichTextField;
  intro: RichTextField;
  items: TestimonialItem[];
}

export interface PoolTestimonialsProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolTestimonialsFields;
}
