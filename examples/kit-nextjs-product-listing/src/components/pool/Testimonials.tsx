import { TESTIMONIALS } from './data';
import { Section } from './Section';

export function Testimonials() {
  return (
    <Section
      eyebrow="In Their Words"
      title="Why our clients return — and refer their friends."
      intro="Word of mouth has built this atelier. We protect that with everything we do."
    >
      <div className="grid md:grid-cols-3 gap-6 md:gap-7">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            className="card p-8 md:p-9 flex flex-col"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            }}
          >
            <div
              className="display mb-6"
              style={{
                fontFamily: 'var(--font-heading), serif',
                color: 'var(--c-aqua)',
                fontSize: '2.5rem',
                lineHeight: 1,
              }}
              aria-hidden
            >
              “
            </div>
            <blockquote
              className="text-base md:text-lg leading-relaxed flex-1"
              style={{ color: 'var(--c-text)' }}
            >
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.avatar}
                alt=""
                className="h-12 w-12 rounded-full object-cover"
                style={{ border: '1px solid var(--c-line-strong)' }}
              />
              <div>
                <div className="text-sm" style={{ color: 'var(--c-text)' }}>
                  {t.author}
                </div>
                <div
                  className="text-[0.7rem] uppercase tracking-[0.22em] mt-1"
                  style={{ color: 'var(--c-text-mute)' }}
                >
                  {t.role}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
