import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ForgeHeroVideoProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    videoUrl?: Field<string>;
    posterImage?: ImageField;
    primaryCTA?: LinkField;
  };
};

const ForgeHeroVideo = (props: ForgeHeroVideoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <section
      className="forge-hero-video relative min-h-[600px] flex items-center overflow-hidden bg-forge-slate-dark"
      id={id ?? undefined}
    >
      {props.fields?.posterImage && (
        <div className="absolute inset-0 z-0">
          <ContentSdkImage
            field={props.fields.posterImage}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-forge-slate-dark/60 to-forge-slate-dark z-[1]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center w-full">
        {props.fields?.subheading && (
          <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-4">
            <ContentSdkText field={props.fields.subheading} />
          </p>
        )}
        {props.fields?.heading ? (
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            <ContentSdkText field={props.fields.heading} />
          </h2>
        ) : (
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Built to <span className="text-forge-amber">Endure</span>
          </h2>
        )}
        <div className="flex flex-col items-center gap-6">
          <button className="w-20 h-20 rounded-full bg-forge-amber flex items-center justify-center hover:bg-forge-amber/80 transition-colors shadow-2xl">
            <svg className="w-8 h-8 text-forge-slate ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          {props.fields?.primaryCTA?.value?.href && (
            <ContentSdkLink field={props.fields.primaryCTA} className="forge-btn-outline mt-4" />
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgeHeroVideo;
