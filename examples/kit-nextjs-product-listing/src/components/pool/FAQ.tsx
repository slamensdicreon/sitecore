import { FAQS } from './data';
import { Section } from './Section';

export function FAQ() {
  return (
    <Section
      eyebrow="Common Questions"
      title="Frank answers to the questions clients actually ask first."
    >
      <div className="max-w-3xl mx-auto divide-y" style={{ borderColor: 'var(--c-line)' }}>
        {FAQS.map((item, i) => (
          <details
            key={i}
            className="group py-6"
            style={{ borderTop: i === 0 ? '1px solid var(--c-line)' : undefined, borderBottom: '1px solid var(--c-line)' }}
          >
            <summary
              className="flex items-start justify-between gap-6 cursor-pointer list-none"
              style={{ color: 'var(--c-text)' }}
            >
              <span
                className="text-lg md:text-xl"
                style={{ fontFamily: 'var(--font-heading), serif', lineHeight: 1.3 }}
              >
                {item.q}
              </span>
              <span
                className="mt-1 text-2xl leading-none transition-transform group-open:rotate-45"
                style={{ color: 'var(--c-aqua)' }}
                aria-hidden
              >
                +
              </span>
            </summary>
            <p
              className="mt-4 text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ color: 'var(--c-text-dim)' }}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
