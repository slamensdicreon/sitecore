import Link from 'next/link';
import { Hero } from 'src/components/pool/Hero';
import { Section } from 'src/components/pool/Section';
import { CostCalculator } from 'src/components/pool/CostCalculator';
import { FAQ } from 'src/components/pool/FAQ';
import { CtaBanner } from 'src/components/pool/CtaBanner';
import { PRICING_TIERS, formatUSD } from 'src/components/pool/pricing';

export const metadata = {
  title: 'Pricing — CAELUM',
  description:
    'Transparent ranges for Plunge, Classic, and Signature bespoke pool builds. Use our calculator for a realistic estimate in two minutes.',
};

export default function PricingPage() {
  return (
    <>
      <Hero
        fullViewport={false}
        eyebrow="Investment, Transparent"
        title={
          <>
            What a Caelum pool{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>actually costs.</em>
          </>
        }
        subtitle={
          <>
            Most pool quotes are starting numbers that grow without warning. We publish full
            ranges, honor the upper bound in writing after a site visit, and never charge for the
            consultation.
          </>
        }
        imageUrl="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=2400&q=90&auto=format&fit=crop"
        primaryCta={{ label: 'Open the Calculator', href: '#calculator' }}
        secondaryCta={{ label: 'Begin a Conversation', href: '/contact' }}
      />

      <Section
        eyebrow="Three Tiers"
        title={
          <>
            A range of <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>commitments</em> —
            none of them small.
          </>
        }
        intro="Most pools we build fall into one of three forms. All are bespoke; the tier simply reflects ambition and footprint."
      >
        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="card p-8 md:p-10 flex flex-col relative"
              style={{
                borderColor: tier.featured ? 'var(--c-aqua)' : 'var(--c-line)',
                background: tier.featured
                  ? 'linear-gradient(180deg, rgba(103,232,249,0.06), rgba(255,255,255,0.02))'
                  : undefined,
              }}
            >
              {tier.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.3em]"
                  style={{
                    background: 'var(--c-aqua)',
                    color: 'var(--c-ink)',
                  }}
                >
                  Most chosen
                </div>
              )}
              <div className="eyebrow mb-4">Tier</div>
              <div
                className="display mb-3"
                style={{
                  fontFamily: 'var(--font-heading), serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: 1,
                }}
              >
                {tier.name}
              </div>
              <div className="text-sm mb-6" style={{ color: 'var(--c-text-dim)' }}>
                {tier.summary}
              </div>
              <div className="mb-8">
                <span
                  className="text-[0.65rem] uppercase tracking-[0.3em] block mb-1"
                  style={{ color: 'var(--c-text-mute)' }}
                >
                  From
                </span>
                <span
                  className="display"
                  style={{
                    fontFamily: 'var(--font-heading), serif',
                    fontSize: '2rem',
                    color: tier.featured ? 'var(--c-aqua)' : 'var(--c-text)',
                  }}
                >
                  {formatUSD(tier.from)}
                </span>
              </div>
              <ul className="space-y-3 flex-1 mb-8 text-sm" style={{ color: 'var(--c-text-dim)' }}>
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-2 block h-px w-4 flex-shrink-0"
                      style={{ background: tier.featured ? 'var(--c-aqua)' : 'var(--c-line-strong)' }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`btn ${tier.featured ? 'btn-gold' : 'btn-ghost'} w-full justify-center`}
              >
                Begin {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <CostCalculator />
      <FAQ />
      <CtaBanner />
    </>
  );
}
