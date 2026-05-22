import React, { JSX } from 'react';
import {
  Field,
  LinkField,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ResourceItem = {
  id: string;
  fields: {
    type?: Field<string>;
    title?: Field<string>;
    date?: Field<string>;
    link?: LinkField;
  };
};

type ForgeResourceListingProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    description?: Field<string>;
    resources?: ResourceItem[];
    cta?: LinkField;
  };
};

const ForgeResourceListing = (props: ForgeResourceListingProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-resource-listing bg-forge-steel/10 py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeResourceListing</span>
        </div>
      </section>
    );
  }

  const resources = props.fields.resources ?? [];

  return (
    <section className="forge-resource-listing bg-forge-steel/10 py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">Knowledge Center</p>
            {props.fields.heading && (
              <h2 className="text-3xl md:text-4xl font-black text-forge-slate">
                <ContentSdkText field={props.fields.heading} />
              </h2>
            )}
            {props.fields.description && (
              <div className="text-forge-slate/60 mt-2">
                <ContentSdkRichText field={props.fields.description} />
              </div>
            )}
          </div>
          {props.fields.cta?.value?.href && (
            <ContentSdkLink field={props.fields.cta} className="hidden md:block forge-btn-outline-dark text-sm" />
          )}
        </div>
        {resources.length > 0 ? (
          <div className="divide-y divide-forge-slate/10">
            {resources.map((res) => (
              <div key={res.id} className="py-6 flex items-start justify-between gap-6 group -mx-4 px-4 hover:bg-white/60 transition-colors rounded-sm cursor-pointer">
                <div className="flex items-start gap-4">
                  {res.fields.type && (
                    <span className="flex-shrink-0 mt-1 inline-block px-2 py-0.5 bg-forge-amber/10 text-forge-amber text-xs font-bold uppercase rounded">
                      <ContentSdkText field={res.fields.type} />
                    </span>
                  )}
                  <div>
                    {res.fields.title && (
                      <h3 className="font-bold text-forge-slate group-hover:text-forge-amber transition-colors">
                        {res.fields.link?.value?.href ? (
                          <ContentSdkLink field={res.fields.link}>
                            <ContentSdkText field={res.fields.title} />
                          </ContentSdkLink>
                        ) : (
                          <ContentSdkText field={res.fields.title} />
                        )}
                      </h3>
                    )}
                    {res.fields.date && (
                      <p className="text-forge-slate/40 text-xs mt-1">
                        <ContentSdkText field={res.fields.date} />
                      </p>
                    )}
                  </div>
                </div>
                <svg className="flex-shrink-0 mt-1 w-4 h-4 text-forge-slate/30 group-hover:text-forge-amber transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-forge-slate/30 border border-dashed border-forge-slate/20 rounded-sm">
            <p className="text-sm">Add resource items to the datasource.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeResourceListing;
