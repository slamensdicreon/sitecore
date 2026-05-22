// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as ForgeFaqAccordion from 'src/components/forge/ForgeFaqAccordion';
import * as ForgeContactForm from 'src/components/forge/ForgeContactForm';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['ForgeFaqAccordion', { ...ForgeFaqAccordion }],
  ['ForgeContactForm', { ...ForgeContactForm }],
]);

export default componentMap;
