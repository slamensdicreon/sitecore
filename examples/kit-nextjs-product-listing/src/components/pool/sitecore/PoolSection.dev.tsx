import { Placeholder, Text, RichText } from '@sitecore-content-sdk/nextjs';
import type { PoolSectionProps } from './PoolSection.props';

export const Default: React.FC<PoolSectionProps & { rendering?: any }> = (props) => {
  const { fields, rendering } = props;
  const align = fields?.align?.value === 'center' ? 'mx-auto text-center' : '';
  return (
    <section data-component="PoolSection" className="py-24 md:py-32">
      <div className="container-luxe">
        {fields && (
          <div className={`max-w-3xl ${align} mb-14 md:mb-20`}>
            <Text tag="div" field={fields.eyebrow} className="eyebrow mb-5" />
            <RichText tag="h2" field={fields.title} />
            <RichText
              tag="p"
              field={fields.intro}
              className="mt-5 text-lg leading-relaxed"
              style={{ color: 'var(--c-text-dim)' }}
            />
          </div>
        )}
        {fields?.body?.value && (
          <RichText field={fields.body} className="prose prose-invert max-w-3xl" />
        )}
        {rendering && (
          <Placeholder name="pool-section-content" rendering={rendering} />
        )}
      </div>
    </section>
  );
};
