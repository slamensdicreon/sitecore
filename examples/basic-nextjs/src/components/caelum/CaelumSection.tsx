import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  Image as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type CaelumSectionProps = ComponentProps & {
  fields: {
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Body?: Field<string>;
    Image?: ImageField;
  };
};

const CaelumSection = (props: CaelumSectionProps): JSX.Element => {
  const f = props.fields || ({} as CaelumSectionProps['fields']);
  const imgRight = props.params?.styles?.includes('image-right');
  const hasImage = !!f.Image?.value?.src;

  return (
    <section className="bg-[#FAF7F2] py-24 md:py-32">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-16 px-6 lg:px-10 ${
          hasImage ? 'lg:grid-cols-2' : ''
        }`}
      >
        <div className={imgRight ? 'lg:order-1' : ''}>
          {f.Eyebrow?.value ? (
            <span className="mb-5 block text-xs uppercase tracking-[0.32em] text-[#0B3A40]/60">
              <ContentSdkText field={f.Eyebrow} />
            </span>
          ) : null}
          {f.Title?.value ? (
            <h2 className="font-serif text-4xl font-light leading-[1.1] text-[#0B3A40] md:text-5xl">
              <ContentSdkText field={f.Title} />
            </h2>
          ) : null}
          {f.Body?.value ? (
            <div className="prose prose-lg mt-8 max-w-none text-[#0B3A40]/75 prose-headings:font-serif prose-headings:text-[#0B3A40] prose-a:text-[#0B3A40] prose-a:underline-offset-4">
              <ContentSdkRichText field={f.Body} />
            </div>
          ) : null}
        </div>
        {hasImage ? (
          <div className={`overflow-hidden rounded-sm ${imgRight ? 'lg:order-0' : ''}`}>
            <ContentSdkImage
              field={f.Image as ImageField}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CaelumSection;
