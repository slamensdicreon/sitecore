import React, { JSX } from 'react';
import { Field, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type StatItem = {
  fields: {
    Value?: Field<string>;
    Label?: Field<string>;
  };
};

type CaelumStatsBandProps = ComponentProps & {
  fields: {
    Items?: StatItem[];
  };
};

const CaelumStatsBand = (props: CaelumStatsBandProps): JSX.Element => {
  const items = Array.isArray(props.fields?.Items) ? props.fields!.Items! : [];

  return (
    <section className="border-y border-[#E8DDD0] bg-[#0B3A40] py-20 text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="text-center md:text-left">
              {item.fields?.Value?.value ? (
                <div className="font-serif text-5xl font-light text-[#E8DDD0] md:text-6xl">
                  <ContentSdkText field={item.fields.Value} />
                </div>
              ) : null}
              {item.fields?.Label?.value ? (
                <div className="mt-3 text-xs uppercase tracking-[0.24em] text-[#FAF7F2]/70">
                  <ContentSdkText field={item.fields.Label} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaelumStatsBand;
