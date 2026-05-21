'use client';

import { useState } from 'react';
import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import type { PoolFAQProps } from './PoolFAQ.props';

export const Default: React.FC<PoolFAQProps> = (props) => {
  const { fields } = props;
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  if (!fields) return null;
  const items = Array.isArray(fields.items) ? fields.items : [];
  return (
    <section id="faq" data-component="PoolFAQ" className="py-24 md:py-32">
      <div className="container-luxe max-w-3xl">
        <div className="mb-14 md:mb-20">
          <Text tag="div" field={fields.eyebrow} className="eyebrow mb-5" />
          <RichText tag="h2" field={fields.title} />
        </div>
        <ul className="divide-y" style={{ borderColor: 'var(--c-line)' }}>
          {items.map((f, i) => {
            const open = openIdx === i;
            return (
              <li key={f.id} className="py-6">
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  <Text tag="span" field={f.fields?.question} className="text-lg" />
                  <span aria-hidden style={{ color: 'var(--c-gold)' }}>{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <RichText
                    tag="div"
                    field={f.fields?.answer}
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: 'var(--c-text-dim)' }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
