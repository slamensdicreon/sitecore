import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Image as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type FeatureItem = {
  id: string;
  fields: {
    heading?: Field<string>;
    description?: Field<string>;
    icon?: ImageField;
  };
};

type ForgeFeatureGridProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    features?: FeatureItem[];
  };
};

const ForgeFeatureGrid = (props: ForgeFeatureGridProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-feature-grid bg-white py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeFeatureGrid</span>
        </div>
      </section>
    );
  }

  const features = props.fields.features ?? [];

  return (
    <section className="forge-feature-grid bg-white py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          {props.fields.heading && (
            <h2 className="text-3xl md:text-4xl font-black text-forge-slate mb-4">
              <ContentSdkText field={props.fields.heading} />
            </h2>
          )}
          {props.fields.subheading && (
            <div className="text-forge-slate/70 text-lg max-w-2xl mx-auto">
              <ContentSdkRichText field={props.fields.subheading} />
            </div>
          )}
        </div>
        {features.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.id}
                className="p-8 border border-forge-slate/10 rounded-sm hover:border-forge-amber hover:shadow-lg transition-all group"
              >
                {f.fields.icon && (
                  <div className="mb-4">
                    <ContentSdkImage field={f.fields.icon} className="h-8 w-8" />
                  </div>
                )}
                {f.fields.heading && (
                  <h3 className="text-forge-slate font-bold text-lg mb-2 group-hover:text-forge-amber transition-colors">
                    <ContentSdkText field={f.fields.heading} />
                  </h3>
                )}
                {f.fields.description && (
                  <p className="text-forge-slate/60 text-sm leading-relaxed">
                    <ContentSdkText field={f.fields.description} />
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-forge-slate/30 border border-dashed border-forge-slate/20 rounded-sm">
            <p className="text-sm">Add feature items to this component&apos;s datasource.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeFeatureGrid;
