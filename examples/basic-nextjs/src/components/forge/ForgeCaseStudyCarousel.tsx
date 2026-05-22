import React, { JSX } from 'react';
import {
  Field,
  LinkField,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type CaseStudyItem = {
  id: string;
  fields: {
    industry?: Field<string>;
    title?: Field<string>;
    client?: Field<string>;
    outcome?: Field<string>;
    link?: LinkField;
  };
};

type ForgeCaseStudyCarouselProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    caseStudies?: CaseStudyItem[];
  };
};

const ForgeCaseStudyCarousel = (props: ForgeCaseStudyCarouselProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-case-study-carousel bg-forge-slate py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-white/40">ForgeCaseStudyCarousel</span>
        </div>
      </section>
    );
  }

  const caseStudies = props.fields.caseStudies ?? [];

  return (
    <section className="forge-case-study-carousel bg-forge-slate py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">Success Stories</p>
            {props.fields.heading && (
              <h2 className="text-3xl md:text-4xl font-black text-white">
                <ContentSdkText field={props.fields.heading} />
              </h2>
            )}
            {props.fields.subheading && (
              <div className="text-white/70 mt-2">
                <ContentSdkRichText field={props.fields.subheading} />
              </div>
            )}
          </div>
          
        </div>
        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="bg-forge-slate-dark/60 border border-white/10 rounded-sm p-8 hover:border-forge-amber transition-all group cursor-pointer">
                {cs.fields.industry && (
                  <div className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-4">
                    <ContentSdkText field={cs.fields.industry} />
                  </div>
                )}
                {cs.fields.title && (
                  <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-forge-amber transition-colors">
                    {cs.fields.link?.value?.href ? (
                      <ContentSdkLink field={cs.fields.link}>
                        <ContentSdkText field={cs.fields.title} />
                      </ContentSdkLink>
                    ) : (
                      <ContentSdkText field={cs.fields.title} />
                    )}
                  </h3>
                )}
                {cs.fields.client && (
                  <p className="text-white/50 text-xs mb-4 font-medium">
                    <ContentSdkText field={cs.fields.client} />
                  </p>
                )}
                {cs.fields.outcome && (
                  <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4">
                    <ContentSdkText field={cs.fields.outcome} />
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/30 border border-dashed border-white/20 rounded-sm">
            <p className="text-sm">Add case study items to the datasource.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeCaseStudyCarousel;
