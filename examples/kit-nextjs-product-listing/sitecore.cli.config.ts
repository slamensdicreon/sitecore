import { defineCliConfig } from '@sitecore-content-sdk/nextjs/config-cli';
import {
  generateSites,
  generateMetadata,
  extractFiles,
  writeImportMap,
} from '@sitecore-content-sdk/nextjs/tools';
import scConfig from './sitecore.config';

export default defineCliConfig({
  config: scConfig,
  build: {
    commands: [
      generateMetadata(),
      generateSites(),
      extractFiles(),
      writeImportMap({
        paths: ['src/components'],
      }),
    ],
  },
  componentMap: {
    paths: ['src/components'],
    exclude: [
      'src/components/content-sdk/*',
      'src/components/ui/*',
      'src/components/lib/*',
      'src/components/video/*',
      'src/components/multi-promo/*',
      'src/components/image-carousel/*',
      'src/components/accordion-block/*',
      'src/components/image/ImageWrapper.dev.old.tsx',
      // Pool standalone React components (src/components/pool/*.tsx)
      // serve the legacy /pool routes only. They collide by filename
      // with the kit's real Sitecore components (Hero, Header,
      // Testimonials) and must NOT register in the component map.
      //
      // The Sitecore-aware wrappers live one level deeper under
      // src/components/pool/sitecore/Pool*.dev.tsx and DO register
      // (the wildcard below only matches direct children). Each
      // wrapper uses a unique "Pool"-prefixed componentName so pool
      // renderings always bind to the wrapper, never to the kit's
      // generic components.
      'src/components/pool/*',
    ],
  },
});
