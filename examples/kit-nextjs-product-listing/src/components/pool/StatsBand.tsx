import { STATS } from './data';

export function StatsBand() {
  return (
    <section
      className="py-20 md:py-24"
      style={{
        borderTop: '1px solid var(--c-line)',
        borderBottom: '1px solid var(--c-line)',
        background:
          'linear-gradient(180deg, rgba(103,232,249,0.04), rgba(5,8,12,0)), var(--c-ground)',
      }}
    >
      <div className="container-luxe grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
        {STATS.map((s, i) => (
          <div key={i} className="text-center md:text-left">
            <div
              className="display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: 'var(--c-gold)',
                fontFamily: 'var(--font-heading), serif',
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              className="mt-3 text-[0.7rem] uppercase tracking-[0.28em]"
              style={{ color: 'var(--c-text-dim)' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
