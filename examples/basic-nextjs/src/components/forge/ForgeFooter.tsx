import React, { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Image as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type FooterLinkItem = {
  id: string;
  fields: {
    label?: Field<string>;
    link?: LinkField;
  };
};

type FooterColumnItem = {
  id: string;
  fields: {
    heading?: Field<string>;
    links?: FooterLinkItem[];
  };
};

type ForgeFooterProps = ComponentProps & {
  fields?: {
    logo?: ImageField;
    logoLink?: LinkField;
    tagline?: Field<string>;
    footerColumns?: FooterColumnItem[];
    address?: Field<string>;
    phone?: Field<string>;
    email?: Field<string>;
    legalLinks?: Field<string>;
    copyrightText?: Field<string>;
  };
};

const ForgeFooter = (props: ForgeFooterProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <footer className="forge-footer bg-forge-slate text-white" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <span className="is-empty-hint text-white/40">ForgeFooter</span>
        </div>
      </footer>
    );
  }

  const columns = props.fields.footerColumns ?? [];

  return (
    <footer className="forge-footer bg-forge-slate text-white" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            {props.fields.logoLink?.value?.href ? (
              <ContentSdkLink field={props.fields.logoLink} className="inline-block mb-4">
                {props.fields.logo && (
                  <ContentSdkImage field={props.fields.logo} className="h-10 w-auto" />
                )}
              </ContentSdkLink>
            ) : props.fields.logo ? (
              <div className="mb-4">
                <ContentSdkImage field={props.fields.logo} className="h-10 w-auto" />
              </div>
            ) : (
              <div className="text-forge-amber font-bold text-xl tracking-tight mb-4">FORGE INDUSTRIAL</div>
            )}
            {props.fields.tagline && (
              <p className="text-white/60 text-sm leading-relaxed">
                <ContentSdkText field={props.fields.tagline} />
              </p>
            )}
          </div>
          {columns.length > 0 ? (
            columns.map((col) => (
              <div key={col.id}>
                {col.fields.heading && (
                  <h3 className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-4">
                    <ContentSdkText field={col.fields.heading} />
                  </h3>
                )}
                {col.fields.links && col.fields.links.length > 0 ? (
                  <ul className="space-y-2 text-sm text-white/60">
                    {col.fields.links.map((item) => (
                      <li key={item.id} className="hover:text-white transition-colors">
                        {item.fields.link?.value?.href ? (
                          <ContentSdkLink field={item.fields.link}>
                            {item.fields.label ? (
                              <ContentSdkText field={item.fields.label} />
                            ) : undefined}
                          </ContentSdkLink>
                        ) : item.fields.label ? (
                          <ContentSdkText field={item.fields.label} />
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))
          ) : (
            <div className="md:col-span-2 flex items-start">
              <p className="is-empty-hint text-white/20 text-xs">Add footer column items to the datasource.</p>
            </div>
          )}
          <div>
            <h3 className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {props.fields.address && (
                <li><ContentSdkText field={props.fields.address} /></li>
              )}
              {props.fields.phone && (
                <li><ContentSdkText field={props.fields.phone} /></li>
              )}
              {props.fields.email && (
                <li><ContentSdkText field={props.fields.email} /></li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {props.fields.copyrightText ? (
            <p className="text-white/40 text-xs">
              <ContentSdkText field={props.fields.copyrightText} />
            </p>
          ) : null}
          {props.fields.legalLinks ? (
            <div className="text-xs text-white/40">
              <ContentSdkRichText field={props.fields.legalLinks} />
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default ForgeFooter;
