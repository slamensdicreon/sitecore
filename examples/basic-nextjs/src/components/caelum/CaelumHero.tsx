import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type CaelumHeroProps = ComponentProps & {
  fields: {
    Eyebrow?: Field<string>;
    Title?: Field<string>;
    Subtitle?: Field<string>;
    Body?: Field<string>;
    BackgroundImage?: ImageField;
    PrimaryCtaText?: Field<string>;
    PrimaryCtaLink?: LinkField;
    SecondaryCtaText?: Field<string>;
    SecondaryCtaLink?: LinkField;
  };
};

const CaelumHero = (props: CaelumHeroProps): JSX.Element => {
  const f = props.fields || ({} as CaelumHeroProps['fields']);
  const variant = props.params?.styles?.includes('compact') ? 'compact' : 'full';

  return (
    <section
      className={`relative isolate overflow-hidden bg-[#0B3A40] text-[#FAF7F2] ${
        variant === 'compact' ? 'min-h-[60vh]' : 'min-h-[88vh]'
      }`}
    >
      {f.BackgroundImage?.value?.src ? (
        <div className="absolute inset-0 -z-10">
          <ContentSdkImage
            field={f.BackgroundImage}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B3A40]/40 via-[#0B3A40]/60 to-[#0B3A40]/95" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0B3A40] via-[#114b52] to-[#0B3A40]" />
      )}
      <div
        className={`mx-auto flex max-w-5xl flex-col items-start px-6 lg:px-10 ${
          variant === 'compact' ? 'py-24' : 'py-36 lg:py-48'
        }`}
      >
        {f.Eyebrow?.value ? (
          <span className="mb-6 text-xs uppercase tracking-[0.32em] text-[#E8DDD0]">
            <ContentSdkText field={f.Eyebrow} />
          </span>
        ) : null}
        <h1
          className={`font-serif font-light leading-[1.05] text-[#FAF7F2] ${
            variant === 'compact'
              ? 'text-4xl md:text-5xl'
              : 'text-5xl md:text-7xl lg:text-[5.5rem]'
          }`}
        >
          {f.Title?.value ? <ContentSdkText field={f.Title} /> : 'A pool, perfected.'}
        </h1>
        {f.Subtitle?.value ? (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#FAF7F2]/85 md:text-xl">
            <ContentSdkText field={f.Subtitle} />
          </p>
        ) : null}
        {f.Body?.value ? (
          <div className="prose prose-invert mt-6 max-w-2xl text-[#FAF7F2]/80">
            <ContentSdkRichText field={f.Body} />
          </div>
        ) : null}
        {(f.PrimaryCtaLink?.value?.href || f.SecondaryCtaLink?.value?.href) && (
          <div className="mt-12 flex flex-wrap items-center gap-5">
            {f.PrimaryCtaLink?.value?.href ? (
              <ContentSdkLink
                field={f.PrimaryCtaLink}
                className="inline-flex items-center rounded-full bg-[#E8DDD0] px-8 py-3.5 text-xs uppercase tracking-[0.18em] text-[#0B3A40] transition hover:bg-[#FAF7F2]"
              >
                {f.PrimaryCtaText?.value || f.PrimaryCtaLink.value.text || 'Begin your project'}
              </ContentSdkLink>
            ) : null}
            {f.SecondaryCtaLink?.value?.href ? (
              <ContentSdkLink
                field={f.SecondaryCtaLink}
                className="inline-flex items-center border-b border-[#E8DDD0]/60 pb-1 text-xs uppercase tracking-[0.18em] text-[#E8DDD0] transition hover:border-[#E8DDD0]"
              >
                {f.SecondaryCtaText?.value || f.SecondaryCtaLink.value.text || 'View our work'}
              </ContentSdkLink>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaelumHero;
