'use client';

import { useState } from 'react';
import { BRAND } from 'src/components/pool/data';
import { Section } from 'src/components/pool/Section';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-44 pb-24 md:pt-52 md:pb-32">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(103,232,249,0.12), transparent 60%), var(--c-ink)',
          }}
        />
        <div className="container-luxe text-center max-w-3xl">
          <div className="eyebrow mb-6">Begin a Conversation</div>
          <h1 className="mb-6 reveal">
            We design{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>three pools a year</em>.
            <br />
            Yours could be one of them.
          </h1>
          <p
            className="text-lg leading-relaxed reveal reveal-delay-1"
            style={{ color: 'var(--c-text-dim)' }}
          >
            Tell us a little about the project. A designer will reply within one business day with
            three potential site visits — no automated emails, no sales sequences.
          </p>
        </div>
      </section>

      <Section className="!pt-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* FORM */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div
                className="rounded-3xl p-10 md:p-12"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(103,232,249,0.08), rgba(255,255,255,0.02))',
                  border: '1px solid var(--c-aqua)',
                }}
              >
                <div className="eyebrow mb-4">Received</div>
                <h2 className="mb-5">Thank you.</h2>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--c-text-dim)' }}>
                  A designer will be in touch within one business day. In the meantime, feel free
                  to call the studio directly at{' '}
                  <a
                    href={`tel:${BRAND.phone.replace(/\s|-|\(|\)/g, '')}`}
                    style={{ color: 'var(--c-aqua)' }}
                  >
                    {BRAND.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name">Full name</label>
                    <input id="name" type="text" required placeholder="Helena Travers" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" required placeholder="you@home.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" placeholder="(561) 555-0142" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="zip">Property zip</label>
                    <input id="zip" type="text" placeholder="33480" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="interest">I'm interested in</label>
                  <select id="interest" defaultValue="Bespoke design & build">
                    <option>Bespoke design & build</option>
                    <option>Renovation & re-imagining</option>
                    <option>White-glove maintenance</option>
                    <option>Opening or closing</option>
                    <option>Equipment & automation</option>
                    <option>Diagnostics & repair</option>
                    <option>Something else — let's discuss</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">Tell us about the project</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Site notes, timing, inspiration, anything we should know."
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button type="submit" className="btn btn-gold">
                    Send to the Studio
                  </button>
                  <span className="text-xs" style={{ color: 'var(--c-text-mute)' }}>
                    We reply within one business day · entirely confidential.
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-5 space-y-10">
            <div>
              <div className="eyebrow mb-4">Studio</div>
              <div className="text-base leading-relaxed" style={{ color: 'var(--c-text)' }}>
                {BRAND.address}
              </div>
              <div className="mt-3 text-sm" style={{ color: 'var(--c-text-dim)' }}>
                By appointment. Street parking and valet at the door.
              </div>
            </div>

            <div>
              <div className="eyebrow mb-4">Direct</div>
              <ul className="space-y-2 text-base">
                <li>
                  <a href={`tel:${BRAND.phone.replace(/\s|-|\(|\)/g, '')}`}>{BRAND.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="eyebrow mb-4">Hours</div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--c-text-dim)' }}>
                {BRAND.hoursWeek}
                <br />
                {BRAND.hoursWeekend}
              </div>
            </div>

            <div>
              <div className="eyebrow mb-4">Service Area</div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--c-text-dim)' }}>
                Palm Beach · Martin · Broward · Miami-Dade counties.
                <br />
                Select destination projects accepted worldwide.
              </div>
              <div
                className="mt-5 aspect-[4/3] rounded-2xl flex items-center justify-center text-xs uppercase tracking-[0.32em]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(103,232,249,0.06), rgba(255,255,255,0.02))',
                  border: '1px dashed var(--c-line-strong)',
                  color: 'var(--c-text-mute)',
                }}
              >
                Service Area Map
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
