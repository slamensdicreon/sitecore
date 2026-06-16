import { Field, LinkField, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface PoolCtaBannerFields {
  eyebrow: Field<string>;
  title: RichTextField;
  body: RichTextField;
  primaryCta: LinkField;
  secondaryCta: LinkField;
  backgroundImage: ImageField;
}

export interface PoolCtaBannerProps extends ComponentProps {
  params: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
  fields: PoolCtaBannerFields;
}
