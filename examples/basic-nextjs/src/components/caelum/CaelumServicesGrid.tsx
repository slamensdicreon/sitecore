import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  Image as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ServiceItem = {
  fields: {
    Title?: Field<string>;
    Description?: Field<string>;
    Image?: ImageField;
  };
};

type CaelumServicesGridProps = ComponentProps & {
  fields: {
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Intro?: Field<string>;
    Items?: ServiceItem[];
  };
};

const CaelumServicesGrid = (props: CaelumServicesGridProps): JSX.Element => {
  const f = props.fields || ({} as CaelumServicesGridProps['fields']);
  const items = Array.isArray(f.Items) ? f.Items : [];

  return (
    <section className="bg-[#FAF7F2] py-24 md:py-32">
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
          {f.Intro?.value ? (
            <p className="mt-6 text-lg leading-relaxed text-[#0B3A40]/70">
              <ContentSdkText field={f.Intro} />
            </p>
          ) : null}
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const fi = item.fields || {};
            return (
              <article
                key={i}
                className="group flex flex-col overflow-hidden rounded-sm border border-[#E8DDD0] bg-white transition hover:border-[#0B3A40]/30 hover:shadow-xl hover:shadow-[#0B3A40]/5"
              >
                {fi.Image?.value?.src ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <ContentSdkImage
                      field={fi.Image}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#0B3A40]/10 to-[#E8DDD0]" />
                )}
                <div className="flex flex-1 flex-col p-8">
                  {fi.Title?.value ? (
                    <h3 className="font-serif text-2xl text-[#0B3A40]">
                      <ContentSdkText field={fi.Title} />
                    </h3>
                  ) : null}
                  {fi.Description?.value ? (
                    <div className="prose mt-4 text-[#0B3A40]/70">
                      <ContentSdkRichText field={fi.Description} />
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaelumServicesGrid;
