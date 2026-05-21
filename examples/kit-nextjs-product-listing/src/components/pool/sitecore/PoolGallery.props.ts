import { Field, ImageField, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface GalleryImageFields {
  image: ImageField;
  alt?: Field<string>;
  tall?: Field<boolean>;
}

export interface GalleryImageItem {
  id: string;
  fields: GalleryImageFields;
}

export interface PoolGalleryFields {
  eyebrow: Field<string>;
  title: RichTextField;
  intro: RichTextField;
  items: GalleryImageItem[];
}

export interface PoolGalleryProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolGalleryFields;
}
