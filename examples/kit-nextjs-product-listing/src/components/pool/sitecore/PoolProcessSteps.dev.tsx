import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import type { PoolProcessStepsProps } from './PoolProcessSteps.props';

export const Default: React.FC<PoolProcessStepsProps> = (props) => {
  const { fields } = props;
  if (!fields) return null;
  const items = Array.isArray(fields.items) ? fields.items : [];
  return (
    <section id="process" data-component="PoolProcessSteps" className="py-24 md:py-32">
      <div className="container-luxe">
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
        <ol className="grid gap-px md:grid-cols-4" style={{ background: 'var(--c-line)' }}>
          {items.map((step) => (
            <li key={step.id} className="p-8 md:p-10" style={{ background: 'var(--c-bg)' }}>
              <Text
                tag="div"
                field={step.fields?.number}
                className="font-display text-3xl mb-4"
                style={{ color: 'var(--c-gold)' }}
              />
              <Text tag="h3" field={step.fields?.title} className="text-lg mb-3" />
              <RichText
                tag="div"
                field={step.fields?.body}
                className="text-sm leading-relaxed"
                style={{ color: 'var(--c-text-dim)' }}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
