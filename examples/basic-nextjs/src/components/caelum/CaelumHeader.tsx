import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type NavLink = { fields: { Title?: Field<string>; Link?: LinkField } };

type CaelumHeaderProps = ComponentProps & {
  fields: {
    Logo?: ImageField;
    BrandName?: Field<string>;
    HomeLink?: LinkField;
    CtaText?: Field<string>;
    CtaLink?: LinkField;
    NavLinks?: NavLink[];
  };
};

const CaelumHeader = (props: CaelumHeaderProps): JSX.Element => {
  const f = props.fields || ({} as CaelumHeaderProps['fields']);
  const nav = Array.isArray(f.NavLinks) ? f.NavLinks : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8DDD0]/60 bg-[#FAF7F2]/90 backdrop-blur supports-[backdrop-filter]:bg-[#FAF7F2]/75">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href={f.HomeLink?.value?.href || '/'} className="flex items-center gap-3">
          {f.Logo?.value?.src ? (
            <ContentSdkImage field={f.Logo} className="h-9 w-auto" />
          ) : null}
          <span className="font-serif text-2xl tracking-[0.18em] text-[#0B3A40]">
            {f.BrandName?.value ? <ContentSdkText field={f.BrandName} /> : 'CAELUM'}
          </span>
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item, i) => (
            <ContentSdkLink
              key={i}
              field={item.fields?.Link as LinkField}
              className="text-sm uppercase tracking-[0.14em] text-[#0B3A40]/80 transition hover:text-[#0B3A40]"
            >
              {item.fields?.Title?.value || item.fields?.Link?.value?.text || 'Link'}
            </ContentSdkLink>
          ))}
        </nav>
        {f.CtaLink?.value?.href ? (
          <ContentSdkLink
            field={f.CtaLink}
            className="inline-flex items-center rounded-full border border-[#0B3A40] bg-[#0B3A40] px-6 py-2.5 text-xs uppercase tracking-[0.16em] text-[#FAF7F2] transition hover:bg-[#0B3A40]/90"
          >
            {f.CtaText?.value || f.CtaLink.value.text || 'Begin'}
          </ContentSdkLink>
        ) : (
          <span className="text-xs uppercase tracking-[0.16em] text-[#0B3A40]/40">Begin</span>
        )}
      </div>
    </header>
  );
};

export default CaelumHeader;
