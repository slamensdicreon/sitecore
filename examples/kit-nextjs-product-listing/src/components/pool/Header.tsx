'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BRAND, NAV } from './data';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'linear-gradient(180deg, rgba(5,8,12,0.92), rgba(5,8,12,0.7))'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(130%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(130%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--c-line)' : '1px solid transparent',
      }}
    >
      <div className="container-luxe flex items-center justify-between py-5 md:py-6">
        <Link href="/" className="flex items-baseline gap-3" aria-label="Caelum home">
          <span className="wordmark text-[1.35rem] md:text-2xl">{BRAND.name}</span>
          <span
            className="hidden md:inline text-[0.65rem] uppercase tracking-[0.3em]"
            style={{ color: 'var(--c-text-mute)' }}
          >
            est. 2000
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.78rem] uppercase tracking-[0.22em] transition-colors"
              style={{ color: 'var(--c-text-dim)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="hidden md:inline-flex btn btn-ghost">
          Begin a Conversation
        </Link>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          className="md:hidden p-2"
          onClick={() => setOpen((s) => !s)}
        >
          <div className="space-y-1.5">
            <span className="block h-px w-7" style={{ background: 'var(--c-text)' }} />
            <span className="block h-px w-7" style={{ background: 'var(--c-text)' }} />
            <span className="block h-px w-5 ml-auto" style={{ background: 'var(--c-text)' }} />
          </div>
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t"
          style={{ background: 'rgba(5,8,12,0.97)', borderColor: 'var(--c-line)' }}
        >
          <div className="container-luxe py-6 flex flex-col gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base uppercase tracking-[0.22em]"
                style={{ color: 'var(--c-text-dim)' }}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-ghost w-full justify-center">
              Begin a Conversation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
