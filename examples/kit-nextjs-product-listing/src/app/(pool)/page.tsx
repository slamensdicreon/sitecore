import { Hero } from 'src/components/pool/Hero';
import { ServicesGrid } from 'src/components/pool/ServicesGrid';
import { StatsBand } from 'src/components/pool/StatsBand';
import { ProcessSteps } from 'src/components/pool/ProcessSteps';
import { Gallery } from 'src/components/pool/Gallery';
import { CostCalculator } from 'src/components/pool/CostCalculator';
import { Testimonials } from 'src/components/pool/Testimonials';
import { FAQ } from 'src/components/pool/FAQ';
import { CtaBanner } from 'src/components/pool/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero
        title={
          <>
            Pools made to be{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--c-aqua)' }}>inherited.</em>
          </>
        }
        subtitle={
          <>
            A South Florida atelier crafting custom pool architecture, restoration, and
            white-glove stewardship — one project at a time, for clients who keep their homes
            for a lifetime.
          </>
        }
      />
      <ServicesGrid limit={6} />
      <StatsBand />
      <ProcessSteps />
      <Gallery />
      <CostCalculator />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
}
