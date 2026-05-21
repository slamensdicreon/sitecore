'use client';

// Wraps the existing standalone CostCalculator with Sitecore-editable header
// copy. Pricing math + form interaction stay in pricing.ts / CostCalculator.tsx
// because they are application logic, not authored content.

import { Text, RichText, Link } from '@sitecore-content-sdk/nextjs';
import { CalculatorBody } from '../CostCalculator';
import type { PoolCostCalculatorProps } from './PoolCostCalculator.props';

export const Default: React.FC<PoolCostCalculatorProps> = (props) => {
  const { fields } = props;
  return (
    <section id="calculator" data-component="PoolCostCalculator" className="py-24 md:py-32">
      <div className="container-luxe">
        {fields && (
          <div className="max-w-3xl mb-14 md:mb-20">
            <Text tag="div" field={fields.eyebrow} className="eyebrow mb-5" />
            <RichText tag="h2" field={fields.title} />
            <RichText
              tag="p"
              field={fields.intro}
              className="mt-5 text-lg leading-relaxed"
              style={{ color: 'var(--c-text-dim)' }}
            />
          </div>
        )}
        <CalculatorBody />
        {fields?.ctaLink?.value?.href && (
          <div className="mt-12 text-center">
            <Link field={fields.ctaLink} className="btn btn-gold">
              <Text field={fields.ctaLabel} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
