'use client';

// Sitecore-aware variant of the Caelum pool Hero.
//
// Renders the same visual hero as the legacy `Hero.tsx` (used by the
// standalone `src/app/(pool)/` routes) but reads every editable value from
// Sitecore `Field` / `ImageField` / `LinkField` props and emits inline-
// editing wrappers via `<Text>`, `<RichText>`, `<Image>`, `<Link>`.
//
// Picked up by the Sitecore component map once `src/components/pool/*` is
// removed from the `exclude` list in `sitecore.cli.config.ts`. While that
// exclude is in place, this file is a draft reference component — the
// canonical entry point for the standalone site is still `Hero.tsx`.

import { Text, Image, Link } from '@sitecore-content-sdk/nextjs';
import type { PoolHeroProps } from './Hero.props';

export const Default: React.FC<PoolHeroProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;

  const fullViewport = fields.fullViewport?.value !== false;

  return (
    <section
      data-component="PoolHero"
      className={`relative ${fullViewport ? 'min-h-screen' : 'min-h-[78vh]'} flex items-end overflow-hidden`}
    >
      <div className="absolute inset-0">
        <Image
          field={fields.image}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.05) contrast(1.05)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,12,0.55) 0%, rgba(5,8,12,0.15) 30%, rgba(5,8,12,0.55) 70%, rgba(5,8,12,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0 shimmer"
          style={{
            background:
              'radial-gradient(circle at 75% 35%, rgba(103,232,249,0.18), transparent 55%)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5,8,12,0.6), transparent 60%)',
          }}
        />
      </div>

      <div className="container-luxe relative pt-40 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <Text tag="div" field={fields.eyebrow} className="eyebrow mb-6 reveal" />
          <Text
            tag="h1"
            field={fields.title}
            className="reveal reveal-delay-1 leading-[1.02]"
          />
          <Text
            tag="p"
            field={fields.subtitle}
            className="reveal reveal-delay-2 mt-8 max-w-xl text-lg md:text-xl leading-relaxed"
            style={{ color: 'var(--c-text-dim)' }}
          />
          <div className="reveal reveal-delay-3 mt-12 flex flex-wrap items-center gap-4">
            <Link field={fields.primaryCta} className="btn btn-primary" />
            <Link field={fields.secondaryCta} className="btn btn-ghost" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-6 md:right-12 hidden md:block">
        <div
          className="text-[0.65rem] uppercase tracking-[0.32em] text-right"
          style={{ color: 'var(--c-text-mute)' }}
        >
          <Text field={fields.projectMeta} />
          <br />
          <Text field={fields.location} />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span
          className="text-[0.6rem] uppercase tracking-[0.32em]"
          style={{ color: 'var(--c-text-mute)' }}
        >
          Scroll
        </span>
        <span
          className="block w-px h-10"
          style={{ background: 'var(--c-line-strong)' }}
        />
      </div>
    </section>
  );
};
