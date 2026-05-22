'use client';
import React, { JSX, useState } from 'react';
import { Field, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type FaqItem = {
  id: string;
  fields: {
    question?: Field<string>;
    answer?: Field<string>;
  };
};

type ForgeFaqAccordionProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    items?: FaqItem[];
  };
};

const ForgeFaqAccordion = (props: ForgeFaqAccordionProps): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-faq-accordion bg-white py-20" id={id ?? undefined}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeFaqAccordion</span>
        </div>
      </section>
    );
  }

  const items = props.fields.items ?? [];

  return (
    <section className="forge-faq-accordion bg-white py-20" id={id ?? undefined}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
          {props.fields.heading && (
            <h2 className="text-3xl md:text-4xl font-black text-forge-slate">
              <ContentSdkText field={props.fields.heading} />
            </h2>
          )}
          {props.fields.subheading && (
            <p className="text-forge-slate/60 mt-3">
              <ContentSdkText field={props.fields.subheading} />
            </p>
          )}
        </div>
        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map((faq, i) => (
              <div key={faq.id} className="border border-forge-slate/10 rounded-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-forge-steel/10 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-bold text-forge-slate pr-6">
                    {faq.fields.question ? (
                      <ContentSdkText field={faq.fields.question} />
                    ) : null}
                  </span>
                  <svg
                    className={`flex-shrink-0 w-5 h-5 text-forge-amber transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6 text-forge-slate/70 text-sm leading-relaxed border-t border-forge-slate/10">
                    <div className="pt-4">
                      {faq.fields.answer ? (
                        <ContentSdkText field={faq.fields.answer} />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-forge-slate/30 border border-dashed border-forge-slate/20 rounded-sm">
            <p className="text-sm">Add FAQ items to the datasource.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeFaqAccordion;
