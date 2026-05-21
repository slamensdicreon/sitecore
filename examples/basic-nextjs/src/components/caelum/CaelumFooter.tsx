import React, { JSX } from 'react';
import {
  Field,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type FooterLink = { fields: { Title?: Field<string>; Link?: LinkField } };

type CaelumFooterProps = ComponentProps & {
  fields: {
    BrandName?: Field<string>;
    Tagline?: Field<string>;
    Address?: Field<string>;
    Email?: Field<string>;
    Phone?: Field<string>;
    Links?: FooterLink[];
    Copyright?: Field<string>;
  };
};

const CaelumFooter = (props: CaelumFooterProps): JSX.Element => {
  const f = props.fields || ({} as CaelumFooterProps['fields']);
  const links = Array.isArray(f.Links) ? f.Links : [];

  return (
    <footer className="bg-[#0B3A40] text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-serif text-2xl tracking-[0.18em]">
              {f.BrandName?.value ? <ContentSdkText field={f.BrandName} /> : 'CAELUM'}
            </div>
            {f.Tagline?.value ? (
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#FAF7F2]/70">
                <ContentSdkText field={f.Tagline} />
              </p>
            ) : null}
          </div>
          <div className="space-y-3 text-sm text-[#FAF7F2]/80">
            <div className="text-xs uppercase tracking-[0.24em] text-[#E8DDD0]">Atelier</div>
            {f.Address?.value ? (
              <div className="whitespace-pre-line">
                <ContentSdkText field={f.Address} />
              </div>
            ) : null}
            {f.Email?.value ? (
              <div>
                <ContentSdkText field={f.Email} />
              </div>
            ) : null}
            {f.Phone?.value ? (
              <div>
                <ContentSdkText field={f.Phone} />
              </div>
            ) : null}
          </div>
          <div className="space-y-3 text-sm">
            <div className="text-xs uppercase tracking-[0.24em] text-[#E8DDD0]">Navigate</div>
            {links.map((item, i) => (
              <div key={i}>
                <ContentSdkLink
                  field={item.fields?.Link as LinkField}
                  className="text-[#FAF7F2]/80 transition hover:text-[#FAF7F2]"
                >
                  {item.fields?.Title?.value || item.fields?.Link?.value?.text || 'Link'}
                </ContentSdkLink>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 border-t border-[#FAF7F2]/10 pt-8 text-xs uppercase tracking-[0.24em] text-[#FAF7F2]/50">
          {f.Copyright?.value ? (
            <ContentSdkText field={f.Copyright} />
          ) : (
            `© ${new Date().getFullYear()} Caelum. All rights reserved.`
          )}
        </div>
      </div>
    </footer>
  );
};

export default CaelumFooter;
