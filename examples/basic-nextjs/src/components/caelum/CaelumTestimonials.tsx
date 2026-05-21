import React, { JSX } from 'react';
import {
  Field,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Quote = {
  fields: {
    Quote?: Field<string>;
    Author?: Field<string>;
    AuthorTitle?: Field<string>;
  };
};

type CaelumTestimonialsProps = ComponentProps & {
  fields: {
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Items?: Quote[];
  };
};

const CaelumTestimonials = (props: CaelumTestimonialsProps): JSX.Element => {
  const f = props.fields || ({} as CaelumTestimonialsProps['fields']);
  const items = Array.isArray(f.Items) ? f.Items : [];

  return (
    <section className="bg-[#E8DDD0]/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
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
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const fi = item.fields || {};
            return (
              <figure
                key={i}
                className="flex flex-col justify-between rounded-sm border border-[#E8DDD0] bg-white p-10"
              >
                <blockquote className="prose font-serif text-xl italic leading-relaxed text-[#0B3A40]">
                  {fi.Quote?.value ? <ContentSdkRichText field={fi.Quote} /> : null}
                </blockquote>
                <figcaption className="mt-8 border-t border-[#E8DDD0] pt-6">
                  {fi.Author?.value ? (
                    <div className="text-sm font-medium uppercase tracking-[0.18em] text-[#0B3A40]">
                      <ContentSdkText field={fi.Author} />
                    </div>
                  ) : null}
                  {fi.AuthorTitle?.value ? (
                    <div className="mt-1 text-xs text-[#0B3A40]/60">
                      <ContentSdkText field={fi.AuthorTitle} />
                    </div>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaelumTestimonials;
