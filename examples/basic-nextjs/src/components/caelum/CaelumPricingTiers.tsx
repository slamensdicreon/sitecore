import React, { JSX } from 'react';
import {
  Field,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Tier = {
  fields: {
    Name?: Field<string>;
    Price?: Field<string>;
    Cadence?: Field<string>;
    Description?: Field<string>;
    Features?: Field<string>;
    CtaText?: Field<string>;
    CtaLink?: LinkField;
    Featured?: Field<boolean>;
  };
};

type CaelumPricingTiersProps = ComponentProps & {
  fields: {
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Intro?: Field<string>;
    Items?: Tier[];
  };
};

const CaelumPricingTiers = (props: CaelumPricingTiersProps): JSX.Element => {
  const f = props.fields || ({} as CaelumPricingTiersProps['fields']);
  const tiers = Array.isArray(f.Items) ? f.Items : [];

  return (
    <section className="bg-[#FAF7F2] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
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
            <p className="mt-6 text-lg leading-relaxed text-[#0B3A40]/70">
              <ContentSdkText field={f.Intro} />
            </p>
          ) : null}
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const ft = tier.fields || {};
            const featured = !!ft.Featured?.value;
            const featureList = (ft.Features?.value || '')
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean);
            return (
              <div
                key={i}
                className={`flex flex-col rounded-sm border p-10 ${
                  featured
                    ? 'border-[#0B3A40] bg-[#0B3A40] text-[#FAF7F2] shadow-2xl shadow-[#0B3A40]/20 lg:-translate-y-4 lg:scale-105'
                    : 'border-[#E8DDD0] bg-white text-[#0B3A40]'
                }`}
              >
                {ft.Name?.value ? (
                  <h3
                    className={`text-xs uppercase tracking-[0.32em] ${
                      featured ? 'text-[#E8DDD0]' : 'text-[#0B3A40]/60'
                    }`}
                  >
                    <ContentSdkText field={ft.Name} />
                  </h3>
                ) : null}
                <div className="mt-6 flex items-baseline gap-2">
                  {ft.Price?.value ? (
                    <span className="font-serif text-5xl font-light">
                      <ContentSdkText field={ft.Price} />
                    </span>
                  ) : null}
                  {ft.Cadence?.value ? (
                    <span className={`text-sm ${featured ? 'text-[#E8DDD0]/80' : 'text-[#0B3A40]/60'}`}>
                      <ContentSdkText field={ft.Cadence} />
                    </span>
                  ) : null}
                </div>
                {ft.Description?.value ? (
                  <div className={`prose mt-6 max-w-none ${featured ? 'text-[#FAF7F2]/85' : 'text-[#0B3A40]/70'}`}>
                    <ContentSdkRichText field={ft.Description} />
                  </div>
                ) : null}
                {featureList.length > 0 ? (
                  <ul className="mt-8 space-y-3">
                    {featureList.map((line, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className={featured ? 'text-[#E8DDD0]' : 'text-[#0B3A40]/70'}>—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {ft.CtaLink?.value?.href ? (
                  <ContentSdkLink
                    field={ft.CtaLink}
                    className={`mt-10 inline-flex items-center justify-center rounded-full px-8 py-3 text-xs uppercase tracking-[0.18em] transition ${
                      featured
                        ? 'bg-[#E8DDD0] text-[#0B3A40] hover:bg-[#FAF7F2]'
                        : 'border border-[#0B3A40] text-[#0B3A40] hover:bg-[#0B3A40] hover:text-[#FAF7F2]'
                    }`}
                  >
                    {ft.CtaText?.value || ft.CtaLink.value.text || 'Enquire'}
                  </ContentSdkLink>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaelumPricingTiers;
