import { Field, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface ProcessStepFields {
  number: Field<string>;
  title: Field<string>;
  body: RichTextField;
}

export interface ProcessStep {
  id: string;
  fields: ProcessStepFields;
}

export interface PoolProcessStepsFields {
  eyebrow: Field<string>;
  title: RichTextField;
  intro: RichTextField;
  items: ProcessStep[];
}

export interface PoolProcessStepsProps extends ComponentProps {
  params: { [key: string]: unknown };
  fields: PoolProcessStepsFields;
}
