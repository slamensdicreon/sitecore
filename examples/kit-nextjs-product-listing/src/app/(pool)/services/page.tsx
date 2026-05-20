import { Hero } from 'src/components/pool/Hero';
import { ServicesGrid } from 'src/components/pool/ServicesGrid';
import { Section } from 'src/components/pool/Section';
import { SERVICES } from 'src/components/pool/data';
import { ProcessSteps } from 'src/components/pool/ProcessSteps';
import { CtaBanner } from 'src/components/pool/CtaBanner';

export const metadata = {
  title: 'Services — CAELUM',
  description:
    'Bespoke pool design and build, renovation, white-glove maintenance, opening & closing, equipment & automation, diagnostics and repair.',
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        fullViewport={false}
        eyebrow="The Practice"
        title={
          <>
            Six disciplines.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>One atelier.</em>
          </>
        }
        subtitle={
          <>
            We design, build, restore, and care for the pool in the same studio. That continuity
            is what makes our work last — and how we hold ourselves accountable across decades.
          </>
        }
        imageUrl="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=2400&q=90&auto=format&fit=crop"
        primaryCta={{ label: 'See Pricing', href: '/pricing' }}
        secondaryCta={{ label: 'Begin a Conversation', href: '/contact' }}
      />

      <ServicesGrid
        eyebrow="What we make"
        title={
          <>
            A complete practice — <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>at
            every stage</em>.
          </>
        }
      />

      {/* Deep-dive sections per service */}
      {SERVICES.map((s, i) => (
        <Section key={s.id} id={s.id} className="!scroll-mt-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={i % 2 === 0 ? 'order-1' : 'lg:order-2'}>
              <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid var(--c-line)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </div>
            <div className={i % 2 === 0 ? 'order-2' : 'lg:order-1'}>
              <div
                className="eyebrow mb-5"
                style={{ color: 'var(--c-gold)' }}
              >
                {String(i + 1).padStart(2, '0')} · Discipline
              </div>
              <h2 className="mb-6">{s.title}</h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: 'var(--c-text-dim)' }}
              >
                {s.description}
              </p>
              <ul className="space-y-3">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-4 text-sm"
                    style={{ color: 'var(--c-text)' }}
                  >
                    <span
                      className="mt-2 block h-px w-6 flex-shrink-0"
                      style={{ background: 'var(--c-aqua)' }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <ProcessSteps />
      <CtaBanner />
    </>
  );
}
