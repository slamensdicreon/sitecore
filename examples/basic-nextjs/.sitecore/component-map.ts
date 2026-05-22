// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as Navigation from 'src/components/navigation/Navigation';
import * as Image from 'src/components/image/Image';
import * as ForgeTestimonialQuote from 'src/components/forge/ForgeTestimonialQuote';
import * as ForgeStatsBand from 'src/components/forge/ForgeStatsBand';
import * as ForgeResourceListing from 'src/components/forge/ForgeResourceListing';
import * as ForgeProductSpotlight from 'src/components/forge/ForgeProductSpotlight';
import * as ForgeProductListing from 'src/components/forge/ForgeProductListing';
import * as ForgeProcessTimeline from 'src/components/forge/ForgeProcessTimeline';
import * as ForgePageHeader from 'src/components/forge/ForgePageHeader';
import * as ForgeLogoCloud from 'src/components/forge/ForgeLogoCloud';
import * as ForgeLocationsMap from 'src/components/forge/ForgeLocationsMap';
import * as ForgeIndustriesServed from 'src/components/forge/ForgeIndustriesServed';
import * as ForgeHeroVideo from 'src/components/forge/ForgeHeroVideo';
import * as ForgeHeroIndustrial from 'src/components/forge/ForgeHeroIndustrial';
import * as ForgeHeader from 'src/components/forge/ForgeHeader';
import * as ForgeFooter from 'src/components/forge/ForgeFooter';
import * as ForgeFeatureGrid from 'src/components/forge/ForgeFeatureGrid';
import * as ForgeFaqAccordion from 'src/components/forge/ForgeFaqAccordion';
import * as ForgeCtaBanner from 'src/components/forge/ForgeCtaBanner';
import * as ForgeContactForm from 'src/components/forge/ForgeContactForm';
import * as ForgeCaseStudyCarousel from 'src/components/forge/ForgeCaseStudyCarousel';
import * as ForgeCapabilityShowcase from 'src/components/forge/ForgeCapabilityShowcase';
import * as Container from 'src/components/container/Container';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['Navigation', { ...Navigation }],
  ['Image', { ...Image }],
  ['ForgeTestimonialQuote', { ...ForgeTestimonialQuote }],
  ['ForgeStatsBand', { ...ForgeStatsBand }],
  ['ForgeResourceListing', { ...ForgeResourceListing }],
  ['ForgeProductSpotlight', { ...ForgeProductSpotlight }],
  ['ForgeProductListing', { ...ForgeProductListing }],
  ['ForgeProcessTimeline', { ...ForgeProcessTimeline }],
  ['ForgePageHeader', { ...ForgePageHeader }],
  ['ForgeLogoCloud', { ...ForgeLogoCloud }],
  ['ForgeLocationsMap', { ...ForgeLocationsMap }],
  ['ForgeIndustriesServed', { ...ForgeIndustriesServed }],
  ['ForgeHeroVideo', { ...ForgeHeroVideo }],
  ['ForgeHeroIndustrial', { ...ForgeHeroIndustrial }],
  ['ForgeHeader', { ...ForgeHeader }],
  ['ForgeFooter', { ...ForgeFooter }],
  ['ForgeFeatureGrid', { ...ForgeFeatureGrid }],
  ['ForgeFaqAccordion', { ...ForgeFaqAccordion, componentType: 'client' }],
  ['ForgeCtaBanner', { ...ForgeCtaBanner }],
  ['ForgeContactForm', { ...ForgeContactForm, componentType: 'client' }],
  ['ForgeCaseStudyCarousel', { ...ForgeCaseStudyCarousel }],
  ['ForgeCapabilityShowcase', { ...ForgeCapabilityShowcase }],
  ['Container', { ...Container }],
]);

export default componentMap;
