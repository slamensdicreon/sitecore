import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  Image as ContentSdkImage,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ForgePageHeaderProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    backgroundImage?: ImageField;
    breadcrumb?: Field<boolean>;
  };
};

const ForgePageHeader = (props: ForgePageHeaderProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <section
      className="forge-page-header relative bg-forge-slate py-20 overflow-hidden"
      id={id ?? undefined}
    >
      {props.fields?.backgroundImage && (
        <div className="absolute inset-0">
          <ContentSdkImage
            field={props.fields.backgroundImage}
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-forge-slate/60" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
          <span className="hover:text-forge-amber transition-colors cursor-pointer">Home</span>
          <span>/</span>
          {props.fields?.heading && (
            <span className="text-forge-amber">
              <ContentSdkText field={props.fields.heading} />
            </span>
          )}
        </div>
        {props.fields?.heading ? (
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <ContentSdkText field={props.fields.heading} />
          </h1>
        ) : (
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Page Title</h1>
        )}
        {props.fields?.subheading && (
          <p className="text-white/70 text-lg max-w-2xl">
            <ContentSdkText field={props.fields.subheading} />
          </p>
        )}
        <div className="mt-6 w-16 h-1 bg-forge-amber" />
      </div>
    </section>
  );
};

export default ForgePageHeader;
