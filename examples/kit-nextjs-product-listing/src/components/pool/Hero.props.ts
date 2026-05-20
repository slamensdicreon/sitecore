// Sitecore-aware props for the Caelum pool Hero component.
//
// Mirrors the pattern in `src/components/hero/hero.props.ts`. These types
// describe the fields a Sitecore content editor fills in for a Hero
// rendering on a page in the `future` site.
//
// NOTE: The standalone pool routes under `src/app/(pool)/` still consume
// the legacy positional-prop Hero (see Hero.tsx). HeroSitecore.dev.tsx
// renders against this Field-typed shape and will be the form picked up by
// the Sitecore component map once `src/components/pool/*` is removed from
// the `exclude` list in `sitecore.cli.config.ts`.

import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface HeroParams {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface PoolHeroFields {
  eyebrow: Field<string>;
  title: Field<string>;
  subtitle: Field<string>;
  image: ImageField;
  primaryCta: LinkField;
  secondaryCta: LinkField;
  projectMeta: Field<string>;
  location: Field<string>;
  fullViewport: Field<boolean>;
}

export interface PoolHeroProps extends ComponentProps {
  params: HeroParams;
  fields: PoolHeroFields;
  isPageEditing?: boolean;
}
