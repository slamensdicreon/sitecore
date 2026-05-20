'use client';

import { useMemo, useState } from 'react';
import {
  ADD_ONS,
  FINISHES,
  POOL_TYPES,
  SIZES,
  estimate,
  formatUSD,
} from './pricing';
import type { Finish, PoolType, SizeId } from './pricing';
import { Section } from './Section';

export function CostCalculator() {
  const [typeId, setTypeId] = useState<PoolType['id']>('classic');
  const [sizeId, setSizeId] = useState<SizeId>('medium');
  const [finishId, setFinishId] = useState<Finish['id']>('pebble');
  const [addOns, setAddOns] = useState<string[]>(['lighting', 'spa']);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(
    () => estimate({ typeId, finishId, sizeId, addOnIds: addOns }),
    [typeId, finishId, sizeId, addOns],
  );

  const toggleAddOn = (id: string) =>
    setAddOns((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]));

  return (
    <Section
      id="calculator"
      eyebrow="Investment, Transparent"
      title={
        <>
          A realistic range in <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>
          under two minutes</em>.
        </>
      }
      intro="Most quoted pool ranges are fiction. Ours are not — adjust the inputs below and you'll see what bespoke actually costs in 2026. We honor the upper bound in writing after a site visit."
    >
      <div className="grid lg:grid-cols-12 gap-8">
        {/* INPUTS */}
        <div className="lg:col-span-7 space-y-10">
          <Field label="Pool Type">
            <div className="grid sm:grid-cols-2 gap-3">
              {POOL_TYPES.map((t) => (
                <Option
                  key={t.id}
                  selected={typeId === t.id}
                  onClick={() => setTypeId(t.id)}
                  primary={t.label}
                  secondary={t.blurb}
                  tag={formatUSD(t.baseCost)}
                />
              ))}
            </div>
          </Field>

          <Field label="Size">
            <div className="grid sm:grid-cols-2 gap-3">
              {SIZES.map((s) => (
                <Option
                  key={s.id}
                  selected={sizeId === s.id}
                  onClick={() => setSizeId(s.id)}
                  primary={s.label}
                  secondary={`×${s.multiplier.toFixed(2)}`}
                />
              ))}
            </div>
          </Field>

          <Field label="Finish">
            <div className="grid sm:grid-cols-3 gap-3">
              {FINISHES.map((f) => (
                <Option
                  key={f.id}
                  selected={finishId === f.id}
                  onClick={() => setFinishId(f.id)}
                  primary={f.label}
                  secondary={f.description}
                />
              ))}
            </div>
          </Field>

          <Field label="Add-ons">
            <div className="grid sm:grid-cols-2 gap-3">
              {ADD_ONS.map((a) => (
                <Option
                  key={a.id}
                  selected={addOns.includes(a.id)}
                  onClick={() => toggleAddOn(a.id)}
                  primary={a.label}
                  secondary={a.hint}
                  tag={`+ ${formatUSD(a.cost)}`}
                  toggle
                />
              ))}
            </div>
          </Field>
        </div>

        {/* RESULT PANEL */}
        <aside className="lg:col-span-5">
          <div
            className="sticky top-28 rounded-3xl p-8 md:p-10"
            style={{
              background:
                'linear-gradient(180deg, rgba(103,232,249,0.06), rgba(255,255,255,0.02))',
              border: '1px solid var(--c-line-strong)',
            }}
          >
            <div className="eyebrow mb-4">Your Estimate</div>
            <div
              className="display"
              style={{
                fontFamily: 'var(--font-heading), serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                color: 'var(--c-text)',
              }}
            >
              {formatUSD(result.low)}
              <span style={{ color: 'var(--c-text-dim)' }}> — </span>
              {formatUSD(result.high)}
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              All-in. Includes structure, finish, equipment, decking, and project lead. Permits
              and excavation surprises are quoted separately on site.
            </p>

            <div className="hairline my-7" />

            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--c-text-dim)' }}>
              <Row label={result.type.label}>{formatUSD(result.type.baseCost)} base</Row>
              <Row label={`Size · ${result.size.label}`}>×{result.size.multiplier.toFixed(2)}</Row>
              <Row label={`Finish · ${result.finish.label}`}>
                ×{result.finish.multiplier.toFixed(2)}
              </Row>
              {result.addOns.length > 0 && (
                <Row label={`Add-ons (${result.addOns.length})`}>
                  {formatUSD(result.addOns.reduce((a, b) => a + b.cost, 0))}
                </Row>
              )}
            </ul>

            <div className="hairline my-7" />

            {submitted ? (
              <div
                className="rounded-xl p-5 text-sm"
                style={{
                  background: 'rgba(103,232,249,0.08)',
                  border: '1px solid var(--c-aqua-deep)',
                  color: 'var(--c-text)',
                }}
              >
                Thank you. A designer will reply within one business day with three potential site
                visits.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-3"
              >
                <input type="text" required placeholder="Full name" aria-label="Name" />
                <input type="email" required placeholder="Email" aria-label="Email" />
                <button type="submit" className="btn btn-primary w-full justify-center">
                  Send my estimate
                </button>
                <p className="text-xs" style={{ color: 'var(--c-text-mute)' }}>
                  We reply within one business day. No automated emails.
                </p>
              </form>
            )}
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <label className="eyebrow" style={{ color: 'var(--c-text)' }}>
          {label}
        </label>
      </div>
      {children}
    </div>
  );
}

function Option({
  selected,
  onClick,
  primary,
  secondary,
  tag,
  toggle = false,
}: {
  selected: boolean;
  onClick: () => void;
  primary: string;
  secondary?: string;
  tag?: string;
  toggle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left p-5 rounded-2xl transition-all"
      style={{
        background: selected ? 'rgba(103,232,249,0.08)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${selected ? 'var(--c-aqua)' : 'var(--c-line)'}`,
        boxShadow: selected ? '0 12px 30px -18px var(--c-aqua-glow)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium" style={{ color: 'var(--c-text)' }}>
            {primary}
          </div>
          {secondary && (
            <div className="mt-1 text-xs" style={{ color: 'var(--c-text-dim)' }}>
              {secondary}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {tag && (
            <span
              className="text-[0.7rem] uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ color: selected ? 'var(--c-aqua)' : 'var(--c-text-mute)' }}
            >
              {tag}
            </span>
          )}
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full"
            style={{
              border: `1px solid ${selected ? 'var(--c-aqua)' : 'var(--c-line-strong)'}`,
              background: selected ? 'var(--c-aqua)' : 'transparent',
            }}
            aria-hidden
          >
            {selected && !toggle && (
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--c-ink)' }}
              />
            )}
            {selected && toggle && (
              <span style={{ color: 'var(--c-ink)', fontSize: '0.6rem', lineHeight: 1 }}>✓</span>
            )}
          </span>
        </div>
      </div>
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-baseline justify-between">
      <span>{label}</span>
      <span style={{ color: 'var(--c-text)' }}>{children}</span>
    </li>
  );
}
