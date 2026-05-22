import React, { JSX } from 'react';
import {
  Field,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type TimelineStep = {
  id: string;
  fields: {
    stepNumber?: Field<string>;
    title?: Field<string>;
    description?: Field<string>;
  };
};

type ForgeProcessTimelineProps = ComponentProps & {
  fields?: {
    heading?: Field<string>;
    subheading?: Field<string>;
    steps?: TimelineStep[];
  };
};

const ForgeProcessTimeline = (props: ForgeProcessTimelineProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (!props.fields) {
    return (
      <section className="forge-process-timeline bg-white py-20" id={id ?? undefined}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="is-empty-hint text-forge-slate/40">ForgeProcessTimeline</span>
        </div>
      </section>
    );
  }

  const steps = props.fields.steps ?? [];

  return (
    <section className="forge-process-timeline bg-white py-20" id={id ?? undefined}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-forge-amber text-xs font-bold uppercase tracking-widest mb-3">How We Work</p>
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
        {steps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="relative pl-8 border-l-2 border-forge-amber/30 hover:border-forge-amber transition-colors group">
                <div className="absolute -left-4 top-0 w-7 h-7 rounded-full bg-white border-2 border-forge-amber flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-forge-amber" />
                </div>
                {step.fields.stepNumber && (
                  <div className="text-forge-amber font-mono text-xs font-bold mb-2">
                    <ContentSdkText field={step.fields.stepNumber} />
                  </div>
                )}
                {step.fields.title && (
                  <h3 className="font-bold text-forge-slate text-lg mb-2 group-hover:text-forge-amber transition-colors">
                    <ContentSdkText field={step.fields.title} />
                  </h3>
                )}
                {step.fields.description && (
                  <p className="text-forge-slate/60 text-sm leading-relaxed">
                    <ContentSdkText field={step.fields.description} />
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-forge-slate/30 border border-dashed border-forge-slate/20 rounded-sm">
            <p className="text-sm">Add process step items to the datasource.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgeProcessTimeline;
