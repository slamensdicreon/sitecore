import { Text, RichText, Image } from '@sitecore-content-sdk/nextjs';
import type { PoolTestimonialsProps } from './PoolTestimonials.props';

export const Default: React.FC<PoolTestimonialsProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  const items = Array.isArray(fields.items) ? fields.items : [];
  return (
    <section data-component="PoolTestimonials" className="py-24 md:py-32" style={{ background: 'var(--c-ground)' }}>
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
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.id}
              className="p-8 rounded-sm flex flex-col"
              style={{ background: 'var(--c-bg)', border: '1px solid var(--c-line)' }}
            >
              <Text
                tag="blockquote"
                field={t.fields?.quote}
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--c-text)' }}
              />
              <figcaption className="mt-auto flex items-center gap-3">
                {t.fields?.avatar && (
                  <Image
                    field={t.fields.avatar}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <Text tag="div" field={t.fields?.author} className="text-sm font-medium" />
                  <Text
                    tag="div"
                    field={t.fields?.role}
                    className="text-[0.7rem] uppercase tracking-[0.22em]"
                    style={{ color: 'var(--c-text-mute)' }}
                  />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
