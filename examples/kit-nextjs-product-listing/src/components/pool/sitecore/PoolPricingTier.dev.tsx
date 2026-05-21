import { Text, RichText, Link as JssLink } from '@sitecore-content-sdk/nextjs';
import type { PoolPricingTierProps, PricingTierItemFields } from './PoolPricingTier.props';

export const Default: React.FC<PoolPricingTierProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  const items = Array.isArray(fields.items) ? fields.items : [];
  return (
    <section id="pricing-tiers" data-component="PoolPricingTier" className="py-24 md:py-32">
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
          {items.map((item) => {
            const f = item.fields ?? ({} as PricingTierItemFields);
            const highlighted = f.highlight && f.highlight.value;
            return (
              <article
                key={item.id}
                className="relative flex flex-col rounded-sm p-8"
                style={{
                  background: 'var(--c-card)',
                  border: '1px solid var(--c-line)',
                  outline: highlighted ? '2px solid var(--c-accent)' : 'none',
                  outlineOffset: '-2px',
                }}
              >
                {highlighted && (
                  <Text
                    tag="div"
                    field={f.highlight}
                    className="absolute -top-3 left-6 px-3 py-1 text-xs uppercase tracking-widest"
                    style={{ background: 'var(--c-accent)', color: 'var(--c-bg)' }}
                  />
                )}
                <Text tag="h3" field={f.name} className="text-2xl mb-3" />
                <Text
                  tag="div"
                  field={f.price}
                  className="text-3xl mb-4"
                  style={{ color: 'var(--c-accent)' }}
                />
                {f.description && (
                  <Text
                    tag="p"
                    field={f.description}
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: 'var(--c-text-dim)' }}
                  />
                )}
                {f.features && (
                  <RichText
                    field={f.features}
                    className="text-sm leading-relaxed mb-8 flex-1 [&_ul]:space-y-2 [&_li]:pl-4 [&_li]:relative [&_li:before]:content-['—'] [&_li:before]:absolute [&_li:before]:left-0"
                    style={{ color: 'var(--c-text-dim)' }}
                  />
                )}
                {f.ctaLabel && f.ctaHref && (
                  <JssLink
                    field={{ value: { text: f.ctaLabel.value, href: f.ctaHref.value, anchor: '', target: '' } }}
                    className="mt-auto inline-block text-sm uppercase tracking-widest border-b pb-1 self-start"
                    style={{ borderColor: 'var(--c-accent)', color: 'var(--c-accent)' }}
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
