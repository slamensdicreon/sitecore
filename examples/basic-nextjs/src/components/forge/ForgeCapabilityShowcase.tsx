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

type CapabilityItem = {
  id: string;
  fields: {
    text?: Field<string>;
  };
};

type ForgeCapabilityShowcaseProps = ComponentProps & {
  fields?: {
    sectionLabel?: Field<string>;
    heading?: Field<string>;
    description?: Field<string>;
    image?: ImageField;
    cta?: LinkField;
    capabilities?: CapabilityItem[];
  };
};

const ForgeCapabilityShowcase = (props: ForgeCapabilityShowcaseProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-capability-showcase bg-forge-steel py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-white/40">ForgeCapabilityShowcase</span>
        </div>
      </section>
    );
  }

  const capabilities = props.fields.capabilities ?? [];

  return (
    <section className="forge-capability-showcase bg-forge-steel py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {props.fields.sectionLabel ? (
              <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">
                <ContentSdkText field={props.fields.sectionLabel} />
              </p>
            ) : null}
            {props.fields.heading && (
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                <ContentSdkText field={props.fields.heading} />
              </h2>
            )}
            {props.fields.description && (
              <div className="text-white/70 text-base leading-relaxed mb-8">
                <ContentSdkRichText field={props.fields.description} />
              </div>
            )}
            {capabilities.length > 0 && (
              <ul className="space-y-3 mb-8">
                {capabilities.map((cap) => (
                  <li key={cap.id} className="flex items-center gap-3 text-white/80">
                    <span className="w-5 h-5 rounded-full bg-forge-amber flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-forge-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {cap.fields.text ? (
                      <ContentSdkText field={cap.fields.text} />
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            {props.fields.cta?.value?.href ? (
              <ContentSdkLink field={props.fields.cta} className="forge-btn-primary" />
            ) : null}
          </div>
          <div className="relative">
            {props.fields.image ? (
              <ContentSdkImage field={props.fields.image} className="w-full rounded-sm shadow-2xl" />
            ) : (
              <div className="w-full aspect-square bg-forge-slate/50 rounded-sm flex items-center justify-center">
                <span className="is-empty-hint text-white/20 text-sm">Add image to datasource</span>
              </div>
            )}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-4 border-b-4 border-forge-amber" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-r-4 border-t-4 border-forge-amber" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgeCapabilityShowcase;
