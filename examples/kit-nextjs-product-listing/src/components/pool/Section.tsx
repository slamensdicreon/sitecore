import type { ReactNode } from 'react';

interface SectionProps {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

export function Section({
  eyebrow,
  title,
  intro,
  id,
  align = 'left',
  className = '',
  children,
}: SectionProps) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <div className="container-luxe">
        {(eyebrow || title || intro) && (
          <div
            className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-14 md:mb-20`}
          >
            {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
            {title && <h2>{title}</h2>}
            {intro && (
              <p className="mt-5 text-lg leading-relaxed" style={{ color: 'var(--c-text-dim)' }}>
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
