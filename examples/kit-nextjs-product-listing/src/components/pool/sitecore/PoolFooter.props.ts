import { Field, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface PoolFooterFields {
  brandName: Field<string>;
  description: RichTextField;
  address: Field<string>;
  hoursWeek: Field<string>;
  hoursWeekend: Field<string>;
  phone: Field<string>;
  email: Field<string>;
  copyright: Field<string>;
  instagramLink: LinkField;
  pinterestLink: LinkField;
  houzzLink: LinkField;
}

export interface PoolFooterProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolFooterFields;
}
