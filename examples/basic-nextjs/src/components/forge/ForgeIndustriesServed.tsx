import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type IndustryItem = {
  id: string;
  fields: {
    name?: Field<string>;
    description?: Field<string>;
    icon?: ImageField;
    link?: LinkField;
  };
};

type ForgeIndustriesServedProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    industries?: IndustryItem[];
  };
};

const ForgeIndustriesServed = (props: ForgeIndustriesServedProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-industries-served bg-white py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeIndustriesServed</span>
        </div>
      </section>
    );
  }

  const industries = props.fields.industries ?? [];

  return (
    <section className="forge-industries-served bg-white py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">Markets We Serve</p>
          {props.fields.heading && (
            <h2 className="text-3xl md:text-4xl font-black text-forge-slate mb-4">
              <ContentSdkText field={props.fields.heading} />
            </h2>
          )}
          {props.fields.subheading && (
            <div className="text-forge-slate/60 max-w-2xl mx-auto">
              <ContentSdkRichText field={props.fields.subheading} />
            </div>
          )}
        </div>
        {industries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div key={ind.id} className="flex gap-5 p-6 border border-forge-slate/10 rounded-sm hover:border-forge-amber hover:shadow-md transition-all group">
                {ind.fields.icon && (
                  <div className="flex-shrink-0">
                    <ContentSdkImage field={ind.fields.icon} className="w-8 h-8" />
                  </div>
                )}
                <div>
                  {ind.fields.name && (
                    <h3 className="font-bold text-forge-slate mb-1 group-hover:text-forge-amber transition-colors">
                      {ind.fields.link?.value?.href ? (
                        <ContentSdkLink field={ind.fields.link}>
                          <ContentSdkText field={ind.fields.name} />
                        </ContentSdkLink>
                      ) : (
                        <ContentSdkText field={ind.fields.name} />
                      )}
                    </h3>
                  )}
                  {ind.fields.description && (
                    <p className="text-forge-slate/60 text-sm leading-relaxed">
                      <ContentSdkText field={ind.fields.description} />
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-forge-slate/30 border border-dashed border-forge-slate/20 rounded-sm">
            <p className="text-sm">Add industry items to the datasource.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeIndustriesServed;
