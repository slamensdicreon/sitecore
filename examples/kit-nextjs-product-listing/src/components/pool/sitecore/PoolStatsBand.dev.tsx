import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import type { PoolStatsBandProps } from './PoolStatsBand.props';

export const Default: React.FC<PoolStatsBandProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  const items = Array.isArray(fields.items) ? fields.items : [];
  return (
    <section data-component="PoolStatsBand" className="py-20 md:py-24" style={{ background: 'var(--c-ground)' }}>
      <div className="container-luxe">
        <div className="max-w-3xl mb-12">
          <Text tag="div" field={fields.eyebrow} className="eyebrow mb-5" />
          <RichText tag="h2" field={fields.title} />
        </div>
        <div className="grid gap-10 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.id}>
              <Text
                tag="div"
                field={s.fields?.value}
                className="font-display text-4xl md:text-5xl mb-2"
                style={{ color: 'var(--c-gold)' }}
              />
              <Text
                tag="div"
                field={s.fields?.label}
                className="text-[0.7rem] uppercase tracking-[0.3em]"
                style={{ color: 'var(--c-text-mute)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
