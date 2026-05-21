// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';
import * as Container from 'src/components/container/Container';
import * as CaelumContactForm from 'src/components/caelum/CaelumContactForm';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['Container', { ...Container }],
  ['CaelumContactForm', { ...CaelumContactForm }],
]);

export default componentMap;
