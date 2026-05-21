import { Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface PoolHeaderFields {
  brandName: Field<string>;
  tagline: Field<string>;
  ctaLabel: Field<string>;
  ctaLink: LinkField;
  nav1Label: Field<string>;
  nav1Link: LinkField;
  nav2Label: Field<string>;
  nav2Link: LinkField;
  nav3Label: Field<string>;
  nav3Link: LinkField;
  nav4Label: Field<string>;
  nav4Link: LinkField;
}

export interface PoolHeaderProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolHeaderFields;
}
