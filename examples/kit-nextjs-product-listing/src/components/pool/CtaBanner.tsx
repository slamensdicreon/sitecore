import Link from 'next/link';
import { BRAND } from './data';

export function CtaBanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=2400&q=90&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,8,12,0.85), rgba(5,8,12,0.95)), radial-gradient(circle at 30% 50%, rgba(103,232,249,0.18), transparent 50%)',
          }}
        />
      </div>

      <div className="container-luxe text-center max-w-3xl">
        <div className="eyebrow mb-6">A single conversation</div>
        <h2 className="mb-6">
          The most important pool decision is the{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>first one</em>.
        </h2>
        <p
          className="mb-10 text-lg leading-relaxed"
          style={{ color: 'var(--c-text-dim)' }}
        >
          Begin with a 90-minute studio conversation — at your home or ours. No obligation, full
          confidentiality. We will bring inspiration, you will bring the site.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn btn-gold">
            Begin a Conversation
          </Link>
          <a
            href={`tel:${BRAND.phone.replace(/\s|-|\(|\)/g, '')}`}
            className="btn btn-ghost"
          >
            Call the Studio
          </a>
        </div>
      </div>
    </section>
  );
}
