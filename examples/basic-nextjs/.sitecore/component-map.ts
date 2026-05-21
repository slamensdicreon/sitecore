// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as RichText from 'src/components/rich-text/RichText';
import * as Image from 'src/components/image/Image';
import * as Container from 'src/components/container/Container';
import * as Navigation from 'src/components/navigation/Navigation';
import * as Promo from 'src/components/promo/Promo';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['RichText', { ...RichText }],
  ['Image', { ...Image }],
  ['Container', { ...Container, componentType: 'client' }],
  ['Navigation', { ...Navigation }],
  ['Promo', { ...Promo }],
]);

export default componentMap;
