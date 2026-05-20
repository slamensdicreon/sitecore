'use client';

import { useCallback, useEffect, useState } from 'react';
import { GALLERY } from './data';
import { Section } from './Section';

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, close, prev, next]);

  return (
    <Section
      eyebrow="Recent Work"
      title={
        <>
          A small selection from the <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>
          last two seasons</em>.
        </>
      }
      intro="We publish only a fraction of our projects. The rest are protected by client confidentiality — available privately on request."
    >
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {GALLERY.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="group mb-5 block w-full overflow-hidden rounded-2xl cursor-zoom-in"
            style={{ border: '1px solid var(--c-line)' }}
            aria-label={`Open ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className={`w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04] ${
                img.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(2,4,7,0.96)' }}
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-6 right-6 text-xs uppercase tracking-[0.32em]"
            style={{ color: 'var(--c-text-dim)' }}
            aria-label="Close"
          >
            Close ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-2xl"
            style={{ color: 'var(--c-text)' }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-2xl"
            style={{ color: 'var(--c-text)' }}
            aria-label="Next"
          >
            ›
          </button>
          <figure
            className="max-w-6xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GALLERY[index].src.replace('w=1200', 'w=2000').replace('w=1600', 'w=2000')}
              alt={GALLERY[index].alt}
              className="max-h-[78vh] w-auto object-contain rounded-xl"
            />
            <figcaption
              className="mt-4 text-center text-[0.7rem] uppercase tracking-[0.32em]"
              style={{ color: 'var(--c-text-dim)' }}
            >
              {GALLERY[index].alt} · {index + 1} / {GALLERY.length}
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  );
}
