import type { Metadata } from 'next';
import './pool.css';
import { Header } from 'src/components/pool/Header';
import { Footer } from 'src/components/pool/Footer';

export const metadata: Metadata = {
  title: 'CAELUM — Bespoke Pool Atelier',
  description:
    'Pools made to be inherited. A South Florida atelier crafting custom pool architecture, renovation, and white-glove maintenance.',
};

export default function PoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="caelum">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
