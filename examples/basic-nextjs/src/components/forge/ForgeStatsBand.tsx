import React, { JSX } from 'react';
import { Field, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type StatItem = {
  id: string;
  fields: {
    value?: Field<string>;
    label?: Field<string>;
  };
};

type ForgeStatsBandProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    stats?: StatItem[];
  };
};

const ForgeStatsBand = (props: ForgeStatsBandProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-stats-band bg-forge-amber py-16" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/60">ForgeStatsBand</span>
        </div>
      </section>
    );
  }

  const stats = props.fields.stats ?? [];

  return (
    <section className="forge-stats-band bg-forge-amber py-16" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        {props.fields.heading && (
          <h2 className="text-center text-forge-slate font-black text-2xl mb-12">
            <ContentSdkText field={props.fields.heading} />
          </h2>
        )}
        {stats.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                {stat.fields.value && (
                  <div className="text-4xl md:text-5xl font-black text-forge-slate mb-2">
                    <ContentSdkText field={stat.fields.value} />
                  </div>
                )}
                {stat.fields.label && (
                  <div className="text-forge-slate/70 text-sm font-medium uppercase tracking-wide">
                    <ContentSdkText field={stat.fields.label} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-forge-slate/50 text-sm">
            Add stat items to the datasource.
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeStatsBand;
