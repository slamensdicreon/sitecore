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

// Caelum-specific renderings
import * as CaelumHeader from 'src/components/caelum/CaelumHeader';
import * as CaelumHero from 'src/components/caelum/CaelumHero';
import * as CaelumSection from 'src/components/caelum/CaelumSection';
import * as CaelumServicesGrid from 'src/components/caelum/CaelumServicesGrid';
import * as CaelumPricingTiers from 'src/components/caelum/CaelumPricingTiers';
import * as CaelumStatsBand from 'src/components/caelum/CaelumStatsBand';
import * as CaelumTestimonials from 'src/components/caelum/CaelumTestimonials';
import * as CaelumProcessSteps from 'src/components/caelum/CaelumProcessSteps';
import * as CaelumContactForm from 'src/components/caelum/CaelumContactForm';
import * as CaelumFooter from 'src/components/caelum/CaelumFooter';

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
  ['CaelumHeader', { ...CaelumHeader }],
  ['CaelumHero', { ...CaelumHero }],
  ['CaelumSection', { ...CaelumSection }],
  ['CaelumServicesGrid', { ...CaelumServicesGrid }],
  ['CaelumPricingTiers', { ...CaelumPricingTiers }],
  ['CaelumStatsBand', { ...CaelumStatsBand }],
  ['CaelumTestimonials', { ...CaelumTestimonials }],
  ['CaelumProcessSteps', { ...CaelumProcessSteps }],
  ['CaelumContactForm', { ...CaelumContactForm, componentType: 'client' }],
  ['CaelumFooter', { ...CaelumFooter }],
]);

export default componentMap;
