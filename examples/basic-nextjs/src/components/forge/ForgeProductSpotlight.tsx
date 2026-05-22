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

type ForgeProductSpotlightProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    description?: Field<string>;
    image?: ImageField;
    specs?: Field<string>;
    cta?: LinkField;
  };
};

const ForgeProductSpotlight = (props: ForgeProductSpotlightProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <section className="forge-product-spotlight bg-white py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            {props.fields?.image ? (
              <ContentSdkImage field={props.fields.image} className="w-full rounded-sm shadow-xl" />
            ) : (
              <div className="w-full aspect-video bg-forge-steel/30 rounded-sm flex items-center justify-center">
                <span className="text-forge-slate/20 text-8xl">🔧</span>
              </div>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">Product Spotlight</p>
            {props.fields?.heading ? (
              <h2 className="text-3xl md:text-4xl font-black text-forge-slate mb-6">
                <ContentSdkText field={props.fields.heading} />
              </h2>
            ) : (
              <h2 className="text-3xl md:text-4xl font-black text-forge-slate mb-6">
                Heavy-Duty Spindle Assembly
              </h2>
            )}
            {props.fields?.description ? (
              <div className="text-forge-slate/70 leading-relaxed mb-6">
                <ContentSdkRichText field={props.fields.description} />
              </div>
            ) : (
              <p className="text-forge-slate/70 leading-relaxed mb-6">
                Engineered for high-load, high-temperature applications. Available in carbon steel, stainless, and titanium alloy variants with optional surface treatments.
              </p>
            )}
            {props.fields?.specs && (
              <div className="bg-forge-steel/20 rounded-sm p-6 mb-6 text-sm text-forge-slate/80 font-mono">
                <ContentSdkRichText field={props.fields.specs} />
              </div>
            )}
            {props.fields?.cta?.value?.href && (
              <ContentSdkLink field={props.fields.cta} className="forge-btn-primary" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgeProductSpotlight;
