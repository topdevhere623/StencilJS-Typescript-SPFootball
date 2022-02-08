import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

// https://stenciljs.com/docs/config

export const config: Config = {
  plugins: [sass(), inlineSvg()],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  taskQueue: 'async',
  collections: [{ name: '@ionic/core' }, { name: 'ftb-cmp' }],
  outputTargets: [
    // {
    //   type: 'dist-hydrate-script',
    // },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
};
