import { Text, RichText, Link } from '@sitecore-content-sdk/nextjs';
import type { PoolFooterProps } from './PoolFooter.props';

export const Default: React.FC<PoolFooterProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  const socials = [
    { key: 'IG', link: fields.instagramLink },
    { key: 'PI', link: fields.pinterestLink },
    { key: 'HZ', link: fields.houzzLink },
  ].filter((s) => s.link?.value?.href);

  return (
    <footer
      data-component="PoolFooter"
      className="mt-24 pt-20 pb-10"
      style={{ borderTop: '1px solid var(--c-line)', background: 'var(--c-ground)' }}
    >
      <div className="container-luxe">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Text tag="div" field={fields.brandName} className="wordmark text-2xl md:text-3xl mb-4" />
            <RichText
              tag="div"
              field={fields.description}
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: 'var(--c-text-dim)' }}
            />
            <div className="mt-8 flex gap-3">
              {socials.map((s, i) => (
                <Link
                  key={i}
                  field={s.link}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[0.7rem] uppercase tracking-widest"
                  style={{ border: '1px solid var(--c-line-strong)' }}
                  aria-label={s.key}
                >
                  {s.key}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">Studio</div>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              <li><Text field={fields.address} /></li>
              <li><Text field={fields.phone} /></li>
              <li><Text field={fields.email} /></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">Hours</div>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              <li><Text field={fields.hoursWeek} /></li>
              <li><Text field={fields.hoursWeekend} /></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 text-[0.7rem] uppercase tracking-[0.3em]"
          style={{ borderTop: '1px solid var(--c-line)', color: 'var(--c-text-mute)' }}
        >
          <Text field={fields.copyright} />
        </div>
      </div>
    </footer>
  );
};
