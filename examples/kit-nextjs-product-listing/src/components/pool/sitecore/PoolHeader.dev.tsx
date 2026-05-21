'use client';

import { useEffect, useState } from 'react';
import { Text, Link } from '@sitecore-content-sdk/nextjs';
import type { PoolHeaderProps, PoolHeaderFields } from './PoolHeader.props';

const navItems = (f: PoolHeaderFields) => [
  { label: f.nav1Label, link: f.nav1Link },
  { label: f.nav2Label, link: f.nav2Label && f.nav2Link },
  { label: f.nav3Label, link: f.nav3Link },
  { label: f.nav4Label, link: f.nav4Link },
].filter((n) => n.label?.value);

export const Default: React.FC<PoolHeaderProps> = (props) => {
  const { fields } = props;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!fields) return null;
  const items = navItems(fields);

  return (
    <header
      data-component="PoolHeader"
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
        <div className="flex items-baseline gap-3">
          <Text tag="span" field={fields.brandName} className="wordmark text-[1.35rem] md:text-2xl" />
          <Text
            tag="span"
            field={fields.tagline}
            className="hidden md:inline text-[0.65rem] uppercase tracking-[0.3em]"
            style={{ color: 'var(--c-text-mute)' }}
          />
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {items.map((n, i) => (
            <Link
              key={i}
              field={n.link}
              className="text-[0.78rem] uppercase tracking-[0.22em] transition-colors"
              style={{ color: 'var(--c-text-dim)' }}
            >
              <Text field={n.label} />
            </Link>
          ))}
        </nav>

        <Link
          field={fields.ctaLink}
          className="hidden md:inline-flex btn btn-ghost"
        >
          <Text field={fields.ctaLabel} />
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
            {items.map((n, i) => (
              <Link
                key={i}
                field={n.link}
                onClick={() => setOpen(false)}
                className="text-base uppercase tracking-[0.22em]"
                style={{ color: 'var(--c-text-dim)' }}
              >
                <Text field={n.label} />
              </Link>
            ))}
            <Link field={fields.ctaLink} onClick={() => setOpen(false)} className="btn btn-ghost w-full justify-center">
              <Text field={fields.ctaLabel} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
