// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as Navigation from 'src/components/navigation/Navigation';
import * as Image from 'src/components/image/Image';
import * as Container from 'src/components/container/Container';
import * as CaelumTestimonials from 'src/components/caelum/CaelumTestimonials';
import * as CaelumStatsBand from 'src/components/caelum/CaelumStatsBand';
import * as CaelumServicesGrid from 'src/components/caelum/CaelumServicesGrid';
import * as CaelumSection from 'src/components/caelum/CaelumSection';
import * as CaelumProcessSteps from 'src/components/caelum/CaelumProcessSteps';
import * as CaelumPricingTiers from 'src/components/caelum/CaelumPricingTiers';
import * as CaelumHero from 'src/components/caelum/CaelumHero';
import * as CaelumHeader from 'src/components/caelum/CaelumHeader';
import * as CaelumFooter from 'src/components/caelum/CaelumFooter';
import * as CaelumContactForm from 'src/components/caelum/CaelumContactForm';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['Navigation', { ...Navigation }],
  ['Image', { ...Image }],
  ['Container', { ...Container }],
  ['CaelumTestimonials', { ...CaelumTestimonials }],
  ['CaelumStatsBand', { ...CaelumStatsBand }],
  ['CaelumServicesGrid', { ...CaelumServicesGrid }],
  ['CaelumSection', { ...CaelumSection }],
  ['CaelumProcessSteps', { ...CaelumProcessSteps }],
  ['CaelumPricingTiers', { ...CaelumPricingTiers }],
  ['CaelumHero', { ...CaelumHero }],
  ['CaelumHeader', { ...CaelumHeader }],
  ['CaelumFooter', { ...CaelumFooter }],
  ['CaelumContactForm', { ...CaelumContactForm, componentType: 'client' }],
]);

export default componentMap;
