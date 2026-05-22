import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  Image as ContentSdkImage,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type LogoItem = {
  id: string;
  fields: {
    logo?: ImageField;
    altText?: Field<string>;
    name?: Field<string>;
  };
};

type ForgeLogoCloudProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    logos?: LogoItem[];
  };
};

const ForgeLogoCloud = (props: ForgeLogoCloudProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-logo-cloud bg-white border-y border-gray-100 py-16" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeLogoCloud</span>
        </div>
      </section>
    );
  }

  const logos = props.fields.logos ?? [];

  return (
    <section className="forge-logo-cloud bg-white border-y border-gray-100 py-16" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          {props.fields.heading ? (
            <p className="text-forge-slate/50 text-sm font-medium uppercase tracking-widest">
              <ContentSdkText field={props.fields.heading} />
            </p>
          ) : null}
        </div>
        {logos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
            {logos.map((item) => (
              <div key={item.id} className="flex items-center justify-center h-12 px-4">
                {item.fields.logo ? (
                  <ContentSdkImage
                    field={item.fields.logo}
                    className="max-h-8 w-auto opacity-50 hover:opacity-100 transition-opacity"
                  />
                ) : item.fields.name ? (
                  <span className="text-xs font-bold text-forge-slate/40 tracking-tight">
                    <ContentSdkText field={item.fields.name} />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-forge-slate/30 text-sm">
            Add logo items to the datasource.
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeLogoCloud;
