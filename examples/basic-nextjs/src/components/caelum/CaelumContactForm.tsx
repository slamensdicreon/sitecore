'use client';

import React, { JSX, useState } from 'react';
import {
  Field,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type CaelumContactFormProps = ComponentProps & {
  fields: {
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Intro?: Field<string>;
    SubmitText?: Field<string>;
    SuccessMessage?: Field<string>;
  };
};

const CaelumContactForm = (props: CaelumContactFormProps): JSX.Element => {
  const f = props.fields || ({} as CaelumContactFormProps['fields']);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#FAF7F2] py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          {f.Eyebrow?.value ? (
            <span className="mb-5 block text-xs uppercase tracking-[0.32em] text-[#0B3A40]/60">
              <ContentSdkText field={f.Eyebrow} />
            </span>
          ) : null}
          {f.Title?.value ? (
            <h2 className="font-serif text-4xl font-light leading-[1.1] text-[#0B3A40] md:text-5xl">
              <ContentSdkText field={f.Title} />
            </h2>
          ) : null}
          {f.Intro?.value ? (
            <div className="prose prose-lg mt-8 max-w-none text-[#0B3A40]/75">
              <ContentSdkRichText field={f.Intro} />
            </div>
          ) : null}
        </div>
        <div className="rounded-sm border border-[#E8DDD0] bg-white p-10">
          {submitted ? (
            <div className="flex h-full flex-col items-start justify-center">
              <span className="text-xs uppercase tracking-[0.32em] text-[#0B3A40]/60">
                Thank you
              </span>
              <p className="mt-4 font-serif text-2xl text-[#0B3A40]">
                {f.SuccessMessage?.value ||
                  'We have received your enquiry and will be in touch shortly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="block text-xs uppercase tracking-[0.18em] text-[#0B3A40]/70">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    className="mt-2 w-full border-0 border-b border-[#0B3A40]/20 bg-transparent py-2 text-[#0B3A40] placeholder-[#0B3A40]/30 focus:border-[#0B3A40] focus:outline-none focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs uppercase tracking-[0.18em] text-[#0B3A40]/70">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    className="mt-2 w-full border-0 border-b border-[#0B3A40]/20 bg-transparent py-2 text-[#0B3A40] placeholder-[#0B3A40]/30 focus:border-[#0B3A40] focus:outline-none focus:ring-0"
                  />
                </label>
              </div>
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.18em] text-[#0B3A40]/70">
                  Phone (optional)
                </span>
                <input
                  type="tel"
                  className="mt-2 w-full border-0 border-b border-[#0B3A40]/20 bg-transparent py-2 text-[#0B3A40] placeholder-[#0B3A40]/30 focus:border-[#0B3A40] focus:outline-none focus:ring-0"
                />
              </label>
              <label className="block">
                <span className="block text-xs uppercase tracking-[0.18em] text-[#0B3A40]/70">
                  Tell us about your vision
                </span>
                <textarea
                  rows={5}
                  required
                  className="mt-2 w-full border-0 border-b border-[#0B3A40]/20 bg-transparent py-2 text-[#0B3A40] placeholder-[#0B3A40]/30 focus:border-[#0B3A40] focus:outline-none focus:ring-0"
                />
              </label>
              <button
                type="submit"
                className="mt-4 inline-flex items-center rounded-full bg-[#0B3A40] px-8 py-3.5 text-xs uppercase tracking-[0.18em] text-[#FAF7F2] transition hover:bg-[#0B3A40]/90"
              >
                {f.SubmitText?.value || 'Send enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaelumContactForm;
