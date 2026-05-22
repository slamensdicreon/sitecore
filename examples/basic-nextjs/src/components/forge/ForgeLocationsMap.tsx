import React, { JSX } from 'react';
import {
  Field,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type LocationItem = {
  id: string;
  fields: {
    name?: Field<string>;
    address?: Field<string>;
    specialty?: Field<string>;
    size?: Field<string>;
  };
};

type ForgeLocationsMapProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    locations?: LocationItem[];
    mapEmbedUrl?: Field<string>;
  };
};

const ForgeLocationsMap = (props: ForgeLocationsMapProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-locations-map bg-white py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeLocationsMap</span>
        </div>
      </section>
    );
  }

  const locations = props.fields.locations ?? [];

  return (
    <section className="forge-locations-map bg-white py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">Global Footprint</p>
          {props.fields.heading && (
            <h2 className="text-3xl md:text-4xl font-black text-forge-slate mb-4">
              <ContentSdkText field={props.fields.heading} />
            </h2>
          )}
          {props.fields.subheading && (
            <div className="text-forge-slate/60 max-w-2xl mx-auto">
              <ContentSdkRichText field={props.fields.subheading} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {locations.length > 0 ? (
              locations.map((loc) => (
                <div key={loc.id} className="p-6 border border-forge-slate/10 rounded-sm hover:border-forge-amber hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-forge-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-forge-slate" />
                    </div>
                    <div>
                      {loc.fields.name && (
                        <h3 className="font-bold text-forge-slate text-sm group-hover:text-forge-amber transition-colors">
                          <ContentSdkText field={loc.fields.name} />
                        </h3>
                      )}
                      {loc.fields.address && (
                        <p className="text-forge-slate/50 text-xs mt-1">
                          <ContentSdkText field={loc.fields.address} />
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {loc.fields.specialty && (
                          <span className="text-xs bg-forge-amber/10 text-forge-amber px-2 py-0.5 rounded">
                            <ContentSdkText field={loc.fields.specialty} />
                          </span>
                        )}
                        {loc.fields.size && (
                          <span className="text-xs bg-forge-slate/5 text-forge-slate/50 px-2 py-0.5 rounded">
                            <ContentSdkText field={loc.fields.size} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-forge-slate/30 border border-dashed border-forge-slate/20 rounded-sm">
                <p className="text-sm">Add location items to the datasource.</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-3 bg-forge-steel/20 rounded-sm min-h-[400px] flex items-center justify-center">
            {props.fields.mapEmbedUrl?.value ? (
              <iframe
                src={(props.fields.mapEmbedUrl as Field<string>).value as string}
                className="w-full h-full min-h-[400px] rounded-sm border-0"
                loading="lazy"
                title="Forge Industrial facility locations"
              />
            ) : (
              <div className="text-center text-forge-slate/30">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-sm font-medium">Interactive map will appear here</p>
                <p className="text-xs mt-1">Configure map embed URL in Sitecore</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgeLocationsMap;
