import { Text, RichText, Image } from '@sitecore-content-sdk/nextjs';
import type { PoolServicesGridProps } from './PoolServicesGrid.props';

export const Default: React.FC<PoolServicesGridProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  const items = Array.isArray(fields.items) ? fields.items : [];
  return (
    <section id="services" data-component="PoolServicesGrid" className="py-24 md:py-32">
      <div className="container-luxe">
        <div className="max-w-3xl mb-14 md:mb-20">
          <Text tag="div" field={fields.eyebrow} className="eyebrow mb-5" />
          <RichText tag="h2" field={fields.title} />
          <RichText
            tag="p"
            field={fields.intro}
            className="mt-5 text-lg leading-relaxed"
            style={{ color: 'var(--c-text-dim)' }}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const f = item.fields ?? ({} as any);
            return (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-sm"
                style={{ background: 'var(--c-card)', border: '1px solid var(--c-line)' }}
              >
                {f.image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      field={f.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-7">
                  <Text tag="h3" field={f.title} className="text-xl mb-3" />
                  <Text
                    tag="p"
                    field={f.blurb}
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--c-text-dim)' }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
