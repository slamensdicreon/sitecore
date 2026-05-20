import Link from 'next/link';

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageUrl?: string;
  fullViewport?: boolean;
}

export function Hero({
  eyebrow = 'Bespoke Pool Atelier — South Florida',
  title,
  subtitle,
  primaryCta = { label: 'Begin a Conversation', href: '/contact' },
  secondaryCta = { label: 'View the Atelier', href: '/services' },
  imageUrl = 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=2400&q=90&auto=format&fit=crop',
  fullViewport = true,
}: HeroProps) {
  return (
    <section
      className={`relative ${fullViewport ? 'min-h-screen' : 'min-h-[78vh]'} flex items-end overflow-hidden`}
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.05) contrast(1.05)' }}
        />
        {/* Layered gradient overlays for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,12,0.55) 0%, rgba(5,8,12,0.15) 30%, rgba(5,8,12,0.55) 70%, rgba(5,8,12,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0 shimmer"
          style={{
            background:
              'radial-gradient(circle at 75% 35%, rgba(103,232,249,0.18), transparent 55%)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5,8,12,0.6), transparent 60%)',
          }}
        />
      </div>

      <div className="container-luxe relative pt-40 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <div className="eyebrow mb-6 reveal">{eyebrow}</div>
          <h1 className="reveal reveal-delay-1 leading-[1.02]">{title}</h1>
          <p
            className="reveal reveal-delay-2 mt-8 max-w-xl text-lg md:text-xl leading-relaxed"
            style={{ color: 'var(--c-text-dim)' }}
          >
            {subtitle}
          </p>
          <div className="reveal reveal-delay-3 mt-12 flex flex-wrap items-center gap-4">
            <Link href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="btn btn-ghost">
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom-right meta */}
      <div className="absolute bottom-10 right-6 md:right-12 hidden md:block">
        <div
          className="text-[0.65rem] uppercase tracking-[0.32em] text-right"
          style={{ color: 'var(--c-text-mute)' }}
        >
          Project № 487
          <br />
          Manalapan, FL
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span
          className="text-[0.6rem] uppercase tracking-[0.32em]"
          style={{ color: 'var(--c-text-mute)' }}
        >
          Scroll
        </span>
        <span className="block w-px h-10" style={{ background: 'var(--c-line-strong)' }} />
      </div>
    </section>
  );
}
