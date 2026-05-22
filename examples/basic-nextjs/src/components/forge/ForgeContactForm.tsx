'use client';
import React, { JSX, useState } from 'react';
import {
  Field,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ForgeContactFormProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    contactAddress?: Field<string>;
    contactPhone?: Field<string>;
    contactEmail?: Field<string>;
    contactHours?: Field<string>;
    formNote?: Field<string>;
    submitButtonText?: Field<string>;
    successHeading?: Field<string>;
    successMessage?: Field<string>;
  };
};

const ForgeContactForm = (props: ForgeContactFormProps): JSX.Element => {
  const [submitted, setSubmitted] = useState(false);
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-contact-form bg-forge-steel/10 py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeContactForm</span>
        </div>
      </section>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const hasContactInfo =
    props.fields.contactAddress?.value ||
    props.fields.contactPhone?.value ||
    props.fields.contactEmail?.value ||
    props.fields.contactHours?.value;

  return (
    <section className="forge-contact-form bg-forge-steel/10 py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            {props.fields.heading && (
              <h2 className="text-3xl md:text-4xl font-black text-forge-slate mb-6">
                <ContentSdkText field={props.fields.heading} />
              </h2>
            )}
            {props.fields.subheading && (
              <div className="text-forge-slate/70 leading-relaxed mb-8">
                <ContentSdkRichText field={props.fields.subheading} />
              </div>
            )}
            {hasContactInfo && (
              <div className="space-y-3">
                {props.fields.contactAddress?.value && (
                  <div className="flex items-center gap-3 text-forge-slate/70 text-sm">
                    <span className="text-forge-amber text-base">📍</span>
                    <ContentSdkText field={props.fields.contactAddress} />
                  </div>
                )}
                {props.fields.contactPhone?.value && (
                  <div className="flex items-center gap-3 text-forge-slate/70 text-sm">
                    <span className="text-forge-amber text-base">📞</span>
                    <ContentSdkText field={props.fields.contactPhone} />
                  </div>
                )}
                {props.fields.contactEmail?.value && (
                  <div className="flex items-center gap-3 text-forge-slate/70 text-sm">
                    <span className="text-forge-amber text-base">✉️</span>
                    <ContentSdkText field={props.fields.contactEmail} />
                  </div>
                )}
                {props.fields.contactHours?.value && (
                  <div className="flex items-center gap-3 text-forge-slate/70 text-sm">
                    <span className="text-forge-amber text-base">⏰</span>
                    <ContentSdkText field={props.fields.contactHours} />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="bg-white rounded-sm shadow-lg p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-forge-amber/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-forge-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forge-slate mb-2">
                  {props.fields.successHeading ? (
                    <ContentSdkText field={props.fields.successHeading} />
                  ) : 'RFQ Received'}
                </h3>
                {props.fields.successMessage ? (
                  <div className="text-forge-slate/60 text-sm">
                    <ContentSdkRichText field={props.fields.successMessage} />
                  </div>
                ) : null}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-forge-slate/60 uppercase tracking-wide mb-1">First Name</label>
                    <input type="text" className="forge-input" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-forge-slate/60 uppercase tracking-wide mb-1">Last Name</label>
                    <input type="text" className="forge-input" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-forge-slate/60 uppercase tracking-wide mb-1">Company</label>
                  <input type="text" className="forge-input" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-forge-slate/60 uppercase tracking-wide mb-1">Business Email</label>
                  <input type="email" className="forge-input" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-forge-slate/60 uppercase tracking-wide mb-1">Industry / Sector</label>
                  <input type="text" className="forge-input" placeholder="e.g. Aerospace, Automotive, Energy" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-forge-slate/60 uppercase tracking-wide mb-1">Project Description</label>
                  <textarea className="forge-input min-h-[100px]" placeholder="Describe your part, material, quantity, and timeline…" />
                </div>
                {props.fields.formNote && (
                  <div className="text-forge-slate/50 text-xs">
                    <ContentSdkRichText field={props.fields.formNote} />
                  </div>
                )}
                <button type="submit" className="w-full forge-btn-primary">
                  {props.fields.submitButtonText ? (
                    <ContentSdkText field={props.fields.submitButtonText} />
                  ) : 'Submit RFQ'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgeContactForm;
