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

type ForgeCtaBannerProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    primaryCTA?: LinkField;
    secondaryCTA?: LinkField;
    backgroundImage?: ImageField;
  };
};

const ForgeCtaBanner = (props: ForgeCtaBannerProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <section
      className="forge-cta-banner relative bg-forge-rust py-20 overflow-hidden"
      id={id ?? undefined}
    >
      {props.fields?.backgroundImage && (
        <div className="absolute inset-0">
          <ContentSdkImage
            field={props.fields.backgroundImage}
            className="w-full h-full object-cover mix-blend-multiply opacity-30"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-forge-rust to-forge-rust/80" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {props.fields?.heading ? (
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            <ContentSdkText field={props.fields.heading} />
          </h2>
        ) : (
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to Forge Your Next Component?
          </h2>
        )}
        {props.fields?.subheading ? (
          <div className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            <ContentSdkRichText field={props.fields.subheading} />
          </div>
        ) : (
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Upload your drawing and get a firm quote within 4 hours. No NDAs required for initial review.
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {props.fields?.primaryCTA?.value?.href && (
            <ContentSdkLink field={props.fields.primaryCTA} className="bg-white text-forge-rust font-bold px-8 py-4 rounded-sm hover:bg-forge-amber hover:text-forge-slate transition-colors" />
          )}
          {props.fields?.secondaryCTA?.value?.href && (
            <ContentSdkLink field={props.fields.secondaryCTA} className="border-2 border-white text-white font-bold px-8 py-4 rounded-sm hover:bg-white/10 transition-colors" />
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgeCtaBanner;
