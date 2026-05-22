import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type NavItem = {
  id: string;
  displayName?: string;
  fields?: {
    NavigationTitle?: Field<string>;
    Title?: Field<string>;
  };
  href?: string;
};

type ForgeHeaderProps = ComponentProps & {
  fields?: {
    logo?: ImageField;
    logoLink?: LinkField;
    navigationItems?: NavItem[];
    contactLabel?: Field<string>;
    contactLink?: LinkField;
  };
};

const isNavItem = (v: unknown): v is NavItem =>
  typeof v === 'object' && v !== null && 'id' in (v as Record<string, unknown>);

const ForgeHeader = (props: ForgeHeaderProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <header className="forge-header bg-forge-slate" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-forge-amber font-bold text-xl tracking-tight">FORGE INDUSTRIAL</span>
          <span className="is-empty-hint text-white/40 text-sm">ForgeHeader</span>
        </div>
      </header>
    );
  }

  const rawValues: unknown[] = Array.isArray(props.fields.navigationItems)
    ? props.fields.navigationItems
    : Object.values(props.fields as Record<string, unknown>);
  const navItems: NavItem[] = rawValues.filter(isNavItem);

  return (
    <header className="forge-header bg-forge-slate sticky top-0 z-50 shadow-lg" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          {props.fields.logoLink?.value?.href ? (
            <ContentSdkLink field={props.fields.logoLink}>
              {props.fields.logo && (
                <ContentSdkImage field={props.fields.logo} className="h-10 w-auto" alt="Forge Industrial" />
              )}
            </ContentSdkLink>
          ) : props.fields.logo ? (
            <ContentSdkImage field={props.fields.logo} className="h-10 w-auto" />
          ) : (
            <span className="text-forge-amber font-bold text-xl tracking-tight">FORGE INDUSTRIAL</span>
          )}
        </div>
        {navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {navItems.map((item) => {
              const label =
                item.fields?.NavigationTitle?.value ||
                item.fields?.Title?.value ||
                item.displayName ||
                '';
              return (
                <a
                  key={item.id}
                  href={item.href ?? '#'}
                  className="text-white/80 hover:text-forge-amber text-sm font-medium transition-colors"
                >
                  {label}
                </a>
              );
            })}
          </nav>
        )}
        {props.fields.contactLink?.value?.href ? (
          <ContentSdkLink field={props.fields.contactLink} className="forge-btn-primary text-sm">
            {props.fields.contactLabel ? (
              <ContentSdkText field={props.fields.contactLabel} />
            ) : undefined}
          </ContentSdkLink>
        ) : props.fields.contactLabel ? (
          <span className="forge-btn-primary text-sm">
            <ContentSdkText field={props.fields.contactLabel} />
          </span>
        ) : null}
      </div>
    </header>
  );
};

export default ForgeHeader;
