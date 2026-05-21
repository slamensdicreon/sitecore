import Link from 'next/link';
import { SERVICES as FALLBACK_SERVICES, type Service } from './data';
import { Section } from './Section';

interface ServicesGridProps {
  services?: Service[];
  limit?: number;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
}

export function ServicesGrid({
  services,
  limit,
  eyebrow = 'The Atelier',
  title = (
    <>
      A complete practice — <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>from
      first sketch to weekly stewardship</em>.
    </>
  ),
  intro = 'Six disciplines, one team. Every pool we build is one we then quietly care for — which is why we treat each first decision as if we will live with it for decades.',
}: ServicesGridProps) {
  const source = services ?? FALLBACK_SERVICES;
  const items = limit ? source.slice(0, limit) : source;
  return (
    <Section eyebrow={eyebrow} title={title} intro={intro} id="services">
      <div className="grid gap-6 md:gap-7 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <Link
            key={s.id}
            href={`/services#${s.id}`}
            className="card group flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,8,12,0.05) 0%, rgba(5,8,12,0.7) 100%)',
                }}
              />
              <div
                className="absolute top-5 left-5 text-[0.65rem] uppercase tracking-[0.32em]"
                style={{ color: 'var(--c-text)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            <div className="p-7 md:p-8 flex-1 flex flex-col">
              <h3 className="mb-3">{s.title}</h3>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--c-text-dim)' }}
              >
                {s.blurb}
              </p>
              <div
                className="mt-6 text-[0.7rem] uppercase tracking-[0.3em] flex items-center gap-2 transition-colors group-hover:text-[var(--c-aqua)]"
                style={{ color: 'var(--c-text)' }}
              >
                Read more <span aria-hidden>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
