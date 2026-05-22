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

type ForgeHeroIndustrialProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    description?: Field<string>;
    image?: ImageField;
    primaryCTA?: LinkField;
    secondaryCTA?: LinkField;
  };
};

const ForgeHeroIndustrial = (props: ForgeHeroIndustrialProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <section
      className="forge-hero-industrial relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-forge-slate"
      id={id ?? undefined}
    >
      {props.fields?.image && (
        <div className="absolute inset-0 z-0">
          <ContentSdkImage
            field={props.fields.image}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forge-slate via-forge-slate/80 to-transparent" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">
          {props.fields?.subheading && (
            <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-4">
              <ContentSdkText field={props.fields.subheading} />
            </p>
          )}
          {props.fields?.heading && (
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              <ContentSdkText field={props.fields.heading} />
            </h1>
          )}
          {props.fields?.description && (
            <div className="text-white/70 text-lg leading-relaxed mb-8">
              <ContentSdkRichText field={props.fields.description} />
            </div>
          )}
          {(props.fields?.primaryCTA?.value?.href || props.fields?.secondaryCTA?.value?.href) && (
            <div className="flex flex-wrap gap-4">
              {props.fields?.primaryCTA?.value?.href && (
                <ContentSdkLink field={props.fields.primaryCTA} className="forge-btn-primary" />
              )}
              {props.fields?.secondaryCTA?.value?.href && (
                <ContentSdkLink field={props.fields.secondaryCTA} className="forge-btn-outline" />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forge-amber via-forge-rust to-forge-amber opacity-60" />
    </section>
  );
};

export default ForgeHeroIndustrial;
