import { Text, RichText, Image, Link } from '@sitecore-content-sdk/nextjs';
import type { PoolCtaBannerProps } from './PoolCtaBanner.props';

export const Default: React.FC<PoolCtaBannerProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  return (
    <section data-component="PoolCtaBanner" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          field={fields.backgroundImage}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,12,0.85), rgba(5,8,12,0.95)), radial-gradient(circle at 30% 50%, rgba(103,232,249,0.18), transparent 50%)',
          }}
        />
      </div>

      <div className="container-luxe text-center max-w-3xl">
        <Text tag="div" field={fields.eyebrow} className="eyebrow mb-6" />
        <RichText tag="h2" field={fields.title} className="mb-6" />
        <RichText
          tag="p"
          field={fields.body}
          className="mb-10 text-lg leading-relaxed"
          style={{ color: 'var(--c-text-dim)' }}
        />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link field={fields.primaryCta} className="btn btn-gold" />
          <Link field={fields.secondaryCta} className="btn btn-ghost" />
        </div>
      </div>
    </section>
  );
};
