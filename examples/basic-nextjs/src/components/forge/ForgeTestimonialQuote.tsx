import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  Image as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ForgeTestimonialQuoteProps = ComponentProps & {
  fields?: {
    quote?: Field<string>;
    authorName?: Field<string>;
    authorTitle?: Field<string>;
    authorImage?: ImageField;
    companyLogo?: ImageField;
  };
};

const ForgeTestimonialQuote = (props: ForgeTestimonialQuoteProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <section className="forge-testimonial-quote bg-forge-amber/10 py-20" id={id ?? undefined}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-forge-amber text-5xl mb-8 leading-none">&ldquo;</div>
        {props.fields?.quote ? (
          <blockquote className="text-2xl md:text-3xl font-light text-forge-slate leading-relaxed mb-10 italic">
            <ContentSdkRichText field={props.fields.quote} />
          </blockquote>
        ) : (
          <blockquote className="text-2xl md:text-3xl font-light text-forge-slate leading-relaxed mb-10 italic">
            Forge Industrial delivered 40,000 precision components on time, on spec, and on budget. Their quality team caught a dimensional drift we didn&apos;t even flag — that level of proactivity is rare.
          </blockquote>
        )}
        <div className="flex items-center justify-center gap-4">
          {props.fields?.authorImage && (
            <ContentSdkImage
              field={props.fields.authorImage}
              className="w-14 h-14 rounded-full object-cover border-2 border-forge-amber"
            />
          )}
          <div className="text-left">
            {props.fields?.authorName ? (
              <div className="font-bold text-forge-slate">
                <ContentSdkText field={props.fields.authorName} />
              </div>
            ) : (
              <div className="font-bold text-forge-slate">Sarah Chen</div>
            )}
            {props.fields?.authorTitle ? (
              <div className="text-forge-slate/60 text-sm">
                <ContentSdkText field={props.fields.authorTitle} />
              </div>
            ) : (
              <div className="text-forge-slate/60 text-sm">VP Supply Chain, Apex Aerospace</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgeTestimonialQuote;
