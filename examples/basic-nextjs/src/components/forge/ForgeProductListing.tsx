import React, { JSX } from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Image as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type ProductItem = {
  id: string;
  fields: {
    name?: Field<string>;
    category?: Field<string>;
    sku?: Field<string>;
    image?: ImageField;
    link?: LinkField;
  };
};

type ForgeProductListingProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    description?: Field<string>;
    products?: ProductItem[];
    cta?: LinkField;
    filterByIndustry?: Field<boolean>;
  };
};

const ForgeProductListing = (props: ForgeProductListingProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-product-listing bg-forge-steel/10 py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeProductListing</span>
        </div>
      </section>
    );
  }

  const products = props.fields.products ?? [];

  return (
    <section className="forge-product-listing bg-forge-steel/10 py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          {props.fields.heading && (
            <h2 className="text-3xl md:text-4xl font-black text-forge-slate mb-4">
              <ContentSdkText field={props.fields.heading} />
            </h2>
          )}
          {props.fields.description && (
            <div className="text-forge-slate/70">
              <ContentSdkRichText field={props.fields.description} />
            </div>
          )}
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-forge-slate/10 rounded-sm p-6 hover:border-forge-amber hover:shadow-md transition-all group cursor-pointer"
              >
                {product.fields.image && (
                  <ContentSdkImage field={product.fields.image} className="w-full h-40 object-cover rounded-sm mb-4" />
                )}
                {product.fields.category && (
                  <div className="text-xs text-forge-amber font-bold uppercase tracking-widest mb-2">
                    <ContentSdkText field={product.fields.category} />
                  </div>
                )}
                {product.fields.name && (
                  <h3 className="text-forge-slate font-bold text-lg mb-1 group-hover:text-forge-amber transition-colors">
                    {product.fields.link?.value?.href ? (
                      <ContentSdkLink field={product.fields.link}>
                        <ContentSdkText field={product.fields.name} />
                      </ContentSdkLink>
                    ) : (
                      <ContentSdkText field={product.fields.name} />
                    )}
                  </h3>
                )}
                {product.fields.sku && (
                  <p className="text-forge-slate/50 text-xs font-mono">
                    <ContentSdkText field={product.fields.sku} />
                  </p>
                )}
                <div className="mt-4 pt-4 border-t border-forge-slate/10 flex items-center justify-between">
                  <span className="text-sm text-forge-slate/60">View specs →</span>
                  <div className="w-6 h-6 rounded-full bg-forge-amber/10 flex items-center justify-center group-hover:bg-forge-amber transition-colors">
                    <svg className="w-3 h-3 text-forge-amber group-hover:text-forge-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-forge-slate/30 border border-dashed border-forge-slate/20 rounded-sm">
            <p className="text-sm">Add product items to the datasource.</p>
          </div>
        )}
        {props.fields.cta?.value?.href && (
          <div className="text-center mt-10">
            <ContentSdkLink field={props.fields.cta} className="forge-btn-outline-dark" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeProductListing;
