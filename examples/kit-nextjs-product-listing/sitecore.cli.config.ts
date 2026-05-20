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
      // Pool React components serve the standalone /pool routes only.
      // They collide by filename with the kit's real Sitecore components
      // (Hero, Header, Testimonials) and must NOT register in the
      // component map. Pool *renderings* in Sitecore bind to the kit's
      // existing components by componentName (e.g. "Hero"), not these.
      'src/components/pool/*',
    ],
  },
});
