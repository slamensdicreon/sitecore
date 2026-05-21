import { Text, RichText, Image } from '@sitecore-content-sdk/nextjs';
import type { PoolGalleryProps } from './PoolGallery.props';

export const Default: React.FC<PoolGalleryProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  const items = Array.isArray(fields.items) ? fields.items : [];
  return (
    <section id="gallery" data-component="PoolGallery" className="py-24 md:py-32">
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
        <div className="grid gap-4 md:grid-cols-3 auto-rows-[18rem]">
          {items.map((g) => {
            const tall = g.fields?.tall?.value;
            return (
              <figure
                key={g.id}
                className={`relative overflow-hidden rounded-sm ${tall ? 'md:row-span-2 md:h-auto' : ''}`}
                style={{ background: 'var(--c-card)' }}
              >
                <Image
                  field={g.fields?.image}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};
