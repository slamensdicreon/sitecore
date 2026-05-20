import { PROCESS_STEPS } from './data';
import { Section } from './Section';

export function ProcessSteps() {
  return (
    <Section
      eyebrow="The Practice"
      title={
        <>
          Four chapters from <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>first
          sketch</em> to first swim.
        </>
      }
      intro="A predictable, calm process for an investment that should never feel chaotic."
    >
      <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
        <div
          className="hidden md:block absolute top-8 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--c-line-strong), var(--c-line-strong), transparent)',
          }}
        />
        {PROCESS_STEPS.map((step) => (
          <div key={step.n} className="relative">
            <div
              className="relative inline-flex h-16 w-16 items-center justify-center rounded-full mb-6"
              style={{
                background: 'var(--c-ground)',
                border: '1px solid var(--c-line-strong)',
                color: 'var(--c-aqua)',
                fontFamily: 'var(--font-heading), serif',
                fontSize: '1rem',
                letterSpacing: '0.05em',
              }}
            >
              {step.n}
            </div>
            <h3 className="mb-3">{step.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-dim)' }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
