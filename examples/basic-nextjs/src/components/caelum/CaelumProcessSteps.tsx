import React, { JSX } from 'react';
import {
  Field,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Step = {
  fields: {
    Title?: Field<string>;
    Description?: Field<string>;
  };
};

type CaelumProcessStepsProps = ComponentProps & {
  fields: {
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Items?: Step[];
  };
};

const CaelumProcessSteps = (props: CaelumProcessStepsProps): JSX.Element => {
  const f = props.fields || ({} as CaelumProcessStepsProps['fields']);
  const items = Array.isArray(f.Items) ? f.Items : [];

  return (
    <section className="bg-[#FAF7F2] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
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
        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-[#E8DDD0] md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={i} className="flex flex-col bg-white p-10">
              <div className="font-serif text-4xl font-light text-[#0B3A40]/30">
                {String(i + 1).padStart(2, '0')}
              </div>
              {item.fields?.Title?.value ? (
                <h3 className="mt-6 font-serif text-2xl text-[#0B3A40]">
                  <ContentSdkText field={item.fields.Title} />
                </h3>
              ) : null}
              {item.fields?.Description?.value ? (
                <div className="prose mt-4 text-sm leading-relaxed text-[#0B3A40]/70">
                  <ContentSdkRichText field={item.fields.Description} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CaelumProcessSteps;
