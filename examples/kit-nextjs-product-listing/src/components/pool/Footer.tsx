import Link from 'next/link';
import { BRAND, NAV, SERVICES } from './data';

export function Footer() {
  return (
    <footer
      className="mt-24 pt-20 pb-10"
      style={{ borderTop: '1px solid var(--c-line)', background: 'var(--c-ground)' }}
    >
      <div className="container-luxe">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="wordmark text-2xl md:text-3xl mb-4">{BRAND.name}</div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--c-text-dim)' }}>
              {BRAND.tagline}. Pools made to be inherited — engineered and finished by a single
              South Florida atelier since 2000.
            </p>
            <div className="mt-8 flex gap-3">
              {Object.entries(BRAND.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[0.7rem] uppercase tracking-widest"
                  style={{ border: '1px solid var(--c-line-strong)' }}
                  aria-label={key}
                >
                  {key.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-5">Atelier</div>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-5">Services</div>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">Studio</div>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              <li>{BRAND.address}</li>
              <li>
                <a href={`tel:${BRAND.phone.replace(/\s|-|\(|\)/g, '')}`}>{BRAND.phone}</a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
              <li className="pt-2" style={{ color: 'var(--c-text-mute)' }}>
                {BRAND.hoursWeek}
                <br />
                {BRAND.hoursWeekend}
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
          style={{ color: 'var(--c-text-mute)' }}
        >
          <div>
            © {new Date().getFullYear()} Caelum Pool Atelier · Florida State License #CPC1457821
          </div>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Accessibility</a>
            <a href="#">Press</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
